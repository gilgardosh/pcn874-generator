import { Header, Transaction } from "./src/types";
import {
  footerBuilder,
  headerBuilder,
  headerValidator,
  transactionBuilder,
  transactionValidator,
} from "./src/utils";

const generator = (header: Header, transactions: Transaction[]) => {
  let textFile = "";

  // handle header
  try {
    header = headerValidator(header);
  } catch (e) {
    throw `Header validation error: ${(e as Error).message}`;
  }
  textFile += headerBuilder(header);

  // handle transactions
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    try {
      transaction = transactionValidator(transaction);
    } catch (e) {
      throw `Transaction index ${i} validation error: ${(e as Error).message}`;
    }
    textFile += transactionBuilder(transaction);
  }

  // handle footer
  textFile += footerBuilder(header);

  return textFile;
};

export default generator;
