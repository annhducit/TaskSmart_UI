export const isStatusCodeValid = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode <= 290;
};
