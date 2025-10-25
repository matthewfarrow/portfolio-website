// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
	const navToggle = document.getElementById('nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	if (navToggle && navLinks) {
		navToggle.addEventListener('click', function() {
			navLinks.classList.toggle('active');
		});
	}
});
