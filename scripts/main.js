// ═══════════════════════════════════════════════════════════════════
  //  PORTFOLIO ITEMS — Edit this array to add / remove projects
  //  Fields: title, artist, url (YouTube), role, year
  // ═══════════════════════════════════════════════════════════════════
  const PORTFOLIO_ITEMS = [
    {
      title: 'Heartbreaker',
      artist: 'AMBER CREEK',
      url: 'https://www.youtube.com/watch?v=CmQo2cJA9JA',
      role: 'PRODUCTION + RECORDING + MIX + MASTER',
      year: '2026'
    },
    {
      title: 'Shapeshifter',
      artist: 'AMBER CREEK',
      url: 'https://www.youtube.com/watch?v=DBO_JRv5d7g',
      role: 'PRODUCTION + RECORDING + MIX + MASTER',
      year: '2026'
    },
    {
      title: 'Avoidant feat. Distant',
      artist: 'UNSAINTED',
      url: 'https://www.youtube.com/watch?v=DKD2wcLvx4E',
      role: 'PRODUCTION + RECORDING + MIX + MASTER',
      year: '2024'
    },
    {
      title: 'Reverie',
      artist: 'UNSAINTED',
      url: 'https://www.youtube.com/watch?v=t8YyC_G28DY',
      role: 'PRODUCTION + RECORDING + MIX + MASTER',
      year: '2024'
    },
    {
      title: 'Toxic (Rock Cover)',
      artist: 'BLANK MAGIC',
      url: 'https://www.youtube.com/watch?v=npFDRGxgqZI',
      role: 'MIX + MASTER',
      year: '2026'
    },
    {
      title: 'Live session at THE LODGE',
      artist: 'EKLEKTIKA',
      url: 'https://www.youtube.com/watch?v=rpuk6BXJF44',
      role: 'RECORDING + MIX + MASTER',
      year: '2025'
    },
    {
      title: 'Shame',
      artist: 'SEIRA',
      url: 'https://www.youtube.com/watch?v=v6jKu8A_VHU',
      role: 'PRODUCTION + RECORDING + MIX + MASTER',
      year: '2025'
    },
    {
      title: 'Torch',
      artist: 'SEIRA',
      url: 'https://www.youtube.com/watch?v=AMy_pgcXjw8',
      role: 'MIX + MASTER',
      year: '2025'
    },
    {
      title: 'Stay',
      artist: 'ASKIN feat St.Levica',
      url: 'https://www.youtube.com/watch?v=prAqZVsLh-k',
      role: 'MIX + MASTER',
      year: '2025'
    },
    {
      title: 'Swarm City',
      artist: 'THE MISTO',
      url: 'https://www.youtube.com/watch?v=PMp3QJgCDtU',
      role: 'MIX + MASTER',
      year: '2025'
    },
    {
      title: 'Live at Melna Piektdiena [Latvian Annual Metal Awards 2023]',
      artist: 'SXIMA',
      url: 'https://www.youtube.com/watch?v=wfCKULsZQeA',
      role: 'RECORDING + MIX + MASTER',
      year: '2025'
    },
    {
      title: 'The World Of War (LIVE at Fontaine Palace)',
      artist: 'AMBER CREEK',
      url: 'https://www.youtube.com/watch?v=3BmQ-CyX8qU',
      role: 'RECORDING + MIX + MASTER',
      year: '2025'
    }
  ];
  // ═══════════════════════════════════════════════════════════════════

  function getYouTubeId(url) {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return m ? m[1] : null;
  }

  // EQ bar heights — pre-generate random sequences per bar index
  const EQ_COUNT = 36;
  const eqSeeds = Array.from({length: EQ_COUNT}, () => ({
    dur: 0.5 + Math.random() * 0.5,
    min: 8 + Math.random() * 15,
    max: 40 + Math.random() * 55,
    phase: Math.random() * Math.PI * 2
  }));

  function buildCard(item, index) {
    const vid = getYouTubeId(item.url);
    const thumb = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
    const num = String(index + 1).padStart(2, '0');

    const eqBarsHtml = Array.from({length: EQ_COUNT}, (_, i) => {
      const h = eqSeeds[i].min + Math.random() * (eqSeeds[i].max - eqSeeds[i].min);
      return `<div class="eq-bar" style="height:${h}%;animation:eqAnim${i} ${eqSeeds[i].dur.toFixed(2)}s ease-in-out infinite alternate;"></div>`;
    }).join('');

    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${thumb}" alt="${item.title}" loading="lazy" onerror="this.style.opacity='0.3'">
        <span class="project-num">[${num}]</span>
        <div class="project-play-btn"><div class="play-circle"></div></div>
        <div class="eq-bars">${eqBarsHtml}</div>
      </div>
      <div class="project-name">${item.title}</div>
      <div class="project-artist">${item.artist}</div>
      <div class="project-footer">
        <span class="project-role-tag">${item.role}</span>
        <span class="project-year">${item.year}</span>
      </div>`;
    card.addEventListener('click', () => openModal(item, vid));
    return card;
  }

  // Inject EQ keyframes into <style>
  (function injectEqKeyframes() {
    const style = document.createElement('style');
    style.textContent = Array.from({length: EQ_COUNT}, (_, i) =>
      `@keyframes eqAnim${i}{from{height:${eqSeeds[i].min}%}to{height:${eqSeeds[i].max}%}}`
    ).join('\n');
    document.head.appendChild(style);
  })();

  // Build grid
  const grid = document.getElementById('portfolioGrid');
  PORTFOLIO_ITEMS.forEach((item, i) => grid.appendChild(buildCard(item, i)));
  document.getElementById('trackCount').textContent = `TOTAL_TRACKS: ${PORTFOLIO_ITEMS.length}`;

  // Fade-in observer (runs after grid is built)
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

  // ── Modal ──
  function openModal(item, vid) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
    iframe.allowFullscreen = true;
    document.getElementById('modalVideoWrap').appendChild(iframe);
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalMeta').textContent = `${item.artist} — ${item.year}`;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(e) {
    if (e && e.target !== document.getElementById('modalOverlay') && !e.target.closest('.modal-close')) return;
    document.getElementById('modalVideoWrap').innerHTML = '';
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Smooth scroll ──
  function scrollTo(selector) {
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
  }

  // ── Active nav ──
  const sections = ['hero','about','portfolio','store','contact'];
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const active = document.querySelector(`[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(id => { const el = document.getElementById(id); if (el) navObs.observe(el); });

  // ── Project type toggle ──
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });