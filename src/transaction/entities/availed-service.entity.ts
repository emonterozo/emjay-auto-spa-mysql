import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AvailedServiceStatus } from '../../common/enum';
import { Transaction } from './transaction.entity';
import { Service } from '../../service/entities/service.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity({ name: 'availed_services' })
export class AvailedService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  discount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  deduction: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  company_earnings: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  employee_share: number;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'boolean', default: false })
  is_free: boolean;

  @Column({ type: 'boolean', default: false })
  is_paid: boolean;

  @Column({
    type: 'enum',
    enum: AvailedServiceStatus,
    default: AvailedServiceStatus['PENDING'],
  })
  status: AvailedServiceStatus;

  @ManyToOne(() => Service, (service) => service.availed_service, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Transaction, (transaction) => transaction.availed_services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @ManyToMany(() => Employee, (employee) => employee.availed_services, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'availed_service_employee', // Custom join table name
    joinColumn: { name: 'availed_service_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employee_id', referencedColumnName: 'id' },
  })
  assigned_employees: Employee[];
}
