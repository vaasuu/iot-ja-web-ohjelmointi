/* 
+---+---+----+----+----+----+----+----+----+----+
|   | 1 | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  |
+---+---+----+----+----+----+----+----+----+----+
| 0 | 1 | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  |
+---+---+----+----+----+----+----+----+----+----+
| 1 | 2 | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 |
+---+---+----+----+----+----+----+----+----+----+
| 2 | 3 | 4  | 5  | 6  | 7  | 8  | 9  | 10 | 11 |
+---+---+----+----+----+----+----+----+----+----+
| 3 | 4 | 5  | 6  | 7  | 8  | 9  | 10 | 11 | 12 |
+---+---+----+----+----+----+----+----+----+----+
| 4 | 5 | 6  | 7  | 8  | 9  | 10 | 11 | 12 | 13 |
+---+---+----+----+----+----+----+----+----+----+
| 5 | 6 | 7  | 8  | 9  | 10 | 11 | 12 | 13 | 14 |
+---+---+----+----+----+----+----+----+----+----+
| 6 | 7 | 8  | 9  | 10 | 11 | 12 | 13 | 14 | 15 |
+---+---+----+----+----+----+----+----+----+----+
| 7 | 8 | 9  | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
+---+---+----+----+----+----+----+----+----+----+
| 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
+---+---+----+----+----+----+----+----+----+----+
*/

const tableBody = document.getElementById("tablebody");

// 9 cells in y direction, with index 0 to 8
for (let y = 0; y < 9; y++) {
    // create row element
    const row = document.createElement("tr");

    // 9 cells in x direction, with index 1 to 9
    for (let x = 1; x < 10; x++) {
        
        // create table data cell
        const cell = document.createElement("td");

        // create the cell content Text Node
        var cellText = document.createTextNode(x+y);

        // append the cell content (TextNode) to the cell
        cell.appendChild(cellText);

        // append the cells to the row
        row.appendChild(cell);
    }    
    // append the row to the table
    tableBody.appendChild(row);
}