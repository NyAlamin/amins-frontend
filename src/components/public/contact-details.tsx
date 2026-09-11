"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import Reveal from "./reveal";

export default function ContactDetails() {
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => { getSiteContent().then(setContent); }, []);

  const ceoName = content.contact_ceo_name || "Rahad Amin";
  const ceoTitle = content.contact_ceo_title || "Founder & CEO";
  const ceoPhones: string[] = Array.isArray(content.contact_ceo_phones) ? content.contact_ceo_phones : [];
  const ceoEmail = content.contact_ceo_email || "";

  const companyBdPhone = content.contact_company_bd_phone || "";
  const companyCnPhone = content.contact_company_cn_phone || "";
  const companyEmail = content.contact_company_email || "";
  const bdOffice = content.contact_company_bd_office || "";
  const cnOffice = content.contact_company_cn_office || "";
  const ksaOffice = content.contact_company_ksa_office || "";

  const cardImage = content.contact_card_image || "/contact-card.jpg";

  return (
    <section id="contact" className="bg-white py-12 sm:py-20 scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="text-center mb-8 sm:mb-12">
          <span className="text-kicker text-brand">Get In Touch</span>
          <h2 className="text-section-title text-brand-ink mt-3 mb-3">Contact Us</h2>
          <div className="w-16 h-1 bg-brand mx-auto" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left — branded card with QR codes */}
          <Reveal className="card overflow-hidden p-4 flex items-center justify-center h-full">
            <img src={cardImage} alt="Amin's contact card — scan to connect on WhatsApp or WeChat" className="w-full h-auto rounded-lg" />
          </Reveal>

          {/* Right — CEO & company info */}
          <Reveal delay={120} className="space-y-4">
            <div className="card p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0"><User size={20} /></div>
                <div>
                  <div className="text-sm font-bold text-brand-ink">{ceoName}</div>
                  <div className="text-gray-label text-sm mt-0.5">{ceoTitle}</div>
                </div>
              </div>
              <div className="space-y-1.5 pl-[60px]">
                {ceoPhones.map((p) => (
                  <div key={p} className="text-gray-label text-sm">{p}</div>
                ))}
                {ceoEmail && <div className="text-gray-label text-sm">{ceoEmail}</div>}
              </div>
            </div>

            <div className="card p-5">
              <div className="text-sm font-bold text-brand-ink mb-4">Company Info</div>
              <div className="space-y-3 text-sm">
                {companyBdPhone && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">BD Phone:</span> <span className="text-gray-label">{companyBdPhone}</span></div>
                  </div>
                )}
                {companyCnPhone && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">CN Phone:</span> <span className="text-gray-label">{companyCnPhone}</span></div>
                  </div>
                )}
                {companyEmail && (
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">E-mail:</span> <span className="text-gray-label">{companyEmail}</span></div>
                  </div>
                )}
                {bdOffice && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">BD Office:</span> <span className="text-gray-label">{bdOffice}</span></div>
                  </div>
                )}
                {cnOffice && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">CN Office:</span> <span className="text-gray-label">{cnOffice}</span></div>
                  </div>
                )}
                {ksaOffice && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                    <div><span className="font-semibold text-brand-ink">KSA Office:</span> <span className="text-gray-label">{ksaOffice}</span></div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
