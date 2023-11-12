'use client'

import useContries from "@/app/hooks/useCountries";
import Select from 'react-select'

export type CountrySelectValue = {
    flag: string,
    label: string,
    latlan: number[],
    region: string,
    value: string
}
interface CountrySelectProps {
    value?: CountrySelectValue,
    onChange: (vallue: CountrySelectValue) => void

}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {

    const { getAll } = useContries()



    return (
        <div>
            <Select
                placeholder='Anywhere'
                isClearable
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                options={getAll()}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3 ">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                  }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    );
};

export default CountrySelect;