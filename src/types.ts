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

  // commented out since constant
  // /**
  //  * Report Type.
  //  * Field Value=1, Future changes possible
  //  */
  // reportType?: string;

  /**
   * File Generation Date
   * YYYYMM
   * if undefined - current date will be inputed
   */
  generationDate?: string;

  // commented out since implied by taxableSalesAmount
  // /**
  //  * Total taxable sales sign
  //  * True => +
  //  * False => -
  //  */
  // taxableSalesSign: boolean;

  /**
   * Total amount of taxable sales (excluding VAT)
   * in the reported file
   */
  taxableSalesAmount: number;

  // commented out since implied by taxableSalesVat
  // /**
  //  * Total VAT on taxable sales sign
  //  * True => +
  //  * False => -
  //  */
  // taxableSalesVatSign: boolean;

  /**
   * Total VAT on taxable sales
   * in the reported file
   */
  taxableSalesVat: number;

  // commented out since implied by taxableDifferentRateSales
  // /**
  //  *  Total sales taxable at *different rate* sign.
  //  * Currently "True" (+)
  //  * True => +
  //  * False => -
  //  */
  // taxableDifferentRateSalesSign: boolean;

  // commented out since constant
  // /**
  //  * Total of sales taxable at different rate (excluding VAT).
  //  * Currently zeros – for future use
  //  */
  // taxableDifferentRateSales: number;

  // commented out since implied by taxableDifferentRateSalesVat
  // /**
  //  * Total VAT on sales taxable at different rate sign.
  //  * Currently "True" (+)
  //  * True => +
  //  * False => -
  //  */
  // taxableDifferentRateSalesVatSign: boolean;

  // commented out since constant
  // /**
  //  * Total VAT on sales taxable at different rate.
  //  * Currently zeros – for future use
  //  */
  // taxableDifferentRateSalesVat: number;

  /**
   * Total number of records for "sales".
   * Number of sales records - both taxable and zero-rated/ exempt
   */
  salesRecordCount: number;

  // commented out since implied by zeroValOrExemptSalesCount
  // /**
  //  * Total of zero value and exempt sales sign
  //  * True => +
  //  * False => -
  //  */
  // zeroValOrExemptSalesCountSign: boolean;

  /**
   * Total of zero value/exempt sales for period
   */
  zeroValOrExemptSalesCount: number;

  // commented out since implied by otherInputsVat
  // /**
  //  * Total VAT on "other" (non-capital) inputs sign
  //  * True => +
  //  * False => -
  //  */
  // otherInputsVatSign: boolean;

  /**
   * Total VAT on "other" inputs required during period
   */
  otherInputsVat: number;

  // commented out since implied by equipmentInputsVat
  // /**
  //  * Total VAT on "equipment" inputs required during period sign
  //  * True => +
  //  * False => -
  //  */
  // equipmentInputsVatSign: boolean;

  /**
   * Total VAT on "equipment" inputs required during period
   */
  equipmentInputsVat: number;

  /**
   * Total number of records for inputs (other and equipment)
   */
  inputsCount: number;

  // commented out since implied by totalVat
  // /**
  //  * Total VAT to pay / receive sign.
  //  * "True" (+) symbol to pay
  //  */
  // totalVatSign: boolean;

  /**
   * Total VAT to pay / receive for period
   * positive value => pay
   * negative value => receive
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
  vatId?: string;

  /**
   * Invoice Date/Reference.
   * YYYYMMDD
   */
  invoiceDate: string;

  /**
   * Reference group.
   * Series etc. zeros are possible at this stage
   */
  refGroup?: string;

  /**
   * Reference number.
   * First 9 positions from the right
   */
  refNumber?: string;

  /**
   * Total VAT in invoice / total VAT that is allowed (1/4…. 2/3…).
   * Rounded to the nearest shekel – always a positive value
   */
  totalVat?: number;

  // commented out since constant AND implied by invoiceSum
  // /**
  //  * Credit/summary invoice sign
  //  * Cancellation/credit from supplier or customer – always in minus
  //  * True => +
  //  * False => -
  //  */
  // invoiceSumSign: boolean;

  /**
   * Invoice total (excluding VAT)
   * Always the 100%, always a positive value, rounded to the nearest shekel
   */
  invoiceSum: number;

  // commented out since constant
  // /**
  //  * Space for future data
  //  * Reference number to be allocated by "Sha'am" to the supplier
  //  */
  // extraSpace: string;
}

export enum EntryType {
  /**
   * Sales – "regular" sale
   * */
  SALE_REGULAR = "S",

  /**
   * Sales – for unidentified (private) customer
   * */
  SALE_UNIDENTIFIED_CUSTOMER = "L",

  /**
   * Sales – self invoice
   * */
  SALE_SELF_INVOICE = "M",

  /**
   * Sales – export
   * */
  SALE_EXPORT = "Y",

  /**
   * Sales – Palestinian Authority customer. Palestinian customer – Invoice I
   * */
  SALE_PALESTINIAN_CUSTOMER = "I",

  /**
   * Input – "regular" from Israeli Supplier
   * */
  INPUT_REGULAR = "T",

  /**
   * Input – Petty Cash. Various suppliers – Petty Cash
   * */
  INPUT_PETTY_CASH = "K",

  /**
   * Input – Import. Overseas supplier
   * */
  INPUT_IMPORT = "R",

  /**
   * Input – Supplier from Palestinian Authority. Palestinian supplier – Invoice P
   * */
  INPUT_PALESTINIAN_SUPPLIER = "P",

  /**
   * Input – Single document by law. Such as Import entry, bank document etc.
   * */
  INPUT_SINGLE_DOC_BY_LAW = "H",

  /**
   * Input – self invoice
   * */
  INPUT_SELF_INVOICE = "C",
}
