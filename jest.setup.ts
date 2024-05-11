global.window = {
  ...global.window,
  localStorage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
    removeItem: jest.fn(),
  },
} as unknown as Window & typeof globalThis;
