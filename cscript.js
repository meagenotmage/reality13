
document.addEventListener('DOMContentLoaded', function () {
    // == NAV BAR HAMBURGER MENU ==
    hamburger.addEventListener('click', function() {
        console.log("Hamburger clicked"); // Add this line
        navLinks.classList.toggle('show');
    });
    // Toggle hamburger menu
    function setupHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
       // Initialize and set up interval updates
    function init() {
        renderSchedule();
        updateCurrentSession();
        setupHamburgerMenu();
        
        // Set up scroll to current button
        document.getElementById('scroll-to-current').addEventListener('click', scrollToCurrentSession);
        
        // Set up next session button
        setupNextSessionButton();
        
        // Update every minute
        setInterval(() => {
            updateCurrentSession();
        }, 60000);
        
        // Initial scroll to current session after a short delay
        setTimeout(scrollToCurrentSession, 1000);
    }

     // Start when page loads
     window.addEventListener('load', init);
});

document.addEventListener('DOMContentLoaded', function () {
    // == NAV BAR HAMBURGER MENU ==
    hamburger.addEventListener('click', function() {
        console.log("Hamburger clicked"); // Add this line
        navLinks.classList.toggle('show');
    });
    // Toggle hamburger menu
    function setupHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
       // Initialize and set up interval updates
    function init() {
        renderSchedule();
        updateCurrentSession();
        setupHamburgerMenu();
        
        // Set up scroll to current button
        document.getElementById('scroll-to-current').addEventListener('click', scrollToCurrentSession);
        
        // Set up next session button
        setupNextSessionButton();
        
        // Update every minute
        setInterval(() => {
            updateCurrentSession();
        }, 60000);
        
        // Initial scroll to current session after a short delay
        setTimeout(scrollToCurrentSession, 1000);
    }

     // Start when page loads
     window.addEventListener('load', init);
});

