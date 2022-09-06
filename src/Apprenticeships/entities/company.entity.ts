import { Column, Entity, PrimaryGeneratedColumn,OneToMany,JoinColumn  } from "typeorm";
import { RecruitingEntity } from "./recruiting.enity";

@Entity('companys')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column({ name: 'companyName', nullable: false  })
  companyName: string;

  @Column({ name: 'companyDetail', nullable: true })
  companyDetail: string;

  @Column({ name: 'email', nullable: false ,unique:true})
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'status', nullable: false,default:false })
  status: boolean;

  @Column({ name: 'role', nullable: false })
  role: string;
  
  @Column({ nullable: true })
  imageName: string;

  @OneToMany(() => RecruitingEntity,recruit => recruit.company,{createForeignKeyConstraints: true})
  @JoinColumn()
  public recruit:RecruitingEntity[];

}