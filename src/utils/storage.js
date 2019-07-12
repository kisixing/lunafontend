/**
 * Storage处理
 */
class Storage {
  static getStorage(type) {
    if (type === 'localStorage') {
      return window.localStorage;
    }
    return window.sessionStorage;
  }

  /**
   * Set an item into storage
   * @param type storage type
   * @param key key to set
   * @param value value to set
   */
  setItem(key, value, type = 'sessionStorage') {
    Storage.getStorage(type).setItem(key, JSON.stringify(value));
  };

  /**
   * Get an item from storage
   * @param type storage type
   * @param key key to get
   * @param defaultVal value to return if key doesnt exist
   */
  getItem(key, type = 'sessionStorage') {
    const val = Storage.getStorage(type).getItem(key);
    if (!val || val === 'undefined') return val;
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  };

  /**
   * Remove item from storage
   * @param type storage type
   * @param key key to remove
   */
  removeItem(key, type = 'sessionStorage') {
    Storage.getStorage(type).removeItem(key);
  };
}

export default new Storage();
