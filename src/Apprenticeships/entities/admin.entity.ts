import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column({ name: 'adminFirstName', nullable: false })
  adminFName: string;

  @Column({ name: 'adminLastName', nullable: false })
  adminLName: string;

  @Column({ name: 'password', nullable: false })
  password: string;
  
  @Column({ name: 'email', nullable: false })
  email: string;

}