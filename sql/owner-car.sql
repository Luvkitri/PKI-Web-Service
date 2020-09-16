create table owners (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	gender VARCHAR(10) NOT NULL,
	date_of_birth DATE NOT NULL,
	country_of_birth VARCHAR(50) NOT NULL
);

create table cars (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	brand VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	year VARCHAR(50)NOT NULL,
	price NUMERIC(19, 2) NOT NULL,
	owner_id BIGINT REFERENCES owners (id)
);

insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Ives', 'Dockwra', 'idockwra0@icq.com', 'Male', '1971-02-19', 'China');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Nilson', 'Albone', 'nalbone1@themeforest.net', 'Male', '2014-11-24', 'Indonesia');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Tine', 'Muckersie', 'tmuckersie2@xinhuanet.com', 'Female', '2013-05-22', 'China');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Demetri', 'Stollenberg', 'dstollenberg3@wordpress.com', 'Male', '1996-10-10', 'Indonesia');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Joyann', 'Conibeer', 'jconibeer4@discuz.net', 'Female', '1970-09-01', 'Philippines');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Ingaborg', 'McFater', 'imcfater5@mit.edu', 'Female', '2006-10-27', 'China');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Veronike', 'Levay', 'vlevay6@instagram.com', 'Female', '2013-06-06', 'Portugal');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Gordy', 'Gorcke', 'ggorcke7@nasa.gov', 'Male', '1970-12-04', 'Canada');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Vilma', 'Lucock', 'vlucock8@github.com', 'Female', '1995-11-30', 'China');
insert into owners (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Elnar', 'Elsom', 'eelsom9@uiuc.edu', 'Male', '2000-09-21', 'Portugal');

insert into cars (brand, model, year, price, owner_id) values ('Volvo', 'XC90', 2011, '67094.50', 1);
insert into cars (brand, model, year, price, owner_id) values ('BMW', '5 Series', 2003, '31770.58', 1);
insert into cars (brand, model, year, price, owner_id) values ('Cadillac', 'XLR', 2009, '22943.17', 2);
insert into cars (brand, model, year, price, owner_id) values ('Buick', 'Skylark', 1995, '79591.57', 3);
insert into cars (brand, model, year, price, owner_id) values ('Cadillac', 'Catera', 1998, '69325.92', 4);
insert into cars (brand, model, year, price, owner_id) values ('GMC', '1500 Club Coupe', 1996, '94250.68', 4);
insert into cars (brand, model, year, price, owner_id) values ('Isuzu', 'Ascender', 2008, '93586.80', 6);
insert into cars (brand, model, year, price, owner_id) values ('Mercedes-Benz', 'SL-Class', 2008, '13972.16', 8);
insert into cars (brand, model, year, price, owner_id) values ('Chevrolet', 'Corvette', 1999, '13906.62', 8);
insert into cars (brand, model, year, price, owner_id) values ('Dodge', 'Stratus', 1997, '92993.83', 10);
