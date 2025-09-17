 window.onload = function() {
            loadTeamMembersDropdown();
            loadApprovedExpenses();
            
            // Set today's date as default
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
        };

        function loadTeamMembersDropdown() {
            const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
            const dropdown = document.getElementById('assignedTo');
            
            dropdown.innerHTML = '<option value="">Select team member</option>';
            teamMembers.forEach(member => {
                dropdown.innerHTML += `<option value="${member.name}">${member.name}</option>`;
            });
        }

        function loadApprovedExpenses() {
            const approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
            const container = document.getElementById('approvedExpensesList');
            
            if (approvedExpenses.length === 0) {
                container.innerHTML = '<p class="no-data">No approved expenses yet.</p>';
                return;
            }

            container.innerHTML = approvedExpenses.map(expense => `
                <div class="expense-item">
                    <div class="expense-info">
                        <strong>₹${expense.amount}</strong> - ${expense.category}
                        <br><small>${expense.date} | ${expense.assignedTo}</small>
                        <br><em>${expense.description}</em>
                    </div>
                </div>
            `).join('');
        }

        document.getElementById('expenseForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const expense = {
                id: Date.now(),
                amount: document.getElementById('amount').value,
                date: document.getElementById('date').value,
                category: document.getElementById('category').value,
                assignedTo: document.getElementById('assignedTo').value,
                description: document.getElementById('description').value,
                status: 'pending',
                submittedAt: new Date().toISOString()
            };

            let pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            pendingApprovals.push(expense);
            localStorage.setItem('pendingApprovals', JSON.stringify(pendingApprovals));

            alert('Expense submitted for approval successfully!');
            document.getElementById('expenseForm').reset();
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
        });

        //logout
        function logout() {
            let confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                // Clear stored data
                localStorage.clear();

                // Redirect to signup page
                window.location.href = "signup.html";
            } else {
                // User canceled logout
                return;
            }
        }