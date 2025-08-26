import "./AboutPage.css";

function AboutPage() {
  return (
    <div>
      {/* Background decorative floral elements positioned around the page */}
      <svg
        className="floral-accent floral-top-left"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M60 20C65 25 70 35 65 45C70 50 75 55 70 65C65 70 55 65 50 60C45 65 35 70 25 65C20 60 25 50 30 45C25 40 20 30 25 20C30 15 40 20 45 25C50 20 60 15 60 20Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.8" />
        <path d="M45 35L50 40L45 45L40 40Z" fill="currentColor" opacity="0.4" />
        <path d="M75 75L80 80L75 85L70 80Z" fill="currentColor" opacity="0.4" />
      </svg>

      <svg
        className="floral-accent floral-bottom-right"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10C55 15 60 25 55 35C60 40 65 45 60 55C55 60 45 55 40 50C35 55 25 60 15 55C10 50 15 40 20 35C15 30 10 20 15 10C20 5 30 10 35 15C40 10 50 5 50 10Z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="70" cy="70" r="2" fill="currentColor" opacity="0.7" />
      </svg>

      <svg
        className="floral-accent floral-center"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M40 5C42 10 45 15 42 22C45 25 48 28 45 35C42 38 35 35 32 32C29 35 22 38 15 35C12 32 15 25 18 22C15 19 12 12 15 5C18 2 25 5 28 8C32 5 40 2 40 5Z"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>

      <svg
        className="floral-accent floral-top-right"
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
      >
        <path
          d="M45 8C48 12 52 18 48 25C52 28 55 32 52 38C48 42 40 38 36 35C32 38 25 42 18 38C15 35 18 28 22 25C18 22 15 15 18 8C22 5 28 8 32 12C36 8 45 5 45 8Z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="25" cy="25" r="2" fill="currentColor" opacity="0.6" />
        <path d="M35 20L38 23L35 26L32 23Z" fill="currentColor" opacity="0.4" />
      </svg>

      <svg
        className="floral-accent floral-bottom-left"
        width="110"
        height="110"
        viewBox="0 0 110 110"
        fill="none"
      >
        <path
          d="M55 12C60 17 65 27 60 37C65 42 70 47 65 57C60 62 50 57 45 52C40 57 30 62 20 57C15 52 20 42 25 37C20 32 15 22 20 12C25 7 35 12 40 17C45 12 55 7 55 12Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="35" cy="35" r="2.5" fill="currentColor" opacity="0.7" />
        <circle cx="75" cy="75" r="2.5" fill="currentColor" opacity="0.7" />
        <path d="M50 30L55 35L50 40L45 35Z" fill="currentColor" opacity="0.3" />
      </svg>

      <svg
        className="floral-accent floral-mid-right"
        width="85"
        height="85"
        viewBox="0 0 85 85"
        fill="none"
      >
        <path
          d="M42 6C45 10 48 16 45 22C48 25 51 28 48 34C45 37 38 34 35 31C32 34 25 37 18 34C15 31 18 25 21 22C18 19 15 13 18 6C21 3 27 6 30 9C35 6 42 3 42 6Z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="42" cy="42" r="2" fill="currentColor" opacity="0.8" />
        <path d="M30 25L33 28L30 31L27 28Z" fill="currentColor" opacity="0.4" />
      </svg>

      <svg
        className="floral-accent floral-top-center"
        width="95"
        height="95"
        viewBox="0 0 95 95"
        fill="none"
      >
        <path
          d="M47 9C50 13 54 20 50 27C54 30 57 34 54 40C50 44 42 40 38 37C34 40 27 44 20 40C17 37 20 30 24 27C20 24 17 17 20 9C24 6 30 9 34 13C38 9 47 6 47 9Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.7" />
        <path d="M40 22L44 26L40 30L36 26Z" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Small decorative dots scattered around the page for added visual interest */}
      <div className="decorative-dots dot-1"></div>
      <div className="decorative-dots dot-2"></div>
      <div className="decorative-dots dot-3"></div>

      <div className="container">
        {/* Main page header with title and underline decoration */}
        <header className="page-header">
          <h1 className="page-title">About PluckD</h1>
          <div className="title-underline"></div>
        </header>

        <main className="main-content">
          {/* Brand story and mission section */}
          <section className="about-section">
            <h2 className="section-title">Our Story</h2>
            <div className="content-wrapper">
              <p className="about-text">
                PluckD was born from the belief that every pre-loved item has a
                story worth continuing. In a world of endless consumption, we're
                creating a space where handpicked treasures find new homes and
                new purposes.
              </p>
              <p className="about-text">
                Our platform connects mindful consumers who understand that the
                most beautiful finds are often the ones with history. Every
                swap, every exchange, every "pluck" is a step toward a more
                sustainable future.
              </p>
              <p className="about-text">
                Because when you pluck it, swap it, and love it — you're not
                just finding something special, you're becoming part of a
                community that values quality over quantity, story over newness.
              </p>
            </div>
          </section>

          {/* Social media and contact links section */}
          <section className="contact-section">
            <h2 className="section-title">Connect With Us</h2>
            <div className="contact-links">
              <a
                href="https://www.linkedin.com/in/muhammad510ahmad-dev"
                className="contact-link linkedin-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-icon">
                  {/* LinkedIn icon SVG */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="link-content">
                  <span className="link-title">LinkedIn</span>
                  <span className="link-subtitle">Professional Profile</span>
                </div>
              </a>

              <a
                href="https://github.com/Muhammad124Ahmad"
                className="contact-link github-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-icon">
                  {/* GitHub icon SVG */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="link-content">
                  <span className="link-title">GitHub</span>
                  <span className="link-subtitle">Profile & Code repo</span>
                </div>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AboutPage;
