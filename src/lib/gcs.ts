import { Storage } from "@google-cloud/storage";
import fs from "fs";

let storageClient: Storage | null = null;

function getStorageClient(): Storage {
  if (storageClient) return storageClient;

  // 1. Prioritaskan GCS_CREDENTIALS (raw JSON atau base64-encoded JSON)
  const credentialsEnv = process.env.GCS_CREDENTIALS;
  if (credentialsEnv) {
    try {
      let rawJson = credentialsEnv.trim();
      // Handle base64 encoded string jika user menyimpannya sebagai base64
      if (!rawJson.startsWith("{")) {
        rawJson = Buffer.from(rawJson, "base64").toString("utf-8").trim();
      }

      let credentials;
      try {
        credentials = JSON.parse(rawJson);
      } catch {
        // Jika gagal karena literal newlines/control characters di dalam private_key,
        // sanitize control characters yang tidak ter-escape
        const sanitized = rawJson.replace(/[\n\r\t]/g, (match) => {
          if (match === "\n") return "\\n";
          if (match === "\r") return "\\r";
          if (match === "\t") return "\\t";
          return match;
        });
        credentials = JSON.parse(sanitized);
      }

      // Pastikan newline di private_key ter-parse dengan benar jika masih literal '\n'
      if (credentials && credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
      }

      storageClient = new Storage({ credentials });
      return storageClient;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to parse GCS_CREDENTIALS: ${msg}`);
    }
  }

  // 2. Fallback ke file path GCS_KEY_FILE (untuk local development)
  const keyFilePath = process.env.GCS_KEY_FILE;
  if (!keyFilePath) {
    throw new Error(
      "GCS credentials missing: please set either GCS_CREDENTIALS (JSON/base64) or GCS_KEY_FILE (file path)."
    );
  }
  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`GCS key file not found at path: ${keyFilePath}`);
  }

  storageClient = new Storage({
    keyFilename: keyFilePath,
  });

  return storageClient;
}

/**
 * Upload CV / Resume PDF file to Google Cloud Storage (GCS).
 * Strict: Throws error if GCS upload fails or credentials missing (NO fallback).
 *
 * @param buffer - File Buffer
 * @param originalFilename - Nama file asli dari user
 * @param candidateName - Nama pelamar untuk slugging nama file
 * @returns Public URL string ke file di GCS
 */
export async function uploadCVToGCS(
  buffer: Buffer,
  originalFilename: string,
  candidateName: string
): Promise<string> {
  const bucketName = process.env.GCS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("GCS_BUCKET_NAME environment variable is missing.");
  }

  const folder = process.env.GCS_FOLDER;
  if (!folder) {
    throw new Error("GCS_FOLDER environment variable is missing.");
  }

  const storage = getStorageClient();
  const bucket = storage.bucket(bucketName);

  // Generate safe unique filename: cv-[slug]-[timestamp]-[random].pdf
  const slug = candidateName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "applicant";

  const extMatch = originalFilename.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : "pdf";
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const destinationPath = `${folder}/career/cv-${slug}-${Date.now()}-${randomSuffix}.${ext}`;

  const file = bucket.file(destinationPath);

  // Upload buffer directly to GCS
  await file.save(buffer, {
    metadata: {
      contentType: "application/pdf",
      cacheControl: "public, max-age=31536000",
    },
    resumable: false,
  });

  // Make public read (or return standard storage.googleapis.com URL)
  try {
    await file.makePublic();
  } catch (aclErr) {
    // If uniform bucket-level access is enabled, makePublic might fail but standard URL still works
    console.warn("[GCS] makePublic warning (uniform bucket access may be active):", aclErr);
  }

  return `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
}
