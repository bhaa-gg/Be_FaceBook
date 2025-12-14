"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connection_1 = require("./DB/Connection");
const attendance_controller_1 = require("./Modules/Attendance/attendance.controller");
const sections_controller_1 = require("./Modules/Sections/sections.controller");
const stundent_controller_1 = require("./Modules/Stundent/stundent.controller");
const auth_controller_1 = require("./Modules/Auth/auth.controller");
const dotenv_1 = require("dotenv");
const instructor_controller_1 = require("./Modules/Instructor/instructor.controller");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 4000;
(0, Connection_1.dbConnection)();
app.use(express_1.default.json());
app.use('/attendance', attendance_controller_1.AttendanceRouter);
app.use('/section', sections_controller_1.SectionRouter);
app.use('/students', stundent_controller_1.StudentRouter);
app.use('/auth', auth_controller_1.AuthRouter);
app.use('/instructors', instructor_controller_1.InstructorRouter);
let sensorState = false;
app.post('/runSensor', (req, res) => {
    sensorState = req.body.sensorState;
    return res.json({ status: 'ok' });
});
app.get('/sensorState', (req, res) => {
    return res.json({ sensorState });
});
app.get('/', (req, res) => res.send('Hello World!'));
app.use((req, res) => res.status(404).json({
    message: 'Page Not Found',
}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
