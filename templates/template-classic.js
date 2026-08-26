window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};
window.RESUME_TEMPLATES['classic'] = {
  label: 'Classic',
  description: 'Traditional single-column, ATS-safe layout suitable for corporate/finance roles',
  renderHTML: function(state, settings) {
    function esc(str) {
      if (!str) return '';
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(str));
      return d.innerHTML;
    }

    const accent = settings.accentColor || '#000000';
    
    let fontStr = "'Georgia', serif";
    if (settings.fontFamily === 'inter') fontStr = "'Inter', sans-serif";
    else if (settings.fontFamily === 'roboto') fontStr = "'Roboto Slab', serif";

    let spacing = '1em';
    let smallSpacing = '0.5em';
    let fontSize = '11pt';
    let h1Size = '24pt';
    let h2Size = '14pt';
    
    if (settings.density === 'compact') {
      spacing = '0.5em';
      smallSpacing = '0.2em';
      fontSize = '10pt';
      h1Size = '20pt';
      h2Size = '12pt';
    } else if (settings.density === 'spacious') {
      spacing = '1.5em';
      smallSpacing = '0.8em';
      fontSize = '12pt';
      h1Size = '28pt';
      h2Size = '16pt';
    }

    let html = `<div class="resume-tpl-classic" style="font-family: ${fontStr}; font-size: ${fontSize}; line-height: 1.5; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">`;

    // Header
    const p = state.personal || {};
    html += `<div style="text-align: center; margin-bottom: ${spacing};">`;
    if (p.fullName) html += `<h1 style="margin: 0; font-size: ${h1Size}; font-weight: bold; color: #000;">${esc(p.fullName)}</h1>`;
    if (p.jobTitle) html += `<div style="font-size: 1.1em; margin-top: 5px; color: #555;">${esc(p.jobTitle)}</div>`;
    
    // Contact Info
    const contacts = [];
    if (p.email) contacts.push(esc(p.email));
    if (p.phone) contacts.push(esc(p.phone));
    if (p.location) contacts.push(esc(p.location));
    if (p.linkedin) contacts.push(esc(p.linkedin));
    if (p.website) contacts.push(esc(p.website));
    if (p.github) contacts.push(esc(p.github));
    
    if (contacts.length > 0) {
      html += `<div style="margin-top: 10px; font-size: 0.9em; color: #444;">${contacts.join(' | ')}</div>`;
    }
    html += `</div>`;

    function sectionHeader(title) {
      return `<h2 style="margin: ${spacing} 0 ${smallSpacing} 0; font-size: ${h2Size}; text-transform: uppercase; color: ${accent}; border-bottom: 1px solid #ccc; padding-bottom: 2px;">${esc(title)}</h2>`;
    }

    // Summary
    if (state.summary && state.summary.trim()) {
      html += sectionHeader('Professional Summary');
      html += `<div style="text-align: justify; margin-bottom: ${spacing};">${esc(state.summary)}</div>`;
    }

    // Experience
    if (state.experience && state.experience.length > 0) {
      const validExp = state.experience.filter(e => e.company || e.title);
      if (validExp.length > 0) {
        html += sectionHeader('Experience');
        validExp.forEach(exp => {
          html += `<div style="margin-bottom: ${smallSpacing};">`;
          html += `<div style="display: flex; justify-content: space-between; font-weight: bold;">`;
          html += `<span>${esc(exp.title || '')}${exp.title && exp.company ? ', ' : ''}${esc(exp.company || '')}</span>`;
          html += `<span>${esc(exp.startDate || '')} ${exp.startDate && exp.endDate ? '-' : ''} ${esc(exp.endDate || '')}</span>`;
          html += `</div>`;
          if (exp.description) {
            html += `<div style="margin-top: 4px; text-align: justify;">${esc(exp.description)}</div>`;
          }
          html += `</div>`;
        });
      }
    }

    // Education
    if (state.education && state.education.length > 0) {
      const validEdu = state.education.filter(e => e.school || e.degree);
      if (validEdu.length > 0) {
        html += sectionHeader('Education');
        validEdu.forEach(edu => {
          html += `<div style="margin-bottom: ${smallSpacing};">`;
          html += `<div style="display: flex; justify-content: space-between; font-weight: bold;">`;
          html += `<span>${esc(edu.school || '')}</span>`;
          html += `<span>${esc(edu.startDate || '')} ${edu.startDate && edu.endDate ? '-' : ''} ${esc(edu.endDate || '')}</span>`;
          html += `</div>`;
          html += `<div style="display: flex; justify-content: space-between; font-style: italic;">`;
          html += `<span>${esc(edu.degree || '')}</span>`;
          html += `<span>${edu.gpa ? 'GPA: ' + esc(edu.gpa) : ''}</span>`;
          html += `</div>`;
          if (edu.description) {
            html += `<div style="margin-top: 4px;">${esc(edu.description)}</div>`;
          }
          html += `</div>`;
        });
      }
    }

    // Skills
    if (state.skills && state.skills.length > 0) {
      const validSkills = state.skills.filter(s => s.trim());
      if (validSkills.length > 0) {
        html += sectionHeader('Skills');
        html += `<div style="margin-bottom: ${spacing};">${esc(validSkills.join(', '))}</div>`;
      }
    }

    // Projects
    if (state.projects && state.projects.length > 0) {
      const validProj = state.projects.filter(p => p.name);
      if (validProj.length > 0) {
        html += sectionHeader('Projects');
        validProj.forEach(proj => {
          html += `<div style="margin-bottom: ${smallSpacing};">`;
          html += `<div style="font-weight: bold;">`;
          html += `<span>${esc(proj.name)}</span>`;
          if (proj.link) html += ` <span style="font-weight: normal; font-size: 0.9em; color: #555;">(${esc(proj.link)})</span>`;
          html += `</div>`;
          if (proj.technologies) {
            html += `<div style="font-style: italic; font-size: 0.95em; color: #666; margin-top: 2px;">Technologies: ${esc(proj.technologies)}</div>`;
          }
          if (proj.description) {
            html += `<div style="margin-top: 4px; text-align: justify;">${esc(proj.description)}</div>`;
          }
          html += `</div>`;
        });
      }
    }

    html += `</div>`;
    return html;
  },

  renderPDF: function(pdf, state, settings) {
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - 2 * margin;
    let y = margin;

    function checkPage(needed) {
      if (y + needed > 277) {
        pdf.addPage();
        y = margin;
      }
    }

    // ASCII replacements
    function sanitize(str) {
      if (!str) return '';
      return String(str).replace(/—/g, '-').replace(/•/g, '*').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    }

    // Hex to RGB
    let r = 0, g = 0, b = 0;
    if (settings.accentColor) {
      const hex = settings.accentColor.replace('#', '');
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    }

    // Font family: use times for classic
    const font = 'times';

    let fontSizeNorm = 10;
    let fontSizeH1 = 22;
    let fontSizeH2 = 12;
    let lineSpacing = 5;
    
    if (settings.density === 'compact') {
      fontSizeNorm = 9;
      fontSizeH1 = 18;
      fontSizeH2 = 11;
      lineSpacing = 4;
    } else if (settings.density === 'spacious') {
      fontSizeNorm = 11;
      fontSizeH1 = 26;
      fontSizeH2 = 14;
      lineSpacing = 6;
    }

    // Header
    const p = state.personal || {};
    if (p.fullName) {
      pdf.setFont(font, 'bold');
      pdf.setFontSize(fontSizeH1);
      pdf.setTextColor(0, 0, 0);
      const nameTxt = sanitize(p.fullName);
      const nameW = pdf.getTextWidth(nameTxt);
      pdf.text(nameTxt, (pageWidth - nameW) / 2, y);
      y += lineSpacing + 2;
    }
    
    if (p.jobTitle) {
      pdf.setFont(font, 'normal');
      pdf.setFontSize(fontSizeNorm + 1);
      pdf.setTextColor(80, 80, 80);
      const titleTxt = sanitize(p.jobTitle);
      const titleW = pdf.getTextWidth(titleTxt);
      pdf.text(titleTxt, (pageWidth - titleW) / 2, y);
      y += lineSpacing;
    }
    
    // Contact Info
    const contacts = [];
    if (p.email) contacts.push(sanitize(p.email));
    if (p.phone) contacts.push(sanitize(p.phone));
    if (p.location) contacts.push(sanitize(p.location));
    if (p.linkedin) contacts.push(sanitize(p.linkedin));
    if (p.website) contacts.push(sanitize(p.website));
    if (p.github) contacts.push(sanitize(p.github));
    
    if (contacts.length > 0) {
      pdf.setFont(font, 'normal');
      pdf.setFontSize(fontSizeNorm - 1);
      pdf.setTextColor(50, 50, 50);
      const contactStr = contacts.join(' | ');
      const lines = pdf.splitTextToSize(contactStr, contentWidth);
      lines.forEach(l => {
        const lw = pdf.getTextWidth(l);
        pdf.text(l, (pageWidth - lw) / 2, y);
        y += lineSpacing - 1;
      });
      y += lineSpacing;
    } else {
      y += lineSpacing;
    }

    function renderSectionHeader(title) {
      checkPage(15);
      y += 2;
      pdf.setFont(font, 'bold');
      pdf.setFontSize(fontSizeH2);
      pdf.setTextColor(r, g, b);
      const upperTitle = sanitize(title).toUpperCase();
      pdf.text(upperTitle, margin, y);
      y += 2;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + contentWidth, y);
      y += lineSpacing;
    }

    // Summary
    if (state.summary && state.summary.trim()) {
      renderSectionHeader('Professional Summary');
      pdf.setFont(font, 'normal');
      pdf.setFontSize(fontSizeNorm);
      pdf.setTextColor(30, 30, 30);
      const lines = pdf.splitTextToSize(sanitize(state.summary), contentWidth);
      lines.forEach(line => {
        checkPage(lineSpacing);
        pdf.text(line, margin, y);
        y += lineSpacing;
      });
      y += 2;
    }

    // Experience
    if (state.experience && state.experience.length > 0) {
      const validExp = state.experience.filter(e => e.company || e.title);
      if (validExp.length > 0) {
        renderSectionHeader('Experience');
        validExp.forEach(exp => {
          checkPage(15);
          pdf.setFont(font, 'bold');
          pdf.setFontSize(fontSizeNorm);
          pdf.setTextColor(0, 0, 0);
          
          let titleComp = sanitize(exp.title || '');
          if (exp.title && exp.company) titleComp += ', ';
          titleComp += sanitize(exp.company || '');
          pdf.text(titleComp, margin, y);
          
          let dateStr = sanitize(exp.startDate || '');
          if (exp.startDate && exp.endDate) dateStr += ' - ';
          dateStr += sanitize(exp.endDate || '');
          
          if (dateStr) {
            const dw = pdf.getTextWidth(dateStr);
            pdf.text(dateStr, margin + contentWidth - dw, y);
          }
          y += lineSpacing;
          
          if (exp.description) {
            pdf.setFont(font, 'normal');
            pdf.setTextColor(30, 30, 30);
            const lines = pdf.splitTextToSize(sanitize(exp.description), contentWidth);
            lines.forEach(line => {
              checkPage(lineSpacing);
              pdf.text(line, margin, y);
              y += lineSpacing;
            });
          }
          y += 2;
        });
      }
    }

    // Education
    if (state.education && state.education.length > 0) {
      const validEdu = state.education.filter(e => e.school || e.degree);
      if (validEdu.length > 0) {
        renderSectionHeader('Education');
        validEdu.forEach(edu => {
          checkPage(15);
          pdf.setFont(font, 'bold');
          pdf.setFontSize(fontSizeNorm);
          pdf.setTextColor(0, 0, 0);
          
          pdf.text(sanitize(edu.school || ''), margin, y);
          
          let dateStr = sanitize(edu.startDate || '');
          if (edu.startDate && edu.endDate) dateStr += ' - ';
          dateStr += sanitize(edu.endDate || '');
          
          if (dateStr) {
            const dw = pdf.getTextWidth(dateStr);
            pdf.text(dateStr, margin + contentWidth - dw, y);
          }
          y += lineSpacing;
          
          if (edu.degree || edu.gpa) {
            pdf.setFont(font, 'italic');
            pdf.setTextColor(50, 50, 50);
            if (edu.degree) {
              pdf.text(sanitize(edu.degree), margin, y);
            }
            if (edu.gpa) {
              const gpaStr = 'GPA: ' + sanitize(edu.gpa);
              const gw = pdf.getTextWidth(gpaStr);
              pdf.text(gpaStr, margin + contentWidth - gw, y);
            }
            y += lineSpacing;
          }
          
          if (edu.description) {
            pdf.setFont(font, 'normal');
            pdf.setTextColor(30, 30, 30);
            const lines = pdf.splitTextToSize(sanitize(edu.description), contentWidth);
            lines.forEach(line => {
              checkPage(lineSpacing);
              pdf.text(line, margin, y);
              y += lineSpacing;
            });
          }
          y += 2;
        });
      }
    }

    // Skills
    if (state.skills && state.skills.length > 0) {
      const validSkills = state.skills.filter(s => s.trim());
      if (validSkills.length > 0) {
        renderSectionHeader('Skills');
        pdf.setFont(font, 'normal');
        pdf.setFontSize(fontSizeNorm);
        pdf.setTextColor(30, 30, 30);
        
        const lines = pdf.splitTextToSize(sanitize(validSkills.join(', ')), contentWidth);
        lines.forEach(line => {
          checkPage(lineSpacing);
          pdf.text(line, margin, y);
          y += lineSpacing;
        });
        y += 2;
      }
    }

    // Projects
    if (state.projects && state.projects.length > 0) {
      const validProj = state.projects.filter(p => p.name);
      if (validProj.length > 0) {
        renderSectionHeader('Projects');
        validProj.forEach(proj => {
          checkPage(15);
          pdf.setFont(font, 'bold');
          pdf.setFontSize(fontSizeNorm);
          pdf.setTextColor(0, 0, 0);
          
          pdf.text(sanitize(proj.name), margin, y);
          
          if (proj.link) {
            pdf.setFont(font, 'normal');
            pdf.setTextColor(100, 100, 100);
            const nmw = pdf.getTextWidth(sanitize(proj.name) + ' ');
            pdf.text('(' + sanitize(proj.link) + ')', margin + nmw, y);
          }
          y += lineSpacing;
          
          if (proj.technologies) {
            pdf.setFont(font, 'italic');
            pdf.setTextColor(60, 60, 60);
            pdf.text('Technologies: ' + sanitize(proj.technologies), margin, y);
            y += lineSpacing;
          }
          
          if (proj.description) {
            pdf.setFont(font, 'normal');
            pdf.setTextColor(30, 30, 30);
            const lines = pdf.splitTextToSize(sanitize(proj.description), contentWidth);
            lines.forEach(line => {
              checkPage(lineSpacing);
              pdf.text(line, margin, y);
              y += lineSpacing;
            });
          }
          y += 2;
        });
      }
    }
  }
};
