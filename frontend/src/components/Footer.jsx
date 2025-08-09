// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-4 mt-5 border-top">
      <div className="container d-flex justify-content-between">
        <span className="text-secondary">© {new Date().getFullYear()} itelis dev</span>
        <a className="text-decoration-none" href="#">Back to top ↑</a>
      </div>
    </footer>
  )
}
