import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import ResponsiveModel from "../utils/ResponsiveModel";

interface FavoritesClientProps{
    currentUser?:SafeUser|null
    listings:SafeListing[]
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({
    currentUser,
    listings
}) => {
    return (
        <Container>
            <Heading
            
            title="Favorites"
            subTitle="List of places you have favorited!"

            />
            <ResponsiveModel>
                {
                    listings.map(listing=><ListingCard key={listing.id} data={listing} currentUser={currentUser}   />)
                }
            </ResponsiveModel>
        </Container>
    );
};

export default FavoritesClient;