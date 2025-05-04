# Perfect Dog - Find Your Furry Friend

## 🐾 Live Demo

[Perfect Dog - Find Your Perfect Match](https://perfect-dog.vercel.app/)

## 📝 Overview

Perfect Dog is a web application designed to help dog lovers search through a database of shelter dogs and find their perfect match. This project was built for Fetch's frontend take-home challenge, leveraging their dog adoption API.

## ✨ Features

### User Authentication
- Clean and intuitive login page
- User authentication with name and email
- Secure credential handling with HttpOnly cookies

### Dog Search Page
- **Advanced Filtering Options**:
  - Filter by breed with multi-select dropdown
  - Age range selection with interactive sliders
  - Location-based filtering with zip code search
  - Setup dog age limit

### Search Results
- Paginated results for better performance and user experience
- Sortable results (alphabetically by breed, name, or age)
- Toggle between ascending and descending sort order
- Clear visual presentation of all dog attributes

### Favorites System
- Add dogs to favorites with a single click
- Favorites persist between search sessions
- Visual indicator of favorited dogs
- Remove dogs from favorites
- View all favorites in a dedicated section

### Dog Matching
- Generate a match based on favorited dogs
- Celebratory match presentation
- Option to start a new search after matching

### Responsive UI
- Mobile-friendly design
- Adaptive layout for various screen sizes
- Accessible to all users

## 🛠️ Technology Stack

- **Frontend Framework**: React with JavaScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS, Styled Components
- **API Communication**: Fetch API with credentials
- **Deployment**: Vercel

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14.x or higher)
- npm

### Local Development

1. Clone the repository
```bash
git clone https://github.com/your-username/perfect-dog.git
cd perfect-dog
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run build
npm start

```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
PerfectDog/
├── public/                 # Static assets
├── src/
│   ├── app/
│       ├── home/           # home page
│       ├── favoriteList/   # favoriteList page
│   ├── components/         # Reusable UI components
│       ├── common/
│       ├── dogs/
│       ├── favorites/
│       ├── filters/
│   ├── constants/          # Constant values for searching field
│   ├── hooks/              # Customerize hooks
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## 🔍 API Integration

This project integrates with the Fetch dog adoption API, which provides endpoints for:

- User authentication
- Dog breed listings
- Dog searching with various filters
- Dog matching algorithm

All API calls include credentials to maintain the authentication session.
