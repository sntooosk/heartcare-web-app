import React from 'react';
import colors from "../../utils/styles";

type Props = {
    type?: 'text' | 'password' | 'email';
    value: string;
    setValue: (txt: string) => void;
    placeholder?: string;
    leftIcon?: JSX.Element;
};

const Input: React.FC<Props> = ({ type = 'text', setValue, value, placeholder, leftIcon }) => {
    return (
        <div className="flex flex-row p-3 rounded-md w-full mx-3 items-center" style={{ backgroundColor: colors.BACKGROUND_CARD }}>
            {leftIcon && <div className="mr-4" style={{ color: colors.ICON }}>{leftIcon}</div>}
            <input
                className="outline-0 bg-transparent w-full"
                type={type}
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                placeholder={placeholder}
                style={{ color: colors.TEXT }}
            />
        </div>
    );
};

export default Input;
