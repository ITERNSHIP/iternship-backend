import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity('recruiting')
export class RecruitingEntity {
  @PrimaryGeneratedColumn('uuid')
  recruitId: string;

  @Column({ name: 'title', nullable: false  })
  title: string;

  @Column({ name: 'jobDetail', nullable: false ,length: 1200})
  jobDetail: string;

  @Column({ name: 'welfare', nullable: false })
  welfare: string;

  @Column({ name: 'location', nullable: false })
  location: string;

  @Column({ name: 'contact', nullable: false,})
  contact: string;

  @Column({ name: 'longTerm', nullable: false })
  longTerm: string;

  @ManyToOne(()=> CompanyEntity, company => company.recruit,{onDelete:'CASCADE',eager:true,createForeignKeyConstraints: true})
  @JoinColumn()
  public company: CompanyEntity;

}