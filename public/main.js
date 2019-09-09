function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (ev.currentTarget.classList.contains(turnMap[turn])) {
        ev.dataTransfer.setData("text", ev.target.id);
        start_num = ev.currentTarget.id.replace("drag", "");
    }
}

function drop(ev) {
    ev.preventDefault();

    let end_point = ev.currentTarget;

    end_num = end_point.id.replace("point", "");

    console.log(roll1, roll2, end_num, start_num);

    if (pieces_on_point(end_point) == 1 && point_has_different_piece(end_point)) {
        let hit_piece = end_point.firstElementChild
        end_point.removeChild(hit_piece);
        document.getElementById(turnMap[!turn] + "-jail").appendChild(hit_piece);
        move_piece(ev);
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

let board_points = document.querySelectorAll(".bottom, .top, .bear");
for (let i = 0; i < board_points.length; ++i) {
    board_points[i].addEventListener("drop", drop);
    board_points[i].addEventListener("dragover", allowDrop);
}

function roll(ev) {
    roll1 = Math.floor(Math.random() * 6 + 1);
    roll2 = Math.floor(Math.random() * 6 + 1);

    document.getElementById("dice1").src = rollToDieMap[roll1];
    document.getElementById("dice2").src = rollToDieMap[roll2];
}


let dice = document.getElementsByClassName("dice");
for (let i = 0; i < dice.length; ++i) {
    dice[i].addEventListener("click", roll);
}