'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string'
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
const SearchModal = () => {

    enum STEPS {
        LOCATION = 0,
        DATE = 1,
        INFO = 2
    }
    const searchModal = useSearchModal()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [step, setStep] = useState(STEPS.LOCATION)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location])

    const onBack = useCallback(() => {
        setStep(value => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep(value => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(STEPS.LOCATION)
        searchModal.onClose()

        router.push(url)

    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        dateRange,
        onNext,
        bathroomCount,
        searchParams
    ])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <BodyContainer>
            <Heading
                title='Where do you wanna go?'
                subTitle='Find the perfect location!'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            
            <Map center={location?.latlng} />

        </BodyContainer>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <BodyContainer>
                <Heading title='When do you plan to go?' subTitle='Make sure everyone is free!'
                />
                <Calendar
                    onChange={(value) => { setDateRange(value.selection) }}
                    value={dateRange}
                    key={dateRange.key}

                />
            </BodyContainer>

        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subTitle="Find your perfect place!"
                />
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="Guests"
                    subTitle="How many guests are coming?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="Rooms"
                    subTitle="How many rooms do you need?"
                />
                <hr />
                <Counter
                    onChange={(value) => {
                        setBathroomCount(value)
                    }}
                    value={bathroomCount}
                    title="Bathrooms"
                    subTitle="How many bahtrooms do you need?"
                />
            </div>
        )
    }


   


    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />


    );
};

interface BodyContainerProps {
    children: React.ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    return (
        <div className='flex flex-col gap-8'>
            {children}
        </div>
    )
}

export default SearchModal;