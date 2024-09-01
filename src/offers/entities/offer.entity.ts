import { CreateOfferDto } from '../dtos/createOffer.dto';
import { OfferDto } from '../dtos/offer.dto';

export class OfferEntity {
  constructor(args?: CreateOfferDto, id?: number) {
    Object.assign(this, args, { id });
  }
  public id: number;
  public name: string;
  public price: number;

  public toDto(): OfferDto {
    const dto = new OfferDto();
    dto.id = this.id;
    dto.name = this.name;
    dto.price = this.price;

    return dto;
  }

  public static fromDtoToEntity(dto: CreateOfferDto, id: number): OfferEntity {
    return new OfferEntity(dto, id);
  }
}
