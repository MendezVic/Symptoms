DROP DATABASE IF EXISTS symptoms;

CREATE DATABASE symptoms;

USE symptoms;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_history;

create table users
(
    id            int unsigned auto_increment
        primary key,
    full_name     varchar(255)                        not null,
    gender        varchar(10)                         not null,
    date_of_birth date                                not null,
    email         varchar(255)                        not null,
    password      varchar(255)                        not null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    updated_at    timestamp default CURRENT_TIMESTAMP not null
);

create table users_history
(
    id         int unsigned auto_increment
        primary key,
    user_id    int unsigned                         not null,
    symptoms   varchar(255)                         null,
    diagnosis  json                                 not null,
    confirmed  tinyint(1) default 0                 not null,
    created_at timestamp  default CURRENT_TIMESTAMP not null,
    updated_at timestamp  default CURRENT_TIMESTAMP not null,
    constraint id_UNIQUE
        unique (id),
    constraint users_history_users_id_fk
        foreign key (user_id) references users (id)
);
