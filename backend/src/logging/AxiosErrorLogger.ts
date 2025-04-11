import { AxiosError } from "axios";

export const logAxiosError = (error: unknown, context: string = "Axios Error") => {
    if (error instanceof AxiosError) {
        console.error(`[${context}] Error Message:`, error.message);

        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error(`[${context}] Response Status:`, error.response.status);
            console.error(`[${context}] Response Data:`, error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error(`[${context}] No Response Received:`, error.request);
        } else {
            // Something happened in setting up the request
            console.error(`[${context}] Request Setup Error:`, error.message);
        }
    } else {
        // Non-Axios error
        console.error(`[${context}] Unknown Error:`, error);
    }
};
