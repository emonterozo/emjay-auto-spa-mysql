import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { EmployeeStatus, Gender } from '../../common/enum';
import { AvailedService } from '../../transaction/entities/availed-service.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: string;

  @Column({ type: 'timestamp', nullable: false })
  birth_date: Date;

  @Column({ type: 'varchar', length: 11, nullable: false })
  contact_number: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  employee_title: string;

  @Column({ type: 'enum', enum: EmployeeStatus, nullable: false })
  employee_status: string;

  @Column({ type: 'timestamp', nullable: false })
  date_started: Date;

  @ManyToMany(
    () => AvailedService,
    (availedService) => availedService.assigned_employees,
  )
  availed_services: AvailedService[];
}
