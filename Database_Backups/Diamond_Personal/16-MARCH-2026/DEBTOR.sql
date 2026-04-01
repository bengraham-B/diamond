create table DEBTOR
(
    DEBTOR_ID  uuid                                  not null
        primary key,
    ACCOUNT_ID uuid                                  null,
    NAME       text                                  null,
    DETAILS    text                                  null,
    CREATED    timestamp default current_timestamp() null
);

