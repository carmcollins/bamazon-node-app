DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NULL,
	department_name VARCHAR(30) NULL,
	price DEC(5,2) NULL,
	stock_quantity INT(5) NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
    ("Domino", "Magazines", 12, 500),
    ("Kinfolk", "Magazines", 18, 300),
    ("Darling", "Magazines", 20, 400),
    ("Paint", "Art Supplies", 10, 100),
    ("Scissors", "Art Supplies", 5, 500),
    ("Markers", "Art Supplies", 8, 300),
    ("Candle", "Home Decor", 14, 100),
    ("Lamp", "Home Decor", 30, 50),
    ("Pillow", "Home Decor", 50, 10),
    ("Vase", "Home Decor", 50, 5);

UPDATE products SET stock_quantity = 20 WHERE department_name = "Magazines";
UPDATE products SET stock_quantity = 10 WHERE department_name = "Art Supplies";
UPDATE products SET stock_quantity = 5 WHERE department_name = "Home Decor";
UPDATE products SET stock_quantity = 3 WHERE id = 3,6,9;

SELECT * FROM products;