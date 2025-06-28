import { Player, selfLeaderBoard, Position, Field, Lake, Empty, Mountain, Bridge } from './classes.js';

import { Direction, ijToDirection, levelData } from './utilities.js';


  export function createBoard(matrix, matrixSize, fieldsList) {
    matrix.length = 0;

    for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
    for (let j = 0; j < matrixSize; j++) {
      matrix[i][j] = new Empty(new Position(i,j),false);
    }
    }

    for (const field of fieldsList) {

        const createdField = createField(field.type, field.i, field.j,
        field.railed || false, field.direction || null);
        matrix[field.i][field.j] = createdField

    }

  }


  function createField(type, i, j, railed, direction) {
    const position = new Position(i, j);

    switch (type) {
      case "M":
        return new Mountain(position, railed, direction);
      case "B":
        return new Bridge(position, railed, direction);
      case "L":
        return new Lake(position);
      default:
        throw new Error("Unknown field type");
    }
  }

  export function directionCalc(prev,next) {


    const prevI = prev.position.i
    const prevJ = prev.position.j

    const nextI = next.position.i
    const nextJ = next.position.j

    const iDiff = nextI - prevI
    const jDIff = nextJ - prevJ

    if (iDiff === 0) {
      return "0,1"
    }
    if (jDIff === 0) {
      return "1,0"
     }

    const direction = `${iDiff},${jDIff}`

    return direction
  }



  export function isCustom(prev, current, next)
  {


    const prevI = prev.position.i;
    const prevJ = prev.position.j;

    const curI = current.position.i;
    const curJ = current.position.j;

      const nextI = next.position.i
      const nextJ = next.position.j

      const moveDirection = {

        "0,-1": "LEFT",
        "0,1": "RIGHT",
        "-1,0": "UP",
        "1,0": "DOWN",

      };

    const z = {

      "1,1,j": false,
      "1,1,i": true,

      "-1,-1,j": false,
      "-1,-1,i": true,

      "1,-1,i" : true,
      "1,-1,j": false,

      "-1,1,i" : true,
      "-1,1,j": false,

    };

    // const firstMovement = moveDirection[`${curI - prevI},${curJ - prevJ}`];
    // const secondMovement = moveDirection[`${nextI - curI},${nextJ - curJ}`];
    // const movement = `${firstMovement}x${secondMovement}`
    // console.log(movement)

    const newVar = (curJ - prevJ == 0 && curI != prevI) ? ",i" : ",j";

    const direction = `${nextI - prevI},${nextJ - prevJ}`

    const res = `${direction}${newVar}`

    //  console.log(res)

    // console.log(z[res])

    return z[res]
  }


 export function addWon(player,difficulty,mapInd,time) {

   const now = new Date()

   const nowDate = now.toLocaleDateString()
   const nowTime = now.toLocaleTimeString()

   const dateAndTime = `${nowDate},${nowTime}`
   player.addScore(difficulty, mapInd, time,dateAndTime);

 }


  export function isWon(begining,next,matrix) {


    const firstCondition = matrix.every(row => row.every( column => (column instanceof Lake )|| column.railed) )
    // console.log(firstCondition)

    const secondCondition = (next === begining)
    // console.log(secondCondition)


    return firstCondition && secondCondition
  }



export function isLost(current, next, matrix) {


  if (isOutOfBound(next.position, matrix.length)) {
    console.log("out of bound")
    return true
  }

  else if (next instanceof Lake) {
    console.log("LAKE")
    return true
  }
  else if (next.railed) {
    console.log("railed")
    return true
  }

  else if (next instanceof Mountain) {

    const available = availableDegreesForMountain(current.position, next.position)
    let result = null
    try {
     result  = available.includes(next.direction)
     }catch {}


    return !(result)
  }

  else if (next instanceof Bridge) {

    const available = availableDegreesForBridge(current.position, next.position)

    return !(next.direction == available)

  }

  else if (current instanceof Bridge) {

    return !(exitForBridge(current,next, matrix))

  }
  else if (current instanceof Mountain) {

    return !(exitForMountain(current,next,matrix))

   }



     return false
  }


  function availableDegreesForMountain(fromPosition, toPosition) {


    const { i: fromI, j: fromJ } = fromPosition;
    const { i: toI, j: toJ } = toPosition;

    if (toI > fromI && toJ === fromJ) {
      return [Direction.LEFTxUP, Direction.UPxRIGHT];
    } else if (toI < fromI && toJ === fromJ) {
      return [Direction.DOWNxLEFT, Direction.RIGHTxDOWN];
    } else if (toJ > fromJ && toI === fromI) {
      return [Direction.LEFTxUP, Direction.DOWNxLEFT];
    } else if (toJ < fromJ && toI === fromI) {
      return [Direction.RIGHTxDOWN, Direction.UPxRIGHT];
    }

    return null;


}

function availableDegreesForBridge(fromPosition, toPosition)
{

const { i: fromI, j: fromJ } = fromPosition;
const { i: toI, j: toJ } = toPosition;

  if (toJ === fromJ) { return Direction.UPxDOWN; }   // Vertical movement
  if (toI === fromI) { return Direction.LEFTxRIGHT; } // Horizontal movement


  return null;
}


  function exitForMountain(current,next,matrix)
  {
    const { i: currentI, j: currentJ } = current.position;

    let posibleNext = []

    switch (current.direction) {

      case Direction.RIGHTxDOWN:
        posibleNext =  [ matrix[currentI + 1][currentJ] , matrix[currentI][currentJ + 1] ]
        break;

        case Direction.DOWNxLEFT:
        posibleNext = [ matrix[currentI + 1][currentJ] , matrix[currentI][currentJ - 1] ]
        break;

        case Direction.LEFTxUP:
        posibleNext = [ matrix[currentI - 1][currentJ] , matrix[currentI][currentJ - 1] ]
        break;

        case Direction.UPxRIGHT:
        posibleNext =  [ matrix[currentI - 1][currentJ] , matrix[currentI][currentJ + 1] ]
        break;

    }

    return posibleNext.includes(next);
  }


function exitForBridge(current,next,matrix)
{
  const { i: currentI, j: currentJ } = current.position;

  let posibleNext = []

  if (current.direction == Direction.UPxDOWN) {
     posibleNext = [matrix[currentI + 1][currentJ], matrix[currentI - 1][currentJ]]
  }   // Vertical movement
  if (current.direction == Direction.LEFTxRIGHT) {
     posibleNext =  [ matrix[currentI][currentJ + 1], matrix[currentI][currentJ - 1] ]
  } // Horizontal movement

  // console.log(posibleNext.includes(next) )

  return posibleNext.includes(next)
}



function isOutOfBound(position, matrixSize) {
    if (position.i == undefined || position.j == undefined) { return true }
    else if ( position.i < 0 ||  position.i > matrixSize-1 || position.j < 0 || position.j > matrixSize-1) {
      return true
    }
    return false
  }


function readRules() {

  

}
