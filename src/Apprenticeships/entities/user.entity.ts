import { Column, Entity, PrimaryGeneratedColumn,OneToMany,OneToOne,JoinColumn,PrimaryColumn } from "typeorm";
import { ConfirmationEntity } from "./confirmation.entity";
import { RegisterEntity } from "./regis.entity";

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  userId: string;
  
  @Column({ name: 'fullname', nullable: false,unique:false })
  fullName: string;

  @Column({ name: 'email', nullable: false,unique:true })
  email: string;

  @Column({ name: 'status', nullable: true ,unique:false,default:false})
  status: boolean;
  
  @OneToMany(() => RegisterEntity,regis => regis.user,{createForeignKeyConstraints: true})
  @JoinColumn()
  public regis:RegisterEntity[];

  @OneToOne(() => ConfirmationEntity,confirmation => confirmation.user,{createForeignKeyConstraints: false,onDelete:"DEFAULT"})
  @JoinColumn()
  public confirmation:ConfirmationEntity[];
}