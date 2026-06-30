import { CreateProjectType, ProjectModel } from "./project.model";

export const createProjectDB = (data: CreateProjectType) => {
  return ProjectModel.create({
    userId: data.userId,
    name: data.name,
    favourite: data.favourite,
  });
};

export const getProjectsByUserIdDB = (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return ProjectModel.find({
    userId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const getFavouriteProjectsByUserIdDB = (
  userId: string,
  page = 1,
  limit = 5,
) => {
  const skip = (page - 1) * limit;

  return ProjectModel.find({
    userId,
    favourite: true,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};
