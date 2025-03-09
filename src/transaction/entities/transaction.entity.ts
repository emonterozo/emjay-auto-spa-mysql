import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TransactionStatus, VehicleSize, VehicleType } from '../../common/enum';
import { AvailedService } from './availed-service.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: VehicleType, nullable: false })
  vehicle_type: VehicleType;

  @Column({ type: 'enum', enum: VehicleSize, nullable: false })
  vehicle_size: VehicleSize;

  @Column({ type: 'varchar', length: 255, nullable: false })
  model: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  plate_number: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  contact_number: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus['ONGOING'],
  })
  status: TransactionStatus;

  @OneToMany(
    () => AvailedService,
    (availedService) => availedService.transaction,
    {
      cascade: true,
    },
  )
  availed_services: AvailedService[];

  @CreateDateColumn()
  check_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out: Date;
}
