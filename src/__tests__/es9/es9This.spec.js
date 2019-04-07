describe('This', () => {
  class MyObj {
    constructor(msg) {
      this.msg = msg;
    }

    run() {
      return this.msg;
    }
  }

  it('should be setted to the object', () => {
    const myObj = new MyObj('Object method called');
    const result = myObj.run();

    expect(result).toBe('Object method called');
  });

  it('shouldn\'t be setted when executed as plain function', () => {
    const myObj = new MyObj('Object method not called');
    const plainFunction = myObj.run;

    expect(plainFunction).toThrow(TypeError);
  });

  it('should be setted to the bind object', () => {
    const myObj1 = new MyObj('First object created');
    const notBoundRun = myObj1.run;
    const boundRun1 = ::myObj1.run;

    expect(myObj1.run()).toBe('First object created');
    expect(notBoundRun).toThrow(TypeError);
    expect(boundRun1()).toBe('First object created');

    const myObj2 = new MyObj('Second object created');
    const boundRun2 = myObj2::notBoundRun;

    expect(myObj2.run()).toBe('Second object created');
    expect(boundRun2()).toBe('Second object created');
  });

  it('should a method in object used by another', () =>{
    const room = {
      table: 'room\'s table',
      cleanTable() {
        return `Cleanning ${this.table}`;
      }
    };
    const garage = {
      table: 'garage\'s table',
    };

    expect(room.cleanTable()).toBe('Cleanning room\'s table');

    const cleanTable = room.cleanTable;
    expect(cleanTable).toThrow(TypeError);

    const cleanGarageTable = garage::cleanTable;
    expect(cleanGarageTable()).toBe('Cleanning garage\'s table');
  });

});
