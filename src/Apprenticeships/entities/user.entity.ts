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

  @Column({ name: 'gender', nullable: true ,unique:false})
  gender: string;

  @Column({ name: 'resumeLink', nullable: true ,unique:false})
  resumeLink: string;

  @OneToMany(() => RegisterEntity,regis => regis.user,{createForeignKeyConstraints: true})
  @JoinColumn()
  public regis:RegisterEntity[];

  @OneToOne(() => ConfirmationEntity,confirmation => confirmation.user,{createForeignKeyConstraints: false,onDelete:"DEFAULT"})
  @JoinColumn()
  public confirmation:ConfirmationEntity[];
}