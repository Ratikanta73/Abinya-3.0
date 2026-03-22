// ========================================
// ABINYA 3.0 - JavaScript Functionality
// ========================================

// IMMEDIATE TEST - This should show projects are trying to render
console.log('🚀 script.js LOADED');
console.log('📍 Current URL:', window.location.href);

// Add visual indicator that script is loaded
setTimeout(() => {
    const grid = document.getElementById('projectsGrid');
    if (grid && grid.children.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; background: #fff; border-radius: 12px;"><h3 style="color: #e74c3c;">⚠️ Projects Not Rendering</h3><p>Check console (F12) for errors</p></div>';
    }
}, 2000);


const track = document.getElementById("companiesTrack");

function generateLogos() {
    for (let i = 1; i <= 42; i++) {
        const div = document.createElement("div");
        div.className = "company-logo";

        const img = document.createElement("img");
         img.src = `logos/C-logo/Logo (${i}).webp`;
        img.alt = `Company Logo ${i}`;

        div.appendChild(img);
        track.appendChild(div);
    }
}

// First set
generateLogos();

// Duplicate set for seamless infinite scroll
generateLogos();



// === PROJECT DATA ===
let projectsData = [];

// Fallback project data (used if JSON fetch fails)
// const fallbackProjects = [
//     {
//         id: 1,
//         title: "AI-Powered Health Diagnostics",
//         category: "ai",
//         team: "Team Alpha",
//         thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
//     },
//     {
//         id: 2,
//         title: "Smart Agriculture IoT Platform",
//         category: "iot",
//         team: "Team Agri-Tech",
//         thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
//     },
//     {
//         id: 3,
//         title: "Blockchain Supply Chain Tracker",
//         category: "blockchain",
//         team: "Team Chain",
//         thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
//     },
//     {
//         id: 4,
//         title: "Mental Health Support Chatbot",
//         category: "ai",
//         team: "Team Wellness",
//         thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
//     },
//     {
//         id: 5,
//         title: "E-Learning Adaptive Platform",
//         category: "web",
//         team: "Team EduTech",
//         thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop"
//     },
//     {
//         id: 6,
//         title: "Smart Traffic Management System",
//         category: "ai",
//         team: "Team Urban",
//         thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"
//     },
//     {
//         id: 7,
//         title: "Sustainable Energy Monitor",
//         category: "mobile",
//         team: "Team Green",
//         thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop"
//     },
//     {
//         id: 8,
//         title: "Crowdsourced Disaster Relief",
//         category: "web",
//         team: "Team Relief",
//         thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop"
//     }
// ];

// Load projects from JSON file
async function loadProjects() {
    console.log('🔄 Starting to load projects...');
    try {
        console.log('📡 Fetching projects.json...');
        const response = await fetch('projects.json');
        console.log('📡 Response received:', response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        projectsData = await response.json();
        console.log(`✅ Loaded ${projectsData.length} projects from JSON`);
        console.log('📊 First project:', projectsData[0]);

        // Check if projectsGrid exists
        const grid = document.getElementById('projectsGrid');
        console.log('📦 Projects grid element:', grid);

        // Render projects after loading
        console.log('🎨 Calling renderProjects...');
        renderProjects('all');
        console.log('✅ Projects rendered!');
    } catch (error) {
        console.error('❌ Error loading projects:', error);
        console.warn('⚠️ Using fallback project data');

        // Use fallback data
        projectsData = fallbackProjects;
        renderProjects('all');
    }
}

// === DOM ELEMENTS ===
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const projectsGrid = document.getElementById('projectsGrid');
const categoryPills = document.querySelectorAll('.pill');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const contactForm = document.getElementById('contactForm');

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ABINYA 3.0 Initializing...');
    console.log('📍 Current URL:', window.location.href);

    initTheme();
    initHeroVideo();
    initNavigation();
    console.log('✅ Navigation initialized');

    initScrollAnimations();
    console.log('✅ Scroll animations initialized');

    initProjectsFilter();
    console.log('✅ Projects filter initialized');

    initCounters();
    console.log('✅ Counters initialized');

    initGallery();
    console.log('✅ Gallery initialized');

    initContactForm();
    console.log('✅ Contact form initialized');

    loadProjects(); // Load projects from JSON
    console.log('✅ Started loading projects...');
});

// === NAVIGATION ===
function initNavigation() {
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Update active nav link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    const navRight = document.querySelector('.nav-right');
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        if (navRight) navRight.classList.toggle('active');
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu
                mobileToggle.classList.remove('active');
                if (navRight) navRight.classList.remove('active');
            }
        });
    });

    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.project-card, .stat-card, .gallery-item, .edition-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// === PROJECTS FILTER ===
function initProjectsFilter() {
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active pill
            categoryPills.forEach(p => p.classList.remove('pill-active'));
            pill.classList.add('pill-active');

            // Filter projects
            const category = pill.getAttribute('data-category');
            renderProjects(category);
        });
    });
}

function renderProjects(category) {
    console.log('🎨 renderProjects called with category:', category);

    if (!projectsGrid) {
        console.error('❌ projectsGrid element not found!');
        return;
    }

    console.log('📊 Total projects available:', projectsData.length);

    // Filter projects
    const filteredProjects = category === 'all'
        ? projectsData
        : projectsData.filter(project => project.category === category);

    console.log('🔍 Filtered projects:', filteredProjects.length);

    // Clear grid
    projectsGrid.innerHTML = '';

    // Render filtered projects
    filteredProjects.forEach((project, index) => {
        console.log(`  - Creating card for: ${project.title}`);
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);

        // Stagger animation
        setTimeout(() => {
            card.classList.add('reveal', 'active');
        }, index * 50);
    });

    console.log('✅ Rendered', filteredProjects.length, 'project cards');
}

function createProjectCard(project) {
    const card = document.createElement('a');
    card.href = `project.html?id=${project.id}`;
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-thumbnail">
            <img src="${project.thumbnail}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
        </div>
    `;

    return card;
}

// === ANIMATED COUNTERS ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    if (counters.length > 0) {
        counterObserver.observe(counters[0]);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}









// === GALLERY LIGHTBOX ===
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showMoreSection = document.getElementById('showMoreGallery');

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Show more button functionality
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
            hiddenItems.forEach(item => {
                item.classList.remove('hidden');
            });
            showMoreSection.style.display = 'none';

            // Re-initialize lightbox for newly shown images
            const allGalleryItems = document.querySelectorAll('.gallery-item img');
            allGalleryItems.forEach((img, index) => {
                img.removeEventListener('click', () => { });
                img.addEventListener('click', () => {
                    openLightbox(index);
                });
            });
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden) img');
            currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden) img');
            currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
            updateLightboxImage();
        });
    }
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden) img');
    const img = visibleItems[currentLightboxIndex];
    if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}


// Arrow key navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden) img');
        if (e.key === 'ArrowLeft') {
            currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
            updateLightboxImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});








// === CONTACT FORM VALIDATION ===
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
        });

        let isValid = true;

        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError(name, 'Please enter a valid name');
            isValid = false;
        }

        // Validate company
        const company = document.getElementById('company');
        if (company.value.trim().length < 2) {
            showError(company, 'Please enter your company or institution');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showError(message, 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#2CA58D';

            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    errorElement.textContent = message;
    input.style.borderColor = '#E74C3C';

    // Reset error on input
    input.addEventListener('input', () => {
        errorElement.textContent = '';
        input.style.borderColor = '';
    }, { once: true });
}

// === SMOOTH SCROLL FOR ALL ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === DUPLICATE COMPANIES FOR INFINITE SCROLL ===
const companiesTrack = document.querySelector('.companies-track');
if (companiesTrack) {
    const logos = companiesTrack.innerHTML;
    companiesTrack.innerHTML += logos;
}

// === PERFORMANCE: LAZY LOAD IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === TESTIMONIALS ===
function initTestimonials() {
    

    const track = document.getElementById('testimonialsTrack');
    if (!track) return;

    // Create testimonial cards
    testimonialsData.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        track.appendChild(card);
    });

    // Duplicate for seamless infinite scroll
    testimonialsData.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        track.appendChild(card);
    });
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';

    const initials = testimonial.name.split(' ').map(n => n[0]).join('');

    card.innerHTML = `
        <div class="testimonial-message">${testimonial.message}</div>
        <div class="testimonial-footer">
            <div class="testimonial-avatar">${initials}</div>
            <div class="testimonial-info">
                <div class="testimonial-name">${testimonial.name}</div>
                <div class="testimonial-role">${testimonial.role}</div>
                <div class="testimonial-company">${testimonial.company}</div>
            </div>
        </div>
    `;

    return card;
}

// === HERO VIDEO TOGGLE ===
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    const playBtn = document.getElementById('videoPlayBtn');
    const playIcon = playBtn?.querySelector('.play-icon');
    const pauseIcon = playBtn?.querySelector('.pause-icon');

    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Hide play button when video is playing (show on hover via CSS)
    video.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });
    video.addEventListener('pause', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
}
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('abinya-theme') || 'light';

    // Apply saved theme on load
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('abinya-theme', next);
        });
    }
}
console.log('🚀 ABINYA 3.0 Script Loaded');
console.log('📝 If projects don\'t load:');
console.log('  1. Make sure you\'re using a web server (not file://)');
console.log('  2. Check browser console (F12) for errors');
console.log('  3. Verify projects.json is in the same folder');
console.log('  4. Try: python -m http.server or Live Server extension');
