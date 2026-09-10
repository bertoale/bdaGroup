/**
 * LeadStreams Ingestion Service
 * Mirrored from apps/estate (LeadStreamsService.php)
 * Best effort: Failures are logged and never break the user experience.
 */

export interface LeadStreamPayload {
  externalId?: string;
  fullName: string;
  email: string;
  phone?: string | null;
  topic?: string | null;
  message: string;
  source?: string;
  pageUrl?: string;
  referrer?: string;
}

export async function sendLeadToLeadStreams(data: LeadStreamPayload): Promise<boolean> {
  const baseUrl = process.env.LEADSTREAMS_BASE_URL;
  const websiteId = process.env.LEADSTREAMS_WEBSITE_ID;
  const ingestToken = process.env.LEADSTREAMS_INGEST_TOKEN;

  if (!baseUrl || !websiteId || !ingestToken) {
    // LeadStreams is optional / not configured in this environment
    return false;
  }

  const email = data.email?.trim();
  if (!email) {
    return false;
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/api/v1/ingest/contact-form`;
  const payload = {
    website_id: websiteId,
    external_id: data.externalId || `bdagrp-lead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    name: data.fullName?.trim() || "Website Lead",
    email: email,
    phone: data.phone?.trim() || "",
    message: data.message?.trim() || `New lead from bestdealsasiagroup.com [Topic: ${data.topic || "General"}]`,
    page_url: data.pageUrl || "https://bestdealsasiagroup.com/contact",
    referrer: data.referrer || "",
    source: data.source || "bestdealsasiagroup.com",
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ingestToken}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000), // 5 seconds timeout
    });

    if (res.ok) {
      console.log(`[LEADSTREAMS] Lead successfully recorded: ${payload.external_id}`);
      return true;
    } else {
      const errorText = await res.text().catch(() => "");
      console.warn(`[LEADSTREAMS] Ingest failed (Status ${res.status}): ${errorText}`);
      return false;
    }
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("[LEADSTREAMS] Request exception:", err.message || error);
    return false;
  }
}
