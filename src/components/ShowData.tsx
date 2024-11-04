"use client"

import{ useEffect, useState } from "react";
import axios from "axios";
import io from 'socket.io-client';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import React from 'react';

let socket;

interface Todo {
    id: number;
    name: string;
    comment: string;
}

export default function ShowData() {
    const [todos, setTodos] = useState<Todo[]>([]);
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

        socket = io();

        socket.on('connect', () => {
            console.log('Connected to Socket.IO');
        });

        socket.on('new todo', (newTodo: Todo) => {
            setTodos(prevTodos => [...prevTodos, newTodo]);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center">
                    Todo List
                </Typography>
                {error && (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                )}
                {todos.length === 0 && !error && (
                    <Typography align="center" color="text.secondary">
                        Loading todos...
                    </Typography>
                )}
                <List>
                    {todos.map((todo: Todo, index) => (
                        <React.Fragment key={todo.id}>
                            {index > 0 && <Divider />}
                            <ListItem>
                                <ListItemText
                                    primary={<Typography color="primary">{todo.name}</Typography>}
                                    secondary={todo.comment}
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}