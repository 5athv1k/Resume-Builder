/* ═══════════════════════════════════════════════════════════════
   Resume Made Easy — Application Logic
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── State ───────────────────────────────────────────────── */
  const state = {
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };

  let currentSection = 'personal';
  let zoomLevel = 100;
  let experienceCounter = 0;
  let educationCounter = 0;
  let projectCounter = 0;

  /* ── DOM References ──────────────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const sidebar = $('#sidebar');
  const sidebarOverlay = $('#sidebar-overlay');
  const hamburger = $('#hamburger');
  const mobileHeader = $('#mobile-header');
  const editorTitle = $('#editor-title');
  const editorSubtitle = $('#editor-subtitle');
  const resumePage = $('#resume-page');
  const resumeContent = $('#resume-content');
  const resumeEmptyState = $('#resume-empty-state');
  const toastContainer = $('#toast-container');
  const previewPanel = $('#preview-panel');
  const btnTogglePreview = $('#btn-toggle-preview');

  /* ── Navigation ──────────────────────────────────────────── */
  function switchSection(sectionId) {
    currentSection = sectionId;

    $$('.nav-item').forEach((btn) => btn.classList.remove('active'));
    const navBtn = $(`[data-section="${sectionId}"]`);
    if (navBtn) navBtn.classList.add('active');

    $$('.form-section').forEach((sec) => sec.classList.remove('active'));
    const section = $(`#section-${sectionId}`);
    if (section) {
      section.classList.remove('active');
      void section.offsetWidth; // force reflow for animation
      section.classList.add('active');
      editorTitle.textContent = section.dataset.title || '';
      editorSubtitle.textContent = section.dataset.subtitle || '';
    }

    // Close mobile sidebar
    closeMobileSidebar();
  }

  $$('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  /* ── Mobile Sidebar ──────────────────────────────────────── */
  function openMobileSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    hamburger.classList.add('active');
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    hamburger.classList.remove('active');
  }

  hamburger.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  sidebarOverlay.addEventListener('click', closeMobileSidebar);

  /* ── Mobile Preview Toggle ───────────────────────────────── */
  btnTogglePreview.addEventListener('click', () => {
    previewPanel.classList.toggle('mobile-hidden');
  });

  /* ── Personal Info Binding ───────────────────────────────── */
  const personalFields = [
    'fullName',
    'jobTitle',
    'email',
    'phone',
    'location',
    'linkedin',
    'website',
    'github',
  ];

  personalFields.forEach((field) => {
    const input = $(`#${field}`);
    if (input) {
      input.addEventListener('input', () => {
        state.personal[field] = input.value.trim();
        renderPreview();
      });
    }
  });

  /* ── Summary Binding ─────────────────────────────────────── */
  const summaryText = $('#summaryText');
  const summaryCharCount = $('#summaryCharCount');

  summaryText.addEventListener('input', () => {
    const val = summaryText.value;
    state.summary = val;
    summaryCharCount.textContent = `${val.length} / 500`;
    if (val.length > 500) {
      summaryCharCount.style.color = 'var(--danger)';
    } else {
      summaryCharCount.style.color = 'var(--text-muted)';
    }
    renderPreview();
  });

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Experience
     ═══════════════════════════════════════════════════════════ */
  function createExperienceEntry() {
    experienceCounter++;
    const id = `exp-${Date.now()}`;
    const entry = {
      id,
      company: '',
      title: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    state.experience.push(entry);

    const card = document.createElement('div');
    card.classList.add('entry-card');
    card.dataset.id = id;
    card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-number">Experience #${experienceCounter}</span>
        <button class="btn-remove-entry" data-remove="${id}" title="Remove this entry">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" data-field="title" placeholder="e.g. Senior Engineer" />
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" data-field="company" placeholder="e.g. Google" />
        </div>
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" data-field="startDate" placeholder="e.g. Jan 2020" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="text" data-field="endDate" placeholder="e.g. Present" />
        </div>
        <div class="form-group full-width">
          <label>Description</label>
          <textarea data-field="description" rows="4" placeholder="Describe your responsibilities, achievements, and impact. Use bullet points with • for best results."></textarea>
        </div>
      </div>
    `;

    $('#experience-entries').appendChild(card);

    // Bind inputs
    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        renderPreview();
      });
    });

    // Remove button
    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.experience = state.experience.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      renderPreview();
    });

    renderPreview();
  }

  $('#btn-add-experience').addEventListener('click', createExperienceEntry);

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Education
     ═══════════════════════════════════════════════════════════ */
  function createEducationEntry() {
    educationCounter++;
    const id = `edu-${Date.now()}`;
    const entry = {
      id,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    state.education.push(entry);

    const card = document.createElement('div');
    card.classList.add('entry-card');
    card.dataset.id = id;
    card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-number">Education #${educationCounter}</span>
        <button class="btn-remove-entry" data-remove="${id}" title="Remove this entry">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>School / University</label>
          <input type="text" data-field="school" placeholder="e.g. MIT" />
        </div>
        <div class="form-group">
          <label>Degree</label>
          <input type="text" data-field="degree" placeholder="e.g. B.S. Computer Science" />
        </div>
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" data-field="startDate" placeholder="e.g. Sep 2016" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="text" data-field="endDate" placeholder="e.g. Jun 2020" />
        </div>
        <div class="form-group">
          <label>GPA (optional)</label>
          <input type="text" data-field="gpa" placeholder="e.g. 3.9 / 4.0" />
        </div>
        <div class="form-group full-width">
          <label>Additional Details (optional)</label>
          <textarea data-field="description" rows="2" placeholder="e.g. Dean's List, Relevant coursework, Honors..."></textarea>
        </div>
      </div>
    `;

    $('#education-entries').appendChild(card);

    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        renderPreview();
      });
    });

    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.education = state.education.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      renderPreview();
    });

    renderPreview();
  }

  $('#btn-add-education').addEventListener('click', createEducationEntry);

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Projects
     ═══════════════════════════════════════════════════════════ */
  function createProjectEntry() {
    projectCounter++;
    const id = `proj-${Date.now()}`;
    const entry = {
      id,
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    state.projects.push(entry);

    const card = document.createElement('div');
    card.classList.add('entry-card');
    card.dataset.id = id;
    card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-number">Project #${projectCounter}</span>
        <button class="btn-remove-entry" data-remove="${id}" title="Remove this entry">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="form-grid">
        <div class="form-group full-width">
          <label>Project Name</label>
          <input type="text" data-field="name" placeholder="e.g. E-Commerce Platform" />
        </div>
        <div class="form-group full-width">
          <label>Description</label>
          <textarea data-field="description" rows="3" placeholder="Describe the project, your role, and key outcomes..."></textarea>
        </div>
        <div class="form-group">
          <label>Technologies Used</label>
          <input type="text" data-field="technologies" placeholder="e.g. React, Node.js, PostgreSQL" />
        </div>
        <div class="form-group">
          <label>Project Link (optional)</label>
          <input type="url" data-field="link" placeholder="e.g. github.com/project" />
        </div>
      </div>
    `;

    $('#project-entries').appendChild(card);

    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        renderPreview();
      });
    });

    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.projects = state.projects.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      renderPreview();
    });

    renderPreview();
  }

  $('#btn-add-project').addEventListener('click', createProjectEntry);

  /* ═══════════════════════════════════════════════════════════
     SKILLS
     ═══════════════════════════════════════════════════════════ */
  const skillInput = $('#skillInput');
  const skillsTagsContainer = $('#skills-tags');

  function addSkill(skillName) {
    const name = skillName.trim();
    if (!name) return;
    if (state.skills.includes(name)) {
      showToast('Skill already added', 'error');
      return;
    }

    state.skills.push(name);
    renderSkillTags();
    renderPreview();
    skillInput.value = '';
    skillInput.focus();
  }

  function removeSkill(skillName) {
    state.skills = state.skills.filter((s) => s !== skillName);
    renderSkillTags();
    renderPreview();
  }

  function renderSkillTags() {
    skillsTagsContainer.innerHTML = state.skills
      .map(
        (skill) => `
      <span class="skill-tag">
        ${escapeHTML(skill)}
        <button type="button" data-remove-skill="${escapeHTML(skill)}" aria-label="Remove ${escapeHTML(skill)}">&times;</button>
      </span>
    `
      )
      .join('');

    skillsTagsContainer.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => removeSkill(btn.dataset.removeSkill));
    });
  }

  $('#btn-add-skill').addEventListener('click', () => addSkill(skillInput.value));

  skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput.value);
    }
  });

  /* ═══════════════════════════════════════════════════════════
     LIVE PREVIEW RENDERING
     ═══════════════════════════════════════════════════════════ */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function hasAnyData() {
    const p = state.personal;
    return (
      p.fullName ||
      p.jobTitle ||
      p.email ||
      p.phone ||
      p.location ||
      state.summary ||
      state.experience.length > 0 ||
      state.education.length > 0 ||
      state.skills.length > 0 ||
      state.projects.length > 0
    );
  }

  function renderPreview() {
    if (!hasAnyData()) {
      resumeEmptyState.style.display = 'flex';
      resumeContent.style.display = 'none';
      return;
    }

    resumeEmptyState.style.display = 'none';
    resumeContent.style.display = 'block';

    const p = state.personal;
    let html = '';

    // ── Header ──
    if (p.fullName || p.jobTitle || p.email || p.phone || p.location || p.linkedin || p.website || p.github) {
      html += '<div class="resume-header">';
      if (p.fullName) {
        html += `<div class="resume-name">${escapeHTML(p.fullName)}</div>`;
      }
      if (p.jobTitle) {
        html += `<div class="resume-title">${escapeHTML(p.jobTitle)}</div>`;
      }

      const contactItems = [];
      if (p.email) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.email)}</span>`);
      if (p.phone) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.phone)}</span>`);
      if (p.location) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.location)}</span>`);
      if (p.linkedin) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.linkedin)}</span>`);
      if (p.website) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.website)}</span>`);
      if (p.github) contactItems.push(`<span class="resume-contact-item">${escapeHTML(p.github)}</span>`);

      if (contactItems.length > 0) {
        html += `<div class="resume-contact">${contactItems.join('<span class="resume-contact-divider">|</span>')}</div>`;
      }

      html += '</div>';
    }

    // ── Summary ──
    if (state.summary.trim()) {
      html += `
        <div class="resume-section">
          <div class="resume-section-title">Professional Summary</div>
          <div class="resume-summary-text">${escapeHTML(state.summary)}</div>
        </div>
      `;
    }

    // ── Experience ──
    const filledExperience = state.experience.filter(
      (e) => e.title || e.company || e.description
    );
    if (filledExperience.length > 0) {
      html += '<div class="resume-section"><div class="resume-section-title">Work Experience</div>';
      filledExperience.forEach((exp) => {
        const dates =
          exp.startDate || exp.endDate
            ? `${escapeHTML(exp.startDate)}${exp.startDate && exp.endDate ? ' — ' : ''}${escapeHTML(exp.endDate)}`
            : '';

        html += `
          <div class="resume-entry">
            <div class="resume-entry-header">
              <span class="resume-entry-primary">${escapeHTML(exp.title || '')}</span>
              ${dates ? `<span class="resume-entry-dates">${dates}</span>` : ''}
            </div>
            ${exp.company ? `<div class="resume-entry-secondary">${escapeHTML(exp.company)}</div>` : ''}
            ${exp.description ? `<div class="resume-entry-description">${escapeHTML(exp.description)}</div>` : ''}
          </div>
        `;
      });
      html += '</div>';
    }

    // ── Education ──
    const filledEducation = state.education.filter(
      (e) => e.school || e.degree || e.description
    );
    if (filledEducation.length > 0) {
      html += '<div class="resume-section"><div class="resume-section-title">Education</div>';
      filledEducation.forEach((edu) => {
        const dates =
          edu.startDate || edu.endDate
            ? `${escapeHTML(edu.startDate)}${edu.startDate && edu.endDate ? ' — ' : ''}${escapeHTML(edu.endDate)}`
            : '';

        html += `
          <div class="resume-entry">
            <div class="resume-entry-header">
              <span class="resume-entry-primary">${escapeHTML(edu.degree || edu.school || '')}</span>
              ${dates ? `<span class="resume-entry-dates">${dates}</span>` : ''}
            </div>
            ${edu.school && edu.degree ? `<div class="resume-entry-secondary">${escapeHTML(edu.school)}${edu.gpa ? '  •  GPA: ' + escapeHTML(edu.gpa) : ''}</div>` : ''}
            ${!edu.degree && edu.gpa ? `<div class="resume-entry-secondary">GPA: ${escapeHTML(edu.gpa)}</div>` : ''}
            ${edu.description ? `<div class="resume-entry-description">${escapeHTML(edu.description)}</div>` : ''}
          </div>
        `;
      });
      html += '</div>';
    }

    // ── Skills ──
    if (state.skills.length > 0) {
      html += `
        <div class="resume-section">
          <div class="resume-section-title">Skills</div>
          <div class="resume-skills-list">
            ${state.skills.map((s) => `<span class="resume-skill-item">${escapeHTML(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // ── Projects ──
    const filledProjects = state.projects.filter(
      (e) => e.name || e.description
    );
    if (filledProjects.length > 0) {
      html += '<div class="resume-section"><div class="resume-section-title">Projects</div>';
      filledProjects.forEach((proj) => {
        html += `
          <div class="resume-entry">
            <div class="resume-entry-header">
              <span class="resume-entry-primary">${escapeHTML(proj.name || '')}</span>
            </div>
            ${proj.description ? `<div class="resume-entry-description">${escapeHTML(proj.description)}</div>` : ''}
            ${proj.technologies ? `<div class="resume-entry-tech">Tech: ${escapeHTML(proj.technologies)}</div>` : ''}
            ${proj.link ? `<div class="resume-entry-link">${escapeHTML(proj.link)}</div>` : ''}
          </div>
        `;
      });
      html += '</div>';
    }

    resumeContent.innerHTML = html;
  }

  /* ═══════════════════════════════════════════════════════════
     ZOOM
     ═══════════════════════════════════════════════════════════ */
  const zoomLevelLabel = $('#zoom-level');

  function updateZoom() {
    const scale = zoomLevel / 100;
    resumePage.style.transform = `scale(${scale})`;
    zoomLevelLabel.textContent = `${zoomLevel}%`;
  }

  $('#btn-zoom-in').addEventListener('click', () => {
    if (zoomLevel < 150) {
      zoomLevel += 10;
      updateZoom();
    }
  });

  $('#btn-zoom-out').addEventListener('click', () => {
    if (zoomLevel > 50) {
      zoomLevel -= 10;
      updateZoom();
    }
  });

  /* ═══════════════════════════════════════════════════════════
     PDF EXPORT
     ═══════════════════════════════════════════════════════════ */
  $('#btn-download-pdf').addEventListener('click', async () => {
    if (!hasAnyData()) {
      showToast('Please add some content before downloading.', 'error');
      return;
    }

    const downloadBtn = $('#btn-download-pdf');
    downloadBtn.classList.add('loading');

    // Show loading overlay
    const overlay = document.createElement('div');
    overlay.classList.add('pdf-overlay');
    overlay.innerHTML = '<div class="spinner"></div><p>Generating your PDF...</p>';
    document.body.appendChild(overlay);

    try {
      if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('PDF library failed to load. Please check your internet connection and refresh.');
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 20;
      const marginRight = 20;
      const contentWidth = pageWidth - marginLeft - marginRight;
      let y = 22;

      // ── Helper: check if we need a new page ──
      function checkPage(needed) {
        if (y + needed > pageHeight - 20) {
          pdf.addPage();
          y = 20;
        }
      }

      // ── Helper: draw wrapped text, returns new Y ──
      function drawWrapped(text, x, startY, maxWidth, lineH) {
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line) => {
          checkPage(lineH);
          pdf.text(line, x, startY);
          startY += lineH;
        });
        return startY;
      }

      // ── Helper: draw a section title with underline ──
      function drawSectionTitle(title) {
        checkPage(14);
        y += 4;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(26, 26, 46);
        pdf.text(title.toUpperCase(), marginLeft, y);
        y += 2;
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.4);
        pdf.line(marginLeft, y, pageWidth - marginRight, y);
        y += 6;
      }

      const p = state.personal;

      // ═══════════ HEADER ═══════════
      if (p.fullName) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(26, 26, 46);
        pdf.text(p.fullName.toUpperCase(), pageWidth / 2, y, { align: 'center' });
        y += 8;
      }

      if (p.jobTitle) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(108, 99, 255);
        pdf.text(p.jobTitle.toUpperCase(), pageWidth / 2, y, { align: 'center' });
        y += 7;
      }

      // Contact info line
      const contactParts = [];
      if (p.email) contactParts.push(p.email);
      if (p.phone) contactParts.push(p.phone);
      if (p.location) contactParts.push(p.location);
      if (p.linkedin) contactParts.push(p.linkedin);
      if (p.website) contactParts.push(p.website);
      if (p.github) contactParts.push(p.github);

      if (contactParts.length > 0) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(100, 100, 100);
        const contactLine = contactParts.join('  |  ');
        const contactLines = pdf.splitTextToSize(contactLine, contentWidth);
        contactLines.forEach((line) => {
          pdf.text(line, pageWidth / 2, y, { align: 'center' });
          y += 4;
        });
        y += 2;
      }

      // Header divider
      if (p.fullName || p.jobTitle) {
        pdf.setDrawColor(45, 45, 94);
        pdf.setLineWidth(0.6);
        pdf.line(marginLeft, y, pageWidth - marginRight, y);
        y += 8;
      }

      // ═══════════ SUMMARY ═══════════
      if (state.summary.trim()) {
        drawSectionTitle('Professional Summary');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(68, 68, 68);
        y = drawWrapped(state.summary, marginLeft, y, contentWidth, 4.5);
        y += 2;
      }

      // ═══════════ EXPERIENCE ═══════════
      const filledExperience = state.experience.filter(
        (e) => e.title || e.company || e.description
      );
      if (filledExperience.length > 0) {
        drawSectionTitle('Work Experience');

        filledExperience.forEach((exp, idx) => {
          checkPage(16);

          // Title and dates on same line
          if (exp.title) {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(26, 26, 46);
            pdf.text(exp.title, marginLeft, y);
          }

          const dates = [exp.startDate, exp.endDate].filter(Boolean).join(' - ');
          if (dates) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.5);
            pdf.setTextColor(120, 120, 120);
            pdf.text(dates, pageWidth - marginRight, y, { align: 'right' });
          }
          y += 4.5;

          // Company
          if (exp.company) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(9.5);
            pdf.setTextColor(85, 85, 85);
            pdf.text(exp.company, marginLeft, y);
            y += 4.5;
          }

          // Description
          if (exp.description) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(68, 68, 68);
            y = drawWrapped(exp.description, marginLeft, y, contentWidth, 4.2);
          }

          if (idx < filledExperience.length - 1) y += 4;
        });
        y += 2;
      }

      // ═══════════ EDUCATION ═══════════
      const filledEducation = state.education.filter(
        (e) => e.school || e.degree || e.description
      );
      if (filledEducation.length > 0) {
        drawSectionTitle('Education');

        filledEducation.forEach((edu, idx) => {
          checkPage(16);

          // Degree and dates
          const mainText = edu.degree || edu.school || '';
          if (mainText) {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(26, 26, 46);
            pdf.text(mainText, marginLeft, y);
          }

          const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
          if (dates) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.5);
            pdf.setTextColor(120, 120, 120);
            pdf.text(dates, pageWidth - marginRight, y, { align: 'right' });
          }
          y += 4.5;

          // School + GPA
          const subParts = [];
          if (edu.school && edu.degree) subParts.push(edu.school);
          if (edu.gpa) subParts.push('GPA: ' + edu.gpa);
          if (subParts.length > 0) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(9.5);
            pdf.setTextColor(85, 85, 85);
            pdf.text(subParts.join('  |  '), marginLeft, y);
            y += 4.5;
          }

          // Description
          if (edu.description) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(68, 68, 68);
            y = drawWrapped(edu.description, marginLeft, y, contentWidth, 4.2);
          }

          if (idx < filledEducation.length - 1) y += 4;
        });
        y += 2;
      }

      // ═══════════ SKILLS ═══════════
      if (state.skills.length > 0) {
        drawSectionTitle('Skills');

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(79, 70, 229);

        // Lay out skill tags in a row-wrapping flow
        let tagX = marginLeft;
        const tagH = 6;
        const tagPadX = 4;
        const tagGap = 3;

        state.skills.forEach((skill) => {
          const textW = pdf.getTextWidth(skill);
          const boxW = textW + tagPadX * 2;

          // Wrap to next line if needed
          if (tagX + boxW > pageWidth - marginRight) {
            tagX = marginLeft;
            y += tagH + 3;
            checkPage(tagH + 3);
          }

          // Draw tag background
          pdf.setFillColor(240, 239, 255);
          pdf.rect(tagX, y - 4, boxW, tagH, 'F');

          // Draw tag text
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8.5);
          pdf.setTextColor(79, 70, 229);
          pdf.text(skill, tagX + tagPadX, y);

          tagX += boxW + tagGap;
        });

        y += tagH + 4;
      }

      // ═══════════ PROJECTS ═══════════
      const filledProjects = state.projects.filter(
        (e) => e.name || e.description
      );
      if (filledProjects.length > 0) {
        drawSectionTitle('Projects');

        filledProjects.forEach((proj, idx) => {
          checkPage(14);

          if (proj.name) {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(26, 26, 46);
            pdf.text(proj.name, marginLeft, y);
            y += 4.5;
          }

          if (proj.description) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(68, 68, 68);
            y = drawWrapped(proj.description, marginLeft, y, contentWidth, 4.2);
          }

          if (proj.technologies) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(8.5);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Tech: ' + proj.technologies, marginLeft, y);
            y += 4.2;
          }

          if (proj.link) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.5);
            pdf.setTextColor(108, 99, 255);
            pdf.text(proj.link, marginLeft, y);
            y += 4.2;
          }

          if (idx < filledProjects.length - 1) y += 4;
        });
      }

      // ── Save ──
      const fileName = state.personal.fullName
        ? `${state.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('PDF Error: ' + (err.message || 'Unknown error. Check console.'), 'error');
    } finally {
      overlay.remove();
      downloadBtn.classList.remove('loading');
    }
  });

  /* ═══════════════════════════════════════════════════════════
     PRINT
     ═══════════════════════════════════════════════════════════ */
  $('#btn-print').addEventListener('click', () => {
    if (!hasAnyData()) {
      showToast('Please add some content before printing.', 'error');
      return;
    }
    window.print();
  });

  /* ═══════════════════════════════════════════════════════════
     CLEAR ALL
     ═══════════════════════════════════════════════════════════ */
  $('#btn-clear').addEventListener('click', () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      return;
    }

    // Reset state
    personalFields.forEach((f) => {
      state.personal[f] = '';
      const input = $(`#${f}`);
      if (input) input.value = '';
    });

    state.summary = '';
    summaryText.value = '';
    summaryCharCount.textContent = '0 / 500';

    state.experience = [];
    state.education = [];
    state.projects = [];
    state.skills = [];

    experienceCounter = 0;
    educationCounter = 0;
    projectCounter = 0;

    $('#experience-entries').innerHTML = '';
    $('#education-entries').innerHTML = '';
    $('#project-entries').innerHTML = '';
    skillsTagsContainer.innerHTML = '';

    renderPreview();
    showToast('All data cleared.', 'success');
    switchSection('personal');
  });

  /* ═══════════════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════════════ */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon =
      type === 'success'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    toast.innerHTML = `${icon}<span>${escapeHTML(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ═══════════════════════════════════════════════════════════
     INITIALIZE
     ═══════════════════════════════════════════════════════════ */
  // Add one default experience entry to get started
  createExperienceEntry();
  createEducationEntry();

  // Initial render
  renderPreview();
})();
