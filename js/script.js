document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Active Link Highlighting (Handles Clean URLs)
    let currentLocation = location.pathname.split('/').pop() || 'index';
    
    // Remove .html extension if present for comparison
    if (currentLocation.endsWith('.html')) {
        currentLocation = currentLocation.replace('.html', '');
    }

    const menuItems = document.querySelectorAll('.nav-link');
    
    menuItems.forEach(item => {
        let itemHref = item.getAttribute('href');
        if (itemHref.endsWith('.html')) {
            itemHref = itemHref.replace('.html', '');
        }
        
        if (itemHref === currentLocation || (currentLocation === 'index' && itemHref === 'index')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Notes Filtering Logic (Only run on notes page)
    const searchInput = document.getElementById('noteSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.note-card');

            cards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const desc = card.querySelector('.card-desc').textContent.toLowerCase();
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'flex'; // Changed to flex to match card layout
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Timetable Current Day Highlighting (Only run on timetable page)
    const timetable = document.getElementById('timetable');
    if (timetable) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = days[new Date().getDay()];

        // Find header matching current day
        const headers = timetable.querySelectorAll('th');
        let dayIndex = -1;

        headers.forEach((th, index) => {
            if (th.textContent.trim().toLowerCase() === currentDay.toLowerCase()) {
                th.classList.add('highlight-day');
                dayIndex = index;
            }
        });

        // Highlight cells in that column
        if (dayIndex !== -1) {
            const rows = timetable.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');

                // Handle rows with colspan (e.g., Short Break)
                if (cells.length === 2 && cells[1].hasAttribute('colspan')) {
                    cells[1].classList.add('highlight-column');
                } else if (cells[dayIndex]) {
                    cells[dayIndex].classList.add('highlight-column');
                }
            });
        }
    }
});
