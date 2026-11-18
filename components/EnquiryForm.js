"use client";
import { useState } from "react";
import { SITE } from "@/lib/site";

// Enquiry form on each project page. On submit it opens WhatsApp with the
// buyer's details filled in, addressed to the agent's number, so the enquiry
// arrives live in WhatsApp. Nothing is stored on the website.
export default function EnquiryForm({ projectName }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Enter your name.";
    const digits = phone.replace(/[^\d]/g, "");
    if (!digits) e.phone = "Enter your phone number.";
    else if (digits.length < 9 || digits.length > 15) e.phone = "Enter a valid phone number, e.g. +60123456789.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address, or leave it blank.";
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const lines = [
      `Hi ${SITE.shortName}, I'd like to enquire about *${projectName}*.`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      message.trim() ? `Message: ${message.trim()}` : null,
      "",
      `Sent from ${typeof window !== "undefined" ? window.location.href.split("?")[0] : SITE.url}`,
    ].filter((l) => l !== null);

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    const win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url;
    setSent(true);
  }

  return (
    <form className="box enquiry" onSubmit={submit} noValidate>
      <h3>Send an Enquiry</h3>

      <label htmlFor="enqName">Your Name <span className="req">*</span>
        <input id="enqName" className="field" autoComplete="name" placeholder="e.g. Ahmad Zaki"
               value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
        {errors.name && <span className="err">{errors.name}</span>}
      </label>

      <label htmlFor="enqPhone">Phone Number <span className="req">*</span>
        <input id="enqPhone" className="field num" type="tel" autoComplete="tel" placeholder="+60123456789"
               value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
        {errors.phone && <span className="err">{errors.phone}</span>}
      </label>

      <label htmlFor="enqEmail">Email Address
        <input id="enqEmail" className="field" type="email" autoComplete="email" placeholder="you@email.com"
               value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
        {errors.email && <span className="err">{errors.email}</span>}
      </label>

      <label htmlFor="enqMsg">Message
        <textarea id="enqMsg" className="field area" rows={4} placeholder={projectName}
                  value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>

      <button className="btn wa" type="submit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
        Send Enquiry
      </button>

      {sent ? (
        <p className="small" style={{ margin: 0 }}>
          WhatsApp should now be open with your enquiry. Tap send there to reach me. If it didn&apos;t open, message{" "}
          <span className="num">{SITE.whatsappDisplay}</span>.
        </p>
      ) : (
        <p className="small" style={{ margin: 0, textAlign: "center" }}>
          Your contact details are only used to respond to your enquiry. Sending opens WhatsApp.
        </p>
      )}
    </form>
  );
}
