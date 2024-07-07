var firstCard = null;
var attempts = 0;
var matches = 0;
function createCards() {
    const gameBoard = document.getElementById('GameBody');
    if (gameBoard) {
        const emojis = ['🎟️', '🎁', '🎂', '🔋', '💻', '📸', '🖌️', '🤖'];
        const shuffledEmojis = shuffleArray(emojis.concat(emojis));

        for (let i = 0; i < 16; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `card-${i}`;
            card.onclick = function() {
                flip(card.id);
            }

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

            gameBoard.appendChild(card);
        }
    } else {
        console.error("game-board element not found.");
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flip(id) {
    const card = document.getElementById(id);
    if (card.classList.contains('flip')) {
        return; // Card is already flipped, do nothing
    }
    card.classList.add('flip');
    if (firstCard == null) {
        firstCard = card;
    } else {
        checkMatch(firstCard, card);
    }
}

function checkMatch(firstCards, secondCard) {
    const firstCardBackText = firstCards.querySelector('.card-back h2').innerHTML;
    const secondCardBackText = secondCard.querySelector('.card-back h2').innerHTML;
    if(firstCard == secondCard){
        firstCard = null;
        return;
    }
    if (firstCardBackText === secondCardBackText) {
        firstCard.onclick = null;
        secondCard.onclick = null;
        matches++;
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

function showVictory() {
    const victory = document.getElementById('victory');
    victory.classList.toggle("hide-message");
    victory.classList.toggle("winning-message")
    const attemptsElement = document.getElementById('attempts');
    attemptsElement.innerHTML = "You won the game in " + attempts+ " attempts!";
    confettiRain();
}

function confettiRain(){
    for (let i = 0; i < 10; i++) {
        const randomRotation = Math.floor(Math.random() * 360);
        const randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        const randomHeight = Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        const randomAnimationDelay = Math.floor(Math.random() * 10);
        console.log(randomAnimationDelay)
        
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