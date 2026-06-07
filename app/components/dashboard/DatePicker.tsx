// components/DatePicker.tsx
"use client"
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type CustomDatePickerProps = {
    value: Date | null;
    onChange: (date: Date | null) => void;
    label?: string; // Make label optional
    error?: { message: string };
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, label, error }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(value);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                showYearDropdown
            />
            {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default CustomDatePicker;




// const CustomDatePicker: React.FC<DatePickerProps> = ({ value, onChange, label, error }) => {
//     const handleDateChange = (date: Date | null) => {
//         const formattedDate = date ? date.toISOString().split('T')[0] : null; // Convertir a cadena
//         onChange(formattedDate);
//     };

//     // Convert value to Date if it's not already, or set to null
//     //const selectedDate = value ? new Date(value) : null;

//     return (
//         <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//             <DatePicker
//                 selected={value ? new Date(value) : null} // Convertir cadena a Date
//                 onChange={handleDateChange}
//                  dateFormat="Pp"
//                 className="border border-gray-300 p-2 w-full"
//             />
//             {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
//         </div>
//     );
// };
