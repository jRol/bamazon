var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "kGarnett#%1408",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the displayProducts function after the connection is made to start the chain of prompts for the user

    displayProducts();
});

function displayProducts() {

    connection.query("SELECT item_id, product_name, department_name, price FROM products", function(err, results) {
        if (err) throw err;

        console.log("--------------------------------------------------");
        console.log("--------------------------------------------------");
        console.log("Products");
        console.log("--------------------------------------------------");
        console.log("--------------------------------------------------");
        console.table(results);
        purchase();
    });

}

function purchase() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "What is the item_id for the product you wish to buy?"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function(answer) {

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.id)) {
                        chosenItem = results[i];
                    }
                }
                
                if (chosenItem == null) {

                    console.log("--------------------------------------------------");
                    console.log("--------------------------------------------------");
                    console.log("Invalid item_id, there's no item matching the item_id you entered!");
                    console.log("Please enter a valid item_id");
                    displayProducts();
                }
                else if (chosenItem.stock_quantity >= parseInt(answer.amount)) {

                    console.log("--------------------------------------------------");
                    console.log("--------------------------------------------------");
                    console.log("There's enough to buy!");
                    var item = chosenItem;
                    var amount = parseInt(answer.amount);
                    updateProducts(item, amount);
                }
                else {

                    console.log("--------------------------------------------------");
                    console.log("--------------------------------------------------");
                    console.log("Insufficient quantity!");
                    displayProducts();
                }
            });
    });
}

function updateProducts(item, amount) {

    console.log("Updating the quantity of " + item.product_name + "...\n");
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: item.stock_quantity - amount
            },
            {
                item_id: item.item_id
            }
        ],
        function(err, res) {
            
            var totalCost = item.price * amount;
           
            console.log("Quantity of " + item.product_name + " updated!");
            console.log("The total cost of your purchase was: $" + totalCost.toFixed(2));

            displayProducts();
        }
    );
}