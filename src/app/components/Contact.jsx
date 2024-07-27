"use client"
import { useState } from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(false); 

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("access_key", "1101d744-cf60-4cbf-b87e-e3067d029143");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const res = await response.json();

            if (res.success) {
                setSubmitted(true); 
                setSuccessMessage(true); 
                setTimeout(() => {
                    setSuccessMessage(false); 
                }, 3000);
            } else {
                alert("Email Failed To Send");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="w-full h-full px-0 py-[90px] overflow-hidden" id="contact">
            <div className="max-w-full flex flex-col items-center">
                <div className="mb-[50px] text-center">
                    <h2 className="text-[40px] text-red-600 font-bold">Contact Me</h2>
                    <p className="text-[14px] w-[320px] text-red-600">Contact me if u need any help on ur project. And i will get to you ASAP!</p>
                </div>
                <form onSubmit={onSubmit} method="POST">
                    <div className="relative w-full">
                        <FaUser className="absolute text-[18px] right-[15px] top-[15px] text-white"/>
                        <input className="mb-5 text-white text-[20px] outline-none bg-red-600 w-full py-[7px] px-[15px] rounded-[5px] border border-transparent placeholder:text-white" type="text" placeholder="Name" name='name' id="text" maxLength={25} required autoComplete="name"></input>
                    </div>
                    <div className="relative w-full">
                        <FaEnvelope className="absolute text-[18px] right-[15px] top-[15px] text-white"/>
                        <input className="mb-5 text-white text-[20px] outline-none bg-red-600 w-full py-[7px] px-[15px] rounded-[5px] border border-transparent placeholder:text-white" type="email" placeholder="Email" name='email' required autoComplete="email"></input>
                    </div> 
                    <div className="relative">
                        <FaMessage className="absolute text-[18px] right-[15px] bottom-8 text-white"/>
                        <textarea className="mb-[15px] text-[19px] w-[400px]  h-[220px] resize-none rounded-[5px] outline-none text-white bg-red-600 p-[10px] border border-transparent placeholder:text-white max-md:w-[350px]" cols="40" rows="10" minLength={5} name='message' placeholder="Message..." required autoComplete="off"></textarea>
                    </div> 
                    <div className="relative">
                        <FaPaperPlane className="absolute right-[15px] top-[15px] text-white"/>
                        <button className="bg-red-600 w-full py-[10px] px-[15px] text-[17px] rounded-[3px] cursor-pointer text-white border border-none">Send Message</button>
                    </div>
                </form>
                {successMessage && (
                    <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-4 rounded-md text-center w-[300px]">
                        <h1 className="text-[19px] font-bold text-green-600 max-[450px]:text-[16px]">Your message has been successfully received.</h1>
                        <p className="text-[17px] mt-2 text-gray-700 max-[450px]:text-[15px]">Don't worry <span className="block">I will get to you soon.</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}
