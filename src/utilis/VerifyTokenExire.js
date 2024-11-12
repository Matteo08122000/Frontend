export const IsTokenExpire = (TokenExp, cb) => {
  const expirationDate = new Date(TokenExp * 1000);
  const dateToDay = new Date();
  const isTokenExpired = expirationDate < dateToDay;

  if (isTokenExpired) {
    cb();
  }

  return isTokenExpired;
};
