const hasPlayerWon = require('./script');

test('box selections 1,2,3 is a winning combination', () => {
    expect(hasPlayerWon(['1', '2', '3'])).toBe(true);
});

test('box selections 1,2,4 is not a winning combination', () => {
    expect(hasPlayerWon(['1', '2', '4'])).toBe(false);
});