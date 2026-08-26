window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};
window.RESUME_TEMPLATES['minimal'] = {
  label: 'Minimal',
  description: 'Ultra-clean, typography-focused design with generous whitespace.',
  renderHTML: function(state, settings) {
    function esc(str) {
      if (!str) return '';
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(str));
      return d.innerHTML;
    }

    const { personal, summary, experience, education, skills, projects } = state;
    const accent = settings.accentColor || '#000000';
    let font = "'Inter', sans-serif";
    if (settings.fontFamily === 'georgia') font = "'Georgia', serif";
    else if (settings.fontFamily === 'roboto') font = "'Roboto Slab', serif";

    let baseSize = '14px';
    let spacing = '2rem';
    if (settings.density === 'compact') { baseSize = '12px'; spacing = '1.2rem'; }
    else if (settings.density === 'spacious') { baseSize = '16px'; spacing = '3rem'; }

    let html = `
    <div class="resume-tpl-minimal" style="font-family: ${font}; color: #333; font-size: ${baseSize}; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px; background: #fff;">
      <style>
        .resume-tpl-minimal-header { margin-bottom: ${spacing}; }
        .resume-tpl-minimal-name { font-size: 2.5em; font-weight: 700; margin: 0 0 0.2em 0; color: ${accent}; letter-spacing: -0.02em; }
        .resume-tpl-minimal-title { font-size: 1.2em; font-weight: 300; margin: 0 0 1em 0; color: #666; }
        .resume-tpl-minimal-contact { font-size: 0.9em; color: #888; display: flex; flex-wrap: wrap; gap: 15px; }
        .resume-tpl-minimal-section { margin-bottom: ${spacing}; }
        .resume-tpl-minimal-section-title { font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 1.5em 0; color: ${accent}; font-weight: 600; }
        .resume-tpl-minimal-item { margin-bottom: 1.5em; }
        .resume-tpl-minimal-item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.3em; }
        .resume-tpl-minimal-item-title { font-weight: 600; font-size: 1.1em; margin: 0; color: #111; }
        .resume-tpl-minimal-item-subtitle { font-weight: 400; font-style: italic; color: #555; }
        .resume-tpl-minimal-item-date { font-size: 0.9em; color: #888; }
        .resume-tpl-minimal-desc { margin: 0.5em 0 0 0; color: #444; }
        .resume-tpl-minimal p { margin: 0 0 0.5em 0; }
      </style>
      
      <div class="resume-tpl-minimal-header">
        <h1 class="resume-tpl-minimal-name">${esc(personal.fullName)}</h1>
        ${personal.jobTitle ? `<div class="resume-tpl-minimal-title">${esc(personal.jobTitle)}</div>` : ''}
        <div class="resume-tpl-minimal-contact">
          ${personal.email ? `<span>${esc(personal.email)}</span>` : ''}
          ${personal.phone ? `<span>${esc(personal.phone)}</span>` : ''}
          ${personal.location ? `<span>${esc(personal.location)}</span>` : ''}
          ${personal.linkedin ? `<span>${esc(personal.linkedin)}</span>` : ''}
          ${personal.website ? `<span>${esc(personal.website)}</span>` : ''}
        </div>
      </div>
    `;

    if (summary) {
      html += `
      <div class="resume-tpl-minimal-section">
        <h2 class="resume-tpl-minimal-section-title">Summary</h2>
        <div class="resume-tpl-minimal-desc">${esc(summary)}</div>
      </div>
      `;
    }

    if (experience && experience.length > 0) {
      html += `<div class="resume-tpl-minimal-section">
        <h2 class="resume-tpl-minimal-section-title">Experience</h2>`;
      experience.forEach(exp => {
        if (!exp.company && !exp.title) return;
        html += `
        <div class="resume-tpl-minimal-item">
          <div class="resume-tpl-minimal-item-header">
            <div>
              <span class="resume-tpl-minimal-item-title">${esc(exp.title)}</span>
              ${exp.company ? `<span class="resume-tpl-minimal-item-subtitle">, ${esc(exp.company)}</span>` : ''}
            </div>
            <div class="resume-tpl-minimal-item-date">${esc(exp.startDate)} ${exp.startDate && exp.endDate ? '-' : ''} ${esc(exp.endDate)}</div>
          </div>
          ${exp.description ? `<div class="resume-tpl-minimal-desc">${esc(exp.description)}</div>` : ''}
        </div>`;
      });
      html += `</div>`;
    }

    if (education && education.length > 0) {
      html += `<div class="resume-tpl-minimal-section">
        <h2 class="resume-tpl-minimal-section-title">Education</h2>`;
      education.forEach(edu => {
        if (!edu.school && !edu.degree) return;
        html += `
        <div class="resume-tpl-minimal-item">
          <div class="resume-tpl-minimal-item-header">
            <div>
              <span class="resume-tpl-minimal-item-title">${esc(edu.degree)}</span>
              ${edu.school ? `<span class="resume-tpl-minimal-item-subtitle">, ${esc(edu.school)}</span>` : ''}
            </div>
            <div class="resume-tpl-minimal-item-date">${esc(edu.startDate)} ${edu.startDate && edu.endDate ? '-' : ''} ${esc(edu.endDate)}</div>
          </div>
          ${edu.description ? `<div class="resume-tpl-minimal-desc">${esc(edu.description)}</div>` : ''}
        </div>`;
      });
      html += `</div>`;
    }

    if (projects && projects.length > 0) {
      html += `<div class="resume-tpl-minimal-section">
        <h2 class="resume-tpl-minimal-section-title">Projects</h2>`;
      projects.forEach(proj => {
        if (!proj.name) return;
        html += `
        <div class="resume-tpl-minimal-item">
          <div class="resume-tpl-minimal-item-header">
            <div class="resume-tpl-minimal-item-title">${esc(proj.name)}</div>
          </div>
          ${proj.description ? `<div class="resume-tpl-minimal-desc">${esc(proj.description)}</div>` : ''}
          ${proj.technologies ? `<div class="resume-tpl-minimal-desc" style="font-size: 0.9em; color: #666; margin-top: 0.3em;">Tech: ${esc(proj.technologies)}</div>` : ''}
        </div>`;
      });
      html += `</div>`;
    }

    if (skills && skills.length > 0) {
      html += `
      <div class="resume-tpl-minimal-section">
        <h2 class="resume-tpl-minimal-section-title">Skills</h2>
        <div class="resume-tpl-minimal-desc">${esc(skills.join(', '))}</div>
      </div>
      `;
    }

    html += `</div>`;
    return html;
  },

  renderPDF: function(pdf, state, settings) {
    const margin = 25;
    const contentWidth = 210 - (margin * 2);
    let y = 25;
    
    let baseFontSize = 10;
    let lineHeight = 5;
    let sectionSpacing = 12;
    let itemSpacing = 8;
    
    if (settings.density === 'compact') {
      baseFontSize = 9;
      lineHeight = 4.5;
      sectionSpacing = 8;
      itemSpacing = 5;
    } else if (settings.density === 'spacious') {
      baseFontSize = 11;
      lineHeight = 6;
      sectionSpacing = 16;
      itemSpacing = 10;
    }

    const { personal, summary, experience, education, skills, projects } = state;
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    }
    const accentRgb = hexToRgb(settings.accentColor);

    function checkPage(neededHeight) {
      if (y + neededHeight > 297 - margin) {
        pdf.addPage();
        y = margin;
      }
    }

    function cleanText(str) {
      if (!str) return '';
      return str.toString()
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, "-")
        .replace(/[\u2026]/g, "...")
        .replace(/[\u2022]/g, "*")
        .replace(/[^\x00-\x7F]/g, "");
    }

    function drawMultiLineText(text, x, width, fontSize, fontStyle, r=0, g=0, b=0) {
      if (!text) return;
      const clean = cleanText(text);
      pdf.setFont('helvetica', fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(r, g, b);
      const lines = pdf.splitTextToSize(clean, width);
      checkPage(lines.length * lineHeight);
      pdf.text(lines, x, y);
      y += lines.length * lineHeight;
    }
    
    function drawSectionTitle(title) {
      checkPage(15);
      y += 2;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(baseFontSize - 1);
      pdf.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
      pdf.text(title.toUpperCase(), margin, y);
      y += 8;
    }

    if (personal.fullName) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
      const nameLines = pdf.splitTextToSize(cleanText(personal.fullName), contentWidth);
      pdf.text(nameLines, margin, y);
      y += nameLines.length * 9;
    }

    if (personal.jobTitle) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text(cleanText(personal.jobTitle), margin, y);
      y += 8;
    }

    let contactInfo = [];
    if (personal.email) contactInfo.push(cleanText(personal.email));
    if (personal.phone) contactInfo.push(cleanText(personal.phone));
    if (personal.location) contactInfo.push(cleanText(personal.location));
    if (personal.linkedin) contactInfo.push(cleanText(personal.linkedin));
    if (personal.website) contactInfo.push(cleanText(personal.website));
    
    if (contactInfo.length > 0) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(baseFontSize - 1);
      pdf.setTextColor(130, 130, 130);
      const contactText = contactInfo.join('  |  ');
      const lines = pdf.splitTextToSize(contactText, contentWidth);
      pdf.text(lines, margin, y);
      y += lines.length * lineHeight + sectionSpacing - 4;
    } else {
      y += sectionSpacing - 4;
    }

    if (summary) {
      drawSectionTitle('Summary');
      drawMultiLineText(summary, margin, contentWidth, baseFontSize, 'normal', 50, 50, 50);
      y += sectionSpacing - lineHeight;
    }

    if (experience && experience.length > 0) {
      const validExp = experience.filter(e => e.company || e.title);
      if (validExp.length > 0) {
        drawSectionTitle('Experience');
        
        validExp.forEach(exp => {
          checkPage(10);
          
          pdf.setFontSize(baseFontSize + 1);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(20, 20, 20);
          const title = cleanText(exp.title || '');
          pdf.text(title, margin, y);
          
          let rightText = [];
          if (exp.startDate || exp.endDate) {
            const sd = exp.startDate ? cleanText(exp.startDate) : '';
            const ed = exp.endDate ? cleanText(exp.endDate) : '';
            const sep = (sd && ed) ? ' - ' : '';
            rightText.push(`${sd}${sep}${ed}`);
          }
          
          if (rightText.length > 0) {
             const rightStr = rightText.join('');
             pdf.setFont('helvetica', 'normal');
             pdf.setFontSize(baseFontSize - 1);
             pdf.setTextColor(130, 130, 130);
             const w = pdf.getTextWidth(rightStr);
             pdf.text(rightStr, 210 - margin - w, y);
          }
          y += 5;
          
          if (exp.company) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(baseFontSize);
            pdf.setTextColor(80, 80, 80);
            pdf.text(cleanText(exp.company), margin, y);
            y += 5;
          } else {
            y += 1;
          }
          
          if (exp.description) {
            y += 1;
            drawMultiLineText(exp.description, margin, contentWidth, baseFontSize, 'normal', 60, 60, 60);
          }
          y += itemSpacing - lineHeight;
        });
        y += sectionSpacing - itemSpacing;
      }
    }

    if (education && education.length > 0) {
      const validEdu = education.filter(e => e.school || e.degree);
      if (validEdu.length > 0) {
        drawSectionTitle('Education');
        
        validEdu.forEach(edu => {
          checkPage(10);
          pdf.setFontSize(baseFontSize + 1);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(20, 20, 20);
          const degree = cleanText(edu.degree || '');
          pdf.text(degree, margin, y);
          
          let rightText = [];
          if (edu.startDate || edu.endDate) {
            const sd = edu.startDate ? cleanText(edu.startDate) : '';
            const ed = edu.endDate ? cleanText(edu.endDate) : '';
            const sep = (sd && ed) ? ' - ' : '';
            rightText.push(`${sd}${sep}${ed}`);
          }
          
          if (rightText.length > 0) {
             const rightStr = rightText.join('');
             pdf.setFont('helvetica', 'normal');
             pdf.setFontSize(baseFontSize - 1);
             pdf.setTextColor(130, 130, 130);
             const w = pdf.getTextWidth(rightStr);
             pdf.text(rightStr, 210 - margin - w, y);
          }
          y += 5;

          if (edu.school) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(baseFontSize);
            pdf.setTextColor(80, 80, 80);
            pdf.text(cleanText(edu.school), margin, y);
            y += 5;
          } else {
            y += 1;
          }

          if (edu.description) {
            y += 1;
            drawMultiLineText(edu.description, margin, contentWidth, baseFontSize, 'normal', 60, 60, 60);
          }
          y += itemSpacing - lineHeight;
        });
        y += sectionSpacing - itemSpacing;
      }
    }

    if (projects && projects.length > 0) {
      const validProj = projects.filter(p => p.name);
      if (validProj.length > 0) {
        drawSectionTitle('Projects');
        
        validProj.forEach(proj => {
          checkPage(10);
          pdf.setFontSize(baseFontSize + 1);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(20, 20, 20);
          pdf.text(cleanText(proj.name), margin, y);
          y += 5;
          
          if (proj.description) {
            drawMultiLineText(proj.description, margin, contentWidth, baseFontSize, 'normal', 60, 60, 60);
          }
          if (proj.technologies) {
            drawMultiLineText('Tech: ' + proj.technologies, margin, contentWidth, baseFontSize - 1, 'italic', 100, 100, 100);
          }
          y += itemSpacing - lineHeight;
        });
        y += sectionSpacing - itemSpacing;
      }
    }

    if (skills && skills.length > 0) {
      drawSectionTitle('Skills');
      const skillsText = cleanText(skills.join(', '));
      drawMultiLineText(skillsText, margin, contentWidth, baseFontSize, 'normal', 50, 50, 50);
    }
  }
};
