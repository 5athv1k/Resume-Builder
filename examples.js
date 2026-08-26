/* ═══════════════════════════════════════════════════════════════
   Resume Made Easy — Example Resumes
   ═══════════════════════════════════════════════════════════════ */

window.RESUME_EXAMPLES = [
  {
    label: 'Software Engineer',
    icon: '💻',
    category: 'Tech',
    data: {
      personal: {
        fullName: 'Alex Chen',
        jobTitle: 'Senior Software Engineer',
        email: 'alex.chen@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexchen',
        website: 'alexchen.dev',
        github: 'github.com/alexchen',
      },
      summary: 'Senior Software Engineer with 6+ years of experience building scalable web applications and distributed systems. Proficient in JavaScript, Python, and Go, with deep expertise in React, Node.js, and cloud-native architectures on AWS. Passionate about clean code, developer experience, and mentoring junior engineers. Led a team of 4 engineers to deliver a real-time analytics platform serving 2M+ daily active users.',
      experience: [
        { id: 'ex1', title: 'Senior Software Engineer', company: 'Stripe', startDate: 'Jan 2022', endDate: 'Present', description: '* Architected and built a real-time fraud detection pipeline processing 50K transactions/second using Kafka and Go\n* Led migration from monolithic Rails app to microservices, reducing deployment time by 70%\n* Mentored 3 junior engineers through structured code reviews and pair programming sessions\n* Improved API response times by 40% through query optimization and Redis caching layer' },
        { id: 'ex2', title: 'Software Engineer', company: 'Airbnb', startDate: 'Jun 2019', endDate: 'Dec 2021', description: '* Built and maintained React components for the host dashboard used by 4M+ hosts globally\n* Developed an A/B testing framework that reduced experiment setup time from 2 days to 2 hours\n* Collaborated with design team to implement an accessible component library (WCAG 2.1 AA)' },
        { id: 'ex3', title: 'Junior Software Engineer', company: 'Twilio', startDate: 'Aug 2017', endDate: 'May 2019', description: '* Developed RESTful APIs in Node.js for the messaging platform serving 100K+ API calls/day\n* Built automated testing suite achieving 92% code coverage across 3 microservices' },
      ],
      education: [
        { id: 'ed1', school: 'University of California, Berkeley', degree: 'B.S. Computer Science', startDate: 'Aug 2013', endDate: 'May 2017', gpa: '3.8 / 4.0', description: "Dean's List, ACM Programming Contest Finalist" },
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL', 'CI/CD', 'System Design'],
      projects: [
        { id: 'pr1', name: 'DevMetrics', description: 'Open-source developer productivity dashboard that aggregates GitHub, Jira, and Slack data into actionable metrics. 2.5K GitHub stars.', technologies: 'React, Node.js, PostgreSQL, Docker', link: 'github.com/alexchen/devmetrics' },
        { id: 'pr2', name: 'CodeReview Bot', description: 'Slack bot that automates code review assignments based on expertise matching and workload balancing. Used by 15+ engineering teams.', technologies: 'Python, Slack API, Machine Learning', link: 'github.com/alexchen/cr-bot' },
      ],
    },
  },
  {
    label: 'Data Analyst',
    icon: '📊',
    category: 'Tech',
    data: {
      personal: {
        fullName: 'Priya Sharma',
        jobTitle: 'Data Analyst',
        email: 'priya.sharma@email.com',
        phone: '+1 (555) 345-6789',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/priyasharma',
        website: '',
        github: 'github.com/priyasharma',
      },
      summary: 'Detail-oriented Data Analyst with 4+ years of experience transforming complex datasets into actionable business insights. Skilled in SQL, Python, Tableau, and statistical modeling. Track record of driving data-informed decisions that improved revenue by 15% and reduced customer churn by 22%. Strong communicator who bridges the gap between technical analysis and business strategy.',
      experience: [
        { id: 'ex1', title: 'Senior Data Analyst', company: 'Spotify', startDate: 'Mar 2022', endDate: 'Present', description: '* Built predictive churn model using XGBoost that identified at-risk subscribers with 87% accuracy, enabling targeted retention campaigns\n* Designed and maintained 20+ Tableau dashboards tracking key business metrics for C-suite executives\n* Automated weekly reporting pipeline using Python and Airflow, saving 15 hours/week of manual work\n* Conducted A/B test analysis for pricing experiments affecting 5M+ users' },
        { id: 'ex2', title: 'Data Analyst', company: 'Deloitte', startDate: 'Jul 2019', endDate: 'Feb 2022', description: '* Analyzed customer transaction data for Fortune 500 retail clients, identifying $2.3M in cost-saving opportunities\n* Built ETL pipelines in Python to process and clean 10M+ records from disparate data sources\n* Created statistical models for demand forecasting with 94% accuracy' },
      ],
      education: [
        { id: 'ed1', school: 'Columbia University', degree: 'M.S. Applied Statistics', startDate: 'Sep 2017', endDate: 'May 2019', gpa: '3.9 / 4.0', description: '' },
        { id: 'ed2', school: 'University of Mumbai', degree: 'B.S. Mathematics', startDate: 'Aug 2013', endDate: 'Jun 2017', gpa: '', description: '' },
      ],
      skills: ['SQL', 'Python', 'R', 'Tableau', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Scikit-learn', 'Apache Airflow', 'Statistical Modeling', 'A/B Testing', 'Data Visualization'],
      projects: [
        { id: 'pr1', name: 'NYC Housing Price Predictor', description: 'Machine learning model predicting NYC apartment prices using 50+ features from public datasets. Achieved R-squared of 0.89.', technologies: 'Python, Scikit-learn, Pandas, Streamlit', link: 'github.com/priyasharma/nyc-housing' },
      ],
    },
  },
  {
    label: 'Marketing Manager',
    icon: '📣',
    category: 'Business',
    data: {
      personal: {
        fullName: 'Jordan Williams',
        jobTitle: 'Digital Marketing Manager',
        email: 'jordan.williams@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/jordanwilliams',
        website: 'jordanwilliams.marketing',
        github: '',
      },
      summary: 'Results-driven Digital Marketing Manager with 5+ years of experience leading cross-channel campaigns that drive brand awareness, lead generation, and revenue growth. Expert in SEO/SEM, content strategy, social media marketing, and marketing automation. Managed annual budgets of $2M+ and consistently delivered 3x+ ROAS across paid channels.',
      experience: [
        { id: 'ex1', title: 'Digital Marketing Manager', company: 'HubSpot', startDate: 'Apr 2021', endDate: 'Present', description: '* Lead a team of 5 marketers executing integrated campaigns across paid search, social, email, and content channels\n* Grew organic search traffic by 85% YoY through comprehensive SEO strategy and content optimization\n* Managed $2.4M annual paid media budget across Google Ads, LinkedIn, and Facebook with average ROAS of 4.2x\n* Launched ABM program targeting enterprise accounts, generating $3.5M in pipeline within first 6 months' },
        { id: 'ex2', title: 'Marketing Specialist', company: 'Mailchimp', startDate: 'Jun 2018', endDate: 'Mar 2021', description: '* Planned and executed email marketing campaigns reaching 500K+ subscribers with 28% average open rate\n* Created and optimized landing pages that improved conversion rates by 35%\n* Managed social media presence across 4 platforms, growing combined following by 120K+' },
      ],
      education: [
        { id: 'ed1', school: 'Northwestern University', degree: 'B.A. Marketing & Communications', startDate: 'Sep 2014', endDate: 'Jun 2018', gpa: '', description: 'Kellogg Marketing Society, Student Government VP' },
      ],
      skills: ['SEO/SEM', 'Google Ads', 'Facebook Ads', 'Content Strategy', 'Email Marketing', 'HubSpot', 'Marketo', 'Google Analytics', 'Salesforce', 'A/B Testing', 'Copywriting', 'Team Leadership'],
      projects: [
        { id: 'pr1', name: 'Product Launch Campaign - Enterprise Suite', description: 'Led the go-to-market strategy for a new enterprise product tier, coordinating across product, sales, and marketing teams. Campaign generated 1,200 qualified leads and $800K in first-quarter revenue.', technologies: 'HubSpot, Google Ads, LinkedIn Ads, Webinar Platform', link: '' },
      ],
    },
  },
  {
    label: 'UX Designer',
    icon: '🎨',
    category: 'Design',
    data: {
      personal: {
        fullName: 'Maya Rodriguez',
        jobTitle: 'Senior UX Designer',
        email: 'maya.rodriguez@email.com',
        phone: '+1 (555) 567-8901',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/mayarodriguez',
        website: 'mayarodriguez.design',
        github: '',
      },
      summary: 'Senior UX Designer with 5+ years crafting intuitive digital experiences for B2B SaaS products. Expert in user research, interaction design, design systems, and prototyping. Passionate about accessibility and inclusive design. Led the redesign of a core product workflow that increased user task completion by 40% and reduced support tickets by 60%.',
      experience: [
        { id: 'ex1', title: 'Senior UX Designer', company: 'Figma', startDate: 'Feb 2022', endDate: 'Present', description: '* Lead designer for the collaboration features team, shipping designs used by 4M+ users\n* Built and maintained a design system with 200+ components, improving design-to-dev handoff consistency by 50%\n* Conducted 60+ user interviews and usability tests to inform product strategy\n* Mentored 2 junior designers and established a design critique process for the team' },
        { id: 'ex2', title: 'UX Designer', company: 'Shopify', startDate: 'Aug 2019', endDate: 'Jan 2022', description: '* Redesigned the merchant onboarding flow, improving completion rate from 45% to 78%\n* Created wireframes, prototypes, and high-fidelity mockups for 3 major product launches\n* Established user research practice including persona development and journey mapping' },
        { id: 'ex3', title: 'UI/UX Designer', company: 'Agency Creative', startDate: 'Jun 2018', endDate: 'Jul 2019', description: '* Designed responsive web and mobile interfaces for 12+ client projects across fintech, healthcare, and e-commerce\n* Delivered pixel-perfect designs in Figma with interactive prototypes for stakeholder review' },
      ],
      education: [
        { id: 'ed1', school: 'Rhode Island School of Design', degree: 'B.F.A. Graphic Design', startDate: 'Sep 2014', endDate: 'May 2018', gpa: '', description: 'Concentration in Digital Interaction Design' },
      ],
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Wireframing', 'Information Architecture', 'Accessibility (WCAG)', 'HTML/CSS', 'Design Thinking'],
      projects: [
        { id: 'pr1', name: 'HealthTrack Mobile App', description: 'Designed a mobile health tracking app from concept to launch. Conducted user research with 30 participants, created user flows, wireframes, and high-fidelity prototypes. App received 4.8-star rating on App Store.', technologies: 'Figma, Principle, UserTesting.com', link: 'mayarodriguez.design/healthtrack' },
      ],
    },
  },
  {
    label: 'Project Manager',
    icon: '📋',
    category: 'Business',
    data: {
      personal: {
        fullName: 'David Kim',
        jobTitle: 'Senior Project Manager',
        email: 'david.kim@email.com',
        phone: '+1 (555) 678-9012',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/davidkim',
        website: '',
        github: '',
      },
      summary: 'PMP-certified Senior Project Manager with 7+ years leading cross-functional teams to deliver complex technology projects on time and within budget. Experienced in Agile, Scrum, and Waterfall methodologies. Managed portfolios valued at $10M+ and consistently achieved 95%+ on-time delivery rate. Strong stakeholder management and communication skills.',
      experience: [
        { id: 'ex1', title: 'Senior Project Manager', company: 'Amazon Web Services', startDate: 'May 2021', endDate: 'Present', description: '* Manage a portfolio of 5+ concurrent cloud infrastructure projects with combined budget of $12M\n* Lead cross-functional teams of 15-25 engineers, designers, and analysts across 3 time zones\n* Implemented risk management framework that reduced project delays by 35%\n* Drove adoption of Agile practices across the division, improving sprint velocity by 25%' },
        { id: 'ex2', title: 'Project Manager', company: 'Microsoft', startDate: 'Jan 2018', endDate: 'Apr 2021', description: '* Led the delivery of Azure platform features from planning through launch, coordinating with 4 engineering teams\n* Managed project budgets of $2-5M with consistent delivery under budget by 8-12%\n* Created and maintained project documentation including charters, status reports, and risk registers' },
        { id: 'ex3', title: 'Associate Project Manager', company: 'Accenture', startDate: 'Jul 2016', endDate: 'Dec 2017', description: '* Supported delivery of digital transformation projects for Fortune 500 clients in financial services\n* Tracked project milestones, managed stakeholder communication, and facilitated daily standups' },
      ],
      education: [
        { id: 'ed1', school: 'University of Washington', degree: 'M.B.A. Technology Management', startDate: 'Sep 2014', endDate: 'Jun 2016', gpa: '3.7 / 4.0', description: '' },
        { id: 'ed2', school: 'UCLA', degree: 'B.S. Business Administration', startDate: 'Sep 2010', endDate: 'Jun 2014', gpa: '', description: '' },
      ],
      skills: ['Project Management (PMP)', 'Agile/Scrum', 'Jira', 'Confluence', 'MS Project', 'Risk Management', 'Budget Management', 'Stakeholder Communication', 'Team Leadership', 'Strategic Planning', 'Vendor Management'],
      projects: [
        { id: 'pr1', name: 'Cloud Migration Program', description: 'Led a 12-month enterprise cloud migration program for a Fortune 100 financial services client, migrating 200+ applications to AWS. Delivered on schedule with zero critical incidents during cutover.', technologies: 'AWS, Jira, Confluence, Terraform', link: '' },
      ],
    },
  },
  {
    label: 'Recent Graduate',
    icon: '🎓',
    category: 'Entry Level',
    data: {
      personal: {
        fullName: 'Sarah Thompson',
        jobTitle: 'Computer Science Graduate',
        email: 'sarah.thompson@email.com',
        phone: '+1 (555) 789-0123',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/sarahthompson',
        website: 'sarahthompson.io',
        github: 'github.com/sarahthompson',
      },
      summary: 'Motivated Computer Science graduate from Boston University with strong foundations in full-stack development, data structures, and algorithms. Completed 2 software engineering internships and built multiple personal projects. Eager to contribute to a collaborative engineering team and grow as a developer.',
      experience: [
        { id: 'ex1', title: 'Software Engineering Intern', company: 'Datadog', startDate: 'Jun 2024', endDate: 'Aug 2024', description: '* Developed a log analysis feature in React and Go that reduced debugging time for users by 30%\n* Wrote unit and integration tests achieving 88% code coverage for the new feature\n* Participated in daily standups, sprint planning, and code reviews with the platform team' },
        { id: 'ex2', title: 'Web Development Intern', company: 'Local Startup', startDate: 'Jun 2023', endDate: 'Aug 2023', description: '* Built responsive landing pages and dashboard components using React and Tailwind CSS\n* Integrated REST APIs for user authentication and data fetching\n* Collaborated with the design team to implement UI/UX improvements based on user feedback' },
      ],
      education: [
        { id: 'ed1', school: 'Boston University', degree: 'B.S. Computer Science', startDate: 'Sep 2021', endDate: 'May 2025', gpa: '3.7 / 4.0', description: "Dean's List (6 semesters), Teaching Assistant for Data Structures, ACM Club Member" },
      ],
      skills: ['JavaScript', 'React', 'Python', 'Java', 'HTML/CSS', 'Node.js', 'SQL', 'Git', 'Data Structures', 'Algorithms', 'REST APIs', 'Agile'],
      projects: [
        { id: 'pr1', name: 'StudyBuddy - Collaborative Study Platform', description: 'Full-stack web app that matches students with study partners based on courses and schedules. Features real-time chat, calendar integration, and matching algorithm. 500+ student sign-ups at BU.', technologies: 'React, Node.js, Socket.io, MongoDB', link: 'github.com/sarahthompson/studybuddy' },
        { id: 'pr2', name: 'Weather Dashboard', description: 'Responsive weather application with 5-day forecasts, location search, and interactive maps. Fetches data from OpenWeatherMap API with client-side caching.', technologies: 'React, OpenWeatherMap API, Chart.js', link: 'github.com/sarahthompson/weather-app' },
      ],
    },
  },
];
