const User = (sequelize, Sequelize) => sequelize.define('user', {
    _id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true },
    username: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
  })

  export default User