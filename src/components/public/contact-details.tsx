"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import Reveal from "./reveal";

export default function ContactDetails() {
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => { getSiteContent().then(setContent); }, []);

  const ceoName = content.contact_ceo_name || "Rahad Amin";
  const ceoTitle = content.contact_ceo_title || "Founder & CEO";
  const ceoPhones: string[] = Array.isArray(content.contact_ceo_phones) ? content.contact_ceo_phones : [];
  const ceoEmail = content.contact_ceo_email || "";
  const ceoPhoto = content.contact_ceo_photo || "";
  const ceoInitials = ceoName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  const companyBdPhone = content.contact_company_bd_phone || "";
  const companyCnPhone = content.contact_company_cn_phone || "";
  const companyEmail = content.contact_company_email || "";
  const bdOffice = content.contact_company_bd_office || "";
  const cnOffice = content.contact_company_cn_office || "";
  const ksaOffice = content.contact_company_ksa_office || "";

  return (
    <section id="contact" className="bg-white py-12 sm:py-20 scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="text-center mb-8 sm:mb-12">
          <span className="text-kicker text-brand">Get In Touch</span>
          <h2 className="text-section-title text-brand-ink mt-3 mb-3">Contact Us</h2>
          <div className="w-16 h-1 bg-brand mx-auto" />
        </Reveal>

        {/* CEO Profile */}
        <Reveal className="card rounded-2xl p-8 sm:p-10 mb-6 text-center">
          {ceoPhoto ? (
            <img
              src={ceoPhoto}
              alt={ceoName}
              className="w-40 h-40 rounded-full border-4 border-brand object-cover mx-auto"
            />
          ) : (
            <div className="w-40 h-40 rounded-full border-4 border-brand bg-brand text-white text-4xl font-bold grid place-items-center mx-auto">
              {ceoInitials || "?"}
            </div>
          )}

          <div className="text-brand-ink font-bold text-xl mt-5">{ceoName}</div>
          <div className="text-gray-label text-sm mt-1">{ceoTitle}</div>

          <div className="mt-4 space-y-1">
            {ceoPhones.map((p) => (
              <div key={p} className="text-gray-label text-sm">{p}</div>
            ))}
            {ceoEmail && <div className="text-gray-label text-sm">{ceoEmail}</div>}
          </div>
        </Reveal>

        {/* Company Info */}
        <Reveal delay={120} className="card rounded-2xl p-8 sm:p-10">
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
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
            </div>
            <div className="space-y-4">
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
    </section>
  );
}
