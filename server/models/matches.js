module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('Matches', {
        scoreOne: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        scoreTwo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false
    });

    Matches.associate = (models) => {
        Matches.belongsTo(models.User, {
            foreignKey: 'playerOne',
            as: 'playerOneMatches',
            onDelete: 'CASCADE'
        });

        Matches.belongsTo(models.User, {
            foreignKey: 'playerTwo',
            as: 'playerTwoMatches',
            onDelete: 'CASCADE'
        });
    };

    return Matches;
};
