
import { memo } from "react";

const projects = [
  {
    tag: ["React", "Bootstrap", "PHP"],
    title: "VorinVista",
    link: "https://vorinvista.com/",
    img: "static/images/projects/vorinvista-full.png",
    desc: "Agency website with clean UX and dynamic content."
  },
  {
    tag: ["Django", "REST", "Cloudinary"],
    title: "Reflectivo App",
    link: "https://reflectivo.site/",
    img: "static/images/projects/reflectivo.png",
    desc: "Journaling app with calendar, data export, and Stripe subscription plans."
  },
  {
    tag: ["Shopify", "Liquid", "Custom Theme"],
    title: "TrekForte",
    link: "https://trekforte.com/",
    img: "static/images/projects/trekforte.png",
    desc: "Shopify e-commerce store built with a custom theme and modular sections."
  },
  {
    tag: ["WordPress", "SEO", "Custom Theme"],
    title: "Ek Neou Sindesi",
    link: "https://ekneousindesi.com/",
    img: "static/images/projects/ekneousindesi.png",
    desc: "WordPress website with speed optimizations and on-page SEO improvements."
  },
];


function SectionHead() {
  return (
    <div className="col-lg-8 col-md-8 col-12 ms-auto">
      <div className="section-title-wrap d-flex justify-content-center align-items-center mb-4">
        <img
          src="static/images/white-desk-work-study-aesthetics.jpg"
          className="avatar-image img-fluid"
          alt="workspace"
        />
        <h2 className="text-white ms-4 mb-0">Projects</h2>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="projects-thumb">
        <div className="projects-info">
          <div className="mb-1">
            {(Array.isArray(p.tag) ? p.tag : [p.tag]).map((t, i) => (
              <small key={i} className="projects-tag me-1">{t}</small>
            ))}
          </div>

          <h3 className="projects-title">{p.title}</h3>
          {p.desc && <p className="projects-desc mb-0">{p.desc}</p>}
        </div>

        <a href={p.link} className="popup-image" target="_blank" rel="noreferrer noopener">
          <img
            src={p.img}
            className="projects-image img-fluid"
            alt={p.title}
            onError={(e) => { e.currentTarget.src = "/images/projects/placeholder.jpg"; }}
          />
        </a>
      </div>
    </div>
  );
}

export default memo(function Projects() {
  return (
    <section className="projects section-padding" id="section_4">
      <div className="container">
        <div className="row">
          <SectionHead />
          <div className="clearfix" />
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
});
