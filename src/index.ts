import express from "express";
import {mintTokens, burnTokens, sendNativeTokens} from "./mintToken";
const app = express();

const HELIUS_RESPONSE = { 
 "nativeTransfers": [ {
   "amount": 500000000,
   "fromUserAccount": "6ohFuLgPt1UFvR7q31dvK7fTSmwJHU659wUzBiv19ND2",
   "toUserAccount": "HgJv5i7hJYEsoYRacw7bDJ7RSuc3SoT9WmRQysDjPzE7" 
} ] } 

const MYVALUT = "HgJv5i7hJYEsoYRacw7bDJ7RSuc3SoT9WmRQysDjPzE7";

app.post('/helius', async(req, res) => {
    const incomingTX = HELIUS_RESPONSE.nativeTransfers.find(X => X.toUserAccount == MYVALUT)
    if(!incomingTX){
        res.json ({message:"processed"})
        return
    }
    const fromAddress = incomingTX.fromUserAccount;
    const toAddress = MYVALUT;
    const amounts = incomingTX.amount;
    const type = "received_native_sol";
    await mintTokens(fromAddress, toAddress, amounts);
    
    // if(type === "received_native_sol"){
    //     await mintTokens(fromAddress, toAddress, amount);
    // }
    // else{
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }


    res.send('Transaction successful');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})