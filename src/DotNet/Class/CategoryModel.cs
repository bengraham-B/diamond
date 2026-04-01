using System.Text.Json.Serialization;

namespace Class;

public class CategoryModel
{
    [JsonPropertyName("CATEGORY_ID")]
    public Guid? CATEGORY_ID { get; set; }
    [JsonPropertyName("GL_ACCOUNT_CODE")]
    public int GL_ACCOUNT_CODE { get; set; }
    public Guid? GROUP_ID { get; set; }
    public Guid accountID { get; set; }
    public string CATEGORY_NAME { get; set; }
    public string? details { get; set; }
    public string CATEGORY_TYPE { get; set; } // INCOME | EXPENSE
}