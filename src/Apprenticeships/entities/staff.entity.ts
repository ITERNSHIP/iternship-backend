import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('staffs')
export class StaffEntity {
  @PrimaryGeneratedColumn('uuid')
  staffId: string;

  @Column({ name: 'staffFirstName', nullable: false })
  staffFName: string;

  @Column({ name: 'staffLastName', nullable: false })
  staffLName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'status', nullable: false,default:false })
  status: boolean;

  @Column({ name: 'role', nullable: false })
  role: string;

}