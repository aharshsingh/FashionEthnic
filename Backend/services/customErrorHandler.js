class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExists(message) {
        return new CustomErrorHandler(409, message);
    }
    static notFound(message) {
        return new CustomErrorHandler(401, message);
    }
    static notAuthrorised(message) {
        return new CustomErrorHandler(401, message);
    }
    static serverError(message) {
        return new CustomErrorHandler(401, message);
    }
}

module.exports = CustomErrorHandler;
