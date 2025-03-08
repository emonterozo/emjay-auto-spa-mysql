import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  user_name: string;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: false })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Service, (service) => service.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
