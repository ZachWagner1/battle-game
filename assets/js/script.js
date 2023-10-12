var playerName = window.prompt("Name your character!");
var playerHP = 500;
var playerAttack = 50;
var playerMoney = 100;

var opponentNames = ["Gus", "Joe", "Mike"]
var opponentHP = 350;
var opponentAttack = 15;

//RNG
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var fight = function(opponentName) {
    while(opponentHP > 0 && playerHP > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you wish to skip the fight?");
    
            // yes / true then leave
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //remove money as a penalty
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
    
        // hp update when player attacks
        var damage = randomNumber(playerAttack -3, playerAttack);
        opponentHP = Math.max(0, opponentHP - damage);
        console.log(
            playerName + " attacked " + opponentName + ". " + opponentName + " now has " + opponentHP + " health remaining."
        );

        //opponent alive check
        if (opponentHP <= 0) {
            window.alert(opponentName + " has died!");
            playerMoney = Math.max(0, playerMoney - 15);
            break;
        } else {
            window.alert(opponentName + " still has " + opponentHP + " health remaining.");
        }

        // opponent retaliates the players attack
        var damage = randomNumber(opponentAttack - 3, opponentAttack);
        playerHP = Math.max(0, playerHP - damage);
        console.log(
            opponentName + " attacked " + playerName + ". " + playerName + "now has " + playerHP + " health remaining."
        );

        //player alive check
        if (playerHP <=0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHP + " health remaining.");
        }
    }
};

// Start Game

var startGame = function() {
    //reset stats
    playerHP = 500;
    playerAttack = 50;
    playerMoney = 100;

    for(var i = 0; i < opponentNames.length; i++) {
        if (playerHP > 0) {
            window.alert("Welcome to the Battle Games! Round " + ( i + 1 ));
            var pickedOpponentName = opponentNames[i];
            opponentHP = randomNumber(40, 60);
            fight(pickedOpponentName);
            // not on last opponent
            if (playerHP > 0 && i < opponentNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over, do you wish to visit the store before the next round?");
                // yes
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your player in battle! Game Over!");
            break;
        }
    }
    endGame();
    startGame();
};

// End Game
var endGame = function () {
    // Win
    if (playerHP > 0) {
        window.alert("Great job, you survived the Battle Game! Your score is " + playerMoney + ".");
    } else {
        window.alert("You have lost in the Battle Game!");
    }

    // Play again?
    var playAgainConfirm = window.confirm("Do you wish to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing! Come again soon!");
    }
};

// Shop
var shop = function() {
    // ask what they want to do
    var shopOptionPrompt = window.prompt(
        "REFILL Hp, BOOST Attack, LEAVE. Enter: 'REFILL', 'BOOST', LEAVE' to select your choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 10) {
                window.alert("Refilling player's hp by 25 for 10 money.");
                playerHP = playerHP + 25;
                playerMoney = playerMoney - 10;
            } else {
                window.alert("Come back with more money!");
            }
                break;
        
        case "BOOST":
        case "boost":
            if (playerMoney >= 15) {
                window.alert("Boosting attack by 5 for 15 money.");
                playerAttack = playerAttack + 5;
                playerMoney = playerMoney - 15;
            } else {
                window.alert("Come back with more money!");
            }
                break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving store.");
            break;

        default:
            window.alert("You did not choose a valid option. Try again!");
            shop();
            break;
    }
};

startGame();