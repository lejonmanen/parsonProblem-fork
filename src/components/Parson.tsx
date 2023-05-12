import { useState } from "react";


interface ParsonProps {
    back: () => void;
}

interface ListItem {
    id: number;
    text: string;
}

const Parson: React.FC<ParsonProps> = ({ back }) => {
    const [draggedItem, setDraggedItem] = useState<ListItem | null>(null);
    const [list, setList] = useState<ListItem[]>(items);

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

    const listElements = list.map((item, index) => (
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
            {item.text}
        </li>
    ))

    return (
        <>
            <ul style={{listStyleType : 'none', textAlign : 'left'}}>
                {listElements}
            </ul>
            <button onClick={back}>Back</button>
        </>
    );
}

const items: ListItem[] = [
    {
      id: 1,
      text: "interface ListItem {",
    },
    {
      id: 2,
      text: "    id: number;",
    },
    {
      id: 3,
      text: "    text: string;",
    },
    {
      id: 4,
      text: "}",
    },
    {
      id: 5,
      text: "",
    },
    {
      id: 6,
      text: "const handleDrop = (event: React.DragEvent<HTMLLIElement>, targetIndex: number) => {",
    },
    {
      id: 7,
      text: "    event.preventDefault();",
    },
    {
      id: 8,
      text: "    const sourceIndex = list.findIndex(item => item.id === Number(event.dataTransfer.getData('text/plain')));",
    },
    {
      id: 9,
      text: "    const updatedList = [...list];",
    },
    {
      id: 10,
      text: "    const [removed] = updatedList.splice(sourceIndex, 1);",
    },
    {
      id: 11,
      text: "    updatedList.splice(targetIndex, 0, removed);",
    },
    {
      id: 12,
      text: "    setList(updatedList);",
    },
    {
      id: 13,
      text: "    setDraggedItem(null);",
    },
    {
      id: 14,
      text: "    //onDragEnd(updatedList);",
    },
    {
      id: 15,
      text: "};",
    },
  ];
  

export default Parson;

