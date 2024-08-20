// eslint-disable-next-line import/prefer-default-export
export class CustomError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
