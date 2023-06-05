const nedb = require("nedb-promise");
menuDb = new nedb({ filename: "./databases/menu.db", autoload: true });

async function getAllMenuItems() {
    return await menuDb.find({});
}

async function findMenuItemById(id) {
    return await menuDb.find({ _id: id });
}

async function updateMenuItemById(id) {
    // return await menuDb. nått
}

async function deleteMenuItemById(id) {
    return await menuDb.remove({ _id: id });
}

module.exports = { getAllMenuItems, findMenuItemById, updateMenuItemById, deleteMenuItemById }