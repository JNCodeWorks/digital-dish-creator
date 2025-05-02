
# Recipe Application

A beautiful, responsive recipe application built with React, React Router, and Tailwind CSS. This application allows users to browse recipes, search by title or ingredients, and filter by cuisine, tags, and preparation time.

## Features

- Browse a collection of delicious recipes
- Search recipes by title or ingredients
- Filter recipes by cuisine, tags, and preparation time
- View detailed recipe information
- Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd recipe-application
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
/src
  /components
    RecipeCard.tsx       # Card component for displaying recipe previews
    RecipeDetail.tsx     # Component for displaying full recipe details
    SearchBar.tsx        # Search input component
    FilterPanel.tsx      # Component for filtering recipes
    Header.tsx           # Header component for navigation
  /data
    recipes.json         # Recipe data
  /pages
    Index.tsx            # Home page component
    RecipeDetail.tsx     # Recipe detail page component
    NotFound.tsx         # 404 page component
  /types
    recipe.ts            # TypeScript types for recipes
  App.tsx                # Main application component
  index.css              # Global styles
  main.tsx               # Application entry point
```

## Adding New Recipes

To add new recipes to the application, edit the `src/data/recipes.json` file. Each recipe object should have the following structure:

```json
{
  "id": "unique-recipe-id",
  "title": "Recipe Title",
  "image": "image-url",
  "ingredients": [
    "Ingredient 1",
    "Ingredient 2"
  ],
  "steps": [
    "Step 1",
    "Step 2"
  ],
  "cuisine": "Cuisine Type",
  "tags": [
    "Tag1",
    "Tag2"
  ],
  "prepTime": 30
}
```

## Adding New Filters

To add new filter types:

1. Update the `FilterPanel.tsx` component to include the new filter type
2. Add the corresponding state variables in the `Index.tsx` component
3. Update the filtering logic in the `useMemo` hook in the `Index.tsx` component

## License

This project is licensed under the MIT License.
