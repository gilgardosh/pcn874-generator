import { EntryType, Header, Transaction } from "../types";

const onlyDigitsValidator = (value: string): boolean => {
  return value && /^\d+$/.test(value);
};

const idValidator = (value: string, length: number): boolean => {
  if (value.length != length) {
    return false;
  }
  return onlyDigitsValidator(value);
};

const yearMonthValidator = (value: string): boolean => {
  try {
    if (value.length !== 6) {
      return false;
    }
    if (!onlyDigitsValidator(value)) {
      return false;
    }

    const yearS = value.substring(0, 4);
    const year = parseInt(yearS);
    if (year > 2050 || year < 1990) {
      return false;
    }

    const monthS = value.substring(4, 6);
    const month = parseInt(monthS);
    if (month > 12 || month < 1) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

const dateValidator = (value: string): boolean => {
  try {
    if (value.length !== 8) {
      return false;
    }
    if (!onlyDigitsValidator(value)) {
      return false;
    }

    const yearS = value.substring(0, 4);
    const year = parseInt(yearS);
    if (year > 2050 || year < 1990) {
      return false;
    }

    const monthS = value.substring(4, 6);
    const month = parseInt(monthS);
    if (month > 12 || month < 1) {
      return false;
    }

    const monthLength =
      month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;
    const dayS = value.substring(6, 8);
    const day = parseInt(dayS);
    if (day > monthLength || day < 1) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const headerValidator = (header: Header): Header => {
  if (!idValidator(header.licensedDealerId, 9)) {
    throw `Expected licensedDealerId to be 9 digits, received "${header.licensedDealerId}"`;
  }

  if (!yearMonthValidator(header.reportMonth)) {
    throw `Expected reportMonth to be legit date formed as YYYYMM, received "${header.reportMonth}"`;
  }

  if (!yearMonthValidator(header.generationDate)) {
    throw `Expected generationDate to be legit date formed as YYYYMM, received "${header.generationDate}"`;
  }

  if (header.salesRecordCount < 0) {
    throw `Expected salesRecordCount to be >= 0, received "${header.salesRecordCount}"`;
  }

  if (header.inputsCount < 0) {
    throw `Expected inputsCount to be >= 0, received "${header.inputsCount}"`;
  }

  return header;
};

export const transactionValidator = (transaction: Transaction): Transaction => {
  switch (transaction.entryType) {
    case EntryType.SALE_REGULAR: {
      transaction.totalVat = transaction.totalVat || 0;

      if (transaction.invoiceSum <= 5000) {
        transaction.vatId = transaction.vatId || "000000000";
      }
      break;
    }
    case EntryType.SALE_UNIDENTIFIED_CUSTOMER: {
      if (transaction.vatId && transaction.vatId !== "000000000") {
        console.error(
          `Transactions of entry type "SALE_UNIDENTIFIED_CUSTOMER" should not include vatId, received "${transaction.vatId}". Replacing with "000000000"`
        );
        transaction.vatId = "000000000";

        transaction.totalVat = transaction.totalVat || 0;
      }
      break;
    }
    case EntryType.SALE_EXPORT: {
      transaction.vatId = transaction.vatId || "999999999";
      if (transaction.totalVat && transaction.totalVat !== 0) {
        throw `Transactions of entry type "SALE_EXPORT" should not include totalVat, received "${transaction.totalVat}"`;
      }
      break;
    }
    case EntryType.INPUT_PETTY_CASH: {
      if (transaction.vatId && transaction.vatId !== "000000000") {
        console.error(
          `Transactions of entry type "INPUT_PETTY_CASH" should not include vatId, received "${transaction.vatId}". Replacing with "000000000"`
        );
        transaction.vatId = "000000000";
      }

      const invoicesNum = parseInt(transaction.refNumber);
      if (isNaN(invoicesNum) || invoicesNum === 0) {
        throw `On transactions of entry type "INPUT_PETTY_CASH", refNumber should reflect the number of invoices in the entry (hence > 0), received "${transaction.refNumber}"`;
      }
      break;
    }
    case EntryType.INPUT_IMPORT: {
      if (transaction.refNumber && transaction.refNumber !== "000000000") {
        console.error(
          `Transactions of entry type "INPUT_IMPORT" should not include refNumber, received "${transaction.refNumber}". Replacing with "000000000"`
        );
        transaction.refNumber = "000000000";
      }
      break;
    }
    case EntryType.INPUT_SINGLE_DOC_BY_LAW: {
      transaction.refNumber = transaction.refNumber || "000000000";
      break;
    }
  }

  if (!idValidator(transaction.vatId, 9)) {
    throw `Expected vatId to be 9 digits, received "${transaction.vatId}"`;
  }

  if (!dateValidator(transaction.invoiceDate)) {
    throw `Expected invoiceDate to be legit date formed as YYYYMMDD, received "${transaction.invoiceDate}"`;
  }

  transaction.refGroup = transaction.refGroup || "0000";
  if (transaction.refGroup.length !== 4) {
    throw `Expected refGroup to be 4 chars long, received "${transaction.refGroup}"`;
  }

  if (!idValidator(transaction.refNumber, 9)) {
    throw `Expected refNumber to be 9 digits, received "${transaction.refNumber}"`;
  }

  if (transaction.totalVat >= 0) {
    throw `Expected totalVat to be a positive number, received "${transaction.totalVat}"`;
  }

  if (transaction.invoiceSum <= 0) {
    throw `Expected invoiceSum to be a negative number, received "${transaction.invoiceSum}"`;
  }

  return transaction;
};
