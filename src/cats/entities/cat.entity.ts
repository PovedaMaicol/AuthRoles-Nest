import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { User } from 'src/users/entities/user.entity'; // Importar la entidad de usuario

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Breed, (breed) => breed.id, { 
    eager: true, // para que traiga la raza al hacer un findOne
  })
  breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userName', referencedColumnName: 'username' })
  user: User; // Relación con la tabla de usuarios, para saber quién creó el gato

  @Column()
  userName: string; // Nombre de usuario del creador del gato, para poder hacer la relación con la tabla de usuarios

}
