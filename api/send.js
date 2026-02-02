module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  try {
    const { title, message } = req.body || {};

    const safeTitle = (title || "").toString().trim();
    const safeMessage = (message || "").toString().trim();

    if (!safeTitle || !safeMessage) {
      return res.status(400).json({
        error: "MISSING_FIELDS",
        title: !!safeTitle,
        message: !!safeMessage,
      });
    }

    const service_id = process.env.EMAILJS_SERVICE_ID;
    const template_id = process.env.EMAILJS_TEMPLATE_ID;
    const user_id = process.env.EMAILJS_PUBLIC_KEY;
    const accessToken = process.env.EMAILJS_PRIVATE_KEY;

    if (!service_id || !template_id || !user_id || !accessToken) {
      return res.status(500).json({
        error: "MISSING_SERVER_ENV",
        has: {
          EMAILJS_SERVICE_ID: !!service_id,
          EMAILJS_TEMPLATE_ID: !!template_id,
          EMAILJS_PUBLIC_KEY: !!user_id,
          EMAILJS_PRIVATE_KEY: !!accessToken,
        },
      });
    }

    const payload = {
      service_id,
      template_id,
      user_id,
      accessToken, // ✅ 이게 없어서 strict mode 에러가 났던 거임
      template_params: {
        title: safeTitle,
        message: safeMessage,
      },
    };

    const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await r.text();

    if (!r.ok) {
      return res.status(502).json({
        error: "EMAILJS_FAILED",
        status: r.status,
        detail: text.slice(0, 1000),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};
