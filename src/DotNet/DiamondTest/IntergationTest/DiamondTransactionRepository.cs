namespace DiamondTest.IntergationTest;

public class DiamondTransactionRepository
{
    private readonly AppDbContext _context;
    public DiamondTransactionRepository(AppDbContext context) => _context = context;

    // public List<Class.DiamondTransaction> GetUserTXN() => _context.DiamondTransactions.ToList();
}