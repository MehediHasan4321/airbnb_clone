'use client'
import { Range } from 'react-date-range'
import Calendar from '../inputs/Calendar';


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
        </div>
    );
};

export default ListingReservation;