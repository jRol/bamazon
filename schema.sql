DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(13, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
    (1, "Apples", "Food", 2.22, 10), 
    (2, "Bananas", "Food", 4.33, 20), 
    (3, "Garlic", "Food", 1.00, 5),
    (4, "Shirts", "Clothing", 5.69, 10),
    (5, "Pants", "Clothing", 10.99, 10),
    (6, "Shoes", "Clothing", 15.27, 5),
    (7, "Soaps", "Home", 1.99, 10),
    (8, "Beds", "Home", 100.50, 5),
    (9, "Albums", "Music", 6.66, 10),
    (10, "Bikes", "Outdoor", 200.00, 5);