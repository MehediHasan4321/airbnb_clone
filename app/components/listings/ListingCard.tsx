'use client'

import { useRouter } from "next/navigation";
import useContries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
import HeartButton from "./HeartButton";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing
    reservation: SafeReservation
    onAction?: (id: string) => void
    disable?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
    isLoading?:boolean

}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction, disable, actionId = '', actionLabel, currentUser,isLoading }) => {

    const router = useRouter()
    const { getByValue } = useContries()
    const location = getByValue(data?.locationValue)

    const handleCancle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (disable) {
            return
        }

        onAction?.(actionId)

    }, [onAction, actionId, disable])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price
    }, [reservation, data.price])

    const reservationData = useMemo(() => {
        if (!reservation) {
            return null
        }
        const strt = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(strt, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])





    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >

            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="Listing"
                        fill
                        src={data?.imageSrc}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />

                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationData || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {
                        !reservation && (
                            <div className="font-light">night</div>
                        )
                    }
                </div>
                {
                    actionId && actionLabel && (
                        <Button
                        disable={disable}
                        small
                        label={actionLabel}
                        onClick={handleCancle}
                        isLoading={isLoading}
                        />
                    )
                }
            </div>

        </div>
    );
};

export default ListingCard;