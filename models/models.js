import {default as sequelize} from '../db.js'
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    roles: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

export const Reservation = sequelize.define('reservation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    action: {type: DataTypes.STRING, require: true},
    date: {type: DataTypes.DATE, require: true},
    time: {type: DataTypes.TIME, require: true}
})

User.hasMany(Reservation)
Reservation.belongsTo(User)


