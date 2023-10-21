import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tuit {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    message: string;
    @ManyToOne(type=>User,(user)=>user.tuits,{cascade:true})
    @JoinColumn({name:'user_id'})
    user:User
}
