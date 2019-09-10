function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (ev.currentTarget.classList.contains(turnMap[turn])) {
        ev.dataTransfer.setData("text", ev.target.id);
        start_num = Number(ev.currentTarget.parentElement.id.replace("point", ""));
    }
}

function drop(ev) {
    ev.preventDefault();

    let end_point = ev.currentTarget;

    end_num = Number(end_point.id.replace("point", ""));

    move_size = abs(start_num - end_num);

    if (rolls.includes(move_size) && correct_direction()) {
        console.log("good direction and size");
    }
    else {
        console.log("wrong direction or size")
        return;
    }

    if (pieces_on_point(end_point) == 1 && point_has_different_piece(end_point)) {
        move_piece(ev);
        let hit_piece = end_point.firstElementChild
        end_point.removeChild(hit_piece);
        document.getElementById(hit_piece.id.replace(/\d+/g, '') + "-jail").appendChild(hit_piece);
    }
    else if (pieces_on_point(end_point) == 0) {
        move_piece(ev);
    }
    else if (point_has_same_piece(end_point)) {
        move_piece(ev);
    }
}

let pieces = document.getElementsByClassName("piece");
for (let i = 0; i < pieces.length; ++i) {
    pieces[i].addEventListener("dragstart", drag);
}

let board_points = document.querySelectorAll(".point");
for (let i = 0; i < board_points.length; ++i) {
    board_points[i].addEventListener("drop", drop);
    board_points[i].addEventListener("dragover", allowDrop);
}

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

function roll(ev) {
    spin_dice();

    let r1 = Math.floor(Math.random() * 6 + 1);
    let r2 = Math.floor(Math.random() * 6 + 1);
    
    rolls = (r1 == r2 ? [r1, r1, r1, r1] : [r1, r2])

    r1 = Math.floor(Math.random() * 6 + 1);
    r2 = Math.floor(Math.random() * 6 + 1);

    document.getElementById("dice1").src = rollToDieMap[r1];
    document.getElementById("dice2").src = rollToDieMap[r2];

    let dice = document.getElementsByClassName("dice");
    for (let i = 0; i < dice.length; ++i) {
        dice[i].removeEventListener("click", roll);
    }
}


let dice = document.getElementsByClassName("dice");
for (let i = 0; i < dice.length; ++i) {
    dice[i].addEventListener("click", roll);
}