import React, { useState } from "react";

export default function OptionListPopup({ isOpen, setIsOptionList }) {
    // const [isOpen, setIsOpen] = useState(false);
    const options = [
        {
            id: 1,
            option: "Join Classroom"
        },
        {
            id: 2,
            option: "Create Classroom"
        }
    ]

    return (
        <div
            className="absolute inline-block right-40 top-5"
            onMouseEnter={() => setIsOptionList(true)}
            onMouseLeave={() => setIsOptionList(false)}
        >
            {/* Dropdown menu */}
            {isOpen && (
                <ul className="absolute left-0 mt-9 w-40 bg-white border rounded shadow-lg">
                    {
                        options.map((item) => (
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" key={item.id}>
                                {item.option}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
}
