using Class;
using MariaDB;
using MySqlConnector;

namespace GL_ACCOUNT;

public class GLAccountCRUD
{
    public static DiamondResponse AddGLAccount(Conn conn, GLAccountModel model)
    {

        const string SQL = @"
            INSERT INTO GL_ACCOUNT
                (GL_ACCOUNT_ID, GL_ACCOUNT_TYPE, GL_ACCOUNT_CODE, GL_ACCOUNT_NAME, ACCOUNT_ID)
            VALUES
                (
                    @GL_ACCOUNT_ID, 
                    @GL_ACCOUNT_TYPE, 
                    (SELECT MAX(GL_ACCOUNT_CODE) FROM GL_ACCOUNT WHERE GL_ACCOUNT_TYPE=@GL_ACCOUNT_TYPE AND ACCOUNT_ID=@ACCOUNT_ID) + 1, 
                    @GL_ACCOUNT_NAME, 
                    @ACCOUNT_ID
                );
        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_ID", model.GL_ACCOUNT_ID);
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_TYPE", model.GL_ACCOUNT_TYPE);
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_NAME", model.GL_ACCOUNT_NAME);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", model.ACCOUNT_ID);

        int rowsAffected = cmd.ExecuteNonQuery();

        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Unable to Add GL Account"
        };
    }

    public static DiamondResponse  GetGLAccounts(Conn conn, RequestParams req)
    {
        if (req.ACCOUNT_ID == Guid.Empty)
        {
            return new DiamondResponse
            {
                Success = false,
                ErrorMessage = "No AccountID (GUID) provided."
            };
        }
        
        const string SQL = @"
            SELECT
                *
            FROM
                GL_ACCOUNT
            WHERE
                ACCOUNT_ID=@ACCOUNT_ID
                /*AND GL_ACCOUNT_CODE NOT IN (-1000, 1000, -2000, 2000, -3000, 3000, -4000, 4000, 5000) /* These are the base accounts */
            ORDER BY 
                GL_ACCOUNT_TYPE DESC,
                GL_ACCOUNT_NAME
        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", req.ACCOUNT_ID);
        using var reader = cmd.ExecuteReader();
        
        List<GLAccountModel> GLAccounts = new List<GLAccountModel>();

        while (reader.Read())
        {
            GLAccounts.Add(new GLAccountModel
                {
                    GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                    GL_ACCOUNT_CODE = reader.GetInt32("GL_ACCOUNT_CODE"),
                    ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID")
                }
            );
        }
            
        return new DiamondResponse
        {
            Success = true,
            GLAccountList = GLAccounts,
            AccountID = req.ACCOUNT_ID
        };
    }

    public static DiamondResponse UpdateGLAccount(Conn conn, GLAccountModel model)
    {

        const string SQL = @"
            UPDATE GL_ACCOUNT SET
                GL_ACCOUNT_NAME=@GL_ACCOUNT_NAME,
                GL_ACCOUNT_TYPE=@GL_ACCOUNT_TYPE
            WHERE
                GL_ACCOUNT_ID=@GL_ACCOUNT_ID OR
                ACCOUNT_ID=@ACCOUNT_ID
        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);

        cmd.Parameters.AddWithValue("@GL_ACCOUNT_NAME", model.GL_ACCOUNT_NAME);
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_TYPE", model.GL_ACCOUNT_TYPE);
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_ID", model.GL_ACCOUNT_ID);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", model.ACCOUNT_ID);

        int rowsAffected = cmd.ExecuteNonQuery();
        
        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Could not Update DIAMOND_TRANSACTION"
        };
    }

    public static DiamondResponse DeleteGLAccount(Conn conn, RequestParams req)
    {
        const string SQL = @"
           DELETE FROM GL_ACCOUNT WHERE GL_ACCOUNT_ID=@GL_ACCOUNT_ID AND ACCOUNT_ID=@ACCOUNT_ID
        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        
        cmd.Parameters.AddWithValue("@GL_ACCOUNT_ID", req.GL_ACCOUNT_ID);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", req.ACCOUNT_ID);

        int rowsAffected = cmd.ExecuteNonQuery();
        
        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Could not Update DIAMOND_TRANSACTION"
        };
    }
}