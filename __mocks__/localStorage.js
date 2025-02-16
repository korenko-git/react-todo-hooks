class LocalStorageMock {
  constructor() {
    this.storage = {};
  }

  clear() {
    this.storage = {};
  }

  getItem = jest.fn((key) => this.storage[key] || null);

  setItem = jest.fn((key, value) => {
    this.storage[key] = String(value);
  });

  removeItem(key) {
    delete this.storage[key];
  }

  get length() {
    return Object.keys(this.storage).length;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});
