
import getCurrentUser from './actions/getCurrentUser'
import getListings, { IListingParams } from './actions/getListings'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyStore from './components/EmptyStore'
import ListingCard from './components/listings/ListingCard'
import ResponsiveModel from './utils/ResponsiveModel'



interface HomeProps {
  searchParams: IListingParams
}

const Home:React.FC<HomeProps> = async ({ searchParams }) => {
  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)
  

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <EmptyStore showReset />
        </Container>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-14'>
          <ResponsiveModel>
            {
              listings.map((listing: any) => <ListingCard
                key={listing.id}
                data={listing}
                //@ts-ignore
                currentUser={currentUser}
              />)
            }
          </ResponsiveModel>
        </div>
      </Container>
    </ClientOnly>
  )
}


export default Home