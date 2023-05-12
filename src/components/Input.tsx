import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../main";
import { useNavigate } from "react-router-dom";


const Input = () => {
    const [code, setCode] = useState('');

    const placeHolder =
`for (int i = 0; i < 10; i++) {
    print(i)
}`

    const navigate = useNavigate();

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
        const rows = shuffle(code.split('\n'));

        try {
            const docRef = await addDoc(collection(firestore, 'parsonItems'), {
                rows: rows
            });
            navigate('/'+docRef.id);
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