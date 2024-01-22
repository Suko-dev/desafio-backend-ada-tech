import Logger from '../logger';

describe(`${Logger.name}`, () => {
  it('should not log on pre-commit environment', () => {
    jest.spyOn(console, 'log');

    Logger.log('test');

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should not debug on pre-commit environment', () => {
    jest.spyOn(console, 'log');

    Logger.debug('test');

    expect(console.log).not.toHaveBeenCalled();
  });
});
