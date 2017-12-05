module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.Matches, {
            foreignKey: 'playerOne',
            as: 'playerOneMatches'
        });

        User.hasMany(models.Matches, {
            foreignKey: 'playerTwo',
            as: 'playerTwoMatches'
        });
    };

    return User;
};
