import { useState, useEffect, useRef } from 'react';
import ParticleField from './components/ParticleField';
import ProductModal from './components/ProductModal';
import InfoModal from './components/InfoModal';
import HeroCanvas from './components/HeroCanvas';
import { PRODUCTS, PEPTIDE_INFO, wa } from './data';
import './App.css';

const WA_ICON = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;

const Icons = {
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  truck: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  beaker: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 002 2h8a2 2 0 002-2V3" /><path d="M6 14h12" /></svg>,
  check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  dna: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" /><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" /><path d="M2 9c6.667 6 13.333 0 20 6" /></svg>,
  molecule: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="rgba(201,169,78,0.3)" strokeWidth="1"><circle cx="25" cy="10" r="4" /><circle cx="10" cy="35" r="4" /><circle cx="40" cy="35" r="4" /><circle cx="25" cy="25" r="3" /><line x1="25" y1="14" x2="25" y2="22" /><line x1="22" y1="27" x2="13" y2="33" /><line x1="28" y1="27" x2="37" y2="33" /></svg>,
  arrowRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
};

const LogoSVG = () => (
  <img
    src="/images/spartan-final.png"
    alt="KratosBio"
    style={{
      height: '38px',
      width: 'auto',
      objectFit: 'contain',
      filter: 'brightness(1.1)',
    }}
  />
);

/* ═══ NAVBAR ═══ */
function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const fn = () => { const y = window.scrollY; setHidden(y > last.current && y > 400); setScrolled(y > 50); last.current = y; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`navbar ${hidden ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo"><LogoSVG /><div className="navbar-logo-text">Kratos<span>Bio</span></div></a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#products" onClick={() => setMenuOpen(false)}>Produits</a>
          <a href="#learn" onClick={() => setMenuOpen(false)}>Science</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Avis</a>
        </div>
        <button className="mobile-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Menu"><span /><span /><span /></button>
      </nav>
      <div className={`promo-banner ${hidden ? 'hidden' : ''}`}>
        <span style={{color:'#fef08a'}}>⚡ OFFRE EXCLUSIVE :</span> LIVRAISON OFFERTE DÈS 150€ D'ACHAT 🚀
      </div>
    </>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <HeroCanvas />
      <div className="glow-orb glow-orb-1" /><div className="glow-orb glow-orb-2" /><div className="glow-orb glow-orb-3" />
      <ParticleField color="#c41e3a" count={60} />
      <div className="hero-content">
        <h1 className="hero-anim-h1">Solutions Peptidiques Avancées.<br />Libérez le Potentiel Biologique.</h1>
        <p className="hero-anim-p">Pureté maximale, tests rigoureux, livraison mondiale.<br />Découvrez nos composés pour la recherche et la performance.</p>
        <a href="#products" className="hero-cta hero-anim-btn btn-ripple">Découvrir nos Produits {Icons.arrowRight}</a>
      </div>

      {/* Floating product showcase */}
      <div className="hero-product-showcase">
        <div className="hero-product-badge">🔥 BEST SELLER</div>
        <div className="hero-product-img-wrap">
          <div className="hero-product-glow" />
          <img src="/images/bpc157.png" alt="Retatrutide 10mg" />
        </div>
        <div className="hero-product-info">
          <div className="hero-product-name">Retatrutide</div>
          <div className="hero-product-dose">10mg / fiole · Triple Agoniste GLP-1/GIP/Glucagon</div>
          <div className="hero-product-stars">★★★★★ <span>5.0 (127 avis)</span></div>
          <div className="hero-product-pricing">
            <span className="hero-product-new-price">60,00 €</span>
          </div>
          <div className="hero-product-specs">
            <div className="hero-spec"><span>Pureté</span><strong>&gt; 99% HPLC</strong></div>
            <div className="hero-spec"><span>Forme</span><strong>Lyophilisé</strong></div>
            <div className="hero-spec"><span>Conservation</span><strong>2-8°C</strong></div>
          </div>
          <div className="hero-product-tags">
            <span className="hero-tag stock">● En Stock</span>
            <span className="hero-tag purity">COA Inclus</span>
            <span className="hero-tag shipping">📦 Livraison offerte dès 150€</span>
          </div>
          <a href="#products" className="hero-product-cta">COMMANDER →</a>
          <div className="hero-product-trust">🔒 Paiement sécurisé · Emballage discret</div>
        </div>
      </div>

      <div className="molecule molecule-1">{Icons.molecule}</div>
      <div className="molecule molecule-2">{Icons.molecule}</div>

    </section>
  );
}

/* ═══ TRUST BADGES ═══ */
function TrustBadges() {
  const badges = [
    { icon: Icons.shield, title: 'Pureté Garantie', sub: '(COA Inclus)', desc: 'Chaque lot est testé et certifié avec un certificat d\'analyse.' },
    { icon: Icons.truck, title: 'Livraison Rapide', sub: '& Sécurisée', desc: 'Expédition discrète et sécurisée partout en France et en Europe.' },
    { icon: Icons.beaker, title: 'Support Scientifique', sub: 'Expert', desc: 'Notre équipe vous accompagne pour vos protocoles de recherche.' },
    { icon: Icons.check, title: 'Conformité', sub: '& Qualité', desc: 'Produits conformes aux standards professionnels de qualité.' },
  ];
  return (
    <section className="trust-section">
      <div className="trust-grid">
        {badges.map((b, i) => (
          <div className={`trust-card reveal stagger-${i + 1}`} key={i}>
            <div className="trust-icon">{b.icon}</div>
            <h3>{b.title}<br />{b.sub}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ FEATURED PRODUCTS ═══ */
function FeaturedProducts({ onDetail }) {
  return (
    <section className="section products-section" id="products">
      <div className="section-header reveal"><h2>Nos Produits</h2></div>
      <div className="products-grid">
        {PRODUCTS.map((p, i) => (
          <div className={`product-card reveal stagger-${i + 1} ${!p.inStock ? 'out-of-stock' : ''}`} key={p.id}>
            <div className="product-img">
              {!p.inStock && <span className="out-of-stock-badge">Rupture de stock</span>}
              <img src={p.img} alt={p.name} />
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="product-desc">{p.desc}</p>
              <div className="product-meta">
                <span className="product-stars">{'★'.repeat(p.stars)}</span>
              </div>
              <div className="product-prices">
                <span className="product-price">{p.dosages ? `${p.dosages[p.defaultDosage || 0].price},00 €` : p.price}</span>
                {!p.inStock && <span style={{ fontSize: '.8rem', color: '#ef4444', fontWeight: 600 }}>Indisponible</span>}
              </div>
              <div className="product-actions">
                <button className="btn-outline" onClick={() => onDetail(p)}>Voir Détails</button>
                {p.inStock ? (
                  <button className="btn-filled" onClick={() => onDetail(p)}>Commander</button>
                ) : (
                  <button className="btn-filled" disabled>Indisponible</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ LEARN ABOUT PEPTIDES ═══ */
function LearnSection() {
  const [active, setActive] = useState(null);
  const peptides = [
    { key: 'retatrutide', img: '/images/bpc157.png', name: 'Retatrutide', sub: 'Triple Agoniste' },
    { key: 'melanotan2', img: '/images/melanotan.png', name: 'Melanotan II', sub: 'Mélanocortine' },
    { key: 'ghkcu', img: '/images/cjc1295.png', name: 'GHK-Cu', sub: 'Tripeptide Cuivré' },
  ];
  const info = active ? PEPTIDE_INFO[active] : null;

  return (
    <section className="section learn-section" id="learn">
      <div className="section-header reveal">
        <h2>En Savoir Plus sur les Peptides</h2>
        <p>Cliquez sur un peptide pour découvrir ses utilisations et son mode d'emploi.</p>
      </div>
      <div className="peptide-cards-row reveal">
        {peptides.map((p, i) => (
          <div className={`peptide-mini stagger-${i + 1}`} key={p.key} onClick={() => setActive(active === p.key ? null : p.key)} style={{ cursor: 'pointer', borderColor: active === p.key ? '#c41e3a' : undefined }}>
            <img src={p.img} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.sub}</p>
          </div>
        ))}
      </div>

      {info && (
        <div className="peptide-info-panel" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3>🧬 {info.title}</h3>
          <h4>Qu'est-ce que c'est ?</h4>
          <p>{info.what}</p>
          <h4>Bienfaits Clés</h4>
          <ul>{info.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <h4>Comment l'utiliser</h4>
          <p>{info.howTo}</p>
          <button className="peptide-close" onClick={() => setActive(null)}>✕ Fermer</button>
        </div>
      )}

      <div className="learn-grid" style={{ marginTop: '2rem' }}>
        <div className="learn-card reveal-left">
          <h3>{Icons.dna} Mécanismes d'Action</h3>
          <p>Les peptides agissent en se liant à des récepteurs spécifiques, déclenchant des cascades biologiques. Comprendre ces mécanismes est essentiel pour optimiser la recherche.</p>
          <ul>
            <li>Affinité et spécificité de liaison aux récepteurs</li>
            <li>Voies de transduction du signal</li>
            <li>Biodisponibilité et demi-vie</li>
            <li>Relations dose-réponse</li>
          </ul>
        </div>
        <div className="learn-card reveal-right">
          <h3>{Icons.shield} Guides de Sécurité</h3>
          <p>La manipulation, le stockage et l'administration des peptides de recherche nécessitent une attention rigoureuse aux protocoles de sécurité.</p>
          <ul>
            <li>Procédures de reconstitution</li>
            <li>Température de conservation (2-8°C)</li>
            <li>Techniques de manipulation stérile</li>
            <li>Vérification du contrôle qualité</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const reviews = [
    { name: 'Maxime D.', role: 'Client vérifié', text: 'Des résultats incroyables ! J\'ai observé une perte de masse grasse extrêmement rapide et une véritable suppression de l\'appétit. La qualité KratosBio est incomparable.', initials: 'MD' },
    { name: 'Sarah L.', role: 'Cliente vérifiée', text: 'Produit hyper efficace. Le bronzage obtenu est profond et uniforme en très peu de temps, exactement ce que je recherchais. Livraison rapide et discrète.', initials: 'SL' },
    { name: 'Julien T.', role: 'Client vérifié', text: 'Ma récupération après blessure a été divisée par deux ! C\'est la meilleure qualité de peptide que j\'ai pu trouver pour la réparation articulaire et tissulaire.', initials: 'JT' },
  ];
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="section-header reveal"><h2>Avis Clients</h2><p>Découvrez les retours et les résultats de nos clients.</p></div>
      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <div className={`testimonial-card reveal stagger-${i + 1}`} key={r.name}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"{r.text}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{r.initials}</div>
              <div><div className="testimonial-name">{r.name}</div><div className="testimonial-role">{r.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer({ onOpenInfo }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.5rem' }}>
            <LogoSVG /><div className="navbar-logo-text">Kratos<span>Bio</span></div>
          </div>
          <p>Solutions peptidiques avancées pour la recherche scientifique. Composés de haute pureté avec documentation complète.</p>
        </div>
        <div className="footer-col">
          <h4>Produits</h4>
          <a href="#products">Retatrutide</a><a href="#products">Melanotan II</a><a href="#products">GHK-Cu</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#!" onClick={(e) => { e.preventDefault(); onOpenInfo('faq'); }}>FAQ</a>
          <a href="#!" onClick={(e) => { e.preventDefault(); onOpenInfo('livraison'); }}>Livraison</a>
          <a href={wa('Bonjour, j\'ai une question.')} target="_blank" rel="noopener noreferrer">Nous Contacter</a>
        </div>
        <div className="footer-col">
          <h4>Légal</h4>
          <a href="#!" onClick={(e) => { e.preventDefault(); onOpenInfo('cgv'); }}>CGV</a>
          <a href="#!" onClick={(e) => { e.preventDefault(); onOpenInfo('confidentialite'); }}>Confidentialité</a>
          <a href="#!" onClick={(e) => { e.preventDefault(); onOpenInfo('mentions'); }}>Mentions Légales</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={wa('Bonjour')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} KratosBio — Peptides & Performance. Tous droits réservés. Produits destinés à la recherche uniquement.</span>
      </div>
    </footer>
  );
}

/* ═══ SCROLL PROGRESS ═══ */
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement.scrollHeight - window.innerHeight; setW(d > 0 ? (window.scrollY / d) * 100 : 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${w}%` }} />;
}

/* ═══ FLOATING WHATSAPP ═══ */
function FloatingWA() {
  return (
    <a href={wa('Bonjour, je souhaite passer une commande.')} target="_blank" rel="noopener noreferrer" className="floating-wa" aria-label="WhatsApp">
      {WA_ICON}
    </a>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [detailProduct, setDetailProduct] = useState(null);
  const [infoModal, setInfoModal] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const observe = () => document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el));
    observe();
    const t = setTimeout(observe, 500);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <FeaturedProducts onDetail={setDetailProduct} />
        <LearnSection />
        <Testimonials />
      </main>
      <Footer onOpenInfo={setInfoModal} />
      <FloatingWA />
      {detailProduct && <ProductModal product={detailProduct} onClose={() => setDetailProduct(null)} />}
      {infoModal && <InfoModal page={infoModal} onClose={() => setInfoModal(null)} />}
    </>
  );
}
