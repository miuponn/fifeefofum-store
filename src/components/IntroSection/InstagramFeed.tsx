'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaPlay } from 'react-icons/fa';
import useImagePreloader from '@/hooks/useImagePreloader';
import instagramData from '@/data/instagramPosts.json';
import type { InstagramPost } from '@/custom';

const InstagramFeed: FC = () => {
    const instagramPosts = instagramData.posts.filter((post): post is InstagramPost => {
        return typeof post.id === 'string' &&
               typeof post.image === 'string' &&
               typeof post.link === 'string' &&
               typeof post.type === 'string' &&
               (post.type === 'image' || post.type === 'video');
    });
    
    const imageUrls = instagramPosts.map(post => post.image);
    const imagesLoaded = useImagePreloader(imageUrls);

    return (
        <section className="relative" aria-labelledby="instagram-heading">
            <h2 
                id="instagram-heading" 
                className="text-dark_pink text-lg sm:text-xl md:text-2xl 
                    font-urbanist font-semibold mb-4 sm:mb-5 md:mb-6"
            >
                Instagram
            </h2>
    
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {instagramPosts.map((post: InstagramPost) => (
                    <Link
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group overflow-hidden w-full aspect-square"
                        aria-label={`View Instagram ${post.type === 'video' ? 'video' : 'post'}`}
                    >
                        {imagesLoaded ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={post.image}
                                    alt={`Instagram ${post.type}`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 
                                        group-hover:scale-105"
                                    priority={false}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-accent_pink/10 animate-pulse" />
                        )}
    
                        <div className="absolute inset-0 bg-black/40 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300 
                            flex items-center justify-center"
                        >
                            {post.type === "video" ? (
                                <FaPlay className="h-8 w-8 md:h-6 md:w-6 lg:h-5 lg:w-5 
                                    text-white transform group-hover:scale-110 
                                    transition-transform duration-300" 
                                />
                            ) : (
                                <FaInstagram className="h-8 w-8 md:h-6 md:w-6 lg:h-7 lg:w-7 
                                    text-white transform group-hover:scale-110 
                                    transition-transform duration-300" 
                                />
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default InstagramFeed;

