/**
 * Header Entry Variables
 */
export interface Header {
  /**
   * User Licensed Dealer identification Number
   * 9 digits
   */
  licensedDealerId: string;
  /**
   * Month for which detailed report is being submitted
   * YYYYMM
   */
  reportMonth: string;
  /**
   * Report Type.
   * Field Value=1, Future changes possible
   */
  // TODO: redundant ATM
  reportType?: string;
  /**
   * File Generation Date
   * YYYYMM
   */
  // TODO: can be self generated (optional?)
  generationDate: string;
  /**
   * Total taxable sales sign
   * True => +
   * False => -
   */
  // TODO: can be joined with taxableSalesAmount
  taxableSalesSign: boolean;
  /**
   * Total amount of taxable sales (excluding VAT)
   * in the reported file
   */
  taxableSalesAmount: number;
  /**
   * Total VAT on taxable sales sign
   * True => +
   * False => -
   */
  // TODO: can be joined with taxableSalesVat
  taxableSalesVatSign: boolean;
  /**
   * Total VAT on taxable sales
   * in the reported file
   */
  taxableSalesVat: number;
  /**
   *  Total sales taxable at *different rate* sign.
   * Currently "True" (+)
   * True => +
   * False => -
   */
  // TODO: can be joined with taxableDifferentRateSales
  taxableDifferentRateSalesSign: boolean;
  /**
   * Total of sales taxable at different rate (excluding VAT).
   * Currently zeros – for future use
   */
  // TODO: redundant ATM
  taxableDifferentRateSales: number;
  /**
   * Total VAT on sales taxable at different rate sign.
   * Currently "True" (+)
   * True => +
   * False => -
   */
  // TODO: can be joined with taxableDifferentRateSalesVat
  taxableDifferentRateSalesVatSign: boolean;
  /**
   * Total VAT on sales taxable at different rate.
   * Currently zeros – for future use
   */
  // TODO: redundant ATM
  taxableDifferentRateSalesVat: number;
  /**
   * Total number of records for "sales".
   * Number of sales records - both taxable and zero-rated/ exempt
   */
  salesRecordCount: number;
  /**
   * Total of zero value and exempt sales sign
   * True => +
   * False => -
   */
  // TODO: can be joined with zeroValOrExemptSalesCount
  zeroValOrExemptSalesCountSign: boolean;
  /**
   * Total of zero value/exempt sales for period
   */
  zeroValOrExemptSalesCount: number;
  /**
   * Total VAT on "other" (non-capital) inputs sign
   * True => +
   * False => -
   */
  // TODO: can be joined with otherInputsVat
  otherInputsVatSign: boolean;
  /**
   * Total VAT on "other" inputs required during period
   */
  otherInputsVat: number;
  /**
   * Total VAT on "equipment" inputs required during period sign
   * True => +
   * False => -
   */
  // TODO: can be joined with otherInputsVat
  equipmentInputsVatSign: boolean;
  /**
   * Total VAT on "equipment" inputs required during period
   */
  equipmentInputsVat: number;
  /**
   * Total number of records for inputs (other and equipment)
   */
  inputsCount: number;
  /**
   * Total VAT to pay / receive sign.
   * "True" (+) symbol to pay
   */
  totalVatSign: boolean;
  /**
   * Total VAT to pay / receive for period
   */
  totalVat: number;
}

/**
 * Transaction Entry Variables
 */
export interface Transaction {
  /**
   * Entry Type (document type)
   */
  entryType: EntryType;
  /**
   * VAT identification number – of the other side of the transaction.
   * For transactions entries – the customer
   * For inputs – the supplier
   */
  vatId: string;
  /**
   * Invoice Date/Reference.
   * YYYYMMDD
   */
  invoiceDate: string;
  /**
   * Reference group.
   * Series etc. zeros are possible at this stage
   */
  refGroup: string;
  /**
   * Reference number.
   * First 9 positions from the right
   */
  refNumber: string;
  /**
   * Total VAT in invoice / total VAT that is allowed (1/4…. 2/3…).
   * Rounded to the nearest shekel – always a positive value
   */
  totalVat: number;
  /**
   * Credit/summary invoice sign
   * Cancellation/credit from supplier or customer – always in minus
   * True => +
   * False => -
   */
  // TODO: can be joined with invoiceSum
  // TODO: redundant ATM
  invoiceSumSign: boolean;
  /**
   * Invoice total (excluding VAT)
   * Always the 100%, always a positive value, rounded to the nearest shekel
   */
  invoiceSum: number;
  /**
   * Space for future data
   * Reference number to be allocated by "Sha'am" to the supplier
   */
  // TODO: redundant ATM
  extraSpace: string;
}

type EntryType =
  | "S" // Sales – "regular" sale
  | "L" // Sales – for unidentified (private) customer
  | "M" // Sales – self invoice
  | "Y" // Sales – export
  | "I" // Sales – Palestinian Authority customer. Palestinian customer – Invoice I
  | "T" // Input – "regular" from Israeli Supplier
  | "K" // Input – Petty Cash. Various suppliers – Petty Cash
  | "R" // Input – Import. Overseas supplier
  | "P" // Input – Supplier from Palestinian Authority. Palestinian supplier – Invoice P
  | "H" // Input – Single document by law. Such as Import entry, bank document etc.
  | "C"; // Input – self invoice
