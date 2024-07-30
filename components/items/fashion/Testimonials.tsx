import ItemTestimonial from '@/components/cards/ItemTestimonial';

const Testimonials = () => {
    return (
        <div className="bg-white py-14">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="font-semibold text-3xl mb-4 w-[30%]">
                    Customer Testimonials
                </h1>

                <div className="flex flex-row justify-between gap-8 mt-16">
                    {Array(3)
                        .fill(null)
                        .map((review, idx) => (
                            <ItemTestimonial key={idx} dataReview={null} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
