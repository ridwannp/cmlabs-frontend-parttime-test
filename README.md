# 🍲 IngredientLens

IngredientLens is a modern, discovery-first culinary web application that helps you explore recipes and ingredients with a unique "Warm Culinary" aesthetic. Instead of just searching, experience a dynamic, TikTok-style infinite scroll to discover new meals, find random recipes when you're feeling indecisive, and save your favorites to a personal cookbook.

## ✨ Features

- **Appetizing "Warm Culinary" Design**: A custom UI theme utilizing deep wine reds (`#570e1a`), saffron yellows, and warm cream colors designed specifically to stimulate appetite and create an inviting user experience.
- **Cinematic Discovery Mode**: A highly optimized, infinite-scrolling feed of random meals powered by `Framer Motion` and CSS scroll snapping.
- **Smart Ingredient Pantry**: Browse through hundreds of ingredients, search instantly, and find associated recipes.
- **Local Cookbook**: Save your favorite recipes locally (powered by `Zustand`) so you never lose track of what you want to cook.
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Source**: [TheMealDB API](https://www.themealdb.com/api.php)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18.17 or higher) installed on your system.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ingredientlens.git
cd ingredientlens
```

### 2. Install dependencies

You can use `npm`, `yarn`, `pnpm`, or `bun` to install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open the application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

---

## 📁 Project Structure

- `src/app/`: Next.js App Router pages and global CSS.
- `src/components/`: Reusable UI components categorized by feature (e.g., `discover`, `ingredients`, `meals`, `ui`).
- `src/lib/`: Utility functions, including the centralized API layer (`api.js`) for fetching data from TheMealDB.
- `src/store/`: Global state management (`useMealStore.js` for saving recipes).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
