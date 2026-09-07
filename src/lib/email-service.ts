interface SendCareerNotificationParams {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  cvUrl?: string | null;
}

export async function sendCareerApplicationNotification({
  name,
  email,
  phone,
  jobTitle,
  cvUrl,
}: SendCareerNotificationParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[EMAIL SERVICE] RESEND_API_KEY is not configured. Skipping email notification.");
    return { success: false, error: "RESEND_API_KEY missing" };
  }

  const fromAddress = process.env.RESEND_FROM_ADDRESS || "no-reply@email.bestdealsasiagroup.com";
  const fromName = process.env.RESEND_FROM_NAME || "Best Deals Asia Group";
  const emailToEnv = process.env.EMAIL_TO || "toalber231@gmail.com,bertoale.dev@gmail.com";

  const recipients = emailToEnv
    .split(",")
    .map((e) => e.trim())
    .filter((e) => Boolean(e) && e.includes("@"));

  if (recipients.length === 0) {
    console.warn("[EMAIL SERVICE] No valid recipients found in EMAIL_TO.");
    return { success: false, error: "No recipients" };
  }

  // Email pertama sebagai 'To' utama, sisanya sebagai 'CC'
  const primaryRecipient = recipients[0];
  const ccRecipients = recipients.slice(1);

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${cleanPhone}`;
  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Makassar",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }) + " WITA";

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Job Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 24px 12px;">
                <!-- Main Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #0b356a; padding: 22px 16px;">
                            <h1 style="margin: 0; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.2px;">
                                💼 New Job Application
                            </h1>
                            <p style="margin: 4px 0 0 0; font-size: 13px; color: #FFC436; font-weight: 600;">
                                Best Deals Asia Group
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 24px 20px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                                        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Candidate Name</div>
                                        <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${name}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                                        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Position Applied</div>
                                        <div style="font-size: 15px; font-weight: 700; color: #0b356a;">${jobTitle}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                                        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Email Address</div>
                                        <div style="font-size: 15px; color: #0f172a;">
                                            <a href="mailto:${email}" style="color: #0b356a; text-decoration: underline;">${email}</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                                        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Phone / WhatsApp</div>
                                        <div style="font-size: 15px; color: #0f172a;">
                                            <a href="${waLink}" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">
                                                ${phone} ↗
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px;">
                                        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">Submission Date</div>
                                        <div style="font-size: 14px; color: #475569;">${submittedAt}</div>
                                    </td>
                                </tr>
                            </table>

                            <!-- View PDF Button -->
                            ${
                              cvUrl
                                ? `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px;">
                                <tr>
                                    <td align="center" style="background-color: #0b356a; border-radius: 8px;">
                                        <a href="${cvUrl}" target="_blank" style="display: block; padding: 14px 20px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; text-align: center; border-radius: 8px;">
                                            📄 View / Download CV (PDF)
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            `
                                : ""
                            }

                            <!-- Sign off -->
                            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
                                <p style="margin: 0 0 3px 0;">Best regards,</p>
                                <p style="margin: 0; font-weight: 700; color: #0f172a;">Best Deals Asia Group Team</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #f8fafc; padding: 12px 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
                            This message was sent automatically from the Career portal of bestdealsasiagroup.com.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();

  try {
    const emailPayload: Record<string, any> = {
      from: `${fromName} <${fromAddress}>`,
      to: [primaryRecipient],
      subject: `New Job Application: ${jobTitle} - ${name}`,
      html: htmlContent,
    };

    if (ccRecipients.length > 0) {
      emailPayload.cc = ccRecipients;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("[EMAIL SERVICE] Resend API error:", resData);
      return { success: false, error: resData.message || "Resend error" };
    }

    return { success: true };
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("[EMAIL SERVICE] Exception while sending email:", error);
    return { success: false, error: error.message };
  }
}
