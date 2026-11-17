import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Download, ExternalLink, Eye, FileText, Images, Mail, Maximize2, Menu, Moon, Palette, SlidersHorizontal, Sun, X, ZoomIn, ZoomOut } from 'lucide-react';
import { site } from './data/site';
import { projects } from './data/projects';

const categories = ['All', ...new Set(projects.map(p => p.category))];

function IconLink({ href, children, className = '', external = false }) {
  return <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

function Header({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="header shell">
    <a className="brand" href="#top" aria-label="Elly Jay Jangco home"><span className="brand-name">Elly Jay Jangco</span></a>
    <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
      {[['Work', '#work'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <IconLink href={site.resumeUrl} external className="nav-resume">Resume <ArrowUpRight size={14} /></IconLink>
    </nav>
    <div className="header-actions">
      <button className="icon-btn theme-toggle" type="button" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDark(!dark)}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
      <button className="icon-btn mobile-menu" type="button" aria-expanded={menuOpen} aria-label="Toggle menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero shell" id="top">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> GRAPHIC DESIGNER <span className="eyebrow-line" /></div>
        <h1>Elly Jay Jangco</h1>
        <p>{site.intro}</p>
        <div className="hero-actions">
          <IconLink href="#work" className="btn btn-primary">Explore my work <ArrowDown size={17} /></IconLink>
          <IconLink href={site.resumeUrl} className="btn btn-outline" external><FileText size={16} /> View resume</IconLink>
        </div>
        <div className="hero-footer">
          {/* <span>BASED IN {site.location.toUpperCase()}</span> */}
          {/* <span className="sep-dot">·</span><span>AVAILABLE FOR FREELANCE</span> */}
          </div>
      </div>
      <div className="hero-art" aria-label="Profile photo placeholder">
        <div className="art-orb orb-one" /><div className="art-orb orb-two" />
        <div className="photo-frame">{site.profileImage ? <img src={site.profileImage} alt={site.name} className="profile-photo" /> : <div className="photo-placeholder"><div className="avatar-circle"><span>EJ</span></div><span>YOUR PHOTO HERE</span><small>public/profile/me.jpg</small></div>}</div>
        {/* <div className="art-stamp"><Palette size={19} /><span>CREATE<br />WITH PURPOSE</span></div>
        <div className="art-tag">GRAPHIC DESIGNER</div> */}
      </div>
    </div>
  </section>;
}

function ProjectCard({ project, onOpen }) {
  return <button className="project-card" type="button" onClick={() => onOpen(project)} aria-label={`View ${project.title} project`}>
    <div className="card-image-wrap"><img loading="lazy" src={project.cover} alt={`${project.title} cover`} /><span className="card-open"><Maximize2 size={18} /></span>{project.demo && <span className="demo-label">SAMPLE</span>}{project.images.length > 1 && <span className="multi-count"><Images size={14} />{project.images.length}</span>}</div>
    <div className="card-meta"><div><span className="card-category">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={20} className="card-arrow" /></div>
  </button>;
}

function Work({ onOpen }) {
  const [category, setCategory] = useState('All');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const shown = useMemo(() => projects.filter(p => (category === 'All' || p.category === category) && (!onlyFeatured || p.featured)), [category, onlyFeatured]);
  return <section id="work" className="section work-section shell">
    <div className="section-top"><div><span className="kicker">01 / THE GALLERY</span><h2>Selected <em>work.</em></h2></div></div>
    <div className="gallery-toolbar"><div className="category-tabs" role="group" aria-label="Filter project categories">{categories.map(c => <button key={c} type="button" className={c === category ? 'category active' : 'category'} onClick={() => setCategory(c)} aria-pressed={c === category}>{c}</button>)}</div><button className={onlyFeatured ? 'featured-toggle selected' : 'featured-toggle'} type="button" onClick={() => setOnlyFeatured(v => !v)} aria-pressed={onlyFeatured}><SlidersHorizontal size={15} /> Featured only</button></div>
    <div className="project-grid">{shown.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpen} />)}</div>
    {shown.length === 0 && <div className="empty-state">No projects in this category yet.</div>}
    {/* <div className="work-note">✳ Your future projects appear here automatically when you update <code>src/data/projects.js</code>.</div> */}
  </section>;
}

function BeforeAfter({ pair, title }) {
  const [split, setSplit] = useState(50);
  return <div className="comparison"><div className="compare-area" style={{ '--split': `${split}%` }}>
    <img className="compare-before" src={pair.before} alt={`${title} before redesign`} />
    <div className="compare-after-mask"><img src={pair.after} alt={`${title} after redesign`} /></div>
    <div className="compare-divider"><span>↔</span></div>
    <span className="compare-label before">BEFORE</span><span className="compare-label after">AFTER</span>
    <input aria-label="Before and after comparison slider" type="range" min="0" max="100" value={split} onChange={e => setSplit(Number(e.target.value))} />
  </div><p className="compare-hint">Drag the slider to compare the original and redesign.</p></div>;
}

function Lightbox({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [compare, setCompare] = useState(false);
  const images = project.images?.length ? project.images : [project.cover];
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  useEffect(() => { const handler = e => { if (e.key === 'Escape') onClose(); if (!compare && e.key === 'ArrowRight') setImageIndex(i => (i + 1) % images.length); if (!compare && e.key === 'ArrowLeft') setImageIndex(i => (i - 1 + images.length) % images.length); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, [images.length, compare, onClose]);
  const move = change => { setImageIndex(i => (i + change + images.length) % images.length); setZoom(false); };
  return <div className="modal-overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="modal-panel" role="dialog" aria-modal="true" aria-label={`${project.title} image gallery`}>
      <div className="modal-top"><div className="modal-heading"><span>{project.category} {project.demo && ' / SAMPLE PROJECT'}</span><h3>{project.title}</h3></div><button className="icon-btn close-btn" type="button" onClick={onClose} aria-label="Close image viewer"><X size={23} /></button></div>
      {project.beforeAfter && <div className="modal-modes"><button type="button" className={!compare ? 'selected' : ''} onClick={() => setCompare(false)}><Images size={15} /> Gallery</button><button type="button" className={compare ? 'selected' : ''} onClick={() => setCompare(true)}><SlidersHorizontal size={15} /> Before & After</button></div>}
      {compare && project.beforeAfter ? <BeforeAfter key={project.id} pair={project.beforeAfter} title={project.title} /> : <>
        <div className="modal-image-zone">
          {images.length > 1 && <button className="modal-arrow left" type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={24} /></button>}
          <div className={zoom ? 'modal-image zoomed' : 'modal-image'} onClick={() => setZoom(v => !v)} title={zoom ? 'Click to fit image' : 'Click to zoom'}><img src={images[imageIndex]} alt={`${project.title} design ${imageIndex + 1}`} /></div>
          {images.length > 1 && <button className="modal-arrow right" type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight size={24} /></button>}
        </div>
        <div className="modal-bottom"><span>{imageIndex + 1} / {images.length}</span><div className="modal-thumbnails">{images.map((src, idx) => <button type="button" key={`${src}-${idx}`} onClick={() => { setImageIndex(idx); setZoom(false); }} className={idx === imageIndex ? 'thumb active' : 'thumb'} aria-label={`View image ${idx + 1}`}><img src={src} alt="" /></button>)}</div><button className="icon-btn zoom-btn" onClick={() => setZoom(v => !v)} type="button" aria-label={zoom ? 'Zoom out' : 'Zoom in'}>{zoom ? <ZoomOut size={19} /> : <ZoomIn size={19} />}</button></div>
      </>}
      <div className="modal-footnote"><p>{project.summary}</p><span>{project.year}</span></div>
    </section>
  </div>;
}

function Services() {
  return <section id="services" className="section shell"><div className="section-top"><div><span className="kicker">02 / WHAT I DO</span><h2>Creative <em>services.</em></h2></div><p>Visual solutions for the stories you want to tell.</p></div><div className="service-grid">{site.services.map((service, i) => <article className="service-card" key={service.title}><span className="service-num">0{i + 1}</span><div className="service-icon"><Palette size={22} /></div><h3>{service.title}</h3><p>{service.desc}</p></article>)}</div></section>;
}

function About() {
  return <section id="about" className="section about-section"><div className="shell about-layout"><div><span className="kicker">03 / A LITTLE ABOUT ME</span><h2>Design with<br /><em>purpose.</em></h2></div><div className="about-right"><p className="about-lead">Hello, I'm {site.name}.</p><p>{site.about}</p><div className="tool-chips">{site.tools.map(tool => <span key={tool}>{tool}</span>)}</div><IconLink href={site.resumeUrl} external className="text-link"><FileText size={16} /> View my resume <ArrowUpRight size={16} /></IconLink></div></div></section>;
}

function Contact() {
  const email = site.email;
  return <section id="contact" className="contact-section shell"><div className="contact-box"><div className="contact-text"><span className="kicker">04 / LET'S COLLABORATE</span><h2>Have something<br />in <em>mind?</em></h2><p>Let's turn your idea into visuals that work.</p><div className="contact-actions"><a className="btn btn-light" href={`mailto:${email}?subject=${encodeURIComponent('Graphic design inquiry — EJ Studio')}`}><Mail size={17} /> Hire me <ArrowUpRight size={17} /></a><IconLink href={site.behanceUrl} external className="btn btn-white-outline">Behance <ExternalLink size={16} /></IconLink></div></div><div className="contact-deco" aria-hidden="true">EJ<span>✳</span></div></div></section>;
}

function Footer() {
  return <footer className="footer shell"><a href="#top" className="brand"><span className="brand-mark">ej<span>.</span></span><span className="brand-name">STUDIO</span></a><p>{site.slogan}</p><span>© {new Date().getFullYear()} EJ Studio</span></footer>;
}

export default function App() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('ej-graphic-theme') !== 'light'; } catch { return true; } });
  const [activeProject, setActiveProject] = useState(null);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; try { localStorage.setItem('ej-graphic-theme', dark ? 'dark' : 'light'); } catch { } }, [dark]);
  return <><div className="site-shell"><Header dark={dark} setDark={setDark} /><main><Hero /><Work onOpen={setActiveProject} /><Services /><About /><Contact /></main><Footer /></div>{activeProject && <Lightbox key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} />}</>;
}
