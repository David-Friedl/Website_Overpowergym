// Mobile Menu Toggle
let isMobileMenuOpen = false;

function toggleMobileMenu() {
	const mobileMenu = document.getElementById('mobile-menu');
	const menuIcon = document.getElementById('menu-icon');
	
	isMobileMenuOpen = !isMobileMenuOpen;
	
	if (isMobileMenuOpen) {
		mobileMenu.style.display = 'block';
		menuIcon.className = 'fas fa-times';
	} else {
		mobileMenu.style.display = 'none';
		menuIcon.className = 'fas fa-bars';
	}
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
	const element = document.getElementById(sectionId);
	if (element) {
		// Close mobile menu if open
		if (isMobileMenuOpen) {
			toggleMobileMenu();
		}
		
		// Calculate offset for sticky header
		const headerHeight = document.getElementById('header').offsetHeight;
		const elementPosition = element.offsetTop - headerHeight;
		
		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth'
		});
	}
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
	const mobileMenu = document.getElementById('mobile-menu');
	const menuBtn = document.querySelector('.mobile-menu-btn');
	
	if (isMobileMenuOpen && 
		!mobileMenu.contains(event.target) && 
		!menuBtn.contains(event.target)) {
		toggleMobileMenu();
	}
});

// Header scroll effect
window.addEventListener('scroll', function() {
	const header = document.getElementById('header');
	if (window.scrollY > 50) {
		header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
		header.style.backdropFilter = 'blur(10px)';
	} else {
		header.style.backgroundColor = 'white';
		header.style.backdropFilter = 'none';
	}
});

// Animate elements on scroll
function animateOnScroll() {
	const elements = document.querySelectorAll('.benefit-item, .offer-card');
	
	elements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const elementVisible = 150;
		
		if (elementTop < window.innerHeight - elementVisible) {
			element.style.opacity = '1';
			element.style.transform = 'translateY(0)';
		}
	});
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
	// Set initial state for animated elements
	const elements = document.querySelectorAll('.benefit-item, .offer-card');
	elements.forEach(element => {
		element.style.opacity = '0';
		element.style.transform = 'translateY(30px)';
		element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	});
	
	// Animate on scroll
	window.addEventListener('scroll', animateOnScroll);
	animateOnScroll(); // Initial check
});


// Smooth reveal animation for hero content
document.addEventListener('DOMContentLoaded', function() {
	const heroContent = document.querySelector('.hero-content');
	heroContent.style.opacity = '0';
	heroContent.style.transform = 'translateY(50px)';
	heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
	
	setTimeout(() => {
		heroContent.style.opacity = '1';
		heroContent.style.transform = 'translateY(0)';
	}, 500);
});

// Add loading effect for images
document.addEventListener('DOMContentLoaded', function() {
	const images = document.querySelectorAll('img');
	
	images.forEach(img => {
		img.addEventListener('load', function() {
			this.style.opacity = '1';
		});
		
		// Set initial opacity
		img.style.opacity = '0';
		img.style.transition = 'opacity 0.3s ease';
		
		// If image is already loaded
		if (img.complete) {
			img.style.opacity = '1';
		}
	});
});

document.addEventListener("scroll", () => {
	const img = document.querySelector(".hero-img");
	const scrollY = window.scrollY;
// langsamer scrollen lassen (z.B. 0.5 Faktor)
	img.style.transform = `translateY(${scrollY * 0.5}px)`;
  });

// Add intersection observer for better performance
if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	});
	
	document.addEventListener('DOMContentLoaded', function() {
		const animatedElements = document.querySelectorAll('.benefit-item, .offer-card');
		animatedElements.forEach(el => {
			observer.observe(el);
		});
	});
}


// GSAP: slide in section titles and intros from left on scroll
document.addEventListener('DOMContentLoaded', function() {
	if (window.gsap) {
		if (window.ScrollTrigger) {
			gsap.registerPlugin(ScrollTrigger);
		}

		gsap.utils.toArray('.section-header').forEach(header => {
			const title = header.querySelector('h2') || header;
			const intro = header.querySelector('.section-intro');

			// initial state: left and hidden
			gsap.set(title, { opacity: 0, x: -40 });
			if (intro) {
				gsap.set(intro, { opacity: 0, x: -40 });
			}

			gsap.timeline({
				defaults: { duration: 0.8, ease: 'power3.out' },
				scrollTrigger: window.ScrollTrigger ? {
					trigger: header,
					start: 'top 80%'
				} : undefined
			})
			.to(title, { opacity: 1, x: 0 })
			.to(intro, { opacity: 1, x: 0 }, '-=0.4');
		});
	}
});

