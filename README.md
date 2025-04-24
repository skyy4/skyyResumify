# Resumify

A comprehensive resume builder application that helps users create professional resumes with ease.

## Project Structure

This project consists of:

- **client**: A Next.js frontend application with TypeScript
- **server**: A Node.js backend with Express and MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/skyyResumify.git
   cd skyyResumify
   ```

2. Install dependencies for both client and server
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Start the development servers
   ```bash
   # Start server (from server directory)
   npm run dev

   # Start client (from client directory)
   npm run dev
   ```

## Features

- Interactive resume builder
- Multiple resume templates
- PDF export functionality
- Secure user authentication
- Profile management

## Technologies Used

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT 