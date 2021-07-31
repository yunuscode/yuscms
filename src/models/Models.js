export default class Models {
	static async UserModel(sequelize, Sequelize) {
		return sequelize.define("users", {
			user_id: {
				type: Sequelize.DataTypes.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			user_name: {
				type: Sequelize.DataTypes.STRING(32),
				allowNull: false,
				validate: {
					isAlpha: true,
				},
			},
			user_password: {
				type: Sequelize.DataTypes.STRING(64),
				allowNull: false,
			},
			user_username: {
				type: Sequelize.DataTypes.STRING(32),
				allowNull: false,
				is: /^[a-zA-Z]{5,}\d*$/i,
				unique: true,
			},
			user_role: {
				type: Sequelize.DataTypes.ENUM,
				values: ["superadmin", "admin", "user"],
				defaultValue: "user",
			},
		});
	}
	static async SessionModel(sequelize, Sequelize) {
		return sequelize.define("sessions", {
			session_id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
			},
			session_inet: {
				type: Sequelize.DataTypes.INET,
				allowNull: false,
			},
			session_user_agent: {
				type: Sequelize.DataTypes.STRING(128),
				allowNull: false,
			},
		});
	}
	static async Relations(db) {
		await db.users.hasMany(db.sessions, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
		await db.sessions.belongsTo(db.users, {
			foreignKey: {
				name: "user_id",
				allowNull: false,
			},
		});
	}
}
