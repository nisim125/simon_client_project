import { GameManager } from "./GameManager";

const gameHeader = document.getElementById('gameHeader') as HTMLParagraphElement;
const inptName = document.getElementById('inptName') as HTMLInputElement;
const btnStartGame = document.getElementById('btnStartGame') as HTMLButtonElement;
const inptLevel = document.getElementById('inptLevel') as HTMLInputElement;
const inptClicks = document.getElementById('inptClicks') as HTMLInputElement;
const pResults = document.getElementById('pResults') as HTMLParagraphElement;

const btnRed = document.getElementById('btnRed') as HTMLButtonElement;
const btnGreen = document.getElementById('btnGreen') as HTMLButtonElement;
const btnBlue = document.getElementById('btnBlue') as HTMLButtonElement;
const btnYellow = document.getElementById('btnYellow') as HTMLButtonElement;

const buttonColors: { [color: string]: HTMLButtonElement } = {
    "red": btnRed,
    "green": btnGreen,
    "blue": btnBlue,
    "yellow": btnYellow
};

let game: GameManager = new GameManager("guest");
let levelNumber: number = 1;
let clicksNumber: number = 0;


btnStartGame.onclick = () => {
    // console.log("GAME STARTED");
    btnStartGame.innerHTML = "GAME STARTED";
    btnStartGame.disabled = true;
    game.GetPlayer().SetName(inptName.value ? inptName.value : "guest");
    game.SetIsGameRunning(true);
    startGame();
}

function startGame() {
    game.RestartGame(inptName.value ? inptName.value : "Guest");
    gameHeader.innerHTML = "Good Luck " + game.GetPlayer().GetName() + "!";
    levelNumber = 1;
    clicksNumber = 0;
    btnStartGame.innerHTML = "GAME STARTED";
    btnRed.className = "redDark";
    btnGreen.className = "greenDark";
    btnBlue.className = "blueDark";
    btnYellow.className = "yellowDark";
    newTurn();
}

function newTurn() {
    btnRed.disabled = false;
    btnGreen.disabled = false;
    btnBlue.disabled = false;
    btnYellow.disabled = false;
    clicksNumber = 0;
    inptLevel.value = levelNumber + "";
    inptClicks.value = clicksNumber + "";
    game.AddSimonNewColor();
    game.GetPlayer().ResetPlayerSequence();
    // console.log(game.GetSimon().GetSimonSequence());
    showSimonSequence();
}

function showSimonSequence() {
    btnStartGame.innerHTML = "Concentrate..."
    let simonSequence = game.GetSimon().GetSimonSequence();
    let time: number = 300;
    btnClickDisabled(true);
    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(() => {
            changeColor(buttonColors[simonSequence[i]])
        }, time += 500);
    }
    setTimeout(() => {
        btnStartGame.innerHTML = "It's Your Time To Shine!";
        btnClickDisabled(false);
    }, time + 500);
}

function changeColor(element: HTMLElement) {
    // console.log("color changed: " + element.id.substring(3));
    const colorToChange = element.id.substring(3).toLowerCase() + "Light";
    element.className = colorToChange;
    setTimeout(() => {
        const colorToChange = element.id.substring(3).toLowerCase() + "Dark";
        element.className = colorToChange;
    }, 300);
}

function onClickColor(color: string) {
    if (game.GetIsGameRunning() == true) {
        game.GetPlayer().SetPlayerSequence(color);
        inptClicks.value = ++clicksNumber + "";
        // console.log("simon: " + game.GetSimon().GetSimonSequence());
        // console.log("player: " + game.GetPlayer().GetPlayerSequence());
        // console.log("how many clicks: " + clicksNumber);
        changeColor(buttonColors[color]);
        if (!game.CompareSequences(clicksNumber)) {
            game.SetIsGameRunning(false);
            btnClickDisabled(true);
            btnStartGame.innerHTML = "Game Over!  START NEW GAME";
            btnStartGame.disabled = false;
            createNewWinnerP(game.GetPlayer().GetName(), levelNumber);
        }
        else if (clicksNumber == game.GetSimon().GetSimonSequence().length) {
            btnClickDisabled(true);
            btnStartGame.innerHTML = "Good Job!";
            levelNumber++;
            setTimeout(newTurn, 1000);
        }
    }
}

function createNewWinnerP(name: string, result: number) {
    let newResult = document.createElement('p');
    newResult.innerHTML = name + "'s Score is " + result;
    pResults.appendChild(newResult);
}

function btnClickDisabled(isAllowd: boolean): void {
    btnRed.disabled = isAllowd;
    btnGreen.disabled = isAllowd;
    btnBlue.disabled = isAllowd;
    btnYellow.disabled = isAllowd;
}

btnRed.onclick = () => {
    onClickColor("red");
}

btnGreen.onclick = () => {
    onClickColor("green");
}

btnBlue.onclick = () => {
    onClickColor("blue");
}

btnYellow.onclick = () => {
    onClickColor("yellow");
}
