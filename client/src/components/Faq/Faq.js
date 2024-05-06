import React, { useState } from 'react';
import './Faq.css';
import envelopeImage from './envelope.webp';

const FAQComponent = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const handleFaqClick = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "What is your company's mission?",
            answer: 'Our mission is to provide innovative solutions that enhance peoples lives and make a positive impact on society.',
        },
        {
            question: 'What products or services do you offer?',
            answer: 'We offer a wide range of products and services, including software development, web design, and digital marketing solutions.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach our customer support team by email at support@company.com or by phone at 555-555-5555.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach our customer support team by email at support@company.com or by phone at 555-555-5555.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach our customer support team by email at support@company.com or by phone at 555-555-5555.',
        },
    ];

    return (
        <div className='faqbg'>
        <div className="faq-container">
            <h2 className="faq-heading">Frequently Asked Questions</h2>
            <div className="faq-content">
                <div className="faq-image">
                    <img src={envelopeImage} alt="Envelope" className="envelope-img" />
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                            key={index}
                            onClick={() => handleFaqClick(index)}
                        >
                            <div className="faq-question">
                                <span>{faq.question}</span>
                                <span className="faq-icon">{activeFaq === index ? '-' : '+'}</span>
                            </div>
                            {activeFaq === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default FAQComponent;