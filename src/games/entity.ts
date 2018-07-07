import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength} from 'class-validator';


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number


  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  color: string

  @Column('json', {nullable:false})
  board: [string]



}

 