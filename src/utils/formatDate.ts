/**
 * Utility functions for consistent date formatting across the application
 */

/**
 * Formats a date string for display in cards (e.g., "Sep 15, 2024")
 * Uses UTC to ensure consistency with grouping
 */
export function formatCardDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Invalid Date';
    }

    // Use UTC to match grouping logic
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats a date string for display in group headers (e.g., "Aug 12, 2025")
 * Uses UTC to ensure consistency with grouping
 */
export function formatGroupDate(dateString: string): string {
  try {
    // Ensure we're working with a proper date
    const date = dateString.includes('T') 
      ? new Date(dateString) 
      : new Date(dateString + 'T00:00:00Z'); // Add Z for UTC
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Invalid Date';
    }

    // Use UTC to match grouping logic
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  } catch (error) {
    console.error('Error formatting group date:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats a date for detailed views with time (e.g., "Sep 15, 2024 at 2:30 PM")
 */
export function formatDetailDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Invalid Date';
    }

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting detail date:', error);
    return 'Invalid Date';
  }
}