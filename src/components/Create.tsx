"use client"
import { useState } from "react";
import axios from "axios";
import ShowData from "./ShowData";

export default function Create() {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/create/post", {
                name,
                comment,
            });

            if (res.status === 201) {
                setResponseMessage("Todo added successfully!");
                // Clear the form fields after successful submission
                setName("");
                setComment("");
            } else {
                setResponseMessage(`Error: ${res.data.error}`);
            }
        } catch (error: any) {
            setResponseMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="p-6 w-[50%] mx-auto bg-gray-100 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-gray-800 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border-gray-400 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-800 font-semibold">Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full border-gray-400 rounded-md shadow-sm p-2"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md shadow hover:bg-blue-700 transition duration-200"
                >
                    Add Todo
                </button>
            </form>
            {responseMessage && <p className="mt-4 text-center text-red-500">{responseMessage}</p>}
        </div>
            <ShowData/>
        </div>
    );
}
