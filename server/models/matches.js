module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('Matches', {
        scoreOne: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scoreTwo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        playerOne: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        playerTwo: {
            type: DataTypes.INTEGER,
            allowNull: false
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
