let playBoxesSelector, playerXTitleSelector, playerOTitleSelector, messageBoxSelector, textMessageSelector;
let currentPlayer, playerXSelections = [], playerOSelections = [];

const winningCombinations =
    [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ];

$(document).ready(function () {
    playBoxesSelector = $('.game-board section span');
    playerXTitleSelector = $('.player-detail .playerX');
    playerOTitleSelector = $('.player-detail .playerO');
    messageBoxSelector = $('.message-box');
    textMessageSelector = $('.message-box h3');

    $('.btnReplay button').click(
        function () {
            window.location.reload();
        }
    );
    attachEventListenerToPlayBoxes();
    startGame();
});

function startGame() {
    currentPlayer = 'X';
    playerXTitleSelector.addClass('animate-Player');
}

function clickPlayBoxHandler(event) {
    let element = event.currentTarget;
    element.onclick = null;

    if (currentPlayer === 'X') {
        playerXSelections.push(element.getAttribute('data-boxnumber'));
        element.innerHTML = `<i class="X-in-box">X</i>`;
        if (hasPlayerWon(playerXSelections)) {
            finishGameAndShowResultSection();
        } else if (!hasGameFinishedWithoutResult()) {
            togglePlayers();
        }
    } else {
        playerOSelections.push(element.getAttribute('data-boxnumber'));
        element.innerHTML = `<i class="O-in-box">O</i>`;
        if (hasPlayerWon(playerOSelections)) {
            finishGameAndShowResultSection();
        } else if (!hasGameFinishedWithoutResult()) {
            togglePlayers();
        }
    }
}

function finishGameAndShowResultSection() {
    removeEventListenerFromPlayBoxes();
    messageBoxSelector.removeClass('hide');
    textMessageSelector.html('Player ' + currentPlayer + ' won!');
}

function togglePlayers() {
    if (currentPlayer === 'X') {
        playerOTitleSelector.addClass('animate-Player');
        playerXTitleSelector.removeClass('animate-Player');
        currentPlayer = 'O';
    } else {
        playerXTitleSelector.addClass('animate-Player');
        playerOTitleSelector.removeClass('animate-Player');
        currentPlayer = 'X';
    }
}

function hasGameFinishedWithoutResult() {
    if (playerXSelections.length + playerOSelections.length === 9) {
        messageBoxSelector.removeClass('hide');
        textMessageSelector.html('Match draw! Try again.');
        playerOTitleSelector.removeClass('animate-Player');
        playerXTitleSelector.removeClass('animate-Player');
        return true;
    }

    return false;
}


function hasPlayerWon(playerSelections) {
    for (const winningCombination of winningCombinations) {
        if (playerSelections.includes(winningCombination[0])
            && playerSelections.includes(winningCombination[1])
            && playerSelections.includes(winningCombination[2])) {
            return true;
        }
    }

    return false;
}

function attachEventListenerToPlayBoxes() {
    for (const playBox of playBoxesSelector) {
        playBox.onclick = clickPlayBoxHandler;
    }
    
}

function removeEventListenerFromPlayBoxes() {
    for (const playBox of playBoxesSelector) {
        playBox.onclick = null;
    }
}

module.exports = hasPlayerWon;