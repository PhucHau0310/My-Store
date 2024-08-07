import { Product } from '@/interface';
import { Order, PaymentMethod } from '@prisma/client';
import prisma from '../prisma';

interface ProductExtends extends Product {
    quantityBuy: number;
}

interface OrderExtends extends Order {
    paymentMethod: string;
}

function parsePaymentMethod(paymentMethodString: string): PaymentMethod {
    const paymentMethod = Object.values(PaymentMethod).find(
        (value) => value === paymentMethodString
    );

    if (!paymentMethod) {
        throw new Error(`Invalid payment method: ${paymentMethodString}`);
    }

    return paymentMethod;
}

export const createOrder = async (
    dataOrder: OrderExtends,
    carts: ProductExtends[]
) => {
    try {
        const order = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: dataOrder.userId },
            });

            if (!user) {
                throw new Error('User not found');
            }

            for (const item of carts) {
                const stock = await prisma.stock.findFirst({
                    where: {
                        productId: item.id,
                    },
                });

                if (!stock || stock.quantity < item.quantityBuy) {
                    throw new Error(
                        `Insufficient stock for product ${item.id} in warehouse`
                    );
                }
            }

            const newOrder = await prisma.order.create({
                data: {
                    userId: dataOrder.userId,
                    totalAmount: parseFloat(dataOrder.totalAmount.toString()),
                    shippingAddress: dataOrder.shippingAddress,
                    status: 'PENDING',
                    orderItems: {
                        create: carts.map((item) => ({
                            productId: item.id,
                            quantity: item.quantityBuy,
                            price: item.price,
                        })),
                    },
                },
            });

            await prisma.payment.create({
                data: {
                    orderId: newOrder.id,
                    amount: newOrder.totalAmount,
                    paymentMethod: parsePaymentMethod(dataOrder.paymentMethod),
                    status: 'PENDING',
                },
            });

            for (const item of carts) {
                await prisma.stock.updateMany({
                    where: {
                        productId: item.id,
                    },
                    data: {
                        quantity: {
                            decrement: item.quantityBuy,
                        },
                    },
                });
            }

            return newOrder;
        });

        return order;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: true,
                user: true,
                payment: true,
            },
        });

        return orders;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateOrder = async (dataUpdate: Order) => {
    try {
        const updated = await prisma.order.update({
            where: {
                id: dataUpdate.id,
            },
            data: {
                orderDate: dataUpdate.orderDate,
                shippingAddress: dataUpdate.shippingAddress,
                status: dataUpdate.status,
            },
        });

        if (updated) {
            return updated;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
