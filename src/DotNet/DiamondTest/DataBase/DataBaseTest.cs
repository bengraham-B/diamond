using Class;
using MariaDB;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace DiamondTest.DataBase;

public class DataBaseTest
{
    private readonly Conn _conn;

    public DataBaseTest()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(configuration);
    }

    [Theory]
    [InlineData("BUDGET", typeof(BudgetModel))]
    [InlineData("DIAMOND_TRANSACTION", typeof(Class.DiamondTransaction))]
    [InlineData("MERCHANT", typeof(Class.MerchantModel))]
    public void TestModelTypesAgaintsDataBaseTableTypes(string pTableName, Type pModelType)
    {
        using var connection = _conn.Open();

        const string SQL = @"
            SELECT
                COLUMN_NAME,
                DATA_TYPE
            FROM 
                INFORMATION_SCHEMA.COLUMNS
            WHERE
                TABLE_NAME = @TABLE_NAME
                AND TABLE_SCHEMA = 'DIAMOND_PERSONAL';
        
        ";

        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.Add("@TABLE_NAME", MySqlDbType.VarChar).Value = pTableName;
        var reader = cmd.ExecuteReader();

        var dbTypeMap = new Dictionary<string, Type>()
        {
            { "char", typeof(Guid) },
            { "varchar", typeof(string) },
            { "double", typeof(double) },
            { "int", typeof(int) },
            { "tinyint", typeof(bool) },
            { "datetime", typeof(DateTime) }
        };

        var modelProperties = pModelType
            .GetProperties()
            .ToDictionary(p => p.Name, p => p.PropertyType);

        while (reader.Read())
        {
            var columnName = reader.GetString("COLUMN_NAME");
            var dbtype = reader.GetString("DATA_TYPE");
            
            if(!modelProperties.ContainsKey(columnName)) continue;
            if(!dbTypeMap.ContainsKey(dbtype)) continue;

            var expectedCSharopType = dbTypeMap[dbtype];
            var actualModelType = modelProperties[columnName];
            var underlyingType = Nullable.GetUnderlyingType(actualModelType) ?? actualModelType;
            
            Assert.True(
                underlyingType == expectedCSharopType,
                $"[{pTableName}] Field '{columnName}': DB type '{dbtype}' expects C# type '{expectedCSharopType.Name}' but model has '{underlyingType.Name}'"
            );
        }
    }
}