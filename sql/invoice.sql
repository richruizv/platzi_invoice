CREATE DATABASE platzi_invoice  DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;
USE platzi_invoice;

CREATE TABLE product (
    product_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(6,2) NOT NULL,
    product_emoji VARCHAR(10),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE promotion (
    promotion_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    promotion_code VARCHAR(100) NOT NULL,
    promotion_description VARCHAR(100) ,
    discount INT(3)
);

INSERT INTO product (product_name,product_price,product_emoji,reg_date)
VALUES 
("Meat (1 kg)","80.00","🥩",now()),
("Grapes (1 kg)","100.00","🍇",now()),
("Tomatoes (1 kg)","30.00","🍅",now()),
("Cake","150.00","🥮",now()),
("Avocado (1kg)","150.00","🥑",now()),
("Bread","20.00","🍞",now()),
("Watermelon","35.00","🍉",now()),
("Cheese","35.00","🧀",now()),
("Fish (1 kg)","400.00","🐟",now()),
("Pizza","200.00","🍕",now())
;

INSERT into promotion(promotion_code,promotion_description,discount)
VALUES
("platzi","Platzi Master discount",20),
("richard","Richard's blessing discount",50);
