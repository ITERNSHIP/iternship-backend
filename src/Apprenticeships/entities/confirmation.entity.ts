import { Column, Entity, PrimaryGeneratedColumn,OneToOne,JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('confirmation')
export class ConfirmationEntity {
  @PrimaryGeneratedColumn()
  confirmationId: number;

  @Column("decimal",{ name: 'studentId', nullable: false,unique:true,precision: 16 })
  studentId: number;

  @Column({ name: 'fullName', nullable: false,unique:false })
  fullName: string;

  @Column({ name: 'year', nullable: false,unique:false })
  year: string;

  @Column({ name: 'faculty', nullable: false,unique:false })
  faculty: string;

  @Column({ name: 'companyName', nullable: false,unique:false })
  companyName: string;

  @Column({ name: 'position', nullable: false,unique:false })
  position: string;

  @Column({ name: 'longTerm', nullable: false,unique:false })
  longTerm: string;

  @Column({ name: 'durationForm', nullable: false,type: 'date' ,unique:false })
  durationForm: string;

  @Column({ name: 'durationTo', nullable: false,type: 'date' ,unique:false })
  durationTo: string;
  
  @OneToOne(() => UserEntity,user => user.confirmation,{createForeignKeyConstraints: true})
  @JoinColumn()
  public user:UserEntity[];


}