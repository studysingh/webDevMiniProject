// Make Object to relate html and javascript
let player = {
  endDisappear : document.querySelector("#endDisappear") ,
  restart : document.querySelector("#onRestart") ,
  body : document.querySelector("#main") ,
 changeText : document.querySelector("#asking"),
 showCard : document.querySelector("#cardNo"),
 cardSum : document.querySelector("#cardSum"),
 myName : document.querySelector("#myName"),
 score : document.querySelector("#score"),
 cards : [] ,
 lives : 10 ,
 showLives : document.querySelector("#life") ,
 foundCards : [] ,
 sum : 0 ,
 isAlive : true ,
 scores : 0
}

//Making cards array
for(let i=1;i<14;i++){
  player.cards.push(i);
}

//Making Default Name
let naming = [];
let ch = 'A';
        // adding alphabets
for(let idx = 0 ; idx<26 ; idx++){
  naming[idx] = ch;
  let asc = ch.charCodeAt();
  asc++;
  ch = String.fromCharCode(asc);
}
        // addding numbers
for(let idx = 0 ; idx <10 ; idx++){
  naming.push(idx);
}

        // making name
let str = "";
for(let idx = 0; idx < 6;idx++){
  let chIdx = Math.floor(Math.random()*naming.length);
  let ch = naming[chIdx];
  str+=ch;
}
        // prompt name
let x = prompt("Enter your name" , str);
player.myName.innerHTML = "Name : "+x;

// starting the game
function startGame(){
    if(player.sum!=0){
        return;
    }
    player.showLives.innerHTML = "❤️ "+player.lives;
    player.isAlive = true;
    // Taking first card
    let cardIDX = Math.floor(Math.random()*player.cards.length);
    player.foundCards.push(player.cards[cardIDX]);
    // finding player.sum and changing text
    player.sum = player.foundCards[0]; 
    player.showCard.innerHTML = "Cards : " + player.foundCards[0];
    player.cardSum.innerHTML = "Sum : " + player.sum;
    checkCondition();
}
//Picking the new card
function newCard() {
    if(player.sum===0){
        player.changeText.innerHTML="Start the game first ";
        return;
    }
    if(player.isAlive === false){
        return;
    }
    // finding elements;
    player.foundCards.push(player.cards[Math.floor(Math.random()*player.cards.length)]);
    // /Calculating player.sum
    player.sum = 0;
    for(let idx = 0; idx<player.foundCards.length;idx++){
        player.sum+=player.foundCards[idx];
    }
    //Changing text
  player.showCard.innerHTML = "Cards : ";
  for(let j=0;j<player.foundCards.length;j++){
    player.showCard.innerHTML+=player.foundCards[j]+" ";
  }
  player.cardSum.innerHTML = "Sum : "+player.sum;
  checkCondition();
}

// Checking Condition of win/lose
function checkCondition() {
  if (player.sum < 21) {
    player.changeText.innerHTML = "Add a new card !➕";
    player.isAlive = true;
  } else if (player.sum === 21) {
    player.changeText.innerHTML = "Awesome , You have won the game ! 👌";
    player.isAlive = false;
    player.scores++;
    player.score.innerHTML = "$"+player.scores;
  } else {
    player.changeText.innerHTML = "You are out of game ☹️";
    player.isAlive = false;
  }
  restart();
}

//Replay the game
function replay() {
  player.lives--;
  player.showLives.textContent = "❤️ "+player.lives;
  player.showCard.innerHTML = "Cards :";
  player.cardSum.innerHTML = "Sum :";
  player.changeText.innerHTML = "Want to play a round ? ";
  // Emptying the player.foundCards array
  player.sum = 0;
  let empty = player.foundCards.length-1;
  while(empty!=-1){
    player.foundCards.pop();
    empty--;
  }
  restart();
}

function restart(){
  if(player.lives < 0){
    a = `Your Score is ${player.scores} .` +  `<a href="blackjack.html" > Restart</a>`;
    player.endDisappear.innerHTML = "";
    player.restart.innerHTML = a;
  }
}

