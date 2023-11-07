'use client'
import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome To Airbnb' subTitle='Create An Account' />
            <Input
                id='email'
                label='Email'
                disable={isLoading}
                redister={register}
                errors={errors}
                type='email'
            />
            <Input
                id='name'
                label='Name'
                disable={isLoading}
                redister={register}
                errors={errors}
                type='text'
            />
            <Input
                id='password'
                label='Password'
                disable={isLoading}
                redister={register}
                errors={errors}
                type='password'
            />
        </div>
    )

    return (
        <Modal
            disable={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default RegisterModal;