import { Direction, ijToDirection, levelData } from './utilities.js';

export class Player {
  constructor(name) {
    this.name = name
    this.scores = []

  }

  addScore(difficulty, mapInd, time,date) {

    const score = new selfLeaderBoard(difficulty,mapInd,time,date);

    const filtered = this.scores.filter(x => x.difficulty === difficulty &&
      x.mapInd === mapInd
    )

    filtered.sort((x, y) => x.time - y.time)

    if (filtered.length === 10) {

      if (time < filtered[9].time) {

        const index = this.scores.findIndex( elem => elem === filtered[9])
        if (index !== -1) {
          this.scores.splice(index, 1);
          this.scores.push(score)
        }
      }
    }
    else
     {
      this.scores.push(score)
     }

   }

  bestScore(difficulty, mapInd) {

   const filtered = this.scores.filter(x => x.difficulty === difficulty &&
    x.mapInd === mapInd).sort( (x,y) => x.time - y.time )

   return (filtered.length != 0 )? filtered[0] : "notWonYet"
  }
}

export class selfLeaderBoard {
  constructor(difficulty,mapInd,time,date) {
    this.difficulty = difficulty
    this.mapInd = mapInd
    this.time = time
    this.date = date
  }
}

export class Position {
  constructor(i, j) {
    if (typeof i != 'number' || typeof j != 'number') {
      throw new TypeError(" i and j must be numbers ");
    }
    this.i = i;
    this.j = j;
  }
}

export class Field {
  constructor(position) {
    this.position = position
  }

  play(newDirection) {
    return false
   }
}

export class Lake extends Field {
  constructor(position) {
    super(position)
  }
  play(newDirection) {
    return false
  }

}

export class Empty extends Field{

  constructor(position, railed) {
    if (typeof railed != 'boolean') {
      throw new TypeError(" railed should be boolean ");
    }
    super(position);
    this.railed = railed;
    this.isCurve = false;
    this.direction = null
    this.curveDirection = null;
  }

  play(newDirection) {

    if (!this.railed) {
      this.railed = true
      this.direction = newDirection

      return true

    } else {
      return false
    }

   }



 }

 export class Mountain extends Field{
   constructor(position, railed, direction) {
    if (typeof railed != 'boolean') {
      throw new TypeError(" railed should be boolean ");
    }

    if (!Object.values(Direction).includes(direction)) {
      throw new TypeError("direction should be one of the predefined Direction values");
    }

    super(position);

    this.railed = railed;
    this.direction = direction;
   }

   play(newDirection) {

     if (!this.railed) {
       this.railed = true

       return true
     } else {
       return false
      }

   }
 }

 export class Bridge extends Field{
   constructor(position, railed, direction) {
    if (typeof railed != 'boolean') {
      throw new TypeError(" railed should be boolean ");
    }

    if (!Object.values(Direction).includes(direction)) {
      throw new TypeError("direction should be one of the predefined Direction values");
    }

     super(position);

    this.railed = railed;
    this.direction = direction;
   }

   play(newDirection) {

    if (!this.railed) {
      this.railed = true

      return true
    } else {
      return false
     }

  }
 }

