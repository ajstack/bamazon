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

    managerOptions();
});

function managerOptions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add Product"],
            name: "choice"
        }
    ])

        .then(function (answer) {
            switch (answer.choice) {
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

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price +
                " | " + res[i].stock_quantity);
        }

        console.log("\n");
        managerOptions();
    })
}

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5"
    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price +
                " | " + res[i].stock_quantity)
        }

        console.log("\n");
        managerOptions();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price +
                " | " + res[i].stock_quantity);
        }
        console.log("\n");
        inquirer.prompt([
            {
                type: "input",
                message: "What is the id of the product you would like to add inventory to?",
                name: "id",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },

            {
                type: "input",
                message: "How many would you like to add to stock?",
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
                // var newStock = parseInt(answer.amount);
                // var currentStock;

                // if (newStock > 0) {
                //     for (var i = 0; i < res.length; i++) {
                //         if (res.item_id === parseInt(answer.id)) {
                //             currentStock = res[i].stock_quantity + newStock;
                //         }
                //     }
                //     connection.query("UPDATE products SET ? WHERE ?",
                //         [
                //             {
                //                 stock_quantity: currentStock
                //             },
                //             {
                //                 item_id: answer.id
                //             }
                //         ],
                //         function (error) {
                //             if (error) throw err;
                //             console.log("test");
                //         }
                //     );
                // }
                console.log("Not working yet!\n");
                managerOptions();
            })
    })
}

function addProduct() {
    console.log("Coming soon!\n");
    managerOptions();
}

