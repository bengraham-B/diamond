using Class;
using Class.Report;
using MariaDB;
using MySqlConnector;

namespace GL_ACCOUNT;

public class GLAccountReport
{
        public static DiamondResponse MonthlyGLAccountReport(Conn conn, RequestParams requestParams)
    {
        // DEC is reserved in SQL
        string[] monthName = { "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DECEMBER" };
        string SQL = @" SELECT ";

        for (int i = 1; i < 13; i++)
        {
            SQL += $" COALESCE(SUM(CASE WHEN DT.MONTH={i}  THEN DT.AMOUNT END), 0) AS {monthName[i-1]}, ";
        }

        SQL += " GL_ACCOUNT.NAME, ";
        SQL += " GL_ACCOUNT.GL_ACCOUNT_ID,";
        SQL += " COALESCE(SUM(AMOUNT), 0) AS TOTAL ";
        
        SQL += " FROM GL_ACCOUNT ";
        
        SQL += " LEFT JOIN DIAMOND_TRANSACTION DT ON GL_ACCOUNT.GL_ACCOUNT_ID = DT.GL_ACCOUNT_ID AND DT.ACCOUNT_ID = @ACCOUNT_ID ";
        SQL += " WHERE MERCHANT.ACCOUNT_ID=@ACCOUNT_ID  ";
        SQL += " GROUP BY GL_ACCOUNT.GL_ACCOUNT_ID ";
        

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