// Rotating text animation for the subtitle
const textRotate = document.querySelector('.text-rotate');
let currentIndex = 0;

function rotateText() {
    const spans = textRotate.querySelectorAll('span');
    spans.forEach(span => span.style.display = 'none');
    spans[currentIndex].style.display = 'inline-block';
    spans[currentIndex].style.opacity = '0';
    
    // Fade in
    let opacity = 0;
    const fadeIn = setInterval(() => {
        opacity += 0.1;
        spans[currentIndex].style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
    }, 50);

    // Prepare for next rotation
    currentIndex = (currentIndex + 1) % spans.length;
}

// Start rotation
setInterval(rotateText, 3000); // Rotate every 3 seconds
rotateText(); // Initial call

// Smooth scrolling with progress indication
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Highlight active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');

        // Smooth scroll
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Project cards animation on scroll
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

projectCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Skills animation
const skillItems = document.querySelectorAll('.skill-category li');
skillItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = 1;
        item.style.transform = 'translateX(0)';
    }, index * 100);
});

// Navbar background change on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Project hover effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Particle background
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-bg';
    document.querySelector('.hero').appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.hero').offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}
createParticleBackground();

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌙';
document.body.appendChild(darkModeToggle);

let isDarkMode = false;
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    
    // Update colors for dark mode
    if (isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', '#2d2d2d');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
        document.documentElement.style.setProperty('--text-color', '#333333');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }
});

// Skills data structure
const skillsData = {
    'Technical Skills': {
        'Programming & Data Analysis': [
            { name: 'Python (Pandas, NumPy, Scikit-learn)', level: 90 },
            { name: 'R Programming', level: 85 },
            { name: 'SQL & Database Management', level: 92 },
            { name: 'Machine Learning & Statistical Analysis', level: 88 },
            { name: 'Git Version Control', level: 85 }
        ],
        'Data Visualization & BI Tools': [
            { name: 'Tableau', level: 95 },
            { name: 'Power BI', level: 92 },
            { name: 'Advanced Excel & VBA', level: 90 },
            { name: 'Data Storytelling', level: 88 },
            { name: 'Dashboard Development', level: 92 }
        ],
        'Database & ETL': [
            { name: 'MySQL', level: 90 },
            { name: 'PostgreSQL', level: 85 },
            { name: 'ETL Processes', level: 88 },
            { name: 'Data Pipeline Development', level: 85 },
            { name: 'Data Warehousing', level: 82 }
        ],
        'Analytics & Statistical Tools': [
            { name: 'Predictive Modeling', level: 88 },
            { name: 'Time Series Analysis', level: 85 },
            { name: 'A/B Testing', level: 82 },
            { name: 'Regression Analysis', level: 88 },
            { name: 'Statistical Testing', level: 85 }
        ]
    },
    'Domain Expertise': [
        { name: 'Insurance Analytics', level: 92 },
        { name: 'Risk Assessment', level: 90 },
        { name: 'Financial Analysis', level: 88 },
        { name: 'Business Intelligence', level: 90 },
        { name: 'Process Optimization', level: 85 }
    ],
    'Soft Skills': {
        'Leadership & Communication': [
            { name: 'Project Management', level: 90 },
            { name: 'Team Leadership', level: 88 },
            { name: 'Stakeholder Communication', level: 92 },
            { name: 'Problem-Solving', level: 90 },
            { name: 'Strategic Thinking', level: 88 }
        ],
        'Business & Collaboration': [
            { name: 'Business Analysis', level: 90 },
            { name: 'Cross-functional Collaboration', level: 88 },
            { name: 'Requirements Gathering', level: 85 },
            { name: 'Process Improvement', level: 88 },
            { name: 'Change Management', level: 85 }
        ],
        'Personal Attributes': [
            { name: 'Analytical Thinking', level: 95 },
            { name: 'Attention to Detail', level: 92 },
            { name: 'Time Management', level: 88 },
            { name: 'Adaptability', level: 90 },
            { name: 'Continuous Learning', level: 92 }
        ]
    }
};

// Function to create skill elements
function createSkillElements() {
    console.log('Creating skill elements...');
    const skillsContainer = document.querySelector('.skills-container');
    
    if (!skillsContainer) {
        console.error('Skills container not found!');
        return;
    }
    
    console.log('Found skills container, clearing content...');
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    // Create elements for each category
    for (const [category, skills] of Object.entries(skillsData)) {
        console.log(`Creating category: ${category}`);
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        if (category === 'Technical Skills') {
            // Handle subcategories for Technical Skills
            for (const [subcategory, subcategorySkills] of Object.entries(skills)) {
                console.log(`Creating subcategory: ${subcategory}`);
                const subcategoryDiv = document.createElement('div');
                subcategoryDiv.className = 'skill-subcategory';
                
                const subcategoryTitle = document.createElement('h4');
                subcategoryTitle.textContent = subcategory;
                subcategoryDiv.appendChild(subcategoryTitle);
                
                const skillsList = createSkillsList(subcategorySkills);
                subcategoryDiv.appendChild(skillsList);
                categoryDiv.appendChild(subcategoryDiv);
            }
        } else {
            // Handle regular categories
            const skillsList = createSkillsList(skills);
            categoryDiv.appendChild(skillsList);
        }
        
        skillsContainer.appendChild(categoryDiv);
    }
    
    console.log('Skills elements created, initializing progress bars...');
    // Initialize progress bars after creating elements
    initializeProgressBars();
}

// Function to create skills list with enhanced animations
function createSkillsList(skills) {
    const ul = document.createElement('ul');
    
    skills.forEach((skill, index) => {
        const li = document.createElement('li');
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        
        // Add staggered animation delay
        li.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        li.style.transitionDelay = `${index * 0.1}s`;
        
        const skillName = document.createElement('span');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;
        
        const skillProgress = document.createElement('div');
        skillProgress.className = 'skill-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.setAttribute('data-level', skill.level);
        
        const progressNumber = document.createElement('span');
        progressNumber.className = 'progress-number';
        progressNumber.textContent = '0%';
        
        progressBar.appendChild(progress);
        skillProgress.appendChild(progressBar);
        skillProgress.appendChild(progressNumber);
        
        li.appendChild(skillName);
        li.appendChild(skillProgress);
        ul.appendChild(li);
        
        // Trigger animation after a brief delay
        setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 100);
    });
    
    return ul;
}

// Function to initialize progress bars with animation
function initializeProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const level = progress.getAttribute('data-level');
                const progressNumber = progress.parentElement.nextElementSibling;
                let currentProgress = 0;
                
                // Animate both the progress bar and number
                const interval = setInterval(() => {
                    if (currentProgress >= level) {
                        clearInterval(interval);
                    } else {
                        currentProgress++;
                        progress.style.width = `${currentProgress}%`;
                        progressNumber.textContent = `${currentProgress}%`;
                    }
                }, 15); // Faster animation speed
            }
        });
    }, { threshold: 0.2 }); // Trigger earlier
    
    document.querySelectorAll('.progress').forEach(progress => {
        observer.observe(progress);
    });
}

// Make sure the DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing skills...');
    createSkillElements();
});

// Also try to initialize when the window loads (backup)
window.addEventListener('load', () => {
    console.log('Window loaded, checking if skills need initialization...');
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer && skillsContainer.children.length === 0) {
        console.log('Skills container empty, initializing...');
        createSkillElements();
    }
});

// Add some CSS for the new features
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #6366f1, #a855f7);
        z-index: 1001;
        transition: width 0.2s ease;
    }

    .nav-links a.active {
        color: #6366f1;
        position: relative;
    }

    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #6366f1;
        animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
    }

    .project-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease;
    }

    .skill-category li {
        position: relative;
        padding-left: 20px;
    }

    .skill-category li::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: #6366f1;
    }

    .particle-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--card-bg);
        border: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }

    .dark-mode {
        background-color: var(--bg-color);
        color: var(--text-color);
    }

    .skill-progress {
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .progress-bar {
        flex-grow: 1;
        height: 4px;
        background: rgba(99, 102, 241, 0.2);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        background: #6366f1;
        transition: width 1s ease;
    }

    .progress-number {
        font-size: 0.8rem;
        color: #6366f1;
        min-width: 45px;
    }

    @media (max-width: 768px) {
        .dark-mode-toggle {
            bottom: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }
    }

    .text-rotate {
        display: inline-block;
        min-height: 1.5em;
    }
    
    .text-rotate span {
        display: none;
        transition: opacity 0.5s ease;
    }

    .skill-category {
        margin-bottom: 3rem;
    }

    .skill-subcategory {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: rgba(99, 102, 241, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(99, 102, 241, 0.1);
        transition: all 0.3s ease;
    }

    .skill-subcategory:hover {
        background: rgba(99, 102, 241, 0.05);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
    }

    .skill-subcategory h4 {
        color: #6366f1;
        margin-bottom: 1.2rem;
        font-size: 1.1rem;
        font-weight: 500;
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .skill-subcategory h4::before {
        content: '▹';
        color: #6366f1;
        font-size: 1.2rem;
    }

    .skill-category li {
        padding: 0.8rem 1rem;
        margin-bottom: 0.5rem;
        background: rgba(99, 102, 241, 0.02);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .skill-category li:hover {
        background: rgba(99, 102, 241, 0.08);
        transform: translateX(5px);
    }

    .skill-name {
        font-weight: 500;
        color: var(--text-color);
    }

    @media (max-width: 768px) {
        .skill-subcategory {
            padding: 1rem;
        }
        
        .skill-category li {
            padding: 0.6rem 0.8rem;
        }
    }
`;
document.head.appendChild(style);

// Initialize CSS variables
document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
document.documentElement.style.setProperty('--text-color', '#333333');
document.documentElement.style.setProperty('--card-bg', '#ffffff');

// Debug helper
function debug(message, element) {
    console.log(`Debug: ${message}`, element || '');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    debug('DOM fully loaded');

    // Hero section animation
    const heroSection = document.querySelector('.hero');
    const heroTitle = heroSection?.querySelector('h1');
    const subtitle = heroSection?.querySelector('.subtitle');

    debug('Hero elements:', { heroSection, heroTitle, subtitle });

    if (heroTitle) {
        const words = heroTitle.textContent.trim().split(' ');
        heroTitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        
        const wordElements = heroTitle.querySelectorAll('.word');
        wordElements.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(20px)';
            setTimeout(() => {
                word.style.transition = 'all 0.6s ease';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    if (subtitle) {
        const lines = subtitle.textContent.split('\n');
        subtitle.innerHTML = lines.map(line => 
            `<div class="subtitle-line">${line.trim()}</div>`
        ).join('');
        
        const subtitleLines = subtitle.querySelectorAll('.subtitle-line');
        subtitleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';
            setTimeout(() => {
                line.style.transition = 'all 0.6s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, (words?.length || 0) * 200 + index * 300);
        });
    }

    // Project cards
    const projectsSection = document.querySelector('#projects');
    const projectCards = projectsSection?.querySelectorAll('.project-card');
    
    debug('Projects elements:', { projectsSection, projectCards });

    if (projectCards?.length) {
        projectCards.forEach((card, index) => {
            // Add project number
            const numberElement = document.createElement('div');
            numberElement.className = 'project-number';
            numberElement.textContent = `0${index + 1}`;
            card.insertBefore(numberElement, card.firstChild);

            // Add animation on scroll
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });

        // Observe project cards
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transition = 'all 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        projectCards.forEach(card => observer.observe(card));
    }

    // Skills organization
    const skillsSection = document.querySelector('#skills');
    const skillsContainer = skillsSection?.querySelector('.skills-container');
    
    debug('Skills elements:', { skillsSection, skillsContainer });

    if (skillsContainer) {
        const skillCategories = {
            'Core Competencies': [
                'Data Analytics',
                'Financial Analysis',
                'Business Analysis',
                'Insurance Risk Analysis',
                'Strategic Decision Making'
            ],
            'Technical Skills': {
                'Data Analysis & Business Intelligence': [
                    'SQL',
                    'Python',
                    'R',
                    'Power BI',
                    'Tableau'
                ],
                'Database Management': [
                    'MySQL',
                    'PostgreSQL',
                    'Microsoft SQL Server'
                ],
                'Statistical Analysis & Data Processing': [
                    'Regression Analysis',
                    'Hypothesis Testing',
                    'Data Mining'
                ],
                'ETL & Data Transformation': [
                    'Talend',
                    'Alteryx',
                    'Data Warehousing',
                    'Data Cleaning'
                ],
                'Reporting & Visualization': [
                    'KPI Dashboards',
                    'Tableau Reports',
                    'Power BI',
                    'Excel (Pivot Tables, VLOOKUP, Macros)'
                ],
                'Project & Process Management': [
                    'Agile Methodology',
                    'Business Process Optimization'
                ]
            },
            'Domain Expertise': [
                'Insurance Operations',
                'Risk Assessment',
                'Financial Data Processing',
                'Compliance Reporting',
                'Process Optimization',
                'Data-Driven Decision Making'
            ]
        };

        // Clear existing content
        skillsContainer.innerHTML = '';

        // Create new categorized skills
        Object.entries(skillCategories).forEach(([category, skills]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'skill-category';
            
            if (category === 'Technical Skills') {
                categorySection.innerHTML = `
                    <h3>${category}</h3>
                    ${Object.entries(skills).map(([subCategory, subSkills]) => `
                        <div class="skill-subcategory">
                            <h4>${subCategory}</h4>
                            <ul>
                                ${subSkills.map(skill => `
                                    <li>
                                        <span class="skill-name">${skill}</span>
                                        <div class="skill-progress">
                                            <div class="progress-bar">
                                                <div class="progress" style="width: 0%"></div>
                                            </div>
                                            <span class="progress-number">0%</span>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                `;
            } else {
                categorySection.innerHTML = `
                    <h3>${category}</h3>
                    <ul>
                        ${Array.isArray(skills) ? skills.map(skill => `
                            <li>
                                <span class="skill-name">${skill}</span>
                                <div class="skill-progress">
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 0%"></div>
                                    </div>
                                    <span class="progress-number">0%</span>
                                </div>
                            </li>
                        `).join('') : ''}
                    </ul>
                `;
            }
            skillsContainer.appendChild(categorySection);
        });

        // Animate skills on scroll
        const skillItems = skillsContainer.querySelectorAll('li');
        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = Math.floor(Math.random() * 30) + 70; // 70-100%
                        const progressBar = entry.target.querySelector('.progress');
                        const progressNumber = entry.target.querySelector('.progress-number');
                        
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        
                        let currentProgress = 0;
                        const interval = setInterval(() => {
                            if (currentProgress >= progress) {
                                clearInterval(interval);
                            } else {
                                currentProgress++;
                                progressBar.style.width = `${currentProgress}%`;
                                progressNumber.textContent = `${currentProgress}%`;
                            }
                        }, 20);
                    }
                });
            },
            { threshold: 0.1 }
        );

        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            skillsObserver.observe(item);
        });
    }

    // Add Tableau visualization section
    function createTableauSection() {
        const tableauVizzes = [
            {
                title: "Global Superstore Sales Analysis",
                description: "Interactive dashboard analyzing global sales performance, profit margins, and regional distribution.",
                embedUrl: "https://public.tableau.com/views/GlobalSuperstoreSalesAnalysis_17097840784710/GlobalSuperstoreSalesDashboard",
                thumbnailUrl: "project1.jpg"
            },
            {
                title: "COVID-19 Impact Analysis",
                description: "Comprehensive visualization of COVID-19's impact on global health and economics.",
                embedUrl: "https://public.tableau.com/views/Covid-19ImpactAnalysis_17097841785880/Covid-19Dashboard",
                thumbnailUrl: "project2.jpg"
            }
        ];

        const vizSection = document.createElement('section');
        vizSection.id = 'tableau-viz';
        vizSection.innerHTML = `
            <h2>Data Visualizations</h2>
            <div class="viz-grid">
                ${tableauVizzes.map((viz, index) => `
                    <div class="viz-card" data-url="${viz.embedUrl}">
                        <div class="viz-number">0${index + 1}</div>
                        <h3>${viz.title}</h3>
                        <p>${viz.description}</p>
                        <div class="viz-placeholder">
                            <div class="viz-loading">
                                <div class="spinner"></div>
                                <span>Loading visualization...</span>
                            </div>
                            <div class="viz-container"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Insert after projects section
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.parentNode.insertBefore(vizSection, projectsSection.nextSibling);
        } else {
            document.body.appendChild(vizSection);
        }

        // Initialize Tableau visualizations
        function initTableauViz() {
            console.log('Initializing Tableau visualizations...');
            const vizzes = [
                {
                    elementId: 'viz1',
                    url: 'https://public.tableau.com/views/GlobalSuperstoreSalesAnalysis_17097840784710/GlobalSuperstoreSalesDashboard'
                },
                {
                    elementId: 'viz2',
                    url: 'https://public.tableau.com/views/Covid-19ImpactAnalysis_17097841785880/Covid-19Dashboard'
                }
            ];

            vizzes.forEach(viz => {
                const containerDiv = document.getElementById(viz.elementId);
                console.log(`Initializing visualization for ${viz.elementId}...`);
                
                if (containerDiv) {
                    const options = {
                        hideTabs: true,
                        hideToolbar: true,
                        width: '100%',
                        height: '600px',
                        onFirstInteractive: function() {
                            console.log(`Visualization ${viz.elementId} loaded successfully`);
                            const loadingDiv = containerDiv.closest('.viz-card').querySelector('.viz-loading');
                            if (loadingDiv) {
                                loadingDiv.style.display = 'none';
                            }
                            containerDiv.style.opacity = '1';
                        }
                    };

                    try {
                        new tableau.Viz(containerDiv, viz.url, options);
                    } catch (error) {
                        console.error(`Error loading visualization ${viz.elementId}:`, error);
                        containerDiv.innerHTML = `
                            <div style="text-align: center; padding: 20px; color: #666;">
                                <p>Unable to load visualization. Please try refreshing the page.</p>
                            </div>
                        `;
                    }
                } else {
                    console.error(`Container for ${viz.elementId} not found`);
                }
            });
        }

        // Wait for both DOM and Tableau API to be ready
        function loadTableau() {
            console.log('Loading Tableau API...');
            if (typeof tableau !== 'undefined') {
                console.log('Tableau API already loaded');
                initTableauViz();
            } else {
                console.log('Loading Tableau API script...');
                const script = document.createElement('script');
                script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js';
                script.onload = () => {
                    console.log('Tableau API loaded successfully');
                    initTableauViz();
                };
                script.onerror = (error) => {
                    console.error('Failed to load Tableau API:', error);
                };
                document.head.appendChild(script);
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', loadTableau);
    }

    // Add new styles for Tableau section
    style.textContent += `
        #tableau-viz {
            padding: 4rem 0;
            background: var(--bg-color);
        }

        #tableau-viz h2 {
            text-align: center;
            margin-bottom: 3rem;
            color: var(--text-color);
            font-size: 2.5rem;
        }

        .viz-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 0 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .viz-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .viz-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .viz-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #6366f1;
            opacity: 0.6;
            margin-bottom: 1rem;
        }

        .viz-card h3 {
            color: var(--text-color);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .viz-card p {
            color: var(--text-color);
            opacity: 0.8;
            margin-bottom: 2rem;
        }

        .viz-placeholder {
            position: relative;
            width: 100%;
            height: 600px;
            background: rgba(99, 102, 241, 0.05);
            border-radius: 8px;
            overflow: hidden;
        }

        .viz-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(99, 102, 241, 0.1);
            border-left-color: #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .viz-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .viz-grid {
                grid-template-columns: 1fr;
                padding: 0 1rem;
            }

            .viz-placeholder {
                height: 400px;
            }
        }
    `;

    // Initialize Tableau section
    createTableauSection();
});

// Add styles
const style = document.createElement('style');
style.textContent = `
    .hero h1 .word {
        display: inline-block;
    }

    .subtitle-line {
        margin-bottom: 0.5rem;
    }

    .project-number {
        font-size: 3rem;
        font-weight: bold;
        color: #6366f1;
        opacity: 0.6;
        margin-bottom: 1.5rem;
        font-family: 'Arial', sans-serif;
    }

    .project-card {
        position: relative;
        padding: 2.5rem;
        background: var(--card-bg, #ffffff);
        border-radius: 12px;
        margin-bottom: 3rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s ease;
    }

    .project-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .skill-category {
        margin-bottom: 3rem;
    }

    .skill-category h3 {
        color: #6366f1;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
        font-weight: 600;
    }

    .skill-category ul {
        list-style: none;
        padding: 0;
    }

    .skill-category li {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(99, 102, 241, 0.05);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .skill-category li:hover {
        background: rgba(99, 102, 241, 0.1);
    }

    .skill-name {
        flex: 1;
        font-weight: 500;
    }

    .skill-progress {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 200px;
    }

    .progress-bar {
        flex-grow: 1;
        height: 6px;
        background: rgba(99, 102, 241, 0.2);
        border-radius: 3px;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        background: #6366f1;
        border-radius: 3px;
        transition: width 1s ease;
    }

    .progress-number {
        min-width: 45px;
        font-size: 0.875rem;
        color: #6366f1;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .skill-category li {
            flex-direction: column;
            align-items: flex-start;
        }

        .skill-progress {
            width: 100%;
            margin-top: 0.5rem;
        }
    }
`;
document.head.appendChild(style);

// Text rotation animation
document.addEventListener('DOMContentLoaded', function() {
    const textRotate = document.querySelector('.text-rotate');
    if (!textRotate) return;

    const items = textRotate.querySelectorAll('.rotate-item');
    let currentIndex = 0;

    // Initially hide all items except the first one
    items.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    function rotateText() {
        // Remove active class from current item
        items[currentIndex].classList.remove('active');
        
        // Move to next item
        currentIndex = (currentIndex + 1) % items.length;
        
        // Add active class to next item
        items[currentIndex].classList.add('active');
    }

    // Start rotation
    setInterval(rotateText, 3000);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Initialize cookie consent
    if (typeof window.cookieconsent !== 'undefined') {
        window.cookieconsent.initialise({
            palette: {
                popup: {
                    background: "#6366f1"
                },
                button: {
                    background: "#fff",
                    text: "#6366f1"
                }
            },
            content: {
                message: "We use cookies to analyze website traffic and optimize your website experience.",
                dismiss: "Accept",
                link: "Learn more"
            }
        });
    }
}); 