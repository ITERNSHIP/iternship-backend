import { Column, Entity, PrimaryGeneratedColumn,OneToOne,JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('confirmation')
export class ConfirmationEntity {
  @PrimaryGeneratedColumn()
  confirmationId: number;

  @Column("decimal",{ name: 'studentId', nullable: false,unique:true,precision: 16 })
  studentId: number;

  @Column({ name: 'firstName', nullable: false,unique:false })
  fName: string;

  @Column({ name: 'lastName', nullable: false,unique:false })
  lName: string;

  // @Column({ name: 'email', nullable: false,unique:true })
  // email: string;

  // @Column({ name: 'phoneNumber', nullable: false,unique:false })
  // phoneNumber: string;

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