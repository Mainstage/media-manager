DROP DATABASE IF EXISTS media_manager;

CREATE DATABASE media_manager;

USE media_manager;

CREATE TABLE USERS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30) not null,
  email varchar(40) not null,
  userId varchar(40) not null,
  UNIQUE (email)
);

CREATE TABLE ALBUMS (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(40),
  iconCover text,
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

CREATE TABLE USERS_GROUPS (
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
