
const tableBody = document.getElementById("tablebody");

tableBody.textContent = "";

const myAsyncFunction = async () => {
    console.log("Entering async function…");

    const response = await fetch("https://corona-api.com/countries/fi");
    console.log("response", response);

    const data = await response.json();
    console.log("data:", data)

    data.data.timeline.forEach((rowData, index) => {
        const row = document.createElement("tr");

        const cellDataArray = [
            index + 1,
            rowData.date,
            rowData.new_confirmed,
            rowData.new_recovered,
            rowData.new_deaths,
        ]

        for (cellData of cellDataArray) {
            
            const cell = document.createElement("td")
            const cellText = document.createTextNode(cellData)

            cell.appendChild(cellText)
            row.appendChild(cell)
        }
        tableBody.appendChild(row)
        });
};

myAsyncFunction();