export class OfferNotFound extends Error {
  constructor(offerId: number) {
    super(`Offer not found with id: ${offerId}`);
  }
}
