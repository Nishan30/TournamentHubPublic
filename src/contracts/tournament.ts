import {  
    Contract, 
    TransactionBuilder, 
    Networks, 
    BASE_FEE, 
    nativeToScVal, 
    Address, rpc
  } from "@stellar/stellar-sdk";
  import {  } from "@stellar/stellar-sdk";
  import { userSignTransaction } from './connectWallet'; 
  import { getPublicKey } from '@stellar/freighter-api'; 
  
  const rpcUrl = "https://soroban-testnet.stellar.org";
  const contractAddress = "CA7AGM47V62YUWKLOZXVCFHZF6WA3FIACA3XG53CME6CISCRU4WTRXJE";
  
  const params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  };

  interface TournamentDetails {
    description: string;
    end_date: Date;
    is_individual: boolean;
    location: string;
    name: string;
    needs_arbriter: boolean;
    rules: string;
    start_date: Date;
    tournament_type: string;
  }  
  
  const stringToScVal = (value: string) => nativeToScVal(value, { type: "string" });
  const boolToScVal = (value: Boolean) => nativeToScVal(value, { type: "bool" });

  const accountToScVal = (account: string) => new Address(account).toScVal();

  async function callContractFunction(
    caller: string, 
    functionName: string, 
    values?: any[]
  ): Promise<any> {
    console.log(values);
    const provider = new rpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);
  
    const transactionBuilder = new TransactionBuilder(sourceAccount, params);
  
    if (values) {
      transactionBuilder.addOperation(contract.call(functionName, ...values));
    } else {
      transactionBuilder.addOperation(contract.call(functionName));
    }
  
    const builtTx = transactionBuilder.setTimeout(30).build();
    const preparedTx = await provider.prepareTransaction(builtTx);

  
    const signedTx = await userSignTransaction(preparedTx.toXDR(), "TESTNET", caller);
    const tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
  
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            console.log(txResponse);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                console.log(txResponse);
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
  }

  export async function createTournament(details: TournamentDetails) {
    const tournamentDetails = {
      description: "Annual Chess Tournament",
      end_date: BigInt(1703980800), // Unix timestamp
      is_individual: true,
      location: "New York",
      name: "Chess Championship 2024",
      needs_arbriter: true,
      rules: "Standard FIDE rules apply",
      start_date: BigInt(1703894400), // Unix timestamp
      tournament_type: "Swiss System"
  };

    try {
      const caller = await getPublicKey();
      const tourDetail = [
        accountToScVal(caller),
        stringToScVal(details.name),
        stringToScVal(details.description),
        stringToScVal(details.rules),
        stringToScVal(details.location),
        stringToScVal(details.tournament_type),
        boolToScVal(details.needs_arbriter),
        boolToScVal(details.is_individual),
        nativeToScVal(Math.floor(details.start_date.getTime() / 1000), { type: "u64" }),
        nativeToScVal(Math.floor(details.end_date.getTime() / 1000), { type: "u64" })
      ];
      //const result = createTournamentTest(caller,details);
      const result = await callContractFunction(caller, 'save_tournament',tourDetail);
      console.log('Tournament created:', result);
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  }
  
  
  export async function getTournament(tournamentId: number): Promise<any> {
    const caller = await getPublicKey();
    const values = [nativeToScVal(tournamentId, { type: "u32" })];
    return await callContractFunction(caller, "get_tournament", values);
  }
  
  export async function updateTournament(tournamentId: number, updates: object): Promise<any> {
    const caller = await getPublicKey();
    const values = [
      nativeToScVal(tournamentId, { type: "u32" }),
      updates,
    ];
    return await callContractFunction(caller, "update_tournament", values);
  }
  
  export async function getTournamentsByAddress(address: string): Promise<any> {
    const caller = await getPublicKey();
    const values = [accountToScVal(address)];
    return await callContractFunction(caller, "get_tournaments_by_address", values);
  }
  
  export async function getTournamentsByEmail(email: string): Promise<any> {
    const caller = await getPublicKey();
    const values = [nativeToScVal(email, { type: "string" })];
    return await callContractFunction(caller, "get_tournaments_by_email", values);
  }
  