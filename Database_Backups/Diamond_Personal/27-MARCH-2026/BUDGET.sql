create table BUDGET
(
    BUDGET_ID     uuid                                  not null
        primary key,
    ACCOUNT_ID    uuid                                  null,
    GL_ACCOUNT_ID uuid                                  null,
    AMOUNT        double                                null,
    BUDGET_PERIOD text                                  not null
        check (`BUDGET_PERIOD` in ('WEEK', 'MONTH')),
    CREATED       timestamp default current_timestamp() null
);

INSERT INTO DIAMOND_PERSONAL.BUDGET (BUDGET_ID, ACCOUNT_ID, GL_ACCOUNT_ID, AMOUNT, BUDGET_PERIOD, CREATED) VALUES ('6da9bb6a-22e5-11f1-9764-ae053b649f32', 'de58d6a9-1512-11f1-a3e0-ce6cdc3544e3', '7105219b-1515-11f1-a3e0-ce6cdc3544e3', 150, 'WEEK', '2026-03-19 17:36:49');
INSERT INTO DIAMOND_PERSONAL.BUDGET (BUDGET_ID, ACCOUNT_ID, GL_ACCOUNT_ID, AMOUNT, BUDGET_PERIOD, CREATED) VALUES ('f96a502d-22f0-11f1-9764-ae053b649f32', 'de58d6a9-1512-11f1-a3e0-ce6cdc3544e3', 'c1fabb97-1513-11f1-a3e0-ce6cdc3544e3', 100, 'WEEK', '2026-03-20 06:06:26');
