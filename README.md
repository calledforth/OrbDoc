# OrbDoc

OrbDoc is a straightforward application that allows users to search for medical terms, provides simple definitions, and shows related terms. The application also implements basic favorites functionality to enhance the user experience. The focus is on providing a seamless search experience and clear information display.

## Features

- Search for medical terms
- View simple definitions of medical terms
- See related terms
- Add terms to favorites for quick access

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Python
- Flask

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/orbdoc.git
    cd orbdoc
    ```

2. Install the dependencies for the React frontend:

   ```sh
   cd frontend
   npm install
   ```

3. Install the dependencies for the Flask backend:

   ```sh
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the React frontend:

   ```sh
   cd frontend
   npm start
   ```

2. In a new terminal, start the Flask backend:

   ```sh
   cd backend
   flask run
   ```

3. Open your browser and navigate to `http://localhost:5173` to use the application.