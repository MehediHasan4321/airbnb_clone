import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}

const getReservations = async (params: IParams) => {
    const { listingId, userId, authorId } = params

    try {
        const query: any = {}

        if (listingId) {
            query.listingId = listingId
        }
        if (userId) {
            query.userId = userId
        }
        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createAt: 'desc'
            }
        })

        const safeReservaiton = reservations.map(reservation => ({
            ...reservation,
            createAt: reservation.createAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createAt: reservation.createAt.toISOString()
            }
        }))

        return safeReservaiton
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getReservations