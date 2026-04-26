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

        // For Loop which adds the SQL to select the sum for all the months
        for (int i = 1; i < 13; i++)
        {
            SQL += $" COALESCE(SUM(CASE WHEN DT.MONTH={i}  THEN ROUND(DT.AMOUNT, 2) END), 0) AS {monthName[i-1]}, ";
        }

        SQL += " MERCHANT.NAME, ";
        SQL += " MERCHANT.MERCHANT_ID, ";
        SQL += " MERCHANT.MERCHANT_ID,";
        SQL += " COALESCE(SUM(ROUND(AMOUNT, 2)), 0) AS TOTAL ";
        
        SQL += " FROM MERCHANT ";
        
        SQL += " LEFT JOIN DIAMOND_TRANSACTION DT ON MERCHANT.MERCHANT_ID = DT.MERCHANT_ID AND DT.ACCOUNT_ID = @ACCOUNT_ID AND DT.TXN_TYPE IN ('EXPENSE', 'INCREASE') ";
        SQL += " WHERE MERCHANT.ACCOUNT_ID=@ACCOUNT_ID  ";
        SQL += " GROUP BY MERCHANT.MERCHANT_ID, MERCHANT.NAME ";
        SQL += " ORDER BY MERCHANT.NAME";
        

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", requestParams.ACCOUNT_ID);

        var reader = cmd.ExecuteReader();
        
        List<MonthlyReportModel> reportResult = new List<MonthlyReportModel>(); 

        while (reader.Read())
        {
            reportResult.Add(new MonthlyReportModel
            {
                NAME = reader.GetString("NAME"),
                TOTAL = reader.GetDouble("TOTAL"),
                ID = reader.GetGuid("MERCHANT_ID"),
                JAN = reader.GetDouble("JAN"),
                FEB = reader.GetDouble("FEB"),
                MAR = reader.GetDouble("MAR"),
                APR = reader.GetDouble("APR"),
                MAY = reader.GetDouble("MAY"),
                JUN = reader.GetDouble("JUN"),
                JUL = reader.GetDouble("JUL"),
                AUG = reader.GetDouble("AUG"),
                SEPT = reader.GetDouble("SEPT"),
                OCT = reader.GetDouble("OCT"),
                NOV = reader.GetDouble("NOV"),
                DEC = reader.GetDouble("DECEMBER"),
            });
            
        }
        
        
        return new DiamondResponse
        {
            Success = true,
            MonthlyReportList = reportResult
        };
    }
    
}