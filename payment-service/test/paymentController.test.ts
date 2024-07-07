import request from 'supertest';
import app from '../src/app';

describe('Payment Controller', () => {
    it('should create an order', async () => {
        const response = await request(app)
            .post('/api/payments/create-order')
            .send({ amount: 500, currency: 'INR' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('amount');
    });

    it('should verify webhook signature', async () => {
        // This test requires a real webhook payload with correct signature
        const response = await request(app)
            .post('/api/payments/webhook')
            .send({
                razorpay_order_id: 'order_id',
                razorpay_payment_id: 'payment_id',
                razorpay_signature: 'signature',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
    });
});
