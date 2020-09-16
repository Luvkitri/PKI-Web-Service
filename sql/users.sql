create table users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	google_id VARCHAR(255) NOT NULL,
	display_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	google_image VARCHAR(255),
	created_at DATE NOT NULL
);

insert into users (google_id, display_name, last_name, google_image, created_at) values ('1', 'Ives', 'Dockwra', 'null', '1971-02-19');