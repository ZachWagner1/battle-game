var playerName = window.prompt("Name your character!");
var playerHP = 1000;
var playerAttack = 50;

var opponentName = "Gus"
var opponentHP = 350;
var opponentAttack = 15;

var playerMoney = 100;

var fight = function() {
    window.alert("Welcome to the Battle Games!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // FIGHT is chosen
    if (promptFight === "fight" || promptFight === "FIGHT") {
        // hp update when player attacks
        opponentHP = opponentHP - playerAttack;
        console.log(
            playerName + " attacked " + opponentName + ". " + opponentName + " now has " + opponentHP + " health remaining."
        );

        //opponent alive check
        if (opponentHP <= 0) {
            window.alert(opponentName + " has died!");
        }    
        else {
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
        }
        else {
            window.alert(playerName + " still has " + playerHP + " health remaining.");
        }

    // SKIP is chosen
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you wish to skip the fight?");

        // yes / true then leave
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //remove money as a penalty
        playerMoney = playerMoney - 10;
        }
        // no / ask again
        else {
            fight();
        }
        window.alert(playerName + " has chosen to skip the fight!");
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }   
};

fight();