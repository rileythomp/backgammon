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

let roll1 = 0;
let roll2 = 0;

let end_num = 0;
let start_num = 0;

let turn = true; 

function move_piece(ev) {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    turn = !turn;
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


