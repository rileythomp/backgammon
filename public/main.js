function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let start_piece = ev.currentTarget;
    // there are pieces in jail
    if (document.getElementById(turnMap[turn] + "-jail").children.length > 0) {
        if (!start_piece.parentElement.classList.contains("jail")) {
            // invalid move
            return;
        }
        else if (start_piece.classList.contains(turnMap[turn])) {
            ev.dataTransfer.setData("text", ev.target.id);
            start_num = (turn ? 25 : 0);
            return;
        }
    }

    // checks you are moving the correct colour
    if (start_piece.classList.contains(turnMap[turn])) {
        ev.dataTransfer.setData("text", ev.target.id);
        start_num = Number(ev.currentTarget.parentElement.id.replace("point", ""));
    }
}

function drop(ev) {
    ev.preventDefault();

    let end_point = ev.currentTarget;

    if (end_point.classList.contains("bear")) {
        end_num = (turn ? 0 : 25);
    }
    else {
        end_num = Number(end_point.id.replace("point", ""));
    }

    move_size = abs(start_num - end_num);

    if (!rolls.includes(move_size) && correct_direction()) {
        return
    }

    // bearing off
    if (end_num % 25 == 0) {
        // validate that all pieces are in home
        let colour = turnMap[turn];
        let home_points = document.getElementsByClassName(colour + "-home");
        let pieces_home = 0;
        for (let i = 0; i < home_points.length; ++i) {
            let point = home_points[i];
            pieces_home += point.querySelectorAll('.' + colour).length;

        }
        if (pieces_home != 15) {
            return;
        }
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

function roll(ev) {
    spin_dice();

    // let r1 = Math.floor(Math.random() * 6 + 1);
    // let r2 = Math.floor(Math.random() * 6 + 1);
    let r1 = 2;
    let r2 = 2;
    
    // rolls = (r1 == r2 ? [r1, r1, r1, r1] : [r1, r2]);
    rolls = [r1, r1];

    r1 = Math.floor(Math.random() * 6 + 1);
    r2 = Math.floor(Math.random() * 6 + 1);

    document.getElementById("dice1").src = rollToDieMap[r1];
    document.getElementById("dice2").src = rollToDieMap[r2];

    if (no_moves_left()) {
        update_turn();
        return;
    }

    let dice = document.getElementsByClassName("dice");
    for (let i = 0; i < dice.length; ++i) {
        dice[i].removeEventListener("click", roll);
    }
}


let dice = document.getElementsByClassName("dice");
for (let i = 0; i < dice.length; ++i) {
    dice[i].addEventListener("click", roll);
}