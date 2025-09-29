// Jeu: Le Manoir de la Tech - Sauvez la famille Déboussolée du Wifou!

class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.currentPuzzle = 0;
        this.score = 0;
        this.familyMembers = [
            { name: "Papa Déboussolé", status: "possessed", description: "Accro aux notifications" },
            { name: "Maman Déboussolée", status: "possessed", description: "Obsédée par les réseaux sociaux" },
            { name: "Petit Tim Déboussolé", status: "possessed", description: "Hypnotisé par les jeux vidéo" },
            { name: "Grand-mère Déboussolée", status: "possessed", description: "Victime des fake news" }
        ];
        
        this.puzzles = [
            {
                title: "🔐 Énigme du Mot de Passe",
                question: "Le Wifou a changé le mot de passe du réseau! Il dit: 'Mon mot de passe est le nom de la technologie qui permet de se connecter sans fil, mais à l'envers!'",
                answer: "fiwi",
                hint: "Pensez à WiFi... mais à l'envers!",
                points: 20
            },
            {
                title: "📱 Énigme du Code PIN",
                question: "Pour débloquer le téléphone de Papa Déboussolé, le Wifou a créé un code: 'La somme des chiffres de l'année où internet est né (1969) multipliée par 2'",
                answer: "50",
                hint: "1+9+6+9 = 25, puis 25 × 2 = ?",
                points: 25
            },
            {
                title: "💻 Énigme du Code Secret",
                question: "Le Wifou a crypté un message: 'Mon code est le nombre de lettres dans le mot qui désigne un ordinateur portable'",
                answer: "11",
                hint: "Combien de lettres dans 'ordinateur'?",
                points: 30
            },
            {
                title: "🎮 Énigme du Jeu Vidéo",
                question: "Pour sauver Petit Tim, trouvez le code: 'Le nombre de bits dans un octet, multiplié par le nombre de côtés d'un triangle'",
                answer: "24",
                hint: "8 bits × 3 côtés = ?",
                points: 35
            },
            {
                title: "👻 Énigme Finale du Wifou",
                question: "Dernière énigme! Le Wifou dit: 'Mon code secret est le nombre de lettres dans le mot qui désigne l'endroit où je me cache'",
                answer: "6",
                hint: "Où se cache le Wifou? Dans le...",
                points: 50
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updatePlayersList();
    }
    
    setupEventListeners() {
        // Bouton ajouter joueur
        document.getElementById('add-player-btn').addEventListener('click', () => {
            this.addPlayer();
        });
        
        // Entrée clavier pour ajouter joueur
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addPlayer();
            }
        });
        
        // Bouton commencer le jeu
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        // Bouton soumettre réponse
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.submitAnswer();
        });
        
        // Entrée clavier pour répondre
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        // Bouton rejouer
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    addPlayer() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim();
        
        if (name && name.length >= 2 && !this.players.includes(name)) {
            this.players.push(name);
            nameInput.value = '';
            this.updatePlayersList();
            this.updateStartButton();
        } else if (this.players.includes(name)) {
            alert('Ce nom est déjà pris!');
        } else {
            alert('Le nom doit contenir au moins 2 caractères!');
        }
    }
    
    removePlayer(name) {
        this.players = this.players.filter(player => player !== name);
        this.updatePlayersList();
        this.updateStartButton();
    }
    
    updatePlayersList() {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        
        this.players.forEach(player => {
            const playerItem = document.createElement('div');
            playerItem.className = 'player-item';
            playerItem.innerHTML = `
                <span class="player-name">👤 ${player}</span>
                <button class="remove-player" onclick="game.removePlayer('${player}')">Supprimer</button>
            `;
            playersList.appendChild(playerItem);
        });
    }
    
    updateStartButton() {
        const startBtn = document.getElementById('start-game-btn');
        startBtn.disabled = this.players.length === 0;
    }
    
    startGame() {
        if (this.players.length === 0) return;
        
        // Masquer l'écran d'accueil et afficher l'écran de jeu
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        this.currentPlayerIndex = 0;
        this.currentPuzzle = 0;
        this.score = 0;
        
        this.updateGameDisplay();
        this.showCurrentPuzzle();
        this.updateFamilyStatus();
    }
    
    updateGameDisplay() {
        document.getElementById('current-player').textContent = `Joueur: ${this.players[this.currentPlayerIndex]}`;
        document.getElementById('puzzle-number').textContent = `Énigme: ${this.currentPuzzle + 1}/${this.puzzles.length}`;
        document.getElementById('score').textContent = `Score: ${this.score}`;
    }
    
    showCurrentPuzzle() {
        const puzzle = this.puzzles[this.currentPuzzle];
        const puzzleContent = document.getElementById('puzzle-content');
        
        puzzleContent.innerHTML = `
            <div class="puzzle-title">${puzzle.title}</div>
            <div class="puzzle-question">
                <p><strong>Le Wifou dit:</strong></p>
                <p>"${puzzle.question}"</p>
                <p><em>💡 Indice: ${puzzle.hint}</em></p>
            </div>
        `;
        
        // Vider le champ de réponse
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').focus();
    }
    
    submitAnswer() {
        const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
        const correctAnswer = this.puzzles[this.currentPuzzle].answer.toLowerCase();
        const puzzlePoints = this.puzzles[this.currentPuzzle].points;
        
        if (userAnswer === correctAnswer) {
            this.score += puzzlePoints;
            this.showFeedback(true, `Correct! +${puzzlePoints} points`);
            this.saveFamilyMember();
            this.nextPuzzle();
        } else {
            this.showFeedback(false, `Incorrect! La bonne réponse était: ${correctAnswer}`);
            this.nextPlayer();
        }
    }
    
    showFeedback(isCorrect, message) {
        const puzzleContent = document.getElementById('puzzle-content');
        const feedback = document.createElement('div');
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.textContent = message;
        puzzleContent.appendChild(feedback);
        
        // Supprimer le feedback après 3 secondes
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
    
    saveFamilyMember() {
        if (this.currentPuzzle < this.familyMembers.length) {
            this.familyMembers[this.currentPuzzle].status = 'saved';
            this.updateFamilyStatus();
        }
    }
    
    nextPuzzle() {
        this.currentPuzzle++;
        this.updateGameDisplay();
        
        if (this.currentPuzzle >= this.puzzles.length) {
            this.showVictory();
        } else {
            setTimeout(() => {
                this.showCurrentPuzzle();
            }, 2000);
        }
    }
    
    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.updateGameDisplay();
        
        setTimeout(() => {
            this.showCurrentPuzzle();
        }, 2000);
    }
    
    updateFamilyStatus() {
        const familyContainer = document.getElementById('family-members');
        familyContainer.innerHTML = '';
        
        this.familyMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = `family-member ${member.status}`;
            memberDiv.innerHTML = `
                <span class="family-member-name">${member.name}</span>
                <span class="family-member-status ${member.status}">
                    ${member.status === 'saved' ? '✅ Sauvé!' : '👻 Possédé'}
                </span>
            `;
            familyContainer.appendChild(memberDiv);
        });
    }
    
    showVictory() {
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('victory-screen').classList.add('active');
        
        const savedCount = this.familyMembers.filter(member => member.status === 'saved').length;
        const totalMembers = this.familyMembers.length;
        
        document.getElementById('final-score').innerHTML = `
            <h3>🏆 Score Final: ${this.score} points</h3>
            <p>👨‍👩‍👧‍👦 Famille sauvée: ${savedCount}/${totalMembers}</p>
            <p>🎮 Joueurs participants: ${this.players.join(', ')}</p>
        `;
        
        let victoryMessage = '';
        if (savedCount === totalMembers) {
            victoryMessage = '🎉 Félicitations! Vous avez complètement libéré la famille Déboussolée du contrôle du Wifou! Le Manoir de la Tech est maintenant libre et la famille peut retrouver son esprit de famille.';
        } else {
            victoryMessage = '👍 Bien joué! Vous avez partiellement sauvé la famille, mais le Wifou résiste encore. Continuez à résoudre les énigmes pour une victoire complète!';
        }
        
        document.getElementById('victory-message').textContent = victoryMessage;
    }
    
    resetGame() {
        // Réinitialiser l'état du jeu
        this.currentPlayerIndex = 0;
        this.currentPuzzle = 0;
        this.score = 0;
        
        // Réinitialiser la famille
        this.familyMembers.forEach(member => {
            member.status = 'possessed';
        });
        
        // Retourner à l'écran d'accueil
        document.getElementById('victory-screen').classList.remove('active');
        document.getElementById('welcome-screen').classList.add('active');
        
        // Garder les joueurs mais permettre de les modifier
        this.updatePlayersList();
        this.updateStartButton();
    }
}

// Initialiser le jeu quand la page est chargée
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
});