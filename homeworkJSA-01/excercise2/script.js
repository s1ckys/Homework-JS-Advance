let myBtn = document.getElementById("myBtn");
let myTable = document.getElementById("myTable").querySelector("tbody");

myBtn.addEventListener("click", function (){
    fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(function(response){
        console.log(response);
        response.json()
            .then(function(data){
                myTable.innerHTML = "";

            for (let key in data) {
                let row = document.createElement("tr");

                let cellKey = document.createElement("td");
                cellKey.textContent = key;

                let cellValue = document.createElement("td");
                cellValue.textContent = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];

                row.appendChild(cellKey);
                row.appendChild(cellValue);
                myTable.appendChild(row);
            }
            })
    })
    .catch(function(error){
        console.log(error);
    })
})