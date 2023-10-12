import React, { useState } from 'react';
import faq from '../../../public/faq.json';

const FAQ = () => {
    const [openItem, setOpenItem] = useState(null);

    const handleItemClick = (index) => {
        if (openItem === index) {
            setOpenItem(null); // Close the item if it's already open
        } else {
            setOpenItem(index); // Open the clicked item
        }
    };

    return (
        <div className='join join-vertical w-full py-5'>
            {faq.map((item, index) => (
                <div
                    className={`collapse collapse-arrow join-item border border-base-300 ${openItem === index ? 'open' : ''
                        }`}
                    key={index}
                >
                    <input
                        type="radio"
                        name={`faq-accordion-${index}`} // Use a unique name for each item
                        checked={openItem === index}
                        onChange={() => handleItemClick(index)}
                    />
                    <div className="collapse-title text-xl font-medium" onClick={() => handleItemClick(index)}>
                        {item.question}
                    </div>
                    <div className="collapse-content text-xl">
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
