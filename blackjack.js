var deckofCards= new Array();
var playerHand= new Hand();
var dealerHand= new Hand();



function Card(suite, value){
  this.suite = suite;
  this.value = value;

 this.getName = function(){
   return this.suite + " " + this.value;
 }

 this.getScoreValue= function(){

   if(this.value === "J" || this.value === "Q" || this.value ==="K"){
     return 10;
   }
   else if(this.value ==="A") return 11;
   else return this.value;
  }
}

function Hand(){
  this.count = 0;
  this.score = 0;
  this.hand = [];

}


    function createDeck(){

      var suites = ["Spades", "Hearts", "Diamonds", "Clubs"];
      var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

       for (var i = 0 ; i < values.length; i++)
       {
           for(var j = 0; j < suites.length; j++){
              var cards= new Card(suites[j], values[i])
               /*console.log(cards);*/
               deckofCards.push(cards);
       }

       }
     }


 function shuffle(){
        for (var i = 0; i < 52; i++)
        {
            var a = Math.floor((Math.random() * deckofCards.length));
            var b = Math.floor((Math.random() * deckofCards.length));
            var tmp = deckofCards[a];
           deckofCards[a] = deckofCards[b];
           deckofCards[b] = tmp;

        }
    }

    function start(){
      createDeck();
      shuffle();
// create a deal button

    /*console.log(playerHand.score);*/

      draw(playerHand);
      draw(playerHand);
      draw(dealerHand);

      document.getElementById("players").innerHTML =  "Player has " + playerHand.hand[0].getName() + " and " + playerHand.hand[1].getName();
      document.getElementById("dealers").innerHTML = "Dealer has " + dealerHand.hand[0].getName();

      console.log("You have " + playerHand.hand[0].getName() + " and " + playerHand.hand[1].getName());
      console.log("Dealer has " + dealerHand.hand[0].getName());
      console.log("Your score is " + playerHand.score);
      console.log("Dealer's score is " + dealerHand.score);
      console.log("Do you want another card?");

    //  console.log(playerHand);
      //console.log(dealerHand);
  	}


function draw(player){
  /*var count =0;
  var score =0;*/
  var card = deckofCards.pop();
  var value = card.getScoreValue();

  if(value === 11)
  {
    if(player.score >= 11) value = 1;
  }

  player.hand.push(card);
  /*player.count ++;*/
  player.score = player.score + value;
 /*console.log(player.score);*/

}

// adds one more card to player's hand//
  function hit(){
    draw(playerHand);

    checkTheSituation();
 }


// adds one more card to dealer's hand//
 function stay(){
   draw(dealerHand);
    decideWinner();
   checkTheSituation();


 }

// checks the total score values in player's hand
function checkTheSituation(){

  if (playerHand.score> 21) {
  console.log("Player Busts! Player lost");
  endGame();
  } else if (playerHand.score === 21) {
  console.log("Player hit 21!");

  }
  else{
    console.log("Your score is now " + playerHand.score + " Do you want another card?");

  }
}


// by the rule, the game will end //
function endGame(){

  console.log("game ended");
}

// decides the winner between the players//
function decideWinner(){


  while (dealerHand.score <=17) {
    //stay();
console.log("Dealer's score is now " + dealerHand.score);

  }
    if (dealerHand.score > 21) {
    console.log("Dealer Busts! Dealer lost" );
      endGame();
  } else if (dealerHand.score === 21) {
        console.log("Dealer hit 21!");
      }
      else if (playerHand.score >dealerHand.score && playerHand.score < 22) {
        console.log("Player wins with " + playerHand.score + "! Dealer had " + dealerHand.score + ".");
        endGame();
      }
       else if (dealerHand.score > playerHand.score && dealerHand.score < 22) {
        console.log("Dealer wins with " + dealerHand.score + "! Player had " +   playerHand.score + ".");
        endGame();
      }


}
  //resets the game//
    function resetGame() {

      dealerHand.value = ''
      playerHand.value = ''

      dealerHand.deckofCards = [];
      playerHand.deckofCards= [];
      dealerHand.score = 0;
      playerHand.score = 0;

      console.log("press start to play again")
      shuffle();

    }
