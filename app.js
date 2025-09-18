// Step 3: Draft Initialization & State Management

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

    // Phase elements
    const setupPhase = document.getElementById('setup-phase');
    const draftPhase = document.getElementById('draft-phase');
    const resultsPhase = document.getElementById('results-phase');
    const draftBoard = document.getElementById('draft-board');
    const finalRosters = document.getElementById('final-rosters');

    // Draft state
    let draftTeams = [];
    let draftParticipants = [];
    let draftAssignments = [];
    let draftRound = 0;
    let draftTeamTurn = 0;
    let draftInProgress = false;

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
        // Initialize draft state
        draftTeams = teams.map(team => ({ name: team.name, members: [] }));
        draftParticipants = participants.map(person => person.name);
        draftAssignments = [];
        draftRound = 1;
        draftTeamTurn = 0;
        draftInProgress = true;

        // Hide setup, show draft
        setupPhase.style.display = 'none';
        draftPhase.style.display = '';
        resultsPhase.style.display = 'none';

        renderDraftBoard();
    };

    function renderDraftBoard() {
        draftBoard.innerHTML = `
            <div>
                <strong>Round:</strong> ${draftRound}
                &nbsp; | &nbsp;
                <strong>Team Turn:</strong> ${draftTeams[draftTeamTurn].name}
            </div>
            <div>
                <strong>Remaining Participants:</strong>
                <ul>
                    ${draftParticipants.map(name => `<li>${name}</li>`).join('')}
                </ul>
            </div>
            <div>
                <strong>Current Assignments:</strong>
                <ul>
                    ${draftTeams.map(team =>
                        `<li>${team.name}: ${team.members.join(', ') || '(none)'}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }

    // Next Pick button (no assignment logic yet)
    document.getElementById('next-pick').addEventListener('click', () => {
        alert('Draft pick logic will be implemented in the next step!');
    });

    // Restart draft
    document.getElementById('restart-draft').addEventListener('click', () => {
        // Reset all state
        teams = [];
        participants = [];
        draftTeams = [];
        draftParticipants = [];
        draftAssignments = [];
        draftRound = 0;
        draftTeamTurn = 0;
        draftInProgress = false;

        // Reset UI
        setupPhase.style.display = '';
        draftPhase.style.display = 'none';
        resultsPhase.style.display = 'none';
        teamNameInput.value = '';
        participantNameInput.value = '';
        renderTeams();
        renderParticipants();
    });

    // On page load, show setup phase only
    setupPhase.style.display = '';
    draftPhase.style.display = 'none';
    resultsPhase.style.display = 'none';
    renderTeams();
    renderParticipants();
});