import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateOfferDto } from './dtos/createOffer.dto';
import { OffersService } from './offers.service';
import { CreatePurchaseDto } from './dtos/createPurchase.dto';
import { UsersService } from '../users/users.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { UserNotFoundError } from '../users/errors/userNotFound.error';
import { OfferNotFound } from './errors/offerNotFound.error';
import { OfferDto } from './dtos/offer.dto';
import { PurchaseDto } from './dtos/purchase.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(
    private offersService: OffersService,
    private usersService: UsersService,
    private analyticsService: AnalyticsService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created offer' })
  @ApiBody({ type: CreateOfferDto, description: 'Create offer' })
  public async create(
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferDto> {
    try {
      return await this.offersService.createOffer(createOfferDto);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of offers' })
  public async list(): Promise<OfferDto[]> {
    try {
      return await this.offersService.listOffers();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of offers' })
  public async getOfferById(@Param('id') id: number): Promise<OfferDto> {
    let data: OfferDto | undefined;
    try {
      data = await this.offersService.getOfferById(id);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data) {
      throw new HttpException(`User not found by ${id}`, HttpStatus.NOT_FOUND);
    }

    return data;
  }

  @Post('purchase')
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unexpected error',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User/Offer not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of offers' })
  @ApiBody({ type: CreatePurchaseDto, description: 'Create a purchase.' })
  public async purchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    try {
      const purchase = await this.offersService.purchase(createPurchaseDto);

      this.analyticsService.saveReport();
      this.usersService.sendPostponedReportToUser(purchase);

      return purchase;
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof OfferNotFound
      ) {
        throw new HttpException(error.toString(), HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
