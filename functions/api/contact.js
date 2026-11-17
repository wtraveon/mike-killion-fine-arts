const DESTINATION = "wtraveon1@gmail.com";
const MAX_BODY_BYTES = 8192;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

export async function onRequestPost({ request, env }) {
  // Reject cross-origin browser submissions. Requests without Origin remain
  // supported for privacy-preserving clients and direct endpoint checks.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return json({ error: "Please submit the inquiry from the website." }, 403);
      }
    } catch {
      return json({ error: "Please submit the inquiry from the website." }, 403);
    }
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "Please submit the form using the website." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Your message is too large. Please shorten it and try again." }, 413);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: "The contact form is not configured yet. Please email Mike directly at navmike8@gmail.com." }, 503);
  }

  let data;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Your message is too large. Please shorten it and try again." }, 413);
    }
    data = JSON.parse(body);
  } catch {
    return json({ error: "Please complete the form and try again." }, 400);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return json({ error: "Please complete the form and try again." }, 400);
  }

  // Quietly accept honeypot submissions without forwarding spam.
  if (typeof data.website === "string" && data.website.trim()) {
    return json({ success: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || name.length > 80 || !email || email.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || message.length > 1200) {
    return json({ error: "Please check your name, email address, and message. Then try again." }, 400);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  let delivery;
  try {
    delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "authorization": "Bearer " + env.RESEND_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [DESTINATION],
        reply_to: email,
        subject: "Website inquiry from " + name,
        text: "Name: " + name + "\nEmail: " + email + "\n\n" + message,
        html: "<h2>New website inquiry</h2><p><strong>Name:</strong> " + safeName +
          "</p><p><strong>Email:</strong> " + safeEmail + "</p><p>" + safeMessage + "</p>"
      })
    });
  } catch {
    return json({ error: "We couldn't send your message right now. Please email Mike directly at navmike8@gmail.com." }, 502);
  }

  if (!delivery.ok) {
    return json({ error: "We couldn't send your message right now. Please email Mike directly at navmike8@gmail.com." }, 502);
  }

  return json({ success: true, message: "Thanks — your message has been sent to Mike." });
}
