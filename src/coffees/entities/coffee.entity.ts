import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()  // by default, tbl name is class name: sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    brand: string;
    
    @Column('json', { nullable: true })
    flavors: string[];
}
