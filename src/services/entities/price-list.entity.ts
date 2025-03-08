import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'price_lists' })
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['sm', 'md', 'lg', 'xl', 'xxl'],
    nullable: false,
  })
  size: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  points: number;

  @Column({ type: 'int', nullable: false })
  earning_points: number;

  @ManyToOne(() => Service, (service) => service.price_list, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
