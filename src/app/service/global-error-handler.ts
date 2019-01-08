import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor() { }
    handleError(error) {
        // Has to implement the functionality
        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        throw error;
    }
}
