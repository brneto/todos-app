// https://github.com/babel/babel-eslint/issues/749
describe('Objects', () => {

  describe('In Array', () => {
    it('should be mutated when returned by Array.find() method', () => {
      const arrayOfObjects = [
        { id: 1, name: 'Berchris' },
        { id: 2, name: 'Bruna' },
        { id: 3, name: 'Julia' },
      ];
      const obj = arrayOfObjects.find(obj => obj.id === 2);

      expect('name' in obj).toBe(true);
      expect(obj.name).toBe(arrayOfObjects[1].name);

      obj.name = 'Bruna Requiao';
      expect(obj.name).toBe(arrayOfObjects[1].name);
    });
  });

  describe('should make no difference if a properties is written into quotes', () => {
    const obj1 = {
      user: {
        firstname: 'Paulo',
        lastname: 'Silva'
      }
    };

    const obj2 = {
      user: {
        'firstname': 'Paulo',
        'lastname': 'Silva'
      }
    };

    it('should be equal to objects properties not write into quotes', () => {
      expect(obj1).toEqual(obj2);
    });
  });

  describe('optional chaining', () => {
    const obj = {
      user: {
        firstname: 'Paulo',
        lastname: 'Silva'
      }
    };

    it('should be supported', () => {
      expect(obj?.bar).toEqual(undefined);
    });
  });

  describe('Rest properties', () => {
    const person = {
      firstName: 'Daenerys',
      lastName: 'Targaryen',
      nickName: 'Dany',
      culture: 'Valyrian',
    };
    const { firstName, lastName, ...rest } = person;

    it('should support destructuring assigment', () => {
      expect(firstName).toEqual('Daenerys');
      expect(lastName).toEqual('Targaryen');
      expect(rest).toEqual({ nickName: 'Dany', culture: 'Valyrian' });
    });

    it('should support spread properties', () => {
      const personCopy = { firstName, lastName, ...rest };
      expect(personCopy).toEqual({
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        nickName: 'Dany',
        culture: 'Valyrian',
      });
    });
  });

  describe('Merge objects', () => {
    const defaultSettings = { logWarning: false, logErros: false };
    const userSettings = { logErros: true };

    it('should support', () => {
      const mergedSettings = { ...defaultSettings, ...userSettings };
      expect(mergedSettings).toEqual({ logWarning: false, logErros: true });
    });
  });

  describe('Private properties', () => {
    class IncreasingCounter {
      #count = 0;

      get value() {
        return this.#count;
      }

      increment() {
        this.#count = this.value + 1;
      }
    }

    it('should support', () => {
      const counter = new IncreasingCounter();
      expect(counter['#count']).toBe(undefined);
      expect(counter['value']).toEqual(0);
      counter.increment();
      expect(counter['#count']).toBe(undefined);
      expect(counter['value']).toEqual(1);
    });
  });

  describe('Private methods', () => {
    class IncreasingCounter {
      #count = 0;

      set #privateInicial(value = this.#count) {
        this.#count = value;
      }

      get #privateValue() {
        return this.#count;
      }

      #privateIncrement() {
        this.#count = this.value + 1;
      }

      set inicial(value = this.#count) {
        this.#privateInicial = value;
      }

      get value() {
        return this.#privateValue;
      }

      increment() {
        this.#privateIncrement();
      }

    }

    it('should support', () => {
      const counter = new IncreasingCounter();
      expect(counter['#privateInicial']).toBe(undefined);
      expect(counter['#privateValue']).toBe(undefined);
      expect(counter['#privateIncrement']).toBe(undefined);
      counter.inicial = 2;
      counter.increment();
      expect(counter['value']).toEqual(3);
    });
  });
});
