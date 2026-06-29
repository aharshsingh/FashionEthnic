import React from 'react';
import { FileText } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function TermsofUse() {
  const sections = [
    { id: 'ownership', label: 'Ownership and Offices' },
    { id: 'terms', label: 'Terms and Conditions' },
    { id: 'agreement', label: 'User Agreement' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl px-5 pb-20 lg:px-8 lg:pb-28">
          {/* Header card */}
          <header className="rounded-3xl border border-navy/5 bg-white p-8 shadow-card sm:p-10 animate-fade-up">
            <span className="eyebrow">
              <FileText className="h-3.5 w-3.5" /> Legal
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-navy sm:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-3 text-sm text-navy/50">Last updated: June 29, 2026</p>
          </header>

          {/* Table of contents */}
          <nav className="mt-8 rounded-2xl border border-navy/5 bg-sand/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral-600">
              On this page
            </p>
            <ul className="mt-3 space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-navy/70 transition-colors hover:text-coral"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Body */}
          <article className="mt-10 space-y-10">
            <p className="text-base leading-relaxed text-navy/70">
              <strong className="font-semibold text-navy">Welcome to Fashion Ethnic.</strong> This document is an electronic record in terms of Information Technology Act, 2000
              and published in accordance with the provisions of Rule 3 ) of the Information Technology (Intermediaries guidelines)
              Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of
              Fashion Ethnic marketplace platform - www.myntra.com (hereinafter referred to as "Platform").
            </p>

            <section id="ownership" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">
                Ownership and Offices
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                The Platform is owned by Fashion Ethnic Designs Private Limited, having its registered office at Buildings Alyssa,
                Begonia and Clover situated in Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Varthur Hobli,
                Bengaluru – 560103, India and its branch office at Plot 82 A - 2nd and 3rd Floor, Sector 18 Gurugram Haryana, India.
              </p>
            </section>

            <section id="terms" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">
                Terms and Conditions
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                Your use of the Fashion Ethnic and services and tools are governed by the following terms and conditions ("Terms of Use")
                as applicable to the Fashion Ethnic including the applicable policies which are incorporated herein by way of reference.
                By mere use of the Fashion Ethnic, You shall be contracting with Fashion Ethnic Designs Private Limited, the owner of
                the Platform. These terms and conditions including the policies constitute Your binding obligations, with Fashion Ethnic.
              </p>
            </section>

            <section id="agreement" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">
                User Agreement
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal
                person who has agreed to become a buyer on Platform by providing data while registering on the Platform as Registered
                User. The term "Fashion Ethnic", "We", "Us", "Our" shall mean Fashion Ethnic Designs Private Limited and its affiliates.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                When You use any of the services provided by Us through the Platform, including but not limited to, (e.g. Product Reviews,
                Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service,
                and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms
                of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at
                any time without any prior written notice to You.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
