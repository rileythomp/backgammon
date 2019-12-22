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

function all_pieces_home(turn) {
    let colour = turnMap[turn];
    let home_points = document.getElementsByClassName(colour + "-home");
    let pieces_home = 0;
    for (let i = 0; i < home_points.length; ++i) {
        let point = home_points[i];
        pieces_home += point.querySelectorAll('.' + colour).length;
    }
    return true;
    // return pieces_home == 15;
}

function bearing_off(n) {
    return n % 25 == 0;
}

function roll_larger_than_possible(move_size, turn) {
    for (let i = move_size + 1; i < 7; ++i) {
        let point = document.getElementById('point' + i);
        if (point.children.length != 0) {
            return false;
        }
    }
    for (let i = 0; i < rolls.length; ++i) {
        if (rolls[i] >= move_size) {
            return false;
        }
    }
    return all_pieces_home(turn); 
}

function move_correct_by_roll(move_size) {
    return rolls.includes(move_size) || roll_larger_than_possible(move_size, turn);
}

function bearing_off_with_larger_roll(move_size) {
    alert("inside bearing off with larger roll move is size", move_size);
}

function can_move_with_larger_roll(move_size, turn, start_num) {
    for (let i = 0; i < rolls.length; ++i) {
        if (rolls[i] <= move_size) {
            return false;
        }
    }

    // now we know all the rolls are bigger than the move size
    // so check that there isnt a piece farther back
    let colour = turnMap[turn];
    let home_points = document.getElementsByClassName(colour + "-home");
    let pieces_home = 0;
    for (let i = 0; i < home_points.length; ++i) {
        let point = home_points[i];
        let points_on_this_piece = point.querySelectorAll('.' + colour).length;
        if (6-i == start_num) {
            if (points_on_this_piece > 0 && pieces_home < 1) {
                return true
            }
        }
        pieces_home += points_on_this_piece;
    }
    return false;
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

    // if (bearing_off(end_num) && !all_pieces_home(turn)) {
    //     document.getElementById('error-msg').innerHTML = 'You can\'t go there';
    //     return;
    // }

    // handle moving a piece off board when no other option

    // if (!move_correct_by_roll(move_size) || !correct_direction()) {
    //     document.getElementById('error-msg').innerHTML = 'You can\'t go there';
    //     return;
    // }

    // to move
    //      move size == rollsize
    //      empty point
    //      you own the point
    //      only one opponent on the point

    if (rolls.length == 0) {
        document.getElementById('error-msg').innerHTML = 'You need to roll';
    }
    else if (bearing_off(end_num)) {
        // all pieces need to be home
        // exact distance move
        // if a roll is larger than what you can move, you can move the farthest piece
        if (all_pieces_home(turn)) {
            if (move_correct_by_roll(move_size) && correct_direction()) {
                move_piece(ev);
            }
            else if (correct_direction() && can_move_with_larger_roll(move_size, turn, start_num)) {
                move_piece(ev);
            }
            else {
                document.getElementById('error-msg').innerHTML = 'You can\'t go there';
            }
        }
    }
    else if (rolls.includes(move_size)) {
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
        else {
            document.getElementById('error-msg').innerHTML = 'You can\'t go there';
        }
    }
    else {
        document.getElementById('error-msg').innerHTML = 'roll size mismatch';
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

    let r1 = Math.floor(Math.random() * 6 + 1);
    let r2 = Math.floor(Math.random() * 6 + 1);
    
    rolls = (r1 == r2 ? [r1, r1, r1, r1] : [r1, r2]);

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