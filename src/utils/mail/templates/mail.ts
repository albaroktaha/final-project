import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

interface EmailOptions {
    to: string;
    subject: string;
    content: string;
}

const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: "albaroktahaa@gmail.com",
        pass: "hazelnut311099",
    },
    requireTLS: true,
});

const send = async ({ to, subject, content }: EmailOptions): Promise<any> => {
    const result = await transporter.sendMail({
        from: "albaroktahaa@zohomail.com",
        to,
        subject,
        html: content,
    });
    console.log("Send Email to", to);
    return result;
};

const render = async (template: string, data: any): Promise<string> => {
    const content = await ejs.renderFile(path.join(__dirname, `${template}`), data);
    return content as string; // Casting ke tipe string
};

export default {
    send,
    render,
};