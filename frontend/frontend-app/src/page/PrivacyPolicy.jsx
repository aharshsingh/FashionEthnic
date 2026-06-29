import React from 'react';
import { Shield } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function PrivacyPolicy() {
  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use', label: 'How We Use Your Information' },
    { id: 'sharing', label: 'Sharing of Information' },
    { id: 'security', label: 'Data Security' },
    { id: 'your-rights', label: 'Your Rights' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl px-5 pb-20 lg:px-8 lg:pb-28">
          {/* Header card */}
          <header className="rounded-3xl border border-navy/5 bg-white p-8 shadow-card sm:p-10 animate-fade-up">
            <span className="eyebrow">
              <Shield className="h-3.5 w-3.5" /> Legal
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-navy sm:text-5xl">
              Privacy Policy
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
            <section id="introduction" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Introduction</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                At Fashion Ethnic, we value your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our platform or make a purchase. By using Fashion Ethnic, you agree
                to the practices described in this policy.
              </p>
            </section>

            <section id="information-we-collect" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Information We Collect</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                We collect information that you provide directly to us, such as your name, email address,
                phone number, shipping address, and payment details when you register an account or place an
                order. We also automatically collect certain information about your device and browsing
                activity, including your IP address, browser type, and pages visited.
              </p>
            </section>

            <section id="how-we-use" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">How We Use Your Information</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                We use the information we collect to process and fulfill your orders, communicate with you
                about your purchases, provide customer support, personalize your shopping experience, and send
                you promotional offers where you have consented. We may also use your information to improve
                our platform, prevent fraud, and comply with legal obligations.
              </p>
            </section>

            <section id="sharing" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Sharing of Information</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                We do not sell your personal information. We may share your information with trusted third-party
                service providers who assist us in operating our platform, processing payments, and delivering
                orders. These parties are obligated to keep your information confidential and use it only for
                the purposes for which it was shared. We may also disclose information when required by law.
              </p>
            </section>

            <section id="security" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Data Security</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet or electronic storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section id="your-rights" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Your Rights</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                You have the right to access, update, or delete your personal information at any time. You may
                also opt out of receiving marketing communications by following the unsubscribe instructions in
                our emails or by contacting us directly. To exercise any of these rights, please reach out to
                our support team.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold text-navy">Contact Us</h2>
              <p className="mt-4 text-base leading-relaxed text-navy/70">
                If you have any questions or concerns about this Privacy Policy or how we handle your personal
                information, please contact us at{' '}
                <a
                  href="mailto:aharshsingh25@gmail.com"
                  className="font-semibold text-coral underline-offset-4 hover:underline"
                >
                  aharshsingh25@gmail.com
                </a>
                . We will be happy to assist you.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
