//RNG
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var fight = function(opponent) {
    while(opponent.health > 0 && playerData.hp > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you wish to skip the fight?");
    
            // yes / true then leave
            if (confirmSkip) {
                window.alert(playerData.name + " has decided to skip this fight. Goodbye!");
                //remove money as a penalty
                playerData.money = playerData.money - 10;
                console.log("playerData.money", playerData.money);
                break;
            }
        }
    
        // hp update when player attacks
        var damage = randomNumber(playerData.attack -3, playerData.attack);
        opponent.health = Math.max(0, opponent.health - damage);
        console.log(
            playerData.name + " attacked " + opponent.name + ". " + opponent.name + " now has " + opponent.health + " health remaining."
        );

        //opponent alive check
        if (opponent.health <= 0) {
            window.alert(opponent.name + " has died!");
            playerData.money = Math.max(0, playerData.money - 15);
            break;
        } else {
            window.alert(opponent.name + " still has " + opponent.health + " health remaining.");
        }

        // opponent retaliates the players attack
        var damage = randomNumber(opponent.attack - 3, opponent.attack);
        playerData.hp = Math.max(0, playerData.hp - damage);
        console.log(
            opponent.name + " attacked " + playerData.name + ". " + playerData.name + "now has " + playerData.hp + " health remaining."
        );

        //player alive check
        if (playerData.hp <=0) {
            window.alert(playerData.name + " has died!");
            break;
        } else {
            window.alert(playerData.name + " still has " + playerData.hp + " health remaining.");
        }
    }
};

var playerData = {
    name: window.prompt("Name your character!"),
    hp: 400,
    attack: 30,
    money: 100,
    reset: function() {
        this.hp = 400;
        this.attack = 30;
        this.money = 100;
    },
    refillHP: function() {
        if (this.money >= 10) {
            window.alert("Restoring player's hp by 25 for 10 money.");
            this.hp += 25;
            this.money += 10;
        } else {
            window.alert("You do not have enough money!");
        }
        
    },
    boostAttack: function() {
        if (this.money >= 15) {
            window.alert("Boosting player's attack by 5 for 15 money!");
            this.attack += 5;
            this.money += 15;
        } else {
            window.alert("You do not have enough money!");
        }
    }
};

var opponentData = [
    {
        name: "Gus",
        attack: randomNumber(17,21)
    },
    {
        name: "Joe",
        attack: randomNumber (19,24)
    },
    {
        name: "Mike",
        attack: randomNumber (11,13)
    }
];

// Start Game

var startGame = function() {
    //reset stats
    playerData.reset();

    for(var i = 0; i < opponentData.length; i++) {
        if (playerData.hp > 0) {
            window.alert("Welcome to the Battle Games! Round " + ( i + 1 ));
            var pickedOpponentObj = opponentData[i];
            pickedOpponentObj.health = randomNumber(200, 360);
            fight(pickedOpponentObj);
            // not on last opponent
            if (playerData.hp > 0 && i < opponentData.length - 1) {
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
    if (playerData.hp > 0) {
        window.alert("Great job, you survived the Battle Game! Your score is " + playerData.money + ".");
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
            playerData.refillHP();
            break;
        
        case "BOOST":
        case "boost":
            playerData.boostAttack();
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