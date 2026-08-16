"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <Link href="/" className="mylogo">
        <img
          src="https://api.iconify.design/carbon:id-management.svg"
          alt="CoTask"
        />
        <span>CoTask</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>

        <ul className="nav-links">
          <li>
            <Link href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </Link>
          </li>

          <li>
            <Link href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
          </li>

          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
  About
</Link>
          </li>
        </ul>

        <div className="nav-actions">

          <Link
            href="/login"
            className="loginbtn"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="registerbtn"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}