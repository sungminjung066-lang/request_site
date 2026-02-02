/**
 * Vercel Serverless Function
 * - 브라우저에 EmailJS 키를 노출하지 않기 위해, 서버에서만 EmailJS REST API를 호출합니다.
 *
 * Vercel Environment Variables (필수)
 * - EMAILJS_PUBLIC_KEY
 * - EMAILJS_SERVICE_ID
 * - EMAILJS_TEMPLATE_ID
 *
 * (선택)
 * - ALLOWED_ORIGIN: 예) https://your-site.vercel.app
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  // (선택) 내 사이트에서만 호출되도록 Origin 체크
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const origin = req.headers.origin || "";
  if (allowedOrigin && origin !== allowedOrigin) {
    return res.status(403).json({ error: "FORBIDDEN_ORIGIN" });
  }

  try {
    const template_params = req.body || {};

    // 최소 검증 (원하면 더 강화 가능)
    const title = (template_params.title || "").toString().trim();
    const message = (template_params.message || "").toString().trim();
    if (!title || !message) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }
    if (title.length > 80) {
      return res.status(400).json({ error: "TITLE_TOO_LONG" });
    }
    if (message.length > 4000) {
      return res.status(400).json({ error: "MESSAGE_TOO_LONG" });
    }

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        // 템플릿 변수 이름은 EmailJS 템플릿과 일치해야 합니다.
        // 현재 프론트 폼(name)이 title, message 이므로 그대로 사용
        title,
        message,
      },
    };

    if (!payload.service_id || !payload.template_id || !payload.user_id) {
      return res.status(500).json({ error: "MISSING_SERVER_ENV" });
    }

    const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      return res
        .status(502)
        .json({ error: "EMAILJS_FAILED", detail: text.slice(0, 200) });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
}
