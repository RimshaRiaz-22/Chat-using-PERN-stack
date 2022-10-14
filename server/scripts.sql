create sequence user_seq increment 1 start 1;
create sequence msg_seq increment 1 start 1;

create table userData(
	id integer NOT NULL DEFAULT nextval('user_seq'),
	username varchar(50) NOT NULL,
	email varchar(25),
	password varchar(25),
	isAvatarImageSet varchar(25),
    avatarImage varchar(25),
	constraint user_cons PRIMARY KEY(id)
);
create table msg(
    id integer NOT NULL DEFAULT nextval('msg_seq'),
	messages varchar[] ,
	toUser integer NOT NULL,
	fromUser integer NOT NULL,
	constraint msg_cons PRIMARY KEY(id),
	constraint fk_toUser FOREIGN KEY(toUser) REFERENCES userData(id),
	constraint fk_fromUser FOREIGN KEY(fromUser) REFERENCES userData(id)
);
