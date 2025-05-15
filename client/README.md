# Rick & Morty Explorer

A responsive React application showcasing character, location, and episode information from the Rick & Morty public REST API. Browse, search, filter, and navigate detailed profiles seamlessly.

---

## 🛠️ Tech Stack

- **React.js** for UI
- **React Router DOM** for client-side routing
- **Axios** for HTTP requests
- **React Bootstrap** for styling and layout
- **Redux Toolkit** + **React-Redux** for state management

---

## 🚀 Features

1. **Characters**
   - Grid display of character cards with image, name, status, and species
   - Search by name
   - Server-side filtering: status, gender, species, type
   - Client-side filtering: location and episode
   - Pagination (“Load More”) for infinite browsing
   - Individual **Character Profile** pages with:
     - Portrait and key details (status, species, gender, type)
     - Origin & current location details (dimension & resident count)
     - List of episode names the character appears in

2. **Locations** (Optional)
   - Grid display of location cards (name, type, dimension, resident count)
   - Search by location name
   - Pagination
   - Detailed **Location** pages listing resident characters with portraits and links to their profiles

3. **Episodes** (Optional)
   - Grid display of episode cards (name, air date, episode code)
   - Search by episode name
   - Pagination
   - Detailed **Episode** pages listing characters featured in the episode

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Azar-Ahmed/rick-morty-explorer.git
   cd rick-morty-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🧪 Scripts & Tooling

- **`npm start`**: Start the development server
- **`npm run build`**: Create a production build
- **`npm test`**: Run test suite
- **`npm run lint`**: Lint source files with ESLint

> **Note:** Tests and linting are required for code quality and maintainability.

---

## 📁 Project Structure

```
rick-morty-explorer/
├── public/             # Static assets & index.html
├── src/
│   ├── api/            # Axios instance & API functions
│   ├── components/     # Reusable UI components (cards, loader, navbar)
│   ├── features/       # Redux slices & feature-specific pages
│   │   ├── characters/
│   │   ├── locations/
│   │   └── episodes/
│   ├── store/          # Redux store configuration
│   ├── App.js          # Routes and layout
│   └── index.js        # Entry point (Redux & Router providers)
├── .eslintrc.js        # ESLint configuration
├── jest.config.js      # Jest test configuration
├── package.json        # Dependencies & scripts
└── README.md           # Project overview
```

---

## 🎯 Future Improvements

- Implement infinite scrolling for seamless content loading
- Add unit & integration tests for components and Redux slices
- Introduce theming support (light/dark mode)
- Accessibility audits and enhancements
- Caching API responses to reduce network requests

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
