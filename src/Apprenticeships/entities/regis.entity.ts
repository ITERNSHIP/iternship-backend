import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToOne } from "typeorm";
// import { CompanyViewRegis } from "./companyViewRegis.entity";
import { UserEntity } from "./user.entity";

@Entity('regis')
export class RegisterEntity {
  @PrimaryGeneratedColumn()
  regisId: number;

  @Column({ name: 'fullName', nullable: false })
  fullName: string;

  @Column({ name: 'gender', nullable: false })
  gender: string;

  // @Column({ name: 'year', nullable: false })
  // year: string;

  @Column({ name: 'phoneNumber', nullable: false })
  phoneNumber: string;

  // @Column({ name: 'semester', nullable: false })
  // semester: string;

  @Column('decimal',{ name: 'grade', nullable: false,  precision: 10, scale: 7})
  grade: number;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'address', nullable: false, length: 1200 })
  address: string;
  
  @Column({ name: 'companyName', nullable: false })
  companyName: string;

  @Column({ name: 'position', nullable: false })
  position: string;

  @Column({ name: 'resume', nullable: false })
  resume: string;

  // @Column({ type: 'date' })
  // startDate: string;

  // @Column({ type: 'date' })
  // endDate: string;

  @Column({ name: 'status', nullable: true})
  status: string;
  
  @ManyToOne(()=> UserEntity, user => user.regis,{onDelete:'CASCADE',eager:true,createForeignKeyConstraints: true})
  @JoinColumn()
  public user: UserEntity;

  // @OneToOne(() => CompanyViewRegis,cvr => cvr.regis,{createForeignKeyConstraints: false})
  // @JoinColumn()
  // public cvr:CompanyViewRegis[];

}