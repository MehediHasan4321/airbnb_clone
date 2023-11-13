'use client'

import useContries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avater from "../Avater";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps{
    user:SafeUser | null
    description?:string
    roomCount:number
    guestCount:number
    bathroomCount:number
    category:{
        icon:IconType,
        label:string,
        description:string
    } | undefined
    locationValue:string
}

const ListingInfo:React.FC<ListingInfoProps> = ({
     user,
     description,
     roomCount,
     guestCount,
     bathroomCount,
     category,
     locationValue

}) => {

    const {getByValue} = useContries()
    

    const coordinates = getByValue(locationValue)?.latlng
    const Map = dynamic(()=>import('../Map'),{ssr:false})

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-2xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted By {user?.name}</div>
                    <Avater />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guest</div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr/>
            {category && (
                <ListingCategory icon={ category.icon} label={category.label} description={category.description} />
            )}
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
};

export default ListingInfo;