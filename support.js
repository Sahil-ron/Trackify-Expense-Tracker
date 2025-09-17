 document.getElementById('supportForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('supportName').value,
                email: document.getElementById('supportEmail').value,
                category: document.getElementById('supportCategory').value,
                priority: document.getElementById('supportPriority').value,
                subject: document.getElementById('supportSubject').value,
                message: document.getElementById('supportMessage').value,
                timestamp: new Date().toISOString()
            };

            // Save support request to localStorage (in real app, this would be sent to server)
            let supportRequests = JSON.parse(localStorage.getItem('supportRequests')) || [];
            formData.id = Date.now();
            supportRequests.push(formData);
            localStorage.setItem('supportRequests', JSON.stringify(supportRequests));

            // Show success message
            const responseDiv = document.getElementById('supportResponse');
            responseDiv.innerHTML = `
                <div class="support-success">
                    <h4>✅ Message Sent Successfully!</h4>
                    <p>Thank you, <strong>${formData.name}</strong>! Your support request has been received.</p>
                    <p><strong>Ticket ID:</strong> #${formData.id}</p>
                    <p><strong>Category:</strong> ${formData.category}</p>
                    <p><strong>Priority:</strong> ${formData.priority}</p>
                    <p>We will respond to your inquiry at <strong>${formData.email}</strong> within 24 hours.</p>
                    <p><em>Your message:</em> "${formData.message}"</p>
                </div>
            `;

            // Reset form
            document.getElementById('supportForm').reset();

            // Scroll to response
            responseDiv.scrollIntoView({ behavior: 'smooth' });
        });

        // FAQ accordion functionality
        document.addEventListener('DOMContentLoaded', function () {
            const faqItems = document.querySelectorAll('.faq-item h4');
            faqItems.forEach(item => {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function () {
                    const content = this.nextElementSibling;
                    const currentDisplay = window.getComputedStyle(content).display;

                    if (currentDisplay === 'none') {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });

        //logout
        function logout() {
            let confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                // Clear stored data
                localStorage.clear();

                // Redirect to signup page
                window.location.href = "index.html";
            } else {
                // User canceled logout
                return;
            }
        }
