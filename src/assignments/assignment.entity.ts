import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Shift } from '../shifts/shift.entity';
import { Optional } from 'sequelize';

export interface AssignmentAttributes {
    id: number;
    userId: number;
    shiftId: number;
}

export interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, 'id'> { }

@Table({
    tableName: 'assignments',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'shiftId'],
        },
    ],
})
export class Assignment extends Model<AssignmentAttributes, AssignmentCreationAttributes>
    implements AssignmentAttributes {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @ForeignKey(() => Shift)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare shiftId: number;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Shift)
    declare shift: Shift;
}
