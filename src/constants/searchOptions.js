// Constants related to dog search functionality

export const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';


export const DOGS_PER_PAGE = 24;

// Sort field options
export const SORT_FIELDS = [
  { id: 'breed', label: 'Breed' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' }
];

// Sort order options
export const SORT_ORDERS = [
  { 
    id: 'asc', 
    label: 'Ascending', 
    display: (field) => field === 'age' ? '0 → 9' : 'A → Z' 
  },
  { 
    id: 'desc', 
    label: 'Descending', 
    display: (field) => field === 'age' ? '9 → 0' : 'Z → A' 
  }
];