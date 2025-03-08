import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { VehicleSize } from '../../common/enum/index';

@Entity({ name: 'price_lists' })
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: VehicleSize,
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
