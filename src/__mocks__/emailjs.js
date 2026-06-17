module.exports = {
  send: jest.fn(() => Promise.resolve({ status: 200 })),
};
