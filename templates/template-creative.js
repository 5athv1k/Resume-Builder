window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};
window.RESUME_TEMPLATES['creative'] = {
  label: 'Creative',
  description: 'Bold, eye-catching layout for design/creative roles.',
  renderHTML: function(state, settings) {
    function esc(str) {
      if (!str) return '';
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(str));
      return d.innerHTML;
    }

    const { personal, summary, experience, education, skills, projects } = state || {};
    const accent = settings.accentColor || '#ff4757';
    
    const fonts = {
      'inter': "'Inter', sans-serif",
      'georgia': "'Georgia', serif",
      'roboto': "'Roboto Slab', serif"
    };
    const fontFamily = fonts[settings.fontFamily] || fonts['inter'];

    const spacing = {
      'compact': { padding: '15px', headerPad: '20px', gap: '10px', fontSize: '14px' },
      'normal': { padding: '25px', headerPad: '30px', gap: '15px', fontSize: '15px' },
      'spacious': { padding: '40px', headerPad: '40px', gap: '20px', fontSize: '16px' }
    };
    const s = spacing[settings.density] || spacing['normal'];

    let html = `<div class="resume-tpl-creative" style="font-family: ${fontFamily}; color: #333; line-height: 1.6; font-size: ${s.fontSize}; background: #fff; width: 100%; box-sizing: border-box;">`;

    const name = esc(personal.fullName);
    const title = esc(personal.jobTitle);
    
    html += `
      <header style="background-color: ${accent}; color: #fff; padding: ${s.headerPad} ${s.padding}; margin: 0; word-break: break-word;">
        <h1 style="margin: 0 0 5px 0; font-size: 2.5em; font-weight: 800; letter-spacing: -0.5px;">${name}</h1>
        ${title ? `<h2 style="margin: 0; font-size: 1.2em; font-weight: 400; opacity: 0.9;">${title}</h2>` : ''}
        
        <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 15px; font-size: 0.9em; opacity: 0.9;">
    `;

    const iconStyle = "width: 14px; height: 14px; margin-right: 4px; vertical-align: middle; fill: currentColor;";
    const emailIcon = `<svg style="${iconStyle}" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
    const phoneIcon = `<svg style="${iconStyle}" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
    const locationIcon = `<svg style="${iconStyle}" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
    const linkIcon = `<svg style="${iconStyle}" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`;

    if (personal.email) html += `<span style="display: flex; align-items: center;">${emailIcon} ${esc(personal.email)}</span>`;
    if (personal.phone) html += `<span style="display: flex; align-items: center;">${phoneIcon} ${esc(personal.phone)}</span>`;
    if (personal.location) html += `<span style="display: flex; align-items: center;">${locationIcon} ${esc(personal.location)}</span>`;
    if (personal.website) html += `<span style="display: flex; align-items: center;">${linkIcon} ${esc(personal.website)}</span>`;
    if (personal.linkedin) html += `<span style="display: flex; align-items: center;">${linkIcon} ${esc(personal.linkedin)}</span>`;
    if (personal.github) html += `<span style="display: flex; align-items: center;">${linkIcon} ${esc(personal.github)}</span>`;
    
    html += `
        </div>
      </header>
      <div style="padding: ${s.padding};">
    `;

    const renderSectionTitle = (title) => {
      return `<h3 style="margin: ${s.gap} 0 15px 0; padding-left: 10px; border-left: 4px solid ${accent}; font-size: 1.2em; text-transform: uppercase; letter-spacing: 1px; color: ${accent}; font-weight: 700;">${esc(title)}</h3>`;
    };

    if (summary) {
      html += renderSectionTitle('Summary');
      html += `<p style="margin: 0 0 ${s.gap} 0; white-space: pre-wrap;">${esc(summary)}</p>`;
    }

    if (experience && experience.length > 0) {
      const valid = experience.filter(e => e.company || e.title);
      if (valid.length > 0) {
        html += renderSectionTitle('Experience');
        valid.forEach(exp => {
          html += `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600;">
                <span style="font-size: 1.1em; color: #111;">${esc(exp.title)}${exp.title && exp.company ? ' | ' : ''}${esc(exp.company)}</span>
                <span style="font-size: 0.9em; color: #666; white-space: nowrap; margin-left: 10px;">${esc(exp.startDate)} - ${esc(exp.endDate)}</span>
              </div>
              ${exp.description ? `<p style="margin: 5px 0 0 0; white-space: pre-wrap;">${esc(exp.description)}</p>` : ''}
            </div>
          `;
        });
      }
    }

    if (education && education.length > 0) {
      const valid = education.filter(e => e.school || e.degree);
      if (valid.length > 0) {
        html += renderSectionTitle('Education');
        valid.forEach(ed => {
          html += `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600;">
                <span style="font-size: 1.1em; color: #111;">${esc(ed.school)}</span>
                <span style="font-size: 0.9em; color: #666; white-space: nowrap; margin-left: 10px;">${esc(ed.startDate)} - ${esc(ed.endDate)}</span>
              </div>
              <div style="font-weight: 500;">${esc(ed.degree)}${ed.gpa ? `, GPA: ${esc(ed.gpa)}` : ''}</div>
              ${ed.description ? `<p style="margin: 5px 0 0 0; white-space: pre-wrap;">${esc(ed.description)}</p>` : ''}
            </div>
          `;
        });
      }
    }

    if (skills && skills.length > 0) {
      const valid = skills.filter(s => s.trim());
      if (valid.length > 0) {
        html += renderSectionTitle('Skills');
        html += `<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: ${s.gap};">`;
        valid.forEach(skill => {
          html += `<span style="background-color: ${accent}; color: #fff; padding: 4px 10px; border-radius: 15px; font-size: 0.85em; font-weight: 600;">${esc(skill)}</span>`;
        });
        html += `</div>`;
      }
    }

    if (projects && projects.length > 0) {
      const valid = projects.filter(p => p.name);
      if (valid.length > 0) {
        html += renderSectionTitle('Projects');
        valid.forEach(proj => {
          html += `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600;">
                <span style="font-size: 1.1em; color: #111;">${esc(proj.name)}</span>
                ${proj.link ? `<a href="${esc(proj.link)}" style="font-size: 0.9em; color: ${accent}; text-decoration: none; margin-left: 10px;">Link</a>` : ''}
              </div>
              ${proj.description ? `<p style="margin: 5px 0 5px 0; white-space: pre-wrap;">${esc(proj.description)}</p>` : ''}
              ${proj.technologies ? `
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
                  ${proj.technologies.split(',').map(t => t.trim()).filter(t => t).map(t => 
                    `<span style="background-color: #f9f9f9; border: 1px solid ${accent}; color: ${accent}; padding: 2px 8px; border-radius: 10px; font-size: 0.75em; font-weight: 600;">${esc(t)}</span>`
                  ).join('')}
                </div>
              ` : ''}
            </div>
          `;
        });
      }
    }

    html += `</div></div>`;
    return html;
  },

  renderPDF: function(pdf, state, settings) {
    const { personal, summary, experience, education, skills, projects } = state || {};
    
    const hexToRgb = (hex) => {
      let c = hex.substring(1).split('');
      if(c.length === 3){
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x'+c.join('');
      return [(c>>16)&255, (c>>8)&255, c&255];
    };
    
    const accent = settings.accentColor || '#ff4757';
    const accentRgb = hexToRgb(accent);
    
    let fontName = 'helvetica';
    if (settings.fontFamily === 'georgia' || settings.fontFamily === 'roboto') fontName = 'times';
    
    const pageWidth = 210;
    const pageHeight = 297;
    let y = 0; 
    const leftMargin = 20;
    const rightMargin = 190;
    const contentWidth = 170;

    const checkPage = (heightNeeded) => {
      if (y + heightNeeded > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
    };

    const drawSectionTitle = (title) => {
      checkPage(15);
      y += 8;
      
      pdf.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
      pdf.rect(leftMargin, y - 4, 1.5, 6, 'F');
      
      pdf.setFont(fontName, 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2]);
      pdf.text(title.toUpperCase(), leftMargin + 4, y);
      
      y += 6;
      pdf.setTextColor(0, 0, 0); 
    };

    pdf.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
    pdf.rect(0, 0, pageWidth, 45, 'F');

    y = 15; 
    pdf.setTextColor(255, 255, 255);
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(26);
    pdf.text(personal.fullName || 'Name', leftMargin, y);
    
    if (personal.jobTitle) {
      y += 8;
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(14);
      pdf.text(personal.jobTitle, leftMargin, y);
    }

    y += 10;
    pdf.setFontSize(10);
    const contacts = [];
    if (personal.email) contacts.push(`Email: ${personal.email}`);
    if (personal.phone) contacts.push(`Phone: ${personal.phone}`);
    if (personal.location) contacts.push(`Loc: ${personal.location}`);
    if (personal.website) contacts.push(`Web: ${personal.website}`);
    if (personal.linkedin) contacts.push(`LinkedIn: ${personal.linkedin}`);
    if (personal.github) contacts.push(`GitHub: ${personal.github}`);
    
    let contactLine = '';
    contacts.forEach((c, i) => {
      const add = (i > 0 ? ' | ' : '') + c;
      if (pdf.getTextWidth(contactLine + add) > contentWidth) {
        pdf.text(contactLine, leftMargin, y);
        y += 5;
        contactLine = c;
      } else {
        contactLine += add;
      }
    });
    if (contactLine) {
      pdf.text(contactLine, leftMargin, y);
    }

    y = 45 + 10; 
    pdf.setTextColor(0, 0, 0); 

    if (summary) {
      drawSectionTitle('Summary');
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(10);
      const cleanSum = summary.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2022/g, '*');
      const lines = pdf.splitTextToSize(cleanSum, contentWidth);
      checkPage(lines.length * 5);
      pdf.text(lines, leftMargin, y);
      y += lines.length * 5 + 5;
    }

    if (experience && experience.length > 0) {
      const valid = experience.filter(e => e.company || e.title);
      if (valid.length > 0) {
        drawSectionTitle('Experience');
        valid.forEach(exp => {
          checkPage(15);
          pdf.setFont(fontName, 'bold');
          pdf.setFontSize(12);
          const header = `${exp.title || ''}${exp.title && exp.company ? ' | ' : ''}${exp.company || ''}`;
          pdf.text(header, leftMargin, y);
          
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const dates = `${exp.startDate || ''} - ${exp.endDate || ''}`;
          const dateWidth = pdf.getTextWidth(dates);
          pdf.setTextColor(100, 100, 100);
          pdf.text(dates, rightMargin - dateWidth, y);
          pdf.setTextColor(0, 0, 0);
          y += 5;
          
          if (exp.description) {
            pdf.setFontSize(10);
            const cleanDesc = exp.description.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2022/g, '*');
            const lines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(lines.length * 5);
            pdf.text(lines, leftMargin, y);
            y += lines.length * 5;
          }
          y += 5;
        });
      }
    }

    if (education && education.length > 0) {
      const valid = education.filter(e => e.school || e.degree);
      if (valid.length > 0) {
        drawSectionTitle('Education');
        valid.forEach(ed => {
          checkPage(15);
          pdf.setFont(fontName, 'bold');
          pdf.setFontSize(12);
          pdf.text(ed.school || '', leftMargin, y);
          
          pdf.setFont(fontName, 'normal');
          pdf.setFontSize(10);
          const dates = `${ed.startDate || ''} - ${ed.endDate || ''}`;
          const dateWidth = pdf.getTextWidth(dates);
          pdf.setTextColor(100, 100, 100);
          pdf.text(dates, rightMargin - dateWidth, y);
          pdf.setTextColor(0, 0, 0);
          y += 5;
          
          pdf.setFont(fontName, 'italic');
          pdf.text(`${ed.degree || ''}${ed.gpa ? `, GPA: ${ed.gpa}` : ''}`, leftMargin, y);
          y += 5;
          
          if (ed.description) {
            pdf.setFont(fontName, 'normal');
            const cleanDesc = ed.description.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2022/g, '*');
            const lines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(lines.length * 5);
            pdf.text(lines, leftMargin, y);
            y += lines.length * 5;
          }
          y += 3;
        });
      }
    }

    if (skills && skills.length > 0) {
      const valid = skills.filter(s => s.trim());
      if (valid.length > 0) {
        drawSectionTitle('Skills');
        checkPage(10);
        pdf.setFont(fontName, 'bold');
        pdf.setFontSize(10);
        
        let currentX = leftMargin;
        valid.forEach(skill => {
          const sText = ` ${skill} `;
          const textW = pdf.getTextWidth(sText);
          const boxW = textW + 2;
          
          if (currentX + boxW > rightMargin) {
            currentX = leftMargin;
            y += 8;
            checkPage(8);
          }
          
          pdf.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
          pdf.roundedRect(currentX, y - 4, boxW, 6, 1.5, 1.5, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.text(sText, currentX + 1, y);
          
          currentX += boxW + 4;
        });
        pdf.setTextColor(0, 0, 0);
        y += 8;
      }
    }

    if (projects && projects.length > 0) {
      const valid = projects.filter(p => p.name);
      if (valid.length > 0) {
        drawSectionTitle('Projects');
        valid.forEach(proj => {
          checkPage(15);
          pdf.setFont(fontName, 'bold');
          pdf.setFontSize(12);
          pdf.text(proj.name || '', leftMargin, y);
          
          if (proj.link) {
            pdf.setFont(fontName, 'normal');
            pdf.setFontSize(9);
            const linkText = 'Link: ' + proj.link;
            const linkW = pdf.getTextWidth(linkText);
            pdf.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2]);
            pdf.text(linkText, rightMargin - linkW, y);
            pdf.setTextColor(0, 0, 0);
          }
          y += 5;
          
          if (proj.description) {
            pdf.setFont(fontName, 'normal');
            pdf.setFontSize(10);
            const cleanDesc = proj.description.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2022/g, '*');
            const lines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(lines.length * 5);
            pdf.text(lines, leftMargin, y);
            y += lines.length * 5;
          }
          
          if (proj.technologies) {
            const techs = proj.technologies.split(',').map(t => t.trim()).filter(t => t);
            if (techs.length > 0) {
              y += 2;
              checkPage(8);
              pdf.setFont(fontName, 'bold');
              pdf.setFontSize(8);
              
              let currentX = leftMargin;
              techs.forEach(t => {
                const textW = pdf.getTextWidth(t);
                const boxW = textW + 4;
                
                if (currentX + boxW > rightMargin) {
                  currentX = leftMargin;
                  y += 6;
                  checkPage(6);
                }
                
                pdf.setDrawColor(accentRgb[0], accentRgb[1], accentRgb[2]);
                pdf.setFillColor(240, 240, 240);
                pdf.setLineWidth(0.3);
                pdf.roundedRect(currentX, y - 3, boxW, 4.5, 1, 1, 'FD');
                pdf.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2]);
                pdf.text(t, currentX + 2, y);
                
                currentX += boxW + 2;
              });
              pdf.setTextColor(0, 0, 0); 
              y += 5;
            }
          }
          y += 5;
        });
      }
    }
  }
};
