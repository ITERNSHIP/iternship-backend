import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('companys')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column({ name: 'companyName', nullable: false  })
  companyName: string;

  @Column({ name: 'companyDetail', nullable: false })
  companyDetail: string;

  @Column({ name: 'email', nullable: false ,unique:true})
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'status', nullable: false,default:false })
  status: boolean;


}