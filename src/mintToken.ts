import {mintTo, getOrCreateAssociatedTokenAccount} from "@solana/spl-token"
import {Connection, Keypair, PublicKey} from "@solana/web3.js"
import {PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address"
import bs58 from "bs58";


const connection = new Connection("https://api.devnet.solana.com", "confirmed");


const mintAddress = new PublicKey(TOKEN_MINT_ADDRESS);
const private_key = PRIVATE_KEY;
const wallet = bs58.decode(private_key as string);
const payer = Keypair.fromSecretKey(new Uint8Array(wallet));

export const mintTokens = async (fromAddress: string, toAddress:string, amounts: number) => {
    const to = new PublicKey(fromAddress);
    const asscociatedAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintAddress, to);
    console.log(asscociatedAccount.address);
    await mintTo(connection, payer, mintAddress, asscociatedAccount.address, payer.publicKey, amounts);
    console.log(`Minted ${amounts} tokens to ${to}`);
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("sending Native tokens");
}