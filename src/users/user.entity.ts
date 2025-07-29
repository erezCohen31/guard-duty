import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Assignment } from '../assignments/assignment.entity';
import { Optional } from 'sequelize';

export enum UserRole {
    SOLDIER = 'SOLDIER',
    COMMANDER = 'COMMANDER',
}

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    hashedPassword: string;
    role: UserRole;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare hashedPassword: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
    })
    declare role: UserRole;

    @HasMany(() => Assignment)
    declare assignments: Assignment[];
}
