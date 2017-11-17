module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('Matches', {
        scoreOne: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scoreTwo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Matches.associate = (models) => {
        Matches.hasMany(Following);
        Following.belongsTo(models.User, { as: 'playerOne', foreignKey: 'playerOne'});
        Following.belongsTo(models.User, { as: 'playerTwo', foreignKey: 'playerTwo'});
    };

    return Matches;
};
