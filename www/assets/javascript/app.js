/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//First, we need variables for our scores of each player
//We also need a variable to know who is the active player.


var scores, roundScore, activePlayer, gamePlaying;

init();

//we start with 0 as player 1 and 1 will be player 2

//here we need a random number generated for the dice rolls. We just do Math.random()
//Math is the "package" and random is the "function." It gets us a random number between 1 and 6, so what we want to do is multiply Math.random by 6. We then need the Math.floor method to round this down to the nearest whole number.

//dice = Math.floor(Math.random()*6) +1;

//Now for som DOM Manipulation. We do this by first referencing the Document object.
//querySelector allows us to select elements from our web page. The most useful is 
//querySelector. It allows us to select stuff like we do in CSS. The only downside to it is that it selects the first object that it finds, but we will use a workaround for that. 

//Here, we use querySelectory to pick an element from our HTML file (in our case,
//we chose player one's score (score 0)) and then we add .textContent = dice; so that
//we can set the text of score-0 to the value in dice.
//We remove the 0 from current-0 because we want to set it up so that the dice value
//in the current turn updates under the proper player. If we remove the 0 and 
//concatenate "activePlayer," what will happen is that activePlayer will provide the proper ID number here (0 or 1) and it will be added to "current-" so that current will
//reflect the proper active player.

//Right here is one way to add the text to the "#current-" location, although 
//when using ".textContent =" you do not have the ability to format with HTML and add
//things like italics and bold. So, we can also do it the below way. Instead of using
//textContent, we use innerHTML and then create an "em" element and then concatenate
//dice and then close it. EM italicizes I think. One important note too is that 
//whenever you write HTML in you JS file, you need to put it in quotes so that JS
//knows it's reading HTML and not JS.


//document.querySelector("#current-"+ activePlayer).textContent = dice;
//ADD FORMATTING WITH HTML
//document.querySelector("#current-"+ activePlayer).innerHTML = "<em>" + dice + "</em>"; 

//Here we are just reading content and storing it into x.
//var x = document.querySelector("#score-0").textContent;
    
//Above, we have two types of items, Setters and Getters. Setters are things like line 
//48 where we are setting an element's value. Getters are things like line 53 where we are getting a value.

//Now we don't want our image of the die to be random, so we adjust this by setting the display property to none. To do this, we call on the element in our HTML page
//that is responsible for setting the image. We have to call it by its class, and 
//when calling something by its class in HTML, we need to use a . instead of a #. 
//the # is simply for the IDs.
//So, once we selec the .dice class to get the image element on the page, we then use
//.style to reference that we are adjusting the css, and then we use .display to send 
//a direction on what we want to display. In this case, we want nothing displayed so we type display = "none". "display" is the css property and "none" is the css value.


//set up event handler for the button that rolls the dice.
//once again, we use queryselector
//then we just add the event listener on
//it takes two arguments. First is the event. This happens to be "click". You can find all event
//options here https://developer.mozilla.org/en-US/docs/Web/Events. Again, the one we are using is "click". 
//This is specifically a "mouse" event, but there are lots of different kinds of events.
//The second argument is the function that will be called as soon as the event happens. We use this in 
//the event listener just as the name, no (). this is because we are not calling it. We are letting the 
//eventlistener call it. This is called a "call back" function.
//If we didn't want to have the function standalone before the eventlistener, we could write it 
//within the event listener in the second argument place, and then it would be called an "anonymous" function
//but in that case, it cannot be called anywhere else. That is what we'll do. the below function
//is just an example of what we'd write if we wanted to use it in other places. In this case though
//we only want the btn function in the eventlistener so we leave it anonymous.
/*
function btn(){
    //do something. we will fill this in.
}

btn();
*/

document.querySelector(".btn-roll").addEventListener("click", function(){
    //A state variable simple tells us the condition of a system. We use it when we need the program
    //to remember the state of something (like if the game is playing or not playing). So, we will
    //set one up here.
    if(gamePlaying){
        
    //1. Random Number. Remember, because of the scoping chain, we have access to the other variables defined 
    //within this function.
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";///because of type coercion, we can do this
    
    //3. Update the round score but only IF the rolled number was not a 1.
    if(dice !== 1){
        //add score to their round score
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    else{
        //Next Player
        //This is called the ternary operator. It is a sleeker way of writing an if statement. Use
        //it for short if statements that aren't complicated.
        nextPlayer();
        
    }
    
    }
});

    
document.querySelector(".btn-hold").addEventListener("click", function(){
    //1. Need to add current score to global score
    if(gamePlaying){
    
    scores[activePlayer] += roundScore;
    
    //2. Update user interface with the updated score
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
    
    //3. Check if user won the game/*
    if(scores[activePlayer] >= 100) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");  
        gamePlaying = false;
        
    } else{
        //4. Next player
        nextPlayer();
    }
}
    
    
});
    

//This function gets used in two places, so in an effort to not repeat ourselves, we write it once
//here and call it where it's needed instead of using it as an anonymous function just one time.
function nextPlayer(){
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
        //The "active" class in the player-0-panel is what makes the active player have a bold 
        //title and the shaded half. So, we used the classList operator so that it can remove the 
        //active class from this item. We will then need to add active to the other one. Instead of
        //doing an add and remove active like below shaded, we will instead use toggle so that it applies
        //active to the one that doens't have it and remove it from the one that does. We need to add
        //the toggle for BOTH of the items though obviously. Basically is says "if on, shut off, if off,
        //turn on." So if we had 10 players, we could make more distinct rule for it turning on and off
        //different players rather than having it univerally shut off for all but one or turn on for all but one.
        //document.querySelector(".player-0-panel").classList.remove("active")
        //document.querySelector(".player-1-panel").classList.add("active")
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
        
    document.querySelector(".dice").style.display = "none";

}



document.querySelector(".btn-new").addEventListener("click",init);


function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none";

    //Now we want to set the current values to zero to start. 
    //We will use the get document by ID function instead of queryselector.
    //It works faster thant querySelector but it can only be used for IDs
    //We also don't use the CSS style (the #) we just use the ID.
    //This initializes all numbers to 0 because you need 0 at the start of the game.
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");    
    
}








//A state variable simple tells us the condition of a system. We use it when we need the program
//to remember the state of something (like if the game is playing or not playing). So, we will
//set one up here.






    
    
    
    
    








 