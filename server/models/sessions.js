module.exports = (sequelize, DataTypes) => {
    const Sessions = sequelize.define('Sessions', {
        hash: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    });

    Sessions.associate = (models) => {
        Sessions.belongsTo(models.User, {
            foreignKey: 'userid',
            as: 'users',
            onDelete: 'CASCADE'
        });
    };

    return Sessions;
};
