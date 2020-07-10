const Connection = require('../lib/connection.js');

describe("Connection", () => {
  it("can be created with a ID", () => {
    const conn = new Connection({ connectionId: 'TEST' });
    expect(conn.asJson().id).toEqual('TEST');
  });
});