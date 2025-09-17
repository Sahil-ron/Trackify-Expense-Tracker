window.onload = function() {
            loadApprovals();
        };

        function loadApprovals() {
            const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            const approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
            const rejectedExpenses = JSON.parse(localStorage.getItem('rejectedExpenses')) || [];
            
            const allExpenses = [
                ...pendingApprovals.map(exp => ({...exp, status: 'pending'})),
                ...approvedExpenses.map(exp => ({...exp, status: 'approved'})),
                ...rejectedExpenses.map(exp => ({...exp, status: 'rejected'}))
            ];

            renderApprovals(allExpenses);
        }

        function filterApprovals() {
            const filterValue = document.querySelector('input[name="filter"]:checked').value;
            const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            const approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
            const rejectedExpenses = JSON.parse(localStorage.getItem('rejectedExpenses')) || [];
            
            let filteredExpenses = [];
            
            if (filterValue === 'all') {
                filteredExpenses = [
                    ...pendingApprovals.map(exp => ({...exp, status: 'pending'})),
                    ...approvedExpenses.map(exp => ({...exp, status: 'approved'})),
                    ...rejectedExpenses.map(exp => ({...exp, status: 'rejected'}))
                ];
            } else if (filterValue === 'pending') {
                filteredExpenses = pendingApprovals.map(exp => ({...exp, status: 'pending'}));
            } else if (filterValue === 'approved') {
                filteredExpenses = approvedExpenses.map(exp => ({...exp, status: 'approved'}));
            } else if (filterValue === 'rejected') {
                filteredExpenses = rejectedExpenses.map(exp => ({...exp, status: 'rejected'}));
            }

            renderApprovals(filteredExpenses);
        }

        function renderApprovals(expenses) {
            const container = document.getElementById('approvalsList');
            
            if (expenses.length === 0) {
                container.innerHTML = '<p class="no-data">No expenses to display.</p>';
                return;
            }

            container.innerHTML = expenses.map(expense => `
                <div class="approval-item">
                    <div class="approval-info">
                        <div class="approval-header">
                            <strong>₹${expense.amount}</strong>
                            <span class="status status-${expense.status}">${expense.status.toUpperCase()}</span>
                        </div>
                        <div class="approval-details">
                            <p><strong>Category:</strong> ${expense.category}</p>
                            <p><strong>Date:</strong> ${expense.date}</p>
                            <p><strong>Assigned to:</strong> ${expense.assignedTo}</p>
                            <p><strong>Description:</strong> ${expense.description}</p>
                            <p><small>Submitted: ${new Date(expense.submittedAt).toLocaleString()}</small></p>
                        </div>
                    </div>
                    ${expense.status === 'pending' ? `
                        <div class="approval-actions">
                            <button class="approve-btn" onclick="approveExpense(${expense.id})">Approve</button>
                            <button class="reject-btn" onclick="rejectExpense(${expense.id})">Reject</button>
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }

        function approveExpense(expenseId) {
            let pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            let approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
            
            const expenseIndex = pendingApprovals.findIndex(exp => exp.id === expenseId);
            if (expenseIndex !== -1) {
                const expense = pendingApprovals[expenseIndex];
                expense.approvedAt = new Date().toISOString();
                
                approvedExpenses.push(expense);
                pendingApprovals.splice(expenseIndex, 1);
                
                localStorage.setItem('pendingApprovals', JSON.stringify(pendingApprovals));
                localStorage.setItem('approvedExpenses', JSON.stringify(approvedExpenses));
                
                alert('Expense approved successfully!');
                loadApprovals();
            }
        }

        function rejectExpense(expenseId) {
            const reason = prompt('Please enter rejection reason:');
            if (!reason) return;
            
            let pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            let rejectedExpenses = JSON.parse(localStorage.getItem('rejectedExpenses')) || [];
            
            const expenseIndex = pendingApprovals.findIndex(exp => exp.id === expenseId);
            if (expenseIndex !== -1) {
                const expense = pendingApprovals[expenseIndex];
                expense.rejectedAt = new Date().toISOString();
                expense.rejectionReason = reason;
                
                rejectedExpenses.push(expense);
                pendingApprovals.splice(expenseIndex, 1);
                
                localStorage.setItem('pendingApprovals', JSON.stringify(pendingApprovals));
                localStorage.setItem('rejectedExpenses', JSON.stringify(rejectedExpenses));
                
                alert('Expense rejected successfully!');
                loadApprovals();
            }
        }

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