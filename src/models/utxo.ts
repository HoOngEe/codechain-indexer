import * as Sequelize from "sequelize";
import { AssetSchemeAttribute } from "./assetscheme";

export interface UTXOAttribute {
    id?: string;
    address: string;
    assetType: string;
    lockScriptHash: string;
    parameters: Buffer[];
    amount: string;
    transactionHash: string;
    transactionOutputIndex: number;
    usedTransaction?: string;
    assetScheme: AssetSchemeAttribute;
}

export interface UTXOInstance extends Sequelize.Instance<UTXOAttribute> {}

export default (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
) => {
    const UTXO = sequelize.define(
        "UTXO",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING
            },
            assetType: {
                allowNull: false,
                type: DataTypes.STRING
            },
            lockScriptHash: {
                allowNull: false,
                type: DataTypes.STRING
            },
            parameters: {
                allowNull: false,
                type: DataTypes.JSONB
            },
            amount: {
                allowNull: false,
                type: DataTypes.NUMERIC({ precision: 20, scale: 0 })
            },
            transactionHash: {
                allowNull: false,
                type: DataTypes.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "Transactions",
                    key: "hash"
                }
            },
            transactionOutputIndex: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            assetScheme: {
                allowNull: false,
                type: DataTypes.JSONB
            },
            usedTransaction: {
                type: DataTypes.STRING,
                onDelete: "SET NULL",
                references: {
                    model: "Transactions",
                    key: "hash"
                }
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
    UTXO.associate = () => {
        // associations can be defined here
    };
    return UTXO;
};