DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL PRIMARY KEY,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10, 2),
stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sword", "Weapons", 50.00, 9); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batarang", "Weapons", 15.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Utility Belt", "Clothing", 150.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cape", "Clothing", 10.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batmobile", "Vehicle", 10000.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Posion Ivy", "Plants", 30.00, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Weapons", 50.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Freeze Ray", "Weapons", 1500.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Umbrella", "Weapons", 20.00, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Set", "Housewares", 75.00, 20);