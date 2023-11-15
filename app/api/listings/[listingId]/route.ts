import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams{
    listingId?:string
}

export const DELETE = async(request:Request,{params}:{params:IParams})=>{
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID')
    }


    const deleteProperties  = await prisma.listing.deleteMany({
        where:{
            id:listingId,
            useId:currentUser.id
        }
    })


 return NextResponse.json(deleteProperties)

}