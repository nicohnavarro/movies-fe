# SF Movie Map 🎬 🗺️

An interactive web application that visualizes movie filming locations in San Francisco. Built with Angular and Google Maps, this application allows users to explore movies filmed across different locations in the city.

## Features

- **Interactive Map**: Displays movie locations across San Francisco using Google Maps
- **Search Functionality**: 
  - Real-time search through movie titles, locations, and neighborhoods
  - Fuzzy search with Fuse.js for better search results
  - Minimum 3 characters required for search
- **Collapsible Sidebar**:
  - List of all movies with their locations
  - Expandable/collapsible for better map viewing
  - Selected movie highlighting
- **Movie Information**:
  - Title and release year
  - Filming location
  - Director information
  - Fun facts (when available)
- **Map Features**:
  - Custom markers for each location
  - Info windows with detailed movie information
  - Automatic centering on selection
  - Different marker colors for selected/unselected locations

## Technical Stack

- **Framework**: Angular (Latest Version)
- **Maps**: Google Maps JavaScript API
- **UI Components**: Angular Material
- **Search**: Fuse.js for fuzzy searching
- **Styling**: SCSS with modern design principles
- **State Management**: Angular Signals

## Project Structure

```
src/
├── app/
│   ├── domains/
│   │   └── locations/
│   │       ├── dynamic-map/
│   │       └── sidebar-search/
│   ├── models/
│   │   └── movie.model.ts
│   ├── services/
│   │   └── movie.service.ts
│   └── shared/
│       ├── navbar/
│       └── footer/
```

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Add your Google Maps API key in `src/index.html`

4. Run the development server
```bash
ng serve
```

5. Open `http://localhost:4200` in your browser

## Features in Detail

### Map Component
- Responsive Google Maps integration
- Custom marker implementation
- Interactive info windows
- Smooth animations and transitions

### Search Component
- Real-time search functionality
- Debounced input handling
- Fuzzy search implementation
- Responsive design

### Movie Data
- Comprehensive movie information
- Location coordinates
- Production details
- Historical information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Built by Nicolas Navarro 🇦🇷
- Movie data sourced from SF City data
