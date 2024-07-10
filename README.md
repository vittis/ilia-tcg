# Pokemon TCG Card Browser

The _Pokémon TCG Card Browser_ is a React-based web application designed for browsing through
Pokémon Trading Card Game (TCG) cards. This project exemplifies best practices in web architecture,
UI, and UX design. See the features sections for more details.

Built using Vite, it leverages the Pokémon TCG API: https://pokemontcg.io/.

## Demo

You can see a live demo of the application at https://ilia-tcg.netlify.app

## Features

- **URL as State Management**: Manages URLs and browser history to enhance user experience and
  simplify code maintenance. Using URL (query params etc) as a state tool simplifies client code and
  serves as a global application state, without the need to utilize many Contexts or other state
  management solutions.
- **Server State Management**: Utilizes React Query for caching, automatic refetching error
  handling, and managing queries with pagination and search params. Again, simplyfing the client
  code.
- **Efficient Search**: Search cards using a debounced input field to improve performance and reduce
  unnecessary API calls.
- **Type safety**: Everything is fully typed, including the server responses.
- **Global HTTP intercept**: Both Axios and React Query have global request and response
  interceptors which allows token attachment and global toast errors.
- **Internationalization**: Localization setup with i18next.
- **Loading and Error States**: Displays loading skeleton indicators and error messages to inform
  users of the current app state.
- **Nested Routing**: Supports nested routes for organized and structured navigation.
- **Dynamic Pagination**: Robust composable pagination component with dynamic pagination for smooth
  browsing.

## Tech Stack

- UI: [React](https://reactjs.org/)
- Routing: [react-router](https://reactrouter.com)
- State Management: [Context API](https://legacy.reactjs.org/docs/context.html) (for dark/light
  theme toggle) and URL state
- Styling: [Tailwindcss](https://tailwindcss.com/) and [Shadcn-ui](https://ui.shadcn.com/) powered
  by [RadixUI](https://www.radix-ui.com/)
- HTTP Client: [Axios](https://github.com/axios/axios) and
  [React Query](https://tanstack.com/query/v3/)
- Unit tests with [Vitest](https://vitest.dev/) and
  [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

## Next improvements

- More unit tests. Due to time constraints, only the shared and a couple of UI components have
  tests. I feel those are enough to demonstrate my unit testing skills.
- Set Up End-to-End Testing: The initial plan was to use Cypress for end-to-end tests, but it wasn't
  possible due to time constraints.
- Add translation strings for everything. The internationalization setup was done for demonstration
  purposes, but not everything has a translation.
- Add proper dark/light toggle. The setup is there with ModeToggle and ThemeProvider but I decided
  to not use them as I didn't have time to adjust all colors for light mode, so there's only dark
  for now.

## Local Setup

1. Clone this repository

2. Install dependencies:

   ```bash
       npm install
   ```

3. **Important**: Create a `.env` file. There's a .env.example to follow:

   ```
   VITE_API_URL=https://api.pokemontcg.io/v2
   VITE_API_KEY=your_key
   ```

4. Run the server:

   ```bash
       npm run dev
   ```

5. Run tests:

   ```bash
       npm run test
   ```
