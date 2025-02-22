import { FC } from 'react';
import { FaInstagram, FaPlay } from 'react-icons/fa';
import useImagePreloader from '../../hooks/useImagePreloader';
import instagramData from '../../data/instagramPosts.json';

interface InstagramPost {
  id: string;
  image: string;
  link: string;
  type: 'image' | 'video';
}

interface InstagramData {
  posts: InstagramPost[];
}

const InstagramFeed: FC = () => {
    const instagramPosts = (instagramData as InstagramData).posts;
    const imageUrls = instagramPosts.map(post => post.image);
    const imagesLoaded = useImagePreloader(imageUrls);

    return (
        <section className="relative">
            <h2 className="text-dark_pink text-lg sm:text-xl md:text-2xl font-urbanist font-semibold mb-4 sm:mb-5 md:mb-6">
                Instagram
            </h2>
    
            <div className="grid grid-cols-2 md:grid-cols-3">
                {instagramPosts.map((post: InstagramPost) => (
                    <a
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group overflow-hidden w-full aspect-square"
                    >
                        {imagesLoaded ? (
                            <img
                                src={post.image}
                                alt="Instagram Post"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                        )}
    
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {post.type === "video" ? (
                                <FaPlay className="h-8 w-8 md:h-6 md:w-6 lg:h-5 lg:w-5 text-white" />
                            ) : (
                                <FaInstagram className="h-8 w-8 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default InstagramFeed;

