import prisma from '@/app/libs/prismadb'


const getListings = async () => {

    try {

        const listings = await prisma.listing.findMany({
            orderBy: {
                createAt: 'desc'
            }
        })

        const safeListings = listings.map(listing=>({
            ...listing,
            createAt:listing.createAt.toISOString()
        }))

        return safeListings

    } catch (error: any) {
        throw new Error(error)
    }

}

export default getListings