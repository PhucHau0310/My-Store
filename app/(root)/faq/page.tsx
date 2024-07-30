'use client';

import useClickOutside from '@/hooks/useCickOutside';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

const FAQ = () => {
    const { ref, isVisible, setIsVisible } = useClickOutside(false);
    const [idSelect, setIdSelect] = React.useState(-1);
    return (
        <div className="bg-white mt-12 pb-28">
            <div className="max-w-screen-lg mx-auto">
                <h1 className="font-semibold text-4xl mb-6 w-1/3">
                    Most asked questions about us
                </h1>

                <div className="w-full">
                    {Array(4)
                        .fill(null)
                        .map((faq, idx) => (
                            <div
                                ref={ref}
                                key={idx}
                                className="shadow-md  shadow-[#005D63] border border-[#005D63] p-4 mb-8 "
                            >
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-[#131717] font-medium text-lg">
                                        How long does the program take to
                                        complete?
                                    </p>

                                    <button
                                        onClick={() => {
                                            setIsVisible(true);
                                            setIdSelect(idx);
                                        }}
                                        className="shadow-md  shadow-[#005D63] border border-[#005D63] p-3 text-[#005D63]"
                                    >
                                        {!isVisible ? (
                                            <AddIcon />
                                        ) : (
                                            <RemoveIcon />
                                        )}
                                    </button>
                                </div>
                                {isVisible && idx === idSelect && (
                                    <p className="text-[#566363] font-normal text-base mt-6 transform transition-opacity duration-300">
                                        <span>
                                            The program is flexibly-paced within
                                            a 7-month duration. There are three
                                            deadlines along the way that weve
                                            put in place to help keep you on
                                            track for graduation.
                                        </span>
                                        <br />
                                        <span className="mt-3 inline-block">
                                            Expect to devote a minimum of 15-20
                                            hours per week to graduate within
                                            that maximum time frame. This is
                                            considered part-time study, and
                                            matches the default pacing of the
                                            program. If youd like to graduate in
                                            as little as three months, you can
                                            devote 30-40 hours per week to reach
                                            that goal.
                                        </span>
                                    </p>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
