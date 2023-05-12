import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../main";


const Input = () => {
    const [code, setCode] = useState('');

    const placeHolder =
`for (int i = 0; i < 10; i++) {
    print(i)
}`

    const shuffle = (rows: string[]): string[] => {
        let currentIndex = rows.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [rows[currentIndex], rows[randomIndex]] = [
                rows[randomIndex], rows[currentIndex]
            ];
        }

        return rows;
    }

    const handleShuffle = async () => {
        const rows = code.split('\n');

        try {
            const docRef = await addDoc(collection(firestore, 'parsonItems'), {
                rows: rows
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }


    return (
        <div>
            <textarea
                rows={10}
                cols={50}
                value={code}
                onChange={event => setCode(event.target.value)}
                placeholder={placeHolder}
            /><br />
            <button onClick={handleShuffle}>Shuffle</button>
        </div>
    )
}

export default Input;