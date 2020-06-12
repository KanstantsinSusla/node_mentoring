export default class ServiceError extends Error {
  constructor(message) {
    const serviceErrorMessage = `User service error: ${message}`;

    super(serviceErrorMessage);
  }
}
