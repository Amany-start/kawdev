"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(" ");

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

const Background = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute rounded-full blur-[130px] opacity-[0.18] animate-pulse"
      style={{ width: 700, height: 700, top: -150, left: "55%", background: "radial-gradient(circle,#6c63ff 0%,transparent 70%)", animationDuration: "7s" }} />
    <div className="absolute rounded-full blur-[100px] opacity-[0.13] animate-pulse"
      style={{ width: 450, height: 450, bottom: "8%", left: "-8%", background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)", animationDuration: "9s" }} />
  </div>
);

const NavBar = ({ ctaText }: { ctaText: string }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "backdrop-blur-xl bg-[#07070f]/85 border-b border-white/[0.06] py-3" : "py-6")}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>KAW</span>
          <span className="text-sm font-bold tracking-[0.15em] text-white/50 uppercase">
            Prompt<span className="text-white font-black">Pro</span>
          </span>
        </div>
        <a href="#waitlist"
          className="text-xs font-bold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border border-violet-500/40 text-violet-300 hover:bg-violet-500/15 transition-all duration-300">
          {ctaText} →
        </a>
      </div>
    </nav>
  );
};

const Hero = ({ content }: { content: Record<string, string> }) => {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 z-10">
      <div className={cn("mb-10 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-xs font-bold tracking-[0.14em] uppercase">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          {content.hero_badge}
        </span>
      </div>
      <h1 className={cn("font-black leading-[1.08] tracking-tight max-w-4xl transition-all duration-700 delay-100 text-5xl md:text-6xl lg:text-7xl",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
        <span className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#60a5fa,#67e8f9)" }}>
          {content.hero_title}
        </span>
      </h1>
      <p className={cn("mt-8 text-lg md:text-xl leading-[1.75] max-w-2xl transition-all duration-700 delay-200 text-white/75 font-medium",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
        {content.hero_subtitle}
      </p>
      <div className={cn("mt-12 flex flex-col sm:flex-row gap-4 items-center transition-all duration-700 delay-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
        <a href="#waitlist"
          className="px-8 py-4 rounded-full font-black text-sm tracking-[0.1em] uppercase text-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
          {content.cta_text} →
        </a>
        <span className="text-white/45 text-xs font-semibold">Gratuit · Accès Prioritaire · 0 Spam</span>
      </div>
      <div className={cn("mt-20 grid grid-cols-3 gap-10 md:gap-20 transition-all duration-700 delay-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
        {[
          { value: "10×", label: "Gain de Productivité" },
          { value: "3", label: "Modules Intensifs" },
          { value: "0", label: "Prérequis IA" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#a78bfa,#60a5fa)" }}>{s.value}</div>
            <div className="mt-2 text-xs font-bold text-white/50 tracking-[0.1em] uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Credibility = () => {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className={cn("max-w-4xl mx-auto transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-xl font-black text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed44,#3b82f644)", border: "1.5px solid rgba(124,58,237,0.4)" }}>KAW</div>
            <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-green-400 border-2 border-[#07070f]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-violet-400 mb-2">Votre Formateur</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">Kouassi Amany Williams</h2>
            <p className="text-white/60 text-sm font-medium mb-6">Ingénieur Mécatronique · Builder IA · Prompt Engineer</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {[
                { icon: "🏆", label: "Lauréat International Robotics Cup" },
                { icon: "🎓", label: "Certifié Fab Academy — MIT" },
                { icon: "⚙️", label: "Ingénieur Mécatronique" },
              ].map(({ icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/80 text-xs font-semibold">
                  <span>{icon}</span>{label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programme = ({ content }: { content: Record<string, string> }) => {
  const { ref, visible } = useFadeIn();
  const modules = [
    { num: "01", key: "module1_title", subtitle: "Comprendre l'Architecture", desc: "Anatomie des LLMs, transformers, tokens, embeddings. Paramètres critiques : température, top-p.", tags: ["Transformers", "Tokenisation", "Few-shot", "Fine-tuning"], accent: "text-violet-400", border: "border-violet-500/25", glow: "rgba(124,58,237,0.15)" },
    { num: "02", key: "module2_title", subtitle: "Chain-of-Thought & Anti-Hallucinations", desc: "Chain-of-Thought, RAG et self-consistency. Méthodes de vérification pour des sorties fiables.", tags: ["Chain-of-Thought", "RAG", "Self-Consistency", "Vérification"], accent: "text-blue-400", border: "border-blue-500/25", glow: "rgba(59,130,246,0.15)" },
    { num: "03", key: "module3_title", subtitle: "IA dans les Workflows Techniques", desc: "Agents autonomes, pipelines multi-modèles, maintenance prédictive et génération de code.", tags: ["LangChain", "Agents IA", "Pipelines", "API"], accent: "text-cyan-400", border: "border-cyan-500/25", glow: "rgba(6,182,212,0.15)" },
  ];
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={cn("text-center mb-16 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400 mb-4">Le Programme</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">3 Modules. <span className="text-white/40">Zéro Superflu.</span></h2>
          <p className="mt-4 text-white/60 text-base font-medium max-w-xl mx-auto">Un parcours dense et immédiatement applicable.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div key={m.num}
              className={cn("rounded-2xl border bg-white/[0.025] p-8 flex flex-col transition-all duration-700 hover:-translate-y-1", m.border, visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}
              style={{ transitionDelay: `${i * 120}ms`, boxShadow: `0 0 40px ${m.glow}` }}>
              <div className={cn("text-5xl font-black opacity-15 mb-6 select-none", m.accent)}>{m.num}</div>
              <h3 className="text-xl font-black text-white mb-1">{content[m.key] || m.key}</h3>
              <p className={cn("text-xs font-bold tracking-[0.1em] uppercase mb-4", m.accent)}>{m.subtitle}</p>
              <p className="text-white/65 text-sm leading-[1.75] font-medium mb-6 flex-1">{m.desc}</p>
              <div className="flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span key={t} className={cn("text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]", m.accent)}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WaitlistForm = ({ ctaText }: { ctaText: string }) => {
  const { ref, visible } = useFadeIn();
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    const { error } = await supabase.from("leads").insert([{ name: form.name, email: form.email, source: "landing_page" }]);
    setStatus(error && error.code !== "23505" ? "error" : "success");
  };
  return (
    <section id="waitlist" ref={ref as React.RefObject<HTMLElement>} className="relative z-10 py-24 px-6">
      <div className={cn("max-w-xl mx-auto transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <div className="rounded-3xl border border-violet-500/20 p-10 md:p-14 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg,rgba(124,58,237,0.08) 0%,rgba(7,7,15,0.6) 100%)" }}>
          <div className="relative z-10 text-center mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400 mb-3">Accès Prioritaire</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Réservez Votre Place</h2>
            <p className="text-white/55 text-sm font-medium">Les premiers inscrits bénéficient d'un <strong className="text-white/80">tarif Early Bird exclusif</strong>.</p>
          </div>
          {status === "success" ? (
            <div className="relative z-10 flex flex-col items-center gap-5 py-6 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>✅</div>
              <h3 className="text-xl font-black text-white">Vous êtes sur la liste !</h3>
              <p className="text-white/55 text-sm font-medium max-w-xs">Merci <strong className="text-white">{form.name}</strong> ! Vous serez notifié à <strong className="text-violet-300">{form.email}</strong>.</p>
              <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full">🚀 Accès Early Bird Confirmé</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              <div>
                <label className="block text-xs font-bold text-white/55 tracking-[0.12em] uppercase mb-2">Prénom / Nom</label>
                <input type="text" placeholder="Kouassi Williams" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-4 text-white text-sm font-medium placeholder-white/25 focus:outline-none focus:border-violet-500/60 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/55 tracking-[0.12em] uppercase mb-2">Adresse Email</label>
                <input type="email" placeholder="vous@domaine.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-4 text-white text-sm font-medium placeholder-white/25 focus:outline-none focus:border-violet-500/60 transition-all" />
              </div>
              {status === "error" && <p className="text-red-400 text-xs font-medium">Une erreur est survenue. Réessayez.</p>}
              <button type="submit" disabled={status === "loading"}
                className="w-full py-4 rounded-xl font-black text-sm tracking-[0.1em] uppercase text-white hover:scale-[1.02] transition-all disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
                {status === "loading" ? <span className="flex items-center justify-center gap-3"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi en cours…</span> : `${ctaText} →`}
              </button>
              <p className="text-center text-white/30 text-xs pt-1">🔒 Zéro spam. Désabonnement en 1 clic.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative z-10 py-12 px-6 border-t border-white/[0.06]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>KAW</span>
        <span className="text-xs font-bold text-white/35 tracking-[0.14em] uppercase">PromptPro — Kouassi Amany Williams</span>
      </div>
      <div className="flex items-center gap-4">
        {[{ label: "LinkedIn", icon: "in", href: "#" }, { label: "GitHub", icon: "gh", href: "#" }, { label: "X", icon: "𝕏", href: "#" }].map((s) => (
          <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">{s.icon}</a>
        ))}
      </div>
      <p className="text-white/25 text-xs font-medium">© 2026 Kouassi Amany Williams · Tous droits réservés</p>
    </div>
  </footer>
);

export default function ClientPage({ content }: { content: Record<string, string> }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    supabase.from("page_views").insert([{ page: "/" }]).then(() => {});
    return () => { document.head.removeChild(link); };
  }, []);
  return (
    <div className="relative min-h-screen" style={{ background: "#07070f", color: "#f0f0ff", fontFamily: "'DM Sans', sans-serif" }}>
      <Background />
      <NavBar ctaText={content.cta_text} />
      <main>
        <Hero content={content} />
        <Credibility />
        <Programme content={content} />
        <WaitlistForm ctaText={content.cta_text} />
      </main>
      <Footer />
    </div>
  );
}
