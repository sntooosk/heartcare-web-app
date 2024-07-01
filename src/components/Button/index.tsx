import React from 'react';
import colors from '../../utils/styles';

type Props = {
    children: React.ReactNode,
    onClick: () => void
}

function Button({ children, onClick }: Props) {
    return (
        <button 
            onClick={onClick} 
            className='flex justify-center items-center w-full py-2 text-xl font-bold rounded-md'
            style={{ backgroundColor: colors.BUTTON, color: colors.BUTTON_TEXT }}
        >
            {children}
        </button>
    );
}

export default Button;
