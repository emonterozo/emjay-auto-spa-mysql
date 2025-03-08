import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceList } from './price-list.entity';
import { Review } from './review.entity';
import { VehicleType } from '../../common/enum';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: VehicleType, nullable: false })
  type: string;

  @OneToMany(() => PriceList, (priceList) => priceList.service, {
    cascade: true,
  })
  price_list: PriceList[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
    nullable: false,
    default: 0,
  })
  ratings: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  reviews_count: number;

  @Column({ type: 'timestamp', nullable: true })
  last_review: Date;

  @OneToMany(() => Review, (review) => review.service, { cascade: true })
  reviews: Review[];
}
