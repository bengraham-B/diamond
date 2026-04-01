create table DIAMOND_USER
(
    ACCOUNT_ID      uuid      default uuid()              not null
        primary key,
    EMAIL           text                                  null,
    FIRST_NAME      text                                  null,
    LAST_NAME       text                                  null,
    DATE_OF_BIRTH   text                                  null,
    CREATED         timestamp default current_timestamp() null,
    DIAMOND_USER_ID uuid                                  not null
);

INSERT INTO DIAMOND_PERSONAL.DIAMOND_USER (ACCOUNT_ID, EMAIL, FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, CREATED, DIAMOND_USER_ID) VALUES ('32acc5e7-14c7-11f1-a3e0-ce6cdc3544e3', 'DEV@diamond.io', 'DEV1', 'DEV1', '1700-01-01', '2026-02-28 17:22:56', '32aec0da-14c7-11f1-a3e0-ce6cdc3544e3');
INSERT INTO DIAMOND_PERSONAL.DIAMOND_USER (ACCOUNT_ID, EMAIL, FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, CREATED, DIAMOND_USER_ID) VALUES ('de58d6a9-1512-11f1-a3e0-ce6cdc3544e3', 'grahamben7@gmail.com', 'Ben', 'Graham', '2001-05-08', '2026-03-01 19:33:28', 'de5bfaeb-1512-11f1-a3e0-ce6cdc3544e3');
