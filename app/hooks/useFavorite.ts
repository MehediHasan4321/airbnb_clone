import axios from "axios";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


interface IUserFavorite {
    listingId: string
    currentUser: SafeUser | null
}


const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {

    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {

        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request;
            if (hasFavorite) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Success')

        } catch (e) {
            toast.error('Something went worng')
        }
    }, [hasFavorite, currentUser, loginModal, router])

    return {
        hasFavorite, toggleFavorite
    }

}

export default useFavorite