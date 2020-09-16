import { decodeBase64, encodeBase32 } from "./crypto";

const skylinkBase64 = "_Arz-l1fj49cpWiPFD1RMkvEZoyKEsT7bmXzc_WqDFp-Xw";
const skylinkBase32 = "vg5f7uitbu7oun55d27h8fah695s8pkch89c9urecnpn7tda1hd7sno";
const skylinkRaw = new Uint8Array([
  252,
  10,
  243,
  250,
  93,
  95,
  143,
  143,
  92,
  165,
  104,
  143,
  20,
  61,
  81,
  50,
  75,
  196,
  102,
  140,
  138,
  18,
  196,
  251,
  110,
  101,
  243,
  115,
  245,
  170,
  12,
  90,
  126,
  95,
]);

test("should decode base64 encoded skylink", () => {
  expect(decodeBase64(skylinkBase64)).toEqual(skylinkRaw);
});

test("should encode raw skylink as base32", () => {
  expect(encodeBase32(skylinkRaw)).toEqual(skylinkBase32);
});
