window.onload = function () {
            loadTeamMembers();
        };

        function loadTeamMembers() {
            const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
            const container = document.getElementById('teamList');
            const countElement = document.getElementById('memberCount');

            countElement.textContent = teamMembers.length;

            if (teamMembers.length === 0) {
                container.innerHTML = '<p class="no-data">No team members added yet.</p>';
                return;
            }

            container.innerHTML = teamMembers.map((member, index) => `
                <div class="team-member">
                    <div class="member-info">
                        <strong>${member.name}</strong>
                        <br><small>${member.email} | ${member.role}</small>
                        <br><small>Added: ${new Date(member.addedAt).toLocaleDateString()}</small>
                    </div>
                    <button class="remove-btn" onclick="removeMember(${index})">Remove</button>
                </div>
            `).join('');
        }

        function removeMember(index) {
            if (confirm('Are you sure you want to remove this team member?')) {
                let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
                teamMembers.splice(index, 1);
                localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
                loadTeamMembers();
            }
        }

        document.getElementById('teamForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const member = {
                name: document.getElementById('memberName').value,
                email: document.getElementById('memberEmail').value,
                role: document.getElementById('memberRole').value,
                addedAt: new Date().toISOString()
            };

            // Check if member already exists
            let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
            const existingMember = teamMembers.find(m => m.email === member.email);

            if (existingMember) {
                alert('A team member with this email already exists!');
                return;
            }

            teamMembers.push(member);
            localStorage.setItem('teamMembers', JSON.stringify(teamMembers));

            alert('Team member added successfully!');
            document.getElementById('teamForm').reset();
            loadTeamMembers();
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