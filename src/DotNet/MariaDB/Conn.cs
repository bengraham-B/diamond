using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace MariaDB;


public class Conn
{
    private readonly string _connectionString;

    public Conn(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("MariaDB")
            ?? throw new InvalidOperationException("MariaDB Connection String not found");
    }

    // Used for Synchronous Code
    public MySqlConnection Open()
    {
        var connection = new MySqlConnection(_connectionString);
        connection.Open();
        return connection;
    }

    // Used for Async Code
    public async Task<MySqlConnection> OpenAsync()
    {
        var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }
}