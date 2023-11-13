'use client'
import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar';
import Button from '../Button';


interface ListingReservationProps {
    price: number
    dateRange: Range;
    totalPrice: number
    onChangeDate: (value: Range) => void
    onSubmit: () => void
    disable?: boolean
    disabledDate?: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disable,
    disabledDate
}) => {
    
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <h2 className=' text-2xl font-semibold'>${price}</h2>
                <h4 className=' font-light text-neutral-500'>night</h4>
            </div>
            <hr/>
            <Calendar 
            value={dateRange}
            disabledDate={disabledDate}
            onChange={(value)=>onChangeDate(value.selection)}
            />
            <hr/>
            <div className='p-4'>
                <Button label='Reserve' onClick={onSubmit} disable={disable}/>
            </div>
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <h1>Total</h1>
                <h1>${totalPrice}</h1>
            </div>
        </div>
    );
};

export default ListingReservation;