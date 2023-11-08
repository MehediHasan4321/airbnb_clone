'use client'
import {signIn} from 'next-auth/react'
import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast/headless';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors },reset } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        
        signIn('credentials',{
            ...data,
            redirect:false
        })
        .then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success('Login Success')
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
        
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back To Airbnb' subTitle='Login To Your Account' />
            <Input
                id='email'
                label='Email'
                disable={isLoading}
                register={register}
                errors={errors}
                type='email'
                required
            />
            {/* <Input
                id='name'
                label='Name'
                disable={isLoading}
                register={register}
                errors={errors}
                type='text'
                required
            /> */}
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
                        Don't have an account?
                    </div>
                    <div 
                    onClick={loginModal.onClose}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Register
                    </div>
                </div>
            </div>
        </div>
    )
        
    return (
        <Modal
            disable={isLoading}
            isOpen={loginModal.isOpen}
            title='Log in'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;