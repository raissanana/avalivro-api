export class AppError extends Error {
    public readonly statusCode: number;
    public readonly title: string;
    public readonly detail: string;

    constructor(statusCode: number, title: string, detail: string) {
        super(detail);
        this.statusCode = statusCode;
        this.title = title;
        this.detail = detail;

        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
