"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ShowData from "./ShowData";
import io from 'socket.io-client';
import { Button, TextField, Card, CardContent, Typography, AppBar, Toolbar } from '@mui/material';

interface CreateProps {
  username: string;
  onLogout: () => void;
}

export default function Create({ username, onLogout }: CreateProps) {
    const [name, setName] = useState(username);  // Initialize with username prop
    const [comment, setComment] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const socket = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socket.current = io();

        // Cleanup on component unmount
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/create/post", {
                name,
                comment,
            });

            if (res.status === 201) {
                setResponseMessage("Todo added successfully!");
                if (socket.current) {
                    socket.current.emit('new todo', res.data);
                }
                setComment("");
            } else {
                setResponseMessage(`Error: ${res.data.error}`);
            }
        } catch (error: any) {
            setResponseMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom align="center">
                        Add Todo
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Comment"
                            variant="outlined"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add Todo
                        </Button>
                    </form>
                    {responseMessage && (
                        <Typography 
                            color={responseMessage.includes('Error') ? 'error' : 'success'}
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            {responseMessage}
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <ShowData />
        </>
    );
}
