import { Injectable } from '@nestjs/common';
import { PurchaseEntity } from '../entities/purchase.entity';
import { CreatePurchaseDto } from '../dtos/createPurchase.dto';

@Injectable()
export class PurchaseRepository {
  private dataSource: Map<number, PurchaseEntity> = new Map<
    number,
    PurchaseEntity
  >();
  private serialCounter: number = 0;

  public async createPurchase(
    data: CreatePurchaseDto,
  ): Promise<PurchaseEntity> {
    const entity = PurchaseEntity.fromDtoToEntity(data, this.serialCounter);
    this.dataSource.set(this.serialCounter, entity);
    this.serialCounter++;
    return entity;
  }

  public getAllPurchases(): Promise<PurchaseEntity[]> {
    return Promise.resolve([...this.dataSource.values()]);
  }

  public getPurchaseById(id: number): Promise<PurchaseEntity | undefined> {
    return Promise.resolve(this.dataSource.get(id));
  }
}
