"use client";

import { useState, useEffect, useRef } from "react";

// ─── Utility ──────────────────────────────────────────────────────────────────
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
const useFadeIn = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

// ─── Background atmosphérique ─────────────────────────────────────────────────
const Background = () => (
  <>
    {/* Grain */}
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.035] z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
    {/* Orbs lumineux */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute rounded-full blur-[130px] opacity-[0.18] animate-pulse"
        style={{ width: 700, height: 700, top: -150, left: "55%", background: "radial-gradient(circle, #6c63ff 0%, transparent 70%)", animationDuration: "7s" }}
      />
      <div
        className="absolute rounded-full blur-[100px] opacity-[0.13] animate-pulse"
        style={{ width: 450, height: 450, bottom: "8%", left: "-8%", background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", animationDuration: "9s", animationDelay: "2s" }}
      />
    </div>
  </>
);

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "backdrop-blur-xl bg-[#07070f]/85 border-b border-white/[0.06] py-3" : "py-6"
    )}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white select-none"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
          >
            KAW
          </span>
          <span className="text-sm font-bold tracking-[0.15em] text-white/50 uppercase">
            Prompt<span className="text-white font-black">Pro</span>
          </span>
        </div>
        {/* CTA nav */}
        <a
          href="#waitlist"
          className="text-xs font-bold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border border-violet-500/40 text-violet-300 hover:bg-violet-500/15 hover:border-violet-400/60 transition-all duration-300"
        >
          Liste d'attente →
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 z-10"
    >
      {/* Badge */}
      <div className={cn("mb-10 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-xs font-bold tracking-[0.14em] uppercase">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Masterclass — Ouverture Prochaine
        </span>
      </div>

      {/* Titre principal — texte fort et lisible */}
      <h1
        className={cn(
          "font-black leading-[1.08] tracking-tight max-w-4xl transition-all duration-700 delay-100",
          "text-5xl md:text-6xl lg:text-7xl",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <span className="text-white drop-shadow-sm">Maîtrisez le </span>
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #a78bfa, #60a5fa, #67e8f9)" }}
        >
          Prompt Engineering
        </span>
        <br />
        <span className="text-white drop-shadow-sm">comme un Ingénieur.</span>
      </h1>

      {/* Sous-titre — lisible, contrasté */}
      <p
        className={cn(
          "mt-8 text-lg md:text-xl leading-[1.75] max-w-2xl transition-all duration-700 delay-200",
          "text-white/75 font-medium",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        Multipliez votre productivité par <strong className="text-white font-bold">10×</strong>. Automatisez vos workflows techniques.
        Éliminez les hallucinations des LLMs. Une formation conçue{" "}
        <em className="text-violet-300 not-italic font-semibold">par un ingénieur, pour des ingénieurs et créateurs</em>.
      </p>

      {/* CTA */}
      <div
        className={cn(
          "mt-12 flex flex-col sm:flex-row gap-4 items-center transition-all duration-700 delay-300",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <a
          href="#waitlist"
          className="group relative px-8 py-4 rounded-full font-black text-sm tracking-[0.1em] uppercase text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] shadow-[0_0_20px_rgba(124,58,237,0.25)]"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
        >
          Rejoindre la Liste d'Attente →
        </a>
        <span className="text-white/45 text-xs font-semibold tracking-wide">Gratuit · Accès Prioritaire · 0 Spam</span>
      </div>

      {/* Stats */}
      <div
        className={cn(
          "mt-20 grid grid-cols-3 gap-10 md:gap-20 transition-all duration-700 delay-500",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        {[
          { value: "10×", label: "Gain de Productivité" },
          { value: "3", label: "Modules Intensifs" },
          { value: "0", label: "Prérequis IA" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="text-4xl md:text-5xl font-black bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}
            >
              {s.value}
            </div>
            <div className="mt-2 text-xs font-bold text-white/50 tracking-[0.1em] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Scroll</span>
      </div>
    </section>
  );
};

// ─── Crédibilité ──────────────────────────────────────────────────────────────
const Credibility = () => {
  const { ref, visible } = useFadeIn();
  const badges = [
    { icon: "🏆", label: "Lauréat International et national Technoxian Robotics Cup" },
    { icon: "🎓", label: "Certifié Fab Academy MIT Boston" },
    { icon: "⚙️", label: "Ingénieur Mécatronique ESIGELEC/INP-HB" },
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className={cn("max-w-4xl mx-auto transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        {/* Card */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-[0_0_40px_rgba(124,58,237,0.35)]"
              style={{ background: "linear-gradient(135deg, #7c3aed44, #3b82f644)", border: "1.5px solid rgba(124,58,237,0.4)" }}
            >
              KAW
            </div>
            <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-green-400 border-2 border-[#07070f]" />
          </div>

          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-violet-400 mb-2">Votre Formateur</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
              Kouassi Amany Williams
            </h2>
            <p className="text-white/60 text-sm font-medium mb-6">
              Ingénieur Mécatronique et Robotique · Builder IA · Prompt Engineer
            </p>
            {/* Badges crédibilité */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {badges.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/80 text-xs font-semibold"
                >
                  <span>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Programme ────────────────────────────────────────────────────────────────
const modules = [
  {
    num: "01",
    title: "Fondations & LLM",
    subtitle: "Comprendre l'Architecture",
    desc: "Plongez dans l'anatomie réelle des modèles de langage. Comprenez les transformers, les tokens, les embeddings et les paramètres critiques (température, top-p) qui dictent la qualité de vos résultats.",
    tags: ["Transformers", "Tokenisation", "Few-shot", "Fine-tuning"],
    accent: "text-violet-400",
    border: "border-violet-500/25",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    num: "02",
    title: "Frameworks Avancés",
    subtitle: "Chain-of-Thought & Anti-Hallucinations",
    desc: "Maîtrisez les techniques qui font la différence : Chain-of-Thought, Tree-of-Thought, RAG et méthodes de vérification pour des sorties fiables et reproductibles dans des contextes critiques.",
    tags: ["Chain-of-Thought", "RAG", "Self-Consistency", "Vérification"],
    accent: "text-blue-400",
    border: "border-blue-500/25",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    num: "03",
    title: "Automatisation Industrielle",
    subtitle: "IA dans les Workflows Techniques",
    desc: "Intégrez l'IA dans vos processus d'ingénierie réels : agents autonomes, pipelines multi-modèles, maintenance prédictive et génération de code. Des cas pratiques concrets, pas de la théorie.",
    tags: ["LangChain", "Agents IA", "Pipelines", "API"],
    accent: "text-cyan-400",
    border: "border-cyan-500/25",
    glow: "rgba(6,182,212,0.15)",
  },
];

const Programme = () => {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={cn("text-center mb-16 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400 mb-4">Le Programme</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            3 Modules. <span className="text-white/40">Zéro Superflu.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base font-medium max-w-xl mx-auto leading-relaxed">
            Un parcours dense, structuré et immédiatement applicable par des profils techniques exigeants.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div
              key={m.num}
              className={cn(
                "rounded-2xl border bg-white/[0.025] backdrop-blur-sm p-8 flex flex-col transition-all duration-700 hover:-translate-y-1 hover:bg-white/[0.04]",
                m.border,
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDelay: `${i * 120}ms`,
                boxShadow: `0 0 40px ${m.glow}`,
              }}
            >
              {/* Numéro */}
              <div className={cn("text-5xl font-black opacity-15 mb-6 select-none", m.accent)}>{m.num}</div>

              {/* Titre */}
              <h3 className="text-xl font-black text-white mb-1 tracking-tight">{m.title}</h3>
              <p className={cn("text-xs font-bold tracking-[0.1em] uppercase mb-4", m.accent)}>{m.subtitle}</p>

              {/* Description — texte lisible */}
              <p className="text-white/65 text-sm leading-[1.75] font-medium mb-6 flex-1">{m.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]",
                      m.accent
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Formulaire Waitlist ──────────────────────────────────────────────────────
const WaitlistForm = () => {
  const { ref, visible } = useFadeIn();
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <section id="waitlist" ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className={cn("max-w-xl mx-auto transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <div
          className="rounded-3xl border border-violet-500/20 backdrop-blur-sm p-10 md:p-14 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, rgba(124,58,237,0.08) 0%, rgba(7,7,15,0.6) 100%)" }}
        >
          {/* Glow card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl bg-violet-600/15 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 text-center mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400 mb-3">Accès Prioritaire</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Réservez Votre Place
            </h2>
            <p className="text-white/55 text-sm font-medium leading-relaxed">
              Les premiers inscrits bénéficient d'un <strong className="text-white/80">tarif Early Bird exclusif</strong> et d'un accès en avant-première au contenu.
            </p>
          </div>

          {status === "success" ? (
            <div className="relative z-10 flex flex-col items-center gap-5 py-6 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.2))", border: "1px solid rgba(16,185,129,0.3)" }}
              >
                ✅
              </div>
              <h3 className="text-xl font-black text-white">Vous êtes sur la liste !</h3>
              <p className="text-white/55 text-sm font-medium leading-relaxed max-w-xs">
                Merci <strong className="text-white">{form.name}</strong> ! Votre invitation sera envoyée à{" "}
                <strong className="text-violet-300">{form.email}</strong> lors du lancement.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full">
                🚀 Accès Early Bird Confirmé
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Champ Prénom */}
              <div>
                <label className="block text-xs font-bold text-white/55 tracking-[0.12em] uppercase mb-2">
                  Prénom / Nom
                </label>
                <input
                  type="text"
                  placeholder="Kouassi Williams"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-4 text-white text-sm font-medium placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] transition-all duration-200"
                />
              </div>

              {/* Champ Email */}
              <div>
                <label className="block text-xs font-bold text-white/55 tracking-[0.12em] uppercase mb-2">
                  Adresse Email
                </label>
                <input
                  type="email"
                  placeholder="vous@domaine.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-4 text-white text-sm font-medium placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] transition-all duration-200"
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-2 py-4 rounded-xl font-black text-sm tracking-[0.1em] uppercase text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours…
                  </span>
                ) : "Réserver Ma Place →"}
              </button>

              <p className="text-center text-white/30 text-xs font-medium pt-1">
                🔒 Zéro spam. Désabonnement en 1 clic. Données protégées.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative z-10 py-12 px-6 border-t border-white/[0.06]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
        >
          KAW
        </span>
        <span className="text-xs font-bold text-white/35 tracking-[0.14em] uppercase">
          PromptPro — Kouassi Amany Williams
        </span>
      </div>

      <div className="flex items-center gap-4">
        {[
          { label: "LinkedIn", icon: "in", href: "#" },
          { label: "GitHub", icon: "gh", href: "#" },
          { label: "X", icon: "𝕏", href: "#" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
          >
            {s.icon}
          </a>
        ))}
      </div>

      <p className="text-white/25 text-xs font-medium">
        © 2026 Kouassi Amany Williams · Tous droits réservés
      </p>
    </div>
  </footer>
);

// ─── Page principale ──────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    // Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#07070f",
        color: "#f0f0ff",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Background />
      <NavBar />
      <main>
        <Hero />
        <Credibility />
        <Programme />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
