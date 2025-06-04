describe('krs service', () => {
  beforeEach(() => {
    chrome.storage.sync._data = {};
  });

  it('add stores key result', async () => {
    await krs.add({ title: 't', start: '2020-01-01', end: '2020-01-15' });
    const data = chrome.storage.sync._data;
    if (!data['testuid']) throw new Error('Item not stored');
  });

  it('getAll returns stored results', async () => {
    await krs.add({ title: 't', start: '2020-01-01', end: '2020-01-15' });
    const all = await krs.getAll();
    if (Object.keys(all).length !== 1) throw new Error('Unexpected number of items');
  });

  it('getLastValue returns current value', () => {
    const today = require('moment')().startOf('isoWeek').format('YYYY-MM-DD');
    const results = [{ day: today, value: 5 }];
    const val = krs.getLastValue(results);
    expect(val).toBe(5);
  });
});
