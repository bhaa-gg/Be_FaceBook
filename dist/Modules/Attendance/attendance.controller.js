"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRouter = void 0;
const express_1 = require("express");
const comon_middleware_1 = require("../../Middlewares/comon.middleware");
const attendance_services_1 = require("./services/attendance.services");
const AttendanceRouter = (0, express_1.Router)();
exports.AttendanceRouter = AttendanceRouter;
AttendanceRouter.post('/', (0, comon_middleware_1.errCatcher)(attendance_services_1.takeAttendance));
