module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validation: {
                len: { args: 8 }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: { args: 8 }
            }
        },

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

        User.hasMany(models.Sessions, {
            foreignKey: 'userid',
            as: 'sessions'
        });
    };

    return User;
};
