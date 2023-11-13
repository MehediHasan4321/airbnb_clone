import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import EmptyStore from "@/app/components/EmptyStore"
import ListingClient from "./ListingClient"

interface Iparams{
    listingId:string
}

const ListingPage = async({params}:{params:Iparams})=>{

    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return(
            <ClientOnly>
                <EmptyStore />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ListingClient 
            listing={listing}
            //@ts-ignore
            currentUser = {currentUser}
            />
        </ClientOnly>
    )
}
export default ListingPage