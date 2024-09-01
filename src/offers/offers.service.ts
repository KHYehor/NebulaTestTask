import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dtos/createOffer.dto';
import { OffersRepository } from './repositories/offers.repository';
import { CreatePurchaseDto } from './dtos/createPurchase.dto';
import { UsersRepository } from '../users/repostitories/users.repository';
import { UserNotFoundError } from '../users/errors/userNotFound.error';
import { OfferNotFound } from './errors/offerNotFound.error';
import { PurchaseRepository } from './repositories/purchase.repository';
import { OfferDto } from './dtos/offer.dto';
import { PurchaseDto } from './dtos/purchase.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly offersRepository: OffersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly purchaseRepository: PurchaseRepository,
  ) {}

  public async createOffer(createOfferDto: CreateOfferDto): Promise<OfferDto> {
    try {
      const offer = await this.offersRepository.createOffer(createOfferDto);
      return offer.toDto();
    } catch (error) {
      console.error(
        `[UsersService.createUser] Error during creating offer: ${createOfferDto}`,
        error,
      );
      throw error;
    }
  }

  public async listOffers(): Promise<OfferDto[]> {
    try {
      const offers = await this.offersRepository.getAllOffers();
      return offers.map((offer) => offer.toDto());
    } catch (error) {
      console.error(
        '[UsersService.listUsers] Error during listing users',
        error,
      );
      throw error;
    }
  }

  public async getOfferById(id: number): Promise<OfferDto | undefined> {
    try {
      const offer = await this.offersRepository.getOfferById(id);
      return offer.toDto();
    } catch (error) {
      console.error(
        `[UsersService.listUsers] Error during getting offer by id ${id}`,
        error,
      );
      throw error;
    }
  }

  public async purchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    const [user, offer] = await Promise.all([
      this.usersRepository.getUserById(createPurchaseDto.userId),
      this.offersRepository.getOfferById(createPurchaseDto.offerId),
    ]);

    if (!user) {
      throw new UserNotFoundError(createPurchaseDto.userId);
    }

    if (!offer) {
      throw new OfferNotFound(createPurchaseDto.offerId);
    }

    const purchase =
      await this.purchaseRepository.createPurchase(createPurchaseDto);

    return purchase.toDto();
  }
}
