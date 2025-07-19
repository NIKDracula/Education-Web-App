document.addEventListener('DOMContentLoaded', () => {
    // Log to confirm script is running
    console.log('Script loaded');

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (targetSection && targetLink) {
            targetSection.classList.add('active');
            targetLink.classList.add('active');
        } else {
            console.error(`Section or link not found for ID: ${sectionId}`);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Question display
    const questionButtons = document.querySelectorAll('.get-question');

    function getRandomQuestion(test, level) {
        const questionsForLevel = questions[test]?.[level];
        if (!questionsForLevel || questionsForLevel.length === 0) {
            return "No questions available for this level.";
        }
        const randomIndex = Math.floor(Math.random() * questionsForLevel.length);
        return questionsForLevel[randomIndex].text;
    }

    questionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const test = button.getAttribute('data-test');
            const levelSelect = document.getElementById(`${test}-level`);
            const level = levelSelect.value;
            const questionDisplay = document.getElementById(`${test}-question`);
            questionDisplay.textContent = getRandomQuestion(test, level);
        });
    });

    // Timer functionality
    const timers = {};

    function startTimer(test) {
        if (timers[test]?.interval) return;
        const timerInput = document.getElementById(`${test}-timer`);
        const timerDisplay = document.getElementById(`${test}-timer-display`);
        let time = parseInt(timerInput.value, 10);
        if (isNaN(time) || time < 1) time = 60;
        timerDisplay.textContent = time;

        timers[test] = {
            time,
            interval: setInterval(() => {
                timers[test].time--;
                timerDisplay.textContent = timers[test].time;
                if (timers[test].time <= 0) {
                    clearInterval(timers[test].interval);
                    delete timers[test].interval;
                    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                    audio.play().catch(err => console.error('Timer audio playback failed:', err));
                }
            }, 1000)
        };
    }

    function stopTimer(test) {
        if (timers[test]?.interval) {
            clearInterval(timers[test].interval);
            delete timers[test].interval;
        }
    }

    function resetTimer(test) {
        stopTimer(test);
        const timerInput = document.getElementById(`${test}-timer`);
        const timerDisplay = document.getElementById(`${test}-timer-display`);
        const time = parseInt(timerInput.value, 10) || 60;
        timerDisplay.textContent = time;
        timers[test] = { time };
    }

    const startButtons = document.querySelectorAll('.start-timer');
    const stopButtons = document.querySelectorAll('.stop-timer');
    const resetButtons = document.querySelectorAll('.reset-timer');

    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            const test = button.getAttribute('data-test');
            startTimer(test);
        });
    });

    stopButtons.forEach(button => {
        button.addEventListener('click', () => {
            const test = button.getAttribute('data-test');
            stopTimer(test);
        });
    });

    resetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const test = button.getAttribute('data-test');
            resetTimer(test);
        });
    });

    ['ielts', 'toefl', 'ket', 'pet'].forEach(test => resetTimer(test));

    // Grammar rules slide functionality
    const grammarShowButton = document.getElementById('grammar-show');
    const grammarTestSelect = document.getElementById('grammar-test');
    const grammarSlide = document.getElementById('grammar-slide');
    const prevSlideButton = document.getElementById('prev-slide');
    const nextSlideButton = document.getElementById('next-slide');
    let currentErrors = [];
    let currentSlideIndex = 0;

    function displaySlide(index) {
        if (index < 0 || index >= currentErrors.length) return;
        currentSlideIndex = index;
        const error = currentErrors[index];
        grammarSlide.innerHTML = `
            <h3>${error.title}</h3>
            <p><strong>Description:</strong> ${error.description}</p>
            <p class="incorrect">${error.incorrect}</p>
            <button class="reveal-answer">Reveal Correct Answer</button>
            <p class="correct">${error.correct}</p>
            <div class="examples">
                <p><strong>Additional Examples:</strong></p>
                ${error.examples.map(example => `<p>${example}</p>`).join('')}
            </div>
        `;
        const revealButton = grammarSlide.querySelector('.reveal-answer');
        const correctAnswer = grammarSlide.querySelector('.correct');
        revealButton.addEventListener('click', () => {
            correctAnswer.classList.add('show');
            revealButton.style.display = 'none';
        });
        prevSlideButton.disabled = currentSlideIndex === 0;
        nextSlideButton.disabled = currentSlideIndex === currentErrors.length - 1;
    }

    grammarShowButton.addEventListener('click', () => {
        const test = grammarTestSelect.value;
        currentErrors = test === 'all' ? grammar.errors : grammar.errors.filter(error => error.tests.includes(test));
        currentSlideIndex = 0;
        if (currentErrors.length === 0) {
            grammarSlide.textContent = 'No errors available for this exam.';
            prevSlideButton.disabled = true;
            nextSlideButton.disabled = true;
        } else {
            displaySlide(currentSlideIndex);
        }
    });

    prevSlideButton.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            displaySlide(currentSlideIndex - 1);
        }
    });

    nextSlideButton.addEventListener('click', () => {
        if (currentSlideIndex < currentErrors.length - 1) {
            displaySlide(currentSlideIndex + 1);
        }
    });

    // Exercise functionality
    const getExerciseButton = document.getElementById('get-exercise');
    const checkExerciseButton = document.getElementById('check-exercise');
    const exerciseDisplay = document.getElementById('exercise-display');
    const exerciseInput = document.getElementById('exercise-input');
    const exerciseFeedback = document.getElementById('exercise-feedback');
    let currentExercise = null;

    function getRandomExercise() {
        const exercises = grammar.exercises || [];
        if (exercises.length === 0) {
            exerciseDisplay.textContent = 'No exercises available.';
            return null;
        }
        const randomIndex = Math.floor(Math.random() * exercises.length);
        return exercises[randomIndex];
    }

    getExerciseButton.addEventListener('click', () => {
        currentExercise = getRandomExercise();
        exerciseInput.value = '';
        exerciseFeedback.textContent = '';
        if (currentExercise) {
            exerciseDisplay.innerHTML = `
                <p><strong>Question:</strong> ${currentExercise.question}</p>
                <p><strong>Hint:</strong> ${currentExercise.hint}</p>
            `;
        }
    });

    checkExerciseButton.addEventListener('click', () => {
        if (!currentExercise) {
            exerciseFeedback.textContent = 'Please select an exercise first.';
            return;
        }
        const userAnswer = exerciseInput.value.trim().toLowerCase();
        const correctAnswer = currentExercise.answer.toLowerCase();
        if (userAnswer === correctAnswer) {
            exerciseFeedback.textContent = 'Correct! Well done!';
            exerciseFeedback.style.color = '#27ae60';
        } else {
            exerciseFeedback.textContent = `Incorrect. The correct answer is: ${currentExercise.answer}`;
            exerciseFeedback.style.color = '#e74c3c';
        }
    });

    // Game selection
    const gameSelect = document.getElementById('game-select');
    const startGameButton = document.getElementById('start-game');
    const hangmanGame = document.getElementById('hangman-game');
    const tictactoeGame = document.getElementById('tictactoe-game');

    if (!gameSelect || !startGameButton || !hangmanGame || !tictactoeGame) {
        console.error('Game selection elements not found');
        return;
    }

    startGameButton.addEventListener('click', () => {
        console.log('Start Game clicked, selected game:', gameSelect.value);
        hangmanGame.style.display = gameSelect.value === 'hangman' ? 'block' : 'none';
        tictactoeGame.style.display = gameSelect.value === 'tictactoe' ? 'block' : 'none';
    });

    // Hangman game
    let wordToGuess = '';
    let guessedWord = [];
    let remainingBalloons = 10;

    const sounds = {
        applause: new Audio('applause.wav'),
        cheers: new Audio('cheers.wav'),
        balloonPop: new Audio('balloon_pop.wav'),
        trumpetFail: new Audio('trumpet_fail.wav')
    };

    const hangmanTestSelect = document.getElementById('hangman-test');
    const wordInputContainer = document.getElementById('custom-word-input');
    const wordList = document.getElementById('word-list');
    const startHangman = document.getElementById('startHangman');
    const restartHangman = document.getElementById('restartHangman');
    const hangmanControls = document.getElementById('hangman-controls');
    const gameSection = document.getElementById('game');

    if (!hangmanTestSelect || !wordInputContainer || !wordList || !startHangman || !restartHangman || !hangmanControls || !gameSection) {
        console.error('Hangman elements not found:', {
            hangmanTestSelect: !!hangmanTestSelect,
            wordInputContainer: !!wordInputContainer,
            wordList: !!wordList,
            startHangman: !!startHangman,
            restartHangman: !!restartHangman,
            hangmanControls: !!hangmanControls,
            gameSection: !!gameSection
        });
        return;
    }

    function displayWordList(test) {
        console.log('Displaying word list for test:', test);
        wordList.innerHTML = '';
        if (test === 'custom') {
            wordInputContainer.style.display = 'block';
            wordList.innerHTML = '<p>Please enter a custom word above.</p>';
        } else {
            wordInputContainer.style.display = 'none';
            if (typeof vocabulary === 'undefined' || !vocabulary[test]) {
                console.error('Vocabulary not loaded or test not found:', test);
                wordList.innerHTML = '<p>Vocabulary data not available.</p>';
                return;
            }
            const words = vocabulary[test];
            wordList.innerHTML = `<p><strong>Vocabulary List:</strong></p>${words.map(word => `<p>${word}</p>`).join('')}`;
        }
    }

    hangmanTestSelect.addEventListener('change', () => {
        const test = hangmanTestSelect.value;
        console.log('Hangman test selected:', test);
        displayWordList(test);
    });

    function toggleWordVisibility() {
        const wordInput = document.getElementById('wordInput');
        if (wordInput) {
            wordInput.type = wordInput.type === 'password' ? 'text' : 'password';
        } else {
            console.error('wordInput element not found');
        }
    }

    function startHangmanGame() {
        console.log('Start Hangman clicked');
        const test = hangmanTestSelect.value;
        const wordInput = document.getElementById('wordInput');
        let selectedWord = '';

        if (test === 'custom') {
            if (!wordInput || !wordInput.value.trim()) {
                console.error('No word entered for custom mode');
                document.getElementById('error').textContent = 'Please enter a valid word!';
                return;
            }
            selectedWord = wordInput.value.trim();
        } else {
            if (typeof vocabulary === 'undefined' || !vocabulary[test]) {
                console.error('Vocabulary not loaded or test not found:', test);
                document.getElementById('error').textContent = 'Vocabulary data not available!';
                return;
            }
            const words = vocabulary[test];
            if (words.length === 0) {
                console.error('No words available for test:', test);
                document.getElementById('error').textContent = 'No words available for this exam!';
                return;
            }
            selectedWord = words[Math.floor(Math.random() * words.length)];
        }

        hangmanControls.style.display = 'none';
        gameSection.style.display = 'block';
        document.getElementById('restartContainer').style.display = 'none';
        document.getElementById('error').textContent = '';

        wordToGuess = selectedWord.toUpperCase();
        guessedWord = Array(wordToGuess.length).fill('_');
        document.getElementById('wordDisplay').textContent = guessedWord.join(' ');

        remainingBalloons = 10;
        setupBalloons();
        setupLetters();
    }

    function setupBalloons() {
        const balloonsContainer = document.getElementById('balloons');
        if (!balloonsContainer) {
            console.error('Balloons container not found');
            return;
        }
        balloonsContainer.innerHTML = '';
        for (let i = 0; i < remainingBalloons; i++) {
            const balloon = document.createElement('img');
            balloon.src = 'balloon.png';
            balloon.alt = 'Balloon';
            balloonsContainer.appendChild(balloon);
        }
    }

    function setupLetters() {
        const lettersContainer = document.getElementById('letters');
        if (!lettersContainer) {
            console.error('Letters container not found');
            return;
        }
        lettersContainer.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter, button));
            lettersContainer.appendChild(button);
        }
    }

    function handleGuess(letter, button) {
        button.disabled = true;
        if (wordToGuess.includes(letter)) {
            wordToGuess.split('').forEach((char, index) => {
                if (char === letter) {
                    guessedWord[index] = letter;
                }
            });
            document.getElementById('wordDisplay').textContent = guessedWord.join(' ');
            sounds.cheers.play().catch(err => console.error('Cheers audio playback failed:', err));

            if (!guessedWord.includes('_')) {
                endHangmanGame('Congratulations! You\'ve guessed the word!', 'win');
            }
        } else {
            remainingBalloons--;
            if (remainingBalloons === 0) {
                const balloons = document.getElementById('balloons').children;
                if (balloons[remainingBalloons]) {
                    balloons[remainingBalloons].style.visibility = 'hidden';
                }
                sounds.trumpetFail.play().catch(err => console.error('Trumpet fail audio playback failed:', err));
                endHangmanGame(`Game over! The word was ${wordToGuess}`, 'loss');
            } else {
                const balloons = document.getElementById('balloons').children;
                if (balloons[remainingBalloons]) {
                    balloons[remainingBalloons].style.visibility = 'hidden';
                }
                sounds.balloonPop.play().catch(err => console.error('Balloon pop audio playback failed:', err));
            }
        }
    }

    function endHangmanGame(message, result) {
        alert(message);
        const lettersContainer = document.getElementById('letters');
        if (lettersContainer) {
            lettersContainer.innerHTML = '';
        }
        document.getElementById('restartContainer').style.display = 'block';
        if (result === 'win') {
            sounds.applause.play().catch(err => console.error('Applause audio playback failed:', err));
        } else if (result === 'loss') {
            sounds.trumpetFail.play().catch(err => console.error('Trumpet fail audio playback failed:', err));
        }
    }

    function restartHangmanGame() {
        hangmanControls.style.display = 'block';
        gameSection.style.display = 'none';
        document.getElementById('restartContainer').style.display = 'none';
        const wordInput = document.getElementById('wordInput');
        if (wordInput) wordInput.value = '';
        document.getElementById('error').textContent = '';
        displayWordList(hangmanTestSelect.value);
    }

    document.getElementById('toggleVisibility').addEventListener('click', () => {
        console.log('Toggle visibility clicked');
        toggleWordVisibility();
    });

    startHangman.addEventListener('click', () => {
        console.log('Start Hangman button clicked');
        startHangmanGame();
    });

    restartHangman.addEventListener('click', () => {
        console.log('Restart Hangman button clicked');
        restartHangmanGame();
    });

    // Tic-Tac-Toe game
    const tictactoeTestSelect = document.getElementById('tictactoe-test');
    const startTictactoe = document.getElementById('startTictactoe');
    const restartTictactoe = document.getElementById('restartTictactoe');
    const tictactoeBoard = document.getElementById('tictactoe-board');
    const tictactoeStatus = document.getElementById('tictactoe-status');
    const tictactoeWordList = document.getElementById('tictactoe-word-list');
    const tictactoeControls = document.getElementById('tictactoe-controls');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = false;
    let cellWords = [];

    if (!tictactoeTestSelect || !startTictactoe || !restartTictactoe || !tictactoeBoard || !tictactoeWordList || !tictactoeControls) {
        console.error('Tic-Tac-Toe elements not found:', {
            tictactoeTestSelect: !!tictactoeTestSelect,
            startTictactoe: !!startTictactoe,
            restartTictactoe: !!restartTictactoe,
            tictactoeBoard: !!tictactoeBoard,
            tictactoeWordList: !!tictactoeWordList,
            tictactoeControls: !!tictactoeControls
        });
        return;
    }

    function displayTictactoeWordList(test) {
        console.log('Displaying Tic-Tac-Toe word list for test:', test);
        tictactoeWordList.innerHTML = '';
        if (typeof vocabulary === 'undefined' || !vocabulary[test]) {
            console.error('Vocabulary not loaded or test not found:', test);
            tictactoeWordList.innerHTML = '<p>Vocabulary data not available.</p>';
            return;
        }
        const words = vocabulary[test];
        tictactoeWordList.innerHTML = `<p><strong>Vocabulary List:</strong></p>${words.map(word => `<p>${word}</p>`).join('')}`;
    }

    tictactoeTestSelect.addEventListener('change', () => {
        const test = tictactoeTestSelect.value;
        console.log('Tic-Tac-Toe test selected:', test);
        displayTictactoeWordList(test);
    });

    function adjustFontSize(cell) {
        const word = cell.textContent.trim();
        const cellWidth = cell.offsetWidth;
        const wordWidth = cell.scrollWidth;
        if (wordWidth > cellWidth && !cell.classList.contains('x') && !cell.classList.contains('o')) {
            let fontSize = parseFloat(window.getComputedStyle(cell).fontSize);
            while (wordWidth > cellWidth && fontSize > 10) {
                fontSize -= 0.5;
                cell.style.fontSize = `${fontSize}px`;
            }
        }
    }

    function startTictactoeGame() {
        console.log('Start Tic-Tac-Toe clicked');
        const test = tictactoeTestSelect.value;
        if (typeof vocabulary === 'undefined' || !vocabulary[test]) {
            console.error('Vocabulary not loaded or test not found:', test);
            tictactoeStatus.textContent = 'Vocabulary data not available!';
            return;
        }
        const words = vocabulary[test];
        if (words.length === 0) {
            console.error('No words available for test:', test);
            tictactoeStatus.textContent = 'No words available for this exam!';
            return;
        }

        tictactoeBoard.style.display = 'grid';
        document.getElementById('tictactoe-restart').style.display = 'none';
        tictactoeControls.style.display = 'none';
        tictactoeStatus.textContent = 'Player X\'s turn. Say a sentence using the word before placing your mark.';
        gameBoard = Array(9).fill('');
        gameActive = true;
        currentPlayer = 'X';

        cellWords = [];
        for (let i = 0; i < 9; i++) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            cellWords.push(randomWord);
        }

        tictactoeBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('tictactoe-cell');
            cell.dataset.index = i;
            cell.textContent = cellWords[i];
            cell.style.gridColumn = ((i % 3) + 1);
            cell.style.gridRow = (Math.floor(i / 3) + 1);
            cell.addEventListener('click', () => {
                console.log('Tic-Tac-Toe cell clicked:', i);
                handleCellClick(i);
            });
            tictactoeBoard.appendChild(cell);
            adjustFontSize(cell);
        }
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        const cell = tictactoeBoard.children[index];
        cell.classList.add(currentPlayer.toLowerCase());
        cell.textContent = currentPlayer;

        if (checkWin()) {
            tictactoeStatus.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            document.getElementById('tictactoe-restart').style.display = 'block';
            sounds.applause.play().catch(err => console.error('Applause audio playback failed:', err));
        } else if (gameBoard.every(cell => cell !== '')) {
            tictactoeStatus.textContent = 'It\'s a draw!';
            gameActive = false;
            document.getElementById('tictactoe-restart').style.display = 'block';
            sounds.trumpetFail.play().catch(err => console.error('Trumpet fail audio playback failed:', err));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            tictactoeStatus.textContent = `Player ${currentPlayer}'s turn. Say a sentence using the word before placing your mark.`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function restartTictactoeGame() {
        console.log('Restart Tic-Tac-Toe clicked');
        tictactoeControls.style.display = 'block';
        tictactoeBoard.style.display = 'none';
        document.getElementById('tictactoe-restart').style.display = 'none';
        tictactoeStatus.textContent = '';
        displayTictactoeWordList(tictactoeTestSelect.value);
    }

    startTictactoe.addEventListener('click', () => {
        console.log('Start Tic-Tac-Toe button clicked');
        startTictactoeGame();
    });

    restartTictactoe.addEventListener('click', () => {
        console.log('Restart Tic-Tac-Toe button clicked');
        restartTictactoeGame();
    });

    // Initialize word lists
    displayWordList('custom');
    displayTictactoeWordList('ielts');

    // Show home section by default
    showSection('home');
});