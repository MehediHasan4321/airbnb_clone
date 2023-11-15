import prisma from '@/app/libs/prismadb'


export interface IListingParams {
    userId?: string
}

const getListings = async (params:IListingParams) => {

    try {

        const { userId } = params
        let query: any = {}

        if (userId) {
            query.useId = userId
        }

        const listings = await prisma.listing.findMany({
            where:query,
            orderBy: {
                createAt: 'desc'
            }
        })

        const safeListings = listings.map(listing => ({
            ...listing,
            createAt: listing.createAt.toISOString()
        }))

        return safeListings

    } catch (error: any) {
        throw new Error(error)
    }

}

export default getListings