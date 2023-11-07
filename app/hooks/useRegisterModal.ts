import {create} from 'zustand'

interface RegisterModal {
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void

}

const useRegisterModal = create<RegisterModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useRegisterModal