import React from 'react';

type Props = {
    message: string;
    onClose: () => void;
    type: 'success' | 'error';
};

const Notification: React.FC<Props> = ({ message, onClose, type }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 right-4 w-64 p-4 rounded-md ${bgColor} text-white shadow-md`}>
            <p className='text-lg'>{message}</p>
            <button onClick={onClose} className='ml-2 px-3 py-1 bg-gray-800 rounded-md'>
                Fechar
            </button>
        </div>
    );
};

export default Notification;
