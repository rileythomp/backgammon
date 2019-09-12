let rollToDieMap = {
    1: 'assets/dice1.png',
    2: 'assets/dice2.png',
    3: 'assets/dice3.png',
    4: 'assets/dice4.png',
    5: 'assets/dice5.png',
    6: 'assets/dice6.png',
}

let turnMap = {
    true: "blue",
    false: "red"
}

let rolls = [];

let end_num = 0;
let start_num = 0;

let turn = true; 

let move_size = 0;

function spin_dice() {
    let dices = document.getElementsByClassName('dice');
    
    for (let i = 0; i < dices.length; ++i) {
        dices[i].className += " spinner";
    }

    setTimeout(function() {
        document.getElementById("dice1").src = rollToDieMap[rolls[0]];
        document.getElementById("dice2").src = rollToDieMap[rolls[1]];
        for (let i = 0; i < dices.length; ++i) {
            dices[i].classList.remove("spinner");
        }
    }, 1000)
}

function update_turn() {
    turn = !turn;
    document.getElementById("turn-message").innerHTML = turnMap[turn] + "'s turn";
    let dice = document.getElementsByClassName("dice");
    for (let i = 0; i < dice.length; ++i) {
        dice[i].addEventListener("click", roll);
    }
}

function point_has_different_piece(end_point) {
    return !end_point.firstElementChild.classList.contains(turnMap[turn]);
}

function point_has_same_piece(end_point) {
    return end_point.firstElementChild.classList.contains(turnMap[turn]);
}

function pieces_on_point(end_point) {
    return end_point.childElementCount;
}

function correct_direction() {
    return start_num > end_num && turn || start_num < end_num && !turn;
}


function no_moves_left() {
    // if you have pieces in jail
    if (document.getElementById(turnMap[turn] + "-jail").children.length > 0) {
        for (let i = 0; i < rolls.length; ++i) {
            let roll = rolls[i];
            let end_point = document.getElementById("point" + (turn ? 25 - roll : roll));
            if (pieces_on_point(end_point) < 2 || point_has_same_piece(end_point)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function move_piece(ev) {
    let target = ev.target;
    
    if (!ev.target.classList.contains("point")) {
        target = target.parentNode;
    }

    let data = ev.dataTransfer.getData("text");
    let piece = document.getElementById(data);

    // dropped on same point piece started on
    if (target.id == piece.parentElement.id) {
        return;
    }

    let start_point = document.getElementById("point" + start_num)
    for (let i = 0; i < start_point.children.length; ++i) {
        let piece = start_point.children[i];
        if (piece.style.display == "none") {
            piece.style.display = "block";
            break;
        }
    }

    if (pieces_on_point(target) > 5) {
        piece.style.display = "none";
    }
    target.appendChild(piece);

    rolls.remove(move_size);

    if (rolls.length == 0 || no_moves_left()) {
        update_turn();
    }
}

