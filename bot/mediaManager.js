const { db, ObjectId } = require("../mongo");

const createMedia = (alias, url, uploaderId) => ({
  alias,
  url,
  uploaderId,
});

const getMediaById = async (mediaId) => {
  const result = await db()
    .collection("media")
    .findOne({ _id: ObjectId(mediaId) });
  if (result) {
    return result;
  }
  return null;
};

const getMediaByAlias = async (alias) => {
  const result = await db().collection("media").findOne({ alias });
  if (result) {
    return result;
  }
  return null;
};

const getAllAliases = async () => {
  const result = await db().collection("media").find({}).sort({ alias: 1 });
  if (result) {
    const aliases = [];
    for await (const doc of result) {
      aliases.push(doc.alias);
    }
    return aliases;
  }
  return null;
};

const getRandomMedia = async () => {
  let media = null;
  const aggCursor = await db()
    .collection("media")
    .aggregate([{ $sample: { size: 1 } }]);
  for await (const doc of aggCursor) {
    media = doc;
  }
  return media;
};

const addMedia = async (alias, url, uploaderId) => {
  const payload = {
    ...createMedia(alias, url, uploaderId),
    updaterId: uploaderId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const result = await db().collection("media").insertOne(payload);
  if (result) {
    return result.insertedId;
  }
  return null;
};

const updateMediaAliasById = async (id, alias, updaterId) => {
  const result = await db()
    .collection("media")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { alias, updaterId, updatedAt: Date.now() } }
    );
  if (result) {
    return id;
  }
  return null;
};

const updateMediaUrlById = async (id, url, updaterId) => {
  const result = await db()
    .collection("media")
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { url, updaterId, updatedAt: Date.now() } }
    );
  if (result) {
    return id;
  }
  return null;
};

const removeMediaById = async (id) => {
  const result = await db()
    .collection("media")
    .deleteOne({ _id: ObjectId(id) });
  if (result.deletedCount > 0) {
    return id;
  }
  return null;
};

const countMedia = async () => {
  return await db().collection("media").count();
};

module.exports = {
  getMediaById,
  getMediaByAlias,
  getRandomMedia,
  addMedia,
  countMedia,
  updateMediaAliasById,
  updateMediaUrlById,
  removeMediaById,
  getAllAliases,
};
