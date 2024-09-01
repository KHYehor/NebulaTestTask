import { CreatePurchaseDto } from '../dtos/createPurchase.dto';
import { PurchaseDto } from '../dtos/purchase.dto';

export class PurchaseEntity {
  constructor(args?: CreatePurchaseDto, id?: number) {
    Object.assign(this, args, { id });
  }
  public id: number;
  public offerId: number;
  public userId: number;

  public toDto(): PurchaseDto {
    const dto = new PurchaseDto();
    dto.id = this.id;
    dto.userId = this.userId;
    dto.offerId = this.offerId;

    return dto;
  }

  public static fromDtoToEntity(
    dto: CreatePurchaseDto,
    id: number,
  ): PurchaseEntity {
    return new PurchaseEntity(dto, id);
  }
}
