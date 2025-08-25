import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      {/* Decorative floral SVG elements */}
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

      {/* Decorative dots */}
      <div className="decorative-dots dot-1"></div>
      <div className="decorative-dots dot-2"></div>
      <div className="decorative-dots dot-3"></div>

      <div className="container">
        <header className="header">
          <h1 className="brand-name">PluckD</h1>
          <p className="motto">Pluck it. Swap it. Love it.</p>
        </header>

        <main className="main-content">
          <p className="description">
            “The name reflects the act of handpicking something special — because every reused item is more than just stuff, it’s a find.”
          </p>

          <a href="/app" className="cta-button">
            Get Started
          </a>
        </main>
      </div>
    </div>
  );
}

export default Home;
