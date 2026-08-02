"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/tradutor", label: "Tradutor IA" },
  { href: "/aprender", label: "Aprender Libras" },
  { href: "/dicionario", label: "Dicionário" },
  { href: "/sobre", label: "Sobre" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <nav className="nav-container" aria-label="Navegação principal">
          <Link href="/" className="logo" aria-label="WiW Speak — Ir para página inicial">
            <Image
              src="/logo.png"
              alt="WiW Speak Logo"
              width={40}
              height={40}
              priority
            />
            <span>
              WiW <span className="gradient-text">Speak</span>
            </span>
          </Link>

          <ul className="nav-links" role="menubar">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <Link href={item.href} role="menuitem">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link href="/tradutor" className="btn btn-primary btn-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Tradutor IA
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav
        className={`mobile-nav ${mobileOpen ? "open" : ""}`}
        aria-label="Menu mobile"
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
