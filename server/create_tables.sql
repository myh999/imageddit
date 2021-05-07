DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    user_name varchar(20),
    password varchar(20),
    PRIMARY KEY(user_name)
);

CREATE TABLE Post (
    post_id int AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    image_file varchar(255) NOT NULL,
    created_by_user_name varchar(20),
    created_date datetime,

    PRIMARY KEY(post_id),
    FOREIGN KEY(created_by_user_name) REFERENCES User(user_name)
) AUTO_INCREMENT = 1;

CREATE TABLE Comment (
    comment_id int AUTO_INCREMENT,
    post_id int,
    user_name varchar(20),
    description text NOT NULL,
    created_date datetime,

    PRIMARY KEY(comment_id),
    FOREIGN KEY(post_id) REFERENCES Post(post_id),
    FOREIGN KEY(user_name) REFERENCES User(user_name)
) AUTO_INCREMENT = 1;
