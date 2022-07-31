export const numberFormat = (d: number) => {
  for (var e = 0; d >= 1000; e++) {
    d /= 1000;
  }
  return d.toFixed(3) + ["", " k", " M", " G"][e];
};

export const convertMinsToHrsMins = (minutes: number) => {
  var h: any = Math.floor(minutes / 60);
  var m: any = minutes % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return h + ":" + m;
};

export const truncateString = (string: string, maxLength: number = 50) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
