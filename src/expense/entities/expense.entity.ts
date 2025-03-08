import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ExpenseCategory } from '../../common/enum';

@Entity({ name: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ExpenseCategory })
  category: ExpenseCategory;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;
}
