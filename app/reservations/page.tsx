import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyStore from "../components/EmptyStore";
import ReserevationClient from "./ReserevationClient";


const ReservationPage = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyStore title="Unautorized" subTitle="Please Login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({authorId:currentUser.id})

    if(reservations.length ===0){
        return(
            <ClientOnly>
                <EmptyStore title="No reservations founod" subTitle="Look like you have no reservations on your proparty"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReserevationClient
            //@ts-ignore
            currentUser={currentUser}
            //@ts-ignore
            reservations={reservations}
            />
        </ClientOnly>
    );
};

export default ReservationPage;