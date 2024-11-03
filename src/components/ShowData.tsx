import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowData() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("/api/getinfo/getdata");
                setTodos(response.data);
            } catch (error: any) {
                setError(error.response?.data?.error || error.message);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div className="p-4 w-[40%] mx-auto bg-white shadow-md rounded-lg">
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {todos.map((todo: { id: number; name: string; comment: string }) => (
                    <li key={todo.id} className="border-b border-gray-200 py-2">
                        <p className="font-semibold">{todo.name}</p>
                        <p className="text-gray-600">{todo.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
