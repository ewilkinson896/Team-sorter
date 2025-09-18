// Step 1: Basic UI interactivity (no draft logic yet)

document.addEventListener('DOMContentLoaded', () => {
    // Team management
    const teamForm = document.getElementById('team-form');
    const teamNameInput = document.getElementById('team-name');
    const teamList = document.getElementById('team-list');
    let teams = [];

    teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = teamNameInput.value.trim();
        if (name) {
            teams.push({ name });
            renderTeams();
            teamNameInput.value = '';
        }
    });

    function renderTeams() {
        teamList.innerHTML = '';
        teams.forEach((team, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${team.name}</span>
                <button data-edit="${idx}">Edit</button>
                <button data-delete="${idx}">Delete</button>
            `;
            teamList.appendChild(li);
        });

        // Edit team
        teamList.querySelectorAll('button[data-edit]').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.getAttribute('data-edit');
                const newName = prompt('Edit team name:', teams[idx].name);
                if (newName && newName.trim()) {
                    teams[idx].name = newName.trim();
                    renderTeams();
                }
            };
        });

        // Delete team
        teamList.querySelectorAll('button[data-delete]').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.getAttribute('data-delete');
                teams.splice(idx, 1);
                renderTeams();
            };
        });
    }

    // Participant management
    const participantForm = document.getElementById('participant-form');
    const participantNameInput = document.getElementById('participant-name');
    const participantList = document.getElementById('participant-list');
    let participants = [];

    participantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = participantNameInput.value.trim();
        if (name) {
            participants.push({ name });
            renderParticipants();
            participantNameInput.value = '';
        }
    });

    function renderParticipants() {
        participantList.innerHTML = '';
        participants.forEach((person, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${person.name}</span>
                <button data-edit="${idx}">Edit</button>
                <button data-delete="${idx}">Delete</button>
            `;
            participantList.appendChild(li);
        });

        // Edit participant
        participantList.querySelectorAll('button[data-edit]').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.getAttribute('data-edit');
                const newName = prompt('Edit participant name:', participants[idx].name);
                if (newName && newName.trim()) {
                    participants[idx].name = newName.trim();
                    renderParticipants();
                }
            };
        });

        // Delete participant
        participantList.querySelectorAll('button[data-delete]').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.getAttribute('data-delete');
                participants.splice(idx, 1);
                renderParticipants();
            };
        });
    }

    // Validation before starting draft
    const startDraftBtn = document.getElementById('start-draft');
    startDraftBtn.onclick = () => {
        if (teams.length < 2) {
            alert('You need at least 2 teams to start the draft.');
            return;
        }
        if (participants.length < 2) {
            alert('You need at least 2 participants to start the draft.');
            return;
        }
        alert('Draft will start in next step!');
    };

    // Phase buttons (placeholders)
    document.getElementById('next-pick').addEventListener('click', () => {
        alert('Next pick will be implemented in later steps!');
    });
    document.getElementById('restart-draft').addEventListener('click', () => {
        alert('Restart will be implemented in later steps!');
    });
});