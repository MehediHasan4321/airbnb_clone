'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io'
import Button from '../Button';


interface ModalProps {
    isOpen?: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title?: string,
    body?: React.ReactNode,
    footer?: React.ReactNode,
    actionLabel: string,
    disable?: boolean,
    secondaryActionLabel?: string,
    secondaryAction?: () => void
}


const Modal: React.FC<ModalProps> = ({
    disable, isOpen, onClose, onSubmit, title, body, footer, actionLabel, secondaryAction, secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disable) {
            return
        } else {
            setShowModal(false)
            setTimeout(() => {
                onClose()
            }, 300)
        }
    }, [])

    const handleSubmit = useCallback(() => {
        if (disable) {
            return
        } else {
            onSubmit()
        }
    }, [disable, onSubmit])

    const handleSeondaryAction = useCallback(() => {
        if (disable || !secondaryAction) {
            return
        }

        secondaryAction()

    }, [disable, secondaryAction])


    if (!isOpen) {
        return null
    }


    return (
        <>
            <div className=' justify-center items-center flex overflow-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none bg-neutral-800/70 '>
                <div className=' relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto '>
                    {/* Content */}

                    <div className={`translate duration-300 h-full  ${showModal ? `translate-y-0 opacity-100` : `translate-y-full opacity-0`}`}>
                        <div className=' translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
                            {/* HEADER */}
                            <div className='flex items-center justify-center p-6 rounded-t relative border-b-[1px]'>
                                <button
                                    onClick={handleClose}
                                    className=' p-1 border-0 hover:opacity-70 absolute left-9'>
                                    <IoMdClose />
                                </button>
                                <div className=' text-lg font-semibold '>
                                    {title}
                                </div>
                            </div>
                            {/* body */}
                            <div className=' relative p-6 flex-auto'>
                                {body}
                            </div>
                            {/* footer */}
                            <div className='flex flex-col gap-2 p-6'>
                                <div className=' flex flex-row items-center gap-4 w-full'>
                                    {
                                        secondaryAction && secondaryActionLabel && (
                                            <Button
                                                outline
                                                label={secondaryActionLabel} disable={disable} onClick={handleSeondaryAction}
                                            />
                                        )}
                                    <Button label={actionLabel} onClick={handleSubmit} />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;