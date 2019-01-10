const input = `
Lorem ipsum dolor sit amet, consectetur adipiscing hello
world elit. Nam sit amet elit id risus aliquam porta.
`;
describe('Regex', () => {

  describe('dotAll mode', () => {
    it('should dot matches a line break', () => {
      expect(/hello.world/.test(input)).toBe(false);

      expect(/hello.world/u.test(input)).toBe(false);

      expect(/hello.world/s.test(input)).toBe(true);

      expect(/hello.world/su.test(input)).toBe(true);
    });
  });

  describe('Unicode properties escape', () => {
    const regexAscii = /\p{ASCII}/u;
    const regexMath = /\p{Math}/u;

    it('should support', () => {
      expect(regexAscii.test('_')).toBe(true);
      expect(regexMath.test('≠')).toBe(true);
    });
  });

  describe('String matchAll', () => {
    const string = 'Magic hex numbers: DEADBEEF CAFE 8BADF00D';
    const regex = /\b\p{ASCII_Hex_Digit}+\b/gu;
    it('should support', () => {
      const matchArray = [];
      const expectedArray = ['DEADBEEF', 'CAFE', '8BADF00D'];
      for (const match of string.matchAll(regex)) {
        matchArray.push(match[0]);
      }
      expect(matchArray).toEqual(expectedArray);
    });
  });

  describe('Lookahead support', () => {
    it('should support positive lookahead', () => {
      const pattern = /\d+(?= dollars)/u;
      expect(pattern.exec('42 dollars')[0]).toBe('42');
    });

    it('should support negative lookahead', () => {
      const pattern = /\d+(?! dollars)/u;
      expect(pattern.exec('42 reais')[0]).toBe('42');
    });
  });

  describe('Lookbehind support', () => {
    it('should support positive lookbehind', () => {
      const pattern = /(?<=\$)\d+/u;
      expect(pattern.exec('$42')[0]).toBe('42');
    });

    it('should support negative lookbehind', () => {
      const pattern = /(?<!\$)\d+/u;
      expect(pattern.exec('&42')[0]).toBe('42');
    });
  });

  describe('Named capture groups support', () => {
    const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
    const result = pattern.exec('2018-05-09');
    it('should capture each group by name', () => {
      expect(result.groups.year).toBe('2018');
      expect(result.groups.month).toBe('05');
      expect(result.groups.day).toBe('09');
    });
  });

});
