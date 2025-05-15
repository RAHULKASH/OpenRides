import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


const app=express();

app.use(cors());
app.use(express.json());
app.use(urlencoded());
app.use(cookieParser());

//routes import
import authRouter from "./Routes/authRoutes.js";
import eventRouter from "./Routes/eventRoutes.js";
// import attendee from "./Routes/verifyAttendeeRoutes.js";
// import organizer from "./Routes/verifyOrganizerRoutes.js";
// import faculty from "./Routes/verifyFacultyRoutes.js";




//routes declaration
app.use("/api/users",authRouter);
app.use("/api/events",eventRouter);
// app.use("/api/attendee",attendee);
// app.use("/api/organizer",organizer);
// app.use("/api/faculty",faculty);


export {app}
