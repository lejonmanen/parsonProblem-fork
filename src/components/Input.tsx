import React, { useState } from "react";

interface InputProps {
    nextScreen: () => void;
}

const Input: React.FC<InputProps> = ({ nextScreen }) => {
    const [code, setCode] = useState('');

    const placeHolder =
        `for (int i = 0; i < 10; i++) {
    print(i)
}`

    return (
        <div>
            <textarea
                rows={10}
                cols={50}
                value={code}
                onChange={event => setCode(event.target.value)}
                placeholder={placeHolder}
            /><br />
            <button onClick={nextScreen}>Shuffle</button>
        </div>
    )
}

export default Input;