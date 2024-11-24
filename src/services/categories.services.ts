/**
 * src/services/categories.service.ts
 */

import CategoriesModel, { Categories } from "../models/categories.model";

export const create = async (payload: Categories): Promise<Categories> => {
  const result = await CategoriesModel.create(payload);
  return result;
};

export interface IFindAll {
  query?: unknown;
  limit: number;
  page: number;
}

export const findAll = async (
  query: any,
  limit: number = 10,
  page: number = 1
): Promise<Categories[]> => {
  const result = await CategoriesModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .populate("category");
  return result;
};

export const findOne = async (id: string): Promise<Categories | null> => {
  const result = await CategoriesModel.findById(id);
  return result;
};

export const update = async (
  id: string,
  payload: Categories
): Promise<Categories | null> => {
  const result = await CategoriesModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const remove = async (id: string): Promise<Categories | null> => {
  const result = await CategoriesModel.findOneAndDelete({
    _id: id,
  });
  return result;
};
