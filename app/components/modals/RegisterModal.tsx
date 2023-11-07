'use client'
import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        axios('/api/register',data)
        .then(()=>{
            registerModal.onClose()
        })
        .catch(error=>{
            console.log(error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    return (
        <Modal 
        disable={isLoading}
         isOpen={registerModal.isOpen} 
         title='Register'
         actionLabel='Continue'
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         />
    );
};

export default RegisterModal;