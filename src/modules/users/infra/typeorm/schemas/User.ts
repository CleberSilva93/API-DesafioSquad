// import { uuid } from 'uuidv4'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('userss')
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  senha: string;

  @Expose()
  @Column()
  last_at: Date;

  @Column()
  telefones: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
