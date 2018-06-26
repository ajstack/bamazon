var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");

    managerOptions();
});

function managerOptions(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add Product"],
            name: "choice"
        }
    ])

    .then(function(answer) {
        switch(answer.choice) {
            case "View Products":
                viewProducts();
                break;
            
            case "View Low Inventory":
                viewLowInventory();
                break;
            
            case "Add to Inventory":
                addInventory();
                break;

            case "Add Product":
                addProduct();
                break;
        }

    });
}

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + 
            " | " + res[i].stock_quantity);
        }

        console.log("\n");
        managerOptions();
    })
}

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5"
    connection.query(query, function(err, res) {
        if(err) throw err;

        for (var j = 0; j < res.length; j++){
            console.log(res[j].item_id + " | " + res[j].product_name + " | " + res[j].department_name + " | " + res[j].price +
             " | " + res[j].stock_quantity)
        }

        console.log("\n");
        managerOptions();
    });
}

