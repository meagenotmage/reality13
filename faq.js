document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ question buttons
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the clicked question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle the answer visibility
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = "0";
            }
        });
    });
    
    // Get all category tabs
    const categoryTabs = document.querySelectorAll('.faq-category-tab');
    const faqSections = document.querySelectorAll('.faq-category-section');
    
    // Add click event listener to each category tab
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and add inactive class
            categoryTabs.forEach(t => {
                t.classList.remove('active-tab');
                t.classList.remove('active');
                t.classList.add('inactive');
            });
            
            // Add active class to clicked tab and remove inactive
            this.classList.add('active-tab');
            this.classList.add('active');
            this.classList.remove('inactive');
            
            // Hide all faq sections
            faqSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the corresponding section
            const categoryId = this.getAttribute('data-category');
            document.getElementById(categoryId).style.display = 'block';
        });
    });
    
    // Activate the first tab by default (General tab)
    if (categoryTabs.length > 0) {
        categoryTabs[0].click();
    }
  });