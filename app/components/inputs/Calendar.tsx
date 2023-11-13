'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalendarProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void,
    disabledDate?: Date[]
}
const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDate
}) => {

    
    return (
        <DateRange
            rangeColors={['#F4405D']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDate}
        />
    );
};

export default Calendar;