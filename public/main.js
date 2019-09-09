function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

let pieces = document.getElementsByClassName("piece");
for (let i = 0; i < pieces.length; ++i) {
    pieces[i].addEventListener("dragstart", drag);
}

let board_points = document.getElementsByClassName("grid-item");
for (let i = 0; i < board_points.length; ++i) {
    board_points[i].addEventListener("drop", drop);
    board_points[i].addEventListener("dragover", allowDrop);
}