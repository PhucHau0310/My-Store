import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import rectangle from '../../../public/svg/rectangle.svg';
import Image from 'next/image';

const Contact = () => {
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
                                <p className="font-normal">(+84) 365 728 823</p>
                            </div>
                            <div className="flex flex-row items-center gap-2 mt-4">
                                <EmailIcon />
                                <p className="font-normal">(+84) 365 728 823</p>
                            </div>
                            <div className="flex flex-row items-center gap-2 mt-4">
                                <LocationOnIcon />
                                <p className="font-normal">(+84) 365 728 823</p>
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
                            type="text"
                            placeholder="Your first name"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <input
                            type="text"
                            placeholder="Your email address"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <input
                            type="text"
                            placeholder="Your phone number"
                            className="w-full  p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />
                        <textarea
                            placeholder="Write your messages"
                            className="w-full h-[80px] p-4 border border-[#C4D1D0] outline-none placeholder:text-[#566363] text-[#566363]"
                        />

                        <button className="bg-[#005D63] px-4 py-3 text-white w-[20%]">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
