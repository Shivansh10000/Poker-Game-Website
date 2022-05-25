import Deck from "./deck.js"

const CARD_VAL_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}

const handpower = {
  0 : "High Card",
  1 : "Pair",
  2 : "2 Pair",
  3 : "3 of a Kind",
  4 : "Straight",
  5 : "Flush",
  6 : "Full House",
  7 : "Quads"
}
//we'll assign a value to the hand and get the combination name using this

let cmaptimesseen = new Map([[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0]])
let pmaptimesseen = new Map([[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0]])

let cmapsuits = new Map([["♠", 0], ["♣", 0], ["♥", 0], ["♦", 0]]);
let pmapsuits = new Map([["♠", 0], ["♣", 0], ["♥", 0], ["♦", 0]]);





//use get to use local storage for these variables

const cardSlot = document.querySelectorAll('.card-slot')
let betamount = 0, extraAmount = 0, credits = 5000;
credits = Number(localStorage.getItem("localcreds1"));

if(credits < 100)
{
  credits = 5000;
  localStorage.setItem("localcreds1", credits);
}
let betamountstr;
let i;
let round = 1;
let result = 0;
let comppair = 0, playerpair = 0;
let cmax = 0, pmax = 0;
let cpower = [0,0,0,0,0,0,0,0];
let ppower = [0,0,0,0,0,0,0,0];
//here indexes represent power of the cards 0 -> high card, etc
//0 represents a loss
// let bgm = new Audio('bgm.mp3');

function showcredits() {
  document.getElementById("credits").innerHTML = "Remaining credits : " + credits;

}
function showround() {
  document.getElementById("round-info").innerHTML = "Round : " + round;
}
function getmax(a, b) {
  if (a > b) {
    return a;
  }
  else {
    return b;
  }
}

bgm.play();

if (round < 4) {
  setInterval(showcredits, 1000);
}

if (round < 4) {
  setInterval(showround, 1000);
}


const deck = new Deck()
deck.shuffle()
console.log(deck.cards)

for (i = 0; i < 7; i++) {
  cardSlot[i].appendChild(deck.cards[i].getHTML());
}

function getamount() {
  betamountstr = prompt("Enter the bet amount : ")
  betamount = betamount + Math.floor(betamountstr);
  if (betamount > credits) {
    alert("You dont have that many credits !")
    return;
  }
  credits = credits - betamountstr;
  alert("You have bet " + betamount + " in total");
}

function peek() {
  extraAmount = prompt("You need to give the dealer more than 50% of your total bet if you want to know 1 of computer's cards")
  if (extraAmount > (betamount / 2)) {
    alert("One of the computer's cards is : " + deck.cards[0].value + " of " + deck.cards[i].suit);
    credits = credits - extraAmount;
  }
  else {
    alert("The amount is not enough !");
  }
}



function proceed() {
  round++;
  const cardDiv = document.createElement("div")
  cardDiv.innerText = deck.cards[i].suit
  cardDiv.classList.add("card-slot", deck.cards[i].color)
  cardDiv.dataset.value = `${deck.cards[i].value} ${deck.cards[i].suit}`
  document.getElementById("tablebox").appendChild(cardDiv);
  i++;
  if (round == 3) {
    //create a win percentage block here
    for (let counter = 0; counter < 52; counter++) {
      console.log(deck.cards[counter])
    }
  }
  if (round > 3) {
    result = 0;
    //first 2 cards are for computer (index 0 and 1)
    //cards at index 5 and 6 are for player
    //cards at index (2,3,4) are first 3 cards on table and(7,8) are last 2
    //first we calculate power of computer's hand
    // if (deck.cards[0].value == deck.cards[1].value) {
    //   comppair++;
    // }
    // if (deck.cards[0].suit == deck.cards[1].suit) {
    //   compflush++;
    // }
    // cmaptimesseen[CARD_VAL_MAP[deck.cards[0].value]]++;
    // cmaptimesseen[CARD_VAL_MAP[deck.cards[1].value]]++;

    for (let somevar = 0; somevar < 5; somevar++) {
      cmaptimesseen.set(CARD_VAL_MAP[deck.cards[somevar].value], cmaptimesseen.get(CARD_VAL_MAP[deck.cards[somevar].value]) + 1)
      cmapsuits.set(deck.cards[somevar].suit, cmapsuits.get(deck.cards[somevar].suit) + 1);
    }
    for (let somevar = 7; somevar < 9; somevar++) {
      cmaptimesseen.set(CARD_VAL_MAP[deck.cards[somevar].value], cmaptimesseen.get(CARD_VAL_MAP[deck.cards[somevar].value]) + 1)
      cmapsuits.set(deck.cards[somevar].suit, cmapsuits.get(deck.cards[somevar].suit) + 1);
    }

    cmax = 0;
    cmaptimesseen.forEach(function(value, key) {
      if(value > 0)
      {
        if(key > cmax)
        {
          cmax = key;
        }
      }
    })
    cpower[0] = 1;
    comppair = 0;
    let pairkey = -1;
    let currvalue = 0;
    let rowcount = 0;
    cmaptimesseen.forEach(function(value,key) {
      if(value == 2)
      {
        comppair++;
        cpower[1] = 1;
        pairkey = key;
        //this means that this combination is successfully found in the deck
      }
      if(comppair == 2)
      {
        cpower[2] = 1;
      }
      if(value == 3)
      {
        cpower[3] = 1;
      }
      //write for 5 in a row
      if(value >= 1)
      {
        if(rowcount == 5)
        {
          cpower[4] = 1;
        }
        if(currvalue == 0)
        {
          currvalue = key;
          rowcount++;
        }
        else if(key == currvalue + 1)
        {
          currvalue = key;
          rowcount++;
        }
        else {
          rowcount = 0;
          currvalue = 0;
        }
        
      }
      //the one for flush combo is written below this loop
      if(value == 3 && cpower[1] == 1)
      {
        if(pairkey != key)
        {
          cpower[6] = 1;
        }
      }
      if(value == 4)
      {
        cpower[7] = 1;
      }
    })

    let flushsuit = "0";
    cmapsuits.forEach(function(value,key) {
      if(value == 5)
      {
        cpower[5] = 1;
        flushsuit = key;
      }
    })

    let maxindex = -1;

    for(let it = 0; it < 8; it++) {
      if(cpower[it] == 1)
      {
        if(it > maxindex)
        {
          maxindex = it;
        }
      }
    }

    //player calc

    for (let somevar = 2; somevar < 9; somevar++) {
      pmaptimesseen.set(CARD_VAL_MAP[deck.cards[somevar].value], pmaptimesseen.get(CARD_VAL_MAP[deck.cards[somevar].value]) + 1)
      pmapsuits.set(deck.cards[somevar].suit, pmapsuits.get(deck.cards[somevar].suit) + 1);
    }

    pmax = 0;
    pmaptimesseen.forEach(function(value, key) {
      if(value > 0)
      {
        if(key > pmax)
        {
          pmax = key;
        }
      }
    })
    ppower[0] = 1;
    playerpair = 0;
    let ppairkey = -1;
    let pcurrvalue = 0;
    let prowcount = 0;
    pmaptimesseen.forEach(function(value,key) {
      if(value == 2)
      {
        playerpair++;
        ppower[1] = 1;
        ppairkey = key;
      }
      if(playerpair == 2)
      {
        ppower[2] = 1;
      }
      if(value == 3)
      {
        ppower[3] = 1;
      }
      if(value >= 1)
      {
        if(prowcount == 5)
        {
          ppower[4] = 1;
        }
        if(pcurrvalue == 0)
        {
          pcurrvalue = key;
          prowcount++;
        }
        else if(key == pcurrvalue + 1)
        {
          pcurrvalue = key;
          prowcount++;
        }
        else {
          prowcount = 0;
          pcurrvalue = 0;
        }
        
      }
      //the one for flush combo is written below this loop
      if(value == 3 && ppower[1] == 1)
      {
        if(ppairkey != key)
        {
          ppower[6] = 1;
        }
      }
      if(value == 4)
      {
        ppower[7] = 1;
      }
    })

    let pflushsuit = "0";
    pmapsuits.forEach(function(value,key) {
      if(value == 5)
      {
        ppower[5] = 1;
        pflushsuit = key;
      }
    })

    let pmaxindex = -1;

    for(let it = 0; it < 8; it++) {
      if(ppower[it] == 1)
      {
        if(it > pmaxindex)
        {
          pmaxindex = it;
        }
      }
    }


    console.log("Computer Results : ")
    console.log(cmax);
    console.log(comppair);
    console.log(cmaptimesseen);
    console.log(cmapsuits);
    console.log(cpower);
    console.log(handpower[maxindex]);

    console.log("Player Results : ")
    console.log(pmax);
    console.log(playerpair);
    console.log(pmaptimesseen);
    console.log(pmapsuits);
    console.log(ppower);
    console.log(handpower[pmaxindex]);

    if(pmaxindex > maxindex)
    {
      result = 1;
    }
    else if(maxindex > pmaxindex)
    {
      result = -1;
    }

    if(result == 1)
    {
      credits = credits + (betamount * 2);
    }

    if(result == 0)
    {
      if(cmax > pmax)
      {
        result = -1;
      }
      else if(pmax > cmax)
      {
        result = 1;
        credits = credits + (betamount * 2);
      }
      else{
        credits = credits + betamount;
      }
      
    }

    console.log(result);

    localStorage.setItem("localcreds1", credits);
    localStorage.setItem("localbetamount", betamount);
    localStorage.setItem("localextraamount", extraAmount);
    localStorage.setItem("localcomphandpower", handpower[maxindex]);
    localStorage.setItem("localplayerhandpower", handpower[pmaxindex]);
    localStorage.setItem("localresult", result);
    location.replace("results.html");
  }
}



document.getElementById("betamount").onclick = function () { getamount() };

document.getElementById("peek").onclick = function () { peek() };

document.getElementById("proceed").onclick = function () { proceed() };


