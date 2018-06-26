var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");

    displayproducts();
});

function displayproducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | "
                + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("------------------------------------------")
        start();
    });
}

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
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
                name: "amount",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])

            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if(results[i].item_id === parseInt(answer.item)){
                        chosenItem = results[i];
                    }
                }
                var stockQuantity = chosenItem.stock_quantity;
                var amountPurchased = parseInt(answer.amount);

                if (stockQuantity < amountPurchased){
                    console.log("Not enough in stock!\n");
                }

                if(stockQuantity >= amountPurchased){
                    stockQuantity = stockQuantity - amountPurchased;
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQuantity
                        },
                        {
                            item_id: answer.item
                        }
                    ]
                )

                    console.log("Thank you for your purchase!\n");
                }
                displayproducts();
            });
    });
}