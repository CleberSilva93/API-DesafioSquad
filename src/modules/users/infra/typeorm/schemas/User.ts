// import { uuid } from 'uuidv4'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
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
  telefone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
