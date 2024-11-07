# OrbDoc Frontend

This project is the frontend component of the OrbDoc application. It is built using React and provides a user interface for interacting with the OrbDoc chatbot and managing saved documents.

## Components

### SearchBox

The `SearchBox` component is the main interface for interacting with the chatbot. It allows users to input queries, view responses, and manage saved documents.

#### State Variables

- `searchTerm`: The current search term entered by the user.
- `messages`: An array of message objects representing the conversation history.
- `isModalOpen`: A boolean indicating whether the saved documents modal is open.
- `documents`: An array of saved documents.
- `currentResponse`: The current partial response from the chatbot.
- `scrollableAreaRef`: A reference to the scrollable area for automatic scrolling.

#### Functions

- `handleSave`: Sends a request to save the second message in the conversation.
- `openModal`: Opens the modal and fetches saved documents from the server.
- `handleSubmit`: Sends the user's query to the chatbot and updates the conversation history with the response.
- `closeModal`: Closes the saved documents modal.

#### JSX Structure

- A container div wrapping the entire component.
- A scrollable area displaying the conversation history.
- An input form for submitting queries.
- A button for saving the second message in the conversation.
- A button for opening the saved documents modal.
- A modal overlay displaying the saved documents when `isModalOpen` is true.

## Styling

The component uses CSS for styling, which is imported from `./SearchBox.css`.

## Usage

To use the `SearchBox` component, import it into your React application and include it in your JSX:

```jsx
import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="App">
      <SearchBox />
    </div>
  );
}

export default App;

API Endpoints
POST /save: Saves a specific message from the conversation.
GET /load_saved: Fetches saved documents from the server.
POST /chatbot: Sends a query to the chatbot and receives a response.
Dependencies
react: JavaScript library for building user interfaces.
react-markdown: Component for rendering Markdown in React.