const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
    return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where("steps.scheme_id", id)

}

function add(scheme) {
    return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
        const [id] = ids;

        return findById(id);
    })
}

function update(changes, id) {
    return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
    return db("schemes")
    .where("id", id)
    .del()
}