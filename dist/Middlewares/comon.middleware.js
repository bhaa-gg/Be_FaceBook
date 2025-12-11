"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errCatcher = void 0;
const errCatcher = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return res.status(500).json({
                message: 'Something went wrong',
                error: err.message,
            });
        });
    };
};
exports.errCatcher = errCatcher;
