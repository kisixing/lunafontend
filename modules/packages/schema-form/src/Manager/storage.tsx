import localforage from 'localforage';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8', { fatal: true });
export { localforage };
export default class StorageHelp {
  constructor(key: string) {
    this.key = key;
  }

  key: string;
  async setItem(value: any) {
    const stringifiedData = JSON.stringify(value);
    const bits: Uint8Array = textEncoder.encode(stringifiedData);
    localforage.setItem(this.key, Array.from(bits));
  }
  async get() {
    const numbers: Array<number> = await localforage.getItem(this.key);
    const bits = new Uint8Array(numbers);
    if (!bits) {
      throw 'local data invalid';
    }
    const stringifiedData = textDecoder.decode(bits);
    return JSON.parse(stringifiedData) as Array<any>;
  }
  async removeItem() {
    localforage.removeItem(this.key);
  }
}
