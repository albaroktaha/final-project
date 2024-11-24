import mongoose, { Types } from "mongoose";
import mail from '../utils/mail/templates/mail';

  export interface OrderItem {
    name: string;
    productId: Types.ObjectId;
    price: number;
    quantity: number;
  }

  export interface Order {
    grandTotal: number;
    orderItems: OrderItem[];
    createdBy: Types.ObjectId; 
    status: "pending" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    email: string;
    fullName: string;
  }

  const Schema = mongoose.Schema;

  const OrderItemSchema = new Schema<OrderItem>({
    name: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, max: 5 },
  });

  const OrderSchema = new Schema<Order>(
    {
      grandTotal: { type: Number, required: true },
      orderItems: { type: [OrderItemSchema], required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["pending", "completed", "cancelled"], required: true },
      email: {type: Schema.Types.String,required: true,unique: true},
      fullName: {type: Schema.Types.String,required: true},
    },
    { timestamps: true }
  );

  OrderSchema.post("save", async function (doc,next){
    const user = doc;
  
    //send mail
    console.log("Email Terkirim");
  
    const content = await mail.render('register-success.ejs', {
      username: user.email,
      grandTotal : user.grandTotal,
      customerName : user.fullName,
      orderItems : user.orderItems,
    }) as string; // Memastikan bahwa content bertipe string
  
    await mail.send({
      to: user.email,
      subject: "Berhasil Melakukan Order",
      content,
    });
    next();
  })

  const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
