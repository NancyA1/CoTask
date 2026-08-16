export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="footer-brand">

          <a href="/" className="footer-logo">
            <img
              src="https://api.iconify.design/carbon:id-management.svg"
              alt="CoTask"
            />

            <span>CoTask</span>
          </a>

          <p>
            Simple project management for teams
            that want to get things done.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <h4>Product</h4>

            <a href="#features">
              Features
            </a>

            <a href="#how-it-works">
              How it works
            </a>

            <a href="/register">
              Get started
            </a>
          </div>


          <div>
            <h4>Company</h4>

            <a href="/about">
              About
            </a>

            <a href="mailto:hello@cotask.com">
              Contact
            </a>
          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © 2026 CoTask. All rights reserved.
        </span>

        <span>
          Built for better teamwork.
        </span>

      </div>

    </footer>
  );
}