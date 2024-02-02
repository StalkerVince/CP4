create table cars (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  brand varchar(100) not null,
  model varchar(100) not null,
  drive varchar(100) not null,
  fuel varchar(100) not null,
  category varchar(100) not null,
  power INT NOT NULL
);

create table users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
