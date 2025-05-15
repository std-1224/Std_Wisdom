import admin from 'firebase-admin';
import { format } from 'date-fns';

export function formatFirestoreTimestamp(timestamp: admin.firestore.Timestamp): string {
    // Create a Date object from the seconds value (multiply by 1000 to convert to milliseconds)
    const date = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));

    // Format the date
    return format(date, 'MMMM d, yyyy h:mm a'); // e.g., "September 27, 2024 10:50 AM"
}