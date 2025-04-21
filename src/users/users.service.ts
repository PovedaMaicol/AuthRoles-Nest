/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }
    return user;
  }

  async findByUsernameWithPassword(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role'],
    })
    if (!user) {
      return null;
    }
    return user;
  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   try {
  //     const user = await this.userRepository.findOne({ where: { id } });

  //     // Verificar si el usuario existe
  //     if (!user) {
  //       throw new NotFoundException(`User with id ${id} not found`);
  //     }

  //     // Si se está actualizando la contraseña, la encriptamos
  //     if (updateUserDto.password) {
  //       const salt = await bcrypt.genSalt();
  //       updateUserDto.password = await bcrypt.hash(
  //         updateUserDto.password,
  //         salt,
  //       );
  //     }

  //     // Actualizamos el usuario
  //     await this.userRepository.update(id, updateUserDto);

  //     // obtenemos el usuario actualizado
  //     const updatedUser = await this.userRepository.findOne({ where: { id } });

  //     // eliminamos la contraseña del objeto que vamos a devolver por seguridad
  //     if (updatedUser) {
  //       delete updatedUser.password;
  //     }

  //     return updatedUser;
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }

  //     console.error('Error updating user:', error);
  //     throw new InternalServerErrorException(
  //       'An error occurred while updating the user',
  //     );
  //   }
  // }

}
