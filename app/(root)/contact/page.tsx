'use client';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import rectangle from '../../../public/svg/rectangle.svg';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import { CircularProgress } from '@mui/material';

const Contact = () => {
    const [isLoading, setLoading] = React.useState(false);
    const [name, setName] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [phone, setPhone] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    const dispatch = useDispatch();

    const handleSubmitMessage = async () => {
        if (!name || !email || !phone || !message) {
            dispatch(
                resStatus({
                    status: 500,
                    message: 'Pleas filled information below!',
                })
            );
            return;
        }

        setLoading(true);
        try {
            const emailData = {
                name: name,
                email: email,
                subject: 'Sent Admin',
                message: `${message}, phone: ${phone}`,
            };

            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const dataRes = await res.json();

            dispatch(
                resStatus({ status: res.status, message: dataRes.message })
            );

            if (res.ok) {
                setName(null);
                setEmail(null);
                setPhone(null);
                setMessage(null);
            }
        } catch (error) {
            console.log(error);
            dispatch(
                resStatus({ status: 500, message: 'Failed to sent email' })
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white mt-20 pb-28">
            <div className="max-w-screen-xl mx-auto h-[400px]">
                <h1 className="font-semibold text-4xl mb-6 ">Lets Talk</h1>

                <div className="w-full flex flex-row gap-8 h-full">
                    <div className="w-[30%] bg-[#FFD44D] p-5 text-[#131717] relative">
                        <h2 className="text-lg font-medium">
                            Contact Information
                        </h2>

                        <p className="text-base font-normal my-3 w-[90%]">
                            Fill up the form and our team will get back to you
                            withing 24 hours
                        </p>

                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <LocalPhoneIcon />
                                <p className="font-normal">(+84) 365 728 511</p>
                            </div>
                            <div className="flex flex-row items-center gap-2 mt-4">
                                <EmailIcon />
                                <p className="font-normal">
                                    haunhpr024@gmail.com
                                </p>
                            </div>
                            <div className="flex flex-row items-center gap-2 mt-4">
                                <LocationOnIcon />
                                <p className="font-normal">
                                    201 Bui Dinh Tuy, Phuong 24, Quan Binh
                                    Thanh, TP.HCM
                                </p>
                            </div>
                        </div>

                        <div className="absolute left-0 bottom-0">
                            <Image
                                src={rectangle}
                                alt="rectangle"
                                width={200}
                                height={200}
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="w-[70%] flex flex-col justify-between ">
                        <input
                            value={name ?? ''}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Your first name"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <input
                            value={email ?? ''}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Your email address"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <input
                            value={phone ?? ''}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Your phone number"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <textarea
                            value={message ?? ''}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your messages"
                            className="w-full h-[80px] p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />

                        <button
                            onClick={handleSubmitMessage}
                            className="bg-[#005D63] px-4 py-3 text-white w-[20%]"
                        >
                            {isLoading ? <CircularProgress /> : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
