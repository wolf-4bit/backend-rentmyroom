import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { AuthGuard } from '../auth/auth.guard';
import { Owner } from './property.guard';
import { CreatePropertyDto } from './property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  async getProperties(@Param('id') id: string) {
    return await this.propertyService.getProperties(id);
  }
  @UseGuards(AuthGuard, Owner)
  @Post()
  async createProperty(@Req() req, @Body() propertyDto: CreatePropertyDto) {
    const owner = req.user.id;
    return await this.propertyService.createProperty(propertyDto, owner);
  }

  @UseGuards(AuthGuard, Owner)
  @Post(':id')
  async updateProperty(
    @Param('id') id: string,
    @Body() propertyDto: CreatePropertyDto,
  ) {
    return await this.propertyService.updateProperty(id, propertyDto);
  }

  @Get('/all')
  async getAllProperties() {
    console.log(await this.propertyService.getAllProperties());
  }
}
