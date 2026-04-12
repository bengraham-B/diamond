using MySqlConnector;

namespace DiamondTransaction;
using Class;
using MariaDB;

public class DiamondTransactionCRUD
{
    public static List<DiamondTransaction> GetDiamondTransaction(Conn conn, RequestParams req)
    {
        const string SQL = @"
           SELECT
               *
           FROM
               DIAMOND_TRANSACTION DT
           LEFT JOIN GL_ACCOUNT ON DT.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
           LEFT JOIN MERCHANT ON DT.MERCHANT_ID = MERCHANT.MERCHANT_ID
           WHERE
               DT.ACCOUNT_ID=@ACCOUNT_ID
           ORDER BY DAY DESC

        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = req.ACCOUNT_ID;
        var reader = cmd.ExecuteReader();

        List<DiamondTransaction> diamondTransactions = new List<DiamondTransaction>();

        while (reader.Read())
        {
            diamondTransactions.Add(new DiamondTransaction
                {
                    ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID"),
                    DIAMOND_TRANSACTION_ID = reader.GetGuid("DIAMOND_TRANSACTION_ID"),
                    AMOUNT = reader.GetDouble("AMOUNT"),
                    DETAILS = reader.GetString("DETAILS"),
                    
                    TXN_TYPE = reader.GetString("TXN_TYPE"),
                    SOURCE = reader.GetString("SOURCE"),
                    
                    DATE = reader.GetString("DATE"),
                    
                    MERCHANT_ID = reader.IsDBNull(reader.GetOrdinal("MERCHANT_ID")) ? null : reader.GetGuid("ACCOUNT_ID"),
                    MERCHANT_NAME = reader.IsDBNull(reader.GetOrdinal("NAME")) ? null : reader.GetString("NAME"),

                    GL_ACCOUNT_ID = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_ID")) ? null : reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_NAME = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_NAME")) ? null : reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_TYPE = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_TYPE")) ? null : reader.GetString("GL_ACCOUNT_TYPE"),
                }
            );
            
        }
        return diamondTransactions;
    }
}