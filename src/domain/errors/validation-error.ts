export default class ValidationError extends Error {
  constructor(prop: string, message: string) {
    super(`Error validating ${prop}: ${message}`);
    this.name = "ValidationError";
  }
}
