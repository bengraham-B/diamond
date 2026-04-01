create table ACCOUNT
(
    ACCOUNT_ID uuid      default uuid()              not null
        primary key,
    USER_ID    uuid                                  null,
    EMAIL      text                                  null,
    CREATED    timestamp default current_timestamp() null
);

