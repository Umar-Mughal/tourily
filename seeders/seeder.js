require('../envs/env');
require('../configs/db');

const importData = async (Model, data) => {
  const { collectionName } = Model.collection;

  try {
    await Model.create(data);
    console.log(`${collectionName} Seeding Success!!!`);
  } catch (err) {
    console.log(`${collectionName} Seeding Error:`, err);
  } finally {
    process.exit();
  }
};

const deleteData = async (Model) => {
  const { collectionName } = Model.collection;
  try {
    await Model.deleteMany();
    console.log(`${collectionName} Deleting Success!!!`);
  } catch (err) {
    console.log(`${collectionName} Deleting Error:`, err);
  } finally {
    process.exit();
  }
};

module.exports = {
  importData,
  deleteData,
};
