import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'varchar' })
    token: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ nullable: true, type: 'varchar' })
    name: string;

    @Column({ nullable: true, type: 'int4' })
    age: number;

    @Column({ nullable: true, type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    password: string;
}


