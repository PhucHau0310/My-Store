'use client';

import ItemTestimonial from '@/components/cards/ItemTestimonial';
import { Review } from '@/interface';
import { CircularProgress } from '@mui/material';
import React from 'react';

const Testimonials = () => {
    const [isLoading, setLoading] = React.useState(false);
    const [reviews, setReviews] = React.useState<Review[]>([]);

    React.useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/review`);
                const data = await res.json();

                if (res.ok) {
                    setReviews(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getReviews();
    }, []);
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-4 w-[30%]">
                    Customer Testimonials
                </h1>

                <div className="flex flex-row justify-between gap-8 mt-16">
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        reviews
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map((review, idx) => (
                                <ItemTestimonial
                                    key={idx}
                                    dataReview={review}
                                />
                            ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
