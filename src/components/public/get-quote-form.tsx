"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import api from "@/lib/api";
import { getSiteContent } from "@/lib/content";
import Reveal from "./reveal";

export default function GetQuoteForm() {
  const [content, setContent] = useState<Record<string, any>>({});
  const [form, setForm] = useState({
    fullName: "", whatsApp: "", email: "", productLink: "", productName: "", quantity: "", estimatedPrice: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const title = content.quote_title || "Get a Free Quote";
  const subtitle = content.quote_subtitle || "Fill in the details and we'll get back to you";

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName.trim() ||
      !form.whatsApp.trim() ||
      !form.email.trim() ||
      !form.productName.trim() ||
      !form.quantity.trim() ||
      !form.estimatedPrice.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.post("/quotes", form);
      setSubmitted(true);
      setForm({ fullName: "", whatsApp: "", email: "", productLink: "", productName: "", quantity: "", estimatedPrice: "" });
    } catch {
      setError("Failed to submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-brand py-12 sm:py-20">
      <Reveal className="max-w-[640px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-section-title text-white mb-3">{title}</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-4" />
          <p className="text-white/85 text-[16px]">{subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_24px_60px_rgba(0,20,80,.35)]">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-card-title text-brand-ink mb-2">Request Received!</h3>
              <p className="text-gray-label text-sm mb-5">We&apos;ll get back to you shortly with a quote.</p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost">Submit Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Name *</label>
                  <input className="field-input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your name" />
                </div>
                <div>
                  <label className="field-label">WhatsApp *</label>
                  <input className="field-input" value={form.whatsApp} onChange={(e) => update("whatsApp", e.target.value)} placeholder="+880 1XXX XXXXXX" />
                </div>
              </div>

              <div>
                <label className="field-label">E-mail *</label>
                <input className="field-input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
              </div>

              <div>
                <label className="field-label">Product Link</label>
                <input className="field-input" value={form.productLink} onChange={(e) => update("productLink", e.target.value)} placeholder="Link to the product page" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Product Name *</label>
                  <input className="field-input" value={form.productName} onChange={(e) => update("productName", e.target.value)} placeholder="e.g. Wireless Earbuds" />
                </div>
                <div>
                  <label className="field-label">Quantity *</label>
                  <input className="field-input" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g. 2" />
                </div>
              </div>

              <div>
                <label className="field-label">Estimate Price (Till Hand) *</label>
                <input className="field-input" value={form.estimatedPrice} onChange={(e) => update("estimatedPrice", e.target.value)} placeholder="Your expected total price" />
              </div>

              {error && <div className="p-3 rounded-lg bg-danger-soft text-danger text-sm">{error}</div>}

              <button type="submit" disabled={submitting}
                className="text-btn bg-brand text-white w-full py-3.5 rounded-[10px] hover:bg-brand-deep transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50">
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {submitting ? "SUBMITTING..." : "REQUEST QUOTE"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
