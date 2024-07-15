//const root = document.getElementById('root')
let players = [];
let playerIdCounter = 1;
// Define a player object with unique identifier, name, and overall rating
class Player {
    constructor(id, playerName, overallRating) {
        this.id = id;
        this.playerName = playerName;
        this.overallRating = overallRating;
    }
}

// Function to add a player to the list
function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const overallRating = parseInt(document.getElementById('overallRating').value);

    if (playerName && overallRating >= 1 && overallRating <= 5) {
        const newPlayer = new Player(`player${playerIdCounter++}`, playerName, overallRating);
        players.push(newPlayer);
        updatePlayerList();
        clearInputs();
    } else {
        alert('Please enter a valid player name and rating (1-5).');
    }
}

// Function to update the player list display
function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.innerText = `ID: ${player.id}, Name: ${player.playerName}, Rating: ${player.overallRating}`;
        playerList.appendChild(li);
    });
}

// Function to clear input fields
function clearInputs() {
    document.getElementById('playerName').value = '';
    document.getElementById('overallRating').value = '1';
}

// Function to handle organizing teams
function handleOrganizeTeams() {
    let numberOfTeams = parseInt(document.getElementById('numberOfTeams').value)
    let numberOfPlayersInATeam = parseInt(document.getElementById('numberOfPlayersInteam').value)
    let teams = organize(players, numberOfTeams, numberOfPlayersInATeam, calculateOverallRating);
    
    createTeamsTable(teams);
}
// Add event listeners
document.getElementById('addPlayerButton').addEventListener('click', addPlayer);
document.getElementById('organizeButton').addEventListener('click', handleOrganizeTeams);

// Generate an array of 15 players with random ratings between 1 and 5

// Function to organize players into balanced teams
function organize(arrayOfPlayers, numberOfTeams, numberOfPlayersInATeam, overallFunc) {
    // Sort players by overall rating in descending order
    arrayOfPlayers.sort((a, b) => b.overallRating - a.overallRating);

    // Initialize teams array
    let teams = Array.from({ length: numberOfTeams }, () => []);

    // Distribute players into teams to balance overall ratings
    for (let i = 0; i < arrayOfPlayers.length; i++) {
        let teamIndex = i % numberOfTeams;
        teams[teamIndex].push(arrayOfPlayers[i]);
    }

    // Calculate overall rating for each team using the provided overallFunc
    teams = teams.map(team => ({
        players: team,
        overallRating: overallFunc(team)
    }));

    return teams;
}

// Function to calculate the overall rating of a team
function calculateOverallRating(team) {
    return team.reduce((sum, player) => sum + player.overallRating, 0) / team.length;
}




// Function to create a table for displaying teams
function createTeamsTable(teams) {
    let container = document.getElementById('root');
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild)
    }
    
    teams.forEach((team, index) => {
        let table = document.createElement('table');
        table.border = '1';

        let caption = document.createElement('caption');
        caption.innerText = `Team ${index + 1} - Overall Rating: ${team.overallRating.toFixed(2)}`;
        table.appendChild(caption);

        let headerRow = document.createElement('tr');
        ['ID', 'Player Name', 'Overall Rating'].forEach(text => {
            let th = document.createElement('th');
            th.innerText = text;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        team.players.forEach(player => {
            let row = document.createElement('tr');

            [player.id, player.playerName, player.overallRating].forEach(text => {
                let td = document.createElement('td');
                td.innerText = text;
                row.appendChild(td);
            });

            table.appendChild(row);
        });

        container.appendChild(table);
        container.appendChild(document.createElement('br'));
    });
}
handleOrganizeTeams()