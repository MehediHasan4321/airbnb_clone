import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export const POST = async (request: Request) => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate: startDate,
                    endDate: endDate,
                    totalPrice: totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}



