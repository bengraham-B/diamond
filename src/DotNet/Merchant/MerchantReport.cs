using Class;
using Class.Report;
using MariaDB;
using MySqlConnector;

namespace Merchant;

public class MerchantReport
{

    public static DiamondResponse MonthlyMerchantReport(Conn conn, RequestParams requestParams)
    {
        // DEC is reserved in SQL
        string[] monthName = { "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DECEMBER" };
        string SQL = @" SELECT ";

        for (int i = 1; i < 13; i++)
        {
            SQL += $" COALESCE(SUM(CASE WHEN DT.MONTH={i}  THEN DT.AMOUNT END), 0) AS {monthName[i-1]}, ";
        }

        SQL += " MERCHANT.NAME, ";
        SQL += " MERCHANT.MERCHANT_ID,";
        SQL += " COALESCE(SUM(AMOUNT), 0) AS TOTAL ";
        
        SQL += " FROM MERCHANT ";
        
        SQL += " LEFT JOIN DIAMOND_TRANSACTION DT ON MERCHANT.MERCHANT_ID = DT.MERCHANT_ID AND DT.ACCOUNT_ID = @ACCOUNT_ID AND DT.TXN_TYPE IN ('EXPENSE', 'INCREASE') ";
        SQL += " WHERE MERCHANT.ACCOUNT_ID=@ACCOUNT_ID  ";
        SQL += " GROUP BY MERCHANT.MERCHANT_ID, MERCHANT.NAME ";
        

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);

        cmd.Parameters.AddWithValue("@ACCOUNT_ID", requestParams.ACCOUNT_ID);
        
        List<MonthlyReportModel> reportResult = new List<MonthlyReportModel>(); 
        
        return new DiamondResponse
        {
            Success = true
        };
    }
    
}