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

    displayproducts();
});

function displayproducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
            + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("------------------------------------------")
        start();
    });
}

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is the id of the product you would like to buy?",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            name: "item"
        },

        {
            type: "input",
            message: "How many would you like to buy?",
            name: "ammount",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ])

    .then(function(purchaseInformation){
        

    })

}