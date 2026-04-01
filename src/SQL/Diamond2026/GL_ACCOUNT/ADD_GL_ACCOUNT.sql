/*
    Diamond2026_Personal

    Categories will eb created by users and Map automatically to GL_CODES which will be
    done on the backend.

    UUID's are created in the variable section and used in the corresponding tables to ensure
    they are linked successfully.

    Types : EXPENSE | INCOME | LIABILITY | ASSET
*/

START TRANSACTION;

SET @GL_ACCOUNT_ID = UUID();

SET @TYPE = 'INCOME';
SET @NAME = 'Salary';
SET @ACCOUNT_ID = 'de58d6a9-1512-11f1-a3e0-ce6cdc3544e3'; # MAIN_ACCOUNT

-- GET LATEST GL_CODE BY TYPE ==============================
SET @LATEST_GL_CODE = (SELECT MAX(GL_ACCOUNT_CODE) FROM GL_ACCOUNT WHERE GL_ACCOUNT_TYPE=@TYPE AND ACCOUNT_ID=@ACCOUNT_ID);
SELECT @LATEST_GL_CODE;

-- INSERT INTO GL_ACCOUNT =====================================
INSERT INTO GL_ACCOUNT
    (GL_ACCOUNT_ID, GL_ACCOUNT_TYPE, GL_ACCOUNT_CODE, GL_ACCOUNT_NAME, ACCOUNT_ID)
VALUES
    (@GL_ACCOUNT_ID, @TYPE, @LATEST_GL_CODE + 1, @NAME, @ACCOUNT_ID);

SELECT * FROM GL_ACCOUNT WHERE ACCOUNT_ID=@ACCOUNT_ID AND GL_ACCOUNT_TYPE=@TYPE ORDER BY GL_ACCOUNT_CODE DESC;

COMMIT;

