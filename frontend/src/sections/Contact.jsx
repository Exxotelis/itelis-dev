// src/sections/Contact.jsx
import { useCallback } from "react";

const EMAIL_TO = "info@exxotelis.com";

export default function Contact() {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const services = data.getAll("services");
    const message = data.get("message") || "";

    const subject = "New project inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Services: ${services.join(", ") || "-"}`,
      "",
      message
    ].join("\n");

    window.location.href =
      `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, []);

  return (
    <section className="contact section-padding" id="section_5">
      <div className="container">
        <div className="row">

          {/* Title */}
          <div className="col-lg-6 col-md-8 col-12">
            <div className="section-title-wrap d-flex justify-content-center align-items-center mb-5">
              <img
                src={`${import.meta.env.BASE_URL}images/aerial-view-man-using-computer-laptop-wooden-table.jpg`}
                className="avatar-image img-fluid"
                alt="workspace"
              />
              <h2 className="text-white ms-4 mb-0">Say Hi</h2>
            </div>
          </div>

          <div className="clearfix" />

          {/* Left column: services & socials */}
          <div className="col-lg-3 col-md-6 col-12 pe-lg-0">
            <div className="contact-info contact-info-border-start d-flex flex-column">
              <strong className="site-footer-title d-block mb-3">Services</strong>
              <ul className="footer-menu">
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Websites</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Web Apps</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">E-commerce</a></li>
                <li className="footer-menu-item"><a href="#" className="footer-menu-link">WordPress & SEO</a></li>
              </ul>

              <strong className="site-footer-title d-block mt-4 mb-3">Stay connected</strong>
              <ul className="social-icon">
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-twitter" aria-label="Twitter" /></li>
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-instagram" aria-label="Instagram" /></li>
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-pinterest" aria-label="Pinterest" /></li>
                <li className="social-icon-item"><a href="#" className="social-icon-link bi-youtube" aria-label="YouTube" /></li>
              </ul>

              <strong className="site-footer-title d-block mt-4 mb-3">Start a project</strong>
              <p className="mb-0">I’m available for freelance projects.</p>
            </div>
          </div>

          {/* Middle column: about & contact details */}
          <div className="col-lg-3 col-md-6 col-12 ps-lg-0">
            <div className="contact-info d-flex flex-column">
              <strong className="site-footer-title d-block mb-3">About</strong>
              <p className="mb-2">
                I’m <strong>itelis</strong>, a web developer focused on <strong>Django</strong> & <strong>React</strong>.
                Clean UI, fast delivery, practical features.
              </p>

              <strong className="site-footer-title d-block mt-4 mb-3">Email</strong>
              <p className="mb-2">
                <a href={`mailto:${EMAIL_TO}`}>{EMAIL_TO}</a>
              </p>

              <strong className="site-footer-title d-block mt-4 mb-3">Call</strong>
              <p className="mb-0">
                <a href="tel:+447402338774">+447402338774</a>
              </p>
            </div>
          </div>

          {/* Right column: form */}
          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <form className="custom-form contact-form" role="form" onSubmit={onSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input type="text" name="name" id="name" className="form-control" placeholder="Name" required />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      pattern="[^ @]*@[^ @]*"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                </div>

                {/* checkboxes (match Services) */}
                {[
                  { id: "websites",      icon: "bi-globe",       label: "Websites" },
                  { id: "webapps",       icon: "bi-code-slash",  label: "Web Apps" },
                  { id: "ecommerce",     icon: "bi-bag-check",   label: "E-commerce" },
                  { id: "wordpress-seo", icon: "bi-speedometer2",label: "WordPress & SEO" },
                ].map(({ id, icon, label }) => (
                  <div key={id} className="col-lg-3 col-md-6 col-6">
                    <div className="form-check form-check-inline">
                      <input
                        name="services"
                        value={id}
                        type="checkbox"
                        className="form-check-input"
                        id={`chk-${id}`}
                      />
                      <label className="form-check-label" htmlFor={`chk-${id}`}>
                        <i className={`${icon} form-check-icon`} />
                        <span className="form-check-label-text">{label}</span>
                      </label>
                    </div>
                  </div>
                ))}

                <div className="col-lg-12 col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      placeholder="Tell me about the project"
                      style={{ height: 150 }}
                    />
                    <label htmlFor="message">Tell me about the project</label>
                  </div>
                </div>

                <div className="col-lg-3 col-12 ms-auto">
                  <button type="submit" className="form-control">Send</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
