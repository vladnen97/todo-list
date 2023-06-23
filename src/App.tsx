import React, { useEffect } from "react";
import "./App.css";
import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import { ErrorSnackBar } from "./components/ErrorSnackBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { TodolistsList } from "./components/TodolistsList";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { initializeAppTC } from "./store/app-reducer";
import { logoutTC } from "./store/auth-reducer";

export function App() {
    const status = useAppSelector((state) => state.app.status);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    return !isInitialized ? (
        <div style={{ position: "fixed", top: "40%", textAlign: "center", width: "100%" }}>
            <CircularProgress />
        </div>
    ) : (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoList
                    </Typography>
                    {isLoggedIn && (
                        <Button
                            color="inherit"
                            onClick={() => {
                                dispatch(logoutTC());
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
                <div style={{ height: "4px" }}>{status === "loading" && <LinearProgress />}</div>
            </AppBar>

            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList />} />
                    <Route path={"/login"} element={<Login />} />

                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path={"*"} element={<Navigate to={"/404"} />} />
                </Routes>
            </Container>

            <ErrorSnackBar />
        </div>
    );
}
