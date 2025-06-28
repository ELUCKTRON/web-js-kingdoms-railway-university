
export const Direction = Object.freeze({
  UPxRIGHT: '270deg',
  LEFTxUP: '180deg',
  DOWNxLEFT: '90deg',
  RIGHTxDOWN: '0deg',

   UPxDOWN: '0deg',
   LEFTxRIGHT : '90deg'
 });


export const ijToDirection = {

  "-1,-1":Direction.DOWNxLEFT,
  "1,1": Direction.UPxRIGHT,

  "-1,1":Direction.RIGHTxDOWN,
  "1,-1": Direction.LEFTxUP,

  "0,1" : Direction.LEFTxRIGHT,
  "1,0": Direction.UPxDOWN,
  "0,-1": Direction.LEFTxRIGHT,
  "-1,0": Direction.UPxDOWN,

};


export const levelData = {
  EASY: [
    [
      //e1
      { type: "M", i: 0, j: 1, direction: Direction.DOWNxLEFT },
      { type: "M", i: 2, j: 2, direction: Direction.LEFTxUP },
      { type: "M", i: 4, j: 2, direction: Direction.UPxRIGHT },

      { type: "B", i: 1, j: 3, direction: Direction.UPxDOWN },
      { type: "B", i: 2, j: 0, direction: Direction.UPxDOWN },

      { type: "L", i: 0, j: 4 },
      { type: "L", i: 1, j: 4 },
      { type: "L", i: 3, j: 3 }
    ],
    [
    //e2
      { type: "L", i: 0, j: 0 },
      { type: "L", i: 2, j: 1 },
      { type: "L", i: 3, j: 3 },

      { type: "B", i: 0, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 0, direction: Direction.UPxDOWN },

      { type: "M", i: 1, j: 1, direction: Direction.LEFTxUP },
      { type: "M", i: 2, j: 2, direction: Direction.UPxRIGHT },
      { type: "M", i: 1, j: 4, direction: Direction.LEFTxUP }

    ],
    [
    //e3
      { type: "L", i: 3, j: 1 },

      { type: "B", i: 0, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 1, j: 4, direction: Direction.UPxDOWN },
      { type: "B", i: 2, j: 2, direction: Direction.UPxDOWN },
      { type: "B", i: 4, j: 1, direction: Direction.LEFTxRIGHT },

      { type: "M", i: 2, j: 1, direction: Direction.LEFTxUP },
      { type: "M", i: 4, j: 4, direction: Direction.LEFTxUP }
    ],
    [
    //e4
      { type: "B", i: 0, j: 3, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 0, direction: Direction.UPxDOWN },

      { type: "L", i: 4, j: 2 },

      { type: "M", i: 4, j: 3, direction: Direction.UPxRIGHT },
      { type: "M", i: 2, j: 2, direction: Direction.DOWNxLEFT },
      { type: "M", i: 2, j: 4, direction: Direction.DOWNxLEFT }

    ],
    [
    //e5
      { type: "B", i: 0, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 0, direction: Direction.UPxDOWN },
      { type: "B", i: 3, j: 2, direction: Direction.UPxDOWN },

      { type: "L", i: 3, j: 3 },

      { type: "M", i: 1, j: 1, direction: Direction.RIGHTxDOWN },
      { type: "M", i: 2, j: 3, direction: Direction.UPxRIGHT },
      { type: "M", i: 4, j: 1, direction: Direction.LEFTxUP }

    ]

  ],
  HARD: [
    [
    //d1
      { type: "M", i: 0, j: 1, direction: Direction.DOWNxLEFT },
      { type: "M", i: 3, j: 3, direction: Direction.UPxRIGHT },
      { type: "M", i: 4, j: 0, direction: Direction.UPxRIGHT },
      { type: "M", i: 4, j: 2, direction: Direction.DOWNxLEFT },

      { type: "B", i: 0, j: 5, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 1, j: 0, direction: Direction.UPxDOWN },
      { type: "B", i: 2, j: 2, direction: Direction.UPxDOWN },
      { type: "B", i: 4, j: 4, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 6, j: 3, direction: Direction.LEFTxRIGHT },

      { type: "L", i: 0, j: 2 },
      { type: "L", i: 0, j: 3 },
      { type: "L", i: 4, j: 6 }
    ],
    [
    //d2
      { type: "M", i: 1, j: 5, direction: Direction.LEFTxUP },
      { type: "M", i: 3, j: 0, direction: Direction.RIGHTxDOWN },
      { type: "M", i: 4, j: 3, direction: Direction.DOWNxLEFT },
      { type: "M", i: 5, j: 1, direction: Direction.RIGHTxDOWN },

      { type: "B", i: 1, j: 0, direction: Direction.UPxDOWN },
      { type: "B", i: 1, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 6, direction: Direction.UPxDOWN },

      { type: "L", i: 0, j: 2 },
      { type: "L", i: 4, j: 1 },
      { type: "L", i: 6, j: 2 }
    ],
    [
    //d3
      { type: "M", i: 2, j: 2, direction: Direction.UPxRIGHT },
      { type: "M", i: 4, j: 2, direction: Direction.UPxRIGHT },
      { type: "M", i: 5, j: 5, direction: Direction.DOWNxLEFT },
      { type: "M", i: 6, j: 3, direction: Direction.UPxRIGHT },

      { type: "B", i: 0, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 1, j: 6, direction: Direction.UPxDOWN },
      { type: "B", i: 4, j: 4, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 5, j: 0, direction: Direction.UPxDOWN },

      { type: "L", i: 2, j: 0 },
      { type: "L", i: 4, j: 1 },
      { type: "L", i: 6, j: 2 }
    ],
    [
    //d4
      { type: "M", i: 1, j: 5, direction: Direction.LEFTxUP },
      { type: "M", i: 2, j: 2, direction: Direction.UPxRIGHT },
      { type: "M", i: 4, j: 2, direction: Direction.LEFTxUP },
      { type: "M", i: 4, j: 4, direction: Direction.DOWNxLEFT },
      { type: "M", i: 5, j: 5, direction: Direction.UPxRIGHT },

      { type: "B", i: 1, j: 3, direction: Direction.UPxDOWN },
      { type: "B", i: 3, j: 1, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 3, j: 5, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 5, j: 0, direction: Direction.UPxDOWN },

      { type: "L", i: 3, j: 3 },

    ],
    [
    //d5
      { type: "M", i: 1, j: 5, direction: Direction.RIGHTxDOWN },
      { type: "M", i: 2, j: 4, direction: Direction.DOWNxLEFT },
      { type: "M", i: 4, j: 2, direction: Direction.RIGHTxDOWN },
      { type: "M", i: 5, j: 1, direction: Direction.LEFTxUP },

      { type: "B", i: 2, j: 1, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 2, j: 2, direction: Direction.LEFTxRIGHT },
      { type: "B", i: 5, j: 3, direction: Direction.UPxDOWN },

      { type: "L", i: 4, j: 4 },

    ]
  ]
};

export const rules = `🚂 The Elucktron Kingdom's RailWay Network Rules 🚂

Welcome to the Elucktron Kingdom’s rail-building challenge! 🏰 You’re about to draw the ultimate railway network across the map. But remember, you’ve got to do it in one continuous loop—connecting every field that’s possible to rail. Here’s what you need to know before laying those tracks:

🚧 The Basics:
🔹 Your mission: Draw a seamless rail line that covers the entire map, looping back to your starting point, without missing any railable field.
🔹 The landscape includes 🏞 lakes, 🏔 mountains, 🌉 bridges, and 🌾 empty fields.
🔹 Empty fields can be railed in any direction—easy as pie 🥧.
🔹 Bridges 🌉 and mountains 🏔 have specific entry/exit points, so follow their rules!
🔹 Lakes 🌊 are unrailed, impassable, and will make you lose if you attempt to rail them. 🚫

🏆 Winning Condition:
Start from a point, rail every possible field, and return to your starting spot, forming a single continuous rail loop that hits every railable field. 🔄🚂

❌ Losing Conditions:
Oops! You’ll lose if you:

Hit a lake 🌊—don’t try, you can’t rail water! 💧
Cross into an already-railed field. 🚫
Wander outside the map bounds. 📍
Exit a bridge from a side (watch your step, or you’ll fall! 👀).
Enter a bridge from the side (same risk!). 🚧
Approach a mountain from an impassable direction (you’ll hit a wall 🧱).
Exit a mountain in the wrong direction (yep, wall collision 🚧).
🎉 The Best Part:
Don’t worry if you mess up! You can always refresh the map 🔄 and try again, or go for a random map 🎲 (who knows, it might be the same map—surprise! 😜).

Good luck, RailMaster—may your tracks be straight and your loop unbroken! 🚆✨
`;
