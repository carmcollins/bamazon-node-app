var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("\nConnected as ID: " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        startSale();
    });
};

function startSale() {
    inquirer.prompt([
        {
            message: "Which product (ID number) would you like to buy?",
            name: "id"
        },
        {
            message: "How many units of this product would you like to buy?",
            name: "quantity"
        }
    ]).then(function(answer) {
        var userQuantity = parseFloat(answer.quantity);
        var storeQuantity;
        connection.query("SELECT * FROM products WHERE id=?", [answer.id], function(err, res) {
            if (err) throw err;

            storeQuantity = res[0].stock_quantity;
            itemPrice = res[0].price;

            if (userQuantity > storeQuantity) {
                console.log("\nINSUFFICIENT QUANTITY! TRY AGAIN!\n");
                showProducts();
            } else {
                var currentQuantity = parseInt(storeQuantity) - parseInt(userQuantity);

                var item = (res[0].product_name).toUpperCase();

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: currentQuantity
                        },
                        {
                            id: answer.id
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;

                        console.log("\nSUCCESSFULLY PURCHASED " + userQuantity + " " + item + "S!\n");
                        showProducts();
                    }
                );
            };
        });
    });
};