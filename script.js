'use strict';
(() => {
  const data = window.PortfolioData;
  const projects = data.projects;
  const projectKeys = Object.keys(projects);
  const dialog = document.getElementById('portfolio-dialog');
  const lightbox = document.getElementById('image-dialog');
  const content = document.getElementById('dialog-content');
  const closeButton = document.getElementById('dialog-close');
  let currentKey = null;
  let gallery = [];
  let galleryIndex = 0;
  let openingElement = null;
  let suppressImageClickUntil = 0;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const tagList = items => '<div class="tags">' + items.map(item => '<span>' + escape(item) + '</span>').join('') + '</div>';
  const socialLinks = '<div class="dialog-links"><a class="dialog-link" href="mailto:nazmiirfan50@gmail.com">Email me</a><a class="dialog-link secondary" href="https://www.linkedin.com/in/irfan-nazmi-bin-mohd-salikhin-478486392/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a class="dialog-link secondary" href="https://github.com/ipannajmii" target="_blank" rel="noopener noreferrer">GitHub</a></div>';
  const cvLink = '<a class="dialog-link" href="assets/irfan-nazmi-cv.pdf" download>Download my CV</a>';
  const staticPanels = {
    about: {
      eyebrow: 'THE KING · ABOUT ME', title: 'Hi, I’m Irfan.',
      html: '<p>I’m an early-career software developer based in Shah Alam, Malaysia. I studied Computer Science (Hons.) in Data Communication and Networking at UiTM, Jasin.</p><p>I enjoy bringing interfaces, APIs, databases and physical devices into one working system. My study projects explore full-stack development, Python, computer vision and IoT.</p><h3>A little beyond the code</h3><p>I served as President of the UiTM Jasin Chess Club (2024–2025), Vice President (2025–2026), and Program Director of the UiTM Jasin Chess Tournament 2025. REGISSION brought that interest in chess into my final year project.</p><div class="dialog-links">' + cvLink + '</div>'
    },
    skills: {
      eyebrow: 'THE QUEEN · MY TOOLKIT', title: 'Different tools. Connected thinking.',
      html: '<div class="skill-row"><span>Languages</span><span>Python, Java, C, C++, PHP, SQL, HTML, CSS, JavaScript</span></div><div class="skill-row"><span>Web & APIs</span><span>Next.js, Laravel, REST API integration, authentication</span></div><div class="skill-row"><span>Data</span><span>MySQL, Oracle Database 19c, relational databases, log analysis</span></div><div class="skill-row"><span>Vision & IoT</span><span>MediaPipe, YOLOv8, OpenCV, Raspberry Pi 5, sensors and device integration</span></div><div class="skill-row"><span>Networking</span><span>TCP/IP, subnetting, routing, switching, VLANs, Wireshark, Cisco Packet Tracer, GNS3</span></div><div class="skill-row"><span>Practice</span><span>Debugging, testing, version control and technical documentation</span></div><div class="dialog-links">' + cvLink + '</div>'
    },
    experience: {
      eyebrow: 'THE ROOK · EXPERIENCE', title: 'Building a foundation.',
      html: '<h3>RIZQ Technologies</h3><p><strong>Database & Engineered Systems · Sep 2026 – Present</strong></p><p>Assigned to the LHDN customer site, with exposure to Oracle Database 19c, Grid Infrastructure, ASM, Data Guard, Clusterware, RAC and Linux.</p><p>Assisted with database health-check data collection and prepared structured daily and customer-specific reports using Oracle Enterprise Manager, RDA, Microsoft Excel and other tools.</p><h3>Ghost Museum Melaka</h3><p><strong>Part-Time Crew · Oct – Dec 2025</strong></p><p>Customer photography, Photoshop green-screen editing, customer assistance and merchandise support.</p><div class="dialog-links">' + cvLink + '</div>'
    },
    contact: {
      eyebrow: 'THE BISHOP · GET IN TOUCH', title: 'Let’s make the next move.',
      html: '<p>I’m looking for full-time Software Engineer, Software Developer and Full-Stack Developer opportunities.</p><p>Have a role or a project in mind? I’d be happy to talk.</p>' + socialLinks
    }
  };

  function galleryMarkup() {
    if (!gallery.length) return '';
    return '<div class="gallery" aria-label="Project image gallery">' +
      '<button type="button" class="gallery-stage" data-enlarge aria-label="Enlarge current project image"><img id="gallery-image" src="' + escape(gallery[0].src) + '" alt="' + escape(gallery[0].alt) + '"><span class="gallery-zoom">Enlarge image</span></button>' +
      '<p class="gallery-caption" id="gallery-caption">' + escape(gallery[0].caption) + '</p>' +
      '<div class="gallery-controls"><button type="button" data-gallery-step="-1" aria-label="Previous gallery image">Previous</button><span id="gallery-position" class="gallery-position" role="status" aria-live="polite">1 / ' + gallery.length + '</span><button type="button" data-gallery-step="1" aria-label="Next gallery image">Next</button></div>' +
      '<div class="gallery-thumbs" aria-label="Select an image">' + gallery.map((item,index) => '<button type="button" data-gallery-index="' + index + '" aria-label="Show image ' + (index + 1) + ': ' + escape(item.caption) + '" aria-pressed="' + (index === 0) + '"><img src="' + escape(item.src) + '" alt="" loading="lazy"></button>').join('') + '</div></div>';
  }

  function syncModalLock() {
    document.body.classList.toggle('dialog-open', dialog.open || lightbox.open);
  }
  function updateImage(image, item) {
    if (!image) return;
    image.onerror = () => {
      image.onerror = null;
      image.src = projects[currentKey]?.gallery[0]?.src || 'assets/art/regission.svg';
      image.alt = 'Project illustration shown because the selected photo could not load';
      const caption = image.id === 'lightbox-image' ? document.getElementById('lightbox-caption') : document.getElementById('gallery-caption');
      if (caption) caption.textContent = 'Photo unavailable. Showing a project illustration.';
    };
    image.src = item.src;
    image.alt = item.alt || item.caption || 'Project image';
  }
  function updateLightbox() {
    const item = gallery[galleryIndex];
    if (!item) return;
    document.getElementById('image-count').textContent = (galleryIndex + 1) + ' / ' + gallery.length;
    document.getElementById('lightbox-caption').textContent = item.caption || '';
    updateImage(document.getElementById('lightbox-image'), item);
  }
  function selectImage(index) {
    if (!gallery.length) return;
    galleryIndex = (index + gallery.length) % gallery.length;
    const item = gallery[galleryIndex];
    document.getElementById('gallery-caption').textContent = item.caption || '';
    document.getElementById('gallery-position').textContent = (galleryIndex + 1) + ' / ' + gallery.length;
    updateImage(document.getElementById('gallery-image'), item);
    content.querySelectorAll('[data-gallery-index]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.galleryIndex) === galleryIndex));
    });
    if (lightbox.open) updateLightbox();
  }
  function openPanel(key, trigger) {
    if (!projects[key] && !staticPanels[key] && key !== 'projects') return;
    if (!dialog.open) openingElement = trigger || document.activeElement;
    currentKey = key;
    galleryIndex = 0;
    if (projects[key]) {
      const project = projects[key];
      gallery = [...(data.photos[key] || []), ...project.gallery];
      document.getElementById('dialog-eyebrow').textContent = project.eyebrow;
      const sections = project.sections.map(section => '<section><h3>' + escape(section.heading) + '</h3>' +
        (section.text ? '<p>' + escape(section.text) + '</p>' : '') +
        (section.bullets ? '<ul>' + section.bullets.map(item => '<li>' + escape(item) + '</li>').join('') + '</ul>' : '') + '</section>').join('');
      const links = project.links.map(link => '<a class="dialog-link" href="' + escape(link.href) + '" target="_blank" rel="noopener noreferrer">' + escape(link.label) + '</a>').join('');
      const next = projectKeys[(projectKeys.indexOf(key) + 1) % projectKeys.length];
      content.innerHTML = '<h2 id="dialog-title">' + escape(project.title) + '</h2><p class="dialog-subtitle">' + escape(project.subtitle) + '</p><div class="modal-overview">' + galleryMarkup() +
        '<div class="modal-summary"><p>' + escape(project.summary) + '</p>' + tagList(project.tags) + '<div class="dialog-links">' + links + '<button type="button" class="dialog-link secondary" data-panel="projects">All projects</button></div></div></div><div class="modal-sections">' + sections + '</div><div class="modal-footer"><button type="button" data-panel="projects">Back to all projects</button><button type="button" data-panel="' + next + '">Next: ' + escape(projects[next].subtitle) + '</button></div>';
    } else if (key === 'projects') {
      gallery = [];
      document.getElementById('dialog-eyebrow').textContent = 'THE KNIGHT · FOUR PROJECT STORIES';
      content.innerHTML = '<h2 id="dialog-title">Ideas put into practice.</h2><p>From connected chess to computer vision. Choose a project to explore.</p><div class="project-picker">' +
        projectKeys.map(id => '<button type="button" data-panel="' + id + '"><img src="' + escape((data.photos[id]?.[0] || projects[id].gallery[0]).src) + '" alt=""><strong>' + escape(projects[id].title) + '</strong><small>' + escape(projects[id].subtitle) + '</small></button>').join('') + '</div>';
    } else {
      const panel = staticPanels[key];
      gallery = [...(data.photos[key] || [])];
      document.getElementById('dialog-eyebrow').textContent = panel.eyebrow;
      content.innerHTML = '<h2 id="dialog-title">' + panel.title + '</h2>' + (gallery.length ? galleryMarkup() : '') + panel.html;
    }
    if (!dialog.open) dialog.showModal();
    syncModalLock();
    dialog.scrollTop = 0;
    closeButton.focus({preventScroll:true});
    if (gallery.length) selectImage(0);
  }
  function closeDetails() {
    if (lightbox.open) lightbox.close();
    dialog.close();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-panel]');
    if (trigger) { openPanel(trigger.dataset.panel, trigger); return; }
    const thumb = event.target.closest('[data-gallery-index]');
    if (thumb) { selectImage(Number(thumb.dataset.galleryIndex)); return; }
    const step = event.target.closest('[data-gallery-step], [data-lightbox-step]');
    if (step) { selectImage(galleryIndex + Number(step.dataset.galleryStep || step.dataset.lightboxStep)); return; }
    if (event.target.closest('[data-enlarge]')) {
      if (performance.now() < suppressImageClickUntil) return;
      updateLightbox();
      if (!lightbox.open) lightbox.showModal();
      syncModalLock();
      document.getElementById('image-close').focus({preventScroll:true});
    }
  });
  closeButton.addEventListener('click', closeDetails);
  document.getElementById('image-close').addEventListener('click', () => lightbox.close());
  dialog.addEventListener('close', () => {
    syncModalLock();
    if (openingElement?.isConnected) openingElement.focus({preventScroll:true});
  });
  lightbox.addEventListener('close', () => {
    syncModalLock();
    content.querySelector('[data-enlarge]')?.focus({preventScroll:true});
  });
  [dialog, lightbox].forEach(modal => modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      if (modal === dialog) closeDetails(); else lightbox.close();
    }
  }));
  document.addEventListener('keydown', event => {
    if (!gallery.length || (!lightbox.open && !event.target.closest('.gallery'))) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchStart = null;
  content.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && event.target.closest('.gallery-stage')) touchStart = {x:event.clientX,y:event.clientY};
  });
  content.addEventListener('pointercancel', () => { touchStart = null; });
  content.addEventListener('pointerup', event => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x, dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressImageClickUntil = performance.now() + 400;
      selectImage(galleryIndex + (dx < 0 ? 1 : -1));
    }
  });

  // Project filtering changes actual visibility and keeps the count accessible.
  const projectRows = Array.from(document.querySelectorAll('[data-project]'));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projectRows.forEach(row => {
      const show = filter === 'all' || row.dataset.categories.split(' ').includes(filter);
      row.hidden = !show;
      row.classList.remove('filter-enter');
      if (show) {
        count++;
        row.classList.add('is-visible');
        requestAnimationFrame(() => row.classList.add('filter-enter'));
      }
    });
    document.getElementById('filter-status').textContent = count + (count === 1 ? ' project' : ' projects');
  }));

  // A real system story, with keyboard-operable tabs.
  const stages = {
    see: {nodes:['Camera','Detection','Board state'], title:'A physical move becomes a digital event.', text:'The Raspberry Pi 5 camera supplies images. YOLOv8 and OpenCV support board and piece detection so physical board changes can enter the connected system.', tags:['Raspberry Pi 5','YOLOv8','OpenCV']},
    connect: {nodes:['Device','API & data','Web interface'], title:'Different parts. One connected game.', text:'The device, Laravel REST API and MySQL database connect to the Next.js interface. Authentication, game management and live data synchronisation bring the pieces together.', tags:['Next.js','Laravel','MySQL','REST API']},
    understand: {nodes:['Position','Stockfish','Game review'], title:'The game becomes something to learn from.', text:'Stockfish analysis adds another layer to the recorded chess game. Testing across the device, API, database and interface helps the complete system behave consistently.', tags:['Stockfish','Game analysis','Integration testing']}
  };
  const stageButtons = Array.from(document.querySelectorAll('[data-stage]'));
  function selectStage(button, focus = false) {
    const stage = stages[button.dataset.stage];
    stageButtons.forEach(item => { item.setAttribute('aria-selected', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
    const panel = document.getElementById('stage-content');
    panel.setAttribute('aria-labelledby', button.id);
    panel.innerHTML = '<div class="stage-diagram" aria-hidden="true">' + stage.nodes.map(label => '<span>' + escape(label) + '</span>').join('<i></i>') + '</div><h3>' + escape(stage.title) + '</h3><p>' + escape(stage.text) + '</p>' + tagList(stage.tags);
    panel.classList.remove('stage-enter');
    requestAnimationFrame(() => panel.classList.add('stage-enter'));
    if (focus) button.focus();
  }
  stageButtons.forEach((button,index) => {
    button.addEventListener('click', () => selectStage(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stageButtons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + stageButtons.length) % stageButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = stageButtons.length - 1;
      if (next !== undefined) { event.preventDefault(); selectStage(stageButtons[next], true); }
    });
  });

  // Sections slide into view once. Fallback content stays visible.
  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  function revealEverything() {
    reveals.forEach(element => element.classList.add('is-visible'));
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      }, {threshold:0.08, rootMargin:'0px 0px -35px 0px'});
      reveals.forEach(element => observer.observe(element));
      document.body.classList.add('reveal-ready');
    } catch { revealEverything(); }
  } else revealEverything();
  document.addEventListener('portfolio-motion', event => { if (event.detail.paused) revealEverything(); });
  document.addEventListener('focusin', event => event.target.closest('[data-reveal]')?.classList.add('is-visible'));

  const navLinks = Array.from(document.querySelectorAll('.section-nav a'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollQueued = false;
  function updateReading() {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('reading-progress').style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ')';
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) active = section; });
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + active.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateReading); } }, {passive:true});
  window.addEventListener('resize', updateReading);
  updateReading();
})();