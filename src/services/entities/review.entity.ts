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
  user_name: string; // Name of the reviewer

  @Column({ type: 'text', nullable: false })
  comment: string; // Review comment

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: false })
  rating: number; // Rating (e.g., 4.5, 5.0)

  @CreateDateColumn()
  created_at: Date; // Timestamp of the review

  @ManyToOne(() => Service, (service) => service.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
