/* eslint-disable */
import { Role } from '../../common/enums/rol.enum';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false, select: false }) // select: false para que no se muestre la contraseña al hacer un select
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role})
  role: Role

  @DeleteDateColumn()
  deletedAt: Date;
}
