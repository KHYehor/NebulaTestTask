import { Injectable } from '@nestjs/common';
import { OfferEntity } from '../entities/offer.entity';
import { CreateOfferDto } from '../dtos/createOffer.dto';

@Injectable()
export class OffersRepository {
  private dataSource: Map<number, OfferEntity> = new Map<number, OfferEntity>();
  private serialCounter: number = 0;

  public async createOffer(data: CreateOfferDto): Promise<OfferEntity> {
    const entity = OfferEntity.fromDtoToEntity(data, this.serialCounter);
    this.dataSource.set(this.serialCounter, entity);
    this.serialCounter++;
    return entity;
  }

  public getAllOffers(): Promise<OfferEntity[]> {
    return Promise.resolve([...this.dataSource.values()]);
  }

  public getOfferById(id: number): Promise<OfferEntity | undefined> {
    return Promise.resolve(this.dataSource.get(id));
  }
}
