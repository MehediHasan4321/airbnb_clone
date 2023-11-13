import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyStore from "../components/EmptyStore"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
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

    const reservations = await getReservations({ userId: currentUser.id })

    if (reservations.length===0) {
        return (
            <ClientOnly>
                <EmptyStore
                    title="No trips found"
                    subTitle="Look like you haven't reserved any trips."
                />
            </ClientOnly>
        )
    }


    if (currentUser && reservations) {
        return (
            <ClientOnly>
                <TripsClient
                    //@ts-ignore
                    reservations={reservations}
                    //@ts-ignore
                    currentUser={currentUser}
                />
            </ClientOnly>
        )
    }

}

export default TripsPage