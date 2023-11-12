'use client'

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { IconType } from 'react-icons'

interface CounterProps {
    title: string
    subTitle: string
    value: number
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({ title, subTitle, value, onChange }) => {
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [value, onChange])

    const onReduce = useCallback(() => {
        if (value === 1) {
            return
        }
        onChange(value - 1)
    }, [value, onChange])


    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className=" font-light text-gray-600">
                    {subTitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <IconBax onClick={onReduce} icon={AiOutlineMinus}/>
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <IconBax onClick={onAdd} icon={AiOutlinePlus}/>
            </div>
        </div>
    );


};

interface IconBaxProps{
    onClick:()=>void
    icon:IconType
}

const IconBax:React.FC<IconBaxProps> = ({onClick,icon:Icon}) => {
    return (
        <div
        onClick={onClick}
        className="w-10 h-10 border-[1px] rounded-full border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-50 transition">
            <Icon />
        </div>
    )
}

export default Counter;