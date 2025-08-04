// Storage utility for managing waitlist form data
const STORAGE_KEY = 'pledg_waitlist_entries';

// Get all waitlist entries
export const getWaitlistEntries = () => {
  try {
    const entries = localStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Add a new waitlist entry
export const addWaitlistEntry = (entry) => {
  try {
    const entries = getWaitlistEntries();
    const newEntry = {
      ...entry,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw error;
  }
};

// Get a specific entry by ID
export const getWaitlistEntry = (id) => {
  try {
    const entries = getWaitlistEntries();
    return entries.find(entry => entry.id === id);
  } catch (error) {
    console.error('Error reading entry from localStorage:', error);
    return null;
  }
};

// Update an existing entry
export const updateWaitlistEntry = (id, updates) => {
  try {
    const entries = getWaitlistEntries();
    const index = entries.findIndex(entry => entry.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return entries[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating entry in localStorage:', error);
    throw error;
  }
};

// Delete an entry
export const deleteWaitlistEntry = (id) => {
  try {
    const entries = getWaitlistEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
    return true;
  } catch (error) {
    console.error('Error deleting entry from localStorage:', error);
    return false;
  }
};

// Get entries by status
export const getWaitlistEntriesByStatus = (status) => {
  try {
    const entries = getWaitlistEntries();
    return entries.filter(entry => entry.status === status);
  } catch (error) {
    console.error('Error filtering entries from localStorage:', error);
    return [];
  }
};

// Get entries by interest type
export const getWaitlistEntriesByInterest = (interestType) => {
  try {
    const entries = getWaitlistEntries();
    return entries.filter(entry => entry.interestType === interestType);
  } catch (error) {
    console.error('Error filtering entries by interest from localStorage:', error);
    return [];
  }
};

// Get statistics
export const getWaitlistStats = () => {
  try {
    const entries = getWaitlistEntries();
    const stats = {
      total: entries.length,
      byInterest: {
        borrower: entries.filter(e => e.interestType === 'borrower').length,
        lender: entries.filter(e => e.interestType === 'lender').length,
        both: entries.filter(e => e.interestType === 'both').length,
        exploring: entries.filter(e => e.interestType === 'exploring').length
      },
      byStatus: {
        pending: entries.filter(e => e.status === 'pending').length,
        contacted: entries.filter(e => e.status === 'contacted').length,
        onboarded: entries.filter(e => e.status === 'onboarded').length
      },
      recent: entries.filter(e => {
        const entryDate = new Date(e.submittedAt);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return entryDate > weekAgo;
      }).length
    };
    return stats;
  } catch (error) {
    console.error('Error calculating stats from localStorage:', error);
    return {
      total: 0,
      byInterest: { borrower: 0, lender: 0, both: 0, exploring: 0 },
      byStatus: { pending: 0, contacted: 0, onboarded: 0 },
      recent: 0
    };
  }
};

// Clear all entries (for testing/reset)
export const clearAllWaitlistEntries = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Export data as JSON
export const exportWaitlistData = () => {
  try {
    const entries = getWaitlistEntries();
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pledg_waitlist_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}; 