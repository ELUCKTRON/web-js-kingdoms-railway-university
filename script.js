import { Direction, ijToDirection, levelData , rules } from './utilities.js';

import { Player, selfLeaderBoard, Position, Field, Lake, Empty, Mountain, Bridge } from './classes.js';

import { createBoard , isWon , directionCalc , isCustom  , isLost , addWon} from"./backend.js";


// variable data



let playerName = "";
let difficulty = "notSelected";
let mapInd = null;
let matrixSize = 0;
const matrix = [];



let currentPosition = null;
let prevPosition = null;
let nextPosition = null;

let beginingPosition = null;
let status = "";

let startTime = 0;



////////////////// getting elements from DOM

// first page
const nameElement = document.querySelector("#inputText")
const easyElement = document.querySelector("#easy")
const hardElement = document.querySelector("#hard")
const startElement = document.querySelector("#startButton")
const rulesElement = document.querySelector("#rulesButton")
const ruleTextElement = document.querySelector("#rulesTextArea");


//second page

const boardElement = document.querySelector("#game-board")
const mapDifficultyElement = document.querySelector("#map-difficulty")
const MapNumberElement = document.querySelector("#map-number")
const ElapseTimeElement = document.querySelector("#elapsed-time")
const bestTimeElement = document.querySelector("#best-time")
const statusELement = document.querySelector("#status")
const playerNameElement = document.querySelector("#player-name")
const randomMapElement = document.querySelector("#random-map-button")
const refreshMapElement = document.querySelector("#refresh-map-button")
const exithMapElement = document.querySelector("#exit-map-button")

const selfLeaderBoardElement = document.querySelector("#self-leaderboard")
const globalLeaderBoardElement = document.querySelector("#global-leaderboard")


// data side functions

function initialazation(mapNumber = null) {


  status = "BEGINING"
  const name = nameElement.value

  if (difficulty  !== "notSelected" && name.length > 0) {

    let dataStorage = JSON.parse(localStorage.getItem('players'))
    dataStorage = dataStorage.map(playerData => Object.assign(new Player(), playerData));

     let player = dataStorage.find(x => x.name === name);

    if (player === undefined) {
      player = new Player(name)
      dataStorage.push(player)
     }

    localStorage.setItem('players',JSON.stringify(dataStorage))

    const randomNum = Math.floor(Math.random() * 5);
    if (mapNumber == null) {
      mapInd = randomNum;
     }
    else {
      mapInd = mapNumber;
     }


    playerName = player.name

    const bestTime = player.bestScore(difficulty,mapInd).time

    mapDifficultyElement.innerHTML = difficulty
    MapNumberElement.innerHTML = mapInd

    ElapseTimeElement.innerHTML = "notStartedYet"
    bestTimeElement.innerHTML = (bestTime != undefined)? bestTime : "haven't WON on this map yet" ;
    playerNameElement.innerHTML = player.name
    statusELement.innerHTML = status


    createBoard(matrix,matrixSize,levelData[difficulty][mapInd])
    mapDrawer()
    leaderboardDrawer(player,difficulty,mapInd,dataStorage);


    addBoardListeners();


    return true
  }
  return false
}



function leaderboardDrawer(player, difficulty, mapInd, global) {



  const filteredPlayer = player.scores.filter(score => score.difficulty === difficulty && score.mapInd === mapInd ).sort((x,y) => x.time - y.time )

  const selfBegining =`<table><tr><th>${player.name.toUpperCase()}</th><th>WIN-TIME</th><th>DATE</th></tr>`

  const selfMiddle = filteredPlayer.map( (each,counter) => `<tr><th>${counter+1}</th><td>${each.time}</td><td>${each.date}</td><tr>` ).join("");

  const selfEnd = "</table>";

  selfLeaderBoardElement.innerHTML =`${selfBegining}${selfMiddle }${selfEnd}`


  const filterGlobal = global.filter(player => player.scores.some( s => s.difficulty === difficulty && s.mapInd === mapInd ) ).sort((x,y) => x.bestScore(difficulty,mapInd).time - y.bestScore(difficulty,mapInd).time )

  const globalBegining =`<table><tr><th>GLOBAL</th><th>NAME</th><th>WIN-TIME</th><th>DATE</th><t>`

  const globalMiddle = filterGlobal.map( (player,counter) => `<tr><th>${counter+1}</th><td>${player.name}</td><td>${player.bestScore(difficulty,mapInd).time}</td><td>${player.bestScore(difficulty,mapInd).date}</td><tr>`).join("")


  const globalEnd = "</table>";

  globalLeaderBoardElement.innerHTML = `${globalBegining}${globalMiddle }${globalEnd}`



}


function mapDrawer() {

  // data

  const cellSize = 400 / matrixSize;

  // draw table
  let tableHTML = `<table class="styled-table" id="game-table">`;

  for (let rowInd = 0; rowInd < matrix.length; rowInd++) {
    tableHTML += `<tr data-id="${rowInd}">`;

    for (let colInd = 0; colInd < matrix[rowInd].length; colInd++) {

      const y = matrix[rowInd][colInd];

      let baseClass = y.constructor.name.toLowerCase(); // e.g., "mountain", "bridge", "empty"

      let rotation = y.direction

      // Add `_curve` if it's a corner
      if (y === "empty" && y.isCurve) {
        baseClass += '_curve';
        rotation = y.curveDirection
       }

      // Add `_railed` if it's railed
      const className = `${baseClass}${y.railed ? '_railed' : ''}`;


      // Build the cell HTML with the constructed class name
      tableHTML += `<td class="styled-cell ${className}" data-id="${colInd}" style="width: ${cellSize}px; height: ${cellSize}px; transform: rotate(${rotation});"></td>`;
    }

    tableHTML += `</tr>`;
  }

  tableHTML += `</table>`;
  boardElement.innerHTML = tableHTML;

  // draw for game-info


}



/////////////////////////////////////////////////////////////////////////// CLIENT SIDE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// client side functions



function delagate(parent,eventType,selector,handler) {

  parent.addEventListener(eventType,function (event) {

    const targetElement = event.target.closest(selector);

    if ( parent.contains(targetElement)) {

      handler.call(targetElement, event);

    }

  })

}


delagate(document.querySelector("#difficulty-section"), "click", "button", changeDif);


function changeDif(event) {

 const myElement = event.target
  if (myElement != null) {


    if (myElement == easyElement) {
      easyElement.style.backgroundColor = "#d7dbc8";
      hardElement.style.backgroundColor = "#e9eddb";
    }
    if (myElement == hardElement) {
      easyElement.style.backgroundColor = "#e9eddb";
      hardElement.style.backgroundColor= "#d7dbc8";
    }

    matrixSize = parseInt(myElement.innerHTML);
    difficulty  = (matrixSize === 5) ? "EASY" : "HARD" ;


  }

}

startElement.addEventListener("click", revealGame);
rulesElement.addEventListener("click", revealRules);

function revealGame() {

  let checkData = (localStorage.getItem('players'))
if ( checkData === null ) {
  localStorage.setItem("players", JSON.stringify([new Player("admin")]))
  checkData = JSON.parse(localStorage.getItem('players'))
}


  if (initialazation()) {
    // Hide the menu screen
    document.querySelector('.menu-container').style.display = 'none';

    // Show the game screen
    document.getElementById('game-screen').style.display = 'block';
   }

}

function revealRules() {

 ruleTextElement.innerHTML = rules;

  if (ruleTextElement.hasAttribute("hidden")) {
    ruleTextElement.removeAttribute("hidden");
  }
  else {
    ruleTextElement.setAttribute("hidden","");
   }


}


function newMap(event) {

   currentPosition = null;
   prevPosition = null;
   nextPosition = null;

   beginingPosition = null;

  const nextMap = event.target.innerHTML;
    (nextMap === "random") ? initialazation() : initialazation(mapInd) ;
    statusELement.style.color = "rgb(190, 148, 23)";

}

function timechange() {
  if (status === "WON" || status === "LOST" || status === "BEGINING" ) { return }
  const  endTime = performance.now()
  const elapsedTime = parseInt( (endTime - startTime) / 1000 );

  ElapseTimeElement.innerHTML = elapsedTime

  requestAnimationFrame(timechange);
}




function updateCell(i, j) {
  const cellElement = document.querySelector(`#game-table tr[data-id="${i}"] td[data-id="${j}"]`);

  if (cellElement) {
    const cellData = matrix[i][j];
    let baseClass = cellData.constructor.name.toLowerCase(); // e.g., "mountain", "bridge", "empty"
    let rotation = cellData.direction;

    // Handle curved cells and other properties
    if (cellData instanceof Empty && cellData.isCurve) {
      baseClass += '_curve';
      rotation = cellData.curveDirection;
    }

    const className = `${baseClass}${cellData.railed ? '_railed' : ''}`;
    cellElement.className = `styled-cell ${className}`;
    cellElement.style.transform = `rotate(${rotation})`;
  }
}




///////////////////////////////////////////////////////////// MAIN GAME  FUNCTIONS




function ijCoord(td) {
  const j = td.cellIndex
  const tr = td.parentNode
  const i = tr.sectionRowIndex

  return {i,j}
}


function startGame(event) {

  event.preventDefault(); // for the bug of draging stop sign thingy :D

  startTime = performance.now()

  const { i, j } = ijCoord(event.target)

  console.log("this is the start", i, j)


  const firstPos = matrix[i][j]

  if (!(firstPos instanceof Lake)) {

    beginingPosition = firstPos
    currentPosition = beginingPosition

    status = "RUNNING"
    statusELement.innerHTML = status;
    statusELement.style.color = "blue";

    boardElement.addEventListener("mouseover", inGame);
    boardElement.addEventListener("mouseleave", leaveLose);


    timechange()
  }

}

function leaveLose(event) {

  finishedGame(event)


}

function bugChecker(i,j) {
  if (prevPosition != null) {

    const prevI = prevPosition.position.i
    const prevJ = prevPosition.position.j


    const nextI = nextPosition.position.i
    const nextJ = nextPosition.position.j


    if ( (prevI === i && prevJ === j ) || (nextI == i && nextJ == j) )
    {
      console.log("repated action")
      return true; // Skip processing if we are still on the same cell
    }


   }
   return false
}



function inGame(event) {

  if (event.target.matches("td")) {

    const { i, j } = ijCoord(event.target)

    if (bugChecker(i,j)) {
      return; //skip because of  moveover bug
     }


    nextPosition = matrix[i][j]

    railPrev(prevPosition, nextPosition, currentPosition)


    if (isWon(beginingPosition, nextPosition, matrix)) {

      status = "WON"
      statusELement.innerHTML = status;
      statusELement.style.color = "green";

      finishedGame(event)

     }
    else if (isLost(currentPosition,nextPosition,matrix)) {


      status = "LOST"
      statusELement.innerHTML = "LOST";
      statusELement.style.color = "red";


      finishedGame(event)

     }

     prevPosition = currentPosition
     currentPosition = nextPosition

  }


}



function finishedGame(event) {

  const { i, j } = ijCoord(event.target)

  const  endTime = performance.now()
  const elapsedTime = parseInt( (endTime - startTime) / 1000 );

  ElapseTimeElement.innerHTML = elapsedTime

  console.log("last index was", i, j)

  if (status == "WON") {

    let dataStorage = JSON.parse(localStorage.getItem('players'))
    dataStorage = dataStorage.map(playerData => Object.assign(new Player(), playerData));

    const player = dataStorage.find(x => x.name === playerName);


    addWon(player, difficulty, mapInd, elapsedTime);


    bestTimeElement.innerHTML = player.bestScore(difficulty, mapInd).time;
    leaderboardDrawer(player,difficulty,mapInd,dataStorage);

    localStorage.setItem('players', JSON.stringify(dataStorage))

  }
  else {

    status = "LOST"
    statusELement.innerHTML = "LOST";
    statusELement.style.color = "red";

   }


  boardElement.removeEventListener("mouseover", inGame)
  boardElement.removeEventListener("mouseleave", leaveLose)
  removeBoardListeners();

}



function handleMouseDown(event) {
  if (event.target.matches("td")) {
    startGame(event);
  }
}

function handleMouseUp(event) {
  if (event.target.matches("td")) {
    finishedGame(event);
  }
}


function addBoardListeners() {
  boardElement.addEventListener("mousedown", handleMouseDown);
  boardElement.addEventListener("mouseup", handleMouseUp);
  randomMapElement.addEventListener("click", newMap);
  refreshMapElement.addEventListener("click", newMap);
  exithMapElement.addEventListener("click", () => { location.reload() })
}


function removeBoardListeners() {
  boardElement.removeEventListener("mousedown", handleMouseDown);
  boardElement.removeEventListener("mouseup", handleMouseUp);
}










function railPrev(prev,next,current) {

  let realPrev = prev
  let realNext = next
  let realCurrent = current

  if (realPrev == null) {
    realCurrent = beginingPosition

   }

  const corners =
    [
      matrix[0][0],
      matrix[matrix.length - 1][0],
      matrix[0][matrix.length - 1],
      matrix[matrix.length - 1][matrix.length - 1]
    ]


    if ((realCurrent instanceof Empty) && corners.includes(realCurrent)) {


      realCurrent.isCurve = true
      realCurrent.railed = true

      switch (realCurrent) {

          case corners[0]:
            realCurrent.curveDirection = Direction.RIGHTxDOWN
          break;

          case corners[1]:
            realCurrent.curveDirection = Direction.UPxRIGHT
          break;

        case corners[2]:
          realCurrent.curveDirection = Direction.DOWNxLEFT

          break;

          case corners[3]:
            realCurrent.curveDirection = Direction.LEFTxUP
          break;
      }

    }

    else if (realCurrent instanceof Empty && !(corners.includes(realCurrent)) ) {

      const ijCalc = (realPrev != null) ? directionCalc(realPrev, realNext) : directionCalc(realCurrent, realNext);

              if (ijCalc === "0,1" || ijCalc === "1,0") {

                realCurrent.direction = ijToDirection[ijCalc]
              }

        else {


          let reverseDeg = `${360 - parseInt(ijToDirection[ijCalc])}deg`

           if (parseInt(reverseDeg) == 180) { reverseDeg = "0deg" }
           if (parseInt(reverseDeg) == 360) { reverseDeg = "180deg" }

          const direction = (isCustom(realPrev, realCurrent, realNext)) ? ijToDirection[ijCalc] : reverseDeg;

          // console.log(direction)

          realCurrent.isCurve = true
          realCurrent.curveDirection = direction
        }
        realCurrent.railed = true
    }
    else {
      realCurrent.railed = true
    }

  updateCell(realCurrent.position.i, realCurrent.position.j)
  //mapDrawer()

}


