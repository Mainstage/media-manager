DROP DATABASE IF EXISTS media_manager;

CREATE DATABASE media_manager;

USE media_manager;

CREATE TABLE USERS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  email varchar(40) not null,
  client_auth_id varchar(40),
  UNIQUE (email)
);

CREATE TABLE ALBUMS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(40),
  folder varchar(40),
  password varchar(40),
  iconCover varchar(40),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

CREATE TABLE MEDIA (
  id int NOT NULL AUTO_INCREMENT primary key,
  media_type varchar(40),
  user_id int,
  album_id int,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (album_id) REFERENCES ALBUMS(id) ON DELETE CASCADE
);

CREATE TABLE GROUPS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(40) not null
);

CREATE TABLE USER_GROUPS (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int not null,
  group_id int not null,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES GROUPS(id) ON DELETE CASCADE
);
CREATE TABLE USERS_ALBUMS (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int not null,
  album_id int not null,
  FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
  FOREIGN KEY (album_id) REFERENCES ALBUMS(id) ON DELETE CASCADE
);

CREATE TABLE GROUPS_ALBUMS (
  id int NOT NULL AUTO_INCREMENT primary key,
  group_id int not null,
  album_id int not null,
  FOREIGN KEY (group_id) REFERENCES GROUPS(id) ON DELETE CASCADE,
  FOREIGN KEY (album_id) REFERENCES ALBUMS(id) ON DELETE CASCADE
);