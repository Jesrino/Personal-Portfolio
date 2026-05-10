// Tab functionality
function opentab(tabname) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Contact Form Functionality
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}`);
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon();
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Update icon
    updateThemeIcon();
});

// Update theme icon based on current mode
function updateThemeIcon() {
    const icon = themeToggleBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// =======================
// Project Slideshow Functions
// =======================

// Change slide in project card
function changeSlide(element, n) {
    const container = element.closest('.slideshow-container');
    const slides = container.querySelectorAll('.slide');
    let currentIndex = 0;
    
    // Find current slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
            slide.classList.remove('active');
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + n;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    
    // Show new slide
    slides[newIndex].classList.add('active');
}

// =======================
// Project Modal Functions
// =======================

// Project data for modal
const projectData = {
    portfolio: {
        title: "Personal Portfolio",
        description: "A responsive personal portfolio website built with HTML, CSS, and JavaScript to showcase skills and projects. Features include a modern dark/light theme toggle, smooth animations, and a clean professional design. The site is fully responsive and works on all devices.",
        images: ["images/background.png", "images/user.png"],
        demoUrl: "#"
    },
    todoapp: {
        title: "Todo App",
        description: "A simple task management application using React, allowing users to add, edit, and delete tasks. Features local storage for data persistence, a clean user interface, and intuitive task management. Perfect for organizing daily tasks and tracking productivity.",
        images: ["images/user.png", "images/logo.JPG"],
        demoUrl: "#"
    },
    converter: {
        title: "Multi Unit Converter",
        description: "A basic web-based converter application with standard arithmetic operations, built with HTML, CSS, and JavaScript. Supports multiple unit conversions including length, weight, temperature, and more. Features a user-friendly interface with instant results.",
        images: ["images/logo.JPG", "images/background.png"],
        demoUrl: "http://jesrino.github.io/MultiUnitConverter/"
    }
};

// Current modal slide index
let currentModalSlide = 0;

// Open modal
function openModal(projectKey) {
    const modal = document.getElementById('projectModal');
    const data = projectData[projectKey];
    
    if (data) {
        // Set modal content
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('modalDemoBtn').href = data.demoUrl;
        
        // Create modal slides
        const modalSlidesContainer = document.getElementById('modalSlides');
        modalSlidesContainer.innerHTML = '';
        
        data.images.forEach((imgSrc, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = index === 0 ? 'modal-slide active' : 'modal-slide';
            slideDiv.innerHTML = `<img src="${imgSrc}" alt="${data.title} Screenshot ${index + 1}">`;
            modalSlidesContainer.appendChild(slideDiv);
        });
        
        // Show modal
        modal.style.display = 'block';
        currentModalSlide = 0;
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Change slide in modal
function changeModalSlide(n) {
    const slides = document.querySelectorAll('.modal-slide');
    
    // Hide current slide
    slides[currentModalSlide].classList.remove('active');
    
    // Calculate new index
    currentModalSlide += n;
    if (currentModalSlide >= slides.length) currentModalSlide = 0;
    if (currentModalSlide < 0) currentModalSlide = slides.length - 1;
    
    // Show new slide
    slides[currentModalSlide].classList.add('active');
}

// Event listeners for Learn More buttons
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectKey = this.getAttribute('data-project');
            openModal(projectKey);
        });
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('projectModal');
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with close button
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
