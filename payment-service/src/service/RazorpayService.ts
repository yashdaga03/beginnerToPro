import Razorpay from 'razorpay';
import { IPaymentGateway } from '../interface/IPaymentGateway';
import crypto from 'crypto';
import { config } from '../config';

export class RazorpayService implements IPaymentGateway {
    private razorpay: Razorpay;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: config.razorpayKeyId,
            key_secret: config.razorpayKeySecret,
        });
    }

    async createOrder(amount: number, currency: string): Promise<any> {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
        };
        return this.razorpay.orders.create(options);
    }

    verifyPaymentSignature(params: any): boolean {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
        const hmac = crypto.createHmac('sha256', config.razorpayKeySecret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');
        return razorpay_signature === generated_signature;
    }
}
