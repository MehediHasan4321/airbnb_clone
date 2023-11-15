import prisma from '@/app/libs/prismadb'


export interface IListingParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    category?: string
    startDate?: string
    endDate?: string
    locationValue?: string
}

const getListings = async (params: IListingParams) => {

    try {

        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            category,
            startDate,
            endDate,
            locationValue
        } = params
        let query: any = {}

        if (userId) {
            query.useId = userId
        }

        if(guestCount){
            query.guestCount=guestCount
        }
        if(roomCount){
            query.roomCount={
                gte:+roomCount
            }
        }
        if(bathroomCount){
            query.bathroomCount={
                gte:+bathroomCount
            }
        }

        if(guestCount){
            query.guestCount={
                gte:+guestCount
            }
        }

        if(locationValue){
            query.locationValue=locationValue
        }

        if(startDate && endDate){
            query.NOT = {
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate:{gte:startDate},
                                startDate:{lte:endDate}
                            },
                            {
                                startDate:{lte:endDate},
                                endDate:{gte:startDate}
                            }
                        ]
                    }
                }
            }
        }

        if(category){
            query.category=category
        }



        const listings = await prisma.listing.findMany({
            where: query,
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