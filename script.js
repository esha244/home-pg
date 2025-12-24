// ===================================
// CENTRAL COLLEGE - INTERACTIVE FEATURES
// ===================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const navLinks = document.querySelectorAll('.nav-link');

// ===================================
// DARK MODE FUNCTIONALITY
// ===================================

// Check for saved dark mode preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon();
}

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('.dark-mode-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    if (navMenu.classList.contains('active')) {
        mobileMenuToggle.textContent = '✕';
    } else {
        mobileMenuToggle.textContent = '☰';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

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

// Observe all cards for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .department-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ===================================
// DEPARTMENT CARD INTERACTIONS
// ===================================

const departmentCards = document.querySelectorAll('.department-card');

departmentCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on a button
        if (e.target.classList.contains('btn')) {
            return;
        }
        
        const department = card.getAttribute('data-department');
        console.log(`Navigating to ${department} department page`);
        // In a real application, this would navigate to the department page
        // window.location.href = `department-${department}.html`;
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

// ===================================
// MOCK DATA FOR DASHBOARD
// ===================================

const mockData = {
    user: {
        name: 'John Doe',
        id: 'ST2024001',
        department: 'AI & Technology',
        enrolledCourses: 4,
        completedCourses: 12,
        gpa: 3.8
    },
    
    announcements: [
        {
            id: 1,
            department: 'Industrial',
            title: 'New CNC Machines Installed',
            content: 'The Industrial Technology department has received state-of-the-art CNC machines. Training sessions start next week.',
            timestamp: '2 hours ago',
            priority: 'normal'
        },
        {
            id: 2,
            department: 'AI & Tech',
            title: 'AI Workshop This Friday',
            content: 'Join us for a hands-on workshop on neural networks and deep learning. Limited seats available!',
            timestamp: '5 hours ago',
            priority: 'high'
        },
        {
            id: 3,
            department: 'Culinary',
            title: 'Guest Chef Masterclass',
            content: 'Renowned chef Maria Rodriguez will conduct a special masterclass on French cuisine techniques.',
            timestamp: '1 day ago',
            priority: 'normal'
        },
        {
            id: 4,
            department: 'Welding',
            title: 'Safety Certification Deadline',
            content: 'All welding students must complete their safety certification by the end of this month.',
            timestamp: '2 days ago',
            priority: 'urgent'
        }
    ],
    
    courses: [
        {
            id: 1,
            name: 'Advanced Manufacturing',
            department: 'Industrial Technology',
            instructor: 'Dr. James Wilson',
            duration: '12 weeks',
            level: 'Intermediate',
            enrolled: 45,
            description: 'Learn advanced manufacturing techniques and processes'
        },
        {
            id: 2,
            name: 'TIG Welding Certification',
            department: 'Welding Technology',
            instructor: 'Mike Thompson',
            duration: '8 weeks',
            level: 'Advanced',
            enrolled: 32,
            description: 'Professional TIG welding certification program'
        },
        {
            id: 3,
            name: 'Professional Pastry Arts',
            department: 'Culinary Arts',
            instructor: 'Chef Sarah Martinez',
            duration: '10 weeks',
            level: 'Beginner',
            enrolled: 58,
            description: 'Master the art of professional pastry making'
        },
        {
            id: 4,
            name: 'Machine Learning Fundamentals',
            department: 'AI & Technology',
            instructor: 'Dr. Emily Chen',
            duration: '14 weeks',
            level: 'Intermediate',
            enrolled: 67,
            description: 'Introduction to machine learning algorithms and applications'
        }
    ],
    
    studyGroups: [
        {
            id: 1,
            name: 'ML Study Group',
            course: 'Machine Learning Fundamentals',
            members: 8,
            nextMeeting: 'Tomorrow, 3:00 PM'
        },
        {
            id: 2,
            name: 'Welding Safety Team',
            course: 'TIG Welding Certification',
            members: 5,
            nextMeeting: 'Friday, 2:00 PM'
        },
        {
            id: 3,
            name: 'Pastry Practice Group',
            course: 'Professional Pastry Arts',
            members: 12,
            nextMeeting: 'Monday, 4:00 PM'
        }
    ]
};

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function searchContent(query) {
    const results = {
        courses: [],
        announcements: [],
        studyGroups: []
    };
    
    query = query.toLowerCase();
    
    // Search courses
    mockData.courses.forEach(course => {
        if (course.name.toLowerCase().includes(query) || 
            course.department.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query)) {
            results.courses.push(course);
        }
    });
    
    // Search announcements
    mockData.announcements.forEach(announcement => {
        if (announcement.title.toLowerCase().includes(query) || 
            announcement.content.toLowerCase().includes(query) ||
            announcement.department.toLowerCase().includes(query)) {
            results.announcements.push(announcement);
        }
    });
    
    // Search study groups
    mockData.studyGroups.forEach(group => {
        if (group.name.toLowerCase().includes(query) || 
            group.course.toLowerCase().includes(query)) {
            results.studyGroups.push(group);
        }
    });
    
    return results;
}

// ===================================
// FILTER FUNCTIONALITY
// ===================================

function filterByDepartment(items, department) {
    if (department === 'all') return items;
    return items.filter(item => item.department === department);
}

function filterByLevel(courses, level) {
    if (level === 'all') return courses;
    return courses.filter(course => course.level === level);
}

// ===================================
// ENROLLMENT TRACKING
// ===================================

const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

function enrollInCourse(courseId) {
    if (!enrolledCourses.includes(courseId)) {
        enrolledCourses.push(courseId);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        return true;
    }
    return false;
}

function unenrollFromCourse(courseId) {
    const index = enrolledCourses.indexOf(courseId);
    if (index > -1) {
        enrolledCourses.splice(index, 1);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        return true;
    }
    return false;
}

function isEnrolled(courseId) {
    return enrolledCourses.includes(courseId);
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                     type === 'error' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 
                     'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// BUTTON INTERACTIONS
// ===================================

// Add click handlers to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Enroll buttons
    document.querySelectorAll('.btn-outline').forEach(btn => {
        if (btn.textContent.includes('Enroll')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Course enrollment feature coming soon!', 'info');
            });
        }
    });
    
    // Dashboard buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Dashboard')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Dashboard feature coming soon!', 'info');
            });
        }
    });
    
    // Collaboration buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Collaboration feature coming soon!', 'info');
        });
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Calculate time ago
function timeAgo(timestamp) {
    // This would normally calculate actual time difference
    // For now, returning the mock timestamp
    return timestamp;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// EXPORT DATA (for other pages)
// ===================================

window.collegeData = {
    mockData,
    searchContent,
    filterByDepartment,
    filterByLevel,
    enrollInCourse,
    unenrollFromCourse,
    isEnrolled,
    showNotification
};

console.log('🎓 Central College website loaded successfully!');
console.log('💡 Dark mode:', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
