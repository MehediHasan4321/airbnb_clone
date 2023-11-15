'use client'
import React, { useCallback, useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm, SubmitHandler, } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const router = useRouter()
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
            roomCount: 1

        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }),
        [location])


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }



    const onBack = () => {
        setStep(value => value - 1)
    }

    const onNext = () => {
        setStep(value => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Linting Created')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(e => {
                toast.error('Something went worng!')
            })
            .finally(() => { setIsLoading(false) })
    }


    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'

        }
        return 'Next'
    }, [step])


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])


    let bodyContent = (
        <BodyContainer>
            <Heading title='Which of these best describe your place?'
                subTitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto '>
                {
                    categories.map(item => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </BodyContainer>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <BodyContainer>
                <Heading
                    title='Where is your place located?'
                    subTitle='Help guests find you!'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng}/>
            </BodyContainer>
        )
    }


    if (step === STEPS.INFO) {
        bodyContent = (
            <BodyContainer>
                <Heading
                    title='Share some basic about your place'
                    subTitle='What amenities do you have?'
                />
                <Counter title='Guests'
                    subTitle='How many guests do you allow?'
                    onChange={value => setCustomValue('guestCount', value)}
                    value={guestCount}
                />
                <hr />
                <Counter title='Rooms'
                    subTitle='How many rooms do you have?'
                    onChange={value => setCustomValue('roomCount', value)}
                    value={roomCount}
                />
                <hr />
                <Counter title='Bathrooms'
                    subTitle='How many bathroom do you have?'
                    onChange={value => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                />
            </BodyContainer>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <BodyContainer>
                <Heading
                    title='Upload Some Image '
                    subTitle='Show some image about your place'
                />
                <ImageUpload url={imageSrc} onChange={(url) => setCustomValue('imageSrc', url)} />
            </BodyContainer>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <BodyContainer>
                <Heading
                    title='How would you descript your place?'
                    subTitle='Short and Sweet works best!'
                />
                <Input
                    id='title'
                    label='Title'
                    register={register}
                    disable={isLoading}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id='description'
                    label='Description'
                    register={register}
                    disable={isLoading}
                    errors={errors}
                    required
                />
            </BodyContainer>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <BodyContainer>
                <Heading
                    title='Now, Set your price'
                    subTitle='How much do you charge per night?'
                />
                <Input
                    id='price'
                    label='Price'
                    register={register}
                    errors={errors}
                    required
                    formatPrice
                />
            </BodyContainer>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title='Airbnb Your Home'
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


export default RentModal;