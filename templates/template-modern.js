window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};
window.RESUME_TEMPLATES['modern'] = {
  label: 'Modern',
  description: 'Two-column layout with a colored sidebar',
  renderHTML: function(state, settings) {
    function esc(str) {
      if (!str) return '';
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(str));
      return d.innerHTML;
    }

    const accent = settings.accentColor || '#6c63ff';
    const fontFamilies = {
      'inter': "'Inter', sans-serif",
      'georgia': "'Georgia', serif",
      'roboto': "'Roboto Slab', serif"
    };
    const fontFamily = fontFamilies[settings.fontFamily] || fontFamilies['inter'];
    
    // Density mapping
    let fontSize = '14px';
    let spacing = '15px';
    if (settings.density === 'compact') {
      fontSize = '12px';
      spacing = '10px';
    } else if (settings.density === 'spacious') {
      fontSize = '16px';
      spacing = '20px';
    }

    const css = `
      .resume-tpl-modern {
        display: flex;
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: #333;
        line-height: 1.5;
        background: #fff;
        min-height: 100%;
      }
      .resume-tpl-modern-sidebar {
        width: 30%;
        background-color: ${accent};
        color: #fff;
        padding: 30px 20px;
        box-sizing: border-box;
      }
      .resume-tpl-modern-main {
        width: 70%;
        padding: 30px 30px;
        box-sizing: border-box;
      }
      .resume-tpl-modern h1 {
        font-size: 2.2em;
        margin: 0 0 5px 0;
        line-height: 1.2;
      }
      .resume-tpl-modern h2 {
        font-size: 1.2em;
        margin: 0 0 20px 0;
        font-weight: normal;
        opacity: 0.9;
      }
      .resume-tpl-modern-contact {
        margin-bottom: ${spacing};
      }
      .resume-tpl-modern-contact-item {
        margin-bottom: 8px;
        word-break: break-all;
        font-size: 0.9em;
      }
      .resume-tpl-modern-section-title {
        color: ${accent};
        font-size: 1.4em;
        border-bottom: 2px solid ${accent};
        padding-bottom: 5px;
        margin-top: 0;
        margin-bottom: ${spacing};
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .resume-tpl-modern-sidebar .resume-tpl-modern-section-title {
        color: #fff;
        border-bottom: 2px solid rgba(255,255,255,0.3);
        margin-top: 30px;
      }
      .resume-tpl-modern-skills ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .resume-tpl-modern-skills li {
        margin-bottom: 5px;
        font-size: 0.9em;
      }
      .resume-tpl-modern-item {
        margin-bottom: ${spacing};
      }
      .resume-tpl-modern-item-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 5px;
      }
      .resume-tpl-modern-item-title {
        font-weight: bold;
        font-size: 1.1em;
      }
      .resume-tpl-modern-item-subtitle {
        font-style: italic;
      }
      .resume-tpl-modern-item-date {
        font-size: 0.9em;
        color: #666;
      }
      .resume-tpl-modern-item-desc {
        margin-top: 5px;
      }
    `;

    const p = state.personal || {};
    let html = `<style>${css}</style><div class="resume-tpl-modern">`;

    // Sidebar
    html += `<div class="resume-tpl-modern-sidebar">`;
    html += `<h1>${esc(p.fullName)}</h1>`;
    if (p.jobTitle) html += `<h2>${esc(p.jobTitle)}</h2>`;
    
    html += `<div class="resume-tpl-modern-contact">`;
    if (p.email) html += `<div class="resume-tpl-modern-contact-item">Email: ${esc(p.email)}</div>`;
    if (p.phone) html += `<div class="resume-tpl-modern-contact-item">Phone: ${esc(p.phone)}</div>`;
    if (p.location) html += `<div class="resume-tpl-modern-contact-item">Location: ${esc(p.location)}</div>`;
    if (p.linkedin) html += `<div class="resume-tpl-modern-contact-item">LinkedIn: ${esc(p.linkedin)}</div>`;
    if (p.website) html += `<div class="resume-tpl-modern-contact-item">Website: ${esc(p.website)}</div>`;
    if (p.github) html += `<div class="resume-tpl-modern-contact-item">GitHub: ${esc(p.github)}</div>`;
    html += `</div>`;

    if (state.skills && state.skills.length > 0) {
      html += `<h3 class="resume-tpl-modern-section-title">Skills</h3>`;
      html += `<div class="resume-tpl-modern-skills"><ul>`;
      state.skills.forEach(skill => {
        if (skill) html += `<li>${esc(skill)}</li>`;
      });
      html += `</ul></div>`;
    }
    html += `</div>`; // End sidebar

    // Main Content
    html += `<div class="resume-tpl-modern-main">`;
    
    if (state.summary) {
      html += `<h3 class="resume-tpl-modern-section-title">Professional Summary</h3>`;
      html += `<div class="resume-tpl-modern-item-desc">${esc(state.summary)}</div>`;
      html += `<div style="margin-bottom: ${spacing};"></div>`;
    }

    const exp = (state.experience || []).filter(e => e.company || e.title);
    if (exp.length > 0) {
      html += `<h3 class="resume-tpl-modern-section-title">Experience</h3>`;
      exp.forEach(e => {
        html += `<div class="resume-tpl-modern-item">`;
        html += `<div class="resume-tpl-modern-item-header">`;
        html += `<div><span class="resume-tpl-modern-item-title">${esc(e.title)}</span> | <span class="resume-tpl-modern-item-subtitle">${esc(e.company)}</span></div>`;
        const date = [e.startDate, e.endDate].filter(Boolean).join(' - ');
        if (date) html += `<div class="resume-tpl-modern-item-date">${esc(date)}</div>`;
        html += `</div>`;
        if (e.description) html += `<div class="resume-tpl-modern-item-desc">${esc(e.description)}</div>`;
        html += `</div>`;
      });
    }

    const edu = (state.education || []).filter(e => e.school || e.degree);
    if (edu.length > 0) {
      html += `<h3 class="resume-tpl-modern-section-title">Education</h3>`;
      edu.forEach(e => {
        html += `<div class="resume-tpl-modern-item">`;
        html += `<div class="resume-tpl-modern-item-header">`;
        html += `<div><span class="resume-tpl-modern-item-title">${esc(e.degree)}</span> | <span class="resume-tpl-modern-item-subtitle">${esc(e.school)}</span></div>`;
        const date = [e.startDate, e.endDate].filter(Boolean).join(' - ');
        if (date) html += `<div class="resume-tpl-modern-item-date">${esc(date)}</div>`;
        html += `</div>`;
        if (e.gpa) html += `<div>GPA: ${esc(e.gpa)}</div>`;
        if (e.description) html += `<div class="resume-tpl-modern-item-desc">${esc(e.description)}</div>`;
        html += `</div>`;
      });
    }

    const proj = (state.projects || []).filter(p => p.name);
    if (proj.length > 0) {
      html += `<h3 class="resume-tpl-modern-section-title">Projects</h3>`;
      proj.forEach(p => {
        html += `<div class="resume-tpl-modern-item">`;
        html += `<div class="resume-tpl-modern-item-header">`;
        html += `<div><span class="resume-tpl-modern-item-title">${esc(p.name)}</span>`;
        if (p.link) html += ` | <a href="${esc(p.link)}" target="_blank" style="color:${accent}">Link</a>`;
        html += `</div></div>`;
        if (p.technologies) html += `<div style="font-size: 0.9em; color: #555; margin-bottom: 5px;">Tech: ${esc(p.technologies)}</div>`;
        if (p.description) html += `<div class="resume-tpl-modern-item-desc">${esc(p.description)}</div>`;
        html += `</div>`;
      });
    }

    html += `</div></div>`; // End main, end wrapper
    return html;
  },

  renderPDF: function(pdf, state, settings) {
    const p = state.personal || {};
    const hex = settings.accentColor || '#6c63ff';
    const r = parseInt(hex.slice(1,3), 16) || 108;
    const g = parseInt(hex.slice(3,5), 16) || 99;
    const b = parseInt(hex.slice(5,7), 16) || 255;
    
    let fontName = 'helvetica';
    if (settings.fontFamily === 'georgia' || settings.fontFamily === 'roboto') fontName = 'times';
    
    // Pagination tracking
    let yRight = 20;
    
    // Draw left sidebar background
    const drawSidebar = () => {
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, 75, 297, 'F');
    };
    
    drawSidebar();

    const checkPageRight = (needed) => {
      if (yRight + needed > 277) {
        pdf.addPage();
        drawSidebar();
        yRight = 20;
        return true;
      }
      return false;
    };

    const cleanStr = (s) => (s || '').replace(/[\u2013\u2014]/g, '-').replace(/[\u2022\u00B7]/g, '*').replace(/[^\x00-\x7F]/g, '');

    // Left Column Content (drawn only on page 1)
    let yLeft = 20;
    pdf.setTextColor(255, 255, 255);
    
    if (p.fullName) {
      pdf.setFont(fontName, 'bold');
      pdf.setFontSize(20);
      const nameLines = pdf.splitTextToSize(cleanStr(p.fullName), 55);
      pdf.text(nameLines, 10, yLeft);
      yLeft += nameLines.length * 8;
    }
    
    if (p.jobTitle) {
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(12);
      const titleLines = pdf.splitTextToSize(cleanStr(p.jobTitle), 55);
      pdf.text(titleLines, 10, yLeft);
      yLeft += titleLines.length * 6 + 5;
    }

    pdf.setFontSize(10);
    const contacts = [
      { label: 'Email', val: p.email },
      { label: 'Phone', val: p.phone },
      { label: 'Location', val: p.location },
      { label: 'LinkedIn', val: p.linkedin },
      { label: 'Website', val: p.website },
      { label: 'GitHub', val: p.github }
    ];

    contacts.forEach(c => {
      if (c.val) {
        if (yLeft > 277) return; 
        const textLines = pdf.splitTextToSize(c.label + ': ' + cleanStr(c.val), 55);
        pdf.text(textLines, 10, yLeft);
        yLeft += textLines.length * 4.5 + 2;
      }
    });

    if (state.skills && state.skills.length > 0) {
      yLeft += 5;
      if (yLeft < 277) {
        pdf.setFont(fontName, 'bold');
        pdf.setFontSize(12);
        pdf.text('SKILLS', 10, yLeft);
        yLeft += 2;
        pdf.setDrawColor(255, 255, 255);
        pdf.setLineWidth(0.5);
        pdf.line(10, yLeft, 65, yLeft);
        yLeft += 5;
  
        pdf.setFont(fontName, 'normal');
        pdf.setFontSize(10);
        state.skills.forEach(skill => {
          if (skill) {
            if (yLeft > 277) return;
            const lines = pdf.splitTextToSize(cleanStr(skill), 55);
            pdf.text(lines, 10, yLeft);
            yLeft += lines.length * 4.5;
          }
        });
      }
    }

    // Right Column Functions
    const rightX = 80;
    const rightW = 115; // 210 - 80 = 130, minus 15 margin = 115

    const addSectionTitle = (title) => {
      checkPageRight(15);
      pdf.setTextColor(r, g, b);
      pdf.setFont(fontName, 'bold');
      pdf.setFontSize(14);
      pdf.text(title.toUpperCase(), rightX, yRight);
      yRight += 2;
      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.5);
      pdf.line(rightX, yRight, rightX + rightW, yRight);
      yRight += 6;
      pdf.setTextColor(0, 0, 0); 
    };

    pdf.setTextColor(0, 0, 0);

    if (state.summary) {
      addSectionTitle('Professional Summary');
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(cleanStr(state.summary), rightW);
      checkPageRight(lines.length * 4.5);
      pdf.text(lines, rightX, yRight);
      yRight += lines.length * 4.5 + 6;
    }

    const exp = (state.experience || []).filter(e => e.company || e.title);
    if (exp.length > 0) {
      addSectionTitle('Experience');
      exp.forEach(e => {
        checkPageRight(15);
        pdf.setFont(fontName, 'bold');
        pdf.setFontSize(11);
        const titleText = cleanStr(e.title || '');
        pdf.text(titleText, rightX, yRight);
        
        pdf.setFont(fontName, 'italic');
        const coText = cleanStr(e.company || '');
        if (coText) {
          const tWidth = pdf.getTextWidth(titleText);
          pdf.text(' | ' + coText, rightX + tWidth, yRight);
        }

        const dateStr = [e.startDate, e.endDate].filter(Boolean).join(' - ');
        if (dateStr) {
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const dateWidth = pdf.getTextWidth(cleanStr(dateStr));
          pdf.text(cleanStr(dateStr), rightX + rightW - dateWidth, yRight);
        }
        
        yRight += 5;

        if (e.description) {
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const descLines = pdf.splitTextToSize(cleanStr(e.description), rightW);
          checkPageRight(descLines.length * 4.5);
          pdf.text(descLines, rightX, yRight);
          yRight += descLines.length * 4.5;
        }
        yRight += 4;
      });
      yRight += 2;
    }

    const edu = (state.education || []).filter(e => e.school || e.degree);
    if (edu.length > 0) {
      addSectionTitle('Education');
      edu.forEach(e => {
        checkPageRight(15);
        pdf.setFont(fontName, 'bold');
        pdf.setFontSize(11);
        const degText = cleanStr(e.degree || '');
        pdf.text(degText, rightX, yRight);
        
        pdf.setFont(fontName, 'italic');
        const schText = cleanStr(e.school || '');
        if (schText) {
          const tWidth = pdf.getTextWidth(degText);
          pdf.text(' | ' + schText, rightX + tWidth, yRight);
        }

        const dateStr = [e.startDate, e.endDate].filter(Boolean).join(' - ');
        if (dateStr) {
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const dateWidth = pdf.getTextWidth(cleanStr(dateStr));
          pdf.text(cleanStr(dateStr), rightX + rightW - dateWidth, yRight);
        }
        
        yRight += 5;

        pdf.setFont(fontName, 'normal');
        pdf.setFontSize(10);
        if (e.gpa) {
          pdf.text('GPA: ' + cleanStr(e.gpa), rightX, yRight);
          yRight += 4.5;
        }
        
        if (e.description) {
          const descLines = pdf.splitTextToSize(cleanStr(e.description), rightW);
          checkPageRight(descLines.length * 4.5);
          pdf.text(descLines, rightX, yRight);
          yRight += descLines.length * 4.5;
        }
        yRight += 4;
      });
      yRight += 2;
    }

    const proj = (state.projects || []).filter(p => p.name);
    if (proj.length > 0) {
      addSectionTitle('Projects');
      proj.forEach(p => {
        checkPageRight(15);
        pdf.setFont(fontName, 'bold');
        pdf.setFontSize(11);
        const nameText = cleanStr(p.name || '');
        pdf.text(nameText, rightX, yRight);
        
        if (p.link) {
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 255);
          const nWidth = pdf.getTextWidth(nameText);
          pdf.text(' | Link', rightX + nWidth, yRight);
          pdf.setTextColor(0, 0, 0); 
        }
        
        yRight += 5;

        if (p.technologies) {
          pdf.setFont(fontName, 'italic');
          pdf.setFontSize(9);
          pdf.text('Tech: ' + cleanStr(p.technologies), rightX, yRight);
          yRight += 4.5;
        }

        if (p.description) {
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const descLines = pdf.splitTextToSize(cleanStr(p.description), rightW);
          checkPageRight(descLines.length * 4.5);
          pdf.text(descLines, rightX, yRight);
          yRight += descLines.length * 4.5;
        }
        yRight += 4;
      });
    }
  }
};
