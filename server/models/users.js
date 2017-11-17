module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
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
            as: 'matches'
        });

        User.hasMany(models.Matches, {
            foreignKey: 'playerTwo',
            as: 'matches'
        });
    };

    return User;
};
