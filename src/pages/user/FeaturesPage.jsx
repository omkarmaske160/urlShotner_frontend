import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faLink, faShieldAlt, faChartBar, faTrashAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const features = [
    {
        icon: faThumbsUp,
        title: 'Easy',
        description: 'ShortURL is easy and fast, enter the long link to get your shortened link',
        details: 'This tool provides an intuitive interface to quickly shorten your URLs.',
    },
    {
        icon: faLink,
        title: 'Shortened',
        description: 'Use any link, no matter what size, ShortURL always shortens',
        details: 'Our service ensures that your links are always shortened, regardless of length.',
    },
    {
        icon: faShieldAlt,
        title: 'Secure',
        description: 'It is fast and secure, our service has HTTPS protocol and data encryption',
        details: 'We prioritize your security with HTTPS and encryption.',
    },
    {
        icon: faChartBar,
        title: 'Statistics',
        description: 'Check the number of clicks that your shortened URL received',
        details: 'Track the performance of your links with detailed statistics.',
    },
    {
        icon: faTrashAlt,
        title: 'Reliable',
        description: 'All links that try to disseminate spam, viruses and malware are deleted',
        details: 'We ensure that malicious links are promptly removed.',
    },
    {
        icon: faMobileAlt,
        title: 'Devices',
        description: 'Compatible with smartphones, tablets and desktop',
        details: 'Our service works seamlessly across all devices.',
    },
];

const FeaturesPage = () => {
    return (
        <div className="flex flex-col items-center py-8 bg-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
                {features.map((feature, index) => (
                    <div key={index} className="bg-slate-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105">
                        <div className=" text-info mb-4">
                            <FontAwesomeIcon icon={feature.icon} size="3x" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className=" mb-4">{feature.description}</p>
                        <p className="text-gray-100 text-sm">{feature.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
