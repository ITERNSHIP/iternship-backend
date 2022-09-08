// import { Column, Entity, PrimaryGeneratedColumn,OneToOne,JoinColumn } from "typeorm";
// import { RegisterEntity } from "./regis.entity";


// @Entity('companyviewregis')
// export class CompanyViewRegis {
//   @PrimaryGeneratedColumn()
//   cvrId: number;

//   @Column({ name: 'firstName', nullable: false })
//   fName: string;

//   @Column({ name: 'lastName', nullable: false })
//   lName: string;

//   @Column({ name: 'year', nullable: false })
//   year: string;

//   @Column({ name: 'phoneNumber', nullable: false })
//   phoneNumber: string;

//   @Column({ name: 'semester', nullable: false })
//   semester: string;

//   @Column('decimal',{ name: 'grade', nullable: false,  precision: 10, scale: 7})
//   grade: number;

//   @Column({ name: 'email', nullable: false })
//   email: string;

//   @Column({ name: 'address', nullable: false, length: 1200 })
//   address: string;
  
//   @Column({ name: 'companyName', nullable: false })
//   companyName: string;

//   @Column({ name: 'position', nullable: false })
//   position: string;

//   @Column({ name: 'resume', nullable: false })
//   resume: string;

//   @OneToOne(() => RegisterEntity,regis => regis.cvr,{createForeignKeyConstraints: true})
//   @JoinColumn()
//   public regis:RegisterEntity[];

// }