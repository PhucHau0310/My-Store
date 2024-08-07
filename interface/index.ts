export interface Category {
    id: string;
    name: string;
    description?: string;
    image: string;
    published: boolean;
}

export interface Product {
    id: string;
    name: string;
    picture: string;
    version?: string;
    description?: string;
    price: number;
    quantity: number;
    published: boolean;
    categoryId: string;
    category: Category;
    Review: Review[];
}

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    picture: string;
    shippingAddress?: string;
    mobile?: string;
    passwordHash?: string;
    role: string;
    createdAt: string;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
    reviewDate: string;
    user: User;
    createdAt: string;
}
export interface Warehouse {
    id: string;
    name: string;
    location: string;
}

export interface Order {
    id: string;
    userId: string;
    orderDate: string;
    totalAmount: number;
    shippingAddress: string;
    status: string;
    user: User;
    orderItems: {
        id: string;
        productId: string;
        quantity: number;
        price: number;
        product: {
            name: string;
        };
    }[];
    payment: {
        id: string;
        paymentDate: string;
        amount: string;
        paymentMethod: string;
        status: string;
    };
}

export interface Post {
    id: string;
    title: string;
    content: string;
    picture: string;
    published: boolean;
    authorId: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}
