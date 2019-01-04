import * as Sequelize from "sequelize";
import { ActionAttribute } from "./action";

export interface ParcelAttribute {
    blockNumber?: number | null;
    blockHash?: string | null;
    parcelIndex?: number | null;
    seq: number;
    fee: string;
    networkId: string;
    sig: string;
    hash: string;
    signer: string;
    timestamp?: number | null;
    isPending: boolean;
    pendingTimestamp?: number | null;
    action?: ActionAttribute;
}

export interface ParcelInstance extends Sequelize.Instance<ParcelAttribute> {}

export default (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
) => {
    const Parcel = sequelize.define(
        "Parcel",
        {
            hash: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.STRING
            },
            blockNumber: {
                type: DataTypes.INTEGER
            },
            blockHash: {
                type: DataTypes.STRING
            },
            parcelIndex: {
                type: DataTypes.INTEGER
            },
            seq: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            fee: {
                allowNull: false,
                type: DataTypes.NUMERIC({ precision: 20, scale: 0 })
            },
            networkId: {
                allowNull: false,
                type: DataTypes.STRING
            },
            sig: {
                allowNull: false,
                type: DataTypes.STRING
            },
            signer: {
                allowNull: false,
                type: DataTypes.STRING
            },
            timestamp: {
                type: DataTypes.INTEGER
            },
            isPending: {
                allowNull: false,
                type: DataTypes.BOOLEAN
            },
            pendingTimestamp: {
                type: DataTypes.INTEGER
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
    Parcel.associate = models => {
        Parcel.hasOne(models.Action, {
            foreignKey: "parcelHash",
            as: "action",
            onDelete: "CASCADE"
        });
    };
    return Parcel;
};
