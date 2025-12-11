"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRouter = void 0;
const express_1 = require("express");
const comon_middleware_1 = require("../../Middlewares/comon.middleware");
const instructor_services_1 = require("./services/instructor.services");
const InstructorRouter = (0, express_1.Router)();
exports.InstructorRouter = InstructorRouter;
InstructorRouter.get('/', (0, comon_middleware_1.errCatcher)(instructor_services_1.getInstructors));
