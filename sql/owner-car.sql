create table car (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	brand VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	year VARCHAR(50)NOT NULL,
	price NUMERIC(19, 2) NOT NULL
);

create table owner (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	gender VARCHAR(10) NOT NULL,
	date_of_birth DATE NOT NULL,
	country_of_birth VARCHAR(50) NOT NULL,
    car_id BIGINT REFERENCES car (id),
    UNIQUE(car_id)
);

insert into car (id, brand, model, year, price) values (1, 'Volvo', 'XC90', 2011, '67094.50');
insert into car (id, brand, model, year, price) values (2, 'BMW', '5 Series', 2003, '31770.58');
insert into car (id, brand, model, year, price) values (3, 'Cadillac', 'XLR', 2009, '22943.17');
insert into car (id, brand, model, year, price) values (4, 'Buick', 'Skylark', 1995, '79591.57');
insert into car (id, brand, model, year, price) values (5, 'Cadillac', 'Catera', 1998, '69325.92');
insert into car (id, brand, model, year, price) values (6, 'GMC', '1500 Club Coupe', 1996, '94250.68');
insert into car (id, brand, model, year, price) values (7, 'Isuzu', 'Ascender', 2008, '93586.80');
insert into car (id, brand, model, year, price) values (8, 'Mercedes-Benz', 'SL-Class', 2008, '13972.16');
insert into car (id, brand, model, year, price) values (9, 'Chevrolet', 'Corvette', 1999, '13906.62');
insert into car (id, brand, model, year, price) values (10, 'Dodge', 'Stratus', 1997, '92993.83');

insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (1, 'Ives', 'Dockwra', 'idockwra0@icq.com', 'Male', '1971-02-19', 'China');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (2, 'Nilson', 'Albone', 'nalbone1@themeforest.net', 'Male', '2014-11-24', 'Indonesia');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (3, 'Tine', 'Muckersie', 'tmuckersie2@xinhuanet.com', 'Female', '2013-05-22', 'China');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (4, 'Demetri', 'Stollenberg', 'dstollenberg3@wordpress.com', 'Male', '1996-10-10', 'Indonesia');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (5, 'Joyann', 'Conibeer', 'jconibeer4@discuz.net', 'Female', '1970-09-01', 'Philippines');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (6, 'Ingaborg', 'McFater', 'imcfater5@mit.edu', 'Female', '2006-10-27', 'China');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (7, 'Veronike', 'Levay', 'vlevay6@instagram.com', 'Female', '2013-06-06', 'Portugal');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (8, 'Gordy', 'Gorcke', 'ggorcke7@nasa.gov', 'Male', '1970-12-04', 'Canada');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (9, 'Vilma', 'Lucock', 'vlucock8@github.com', 'Female', '1995-11-30', 'China');
insert into owner (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) values (10, 'Elnar', 'Elsom', 'eelsom9@uiuc.edu', 'Male', '2000-09-21', 'Portugal');
