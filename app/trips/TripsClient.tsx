'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        setIsLoading(true)
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled')
                router.refresh()
            })
            .catch(error => {
                toast.error("Something went worng!")
            })
            .finally(() => {
                setDeletingId('')
                setIsLoading(false)
            })
    }, [router])

   

    return (
        <Container>
            <Heading
                title="Trips"
                subTitle="Where you've been and where you've going"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 
            md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-8">
                {reservations.map(reservation=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    actionLabel="Cancel Reservation"
                    currentUser={currentUser}
                    disable={deletingId === reservation.id}
                    onAction={onCancel}
                    isLoading={isLoading}
                    />
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;