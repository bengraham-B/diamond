namespace Class;

public class MerchantModel
{
    public Guid? ACCOUNT_ID { get; set; }
    public Guid? MERCHANT_ID { get; set; }
    public required string NAME { get; set; }
    public string? TOWN { get; set; }
    public string? LOCATION { get; set; }
    public string? SHOPPING_CENTER { get; set; }

}