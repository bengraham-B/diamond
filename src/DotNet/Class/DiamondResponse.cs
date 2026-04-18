namespace Class;

public class DiamondResponse
{
    public Guid? DiamondTransactionID { get; set; }
    public Guid AccountID { get; set; }
    
    public bool Success { get; set; }
    public string? ErrorMessage { get; set; }
    public int? ErrorCode { get; set; }
    
    public DiamondTransactionModel? DiamondTransaction { get; set; }
    public List<DiamondTransactionModel>? DiamondTransactionList { get; set; }
    
    public List<BudgetModel>? BudgetList { get; set; }
    
    public List<MerchantModel>? MerchantList { get; set; }
    
    public List<GLAccountModel>? GLAccountList { get; set; }
}