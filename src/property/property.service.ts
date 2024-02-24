import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Property } from '../entities';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './property.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async getProperties(id: string) {
    try {
      const prop = await this.propertyRepository.findOneByOrFail({
        id: id,
      });
      return prop;
    } catch (error) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
    }
  }

  async createProperty(propertyDto: CreatePropertyDto, owner_id: string) {
    const prop = this.propertyRepository.create({
      ...propertyDto,
      owner: { id: owner_id },
    });

    return this.propertyRepository.save(prop);
  }

  async updateProperty(id: string, propertyDto: CreatePropertyDto) {
    const prop = await this.propertyRepository.findOneBy({
      id: id,
    });

    if (!prop) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
    }
    return this.propertyRepository.update({ id: id }, propertyDto);
  }

  async getAllProperties() {
    return this.propertyRepository.find();
  }
}
