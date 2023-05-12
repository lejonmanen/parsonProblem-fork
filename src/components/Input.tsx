import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../main";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER_CODE = 
`for (int i = 0; i < 10; i++) {
    print(i)
}`

const Input = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleShuffle = async () => {
        let rows = shuffle(code.split('\n'));

        rows = trimLines(rows);
        
        const id = await writeToFirestore(rows);

        if (id != null) {
            navigate('/'+id);
        }
    }

    return (
        <div>
            <textarea
                rows={10}
                cols={50}
                value={code}
                onChange={event => setCode(event.target.value)}
                placeholder={PLACEHOLDER_CODE}
            /><br />
            <button onClick={handleShuffle}>Shuffle</button>
        </div>
    )
}

const writeToFirestore = async (rows : string[]) : Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(firestore, 'parsonItems'), {
            rows: rows
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
    }
    return null;
}

const trimLines = (rows : string[] ): string[] => {
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].trimStart();
    }

    return rows;
}

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

export default Input;