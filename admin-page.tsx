"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────
type Lead = { id: string; name: string; email: string; source: string; status: string; created_at: string; };
type Content = { id: string; key: string; value: string; };
type Testimonial = { id: string; name: string; role: string; video_url: string; is_active: boolean; order_index: number; };
type Tab = "dashboard" | "leads" | "content" | "testimonials";

// ─── Couleurs ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#07070f", surface: "#0d1322", card: "#111827",
  border: "#1e2d45", accent: "#7c3aed", accent2: "#3b82f6",
  text: "#f1f5f9", muted: "#64748b", success: "#10b981", danger: "#ef4444",
};

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (email === "amany.kaw@gmail.com" && password === "kawdev2026") {
      localStorage.setItem("kawdev_admin", "true");
      onLogin();
    } else {
      setError("Email ou mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 24px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "14px", fontWeight: 900, color: "#fff" }}>KAW</div>
          <h1 style={{ color: C.text, fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Panel Admin</h1>
          <p style={{ color: C.muted, fontSize: "0.875rem", marginTop: "6px" }}>KAW.DEV — Espace de gestion</p>
        </div>

        {/* Formulaire */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "32px" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="amany.kaw@gmail.com"
                style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: C.danger, fontSize: "0.8rem", margin: 0 }}>⚠ {error}</p>}
            <button type="submit" disabled={loading}
              style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontWeight: 800, fontSize: "0.9rem", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "8px" }}>
              {loading ? "Connexion..." : "Se connecter →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
const Dashboard = () => {
  const [stats, setStats] = useState({ leads: 0, today: 0, week: 0, views: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const load = async () => {
      const { count: total } = await supabase.from("leads").select("*", { count: "exact", head: true });
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const week = new Date(); week.setDate(week.getDate() - 7);
      const { count: todayCount } = await supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", today.toISOString());
      const { count: weekCount } = await supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", week.toISOString());
      const { count: views } = await supabase.from("page_views").select("*", { count: "exact", head: true });
      const { data: recent } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5);
      setStats({ leads: total || 0, today: todayCount || 0, week: weekCount || 0, views: views || 0 });
      setRecentLeads(recent || []);
    };
    load();
  }, []);

  const StatCard = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) => (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "24px", flex: 1 }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontSize: "2rem", fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: C.muted, marginTop: "4px", fontWeight: 600 }}>{label}</div>
    </div>
  );

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: "1.4rem", fontWeight: 800, marginBottom: "24px" }}>Dashboard</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
        <StatCard label="Total inscrits" value={stats.leads} color={C.accent} icon="👥" />
        <StatCard label="Aujourd'hui" value={stats.today} color={C.success} icon="📈" />
        <StatCard label="Cette semaine" value={stats.week} color={C.accent2} icon="📅" />
        <StatCard label="Visites" value={stats.views} color="#f59e0b" icon="👁️" />
      </div>

      {/* Derniers inscrits */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "24px" }}>
        <h3 style={{ color: C.text, fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Derniers inscrits</h3>
        {recentLeads.length === 0 ? (
          <p style={{ color: C.muted, fontSize: "0.875rem" }}>Aucun inscrit pour le moment</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentLeads.map(lead => (
              <div key={lead.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: C.surface, borderRadius: "8px" }}>
                <div>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: "0.9rem" }}>{lead.name}</div>
                  <div style={{ color: C.muted, fontSize: "0.8rem" }}>{lead.email}</div>
                </div>
                <div style={{ color: C.muted, fontSize: "0.75rem" }}>{new Date(lead.created_at).toLocaleDateString("fr-FR")}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Leads Manager ────────────────────────────────────────────────────────────
const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  const exportCSV = () => {
    const csv = ["Nom,Email,Source,Date", ...leads.map(l => `${l.name},${l.email},${l.source},${new Date(l.created_at).toLocaleDateString("fr-FR")}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "leads-kawdev.csv"; a.click();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Supprimer ce lead ?")) return;
    await supabase.from("leads").delete().eq("id", id);
    loadLeads();
  };

  const filtered = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ color: C.text, fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>Leads ({leads.length})</h2>
        <button onClick={exportCSV} style={{ background: C.success, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
          ⬇ Exporter CSV
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par nom ou email..."
        style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none", marginBottom: "16px", boxSizing: "border-box" }} />

      {loading ? <p style={{ color: C.muted }}>Chargement...</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.length === 0 ? <p style={{ color: C.muted }}>Aucun lead trouvé</p> : filtered.map(lead => (
            <div key={lead.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.text, fontWeight: 700 }}>{lead.name}</div>
                <div style={{ color: C.muted, fontSize: "0.85rem" }}>{lead.email}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: C.muted, fontSize: "0.8rem" }}>{new Date(lead.created_at).toLocaleDateString("fr-FR")}</span>
                <button onClick={() => deleteLead(lead.id)} style={{ background: "transparent", border: `1px solid ${C.danger}`, color: C.danger, borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "0.8rem" }}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Content Editor ───────────────────────────────────────────────────────────
const ContentEditor = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => setContents(data || []));
  }, []);

  const updateContent = async (id: string, value: string) => {
    setSaving(id);
    await supabase.from("site_content").update({ value, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(null); setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const labels: Record<string, string> = {
    hero_title: "Titre principal (Hero)",
    hero_subtitle: "Sous-titre (Hero)",
    hero_badge: "Badge (Masterclass...)",
    cta_text: "Texte du bouton CTA",
    module1_title: "Module 1 — Titre",
    module2_title: "Module 2 — Titre",
    module3_title: "Module 3 — Titre",
  };

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>Modifier le contenu</h2>
      <p style={{ color: C.muted, fontSize: "0.875rem", marginBottom: "24px" }}>Les modifications sont appliquées en temps réel sur le site.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {contents.map(c => (
          <div key={c.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              {labels[c.key] || c.key}
            </label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <textarea value={c.value} rows={2}
                onChange={e => setContents(prev => prev.map(p => p.id === c.id ? { ...p, value: e.target.value } : p))}
                style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 14px", color: C.text, fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              <button onClick={() => updateContent(c.id, c.value)}
                style={{ background: saved === c.id ? C.success : `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                {saving === c.id ? "..." : saved === c.id ? "✓ Sauvé" : "Sauvegarder"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Testimonials Manager ─────────────────────────────────────────────────────
const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ name: "", role: "", video_url: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("order_index");
    setTestimonials(data || []);
  };

  const addTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    await supabase.from("testimonials").insert([{ ...form, order_index: testimonials.length }]);
    setForm({ name: "", role: "", video_url: "" });
    loadTestimonials();
    setAdding(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_active: !current }).eq("id", id);
    loadTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    loadTestimonials();
  };

  return (
    <div>
      <h2 style={{ color: C.text, fontSize: "1.4rem", fontWeight: 800, marginBottom: "24px" }}>Témoignages vidéo</h2>

      {/* Formulaire ajout */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ color: C.text, fontWeight: 700, marginBottom: "16px", fontSize: "1rem" }}>+ Ajouter un témoignage</h3>
        <form onSubmit={addTestimonial} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Nom complet" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none" }} />
          <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Rôle / Titre (ex: Ingénieur chez Airbus)" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none" }} />
          <input value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} required placeholder="URL vidéo YouTube ou Vimeo (https://...)" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", color: C.text, fontSize: "0.9rem", outline: "none" }} />
          <button type="submit" disabled={adding} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
            {adding ? "Ajout..." : "Ajouter le témoignage"}
          </button>
        </form>
      </div>

      {/* Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {testimonials.length === 0 ? (
          <p style={{ color: C.muted }}>Aucun témoignage — ajoutez-en un ci-dessus !</p>
        ) : testimonials.map(t => (
          <div key={t.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: C.text, fontWeight: 700 }}>{t.name}</div>
              <div style={{ color: C.muted, fontSize: "0.8rem" }}>{t.role}</div>
              <div style={{ color: C.accent2, fontSize: "0.75rem", marginTop: "4px" }}>{t.video_url}</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => toggleActive(t.id, t.is_active)} style={{ background: t.is_active ? C.success : C.muted, color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                {t.is_active ? "✓ Actif" : "Inactif"}
              </button>
              <button onClick={() => deleteTestimonial(t.id)} style={{ background: "transparent", border: `1px solid ${C.danger}`, color: C.danger, borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "0.8rem" }}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Panel Admin Principal ────────────────────────────────────────────────────
export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  useEffect(() => {
    if (localStorage.getItem("kawdev_admin") === "true") setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "leads", label: "Leads", icon: "👥" },
    { id: "content", label: "Contenu", icon: "✏️" },
    { id: "testimonials", label: "Témoignages", icon: "🎥" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", color: C.text }}>
      {/* Sidebar */}
      <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "220px", background: C.surface, borderRight: `1px solid ${C.border}`, padding: "24px 16px", display: "flex", flexDirection: "column" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px", padding: "0 8px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900, color: "#fff", flexShrink: 0 }}>KAW</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", color: C.text }}>KAW.DEV</div>
            <div style={{ fontSize: "0.7rem", color: C.muted }}>Panel Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", textAlign: "left", transition: "all 0.2s",
                background: activeTab === tab.id ? `${C.accent}22` : "transparent",
                color: activeTab === tab.id ? C.accent : C.muted,
                borderLeft: activeTab === tab.id ? `3px solid ${C.accent}` : "3px solid transparent",
              }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button onClick={() => { localStorage.removeItem("kawdev_admin"); setIsLoggedIn(false); }}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", borderRadius: "10px", border: "none", cursor: "pointer", background: "transparent", color: C.muted, fontSize: "0.875rem", fontWeight: 600 }}>
          🚪 Déconnexion
        </button>
      </div>

      {/* Contenu principal */}
      <div style={{ marginLeft: "220px", padding: "40px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "leads" && <LeadsManager />}
          {activeTab === "content" && <ContentEditor />}
          {activeTab === "testimonials" && <TestimonialsManager />}
        </div>
      </div>
    </div>
  );
}
