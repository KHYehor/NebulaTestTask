export class UserNotFoundError extends Error {
  constructor(userId: number) {
    super(`User not found: ${userId}`);
  }
}
