var playerName = window.prompt("Name your character!");
var playerHP = 500;
var playerAttack = 50;
var playerMoney = 100;

var opponentNames = ["Gus", "Joe", "Mike"]
var opponentHP = 350;
var opponentAttack = 15;

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
        opponentHP = opponentHP - playerAttack;
        console.log(
            playerName + " attacked " + opponentName + ". " + opponentName + " now has " + opponentHP + " health remaining."
        );

        //opponent alive check
        if (opponentHP <= 0) {
            window.alert(opponentName + " has died!");
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(opponentName + " still has " + opponentHP + " health remaining.");
        }

        // opponent retaliates the players attack
        playerHP = playerHP - opponentAttack;
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

for(var i = 0; i < opponentNames.length; i++) {
    if (playerHP > 0) {
        window.alert("Welcome to the Battle Games! Round " + ( i + 1 ));
        var pickedOpponentName = opponentNames[i];
        opponentHP = 350
        fight(pickedOpponentName);
    } else {
        window.alert("You have lost your player in battle! Gamoe Over!");
        break;
    }
}