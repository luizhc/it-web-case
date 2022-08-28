import { TimestampToDatePipe } from './timestamp-to-date.pipe';

describe('TimestampToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToDatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
