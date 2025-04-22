/* eslint-disable */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';

import { Breed } from 'src/breeds/entities/breed.entity';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto, user) {
  if (!createCatDto.breed) {
    throw new NotFoundException('Breed is required');
  }
  const breed = await this.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userName: user.username, // Asignar el nombre de usuario del creador
    });
  }

  async findAll(user) {
    return await this.catRepository.find({
      where: { userName: user.username }, // Filtrar por el nombre de usuario del creador
    });
  }

  async findOne(id: number, user) {
    try {
      const cat = await this.catRepository.findOne({ where: { id } });

      if (!cat) {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }

      this.validateOwnership(cat, user);

      return cat;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Reenvía el error de "no encontrado" que ya creamos
      } else if (error instanceof UnauthorizedException) {
        throw error; // También reenvía el error de autorización
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

  private validateOwnership(cat: Cat, user) {
    if (user.role !== Role.ADMIN && cat.userName !== user.username) {
      throw new UnauthorizedException(
        'You do not have permission to access this cat',
      );
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({
      name: breed,
    });

    if (!breedEntity) {
      throw new NotFoundException(
        `Breed not found`,
      );
    }

    return breedEntity
  }
}
