import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export const POST = async(request:Request)=>{
    const currentuser = await getCurrentUser()
    if(!currentuser){
        return NextResponse.error()
        
    }

    const body = await request.json()
    const {
        title,
        description,
        imageSrc,
        category,
        price,
        roomCount,
        guestCount,
        bathroomCount,
        location,
    } = body;

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            price:parseInt(price,10),
            roomCount,
            guestCount,
            bathroomCount,
            locationValue:location.value,
            useId:currentuser.id
        }
    })


    return NextResponse.json(listing)

}