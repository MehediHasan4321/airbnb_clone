'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ResponsiveModel from "../utils/ResponsiveModel";
import ListingCard from "../components/listings/ListingCard";

interface ReserevationClientProps {
    currentUser?: SafeUser | null
    reservations: SafeReservation[]
}

const ReserevationClient: React.FC<ReserevationClientProps> = ({
    currentUser,
    reservations
}) => {
    const router = useRouter()
    const [deletingId,setDeleteingId] = useState('')
    



    const onCancel = useCallback((id:string)=>{
        setDeleteingId(id)
  
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation Canceled')
            router.refresh()
        })
        .catch(error=>{
            toast.error('Something went wrong!')
        })
        .finally(()=>{
            setDeleteingId('')
            
        })
    },[router])



    return (
        <Container>
            <Heading title="All Reservations"
            subTitle="Bookings on your properties"
            />
            <ResponsiveModel>
                {
                    reservations.map(reservation=><ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} actionLabel="Cancel Guest Reservation" currentUser={currentUser}  onAction={onCancel}
                    disable={deletingId === reservation.id}
                    />)
                    
                }
            </ResponsiveModel>
        </Container>
    );
};

export default ReserevationClient;