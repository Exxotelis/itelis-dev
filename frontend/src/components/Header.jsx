import { useEffect, useState, useRef, useCallback } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { site } from "../data/site";

function Brand() {
  const [imgOk, setImgOk] = useState(Boolean(site?.logo));
  if (site?.logo && imgOk) {
    return (
      <img
        src={site.logo}
        alt={site?.brand || "Logo"}
        className="brand-logo"
        onError={() => setImgOk(false)} // fallback αν 404/σφάλμα
      />
    );
  }
  return <span className="fw-bold">{site?.brand ?? "My Brand"}</span>;
}

export default function Header() {
  const navRef = useRef(null);

  useEffect(() => {
    const applySticky = () => {
      const stuck = window.scrollY > 10;
      document.body.classList.toggle("is-sticky", stuck);
      document.body.classList.toggle("has-fixed-nav", stuck);
      if (navRef.current) {
        const h = navRef.current.offsetHeight;
        document.documentElement.style.setProperty("--nav-h", `${h}px`);
      }
    };
    applySticky();
    window.addEventListener("scroll", applySticky);
    window.addEventListener("resize", applySticky);
    return () => {
      window.removeEventListener("scroll", applySticky);
      window.removeEventListener("resize", applySticky);
    };
  }, []);

  const handleClick = useCallback((e) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - ((navRef.current?.offsetHeight || 0) + 10);
    window.scrollTo({ top, behavior: "smooth" });
    const toggler = document.querySelector(".navbar-toggler");
    const isOpen = document.getElementById("navbarNav")?.classList.contains("show");
    if (isOpen && toggler) toggler.click();
  }, []);

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg position-absolute start-0 end-0">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <a href="#section_1" className="navbar-brand mx-auto mx-lg-0 d-flex align-items-center">
          <Brand />
        </a>

        <div className="d-flex align-items-center d-lg-none">
          <i className="navbar-icon bi-telephone-plus me-3"></i>
          <a className="custom-btn btn" href="#section_5" onClick={handleClick}>
            {site?.phone ?? "120-240-9600"}
          </a>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-5">
            {[
              ["Home", "#section_1"],
              ["About", "#section_2"],
              ["Services", "#section_3"],
              ["Projects", "#section_4"],
              ["Contact", "#section_5"],
            ].map(([label, href]) => (
              <li className="nav-item" key={href}>
                <a className="nav-link click-scroll" href={href} onClick={handleClick}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-lg-flex align-items-center d-none ms-auto gap-2">
            <i className="navbar-icon bi-telephone-plus"></i>
            <a className="custom-btn btn" href="#section_5" onClick={handleClick}>
              {site?.phone ?? "120-240-9600"}
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
