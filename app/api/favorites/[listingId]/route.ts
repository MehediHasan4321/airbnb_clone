import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId: string
}

export const POST = async (request: Request, { params }: { params: IParams }) => {

    const currrentUser = await getCurrentUser()

    if (!currrentUser) {
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid Id')

    }

    let favoriteIds = [...(currrentUser.favoriteIds || [])]

    favoriteIds.push(listingId)

    const user = await prisma.user.update({
        where: {
            id: currrentUser.id
        },
        data: {
            favoriteIds
        }
    })


    return NextResponse.json(user)

}

export const DELETE = async (request: Request, { params }: { params: IParams }) => {

    const currrentUser = await getCurrentUser()
    if (!currrentUser) {
        return NextResponse.error()
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    let favoriteIds = [...(currrentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter(id => id !== listingId)

    const user = await prisma.user.update({
        where: {
            id: currrentUser.id
        },
        data: {
            favoriteIds
        }
    })


    return NextResponse.json(user)
}