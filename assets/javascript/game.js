var userCharacter;
var enemy;

$("#wanKenobi").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = wanKenobi;
    }
    else{
        enemy = wanKenobi;
    }
});

$("#skywalker").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = skywalker;
    }
    else{
        enemy = skywalker;
    }
});

$("#darthSidious").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = darthSidious;
    }
    else{
        enemy = darthSidious;
    }
});

$("#darthVader").on("click", function(){
    if(userCharacter == undefined){
        userCharacter = darthVader;
    }
    else{
        enemy = darthVader;
    }
});

var fighter = {
    hp: null,
    attackPower: null,
    attack: function(victim){
        victim.hp = victim.hp - attackPower;
        return victim.hp;
    }
}

var wanKenobi = {
    name: "wanKenobi",
    hp: 3000,
    attackPower: 50
}

var skywalker = {
    name: "skywalker",
    hp: 1500,
    attackPower: 50
}

var darthSidious = {
    name: "darthSidious",
    hp: 180,
    attackPower: 50
}

var darthVader = {
    name: "darthVader",
    hp: 140,
    attackPower: 50
}

$("#attack").on("click", function(){
    console.log(userCharacter);
    console.log("enemy: " + enemy);

    enemy.hp = enemy.hp - userCharacter.attackPower;

    if(enemy.hp <= 0){
        console.log("#" + enemy.name);
        $("#" + enemy.name).prop('disabled', true);
        $("#" + enemy.name).addClass("disabled");
        alert("Pick Another Enemy!");
    }

    console.log(enemy.hp);
});
