var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname +'/basic-sqlite-database.sqlite'
}); //instance of seq

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);



sequelize.sync({
	// force:true
}).then(function () {
	console.log('Everything is synced');

	User.findById(1).then(function (user) {
		user.getTodos({
			where: {
				completed:!true
			}
		}).then(function (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email: 'arne@xtr.com'
	// }).then(function () {
	// 	return Todo.create({
	// 		description: 'clean room'
	// 	});
	// }).then(function (todo) {
	// 	User.findById(1).then(function (user) {
	// 		user.addTodo(todo);
	// 	});
	// });
});
//fetch todo by id findbyid, findall, findone

	// Todo.create({
	// 	description: 'Take out trash'
	// }).then(function (todo) {
	// 	return Todo.create({
	// 		description: 'Clean room'
	// 	});
	// }).then(function () {
	// 	// return Todo.findById(7)
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%ROom%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		});
	// 	} else {
	// 		console.log('no todo found');
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// });

