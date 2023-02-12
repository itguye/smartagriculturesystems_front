import {
    TextEncoder,
    TextDecoder
  } from 'text-encoding'
  
  /**
   * 编码
   * @param {*} str 需要编码的字符串
   * @param {*} encoding 编码类型(gb2312,utf-8)
   * @returns unit8Array类型的对象
   */
  export function encode(str, encoding) {
    let encode = new TextEncoder(encoding, {
      NONSTANDARD_allowLegacyEncoding: true
    })
    let uint8Array = encode.encode(str);
    return uint8Array;
  }
  
  
  /**
   * 解码
   * @param {*} uint8Array 需要解码的unit8Array类型的对象
   * @param {*} encoding 解码类型(gb2312,utf-8)
   * @returns 解码出来的字符串
   */
  export function decode(uint8Array, encoding) {
    let decode = new TextDecoder(encoding);
    return decode.decode(uint8Array)
  }
