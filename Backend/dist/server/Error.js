"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
        this.status = 404;
        this.name = 'NotFoundError';
        this.message = message;
        this.date = new Date();
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=Error.js.map