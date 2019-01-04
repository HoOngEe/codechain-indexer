import * as Sequelize from "sequelize";
import { TransactionAttribute } from "./transaction";

export type ActionAttribute =
    | AssetTransactionAttribute
    | PaymentAttribute
    | SetRegularKeyAttribute
    | CreateShardAttribute
    | SetShardOwnersAttribute
    | SetShardUsersAttribute;

interface ActionCommon {
    id?: string;
    invoice?: boolean | null;
    errorType?: string | null;
}

export interface AssetTransactionAttribute extends ActionCommon {
    action: "assetTransaction";
    transaction?: TransactionAttribute;
    parcelHash: string;
    approvals: string[];
}

export interface PaymentAttribute extends ActionCommon {
    action: "payment";
    parcelHash: string;
    receiver: string;
    amount: string;
}

export interface SetRegularKeyAttribute extends ActionCommon {
    action: "setRegularKey";
    parcelHash: string;
    key: string;
}

export interface CreateShardAttribute extends ActionCommon {
    action: "createShard";
    parcelHash: string;
}

export interface SetShardOwnersAttribute extends ActionCommon {
    action: "setShardOwners";
    parcelHash: string;
    shardId: number;
    owners: string[];
}

export interface SetShardUsersAttribute extends ActionCommon {
    action: "setShardUsers";
    parcelHash: string;
    shardId: number;
    users: string[];
}

export interface ActionInstance extends Sequelize.Instance<ActionAttribute> {}

export default (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
) => {
    const Action = sequelize.define(
        "Action",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            parcelHash: {
                allowNull: false,
                type: DataTypes.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "Parcels",
                    key: "hash"
                }
            },
            action: {
                allowNull: false,
                type: DataTypes.STRING
            },
            receiver: {
                type: DataTypes.STRING
            },
            key: {
                type: DataTypes.STRING
            },
            amount: {
                type: DataTypes.NUMERIC({ precision: 20, scale: 0 })
            },
            shardId: {
                type: DataTypes.INTEGER
            },
            invoice: {
                type: DataTypes.BOOLEAN
            },
            owners: {
                type: DataTypes.JSONB
            },
            approvals: {
                type: DataTypes.JSONB
            },
            users: {
                type: DataTypes.JSONB
            },
            errorType: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {}
    );
    Action.associate = models => {
        Action.hasOne(models.Transaction, {
            foreignKey: "actionId",
            as: "transaction",
            onDelete: "CASCADE"
        });
    };
    return Action;
};
