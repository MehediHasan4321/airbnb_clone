'use client'
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
    //@ts-ignore
    const {hasFavorite,toggleFavorite} = useFavorite({listingId,currentUser})
    
    
    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                className='fill-white absolute -top-[2px] -right-[2px] '
                size={28}
            />
            <AiFillHeart
                className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
                size={24}
            />
        </div>
    );
};

export default HeartButton;