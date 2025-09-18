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
            teams.push(name);
            renderTeams();
            teamNameInput.value = '';
        }
    });

    function renderTeams() {
        teamList.innerHTML = '';
        teams.forEach((team, idx) => {
            const li = document.createElement('li');
            li.textContent = team;
            teamList.appendChild(li);
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
            participants.push(name);
            renderParticipants();
            participantNameInput.value = '';
        }
    });

    function renderParticipants() {
        participantList.innerHTML = '';
        participants.forEach((person, idx) => {
            const li = document.createElement('li');
            li.textContent = person;
            participantList.appendChild(li);
        });
    }

    // Phase buttons (no logic yet)
    document.getElementById('start-draft').addEventListener('click', () => {
        alert('Draft will start in next step!');
    });
    document.getElementById('next-pick').addEventListener('click', () => {
        alert('Next pick will be implemented in later steps!');
    });
    document.getElementById('restart-draft').addEventListener('click', () => {
        alert('Restart will be implemented in later steps!');
    });
});