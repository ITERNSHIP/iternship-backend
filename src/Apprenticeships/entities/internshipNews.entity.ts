import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('internshipnews')
export class InternshipNewsEntity {
  @PrimaryGeneratedColumn()
  newsId: number;

  @Column({ name: 'title', nullable: false  })
  newstitle: string;

  @Column({ name: 'CompanyName', nullable: false })
  CompanyName: string;

  @Column({ name: 'newsDetail', nullable: false })
  newsDetail: string;

  @Column({ name: 'position', nullable: false })
  position: string;

  @Column({ name: 'income', nullable: false })
  income: string;

  @Column({ name: 'longTerm', nullable: false,default:false })
  longTerm: string;

}