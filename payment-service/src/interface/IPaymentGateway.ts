export interface IPaymentGateway {
    createOrder(amount: number, currency: string): Promise<any>;
    verifyPaymentSignature(params: any): boolean;
}
