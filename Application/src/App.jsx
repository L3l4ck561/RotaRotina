import { useState, useEffect } from "react";
import WeeklyAgenda from "./components/weekly/WeeklyAgenda";
import Calendar from "./components/calendar/Calendar";
import "./App.css";

export default function App() {

  const [screen, setScreen] = useState(() => {
    return sessionStorage.getItem("screen") || "calendar";
  });

  useEffect(() => {
    sessionStorage.setItem("screen", screen);
  }, [screen]);


  return (
    <>
      {screen === "calendar" && <Calendar setScreen={setScreen} />}
      {screen === "weekly" && <WeeklyAgenda setScreen={setScreen} />}
    </>
  );
}
