import React from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import '../component-css/ContactUs.css';

export default function ContactUs() {
  const openGmailPopup = () => {
    const email = "aharshsingh25@gmail.com";
    const subject = "Support Inquiry";
    const body = "Hello, I need help with...";

    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoURL;
    } else {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const popupWidth = 600;
      const popupHeight = 600;
      const left = screenWidth - popupWidth - 10;
      const top = screenHeight - popupHeight - 10;
      window.open(gmailURL, "_blank", `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'aharshsingh25@gmail.com',
      hint: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      hint: 'Mon–Sat, 10am – 7pm IST',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Embassy Tech Village, Outer Ring Road',
      hint: 'Bengaluru – 560103, India',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="pt-24 lg:pt-28">
        {/* ===== HERO / INTRO ===== */}
        <section className="relative overflow-hidden bg-hero-radial">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-12 text-center lg:px-8 lg:pb-16 lg:pt-16">
            <span className="eyebrow animate-fade-in">
              <MessageCircle className="h-3.5 w-3.5" /> We&apos;d love to hear from you
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl animate-fade-up">
              Get in <span className="text-coral">touch</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg animate-fade-up">
              Have questions about your order, returns, or a general inquiry?
              Our team is here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* ===== CONTACT GRID ===== */}
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-4 lg:px-8 lg:pb-28">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* Left — contact info cards */}
            <div className="space-y-5">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="group flex items-start gap-4 rounded-2xl border border-navy/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral/10 text-coral transition-colors duration-300 group-hover:bg-coral group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-600">
                        {card.label}
                      </p>
                      <p className="mt-1 break-words font-medium text-navy">{card.value}</p>
                      <p className="mt-0.5 text-sm text-navy/60">{card.hint}</p>
                    </div>
                  </div>
                );
              })}

              {/* Hours card */}
              <div className="flex items-start gap-4 rounded-2xl bg-navy p-6 text-white shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral/20 text-coral">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                    Support Hours
                  </p>
                  <p className="mt-1 font-medium">Monday – Saturday</p>
                  <p className="mt-0.5 text-sm text-white/70">10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="rounded-3xl border border-navy/5 bg-white p-7 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-navy/60">
                Fill in the form and we&apos;ll get back to you shortly.
              </p>

              <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy/80" htmlFor="cu-name">
                      Full name
                    </label>
                    <input
                      id="cu-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/40 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy/80" htmlFor="cu-email">
                      Email address
                    </label>
                    <input
                      id="cu-email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/40 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy/80" htmlFor="cu-subject">
                    Subject
                  </label>
                  <input
                    id="cu-subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/40 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy/80" htmlFor="cu-message">
                    Message
                  </label>
                  <textarea
                    id="cu-message"
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-navy/10 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/40 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message <Send className="h-4 w-4" />
                </button>

                <p className="pt-2 text-center text-sm text-navy/60 sm:text-left">
                  Prefer email?{' '}
                  <button
                    type="button"
                    onClick={openGmailPopup}
                    className="font-semibold text-coral underline-offset-4 transition hover:underline"
                  >
                    Email us directly
                  </button>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
