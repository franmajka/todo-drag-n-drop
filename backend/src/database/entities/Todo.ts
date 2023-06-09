import { Id } from 'src/common/types';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Id;

  @Column()
  content: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  order: number;
}
