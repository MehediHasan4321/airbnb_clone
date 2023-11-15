import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyStore from "../components/EmptyStore"
import TripsClient from "../trips/TripsClient"
import PropertiesClient from "./PropertiesClient"

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyStore
                    title="Unauthorized"
                    subTitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({ userId: currentUser.id })

    if (listings.length===0) {
        return (
            <ClientOnly>
                <EmptyStore
                    title="No properties found"
                    subTitle="Look like you haven't any properties."
                />
            </ClientOnly>
        )
    }


    if (currentUser && listings) {
        return (
            <ClientOnly>
                <PropertiesClient 
                //@ts-ignore
                listings={listings}
                //@ts-ignore
                currentUser={currentUser}
                />
            </ClientOnly>
        )
    }

}

export default PropertiesPage