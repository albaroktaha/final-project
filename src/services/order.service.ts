import OrderModel, { Order, OrderItem } from "../models/order.model";
import { Types } from "mongoose";

export const create = async (payload: Order): Promise<Order> => {
    const result = await OrderModel.create(payload);
    return result;
  };

  export const findOne = async (id: string): Promise<Order | null> => {
    const result = await OrderModel.findById(id);
    return result;
  };