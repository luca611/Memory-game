var firstCard = null;
var attempts = 0;
var matches = 0;

// Function to create the memory game cards
function createCards() {
    const gameBoard = document.getElementById('GameBody');
    if (gameBoard) {
        const emojis = ['🎟️', '🎁', '🎂', '🔋', '💻', '📸', '🖌️', '🤖'];
        const shuffledEmojis = shuffleArray(emojis.concat(emojis));

        // Create 16 cards of the game
        for (let i = 0; i < 16; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            //setting unique ids to track the cards
            card.id = `card-${i}`; 
            card.onclick = function() {
                flip(card.id);
            }

            //just html elemtents to create the card
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            const frontImage = document.createElement('img');
            frontImage.src = `./images/flag-orpheus-left.svg`; 
            frontImage.classList.add('flag');
            cardFront.appendChild(frontImage);

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            const backText = document.createElement('h2');
            backText.innerHTML = `&#x${shuffledEmojis[i].codePointAt(0).toString(16)};`;
            cardBack.appendChild(backText);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            //one done, append to the game board
            gameBoard.appendChild(card);
        }
    } else {
        // Error handling (used for debugging purposes)
        console.error("game-board element not found.");
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to flip a card
function flip(id) {
    const card = document.getElementById(id);
    //avoid flipping the same card twice
    if (card.classList.contains('flip')) {
        return; 
    }
    card.classList.add('flip');
    if (firstCard == null) {
        firstCard = card;
    } else {
        checkMatch(firstCard, card);
    }
}

// Function to check if two flipped cards match
function checkMatch(firstCards, secondCard) {
    //get the text of the cards
    const firstCardBackText = firstCards.querySelector('.card-back h2').innerHTML;
    const secondCardBackText = secondCard.querySelector('.card-back h2').innerHTML;
    //compare the text and check if they match
    if(firstCard == secondCard){
        firstCard = null;
        return;
    }
    if (firstCardBackText === secondCardBackText) {
        firstCard.onclick = null;
        secondCard.onclick = null;
        matches++;
        //if all matches are found, show victory message
        if(matches == 8) {
            showVictory();
            confettiRain();
        }
    } else {
        firstCard = null;
        attempts++;
        setTimeout(() => {
            firstCards.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1000);
    }
    firstCard = null;
}

// Function to show victory message and confetti animation
function showVictory() {
    //just toggling the classes to show the victory message
    document.getElementById('overlay').classList.toggle("overlay")
    const victory = document.getElementById('victory');
    victory.classList.toggle("hide-message");
    victory.classList.toggle("winning-message")
    const attemptsElement = document.getElementById('attempts');
    attemptsElement.innerHTML = "You won the game in " + attempts+ " attempts!";
    confettiRain();
}

// Function to create confetti animation
function confettiRain(){
    //generating 10 divs with random properties to create the confetti (rezie will break it a bit, but it's fine for now)
    for (let i = 0; i < 10; i++) {
        const randomRotation = Math.floor(Math.random() * 360);
        const randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        const randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        const randomAnimationDelay = Math.floor(Math.random() * 10);
        console.log(randomAnimationDelay)
        
        //colors for the confetti
        const colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.top = randomHeight + 'px';
        confetti.style.left = randomWidth + 'px';
        confetti.style.backgroundColor = randomColor;
        confetti.style.transform = 'skew(15deg) rotate(' + randomRotation + 'deg)';
        confetti.style.animationDelay = randomAnimationDelay + 's';
        document.getElementById("confetti-wrapper").appendChild(confetti);
    }
}

// Function to delete confetti animation
function deleteConfetti() {
    const confettiWrapper = document.getElementById("confetti-wrapper");
    while (confettiWrapper.firstChild) {
        confettiWrapper.removeChild(confettiWrapper.firstChild);
    }
}

// Function to reset the game
function resetGame() {
    //just resetting the variables and recreating the cards
    const gameBoard = document.getElementById('GameBody');
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    showVictory();
    deleteConfetti();
    firstCard = null;
    attempts = 0;
    matches = 0;
    createCards();
}
