// Maine Coon Cats Data
const cats = [
    {
        id: 1,
        name: "Thor",
        age: "3 months",
        breed: "Maine Coon",
        category: "kitten",
        price: "$1,200",
        gender: "Male",
        color: "Brown Tabby",
        description: "Majestic male with impressive ear tufts and gentle personality",
        status: "available",
        image: "🦁"
    },
    {
        id: 2,
        name: "Luna",
        age: "4 months",
        breed: "Maine Coon",
        category: "kitten",
        price: "$1,500",
        gender: "Female",
        color: "Silver Tabby",
        description: "Beautiful silver female with stunning green eyes and fluffy coat",
        status: "available",
        image: "🐱"
    },
    {
        id: 3,
        name: "Simba",
        age: "2 years",
        breed: "Maine Coon",
        category: "adult",
        price: "$2,000",
        gender: "Male",
        color: "Red Tabby",
        description: "Champion bloodline adult male, excellent show quality",
        status: "available",
        image: "🦁"
    },
    {
        id: 4,
        name: "Nala",
        age: "1 year",
        breed: "Maine Coon",
        category: "adult",
        price: "$1,800",
        gender: "Female",
        color: "Tortoiseshell",
        description: "Sweet-natured female with unique tortoiseshell pattern",
        status: "reserved",
        image: "🐱"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    displayCats('all');
    setupEventListeners();
    updateSocialLinks();
});

// Display cats based on filter
function displayCats(filter) {
    const catsGrid = document.getElementById('catsGrid');
    let filteredCats = cats;
    
    if (filter === 'kitten') {
        filteredCats = cats.filter(cat => cat.category === 'kitten');
    } else if (filter === 'adult') {
        filteredCats = cats.filter(cat => cat.category === 'adult');
    } else if (filter === 'available') {
        filteredCats = cats.filter(cat => cat.status === 'available');
    }
    
    catsGrid.innerHTML = filteredCats.map(cat => `
        <div class="cat-card" data-category="${cat.category}" data-status="${cat.status}">
            <div class="cat-image">
                ${cat.image} ${cat.name}
            </div>
            <div class="cat-info">
                <h3>${cat.name}</h3>
                <div class="cat-price">${cat.price}</div>
                <p><strong>Age:</strong> ${cat.age}</p>
                <p><strong>Gender:</strong> ${cat.gender}</p>
                <p><strong>Color:</strong> ${cat.color}</p>
                <p>${cat.description}</p>
                <button class="adopt-btn" onclick="inquireAboutCat(${cat.id})" 
                    ${cat.status !== 'available' ? 'disabled style="background: #ccc;"' : ''}>
                    ${cat.status === 'available' ? 'Inquire About ' + cat.name : 'Reserved'}
                </button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            displayCats(filter);
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you for your message! We will contact you within 24 hours.', 'success');
        this.reset();
    });

    // Smooth scrolling for navigation links
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
}

// Inquire about cat function
function inquireAboutCat(catId) {
    const cat = cats.find(c => c.id === catId);
    if (cat) {
        if (cat.status === 'available') {
            const message = `I'm interested in ${cat.name}, the ${cat.color} ${cat.gender.toLowerCase()} ${cat.breed}. Please contact me with more information.`;
            showNotification(`Inquiry sent for ${cat.name}! We'll contact you soon.`, 'success');
            
            // Simulate sending inquiry
            console.log(`Inquiry for ${cat.name}: ${message}`);
        } else {
            showNotification(`${cat.name} is currently reserved. Would you like us to notify you if they become available?`, 'info');
        }
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update social media links with your actual URLs
function updateSocialLinks() {
    // Replace these with your actual social media URLs
    const socialLinks = document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="tiktok.com"]');
    socialLinks.forEach(link => {
        if (link.href.includes('facebook.com')) {
            link.href = 'https://facebook.com/YourAlinaMCCatteryPage';
        } else if (link.href.includes('instagram.com')) {
            link.href = 'https://instagram.com/alinamccattery';
        } else if (link.href.includes('tiktok.com')) {
            link.href = 'https://tiktok.com/@alinamccattery';
        }
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(1, 53, 55, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(1, 53, 55, 0.1)';
    }
});