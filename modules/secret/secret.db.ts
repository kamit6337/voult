import {
  CreateSecretType,
  SecretModel,
  UpdateSecretType,
} from "./secret.model";

export const createSecretDB = (data: CreateSecretType) => {
  return SecretModel.create({
    userId: data.userId,
    projectId: data.projectId,
    name: data.name,
    valueType: data.valueType,
    value: data.value,
    favourite: data.favourite,
  });
};

export const getSecretsByUserIdDB = (userId: string, page = 1, limit = 30) => {
  const skip = (page - 1) * limit;

  return SecretModel.find({
    userId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "projectId",
      select: "_id name",
    })
    .exec();
};

export const getFavouriteSecretsByUserIdDB = (
  userId: string,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  return SecretModel.find({
    userId,
    favourite: true,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "projectId",
      select: "_id name",
    })
    .exec();
};

export const getSecretsByProjectIdDB = (
  projectId: string,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  return SecretModel.find({
    projectId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "projectId",
      select: "_id name",
    })
    .exec();
};

export const updateSingleSecretDB = (data: UpdateSecretType) => {
  return SecretModel.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      name: data.name,
      valueType: data.valueType,
      value: data.value,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const updateSecretFavouriteDB = (secretId: string, bool: boolean) => {
  return SecretModel.findOneAndUpdate(
    {
      _id: secretId,
    },
    {
      favourite: bool,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const updateSecretsProjectIdDB = (
  secretIds: string[],
  projectId: string,
) => {
  return SecretModel.updateMany(
    {
      _id: { $in: { secretIds } },
    },
    {
      projectId,
    },
  );
};
