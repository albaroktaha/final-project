import { Request, Response } from "express";
import ordermodel from "../models/order.model";
import * as Yup from "yup";
import{
  create,findOne
}from "../services/order.service";

interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

const createOrderValidationSchema = Yup.object().shape({
    grandTotal: Yup.number().required(),
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          productId: Yup.string().required(),
          price: Yup.number().required(),
          quantity: Yup.number().min(1).max(5).required(),
        })
      )
      .required(),
    status: Yup.mixed().oneOf(["pending", "completed", "cancelled"]).required(),
  });


  export default {
    // Create Order
    async create(req: Request, res: Response) {

      try {
        await createOrderValidationSchema.validate(req.body);
        const result = await ordermodel.create(req.body);
        res.status(201).json({
          data: result,
          message: "Success create product",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          res.status(400).json({
            data: error.errors,
            message: "Failed create product",
          });
          return;
        }
        const err = error as Error;
        res.status(500).json({
          data: err.message,
          message: "Failed create product",
        });
      }
    },
    // Get User Orders
    
  async findOne(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query = {};

      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        });
      }

      const result1 = await ordermodel.find(query);

      const result = await ordermodel.findOne({
        createdBy: req.params.createdby,
      });
      const total = await ordermodel.countDocuments(query);
      res.status(200).json({
         data: result1,
         message: "Success get one product",
         page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });

      }catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
      return;
    }
  }
};


