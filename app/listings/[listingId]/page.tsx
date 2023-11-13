import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyStore from "@/app/components/EmptyStore"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"

interface Iparams{
    listingId:string
}

const ListingPage = async({params}:{params:Iparams})=>{

    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

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
            //@ts-ignore
            reservations={reservations}
            />
        </ClientOnly>
    )
}
export default ListingPage