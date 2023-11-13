'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDageRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}


interface ListingClientProps {
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
    reservations?: Reservation

}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = []
}) => {

    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDate = useMemo(() => {
        let dates: Date[] = []
        //@ts-ignore
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })


        return dates
    }, [reservations,])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState(initialDageRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        }).then(() => {
            toast.success('Listing Reserved')
            setDateRange(initialDageRange)
            //Redirect to trips
            router.refresh()
        }).catch(error => {
            toast.error('Something went wrong!')

        }).finally(() => { setIsLoading(false) })


    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])



    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.startDate,
                dateRange.endDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }



    }, [dateRange, listing?.price])


    const category = useMemo(() => {
        return categories.find(item => {
            return item.label === listing.category
        })
    }, [categories, listing])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        //@ts-ignore
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing?.user}
                            //@ts-ignore
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}

                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate = {(value)=>setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disable={isLoading}
                        //@ts-ignore
                        disabledDates={disabledDate}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;