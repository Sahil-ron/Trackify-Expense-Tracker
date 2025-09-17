let pendingApproval = [];//expenses
        let approvalExpenses = [];//approval
        let teamMembers = [];

        function saveData() {
            localStorage.setItem('teamMember', JSON.stringify(teamMembers))
            localStorage.setItem('pendingApproval', JSON.stringify(pendingApproval))
            localStorage.setItem('approvalExpenses', JSON.stringify(approvalExpenses))
        }

        function loadData() {
            teamMembers = JSON.parse(localStorage.getItem('teamMember'))
            approvalExpenses = JSON.parse(localStorage.getItem('approvalExpenses'))
            pendingApproval = JSON.parse(localStorage.getItem('pendingApproval'))
        }

        window.onload = () => {
            loadData();
        }

        function submitExpense() {
            let amount = document.getElementById('amount').value;
            let date = document.getElementById('date').value;
            let assignedTo = document.getElementById('assignedTo').value;
            let category = document.getElementById('category').value;
            let description = document.getElementById('description').value;

            if (!amount || !date || !assignedTo || !category || !description) {
                alert('please fill the necessary fields')
            }

            //all the data is stored in object literal
            let expense = { amount, date, assignedTo, category, description };
            pendingApproval.push(expense);
            alert('submit expense is successfull')
            document.getElementById('amount').innerHTML = "";
            document.getElementById('date').innerHTML = "";
            document.getElementById('category').innerHTML = "";
            document.getElementById('description').innerHTML = "";

            return;
        }

        //adding members
        function addTeamMember() {
            let member = document.getElementById('assignedTo').value;

            if (!member) {
                alert('Enter the member')
                return;
            }
            //push the data to team members
            teamMembers.push(member)
            document.getElementById('assignedTo').innerHTML = "";
        }

        function renderTeam() {
            let teamList = document.getElementById('teamList')
            teamList.innerText = "";
            teamMembers.forEach((member) => {

                let memberList = document.createElement('li');
                li.innerHTML = "";
                teamList.append(memberList);
                document.getElementById('membercount').innerHTML = member.length;

            })
        }

        function approval() {
            let approvalList = document.getElementById('approvalList').value;

            approvalList.innerHTML = "";
            approvalList.forEach((x) => {
                let div = document.createElement('div');
                div.classList = "approve";
                div.innerHTML = `${x.amount}-${x.date}-${x.category}-[${x.description}](${x.assignedTo})`;

                //approve button
                let approveBtn = document.createElement('button')
                approveBtn.innerHTML = ""
                approveBtn.classList = "approve";

                //reject button
                let rejectBtn = document.createElement('button');
                rejectBtn.innerHTML = "";
                rejectBtn.classList = 'reject'

                if (pendingApproval === 0) //if expenses is 0
                {
                    alert("no approvals")
                    return;
                }
                div.appendChild(approveBtn);
                div.appendChild(rejectBtn);
            })
        }

        function generateReport() {
            let reportOutput = document.getElementById("reportOutput");
            reportOutput.innerHTML = "";

            if (approvalExpenses.length === 0 && pendingApproval.length === 0) {
                alert("No expenses available to generate report");
                return;
            }

            let totalApproved = 0;
            let totalPending = 0;

            for (let i = 0; i < approvalExpenses.length; i++) {
                totalApproved += Number(approvalExpenses[i].amount);
            }

            for (let j = 0; j < pendingApproval.length; j++) {
                totalPending += Number(pendingApproval[j].amount);
            }

            // Show report details
            let reportText = "<h3>Expense Report</h3>";
            reportText += "<p><b>Total Approved:</b> ₹" + totalApproved + "</p>";
            reportText += "<p><b>Total Pending:</b> ₹" + totalPending + "</p>";

            reportText += "<h4>Approved Expenses:</h4><ul>";
            for (let i = 0; i < approvalExpenses.length; i++) {
                let exp = approvalExpenses[i];
                reportText += "<li>" + exp.date + " - " + exp.category + " - ₹" + exp.amount + " - " + exp.assignedTo + "</li>";
            }
            reportText += "</ul>";

            reportText += "<h4>Pending Expenses:</h4><ul>";
            for (let j = 0; j < pendingApproval.length; j++) {
                let exp = pendingApproval[j];
                reportText += "<li>" + exp.date + " - " + exp.category + " - ₹" + exp.amount + " - " + exp.assignedTo + "</li>";
            }
            reportText += "</ul>";

            reportOutput.innerHTML = reportText;
        }


        function sendSupport() {
            let name = document.getElementById("supportName").value;
            let message = document.getElementById("supportMessage").value;
            let response = document.getElementById("supportResponse");

            if (!name || !message) {
                alert("Please fill out both fields");
                return;
            }

            response.innerHTML = "✅ Thank you, " + name + ". Your message has been received: \"" + message + "\"";

            // clear inputs
            document.getElementById("supportName").value = "";
            document.getElementById("supportMessage").value = "";
        }

        // Update dashboard stats on load
        window.onload = function () {
            loadDashboardStats();
        };

        function loadDashboardStats() {
            const approvedExpenses = JSON.parse(localStorage.getItem('approvedExpenses')) || [];
            const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals')) || [];
            const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];

            const totalAmount = approvedExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
            const currentMonth = new Date().getMonth();
            const monthlyTotal = approvedExpenses
                .filter(expense => new Date(expense.date).getMonth() === currentMonth)
                .reduce((sum, expense) => sum + Number(expense.amount), 0);

            document.getElementById('totalExpenses').textContent = '₹' + totalAmount;
            document.getElementById('pendingCount').textContent = pendingApprovals.length;
            document.getElementById('teamCount').textContent = teamMembers.length;
            document.getElementById('monthlyTotal').textContent = '₹' + monthlyTotal;
        }

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
        

        // Block back button navigation
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };