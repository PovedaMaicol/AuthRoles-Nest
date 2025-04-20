/* eslint-disable */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';

import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new NotFoundException(
        `Breed with name ${createCatDto.breed} not found`,
      );
    }

    return await this.catRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    try {
      const cat = await this.catRepository.findOne({ where: { id } });

      if (!cat) {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      return cat;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Reenvía el error de "no encontrado" que ya creamos
      } else if (error instanceof QueryFailedError) {
        // Error específico de la base de datos
        throw new InternalServerErrorException(
          'Error en la consulta a la base de datos',
        );
      } else {
        // Para otros errores inesperados
        console.error('Error al buscar el gato:', error);
        throw new InternalServerErrorException('Error interno del servidor');
      }
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    try {
      const cat = await this.catRepository.findOne({ where: { id } });
      if (!cat) {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      // await this.catRepository.update(id, updateCatDto);

      // obtener y devolver el gato actualizado
      const updatedCat = await this.catRepository.findOne({ where: { id } });

      return {
        statusCode: 200,
        message: `Cat with id ${id} updated successfully`,
        data: updatedCat,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Reenvía el error de "no encontrado" que ya creamos
      } else if (error instanceof QueryFailedError) {
        // Error específico de la base de datos
        throw new InternalServerErrorException(
          'Error en la consulta a la base de datos',
        );
      } else {
        // Para otros errores inesperados
        console.error('Error al actualizar el gato:', error);
        throw new InternalServerErrorException('Error interno del servidor');
      }
    }
  }

  async remove(id: number) {
    try {
      const cat = await this.catRepository.findOne({ where: { id } });
      if (!cat) {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      await this.catRepository.delete(id);

      return {
        message: `Cat with id ${id} deleted successfully`,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Reenvía el error de "no encontrado" que ya creamos
      } else if (error instanceof QueryFailedError) {
        // Error específico de la base de datos
        throw new InternalServerErrorException(
          'Error en la consulta a la base de datos',
        );
      } else {
        // Para otros errores inesperados
        console.error('Error al eliminar el gato:', error);
        throw new InternalServerErrorException('Error interno del servidor');
      }
    }
  }
}
