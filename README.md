# Page Pulse

Page Pulse is a web application that analyzes any webpage and generates a quick SEO and performance report.

## Live Demo

Frontend:
https://page-pulse-client.onrender.com

Backend API:
https://page-pulse-api-sezj.onrender.com

## Features

- Analyze any website URL
- Fetch page title
- Fetch meta description
- HTTP status
- Response time
- H1 count
- Images missing alt text
- Approximate word count
- Proper error handling
- Responsive UI

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- Axios
- Cheerio

## Installation

### Clone repository

```bash
git clone https://github.com/raochanchal1366/page-pulse.git
```

### Install frontend

```bash
cd client
npm install
npm run dev
```

### Install backend

```bash
cd server
npm install
npm start
```

## API Endpoint

POST

```
/api/audit
```

Request

```json
{
  "url":"https://github.com"
}
```

Response

```json
{
  "title":"",
  "metaDescription":"",
  "status":200,
  "responseTimeMs":450,
  "h1Count":2,
  "imagesMissingAlt":5,
  "wordCount":1400
}
```

## Project Structure

```
page-pulse
│
├── client
├── server
├── README.md
```

## Design Decisions

- Used React components for better code organization.
- Backend performs all webpage parsing using Cheerio.
- Error handling is implemented for invalid URLs and failed requests.

## AI Usage

I used ChatGPT and Claude as development assistants during this project. They helped me understand implementation approaches, debug issues, improve code structure, refine the UI, and write documentation.

After using their suggestions, I manually integrated the code, reviewed the implementation, tested all features locally, fixed deployment issues, wrote and ran parser tests, and made project-specific improvements before deployment. I made sure I understood every part of the final solution.

## Future Improvements

- Lighthouse integration
- Performance score
- Open Graph analysis
- Keyword density
- Export report as PDF

## Author

Chanchal Rao

Built for Digital Heroes Training Task.