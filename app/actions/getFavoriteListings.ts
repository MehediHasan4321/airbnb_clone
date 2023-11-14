import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getFavoriteListing = async () => {

    const currentUser = await getCurrentUser()

    try {

        if(!currentUser){
            return [];
        }

        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser?.favoriteIds) || []]
                }
            }
        })

        const safeFavorites = favoriteListings.map(favorite => ({
            ...favorite,
            createAt: favorite.createAt.toISOString()
        }))

        return safeFavorites
    } catch (error: any) {
        throw new Error(error)
    }

}

export default getFavoriteListing