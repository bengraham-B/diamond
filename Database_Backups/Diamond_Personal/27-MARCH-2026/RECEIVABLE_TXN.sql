create table RECEIVABLE_TXN
(
    RECEIVABLE_TXN_ID  uuid                                  not null
        primary key,
    ACCOUNT_ID         uuid                                  null,
    TRANSACTION_ID     uuid                                  null,
    TRANSACTION_SOURCE text                                  null,
    TYPE               uuid                                  null,
    DEBTOR_ID          uuid                                  null,
    CREATED            timestamp default current_timestamp() null
);

