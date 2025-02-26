import { FC } from 'react';
import { motion } from 'framer-motion';

interface AnnouncementBarProps {
    message: string;
}

const AnnouncementBar: FC<AnnouncementBarProps> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-accent_pink w-full text-center text-white py-2"
        >
            <motion.p 
                className="text-xs sm:text-sm md:text-base font-poppins font-light tracking-wide flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-base opacity-80">✿</span>
                {message}
                <span className="text-base opacity-80">✿</span>
            </motion.p>
        </motion.div>
    );
};

export default AnnouncementBar;