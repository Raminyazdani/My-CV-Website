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

## Git Commit Template Format Breakdown

When committing changes, it's essential to include a detailed and structured commit message. Here is the breakdown of the template format we use:

### `AUTHOR`
- **Description**: The name of the developer who made the changes.
- **Purpose**: Useful in teams to quickly identify who to contact about specific changes.

### `PROJECT`
- **Description**: The name or identifier of the project.
- **Purpose**: Especially helpful if you work across multiple projects or repositories.

### `DATETIME`
- **Description**: The date and time when the commit was made.
- **Note**: Including this in the commit message can sometimes help with context. However, since Git already tracks this data for every commit, this part is typically redundant unless you have specific reasons for including it (like time zone context).

### `BRANCH_NAME`
- **Description**: The branch where the commit is made.
- **Purpose**: Helps in understanding the development context, such as feature development or bug fixing.

### `TYPE`
- **Description**: Categorizes the commit by its purpose.
- **Common Types**:
  - `Feat`: Feature introduction or improvements.
  - `Fix`: Bug fixes.
  - `Docs`: Documentation updates or improvements.
  - `Style`: Code formatting, fixing missing semi-colons, etc.
  - `Refactor`: Refactoring production code.
  - `Test`: Adding or refactoring tests; no production code change.
  - `Chore`: Updates to grunt tasks, etc.; no production code change.

### `DESC`
- **Description**: A brief description of what the commit does.
- **Purpose**: Should clearly and succinctly convey what was changed and why.

### Commit Message Example
Here's an example of a well-formed commit message using this template:

```
Ramin | MyProject | 2021-07-01 14:30 | feature-login | Feat : Add login functionality

- Implemented basic login page with form validation.
- Added server-side authentication logic.
- Ensures all password data is hashed for security.
- Related issues: #123, #456
```

This structured approach ensures that each commit message is informative and useful for both current team members and future reviewers. It also aids in maintaining a clear and traceable project history.


## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
