'use client'

import Container from '../components/Container';
import ResponsiveModel from '../utils/ResponsiveModel';
import { SafeListing, SafeUser } from '../types';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {

    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')

    const onDelete = useCallback((id:string)=>{
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listing deleted')
        })
        .catch(()=>{
            toast.error('Something went wrong!')
        })
        .finally(()=>{
            setDeletingId('')
            router.refresh()
        })

    },[])




    return (
        <Container>
            <Heading
            title='Properties'
            subTitle='Your all are here'
            />
            <ResponsiveModel>
                {
                    listings.map(listing=><ListingCard 
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                    actionId={listing.id}
                    actionLabel='Delete Property'
                    onAction={onDelete}
                    disable={deletingId === listing.id}
                    />)
                }
            </ResponsiveModel>
        </Container>
    );
};

export default PropertiesClient;