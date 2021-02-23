
const country = document.getElementById("country");
const tableBody = document.getElementById("tablebody");


const myAsyncFunction = async () => {
    console.log("Entering async function…");
    console.log("country.value: ", country.value);
    
    // get data from API
    const response = await fetch(`https://corona-api.com/countries/${country.value}`);
    console.log("response", response);
    
    // get the json response
    const data = await response.json();
    console.log("data:", data)
    
    // clear table
    tableBody.textContent = "";

    // repeat for 28 times/days
    for (let index = 0; index < 28; index++) {
        
        // show selected country name
        document.getElementById("currentCountry").innerHTML = data.data.name;
        
        // get data for a particular day
        rowData = data.data.timeline[index];

        // create a row table element
        const row = document.createElement("tr");

        // array of values per row
        const cellDataArray = [
            index + 1,
            rowData.date,
            rowData.new_confirmed,
            rowData.new_recovered,
            rowData.new_deaths,
        ]

        // create a cell for every value on row array
        for (cellData of cellDataArray) {
            
            // create the data cell element
            const cell = document.createElement("td")
            // create the Text Node with the data
            const cellText = document.createTextNode(cellData)

            // append the text to cell
            cell.appendChild(cellText)
            // append cell to row
            row.appendChild(cell)
        }
        // append row to table
        tableBody.appendChild(row)
    }    
};

document.getElementById("form").addEventListener("submit", (event) => {
    // prevent refresh from normal submit event
    event.preventDefault();
    // run the function
    myAsyncFunction();
}) 