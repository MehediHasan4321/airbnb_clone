import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListing from '../actions/getFavoriteListings';
import EmptyStore from '../components/EmptyStore';
import ClientOnly from '../components/ClientOnly';
import FavoritesClient from './FavoritesClient';

const FavoritePage = async() => {

    const favoriteListing = await getFavoriteListing()
    const currentUser = await getCurrentUser()

    if(favoriteListing.length===0){
        return(
            <EmptyStore
            subTitle='Look like you have no favorite listings'
            title='No favorites found!' 
            />
        )
    }

    

    return (
        <ClientOnly>
            <FavoritesClient
            //@ts-ignore
            listings={favoriteListing}
            //@ts-ignore
            currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default FavoritePage;