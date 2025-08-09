// src/sections/Services.jsx
import { memo, useCallback } from "react";

const services = [
  {
    title: "Websites",
    price: "from $1,800",
    desc: "Fast, responsive landing/corporate sites with React/Bootstrap or WordPress, SEO-ready.",
    icon: "bi-globe",
    up: false,
    cta: { type: "scroll", label: "See Examples", href: "#section_4" } // Projects
  },
  {
    title: "Web Apps",
    price: "from $3,500",
    desc: "Full-stack apps with Django REST + React. Auth, dashboards, Stripe payments, Cloudinary.",
    icon: "bi-code-slash",
    up: true,
    cta: { type: "link", label: "Book a Call", href: "https://calendly.com/exxotelis", blank: true }
  },
  {
    title: "E-commerce",
    price: "from $2,800",
    desc: "Shopify stores with custom Liquid themes, subscriptions, and integrations.",
    icon: "bi-bag-check",
    up: false,
    cta: { type: "scroll", label: "Get Quote", href: "#section_5", check: "ecommerce" } // pre-check στο Contact
  },
  {
    title: "WordPress & SEO",
    price: "from $700",
    desc: "Performance tuning (Core Web Vitals), on-page SEO, security & backups.",
    icon: "bi-speedometer2",
    up: true,
    cta: { type: "mailto", label: "Email Me", to: "you@example.com", subject: "WordPress & SEO help", body: "Hi itelis,\n\nI’d like help with WordPress & SEO.\n\nDetails:" }
  },
];

function SectionTitle() {
  return (
    <div className="section-title-wrap d-flex justify-content-center align-items-center mb-5">
      <img src="/images/handshake-man-woman-after-signing-business-contract-closeup.jpg" className="avatar-image img-fluid" alt="Handshake" />
      <h2 className="text-white ms-4 mb-0">Services</h2>
    </div>
  );
}

function ServiceCard({ s, onCTA }) {
  return (
    <div className="col-lg-6 col-12">
      <div className={`services-thumb ${s.up ? "services-thumb-up" : ""}`}>
        <div className="d-flex flex-wrap align-items-center border-bottom mb-4 pb-3">
          <h3 className="mb-0">{s.title}</h3>
          <div className="services-price-wrap ms-auto">
            <p className="services-price-text mb-0">{s.price}</p>
            <div className="services-price-overlay"></div>
          </div>
        </div>

        <p>{s.desc}</p>

        <a
          href={s.cta.href || "#"}
          className="custom-btn custom-border-btn btn mt-3"
          target={s.cta.blank ? "_blank" : undefined}
          rel={s.cta.blank ? "noreferrer noopener" : undefined}
          onClick={(e) => onCTA(e, s.cta)}
        >
          {s.cta.label}
        </a>

        <div className="services-icon-wrap d-flex justify-content-center align-items-center">
          <i className={`services-icon ${s.icon}`}></i>
        </div>
      </div>
    </div>
  );
}

export default memo(function Services() {
  const handleCTA = useCallback((e, cta) => {
    if (cta.type === "scroll") {
      e.preventDefault();
      const target = document.querySelector(cta.href);
      if (!target) return;
      const nav = document.querySelector(".navbar");
      const offset = (nav?.offsetHeight || 0) + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      // προ-τικάρει checkbox στο Contact αν οριστεί
      if (cta.check) {
        setTimeout(() => {
          const el = document.querySelector(`#chk-${cta.check}`) ||
                     document.querySelector(`input[name="services"][value="${cta.check}"]`);
          if (el) el.checked = true;
        }, 250);
      }
    } else if (cta.type === "mailto") {
      e.preventDefault();
      const url = `mailto:${cta.to}?subject=${encodeURIComponent(cta.subject || "")}&body=${encodeURIComponent(cta.body || "")}`;
      window.location.href = url;
    } // type === "link" αφήνει το default (και ανοίγει σε νέο tab αν blank)
  }, []);

  return (
    <section className="services section-padding" id="section_3">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 mx-auto">
            <SectionTitle />
            <div className="row pt-lg-5">
              {services.map((s, i) => (
                <ServiceCard key={i} s={s} onCTA={handleCTA} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
