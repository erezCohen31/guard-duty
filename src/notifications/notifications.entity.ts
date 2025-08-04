import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from '../users/user.entity';

export interface NotificationAttributes {
    id: number;
    title: string;
    content: string;
    recipientId: number;
    isRead: boolean;
    isScheduled: boolean;
    scheduledAt?: Date | null;
}

export interface NotificationCreationAttributes
    extends Optional<NotificationAttributes, 'id' | 'isRead' | 'isScheduled' | 'scheduledAt'> {}

@Table({
    tableName: 'notifications',
    timestamps: true,
})
export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes>
    implements NotificationAttributes {
    
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare content: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @BelongsTo(() => User)
    declare recipient: User;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isRead: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isScheduled: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare scheduledAt?: Date | null;
}
