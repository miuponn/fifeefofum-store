'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

const ContactForm: FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-transparent space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="flex flex-col">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-4 py-2 bg-white border border-[#4A9BFF] rounded-sm 
                                 font-poppins text-blue placeholder-blue text-sm focus:outline-none"
                    />
                </div>

                {/* Email Input */}
                <div className="flex flex-col">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email*"
                        required
                        className="w-full px-4 py-2 bg-white border border-[#4A9BFF] rounded-sm 
                                 font-poppins text-blue placeholder-blue text-sm focus:outline-none"
                    />
                </div>
            </div>

            {/* Phone Input */}
            <div>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2 bg-white border border-[#4A9BFF] rounded-sm 
                             font-poppins text-blue placeholder-blue text-sm focus:outline-none"
                />
            </div>

            {/* Subject Input */}
            <div>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-2 bg-white border border-[#4A9BFF] rounded-sm 
                             font-poppins text-blue placeholder-blue text-sm focus:outline-none"
                />
            </div>

            {/* Message Input */}
            <div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    rows={8}
                    className="w-full px-4 py-2 bg-white border border-[#4A9BFF] rounded-sm 
                             font-poppins text-blue placeholder-blue text-sm focus:outline-none resize-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-button_pink text-white rounded-md font-poppins font-medium
                         hover:bg-white hover:text-button_pink border border-transparent
                         hover:border-button_pink transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'SUBMIT'}
            </button>
        </form>
    );
};

export default ContactForm;