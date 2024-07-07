import { Request, Response } from 'express';
import { RazorpayService } from '../service/RazorpayService';

const razorpayService = new RazorpayService();

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { amount, currency } = req.body;
        const order = await razorpayService.createOrder(amount, currency);
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyWebhookSignature = (req: Request, res: Response) => {
    try {
        const isValid = razorpayService.verifyPaymentSignature(req.body);
        if (isValid) {
            res.json({ status: 'success' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
