//empty array 4x4
const seats = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
];



let currentMode = "assign"; //tracks the mode and starts in assign ode first
let selectedRow = -1;
let selectedCol = -1;


function drawChart() {
    let html = "<table>";

    for(let i = 0; i < seats.length; i++) {
        html += "<tr>"; //opens a new table row whenever looped

        for(let j = 0; j < seats[i].length; j++){
            let cellClasses = seats[i][j] === "" ? "empty" : "filled"; //has to check if the seat is empty; if it is it lists the class as empy and if it isnt it lists the class as filled

            if (i === selectedRow && j === selectedCol){
                cellClasses += "selected"; //if cell is selected it adds it to the selected class
            }

            let cellTexts = seats[i][j] === "" ? "Empty" : seats[i][j]; //says if a seat is empty then itll display empty but if it isnt itll show the students name instead
            html += `<td class="${cellClasses}" onclick="cellClicked(this, ${i}, ${j})">${cellTexts}</td>`;
        }
        html += "</tr>"; //closes after 4 
    }
    html += "</table>";
    document.getElementById('grid').innerHTML = html;
    updateStats(); //refreshes the seats count
}

function cellClicked(cell, row, col) {
    if (currentMode === "assign") { //checks what mode we're in (assign)
        let name = document.getElementById("nameInput").value.trim(); //removes the extra spaces from what was typed
        if (name === "") {
            document.getElementById('message').innerHTML = "Type a name first.";
            drawChart();
            return;
            // if the input is empty it shows the warning to type a name and redoes the chart
        }

        if (seats[row][col] !== ""){ //if seat is filed it stops and says its taken
            document.getElementById("message").innerHTML = "Seat is already taken.";
            return;
        }
        seats[row][col] = name; //puts the name in the seat in the empty array
        document.getElementById("nameInput").value = ""; //clears the input after a use
        // add 1 since arrays and like indexes start at 0 and also so the the person sees 1
        document.getElementById("message").innerHTML = ` 
        Assigned ${name} to row ${row + 1}, seats${col + 1}.
        `
    } else if(currentMode === "remove") {
        if (seats[row][col] === "") {
            document.getElementById("message").innerHTML = "This seat is empty.";
            return;
        }

        let nameRemover = seats[row][col];
        seats[row][col] = "";
        // it saves the name and then clears the seat
        document.getElementById("message").innerHTML = `
        Removed ${nameRemover} from row ${row + 1}, seat ${col + 1}.
        `;
    }
    drawChart();
}
//updates mode
function assignMode(){
    currentMode = "assign";

    document.getElementById("mode").innerHTML = "Mode: Assign (click empty seat)";
}
//updates mode
function removeMode() {
    currentMode = "remove";

    document.getElementById("mode").innerHTML = "Mode: Remove (click filled seat)";
}

function resetMode() {
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++) {
            seats[i][j] = ""; //goes thru every seat and turns it to a epty string+
        }
    }
    selectedRow = -1; //resets seats to empty
    selectedCol = -1;
    document.getElementById("message").innerHTML = "Seating chart has reset.";
    drawChart(); //redraws chart
}

function updateStats() {
    let total = 0;
    let filled = 0; 

    for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
        total++; //adds 1 to the total
        if (seats[i][j] !== "") {
            filled++; //if the seat is not empty this adds 1 to filled texxt
        }
    }
    }
    document.getElementById("stats").innerHTML = `
    Assigned Seats: ${filled} / ${total}
    `;
}

assignMode();
drawChart();