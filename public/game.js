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

function update_turn() {
    turn = !turn;
    document.getElementById("turn-message").innerHTML = turnMap[turn] + "'s turn";
    let dice = document.getElementsByClassName("dice");
    for (let i = 0; i < dice.length; ++i) {
        dice[i].addEventListener("click", roll);
    }
}

function move_piece(ev) {
    let target = ev.target;
    
    if (!ev.target.classList.contains("point")) {
        target = target.parentNode;
    }

    let data = ev.dataTransfer.getData("text");
    let piece = document.getElementById(data);

    if (target.id == piece.parentElement.id) {
        return;
    }

    target.appendChild(piece);

    rolls.remove(move_size);
    console.log("rolls after move ", rolls);

    if (rolls.length == 0) {
        update_turn();
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


