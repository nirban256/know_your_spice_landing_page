"use client";

import { useEffect, useRef, useState } from "react";

const traceSpices = {
  turmeric: {
    name: "Turmeric Powder",
    source: "The supplier or source partner associated with this turmeric batch would be listed here once verified.",
    region: "The growing region should be displayed from the batch record, so the origin is specific rather than assumed.",
    process: "A batch reference can connect this pack to the licensed processor and the processing details that have been confirmed.",
    testing: "Available quality checks and supporting reports should be listed only when they have been completed and verified.",
    packing: "The packing date and batch code should match the information printed on the final product pack.",
  },
  coriander: {
    name: "Coriander Powder",
    source: "The selected supplier or source partner would be connected to this coriander batch once confirmed.",
    region: "Coriander can be sourced from the region best suited to the spice; the origin should be stated from verified records.",
    process: "The processing reference would connect the batch to its cleaning, grinding and sieving journey where those details are recorded.",
    testing: "Relevant quality information should be presented with a clear status and a report when that report is available.",
    packing: "A pack date and batch code help connect the product in your kitchen to the right batch record.",
  },
  cumin: {
    name: "Cumin Powder",
    source: "A confirmed source partner would be shown here, helping customers see where the cumin entered the supply chain.",
    region: "The region of harvest should be listed from source documentation rather than inferred from the Kerala packing location.",
    process: "The batch profile can outline the agreed processing steps and identify the processor when the details are confirmed.",
    testing: "Quality parameters can include factors such as aroma, particle size and relevant safety checks when supported by records.",
    packing: "The date and batch identifier shown here should correspond to the actual information printed on each pack.",
  },
  pepper: {
    name: "Black Pepper",
    source: "The confirmed supplier or farm-source information would appear here for this pepper batch.",
    region: "When documented, the harvest region can give pepper a clearer story without implying that every spice must be Kerala-grown.",
    process: "The processing entry would describe the relevant batch journey and who handled it, using verified information.",
    testing: "Any published testing details should identify what was checked and relate to the selected batch, not a generic claim.",
    packing: "The pack date and batch reference provide a practical link between the physical pouch and its batch information.",
  },
};

const traceSteps = {
  source: { index: "STEP 01 / 05", title: "Farm / source", status: "Supplier details shown when confirmed" },
  region: { index: "STEP 02 / 05", title: "Harvest region", status: "Origin shown from verified records" },
  process: { index: "STEP 03 / 05", title: "Processing batch", status: "Processing details shown when recorded" },
  testing: { index: "STEP 04 / 05", title: "Quality checks", status: "Only verified results are published" },
  packing: { index: "STEP 05 / 05", title: "Packing date", status: "Pack date and batch code should match" },
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSpice, setActiveSpice] = useState("turmeric");
  const [activeStep, setActiveStep] = useState("source");
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState("Launch updates");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const emailInputRef = useRef(null);

  const openInterest = (interest = "Launch updates") => {
    const supported = ["Discovery box", "Turmeric", "Coriander", "Cumin", "Black pepper", "Launch updates"];
    setModalInterest(supported.includes(interest) ? interest : "Launch updates");
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (!modalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => emailInputRef.current?.focus(), 30);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  // Reveal key sections and cards as they enter the viewport.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const revealSelector = [
      ".hero-copy",
      ".hero-art-wrap",
      ".values-intro",
      ".value-item",
      ".section-heading",
      ".heading-aside",
      ".product-card",
      ".discovery-copy",
      ".discovery-art",
      ".trace-copy",
      ".trace-card",
      ".process-card",
      ".process-note",
      ".closing-content",
    ].join(",");

    const elements = document.querySelectorAll(revealSelector);
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    elements.forEach((element) => {
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const siblingIndex = Math.max(0, siblings.indexOf(element));
      const delay = Math.min(siblingIndex, 3) * 90;
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
  <a className="skip-link" href="#main">Skip to content</a>
  <div className="announcement"><span className="announcement-dot"></span> Thoughtfully sourced. Crafted and packed in Kerala. <a href="#our-promise">The Know Your Spice promise <span aria-hidden="true">↗</span></a></div>
  <header className="site-header" id="top">
    <div className="nav-wrap container">
      <a className="brand" href="#top" aria-label="Know Your Spice home">
        <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 36 36"><path d="M7 26C7 13 17 6 29 6C29 18 22 29 9 29" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 29C13 21 18 16 27 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M17 20C16 14 12 11 7 11C7 17 10 22 17 23" fill="currentColor" opacity=".75"/></svg></span>
        <span className="brand-name">know your <b>spice.</b><small>KERALA · INDIA</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#spices">Our spices</a><a href="#our-promise">Our promise</a><a href="#traceability">Traceability</a><a href="#story">Our story</a>
      </nav>
      <a className="button button-dark nav-cta" href="#discovery">Explore the box <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}><span></span><span></span></button>
    </div>
    <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
      <a href="#spices" onClick={() => setMenuOpen(false)}>Our spices</a><a href="#our-promise" onClick={() => setMenuOpen(false)}>Our promise</a><a href="#traceability" onClick={() => setMenuOpen(false)}>Traceability</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="#discovery" onClick={() => setMenuOpen(false)} className="mobile-nav-cta">Explore the box ↗</a>
    </nav>
  </header>

  <main id="main" className="min-h-screen">
    <section className="hero section-shell">
      <div className="hero-orb hero-orb-one" aria-hidden="true"></div><div className="hero-orb hero-orb-two" aria-hidden="true"></div>
      <div className="container hero-grid mx-auto">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"></span> A more thoughtful Indian pantry</div>
          <h1>Good food begins with <em>knowing your spice.</em></h1>
          <p className="hero-lede">Real spices. Cleanly sourced. Freshly processed. Nothing unnecessary.</p>
          <p className="hero-support">A modern spice brand, crafted and packed in Kerala — with a clearer story behind every sprinkle.</p>
          <div className="hero-actions"><a className="button button-dark" href="#discovery">Meet the discovery box <span aria-hidden="true">↗</span></a><a className="text-link" href="#traceability">See what transparency means <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="mini-leaf" aria-hidden="true">✳</span><span>Less mystery in the pantry.<br /><strong>More meaning in every meal.</strong></span></div>
        </div>
        <div className="hero-art-wrap">
          <div className="art-chip chip-top"><span className="chip-icon">✳</span><span><b>Source with intention</b><small>Details that deserve to be known</small></span></div>
          <img className="hero-art" src="/assets/hero-still-life.svg" alt="Illustrated Know Your Spice collection featuring turmeric, coriander, cumin and black pepper pouches with spice bowls." />
          <div className="art-chip chip-bottom"><span className="chip-number">04</span><span><b>Everyday essentials</b><small>One considered collection</small></span><span className="chip-arrow" aria-hidden="true">↗</span></div>
          <span className="art-caption">A little colour, grounded in care.</span>
        </div>
      </div>
      <div className="container hero-bottomline"><span>MADE FOR THE EVERYDAY INDIAN KITCHEN</span><span className="bottomline-center"><span></span> CAREFULLY CONSIDERED <span></span></span><span>BUILT ON TRUST, NOT HYPE</span></div>
    </section>

    <section className="values-strip" id="our-promise" aria-label="Our four values">
      <div className="container values-inner">
        <div className="values-intro"><span className="tiny-label">THE WAY WE WORK</span><p>Four principles.<br /><em>One honest promise.</em></p></div>
        <article className="value-item"><span className="value-icon value-gold"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27S5 20 5 11a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 9-11 16-11 16Z"/><path d="M16 25V12"/></svg></span><div><h3>Thoughtful sourcing</h3><p>Choose growing regions with care. Let the origin tell the story.</p></div></article>
        <article className="value-item"><span className="value-icon value-terracotta"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4v24M8 11c-1 5 2 8 8 8 0-6-3-9-8-8ZM24 8c1 5-2 8-8 8 0-6 3-9 8-8ZM9 23c3-4 7-4 7-4M23 23c-3-4-7-4-7-4"/></svg></span><div><h3>Small-batch freshness</h3><p>Process in considered batches, rather than letting powder sit around.</p></div></article>
        <article className="value-item"><span className="value-icon value-green"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 27 10v12l-11 6L5 22V10L16 4Z"/><path d="m11 16 3 3 7-7"/></svg></span><div><h3>Nothing unnecessary</h3><p>Keep the ingredient story simple, clear, and easy to understand.</p></div></article>
        <article className="value-item"><span className="value-icon value-olive"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 28s10-9 10-16A10 10 0 0 0 6 12c0 7 10 16 10 16Z"/><circle cx="16" cy="12" r="3"/></svg></span><div><h3>Traceability by design</h3><p>Build toward batch-level information customers can actually check.</p></div></article>
      </div>
    </section>

    <section className="section section-products" id="spices">
      <div className="container mx-auto">
        <div className="section-heading heading-row"><div><span className="eyebrow"><span className="eyebrow-line"></span> THE FIRST FOUR</span><h2>Everyday spices.<br /><em>Chosen with intention.</em></h2></div><div className="heading-aside"><p>No sprawling catalogue. Just four pantry staples to begin with — selected for the meals you make again and again.</p><a className="text-link" href="#discovery">Try them together <span aria-hidden="true">↗</span></a></div></div>
        <div className="product-grid">
          <article className="product-card product-turmeric">
            <div className="product-visual"><span className="product-index">01 / GOLDEN</span><svg className="product-illustration" viewBox="0 0 280 230" aria-hidden="true"><ellipse cx="140" cy="192" rx="72" ry="13" fill="#9A7A2D" opacity=".13"/><g transform="translate(81 29) rotate(-5 60 85)"><path d="M20 10 31 0H99L110 10L115 162Q115 172 105 174H25Q15 172 15 162L20 10Z" fill="#F6E6BC" stroke="#D5B86C" strokeWidth="1.4"/><path d="M20 10 31 0H99L110 10V29H20V10Z" fill="#D5A12B"/><path d="M29 17H101" stroke="#F4D77D"/><text x="65" y="48" fontFamily="Georgia,serif" fontSize="7" letterSpacing="1" textAnchor="middle" fill="#475638">KNOW YOUR SPICE</text><circle cx="65" cy="84" r="23" fill="#EACB69"/><path d="M47 87Q65 60 83 87Q65 111 47 87Z" fill="#C48E21"/><path d="M65 66V105" stroke="#F6E6BC" strokeWidth="1.2"/><text x="65" y="132" fontFamily="Georgia,serif" fontSize="15" textAnchor="middle" fill="#324833">Turmeric</text><text x="65" y="145" fontFamily="Arial,sans-serif" fontSize="6.5" textAnchor="middle" letterSpacing="1" fill="#65715A">GROUND SPICE</text><text x="65" y="161" fontFamily="Arial,sans-serif" fontSize="7" textAnchor="middle" fill="#65715A">100 g</text></g><circle cx="207" cy="68" r="19" fill="#F1D88B"/><circle cx="207" cy="68" r="12" fill="#E2AF38"/><circle cx="50" cy="137" r="4" fill="#D6A336"/><circle cx="62" cy="150" r="3" fill="#D6A336"/><circle cx="207" cy="111" r="3" fill="#D6A336"/><path d="M208 87q12 12 7 22" stroke="#94A17A" strokeWidth="2" fill="none"/></svg><span className="visual-sparkle sparkle-a">✳</span><span className="visual-sparkle sparkle-b">✳</span></div>
            <div className="product-meta"><div><h3>Turmeric Powder</h3><p>Warm, earthy, everyday golden.</p></div><span className="product-weight">100 g</span></div><div className="product-foot"><span>01</span><span className="product-swatch swatch-gold"></span></div>
          </article>
          <article className="product-card product-coriander">
            <div className="product-visual"><span className="product-index">02 / AROMATIC</span><svg className="product-illustration" viewBox="0 0 280 230" aria-hidden="true"><ellipse cx="140" cy="192" rx="72" ry="13" fill="#7C6D50" opacity=".13"/><g transform="translate(81 29) rotate(4 60 85)"><path d="M20 10 31 0H99L110 10L115 162Q115 172 105 174H25Q15 172 15 162L20 10Z" fill="#F8F1DF" stroke="#D1C5A9" strokeWidth="1.4"/><path d="M20 10 31 0H99L110 10V29H20V10Z" fill="#9DAD82"/><path d="M29 17H101" stroke="#CFDAC0"/><text x="65" y="48" fontFamily="Georgia,serif" fontSize="7" letterSpacing="1" textAnchor="middle" fill="#475638">KNOW YOUR SPICE</text><circle cx="65" cy="84" r="23" fill="#E6DFC6"/><g fill="#B6A579"><circle cx="57" cy="77" r="4"/><circle cx="70" cy="75" r="4"/><circle cx="76" cy="87" r="4"/><circle cx="62" cy="91" r="4"/><circle cx="50" cy="88" r="3"/><circle cx="66" cy="83" r="4"/></g><text x="65" y="132" fontFamily="Georgia,serif" fontSize="13" textAnchor="middle" fill="#324833">Coriander</text><text x="65" y="145" fontFamily="Arial,sans-serif" fontSize="6.5" textAnchor="middle" letterSpacing="1" fill="#65715A">GROUND SPICE</text><text x="65" y="161" fontFamily="Arial,sans-serif" fontSize="7" textAnchor="middle" fill="#65715A">100 g</text></g><ellipse cx="206" cy="71" rx="18" ry="25" fill="#D9D0B7" transform="rotate(24 206 71)"/><g fill="#9DAD82"><ellipse cx="211" cy="127" rx="5" ry="10" transform="rotate(45 211 127)"/><ellipse cx="55" cy="140" rx="5" ry="10" transform="rotate(-33 55 140)"/><ellipse cx="64" cy="152" rx="4" ry="8" transform="rotate(25 64 152)"/></g></svg><span className="visual-sparkle sparkle-a">✳</span><span className="visual-sparkle sparkle-b">✳</span></div>
            <div className="product-meta"><div><h3>Coriander Powder</h3><p>Citrusy, mellow, quietly essential.</p></div><span className="product-weight">100 g</span></div><div className="product-foot"><span>02</span><span className="product-swatch swatch-sage"></span></div>
          </article>
          <article className="product-card product-cumin">
            <div className="product-visual"><span className="product-index">03 / EARTHY</span><svg className="product-illustration" viewBox="0 0 280 230" aria-hidden="true"><ellipse cx="140" cy="192" rx="72" ry="13" fill="#7C583D" opacity=".13"/><g transform="translate(81 29) rotate(-3 60 85)"><path d="M20 10 31 0H99L110 10L115 162Q115 172 105 174H25Q15 172 15 162L20 10Z" fill="#F8EBDD" stroke="#D6C0A8" strokeWidth="1.4"/><path d="M20 10 31 0H99L110 10V29H20V10Z" fill="#C27C59"/><path d="M29 17H101" stroke="#E8B29A"/><text x="65" y="48" fontFamily="Georgia,serif" fontSize="7" letterSpacing="1" textAnchor="middle" fill="#475638">KNOW YOUR SPICE</text><circle cx="65" cy="84" r="23" fill="#D9B999"/><g fill="#936541"><ellipse cx="55" cy="76" rx="2.7" ry="7" transform="rotate(-28 55 76)"/><ellipse cx="69" cy="75" rx="2.7" ry="7" transform="rotate(19 69 75)"/><ellipse cx="77" cy="86" rx="2.7" ry="7" transform="rotate(30 77 86)"/><ellipse cx="61" cy="91" rx="2.7" ry="7" transform="rotate(-14 61 91)"/><ellipse cx="49" cy="88" rx="2.7" ry="7" transform="rotate(-30 49 88)"/><ellipse cx="66" cy="83" rx="2.7" ry="7" transform="rotate(11 66 83)"/></g><text x="65" y="132" fontFamily="Georgia,serif" fontSize="15" textAnchor="middle" fill="#324833">Cumin</text><text x="65" y="145" fontFamily="Arial,sans-serif" fontSize="6.5" textAnchor="middle" letterSpacing="1" fill="#65715A">GROUND SPICE</text><text x="65" y="161" fontFamily="Arial,sans-serif" fontSize="7" textAnchor="middle" fill="#65715A">100 g</text></g><circle cx="207" cy="68" r="17" fill="#E7C8AF"/><g fill="#C27C59"><ellipse cx="205" cy="110" rx="4" ry="9" transform="rotate(19 205 110)"/><ellipse cx="218" cy="121" rx="4" ry="9" transform="rotate(-29 218 121)"/><ellipse cx="55" cy="137" rx="4" ry="9" transform="rotate(-33 55 137)"/></g></svg><span className="visual-sparkle sparkle-a">✳</span><span className="visual-sparkle sparkle-b">✳</span></div>
            <div className="product-meta"><div><h3>Cumin Powder</h3><p>Deep, toasty, full of character.</p></div><span className="product-weight">100 g</span></div><div className="product-foot"><span>03</span><span className="product-swatch swatch-rust"></span></div>
          </article>
          <article className="product-card product-pepper">
            <div className="product-visual"><span className="product-index">04 / BOLD</span><svg className="product-illustration" viewBox="0 0 280 230" aria-hidden="true"><ellipse cx="140" cy="192" rx="72" ry="13" fill="#25402B" opacity=".14"/><g transform="translate(81 29) rotate(5 60 85)"><path d="M20 10 31 0H99L110 10L115 162Q115 172 105 174H25Q15 172 15 162L20 10Z" fill="#405B42" stroke="#28462F" strokeWidth="1.4"/><path d="M20 10 31 0H99L110 10V29H20V10Z" fill="#253F2D"/><path d="M29 17H101" stroke="#7F9A78"/><text x="65" y="48" fontFamily="Georgia,serif" fontSize="7" letterSpacing="1" textAnchor="middle" fill="#F7F0DB">KNOW YOUR SPICE</text><circle cx="65" cy="84" r="23" fill="#CFB77B"/><g fill="#283125"><circle cx="55" cy="78" r="4"/><circle cx="70" cy="75" r="4.5"/><circle cx="77" cy="88" r="4"/><circle cx="62" cy="92" r="4.3"/><circle cx="50" cy="88" r="3"/><circle cx="67" cy="83" r="4"/></g><text x="65" y="132" fontFamily="Georgia,serif" fontSize="11.5" textAnchor="middle" fill="#FFF3D9">Black Pepper</text><text x="65" y="145" fontFamily="Arial,sans-serif" fontSize="6.5" textAnchor="middle" letterSpacing="1" fill="#C9D5BD">WHOLE SPICE</text><text x="65" y="161" fontFamily="Arial,sans-serif" fontSize="7" textAnchor="middle" fill="#C9D5BD">50 g</text></g><circle cx="207" cy="68" r="17" fill="#D0C6A7"/><g fill="#263329"><circle cx="207" cy="110" r="4"/><circle cx="216" cy="122" r="3.5"/><circle cx="55" cy="137" r="4"/><circle cx="63" cy="150" r="3.5"/></g><path d="M207 85q14 12 7 22" stroke="#869A78" strokeWidth="2" fill="none"/></svg><span className="visual-sparkle sparkle-a">✳</span><span className="visual-sparkle sparkle-b">✳</span></div>
            <div className="product-meta"><div><h3>Black Pepper</h3><p>Brisk, bold, unmistakably alive.</p></div><span className="product-weight">50 g</span></div><div className="product-foot"><span>04</span><span className="product-swatch swatch-green"></span></div>
          </article>
        </div>
        <p className="product-footnote"><span aria-hidden="true">✳</span> Organic labelling will be used only where the relevant certification and compliance requirements are met.</p>
      </div>
    </section>

    <section className="discovery-section" id="discovery">
      <div className="discovery-pattern" aria-hidden="true"></div>
      <div className="container discovery-grid mx-auto">
        <div className="discovery-copy"><span className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> YOUR FIRST TASTE OF THE STORY</span><h2>Four spices.<br /><em>One considered box.</em></h2><p>The discovery box brings together the four everyday essentials we’re starting with. It’s an easy way to explore the collection, understand the differences, and bring a little more intention to your kitchen.</p><div className="discovery-includes"><div><span className="include-dot dot-gold"></span> Turmeric · 100 g</div><div><span className="include-dot dot-sage"></span> Coriander · 100 g</div><div><span className="include-dot dot-rust"></span> Cumin · 100 g</div><div><span className="include-dot dot-cream"></span> Black pepper · 50 g</div></div><button className="button button-cream open-waitlist" data-interest="Discovery box" onClick={() => openInterest("Discovery box")}>Get launch updates <span aria-hidden="true">↗</span></button><p className="discovery-small">An early look at the collection. No rush, no noise.</p></div>
        <div className="discovery-art"><div className="discovery-circle"></div><div className="box-shadow"></div><div className="gift-box"><div className="gift-lid"><div className="gift-stamp"><span>kys</span><small>KNOW YOUR SPICE</small></div><div className="lid-sprig">✳</div></div><div className="gift-front"><span>FROM SOURCE<br />TO SPOON</span><b>KNOW YOUR SPICE</b><small>THE DISCOVERY COLLECTION · 04 ESSENTIALS</small></div></div><div className="floating-spice spice-bowl-one"><span className="bowl-powder powder-yellow"></span></div><div className="floating-spice spice-bowl-two"><span className="bowl-powder powder-pepper"></span></div><div className="box-sticker">SMALL BATCH<br /><strong>BIG ON TRUST</strong></div><span className="discovery-caption">A good place to begin.</span></div>
      </div>
    </section>

    <section className="section section-trace" id="traceability">
      <div className="container trace-grid mx-auto">
        <div className="trace-copy"><span className="eyebrow"><span className="eyebrow-line"></span> LESS GUESSWORK. MORE KNOW-HOW.</span><h2>Know where it begins.<br /><em>Know what comes next.</em></h2><p>“Organic” is only part of the story. We’re building toward batch-level transparency, so the origin and journey of a spice are easier to understand — not hidden behind a label.</p><div className="trace-tabs" role="tablist" aria-label="Choose a spice to preview"><button className={`trace-tab ${activeSpice === 'turmeric' ? 'active' : ''}`} role="tab" aria-selected={activeSpice === 'turmeric'} data-spice="turmeric" onClick={() => setActiveSpice('turmeric')}>Turmeric</button><button className={`trace-tab ${activeSpice === 'coriander' ? 'active' : ''}`} role="tab" aria-selected={activeSpice === 'coriander'} data-spice="coriander" onClick={() => setActiveSpice('coriander')}>Coriander</button><button className={`trace-tab ${activeSpice === 'cumin' ? 'active' : ''}`} role="tab" aria-selected={activeSpice === 'cumin'} data-spice="cumin" onClick={() => setActiveSpice('cumin')}>Cumin</button><button className={`trace-tab ${activeSpice === 'pepper' ? 'active' : ''}`} role="tab" aria-selected={activeSpice === 'pepper'} data-spice="pepper" onClick={() => setActiveSpice('pepper')}>Black pepper</button></div><p className="trace-disclaimer">Interactive example · sample interface, not a live batch record.</p></div>
        <div className="trace-card" aria-live="polite">
          <div className="trace-card-top"><div><span className="tiny-label">BATCH STORY PREVIEW</span><h3 id="trace-product-name">{traceSpices[activeSpice].name}</h3></div><span className="trace-demo-badge"><span></span> DEMO</span></div>
          <div className="trace-steps">
            <button className={`trace-step ${activeStep === 'source' ? 'selected' : ''}`} data-step="source" aria-pressed={activeStep === 'source'} onClick={() => setActiveStep('source')}><span className="step-icon"><svg viewBox="0 0 28 28"><path d="M4 23V11L14 5L24 11V23H4Z"/><path d="M10 23V15H18V23M2 11L14 3L26 11"/></svg></span><span className="step-number">01</span><span className="step-name">Farm / source</span><span className="step-chevron">↗</span></button>
            <button className={`trace-step ${activeStep === 'region' ? 'selected' : ''}`} data-step="region" aria-pressed={activeStep === 'region'} onClick={() => setActiveStep('region')}><span className="step-icon"><svg viewBox="0 0 28 28"><path d="M14 25S23 16 23 10A9 9 0 0 0 5 10C5 16 14 25 14 25Z"/><circle cx="14" cy="10" r="3"/></svg></span><span className="step-number">02</span><span className="step-name">Harvest region</span><span className="step-chevron">↗</span></button>
            <button className={`trace-step ${activeStep === 'process' ? 'selected' : ''}`} data-step="process" aria-pressed={activeStep === 'process'} onClick={() => setActiveStep('process')}><span className="step-icon"><svg viewBox="0 0 28 28"><path d="M5 8H23V23H5Z M9 8V4H19V8M9 13H19M9 17H16"/></svg></span><span className="step-number">03</span><span className="step-name">Processing batch</span><span className="step-chevron">↗</span></button>
            <button className={`trace-step ${activeStep === 'testing' ? 'selected' : ''}`} data-step="testing" aria-pressed={activeStep === 'testing'} onClick={() => setActiveStep('testing')}><span className="step-icon"><svg viewBox="0 0 28 28"><path d="M10 4H18M12 4V12L5 22Q4 24 7 24H21Q24 24 23 22L16 12V4M9 18H19"/></svg></span><span className="step-number">04</span><span className="step-name">Quality checks</span><span className="step-chevron">↗</span></button>
            <button className={`trace-step ${activeStep === 'packing' ? 'selected' : ''}`} data-step="packing" aria-pressed={activeStep === 'packing'} onClick={() => setActiveStep('packing')}><span className="step-icon"><svg viewBox="0 0 28 28"><path d="M6 8L14 4L22 8V21L14 25L6 21V8Z M6 8L14 13L22 8M14 13V25"/></svg></span><span className="step-number">05</span><span className="step-name">Packing date</span><span className="step-chevron">↗</span></button>
          </div>
          <div className="trace-detail"><span className="detail-index" id="trace-detail-index">{traceSteps[activeStep].index}</span><h4 id="trace-detail-title">{traceSteps[activeStep].title}</h4><p id="trace-detail-copy">{traceSpices[activeSpice][activeStep]}</p><div className="trace-detail-footer"><span className="detail-dot"></span><span id="trace-detail-status">{traceSteps[activeStep].status}</span></div></div>
          <div className="trace-card-footer"><span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 17 5V10C17 14 14 17 10 18C6 17 3 14 3 10V5L10 2Z"/><path d="m7 10 2 2 4-4"/></svg> Transparency, designed in</span><span className="trace-mini-code">KYS / PREVIEW</span></div>
        </div>
      </div>
      <div className="container trace-chain mx-auto"><span className="tiny-label">THE JOURNEY WE’RE BUILDING TOWARD</span><div className="chain-line"><span>Farm / source</span><i>→</i><span>Harvest region</span><i>→</i><span>Processing batch</span><i>→</i><span>Quality checks</span><i>→</i><span>Packing date</span></div></div>
    </section>

    <section className="section process-section" id="story">
      <div className="container mx-auto">
        <div className="section-heading process-heading"><span className="eyebrow"><span className="eyebrow-line"></span> FROM SOURCE TO SPOON</span><h2>Less unnecessary processing.<br /><em>More care at every step.</em></h2><p>Our approach is deliberately lean: work with suitable suppliers and licensed processors, set clear standards, and grow only when real customers come back for more.</p></div>
        <div className="process-grid">
          <article className="process-card"><div className="process-illustration ill-farm"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M14 67H86" stroke="#A8B496" strokeWidth="1.5"/><path d="M19 61L33 31L47 61M33 31V67M51 61L65 20L79 61M65 20V67" stroke="#426D4A" strokeWidth="2" strokeLinecap="round"/><path d="M22 44C9 36 12 26 27 27C31 37 28 42 22 44ZM68 41C82 36 84 26 71 24C63 32 63 38 68 41Z" fill="#9CAF7D"/><circle cx="33" cy="31" r="4" fill="#E2B849"/><circle cx="65" cy="20" r="4" fill="#E2B849"/></svg></div><span className="process-count">01 — SOURCE</span><h3>Know the origin</h3><p>Work with sourcing partners who can share meaningful information about where spices come from.</p></article>
          <article className="process-card"><div className="process-illustration ill-clean"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M15 27H85L77 62H23L15 27Z" fill="#E9D9B9" stroke="#A99468" strokeWidth="1.5"/><path d="M19 33H81M22 42H78M25 51H75" stroke="#C0AC84" strokeWidth="1.5"/><g fill="#B18B40"><circle cx="33" cy="37" r="3"/><circle cx="46" cy="47" r="3"/><circle cx="59" cy="35" r="3"/><circle cx="70" cy="48" r="3"/><circle cx="38" cy="54" r="2.5"/><circle cx="63" cy="55" r="2.5"/></g><path d="M29 19L33 13M50 17V10M70 19L74 13" stroke="#C1A878" strokeWidth="1.5" strokeLinecap="round"/></svg></div><span className="process-count">02 — PREPARE</span><h3>Keep it considered</h3><p>Clean, condition, grind and sieve with consistency in mind — not processing for processing’s sake.</p></article>
          <article className="process-card"><div className="process-illustration ill-check"><svg viewBox="0 0 100 80" aria-hidden="true"><rect x="26" y="9" width="48" height="61" rx="5" fill="#F7F0DE" stroke="#8FA58B" strokeWidth="1.5"/><path d="M37 25H64M37 36H57M37 47H51" stroke="#8FA58B" strokeWidth="2" strokeLinecap="round"/><circle cx="68" cy="57" r="15" fill="#3F6749"/><path d="m61 57 5 5 9-11" stroke="#FFF8E9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span className="process-count">03 — VERIFY</span><h3>Make checks visible</h3><p>Quality specifications and available batch information should be clear — and claims should be supportable.</p></article>
          <article className="process-card"><div className="process-illustration ill-pack"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M29 14L37 7H63L71 14L75 67H25L29 14Z" fill="#D8A63D" stroke="#B88623" strokeWidth="1.5"/><path d="M29 14H71V24H29Z" fill="#B88623"/><text x="50" y="39" fontFamily="Georgia,serif" fontSize="6" textAnchor="middle" fill="#2C4932">KNOW YOUR</text><text x="50" y="47" fontFamily="Georgia,serif" fontSize="6" textAnchor="middle" fill="#2C4932">SPICE</text><path d="M41 55H59" stroke="#F5E5BA"/><path d="M36 60H64" stroke="#F5E5BA" opacity=".8"/></svg></div><span className="process-count">04 — PACK</span><h3>Ready for your kitchen</h3><p>Food-grade packaging, essential product information and a batch reference designed to be easy to find.</p></article>
        </div>
        <div className="process-note"><span className="note-flower">✳</span><p><strong>A clear promise matters.</strong> We’ll publish specific sourcing, testing and certification details when they’re verified for the product and batch.</p><a href="#faq" className="text-link">What that means <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="closing-cta">
      <div className="closing-leaf closing-leaf-one" aria-hidden="true"></div><div className="closing-leaf closing-leaf-two" aria-hidden="true"></div>
      <div className="container closing-content"><span className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> A BETTER PANTRY STARTS SMALL</span><h2>Bring home a little more <em>knowing.</em></h2><p>Follow the first collection from Kerala to your kitchen.</p><button className="button button-cream open-waitlist" data-interest="Launch updates" onClick={() => openInterest("Launch updates")}>Keep me in the loop <span aria-hidden="true">↗</span></button><div className="closing-footnotes"><span><i></i> Small-batch thinking</span><span><i></i> Honest product stories</span><span><i></i> No unnecessary noise</span></div></div>
    </section>
  </main>

  <footer className="site-footer" id="faq">
    <div className="container footer-top"><div className="footer-brand-col"><a className="brand brand-footer" href="#top"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 36 36"><path d="M7 26C7 13 17 6 29 6C29 18 22 29 9 29" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 29C13 21 18 16 27 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M17 20C16 14 12 11 7 11C7 17 10 22 17 23" fill="currentColor" opacity=".75"/></svg></span><span className="brand-name">know your <b>spice.</b><small>KERALA · INDIA</small></span></a><p>Real spices. Cleanly sourced.<br />Freshly processed. Nothing unnecessary.</p></div><div className="footer-links"><div><span className="tiny-label">EXPLORE</span><a href="#spices">Our spices</a><a href="#discovery">Discovery box</a><a href="#traceability">Traceability</a><a href="#story">Our approach</a></div><div><span className="tiny-label">GOOD TO KNOW</span><button className="faq-trigger" aria-expanded={openFaq === 'organic'} aria-controls="faq-organic" onClick={() => setOpenFaq((current) => current === 'organic' ? null : 'organic')}>How do you define organic?</button><div className="faq-answer" id="faq-organic" hidden={openFaq !== 'organic'}>We will use organic claims only for products covered by the relevant certification and food-safety requirements. Verified details should be shown with the product.</div><button className="faq-trigger" aria-expanded={openFaq === 'kerala'} aria-controls="faq-kerala" onClick={() => setOpenFaq((current) => current === 'kerala' ? null : 'kerala')}>Does every spice grow in Kerala?</button><div className="faq-answer" id="faq-kerala" hidden={openFaq !== 'kerala'}>Not necessarily. The plan is to source from suitable growing regions across India and process and pack in Kerala, rather than force every spice to have the same origin.</div><button className="faq-trigger" aria-expanded={openFaq === 'tests'} aria-controls="faq-tests" onClick={() => setOpenFaq((current) => current === 'tests' ? null : 'tests')}>Will I be able to see test results?</button><div className="faq-answer" id="faq-tests" hidden={openFaq !== 'tests'}>The brand is designed around batch-level transparency. Specific test results and quality details should be shared when they are available and verified for that batch.</div><button className="faq-trigger" aria-expanded={openFaq === 'launch'} aria-controls="faq-launch" onClick={() => setOpenFaq((current) => current === 'launch' ? null : 'launch')}>When will the collection launch?</button><div className="faq-answer" id="faq-launch" hidden={openFaq !== 'launch'}>The initial collection and launch timeline are still being validated. Join the launch list to express interest and receive updates once details are confirmed.</div></div></div></div>
    <div className="container footer-bottom"><span>© <span id="year">{new Date().getFullYear()}</span> Know Your Spice. Made thoughtfully.</span><span className="footer-tagline">GOOD SPICE. CLEAR STORIES. <span aria-hidden="true">✳</span></span><button type="button" className="back-top" onClick={scrollToTop} aria-label="Scroll smoothly to the top of the page">Back to top ↑</button></div>
  </footer>

  <div className="modal-backdrop" id="waitlist-modal" hidden={!modalOpen} onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
    <section className="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <button className="modal-close" type="button" aria-label="Close dialog" onClick={closeModal}>×</button>
      <span className="modal-spark">✳</span><span className="eyebrow"><span className="eyebrow-line"></span> STAY IN THE KNOW</span><h2 id="modal-title">Something good is <em>growing.</em></h2><p id="modal-description">Leave your details to register interest in the first Know Your Spice collection.</p>
      <form id="waitlist-form" onSubmit={handleFormSubmit}><label htmlFor="email">Your email address</label><input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" required /><label htmlFor="interest">I’m most curious about</label><select id="interest" name="interest" value={modalInterest} onChange={(event) => setModalInterest(event.target.value)}><option>Discovery box</option><option>Turmeric</option><option>Coriander</option><option>Cumin</option><option>Black pepper</option><option>Launch updates</option></select><button className="button button-dark form-submit" type="submit">Register interest <span aria-hidden="true">↗</span></button><p className="form-privacy">This demo form does not send your information to a server.</p><div className="form-success" id="form-success" role="status" hidden={!formSubmitted}><span>✓</span><div><strong>You’re on the demo list.</strong><p>Your interest is saved for this preview only. Connect a backend before launch.</p></div></div></form>
    </section>
  </div>
    </>
  );
}
