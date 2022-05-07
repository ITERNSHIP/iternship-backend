import { Column, Entity, PrimaryGeneratedColumn,OneToMany,OneToOne,JoinColumn } from "typeorm";
import { ConfirmationEntity } from "./confirmation.entity";
import { RegisterEntity } from "./regis.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ name: 'userName', nullable: false,unique:true })
  userName: string;

  @Column({ name: 'password', nullable: false,unique:false })
  password: string;
  
  @Column({ name: 'firstName', nullable: false,unique:false })
  fName: string;

  @Column({ name: 'lastName', nullable: false,unique:false })
  lName: string;

  @Column({ name: 'email', nullable: false,unique:true })
  email: string;

  @Column({ name: 'status', nullable: true ,unique:false,default:false})
  status: boolean;

  @OneToMany(() => RegisterEntity,regis => regis.user,{createForeignKeyConstraints: true})
  @JoinColumn()
  public regis:RegisterEntity[];

  @OneToOne(() => ConfirmationEntity,confirmation => confirmation.user,{createForeignKeyConstraints: false})
  @JoinColumn()
  public confirmation:ConfirmationEntity[];
}