//Prototype for a fighter
function Fighter(name, hp, attackPower, counterAttack, cssIdentity){
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
    this.cssIdentity = cssIdentity;
    this.counterAttack = counterAttack;
}

//Create all the fighters
var wanKenobi = new Fighter("Obi-Wan Kenobi", 120, 10, 12, "wanKenobi");
var skywalker = new Fighter("Luke Skywalker", 100, 12, 14, "skyWalker");
var darthSidious = new Fighter("Darth Sidious", 140, 8, 10, "darthSidious");
var darthVader = new Fighter("Darth Vader", 160, 6, 8, "darthVader");
var nightKing = new Fighter("Night King", 1000, 1000, 1000, "nightKing");
var enemy, userCharacter, userAttackPower;

//Assign the user a character and enemy depending on which button the user clicks.
$(".wanKenobi").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = wanKenobi;
        moveUser(wanKenobi);
        $(".wanKenobi").prop("disabled", true);
    }
    else{
        enemy = wanKenobi;
        moveEnemy(enemy);
        $(".enemy").css("opacity", "1");
    }
});

$(".skyWalker").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = skywalker;
        moveUser(skywalker);
        $(".skyWalker").prop("disabled", true);
    }
    else{
        enemy = skywalker;
        moveEnemy(enemy);
        $(".enemy").css("opacity", "1");
    }
});

$(".darthSidious").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = darthSidious;
        moveUser(darthSidious);
        $(".darthSidious").prop("disabled", true);
    }
    else{
        enemy = darthSidious;
        moveEnemy(enemy);
        $(".enemy").css("opacity", "1");
    }
});

$(".darthVader").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = darthVader;
        moveUser(darthVader);
        $(".darthVader").prop("disabled", true);
    }
    else{
        enemy = darthVader;
        moveEnemy(enemy);
        $(".enemy").css("opacity", "1");
    }
});

//Move the user into the battlefield.
function moveUser(fighter){
    var name = $("<div>").addClass("name").text(fighter.name);
    var button = $("<button>").addClass(fighter.cssIdentity);
    var hp = $("<div>").addClass("hp-user").text(fighter.hp);
    $(".user").append(name, button, hp);
    $(".fighter-weapon").append("Your Weapon: " + userCharacter.attackPower);
    userAttackPower = userCharacter.attackPower;
}

//Move the enemy into the battlefield
function moveEnemy(fighter){
    var name = $("<div>").addClass("name").text(fighter.name);
    var button = $("<button>").addClass(fighter.cssIdentity);
    var hp = $("<div>").addClass("hp-enemy").text(fighter.hp);
    $(".enemy").html(name);
    $(".enemy").append(button, hp);
    $(".enemy-weapon").html("Enemy Weapon: " + enemy.counterAttack);
    $(".hp-enemy").html(enemy.hp);
    //Enable Attack button
    $(".attack").prop("disabled", false);
    $(".attack").css("opacity", "1");
}


//Handle the attack button onClick event
var enemiesKilled = 0;
var level = 1;

$(".attack").on("click", function(){
    //Set the user stats
    userCharacter.attackPower = userCharacter.attackPower + 6;
    userCharacter.hp = userCharacter.hp - enemy.counterAttack;
    $(".hp-user").html(userCharacter.hp);
    $(".fighter-weapon").html("Your Weapon: " + userCharacter.attackPower);

    //Set enemy stats
    enemy.hp = enemy.hp - userCharacter.attackPower;
    $(".hp-enemy").html(enemy.hp);

    //Let only Luke beat the night king!
    if(level == 3 && userCharacter.name == "Luke Skywalker"){
        level++;
        alert("You have beaten me!");
    }
    else if(level == 3){
        alert("Give another character a try! Hint: 4c756b6520536b7957616c6b65722057696c6c205361766520596f75");
        $(".attack").prop("disabled", true);
        $(".attack").css("opacity", "0.2");
    }
    else if(level == 4){
        alert("You have beaten me!");
    }
    //Eliminate the enemy from the playing field and advance levels if all enemies have been defeated.
    else if(enemy.hp <= 0 && enemiesKilled < 2){
        enemiesKilled++;
        $("." + enemy.cssIdentity).prop('disabled', true);
        $("." + enemy.cssIdentity).css("opacity", "0.2");
        $(".enemy").css("opacity", "0");
        alert("Pick Another Enemy!");
        $(".attack").prop("disabled", true);
        $(".attack").css("opacity", "0.2");
    }
    else if(enemy.hp <= 0 && enemiesKilled == 2){
        enemiesKilled = 100;
        $(".enemy").css("opacity", "0");
        $("." + enemy.cssIdentity).prop('disabled', true);
        $("." + enemy.cssIdentity).css("opacity", "0.2");
        $(".attack").prop("disabled", true);
        $(".attack").css("opacity", "0.2");

        level = level + 1;
        alert("You have advanced to level " + level + "!");
        advanceLevel(level);
    }
    else if(userCharacter.hp <= 0 && enemiesKilled !== 100){
        alert("You have been defeated! Refresh the page to restart.");
        $(".attack").prop("disabled", true);
        $(".attack").css("opacity", "0.2");
    }


});


function advanceLevel(level){
    if (level == 2){
        //Make all characters fully visible again.
        $("." + "darthVader").css("opacity", "1");
        $("." + "darthSidious").css("opacity", "1");
        $("." + "skyWalker").css("opacity", "1");
        $("." + "wanKenobi").css("opacity", "1");

        //Enable all character buttons and disable the character chosen one
        $("." + "darthVader").prop("disabled", false);
        $("." + "darthSidious").prop("disabled", false);
        $("." + "skyWalker").prop("disabled", false);
        $("." + "wanKenobi").prop("disabled", false);
        $("." + userCharacter.cssIdentity).prop("disabled", true);

        //Enable Attack button
        $(".attack").prop("disabled", false);
        $(".attack").css("opacity", "1");

        //Reset User Stats
        resetHP();
        $(".hp-user").html(userCharacter.hp);
        userCharacter.attackPower = userAttackPower;
        enemiesKilled = 0;

        increaseAttack(2);

        $(function(){
            $("#dialog-confirm").dialog({
                buttons: {
                    "LightSaber": function() {
                        userCharacter.attackPower = userCharacter.attackPower + 4;
                        $(".hp-user").html(userCharacter.hp);
                        $(".fighter-weapon").html("Your Weapon: " + userCharacter.attackPower);
                        $(this).dialog("close");
                    },
                    "Sheild": function() {
                        userCharacter.hp = userCharacter.hp + 40;
                        $(".hp-user").html(userCharacter.hp);
                        $(".fighter-weapon").html("Your Weapon: " + userCharacter.attackPower);
                        $("#dialog-confirm").dialog("close");
                    }
                }
            });
        });
    }
    else if(level == 3){
        enemiesKilled = 0;
        enemy = nightKing;
        var name = $("<div>").addClass("name").text(enemy.name);
        var button = $("<button>").addClass(enemy.cssIdentity);
        var hp = $("<div>").addClass("hp-enemy").text(enemy.hp);
        $(".enemy").html(name);
        $(".enemy").append(button, hp);
        $(".enemy-weapon").html("Enemy Weapon: " + enemy.counterAttack);
        $(".hp-enemy").html(enemy.hp);
        $(".enemy").css("opacity", "1");

        //Enable Attack button
        $(".attack").prop("disabled", false);
        $(".attack").css("opacity", "1");
    }
}

//Increase counter attackPower of all characters
function increaseAttack(increase){
    wanKenobi.attackPower = wanKenobi.counterAttack + increase;
    skywalker.counterAttack = skywalker.counterAttack + increase;
    darthSidious.counterAttack = darthSidious.counterAttack + increase;
    darthVader.counterAttack = darthVader.counterAttack + increase;
}

//Reset HP of all characters
function resetHP(){
    wanKenobi.hp = 120;
    skywalker.hp = 100;
    darthSidious.hp = 140;
    darthVader.hp = 160;
}



