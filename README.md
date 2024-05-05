# My CV Website

This project is a personal CV website built using React for the frontend and Django for the backend. It showcases my skills, projects, and experiences in a digital format.

## Features

- **React Frontend**: Interactive single-page application that displays professional information.
- **Django Backend**: Manages data storage, API services, and serves the React application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js and npm**: Required for managing frontend dependencies.
- **Python 3.x**: Needed for Django backend development.
- **pip**: Python package installer for handling backend dependencies.

## Installation

Clone the repository and set up the local environment:

```bash
git clone https://github.com/your-username/my-cv-website.git
cd my-cv-website
```

### Setting Up the Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3. Install dependencies and run migrations:
    ```bash
    pip install -r requirements.txt
    python manage.py migrate
    ```

### Setting Up the Frontend

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install npm packages:
    ```bash
    npm install
    ```

## Running the Project

### Backend

Start the Django server:

```bash
python manage.py runserver
```

### Frontend

In a new terminal, navigate to the frontend directory and start the React development server:

```bash
npm start
```

The React application will be accessible at `http://localhost:3000`, and it will proxy API requests to the Django server at `http://localhost:8000`.

## Deployment

Detailed deployment instructions for platforms like Heroku (backend) and Netlify (frontend) will be provided here. Check back for updates or refer to the respective platform documentation for general guidelines.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
