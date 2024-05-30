//Progress bar: https://www.youtube.com/watch?v=4LBRMSk6PLY&t=177s,Hulp gekregen van Yu'an
//Turn based combat: https://www.youtube.com/watch?v=usU9q1bJECo, https://www.youtube.com/watch?v=Sp623fof_Ck

const batmanhp = document.getElementById("batmanhp"); 
const jokerhp = document.getElementById("jokerhp"); 

let batarang = document.getElementById("batmanAttack1") 
let vengeance = document.getElementById("batmanAttack2") 
let millionaire = document.getElementById("batmanAttack3") 


let isBatmanTurn = true;
let timeLeft = 20;
let timerInterval; 

function critBatarang() {
    const critElement = document.getElementById("batarangcrit");
    critElement.style.opacity = "1";
    critElement.style.zIndex = "1";
    setTimeout(() => {
        critElement.style.opacity = "0";
        critElement.style.zIndex = "-1"; 
    }, 3000); 
}

function attackOnJoker1(value) {
    if (!isBatmanTurn) return;
    const roll = Math.floor(Math.random()*100) + 1; 
    console.log("Roll value:", roll); //Gebruikt om te checken waarom de crit niet werkte. 

    if (roll >= 95 && jokerhp.value > 0){
        jokerhp.value = jokerhp.value - 20;
        console.log("Critical hit");
        critBatarang(); 

    } else if (roll >= 25 && jokerhp.value > 0) {
        jokerhp.value = jokerhp.value - 10;
    }

    else { 
        if (roll < 25 && jokerhp.value > 0) {
            jokerhp.value += 5;
        }
    }

    endTurn();
}

function critVeangence() {
    const critElement = document.getElementById("vengeancecrit");
    critElement.style.opacity = "1";
    critElement.style.zIndex = "1";
    setTimeout(() => {
        critElement.style.opacity = "0";
        critElement.style.zIndex = "-1"; 
    }, 3000); 
}

function attackOnJoker2(value) {
    if (!isBatmanTurn) return;
    console.log("Vengeance attack triggered");
    const roll = Math.floor(Math.random()*100) + 1; 

    if (roll >= 90 && jokerhp.value > 0){
        jokerhp.value = jokerhp.value - 40;
        console.log("Critical hit")
        critVeangence(); 
    } 

    else if  (roll >= 50 && jokerhp.value > 0) {
        jokerhp.value = jokerhp.value - 20;
    }

    else { 
        if (roll < 50 && jokerhp.value > 0) {
            jokerhp.value += 15;
        }
    }

    endTurn();
}

function critMillionaire() {
    const critElement = document.getElementById("millionaricrit");
    critElement.style.opacity = "1";
    critElement.style.zIndex = "1";
    setTimeout(() => {
        critElement.style.opacity = "0";
        critElement.style.zIndex = "-1"; 
    }, 3000); 
}


function attackOnJoker3(value) {
    if (!isBatmanTurn) return;
    const roll = Math.floor(Math.random() * 100) + 1; 
   
    if  (roll >= 90 && jokerhp.value > 0) {
        jokerhp.value -= 80;
        critMillionaire()
        console.log("Critical hit");
    } 
    
    else if (roll >= 80 && jokerhp.value > 0) {
        jokerhp.value -= 40;
    } 
    
    else { 
        if (roll < 80 && jokerhp.value > 0) {
            jokerhp.value += 20;
        }
    }

    endTurn();
}

function attackOnBatman1(value) {
    if (isBatmanTurn) return;
    const roll = Math.floor(Math.random()*100) + 1; 

    if (roll > 25 && batmanhp.value > 0) {
        batmanhp.value = batmanhp.value - 10;
    } 

    else if (roll >= 90 && batmanhp.value > 0){
        batmanhp.value = batmanhp.value - 25;
        console.log("Critical hit")
    }

    else { 
        if (roll < 25 && batmanhp.value > 0) {
            batmanhp.value += 5;   
            
        }
    }

    endTurn();
}

function attackOnBatman2() {
    if (isBatmanTurn) return;
    const roll = Math.floor(Math.random() * 100) + 1; 

    if (roll >= 90 && batmanhp.value > 0) {
        batmanhp.value -= 40;
        console.log("Critical hit")
    } 
    
    else if (roll >= 50 && batmanhp.value > 0) {
        batmanhp.value -= 20;
    } 
    
    else { 
        if (roll < 50 && batmanhp.value > 0) {
            batmanhp.value += 15;
        }
    }

    endTurn();
}

function attackOnBatman3() {
    if (isBatmanTurn) return;
    const roll = Math.floor(Math.random() * 100) + 1; 

    if (roll >= 95 && batmanhp.value > 0) {
        batmanhp.value -= 30;
        
    } 
    
    else if (roll >= 50 && batmanhp.value > 0) {
        batmanhp.value -= 15;
    } 
    
    else { 
        if (roll < 50 && batmanhp.value > 0) {
            batmanhp.value += 5;
        }
    }

    endTurn();
}

function randomJokerAttack() {
    const attackNumber = Math.floor(Math.random() * 3) + 1; 
    if (attackNumber === 1) {
        attackOnBatman1();
    } else if (attackNumber === 2) {
        attackOnBatman2();
    } else if (attackNumber === 3) {
        attackOnBatman3();
    }
}

function updateTurnDisplay() {
    const turnDisplay = document.getElementById("turnDisplay");
    if (isBatmanTurn) {
        turnDisplay.textContent = "Batmans Turn";
        turnDisplay.style.backgroundColor = "gray";
    } 

    else {
        turnDisplay.textContent = "Jokers Turn";
        turnDisplay.style.backgroundColor = "green";
    }
}

function endTurn() {
    resetTimer();
    checkGameOver();

    if (isBatmanTurn) {
        isBatmanTurn = false;
        updateTurnDisplay();
        setTimeout(() => {
            const attackDelay = Math.floor(Math.random() * 10000) + 1000; 
            setTimeout(randomJokerAttack, attackDelay); 
        }, 1000); 
    } else {
        isBatmanTurn = true;
        updateTurnDisplay();
    }
    
}



function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--; 
        updateTimerDisplay(); 
        if (timeLeft === 0) {
            clearInterval(timerInterval); 
            endTurn(); 
        }
    }, 1000); 
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.textContent = "Time Left: " + timeLeft;

    if (isBatmanTurn) {
        turnDisplay.textContent = "Batmans Turn";
    } 

    else {
        turnDisplay.textContent = "Jokers Turn";
    }
}
function resetTimer() {
    clearInterval(timerInterval); 
    timeLeft = 20; 
    updateTimerDisplay(); 
    startTimer(); 
}

function checkGameOver() {
    if (jokerhp.value <= 0) {
        document.getElementById("gameResult").textContent = "You Win!";
        document.getElementById("gameOverScreen").style.display = "block";
        clearInterval(timerInterval);
    } 
    
    else if (batmanhp.value <= 0) {
        document.getElementById("gameResult").textContent = "Game Over!";
        document.getElementById("gameOverScreen").style.display = "block";
        clearInterval(timerInterval);
    }
}

function restartGame() {

    batmanhp.value = + 200;
    jokerhp.value = + 200;
    document.getElementById("gameOverScreen").style.display = "none";
    resetTimer();
}

const attackInfo = document.getElementById("attackInfo");

batarang.addEventListener("mouseover", () => showAttackInfo("Batarang: 70% chance to hit for 10dmg, 5% chance to crit and a 25% to miss and heal joker for 5hp"));
batarang.addEventListener("mouseout", () => hideAttackInfo());

vengeance.addEventListener("mouseover", () => showAttackInfo("Vengeance: 50% chance to hit for 20dmg, 10% chance to crit and a 50% to miss and heal joker for 15hp"));
vengeance.addEventListener("mouseout", () => hideAttackInfo());

millionaire.addEventListener("mouseover", () => showAttackInfo("Millionaire:  20% chance to hit for 40dmg, 10% chance to crit and a 80% to miss and heal joker for 20hp"));
millionaire.addEventListener("mouseout", () => hideAttackInfo());

function showAttackInfo(info) {
    attackInfo.textContent = info;
    attackInfo.style.display = "block";
}

function hideAttackInfo() {
    attackInfo.style.display = "none";
}

document.getElementById("restartButton").addEventListener("click", restartGame);
batarang.addEventListener("click", attackOnJoker1)
vengeance.addEventListener("click", attackOnJoker2)
millionaire.addEventListener("click", attackOnJoker3);


