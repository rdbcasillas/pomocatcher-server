const db = require('./connection.js');
const joi = require('joi');
const pomos = db.get('pomos');

const schema = joi.object().keys({
	username: joi.string().alphanum().required(),
	pomocount: joi.number().integer().required(),
	comment: joi.string().required()
});
function getAll() {
	return pomos.find();
}

function insert(pomo) {
	const result = joi.validate(pomo, schema);
	if (result.error == null){
		pomo.created = new Date();
		return pomos.insert(pomo);
	} else {
		return Promise.reject(result.error);
	}
}

function remove(user) {
    return pomos.remove({'username': user});
}

module.exports = {
	insert,
    remove,
	getAll
};
