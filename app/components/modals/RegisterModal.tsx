'use client'
import React, { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast/headless';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors },reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch(error => {
                toast.error('Something went Worng')
                reset()
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggleModal = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal,registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome To Airbnb' subTitle='Create An Account' />
            <Input
                id='email'
                label='Email'
                disable={isLoading}
                register={register}
                errors={errors}
                type='email'
                required
            />
            <Input
                id='name'
                label='Name'
                disable={isLoading}
                register={register}
                errors={errors}
                type='text'
                required
            />
            <Input
                id='password'
                label='Password'
                disable={isLoading}
                register={register}
                errors={errors}
                type='password'
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button label='Containue With Google' icon={FcGoogle} 
            outline
            onClick={()=>{} }/>
            <Button 
            label='Containue With Github'
            icon={AiFillGithub}
            outline
            onClick={()=>{}}
            />
            <div className="text-neutral-500 text-center font-light">
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div 
                    onClick={toggleModal}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
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
            footer={footerContent}
        />
    );
};

export default RegisterModal;