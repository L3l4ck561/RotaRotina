import { useState, useEffect } from "react";

export default function useScreen() {
    const [screen, setScreen] = useState(() => {
        return sessionStorage.getItem("screen") || "calendar";
    });

    useEffect(() => {
        sessionStorage.setItem("screen", screen);
    }, [screen]);

    const toggleScreen = () => {
        setScreen(prev =>
            prev === "calendar" ? "weekly" : "calendar"
        );
    };

    return { screen, setScreen, toggleScreen };
}