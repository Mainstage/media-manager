DROP DATABASE IF EXISTS mediaManager;

CREATE DATABASE mediaManager;

USE mediaManager;

CREATE TABLE USERS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  email varchar(40) not null,
  client_auth_id varchar(40),
  group_id int not null,
  FOREIGN KEY (group_id) REFERENCES GROUPS(id) ON DELETE CASCADE,
  UNIQUE (email)
);

CREATE TABLE ALBUMS (
  id int NOT NULL AUTO_INCREMENT primary key,
  creator varchar(40),
  name varchar(40),
  folder varchar(40),
  password varchar(40),
  iconCover varchar(40)
);

CREATE TABLE MEDIA (
  id int NOT NULL AUTO_INCREMENT primary key,
  creator varchar(40),
  album varchar(40),
  media_type varchar(40),
);

CREATE TABLE GROUPS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(40) not null,
  super BOOL
);

CREATE TABLE USER_ALBUM (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int not null,
  album_id int not null,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (album_id) REFERENCES ALBUMS(id) ON DELETE CASCADE
);

CREATE TABLE GROUP_ALBUM (
  id int NOT NULL AUTO_INCREMENT primary key,
  group_id int not null,
  album_id int not null,
  FOREIGN KEY (user_id) REFERENCES GROUPS(id) ON DELETE CASCADE,
  FOREIGN KEY (album_id) REFERENCES ALBUMS(id) ON DELETE CASCADE
);



INSERT INTO GROUPS (name, super) VALUES ("Media-Manager", TRUE);
INSERT INTO USERS (name, email, group_id) VALUES ("Media-Manager Development", "dev@joshwentworth.com", 1);
INSERT INTO USERS (name, email, group_id) VALUES ("Benjamin Antalek", "ben.antalek@gmail.com", 1);
INSERT INTO USERS (name, email, group_id) VALUES ("Josh Wentworth", "contact@joshwentworth.com", 1);
INSERT INTO ALBUMS (creator, email, name, group_id) VALUES ("Josh Wentworth", "contact@joshwentworth.com", "Stairway to Heaven", 1);
INSERT INTO ALBUMS (creator, email, name, group_id) VALUES ("Josh Wentworth", "contact@joshwentworth.com", "III", 1);
