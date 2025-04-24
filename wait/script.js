// Admin Panel Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the admin page
    if (document.querySelector('.admin-panel')) {
        // Initialize tabs
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Show the selected tab content
                const tabId = this.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.remove('hidden');
            });
        });

        // Load orders
        loadOrders();
        
        // Load feedback
        loadFeedback();
        
        // Load announcements
        loadAnnouncements();
        
        // Handle announcement form submission
        document.getElementById('announcement-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('announcement-title').value;
            const text = document.getElementById('announcement-text').value;
            
            // Get date and format it
            const dateInput = document.getElementById('announcement-date').value;
            const date = new Date(dateInput);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            // Get existing announcements
            let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
            
            // Check if we're editing an existing announcement
            const editId = this.getAttribute('data-edit-id');
            
            if (editId !== null) {
                // Update existing announcement
                announcements[editId] = { title, text, date: formattedDate };
                
                // Reset form
                this.removeAttribute('data-edit-id');
                document.querySelector('#announcement-form button[type="submit"]').textContent = 'Add Announcement';
            } else {
                // Add new announcement
                announcements.push({ title, text, date: formattedDate });
            }
            
            // Save to local storage
            localStorage.setItem('announcements', JSON.stringify(announcements));
            
            // Reset form
            this.reset();
            
            // Reload announcements
            loadAnnouncements();
        });
    }
});

// Load orders function
function loadOrders() {
    if (!document.getElementById('orders-table')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="no-data">No orders found</td>';
        tbody.appendChild(row);
    } else {
        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            
            const date = new Date(order.orderDate);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.orderType}</td>
                <td>${order.firstName} ${order.lastName}</td>
                <td>${formattedDate}</td>
                <td class="status-${order.status.toLowerCase()}">${order.status}</td>
                <td>
                    <button class="view-btn" data-id="${index}">View</button>
                    <select class="status-select" data-id="${index}">
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Add event listeners for status changes
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const orderId = this.getAttribute('data-id');
                const newStatus = this.value;
                
                // Update order status
                orders[orderId].status = newStatus;
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Reload orders
                loadOrders();
            });
        });
        
        // Add event listeners for view buttons
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                const order = orders[orderId];
                
                // Show order details
                alert(`
Order Details:
--------------
Order Type: ${order.orderType}
Name: ${order.firstName} ${order.lastName}
Student ID: ${order.studentId}
Email: ${order.email}
Phone: ${order.phone}
Item: ${order.orderName}
Quantity: ${order.quantity}
Date Needed: ${order.dateNeeded}
Status: ${order.status}
Additional Info: ${order.additionalInfo || 'None'}
                `);
            });
        });
    }
}

// Load feedback function
function loadFeedback() {
    if (!document.getElementById('feedback-table')) return;
    
    const feedback = JSON.parse(localStorage.getItem('anonymousFeedback')) || [];
    const tbody = document.querySelector('#feedback-table tbody');
    tbody.innerHTML = '';
    
    if (feedback.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="no-data">No feedback found</td>';
        tbody.appendChild(row);
    } else {
        feedback.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const date = new Date(item.timestamp);
            const formattedDate = date.toLocaleDateString();
            
            row.innerHTML = `
                <td>${item.type}</td>
                <td>${item.subject}</td>
                <td>${item.rating || 'N/A'} ${item.rating ? '★' : ''}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="view-btn" data-id="${index}">View</button>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Add event listeners for view buttons
        document.querySelectorAll('#feedback-table .view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const feedbackId = this.getAttribute('data-id');
                const feedbackItem = feedback[feedbackId];
                
                // Show feedback details
                alert(`
Feedback Details:
----------------
Type: ${feedbackItem.type}
Subject: ${feedbackItem.subject}
Rating: ${feedbackItem.rating || 'None'}
Date: ${new Date(feedbackItem.timestamp).toLocaleDateString()}

Message:
${feedbackItem.message}
                `);
            });
        });
        
        // Add event listeners for delete buttons
        document.querySelectorAll('#feedback-table .delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this feedback?')) {
                    const feedbackId = this.getAttribute('data-id');
                    
                    // Remove feedback from array
                    feedback.splice(feedbackId, 1);
                    localStorage.setItem('anonymousFeedback', JSON.stringify(feedback));
                    
                    // Reload feedback
                    loadFeedback();
                }
            });
        });
    }
}

// Load announcements function
function loadAnnouncements() {
    // For admin panel
    if (document.getElementById('current-announcements-list')) {
        const announcements = JSON.parse(localStorage.getItem('announcements')) || [
            {
                title: "Spring Registration Now Open",
                text: "Registration for Spring 2025 classes is now open. Please check your student portal for your registration time slot.",
                date: "March 15, 2025"
            },
            {
                title: "New Media Lab Opening",
                text: "We're excited to announce the opening of our new state-of-the-art media lab on April 10. The facility includes podcast recording studios, video editing suites, and more.",
                date: "March 28, 2025"
            },
            {
                title: "Guest Lecture Series",
                text: "Join us for our upcoming guest lecture series featuring industry professionals from major media organizations.",
                date: "April 1, 2025"
            }
        ];
        
        // Save initial announcements if not already in local storage
        if (!localStorage.getItem('announcements')) {
            localStorage.setItem('announcements', JSON.stringify(announcements));
        }
        
        const list = document.getElementById('current-announcements-list');
        list.innerHTML = '';
        
        announcements.forEach((announcement, index) => {
            const li = document.createElement('li');
            li.classList.add('announcement-item');
            
            li.innerHTML = `
                <div class="announcement-info">
                    <h5>${announcement.title}</h5>
                    <p>${announcement.text}</p>
                    <span class="date">${announcement.date}</span>
                </div>
                <div class="announcement-actions">
                    <button class="edit-btn" data-id="${index}">Edit</button>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                </div>
            `;
            
            list.appendChild(li);
        });
        
        // Add event listeners for edit buttons
        document.querySelectorAll('#current-announcements-list .edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const announcementId = this.getAttribute('data-id');
                const announcement = announcements[announcementId];
                
                // Populate form with announcement data
                document.getElementById('announcement-title').value = announcement.title;
                document.getElementById('announcement-text').value = announcement.text;
                
                // Convert date string to YYYY-MM-DD format for date input
                const dateParts = announcement.date.split(' ');
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const monthIndex = monthNames.findIndex(m => m.startsWith(dateParts[0])) + 1;
                const day = parseInt(dateParts[1].replace(',', ''));
                const year = parseInt(dateParts[2]);
                
                const formattedDate = `${year}-${monthIndex.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                document.getElementById('announcement-date').value = formattedDate;
                
                // Change form submit button
                const submitBtn = document.querySelector('#announcement-form button[type="submit"]');
                submitBtn.textContent = 'Update Announcement';
                
                // Add data attribute to form for edit mode
                document.getElementById('announcement-form').setAttribute('data-edit-id', announcementId);
            });
        });
        
        // Add event listeners for delete buttons
        document.querySelectorAll('#current-announcements-list .delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this announcement?')) {
                    const announcementId = this.getAttribute('data-id');
                    
                    // Remove announcement from array
                    announcements.splice(announcementId, 1);
                    localStorage.setItem('announcements', JSON.stringify(announcements));
                    
                    // Reload announcements
                    loadAnnouncements();
                }
            });
        });
    }
    
    // For homepage
    if (document.querySelector('.announcement-container')) {
        const announcements = JSON.parse(localStorage.getItem('announcements')) || [
            {
                title: "Spring Registration Now Open",
                text: "Registration for Spring 2025 classes is now open. Please check your student portal for your registration time slot.",
                date: "March 15, 2025"
            },
            {
                title: "New Media Lab Opening",
                text: "We're excited to announce the opening of our new state-of-the-art media lab on April 10. The facility includes podcast recording studios, video editing suites, and more.",
                date: "March 28, 2025"
            },
            {
                title: "Guest Lecture Series",
                text: "Join us for our upcoming guest lecture series featuring industry professionals from major media organizations.",
                date: "April 1, 2025"
            }
        ];
        
        const container = document.querySelector('.announcement-container');
        container.innerHTML = '';
        
        announcements.forEach(announcement => {
            const div = document.createElement('div');
            div.classList.add('announcement');
            
            div.innerHTML = `
                <h3>${announcement.title}</h3>
                <p>${announcement.text}</p>
                <span class="date">${announcement.date}</span>
            `;
            
            container.appendChild(div);
        });
    }
}

// Initialize announcements on homepage
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.announcement-container')) {
        loadAnnouncements();
    }
});