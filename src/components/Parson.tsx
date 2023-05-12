import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../main";
import { doc, getDoc } from "firebase/firestore";


interface ListItem {
    id: number;
    text: string;
}

const Parson = () => {
    const [draggedItem, setDraggedItem] = useState<ListItem | null>(null);
    const [list, setList] = useState<ListItem[]>([]);

    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            if ('parsonId' in params) {
                const rows = await getRows(String(params.parsonId));

                const listItems: ListItem[] = rows.map((row, index) => {
                    return {
                        id: index + 1,
                        text: row,
                    };
                });

                setList(listItems);
            }
        };

        fetchData();
    }, [])

    const handleDragStart = (event: React.DragEvent<HTMLLIElement>, item: ListItem) => {
        setDraggedItem(item);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(item.id));
    };

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLIElement>, targetIndex: number) => {
        event.preventDefault();
        const sourceIndex = list.findIndex(item => item.id === Number(event.dataTransfer.getData('text/plain')));
        const updatedList = [...list];
        const [removed] = updatedList.splice(sourceIndex, 1);
        updatedList.splice(targetIndex, 0, removed);
        setList(updatedList);
        setDraggedItem(null);
    };

    // const listElements = list.map((item, index) => (
    //     <li
    //         key={item.id}
    //         draggable
    //         onDragStart={event => handleDragStart(event, item)}
    //         onDragOver={handleDragOver}
    //         onDrop={event => handleDrop(event, index)}
    //         style={{
    //             opacity: draggedItem && draggedItem.id === item.id ? 0.5 : 1,
    //         }}
    //     >
    //         {item.text}
    //     </li>
    // ))

    const listElements = list.map((item, index) => {
        const lines = item.text.split('\n');
        let indentedCode = '';
    
        for (let i = 0; i < lines.length; i++) {
            if (i > 0 && lines[i - 1].trim().endsWith('{')) {
                indentedCode += '    ';
            }
            indentedCode += lines[i] + '\n';
        }
    
        return (
            <li
                key={item.id}
                draggable
                onDragStart={event => handleDragStart(event, item)}
                onDragOver={handleDragOver}
                onDrop={event => handleDrop(event, index)}
                style={{
                    opacity: draggedItem && draggedItem.id === item.id ? 0.5 : 1,
                }}
            >
                <pre>{indentedCode}</pre>
            </li>
        );
    });
    

    return (
        <>
            <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
                {listElements}
            </ul>
            <button >Back</button>
        </>
    );
}


const getRows = async (id: string): Promise<string[]> => {
    try {

        const docRef = doc(firestore, "parsonItems", id);
        const document = await getDoc(docRef);

        if (document.exists()) {
            const data = document.data();
            const rows: string[] = data.rows;
            return rows;
        } else {
            console.log('Document not found.');
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
    return [];
}


export default Parson;

