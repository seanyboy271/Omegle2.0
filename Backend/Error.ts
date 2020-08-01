export default class NotFoundError extends Error {
    date: Date;
    status: number;
    constructor(message:string, ...params: any) {
        super(...params)

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError)
        }

        this.status = 404
        this.name='NotFoundError';
        this.message = message
        this.date = new Date();
    }


}