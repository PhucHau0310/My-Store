interface Category {
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
