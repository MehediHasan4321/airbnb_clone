'use client'

import useContries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Image from "next/image"
import Heading from "../Heading"
import HeartButton from "./HeartButton"

interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {

    const { getByValue } = useContries()
    const location = getByValue(locationValue)


    return (
        <>
            <Heading title={title} subTitle={`${location?.region},${location?.label}`} />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
                <Image alt="Listing Image" fill src={imageSrc} className="w-full object-cover" />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>

        </>
    );
};

export default ListingHead;