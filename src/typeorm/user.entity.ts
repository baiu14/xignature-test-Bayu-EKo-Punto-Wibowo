import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'phone',
    nullable: true,
    default: null,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  address: string;

  @Column({
    type: "text",
    nullable: true,
    default: null,
  })
  password: string;

  @Column({ 
    type: 'timestamp', 
    nullable: true ,
    default: null,
  })
  last_login_at: Date;
  @Column({ 
    type: 'timestamp', 
    nullable: true ,
    default: null,
  })
  created_at: Date;
  @Column({ 
    type: 'timestamp', 
    default: null,
  })
  updated_at: Date;
  @Column({ 
    type: 'timestamp', 
    nullable: true ,
    default: null,
  })
  deleted_at: Date;
}