const nedb = require("nedb-promise");
menuDb = new nedb({ filename: "./databases/menu.db", autoload: true });

async function getAllMenuItems() {
    return await menuDb.find({});
}

async function findMenuItemsById(id) {
    return await menuDb.find({ _id: id });
}

async function findMenuItemById(id) {
    return await menuDb.findOne({ _id: id })
}

async function addNewMenuItem(item) {
    await menuDb.insert(item);
}

async function updateMenuItemById(id, itemToUpdate) {
    return await menuDb.update({ _id: id }, { $set: { price: itemToUpdate }});
}

async function deleteMenuItemById(id) {
    return await menuDb.remove({ _id: id });
}

module.exports = { getAllMenuItems, findMenuItemsById, findMenuItemById, addNewMenuItem, updateMenuItemById, deleteMenuItemById }