window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};
window.RESUME_TEMPLATES['ats'] = {
  label: 'ATS Optimized',
  description: 'Maximum parsability for Applicant Tracking Systems',
  renderHTML: function(state, settings) {
    function esc(str) {
      if (!str) return '';
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(str));
      return d.innerHTML;
    }

    const p = state.personal || {};
    
    // HTML string
    let html = `
    <div class="resume-tpl-ats">
      <style>
        .resume-tpl-ats {
          font-family: 'Helvetica', 'Arial', sans-serif;
          color: #000;
          line-height: 1.4;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
        }
        .resume-tpl-ats-banner {
          background-color: #f0f0f0;
          color: #333;
          text-align: center;
          padding: 5px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 20px;
          border: 1px solid #ddd;
        }
        .resume-tpl-ats h1 {
          font-size: 24px;
          margin: 0 0 5px 0;
          font-weight: bold;
          text-transform: uppercase;
        }
        .resume-tpl-ats .job-title {
          font-size: 16px;
          font-weight: bold;
          margin: 0 0 10px 0;
        }
        .resume-tpl-ats .contact-info {
          font-size: 14px;
          margin-bottom: 20px;
        }
        .resume-tpl-ats .contact-info div {
          margin-bottom: 2px;
        }
        .resume-tpl-ats h2 {
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          margin: 20px 0 10px 0;
          padding-bottom: 2px;
        }
        .resume-tpl-ats .summary {
          font-size: 14px;
          margin-bottom: 15px;
        }
        .resume-tpl-ats .item {
          margin-bottom: 15px;
        }
        .resume-tpl-ats .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 14px;
        }
        .resume-tpl-ats .item-sub {
          font-size: 14px;
          font-style: italic;
          margin-bottom: 5px;
        }
        .resume-tpl-ats .item-desc {
          font-size: 14px;
          white-space: pre-wrap;
        }
        .resume-tpl-ats .skills-list {
          font-size: 14px;
        }
      </style>
      <div class="resume-tpl-ats-banner">ATS-Optimized Format</div>
      
      <div class="header">
        <h1>${esc(p.fullName)}</h1>
        ${p.jobTitle ? `<div class="job-title">${esc(p.jobTitle)}</div>` : ''}
        <div class="contact-info">
          ${p.email ? `<div>${esc(p.email)}</div>` : ''}
          ${p.phone ? `<div>${esc(p.phone)}</div>` : ''}
          ${p.location ? `<div>${esc(p.location)}</div>` : ''}
          ${p.linkedin ? `<div>${esc(p.linkedin)}</div>` : ''}
          ${p.website ? `<div>${esc(p.website)}</div>` : ''}
          ${p.github ? `<div>${esc(p.github)}</div>` : ''}
        </div>
      </div>
    `;

    if (state.summary) {
      html += `
        <h2>Professional Summary</h2>
        <div class="summary">${esc(state.summary)}</div>
      `;
    }

    if (state.experience && state.experience.length > 0) {
      let hasExp = false;
      let expHtml = '<h2>Experience</h2>';
      state.experience.forEach(exp => {
        if (exp.company || exp.title) {
          hasExp = true;
          const dateStr = [exp.startDate, exp.endDate].filter(Boolean).join(' - ');
          expHtml += `
            <div class="item">
              <div class="item-header">
                <span>${esc(exp.title)}</span>
                ${dateStr ? `<span>${esc(dateStr)}</span>` : ''}
              </div>
              <div class="item-sub">${esc(exp.company)}</div>
              ${exp.description ? `<div class="item-desc">${esc(exp.description)}</div>` : ''}
            </div>
          `;
        }
      });
      if (hasExp) html += expHtml;
    }

    if (state.education && state.education.length > 0) {
      let hasEdu = false;
      let eduHtml = '<h2>Education</h2>';
      state.education.forEach(edu => {
        if (edu.school || edu.degree) {
          hasEdu = true;
          const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' - ');
          eduHtml += `
            <div class="item">
              <div class="item-header">
                <span>${esc(edu.degree)}</span>
                ${dateStr ? `<span>${esc(dateStr)}</span>` : ''}
              </div>
              <div class="item-sub">${esc(edu.school)}${edu.gpa ? `, GPA: ${esc(edu.gpa)}` : ''}</div>
              ${edu.description ? `<div class="item-desc">${esc(edu.description)}</div>` : ''}
            </div>
          `;
        }
      });
      if (hasEdu) html += eduHtml;
    }

    if (state.projects && state.projects.length > 0) {
      let hasProj = false;
      let projHtml = '<h2>Projects</h2>';
      state.projects.forEach(proj => {
        if (proj.name) {
          hasProj = true;
          projHtml += `
            <div class="item">
              <div class="item-header">
                <span>${esc(proj.name)}</span>
                ${proj.link ? `<span>${esc(proj.link)}</span>` : ''}
              </div>
              ${proj.technologies ? `<div class="item-sub">Technologies: ${esc(proj.technologies)}</div>` : ''}
              ${proj.description ? `<div class="item-desc">${esc(proj.description)}</div>` : ''}
            </div>
          `;
        }
      });
      if (hasProj) html += projHtml;
    }

    if (state.skills && state.skills.length > 0) {
      const skillsStr = state.skills.filter(Boolean).map(s => esc(s)).join(', ');
      if (skillsStr) {
        html += `
          <h2>Skills</h2>
          <div class="skills-list">${skillsStr}</div>
        `;
      }
    }

    html += `</div>`;
    return html;
  },
  renderPDF: function(pdf, state, settings) {
    let y = 20;
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = 170;
    
    function checkPage(needed) {
      if (y + needed > 277) {
        pdf.addPage();
        y = 20;
      }
    }
    
    // Always black text
    pdf.setTextColor(0, 0, 0);

    const p = state.personal || {};
    
    // Name
    if (p.fullName) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      const nameLines = pdf.splitTextToSize(p.fullName, contentWidth);
      checkPage(nameLines.length * 9);
      pdf.text(nameLines, margin, y);
      y += nameLines.length * 9;
    }

    // Job Title
    if (p.jobTitle) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      const titleLines = pdf.splitTextToSize(p.jobTitle, contentWidth);
      checkPage(titleLines.length * 6);
      pdf.text(titleLines, margin, y);
      y += titleLines.length * 6 + 2;
    }
    
    // Contact Info
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const contacts = [];
    if (p.email) contacts.push(p.email);
    if (p.phone) contacts.push(p.phone);
    if (p.location) contacts.push(p.location);
    if (p.linkedin) contacts.push(p.linkedin);
    if (p.website) contacts.push(p.website);
    if (p.github) contacts.push(p.github);
    
    contacts.forEach(c => {
      const lines = pdf.splitTextToSize(c, contentWidth);
      checkPage(lines.length * 5);
      pdf.text(lines, margin, y);
      y += lines.length * 5;
    });
    
    if (contacts.length > 0) {
      y += 5;
    }

    function renderSectionHeader(title) {
      y += 5;
      checkPage(15);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(title.toUpperCase(), margin, y);
      y += 2;
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + contentWidth, y);
      y += 6;
    }

    // Summary
    if (state.summary) {
      renderSectionHeader('Professional Summary');
      
      const cleanSum = state.summary.replace(/[^\x00-\x7F]/g, '*');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(cleanSum, contentWidth);
      checkPage(lines.length * 5);
      pdf.text(lines, margin, y);
      y += lines.length * 5 + 5;
    }

    // Experience
    if (state.experience && state.experience.length > 0) {
      const validExp = state.experience.filter(e => e.company || e.title);
      if (validExp.length > 0) {
        renderSectionHeader('Experience');
        
        validExp.forEach(exp => {
          checkPage(15);
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          const dateStr = [exp.startDate, exp.endDate].filter(Boolean).join(' - ').replace(/[^\x00-\x7F]/g, '-');
          
          if (exp.title) {
            const cleanTitle = exp.title.replace(/[^\x00-\x7F]/g, '*');
            pdf.text(cleanTitle, margin, y);
          }
          
          if (dateStr) {
            const w = pdf.getTextWidth(dateStr);
            pdf.text(dateStr, margin + contentWidth - w, y);
          }
          
          y += 5;
          
          if (exp.company) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(11);
            const cleanComp = exp.company.replace(/[^\x00-\x7F]/g, '*');
            const compLines = pdf.splitTextToSize(cleanComp, contentWidth);
            checkPage(compLines.length * 5);
            pdf.text(compLines, margin, y);
            y += compLines.length * 5;
          }
          
          if (exp.description) {
            y += 2;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            const cleanDesc = exp.description.replace(/[^\x00-\x7F]/g, '*');
            const descLines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(descLines.length * 5);
            pdf.text(descLines, margin, y);
            y += descLines.length * 5;
          }
          
          y += 4;
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
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' - ').replace(/[^\x00-\x7F]/g, '-');
          
          if (edu.degree) {
            const cleanDeg = edu.degree.replace(/[^\x00-\x7F]/g, '*');
            pdf.text(cleanDeg, margin, y);
          }
          
          if (dateStr) {
            const w = pdf.getTextWidth(dateStr);
            pdf.text(dateStr, margin + contentWidth - w, y);
          }
          
          y += 5;
          
          if (edu.school || edu.gpa) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(11);
            let schoolStr = edu.school || '';
            if (edu.gpa) {
              schoolStr += (schoolStr ? ', GPA: ' : 'GPA: ') + edu.gpa;
            }
            schoolStr = schoolStr.replace(/[^\x00-\x7F]/g, '*');
            const schoolLines = pdf.splitTextToSize(schoolStr, contentWidth);
            checkPage(schoolLines.length * 5);
            pdf.text(schoolLines, margin, y);
            y += schoolLines.length * 5;
          }
          
          if (edu.description) {
            y += 2;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            const cleanDesc = edu.description.replace(/[^\x00-\x7F]/g, '*');
            const descLines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(descLines.length * 5);
            pdf.text(descLines, margin, y);
            y += descLines.length * 5;
          }
          
          y += 4;
        });
      }
    }
    
    // Projects
    if (state.projects && state.projects.length > 0) {
      const validProj = state.projects.filter(p => p.name);
      if (validProj.length > 0) {
        renderSectionHeader('Projects');
        
        validProj.forEach(proj => {
          checkPage(15);
          
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          
          if (proj.name) {
            const cleanName = proj.name.replace(/[^\x00-\x7F]/g, '*');
            pdf.text(cleanName, margin, y);
          }
          
          if (proj.link) {
            const cleanLink = proj.link.replace(/[^\x00-\x7F]/g, '*');
            pdf.setFont('helvetica', 'normal');
            const w = pdf.getTextWidth(cleanLink);
            pdf.text(cleanLink, margin + contentWidth - w, y);
          }
          
          y += 5;
          
          if (proj.technologies) {
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(11);
            const techStr = ('Technologies: ' + proj.technologies).replace(/[^\x00-\x7F]/g, '*');
            const techLines = pdf.splitTextToSize(techStr, contentWidth);
            checkPage(techLines.length * 5);
            pdf.text(techLines, margin, y);
            y += techLines.length * 5;
          }
          
          if (proj.description) {
            y += 2;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            const cleanDesc = proj.description.replace(/[^\x00-\x7F]/g, '*');
            const descLines = pdf.splitTextToSize(cleanDesc, contentWidth);
            checkPage(descLines.length * 5);
            pdf.text(descLines, margin, y);
            y += descLines.length * 5;
          }
          
          y += 4;
        });
      }
    }

    // Skills
    if (state.skills && state.skills.length > 0) {
      const skillsArr = state.skills.filter(Boolean);
      if (skillsArr.length > 0) {
        renderSectionHeader('Skills');
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        const skillsStr = skillsArr.join(', ').replace(/[^\x00-\x7F]/g, '*');
        const lines = pdf.splitTextToSize(skillsStr, contentWidth);
        checkPage(lines.length * 5);
        pdf.text(lines, margin, y);
        y += lines.length * 5;
      }
    }
  }
};
