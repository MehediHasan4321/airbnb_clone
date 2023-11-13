import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId:string
}

const getListingById = async (params:IParams)=>{
    try{
        const {listingId} = params

        const listing = await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                user:true
            }
        })

        if(!listing){
            return null
        }

        return {
            ...listing,
            createdAt:listing.createAt.toISOString(),
            user:{
                ...listing.user,
                createdAt:listing.user.createdAt.toISOString(),
                updatedAt:listing.user.updateAt.toISOString(),
                emailVerified:listing.user.emailVerified?.toISOString() || null
            }
        }
    }catch(error:any){
        throw new Error(error)
    }
}

export default getListingById