import { Header, Transaction } from "../types";
const HEADER_REPORT_TYPE = 1;
const HEADER_TAXABLE_DIFFERENT_RATE_SALES = "+00000000000";
const HEADER_TAXABLE_DIFFERENT_RATE_SALES_VAT = "+000000000";
const TRANSACTION_EXTRA_SPACE = "000000000";

const getDateString = (): string => {
  const now = new Date();
  const year = now.getUTCFullYear().toString();
  const month = ("0" + (now.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + now.getUTCDate()).slice(-2);
  return `${year}${month}${day}`;
};

const addLeadingZeros = (value: number, length: number): string => {
  const zeros = "0".repeat(length);
  const stringNum = Math.abs(Math.round(value)).toString();
  const final = (zeros + stringNum).slice(-length);
  return final;
};

const numToSignedString = (value: number, length: number): string => {
  const sign = value >= 0 ? "+" : "-";
  const paddedNum = addLeadingZeros(value, length);
  return `${sign}${paddedNum}`;
};

export const headerBuilder = (header: Header): string => {
  const {
    licensedDealerId,
    reportMonth,
    taxableSalesAmount,
    taxableSalesVat,
    salesRecordCount,
    zeroValOrExemptSalesCount,
    otherInputsVat,
    equipmentInputsVat,
    inputsCount,
    totalVat,
  } = header;

  const generationDate = header.generationDate || getDateString();

  const taxableSalesAmountString = numToSignedString(taxableSalesAmount, 11);

  const taxableSalesVatString = numToSignedString(taxableSalesVat, 9);

  const salesRecordCountString = addLeadingZeros(salesRecordCount, 9);

  const zeroValOrExemptSalesCountString = numToSignedString(
    zeroValOrExemptSalesCount,
    11
  );

  const otherInputsVatString = numToSignedString(otherInputsVat, 9);

  const equipmentInputsVatString = numToSignedString(equipmentInputsVat, 9);

  const inputsCountString = addLeadingZeros(inputsCount, 9);

  const totalVatString = numToSignedString(totalVat, 11);

  return `O${licensedDealerId}${reportMonth}${HEADER_REPORT_TYPE}${generationDate}${taxableSalesAmountString}${taxableSalesVatString}${HEADER_TAXABLE_DIFFERENT_RATE_SALES}${HEADER_TAXABLE_DIFFERENT_RATE_SALES_VAT}${salesRecordCountString}${zeroValOrExemptSalesCountString}${otherInputsVatString}${equipmentInputsVatString}${inputsCountString}${totalVatString}`;
};

export const transactionBuilder = (transaction: Transaction): string => {
  const {
    entryType,
    vatId,
    invoiceDate,
    refGroup,
    refNumber,
    totalVat,
    invoiceSum,
  } = transaction;

  const entryTypeLetter = entryType.valueOf();

  const totalVatString = addLeadingZeros(totalVat, 9);

  const invoiceSumString = numToSignedString(invoiceSum, 10);

  return `\n${entryTypeLetter}${vatId}${invoiceDate}${refGroup}${refNumber}${totalVatString}${invoiceSumString}${TRANSACTION_EXTRA_SPACE}`;
};

export const footerBuilder = (header: Header): string => {
  return `\nX${header.licensedDealerId}`;
};
