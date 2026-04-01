package com.app.diamond_core.Controller;

import com.app.diamond_core.Model.DiamondTransactionModel;
import com.app.diamond_core.Model.RequestBodyModel;
import com.app.diamond_core.Repository.DiamondTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/diamond_transaction")
public class DiamondTransactionController {

    @Autowired
    private DiamondTransactionRepository diamondTransactionRepository;

    @PostMapping("/get_diamond_transactions")
    public List<DiamondTransactionModel> getDiamondTransactionsController(@RequestBody RequestBodyModel req){
        return diamondTransactionRepository.getDiamondTransactions(req);
    }

    @PostMapping("/add_diamond_transaction")
    public boolean addDiamondTransactionController(@RequestBody DiamondTransactionModel DT){
        return diamondTransactionRepository.addDiamondTransaction(DT);
    }

    @PutMapping("/edit_diamond_transaction")
    public DiamondTransactionModel editDiamondTransactionController(@RequestBody DiamondTransactionModel DT){
        return diamondTransactionRepository.editDiamondTransaction(DT);
    }

    @DeleteMapping("/delete_diamond_transaction")
    public RequestBodyModel deleteDiamondTransactionController(@RequestBody RequestBodyModel req){
        return diamondTransactionRepository.deleteDiamondTxn(req);
    }
}
