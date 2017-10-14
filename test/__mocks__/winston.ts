const winston: any = jest.genMockFromModule("winston");

/* tslint:disable-next-line:variable-name */
export const Logger = jest.fn(options => options);

export const transports = {
  Console: jest.fn(),
  File: jest.fn(o => o)
};

export default winston;
