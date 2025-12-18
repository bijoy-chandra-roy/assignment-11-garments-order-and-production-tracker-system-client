import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, user_photoURL, review: testimonial, ratings, designation } = review;

    return (
        <div className="bg-base-200 shadow-lg rounded-xl p-6 border border-base-300 h-full flex flex-col justify-between">
            <div>
                <FaQuoteLeft className="text-primary text-2xl mb-4" />

                <p className="mb-4 text-base-content/80">
                    {testimonial}
                </p>

                <div className="border-t border-dashed border-base-content/20 my-4"></div>
            </div>

            <div className='flex justify-between items-end'>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary overflow-hidden">
                        <img src={user_photoURL} alt={userName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-base-content">{userName}</h3>
                        <p className="text-sm text-base-content/60">{designation}</p>
                    </div>
                </div>

                <div className="flex gap-1 text-yellow-400 text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                            key={star} 
                            className={star <= ratings ? "text-yellow-400" : "text-gray-300"} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;