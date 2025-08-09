// src/sections/About.jsx
export default function About() {
  return (
    <section className="about section-padding" id="section_2">
      <div className="container">
        <div className="row">

          {/* Image (left) */}
          <div className="col-lg-6 col-12">
            <img
              src="/images/couple-working-from-home-together-sofa.jpg"
              className="about-image img-fluid"
              alt="Working from home"
            />
          </div>

          {/* Copy (right) */}
          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <div className="about-thumb">

              <div className="section-title-wrap d-flex justify-content-end align-items-center mb-4">
                <h2 className="text-white me-4 mb-0">About me</h2>
                <img
                  src="/images/itelis-hero.png"
                  className="avatar-image img-fluid"
                  alt="itelis avatar"
                />
              </div>

              <h3 className="pt-2 mb-3">itelis — Web Developer </h3>

              <p className="mb-3">
                Hi, I’m <strong>itelis</strong>, a web developer specializing in
                <strong> Django</strong> (backend) and <strong>React</strong> (frontend).
                I focus on clean UI, fast delivery, and practical features that solve real problems.
              </p>

              <p className="mb-4">
                I build landing pages, dashboards, and small SaaS products with integrations like
                payments (Stripe), email providers, and file storage. If you’d like to discuss an idea
                or collaboration, feel free to reach out.
              </p>

              <div className="mb-4">
                {["React", "Django", "Bootstrap", "Stripe", "REST APIs"].map(tag => (
                  <span key={tag} className="badge bg-light text-dark border me-1 mb-1">{tag}</span>
                ))}
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <a href="#section_5" className="custom-btn btn">Contact</a>
                <a href="https://github.com/Exxotelis" className="custom-btn custom-border-btn btn" target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/lefteris-kapsalidis/" className="custom-btn custom-border-btn btn" target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
