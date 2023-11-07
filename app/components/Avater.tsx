'use client'
import Image from 'next/image';
import React from 'react';

const Avater = () => {
    return (
        <Image alt='avater' 
        src={'/images/placeholder.jpg'} 
         width={30} 
         height={30}
        className=' rounded-full'
        />
    );
};

export default Avater;