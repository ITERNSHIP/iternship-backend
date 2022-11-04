import { Column, Entity, PrimaryGeneratedColumn,OneToMany,OneToOne,JoinColumn,PrimaryColumn } from "typeorm";
import { ConfirmationEntity } from "./confirmation.entity";
import { RegisterEntity } from "./regis.entity";

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  userId: string;
  
  @Column({ name: 'fullname', nullable: false,unique:false })
  fullName: string;

  @Column({ name: 'email', nullable: true,unique:true })
  email: string;

  @Column({ name: 'status', nullable: true ,unique:false,default:false})
  status: boolean;
  
  @Column({ name: 'address', nullable: true ,unique:false})
  address: string;

  @Column({ name: 'phone', nullable: true ,unique:false})
  phone: string;
  
  @Column({ name: 'year ', nullable: true ,unique:false})
  year : string;

  @Column({ name: 'faculty', nullable: true ,unique:false})
  faculty: string;

  @Column({ name: 'gender', nullable: true ,unique:false})
  gender: string;

  @Column('decimal',{ name: 'GPA', nullable: true,  precision: 10, scale: 7})
  GPA: number;

  @Column({ name: 'resumeLink', nullable: true ,unique:false})
  resumeLink: string;

  @OneToMany(() => RegisterEntity,regis => regis.user,{createForeignKeyConstraints: true})
  @JoinColumn()
  public regis:RegisterEntity[];

  @OneToOne(() => ConfirmationEntity,confirmation => confirmation.user,{createForeignKeyConstraints: false,onDelete:"DEFAULT"})
  @JoinColumn()
  public confirmation:ConfirmationEntity[];
}