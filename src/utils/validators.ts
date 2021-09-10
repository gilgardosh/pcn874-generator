import { Header } from "../types";

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

export const headerValidator = (header: Header): boolean => {
  if (!idValidator(header.licensedDealerId, 9)) {
    throw `Expected licensedDealerId to be 9 digits, received "${header.licensedDealerId}"`;
  }

  if (!yearMonthValidator(header.reportMonth)) {
    throw `Expected reportMonth to be formed as YYYYMM, received "${header.reportMonth}"`;
  }

  if (!yearMonthValidator(header.generationDate)) {
    throw `Expected generationDate to be formed as YYYYMM, received "${header.generationDate}"`;
  }

  return true;
};
