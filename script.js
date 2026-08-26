/* ═══════════════════════════════════════════════════════════════
   Resume Made Easy — Application Logic (v2.0)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── State ───────────────────────────────────────────────── */
  const STORAGE_KEY = 'resume_made_easy_data';

  const defaultSettings = {
    template: 'modern',
    accentColor: '#f97316',
    fontFamily: 'inter',
    density: 'normal',
    atsMode: false,
  };

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
    settings: { ...defaultSettings },
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
  const editorTitle = $('#editor-title');
  const editorSubtitle = $('#editor-subtitle');
  const editorPanel = $('#editor-panel');
  const resumePage = $('#resume-page');
  const resumeContent = $('#resume-content');
  const resumeEmptyState = $('#resume-empty-state');
  const toastContainer = $('#toast-container');
  const previewPanel = $('#preview-panel');

  /* ═══════════════════════════════════════════════════════════
     TEMPLATE SYSTEM
     ═══════════════════════════════════════════════════════════ */
  function getActiveTemplate() {
    if (state.settings.atsMode && window.RESUME_TEMPLATES && window.RESUME_TEMPLATES['ats']) {
      return window.RESUME_TEMPLATES['ats'];
    }
    const name = state.settings.template || 'modern';
    if (window.RESUME_TEMPLATES && window.RESUME_TEMPLATES[name]) {
      return window.RESUME_TEMPLATES[name];
    }
    // Fallback: return first available template
    if (window.RESUME_TEMPLATES) {
      const keys = Object.keys(window.RESUME_TEMPLATES);
      if (keys.length > 0) return window.RESUME_TEMPLATES[keys[0]];
    }
    return null;
  }

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
      void section.offsetWidth;
      section.classList.add('active');
      editorTitle.textContent = section.dataset.title || '';
      editorSubtitle.textContent = section.dataset.subtitle || '';
    }

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
    sidebar.classList.contains('open') ? closeMobileSidebar() : openMobileSidebar();
  });

  sidebarOverlay.addEventListener('click', closeMobileSidebar);

  /* ── Mobile Tab Switcher ─────────────────────────────────── */
  $$('.mobile-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.mobile-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'preview') {
        editorPanel.classList.add('mobile-hidden');
        previewPanel.classList.remove('mobile-hidden');
      } else {
        editorPanel.classList.remove('mobile-hidden');
        previewPanel.classList.add('mobile-hidden');
      }
    });
  });

  /* ── Personal Info Binding ───────────────────────────────── */
  const personalFields = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'website', 'github'];

  personalFields.forEach((field) => {
    const input = $(`#${field}`);
    if (input) {
      input.addEventListener('input', () => {
        state.personal[field] = input.value.trim();
        onStateChange();
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
    summaryCharCount.style.color = val.length > 500 ? 'var(--danger)' : 'var(--text-muted)';
    onStateChange();
  });

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Experience
     ═══════════════════════════════════════════════════════════ */
  function createExperienceEntry(data) {
    experienceCounter++;
    const id = (data && data.id) || `exp-${Date.now()}-${experienceCounter}`;
    const entry = {
      id,
      company: (data && data.company) || '',
      title: (data && data.title) || '',
      startDate: (data && data.startDate) || '',
      endDate: (data && data.endDate) || '',
      description: (data && data.description) || '',
    };

    if (!data) state.experience.push(entry);

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
          <input type="text" data-field="title" placeholder="e.g. Senior Engineer" value="${escapeAttr(entry.title)}" />
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" data-field="company" placeholder="e.g. Google" value="${escapeAttr(entry.company)}" />
        </div>
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" data-field="startDate" placeholder="e.g. Jan 2020" value="${escapeAttr(entry.startDate)}" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="text" data-field="endDate" placeholder="e.g. Present" value="${escapeAttr(entry.endDate)}" />
        </div>
        <div class="form-group full-width">
          <label>Description</label>
          <textarea data-field="description" rows="4" placeholder="Describe your responsibilities and achievements...">${escapeHTML(entry.description)}</textarea>
          <button class="btn-ai-action btn-ai-inline" type="button" data-ai="suggest-bullets" data-entry-id="${id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg>
            Suggest Bullets
          </button>
        </div>
      </div>
      <div class="ai-suggestion-panel ai-inline-panel" data-ai-panel="${id}" style="display:none;">
        <div class="ai-suggestion-header">
          <span>AI Suggestions</span>
          <button class="ai-suggestion-close" data-ai-close="${id}">&times;</button>
        </div>
        <div class="ai-suggestion-content" data-ai-content="${id}"></div>
        <div class="ai-suggestion-actions">
          <button class="btn-ai-accept" data-ai-accept="${id}">Append All</button>
          <button class="btn-ai-discard" data-ai-discard="${id}">Discard</button>
        </div>
      </div>
    `;

    $('#experience-entries').appendChild(card);

    // Bind inputs
    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        onStateChange();
      });
    });

    // Remove button
    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.experience = state.experience.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      onStateChange();
    });

    // AI suggest bullets button
    const aiBtn = card.querySelector('[data-ai="suggest-bullets"]');
    if (aiBtn) {
      aiBtn.addEventListener('click', () => handleSuggestBullets(id, entry, card));
    }

    onStateChange();
  }

  $('#btn-add-experience').addEventListener('click', () => createExperienceEntry());

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Education
     ═══════════════════════════════════════════════════════════ */
  function createEducationEntry(data) {
    educationCounter++;
    const id = (data && data.id) || `edu-${Date.now()}-${educationCounter}`;
    const entry = {
      id,
      school: (data && data.school) || '',
      degree: (data && data.degree) || '',
      startDate: (data && data.startDate) || '',
      endDate: (data && data.endDate) || '',
      gpa: (data && data.gpa) || '',
      description: (data && data.description) || '',
    };

    if (!data) state.education.push(entry);

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
          <input type="text" data-field="school" placeholder="e.g. MIT" value="${escapeAttr(entry.school)}" />
        </div>
        <div class="form-group">
          <label>Degree</label>
          <input type="text" data-field="degree" placeholder="e.g. B.S. Computer Science" value="${escapeAttr(entry.degree)}" />
        </div>
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" data-field="startDate" placeholder="e.g. Sep 2016" value="${escapeAttr(entry.startDate)}" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="text" data-field="endDate" placeholder="e.g. Jun 2020" value="${escapeAttr(entry.endDate)}" />
        </div>
        <div class="form-group">
          <label>GPA (optional)</label>
          <input type="text" data-field="gpa" placeholder="e.g. 3.9 / 4.0" value="${escapeAttr(entry.gpa)}" />
        </div>
        <div class="form-group full-width">
          <label>Additional Details (optional)</label>
          <textarea data-field="description" rows="2" placeholder="e.g. Dean's List, Relevant coursework, Honors...">${escapeHTML(entry.description)}</textarea>
        </div>
      </div>
    `;

    $('#education-entries').appendChild(card);

    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        onStateChange();
      });
    });

    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.education = state.education.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      onStateChange();
    });

    onStateChange();
  }

  $('#btn-add-education').addEventListener('click', () => createEducationEntry());

  /* ═══════════════════════════════════════════════════════════
     DYNAMIC ENTRIES — Projects
     ═══════════════════════════════════════════════════════════ */
  function createProjectEntry(data) {
    projectCounter++;
    const id = (data && data.id) || `proj-${Date.now()}-${projectCounter}`;
    const entry = {
      id,
      name: (data && data.name) || '',
      description: (data && data.description) || '',
      technologies: (data && data.technologies) || '',
      link: (data && data.link) || '',
    };

    if (!data) state.projects.push(entry);

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
          <input type="text" data-field="name" placeholder="e.g. E-Commerce Platform" value="${escapeAttr(entry.name)}" />
        </div>
        <div class="form-group full-width">
          <label>Description</label>
          <textarea data-field="description" rows="3" placeholder="Describe the project, your role, and key outcomes...">${escapeHTML(entry.description)}</textarea>
          <button class="btn-ai-action btn-ai-inline" type="button" data-ai="suggest-bullets" data-entry-id="${id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg>
            Suggest Bullets
          </button>
        </div>
        <div class="form-group">
          <label>Technologies Used</label>
          <input type="text" data-field="technologies" placeholder="e.g. React, Node.js, PostgreSQL" value="${escapeAttr(entry.technologies)}" />
        </div>
        <div class="form-group">
          <label>Project Link (optional)</label>
          <input type="url" data-field="link" placeholder="e.g. github.com/project" value="${escapeAttr(entry.link)}" />
        </div>
      </div>
      <div class="ai-suggestion-panel ai-inline-panel" data-ai-panel="${id}" style="display:none;">
        <div class="ai-suggestion-header">
          <span>AI Suggestions</span>
          <button class="ai-suggestion-close" data-ai-close="${id}">&times;</button>
        </div>
        <div class="ai-suggestion-content" data-ai-content="${id}"></div>
        <div class="ai-suggestion-actions">
          <button class="btn-ai-accept" data-ai-accept="${id}">Append All</button>
          <button class="btn-ai-discard" data-ai-discard="${id}">Discard</button>
        </div>
      </div>
    `;

    $('#project-entries').appendChild(card);

    card.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        entry[input.dataset.field] = input.value;
        onStateChange();
      });
    });

    card.querySelector('.btn-remove-entry').addEventListener('click', () => {
      state.projects = state.projects.filter((e) => e.id !== id);
      card.style.opacity = '0';
      card.style.transform = 'translateY(-8px)';
      setTimeout(() => card.remove(), 200);
      onStateChange();
    });

    // AI suggest bullets
    const aiBtn = card.querySelector('[data-ai="suggest-bullets"]');
    if (aiBtn) {
      aiBtn.addEventListener('click', () => handleSuggestBullets(id, entry, card));
    }

    onStateChange();
  }

  $('#btn-add-project').addEventListener('click', () => createProjectEntry());

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
    onStateChange();
    skillInput.value = '';
    skillInput.focus();
  }

  function removeSkill(skillName) {
    state.skills = state.skills.filter((s) => s !== skillName);
    renderSkillTags();
    onStateChange();
  }

  function renderSkillTags() {
    skillsTagsContainer.innerHTML = state.skills
      .map(
        (skill) => `
      <span class="skill-tag">
        ${escapeHTML(skill)}
        <button type="button" data-remove-skill="${escapeAttr(skill)}" aria-label="Remove ${escapeAttr(skill)}">&times;</button>
      </span>`
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
     TEMPLATE GALLERY
     ═══════════════════════════════════════════════════════════ */
  $$('.template-card').forEach((card) => {
    card.addEventListener('click', () => {
      $$('.template-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      state.settings.template = card.dataset.template;
      onStateChange();
    });
  });

  /* ═══════════════════════════════════════════════════════════
     CUSTOMIZATION CONTROLS
     ═══════════════════════════════════════════════════════════ */
  const accentColorInput = $('#accentColor');
  const accentColorValue = $('#accentColorValue');
  const fontFamilySelect = $('#fontFamily');

  accentColorInput.addEventListener('input', () => {
    state.settings.accentColor = accentColorInput.value;
    accentColorValue.textContent = accentColorInput.value;
    onStateChange();
  });

  fontFamilySelect.addEventListener('change', () => {
    state.settings.fontFamily = fontFamilySelect.value;
    onStateChange();
  });

  $$('input[name="density"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      state.settings.density = radio.value;
      onStateChange();
    });
  });

  /* ═══════════════════════════════════════════════════════════
     ATS MODE TOGGLE
     ═══════════════════════════════════════════════════════════ */
  const atsToggle = $('#ats-toggle');
  atsToggle.addEventListener('change', () => {
    state.settings.atsMode = atsToggle.checked;
    onStateChange();
    showToast(atsToggle.checked ? 'ATS Mode enabled - optimized for tracking systems' : 'ATS Mode disabled', 'success');
  });

  /* ═══════════════════════════════════════════════════════════
     LIVE PREVIEW RENDERING
     ═══════════════════════════════════════════════════════════ */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function hasAnyData() {
    const p = state.personal;
    return (
      p.fullName || p.jobTitle || p.email || p.phone || p.location ||
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

    const template = getActiveTemplate();
    if (template && template.renderHTML) {
      resumeContent.innerHTML = template.renderHTML(state, state.settings);
    } else {
      // Fallback: basic rendering if no templates loaded
      resumeContent.innerHTML = '<div style="padding:40px;color:#999;text-align:center;">Template not loaded. Please refresh the page.</div>';
    }
  }

  /* ═══════════════════════════════════════════════════════════
     STATE CHANGE HANDLER (central dispatcher)
     ═══════════════════════════════════════════════════════════ */
  function onStateChange() {
    renderPreview();
    updateProgress();
    saveToLocalStorage();
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
    if (zoomLevel < 150) { zoomLevel += 10; updateZoom(); }
  });

  $('#btn-zoom-out').addEventListener('click', () => {
    if (zoomLevel > 50) { zoomLevel -= 10; updateZoom(); }
  });

  /* ═══════════════════════════════════════════════════════════
     PDF EXPORT (template-dispatched)
     ═══════════════════════════════════════════════════════════ */
  $('#btn-download-pdf').addEventListener('click', async () => {
    if (!hasAnyData()) {
      showToast('Please add some content before downloading.', 'error');
      return;
    }

    const downloadBtn = $('#btn-download-pdf');
    downloadBtn.classList.add('loading');

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

      const template = getActiveTemplate();
      if (template && template.renderPDF) {
        template.renderPDF(pdf, state, state.settings);
      } else {
        throw new Error('No template renderer available.');
      }

      const fileName = state.personal.fullName
        ? `${state.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('PDF Error: ' + (err.message || 'Unknown error'), 'error');
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
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return;

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

    localStorage.removeItem(STORAGE_KEY);
    onStateChange();
    showToast('All data cleared.', 'success');
    switchSection('personal');
  });

  /* ═══════════════════════════════════════════════════════════
     PROGRESS INDICATOR
     ═══════════════════════════════════════════════════════════ */
  function updateProgress() {
    let completed = 0;
    const checks = {
      personal: !!(state.personal.fullName && state.personal.email),
      summary: !!state.summary.trim(),
      experience: state.experience.some((e) => e.title || e.company),
      education: state.education.some((e) => e.school || e.degree),
      skills: state.skills.length > 0,
      projects: state.projects.some((p) => p.name),
    };

    Object.keys(checks).forEach((key) => {
      const el = $(`#check-${key}`);
      if (el) {
        if (checks[key]) {
          el.textContent = '✓';
          el.classList.add('complete');
          completed++;
        } else {
          el.textContent = '';
          el.classList.remove('complete');
        }
      }
    });

    const progressFill = $('#progress-fill');
    const progressText = $('#progress-text');
    if (progressFill) progressFill.style.width = `${(completed / 6) * 100}%`;
    if (progressText) progressText.textContent = `${completed} of 6 sections complete`;
  }

  /* ═══════════════════════════════════════════════════════════
     LOCALSTORAGE SAVE / LOAD
     ═══════════════════════════════════════════════════════════ */
  function saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage full or unavailable — silently fail
    }
  }

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return false;

      const parsed = JSON.parse(saved);
      if (!parsed || !parsed.personal) return false;

      // Restore personal info
      Object.keys(state.personal).forEach((key) => {
        if (parsed.personal[key] !== undefined) {
          state.personal[key] = parsed.personal[key];
        }
      });

      // Restore summary
      state.summary = parsed.summary || '';

      // Restore arrays
      state.experience = parsed.experience || [];
      state.education = parsed.education || [];
      state.skills = parsed.skills || [];
      state.projects = parsed.projects || [];

      // Restore settings
      if (parsed.settings) {
        state.settings = { ...defaultSettings, ...parsed.settings };
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Populate all form elements from state (used after loading from localStorage or examples)
   */
  function populateFormFromState() {
    // Personal fields
    personalFields.forEach((f) => {
      const input = $(`#${f}`);
      if (input) input.value = state.personal[f] || '';
    });

    // Summary
    summaryText.value = state.summary || '';
    summaryCharCount.textContent = `${state.summary.length} / 500`;

    // Clear and recreate dynamic entries
    experienceCounter = 0;
    educationCounter = 0;
    projectCounter = 0;
    $('#experience-entries').innerHTML = '';
    $('#education-entries').innerHTML = '';
    $('#project-entries').innerHTML = '';

    state.experience.forEach((entry) => createExperienceEntry(entry));
    state.education.forEach((entry) => createEducationEntry(entry));
    state.projects.forEach((entry) => createProjectEntry(entry));

    // Skills
    renderSkillTags();

    // Settings UI
    accentColorInput.value = state.settings.accentColor;
    accentColorValue.textContent = state.settings.accentColor;
    fontFamilySelect.value = state.settings.fontFamily;
    atsToggle.checked = state.settings.atsMode;

    // Density radio
    const densityRadio = $(`input[name="density"][value="${state.settings.density}"]`);
    if (densityRadio) densityRadio.checked = true;

    // Template card
    $$('.template-card').forEach((c) => c.classList.remove('active'));
    const activeCard = $(`[data-template="${state.settings.template}"]`);
    if (activeCard) activeCard.classList.add('active');

    onStateChange();
  }

  /* ═══════════════════════════════════════════════════════════
     EXAMPLES GALLERY
     ═══════════════════════════════════════════════════════════ */
  function initExamplesGallery() {
    const gallery = $('#examples-gallery');
    if (!gallery || !window.RESUME_EXAMPLES) return;

    gallery.innerHTML = window.RESUME_EXAMPLES.map((ex, i) => `
      <button class="example-card" data-example="${i}">
        <span class="example-icon">${ex.icon}</span>
        <span class="example-label">${escapeHTML(ex.label)}</span>
        <span class="example-category">${escapeHTML(ex.category)}</span>
      </button>
    `).join('');

    gallery.querySelectorAll('.example-card').forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.example, 10);
        const example = window.RESUME_EXAMPLES[idx];
        if (!example) return;

        if (!confirm('This will replace your current data with the example. Continue?')) return;

        // Deep copy example data into state
        const data = example.data;
        Object.keys(state.personal).forEach((k) => {
          state.personal[k] = (data.personal && data.personal[k]) || '';
        });
        state.summary = data.summary || '';
        state.experience = JSON.parse(JSON.stringify(data.experience || []));
        state.education = JSON.parse(JSON.stringify(data.education || []));
        state.skills = [...(data.skills || [])];
        state.projects = JSON.parse(JSON.stringify(data.projects || []));

        populateFormFromState();
        showToast(`Loaded "${example.label}" example`, 'success');
        switchSection('personal');
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     AI SUGGESTIONS
     ═══════════════════════════════════════════════════════════ */

  // API Key management
  const apiKeyInput = $('#aiApiKey');
  const btnSaveKey = $('#btn-save-key');
  const btnToggleKey = $('#btn-toggle-key');

  if (btnSaveKey) {
    btnSaveKey.addEventListener('click', () => {
      if (window.AI_SUGGESTIONS) {
        window.AI_SUGGESTIONS.setApiKey(apiKeyInput.value);
        showToast('API key saved', 'success');
      }
    });
  }

  if (btnToggleKey) {
    btnToggleKey.addEventListener('click', () => {
      apiKeyInput.type = apiKeyInput.type === 'password' ? 'text' : 'password';
    });
  }

  // Load saved API key
  if (window.AI_SUGGESTIONS && window.AI_SUGGESTIONS.hasApiKey()) {
    apiKeyInput.value = window.AI_SUGGESTIONS.getApiKey();
  }

  // Suggest bullet points for experience/project
  async function handleSuggestBullets(entryId, entry, card) {
    if (!window.AI_SUGGESTIONS) {
      showToast('AI module not loaded.', 'error');
      return;
    }
    if (!window.AI_SUGGESTIONS.hasApiKey()) {
      showToast('Please add your Claude API key in Templates & Settings > AI Settings.', 'error');
      switchSection('templates');
      return;
    }

    const btn = card.querySelector(`[data-entry-id="${entryId}"]`);
    const panel = card.querySelector(`[data-ai-panel="${entryId}"]`);
    const content = card.querySelector(`[data-ai-content="${entryId}"]`);

    if (!btn || !panel || !content) return;

    btn.disabled = true;
    btn.innerHTML = '<span class="ai-spinner"></span> Generating...';

    try {
      const jobTitle = entry.title || entry.name || state.personal.jobTitle || '';
      const company = entry.company || '';
      const keywords = entry.description || entry.technologies || '';

      const bullets = await window.AI_SUGGESTIONS.suggestBulletPoints(jobTitle, company, keywords);

      content.innerHTML = bullets.map((b) => `
        <div class="ai-bullet">
          <span>* ${escapeHTML(b)}</span>
          <button class="btn-ai-insert-one" data-bullet="${escapeAttr(b)}">Insert</button>
        </div>
      `).join('');

      // Individual insert buttons
      content.querySelectorAll('.btn-ai-insert-one').forEach((insertBtn) => {
        insertBtn.addEventListener('click', () => {
          const textarea = card.querySelector('textarea[data-field="description"]');
          if (textarea) {
            textarea.value = (textarea.value ? textarea.value + '\n' : '') + '* ' + insertBtn.dataset.bullet;
            entry.description = textarea.value;
            onStateChange();
            insertBtn.textContent = 'Inserted!';
            insertBtn.disabled = true;
          }
        });
      });

      // Accept all button
      const acceptBtn = card.querySelector(`[data-ai-accept="${entryId}"]`);
      if (acceptBtn) {
        acceptBtn.onclick = () => {
          const textarea = card.querySelector('textarea[data-field="description"]');
          if (textarea) {
            const newText = bullets.map((b) => '* ' + b).join('\n');
            textarea.value = (textarea.value ? textarea.value + '\n' : '') + newText;
            entry.description = textarea.value;
            onStateChange();
          }
          panel.style.display = 'none';
        };
      }

      // Discard button
      const discardBtn = card.querySelector(`[data-ai-discard="${entryId}"]`);
      if (discardBtn) {
        discardBtn.onclick = () => { panel.style.display = 'none'; };
      }

      // Close button
      const closeBtn = card.querySelector(`[data-ai-close="${entryId}"]`);
      if (closeBtn) {
        closeBtn.onclick = () => { panel.style.display = 'none'; };
      }

      panel.style.display = 'block';
    } catch (err) {
      showToast('AI Error: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg> Suggest Bullets';
    }
  }

  // Polish Summary
  const btnPolishSummary = $('#btn-polish-summary');
  const aiSummaryPanel = $('#ai-summary-panel');
  const aiSummaryContent = $('#ai-summary-content');

  if (btnPolishSummary) {
    btnPolishSummary.addEventListener('click', async () => {
      if (!window.AI_SUGGESTIONS) {
        showToast('AI module not loaded.', 'error');
        return;
      }
      if (!window.AI_SUGGESTIONS.hasApiKey()) {
        showToast('Please add your Claude API key in Templates & Settings > AI Settings.', 'error');
        switchSection('templates');
        return;
      }
      if (!state.summary.trim()) {
        showToast('Write a summary first, then polish it with AI.', 'error');
        return;
      }

      btnPolishSummary.disabled = true;
      btnPolishSummary.innerHTML = '<span class="ai-spinner"></span> Polishing...';

      try {
        const polished = await window.AI_SUGGESTIONS.polishSummary(state.summary, state.personal.jobTitle);
        aiSummaryContent.innerHTML = `
          <div class="ai-diff">
            <div class="ai-diff-label">Original:</div>
            <div class="ai-diff-text ai-diff-old">${escapeHTML(state.summary)}</div>
            <div class="ai-diff-label">Polished:</div>
            <div class="ai-diff-text ai-diff-new">${escapeHTML(polished)}</div>
          </div>
        `;
        aiSummaryPanel.style.display = 'block';

        $('#ai-summary-accept').onclick = () => {
          state.summary = polished;
          summaryText.value = polished;
          summaryCharCount.textContent = `${polished.length} / 500`;
          aiSummaryPanel.style.display = 'none';
          onStateChange();
          showToast('Summary updated!', 'success');
        };

        $('#ai-summary-discard').onclick = () => {
          aiSummaryPanel.style.display = 'none';
        };

        $('#ai-summary-close').onclick = () => {
          aiSummaryPanel.style.display = 'none';
        };
      } catch (err) {
        showToast('AI Error: ' + err.message, 'error');
      } finally {
        btnPolishSummary.disabled = false;
        btnPolishSummary.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg> Polish with AI';
      }
    });
  }

  // Suggest Skills
  const btnSuggestSkills = $('#btn-suggest-skills');
  const aiSkillsPanel = $('#ai-skills-panel');
  const aiSkillsContent = $('#ai-skills-content');

  if (btnSuggestSkills) {
    btnSuggestSkills.addEventListener('click', async () => {
      if (!window.AI_SUGGESTIONS || !window.AI_SUGGESTIONS.hasApiKey()) {
        showToast('Please add your Claude API key in Templates & Settings > AI Settings.', 'error');
        switchSection('templates');
        return;
      }

      btnSuggestSkills.disabled = true;
      btnSuggestSkills.innerHTML = '<span class="ai-spinner"></span> Suggesting...';

      try {
        const suggested = await window.AI_SUGGESTIONS.suggestSkills(state.personal.jobTitle, state.skills);
        aiSkillsContent.innerHTML = suggested.map((s) => `
          <button class="ai-skill-suggestion" data-skill="${escapeAttr(s)}">${escapeHTML(s)} <span>+ Add</span></button>
        `).join('');

        aiSkillsContent.querySelectorAll('.ai-skill-suggestion').forEach((btn) => {
          btn.addEventListener('click', () => {
            addSkill(btn.dataset.skill);
            btn.classList.add('added');
            btn.querySelector('span').textContent = 'Added!';
            btn.disabled = true;
          });
        });

        aiSkillsPanel.style.display = 'block';

        $('#ai-skills-close').onclick = () => {
          aiSkillsPanel.style.display = 'none';
        };
      } catch (err) {
        showToast('AI Error: ' + err.message, 'error');
      } finally {
        btnSuggestSkills.disabled = false;
        btnSuggestSkills.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z"/></svg> Suggest Skills with AI';
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════════════ */
  function showToast(message, type) {
    type = type || 'success';
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success'
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
  function init() {
    // Try loading from localStorage
    const loaded = loadFromLocalStorage();
    if (loaded) {
      populateFormFromState();
      showToast('Welcome back! Your progress has been restored.', 'success');
    } else {
      // Add one default experience and education entry
      createExperienceEntry();
      createEducationEntry();
      renderPreview();
    }

    // Init examples gallery
    initExamplesGallery();

    // Initial progress update
    updateProgress();
  }

  init();
})();
