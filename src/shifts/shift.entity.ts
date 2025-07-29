import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { Assignment } from '../assignments/assignment.entity';
import { Optional } from 'sequelize';

export interface ShiftAttributes {
    id: number;
    startTime: Date;
    endTime: Date;
    location: string;
}

export interface ShiftCreationAttributes extends Optional<ShiftAttributes, 'id'> { }

@Table({
    tableName: 'shifts',
    timestamps: true,
})
export class Shift extends Model<ShiftAttributes, ShiftCreationAttributes> implements ShiftAttributes {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare startTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare endTime: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare location: string;

    @HasMany(() => Assignment)
    declare assignments?: Assignment[];
}
