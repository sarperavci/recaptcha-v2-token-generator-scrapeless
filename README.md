# CAPTCHA Token Generator Demo

This project demonstrates the power of [scrapeless.com](https://scrapeless.com) by providing a backend service and a modern frontend dashboard for generating and monitoring **Google reCAPTCHA v2** tokens in real time.

## Features

- Uses scrapeless.com browser automation for reliable Google reCAPTCHA v2 solving
- Asynchronous token generation (configurable)
- Live monitoring dashboard with service status, token buffer, and activity
- REST API for token management
- Easy configuration via environment variables

## Screenshot

![](https://github.com/user-attachments/assets/fb8db593-81d5-428a-ae10-11068e59d17c)

## Frontend Dashboard

The live dashboard is implemented in [`index.html`](./public/index.html) and provides real-time monitoring and controls. You can customize the UI or extend its features as needed.

## Getting Started

### Prerequisites

- Node.js 18+
- A [scrapeless.com](https://scrapeless.com) API token

### Installation

```sh
npm install
```

### Configuration

Create a `.env` file in the `enw` directory with the following variables:

```
SCRAPELESS_TOKEN=your_scrapeless_token
ENABLE_ASYNC_GENERATION=true
MAX_CONCURRENT_GENERATIONS=3
ASYNC_GENERATION_BATCH_SIZE=2
MAX_TOKENS=10
GENERATION_INTERVAL=30000
PORT=3000
```

- `SCRAPELESS_TOKEN`: Your scrapeless.com API token
- `ENABLE_ASYNC_GENERATION`: Enable/disable async token generation
- `MAX_CONCURRENT_GENERATIONS`: Max concurrent async generations
- `ASYNC_GENERATION_BATCH_SIZE`: Tokens to generate per async batch
- `MAX_TOKENS`: Max tokens to keep in memory
- `GENERATION_INTERVAL`: Interval (ms) between token generations
- `PORT`: Server port

### Running the Service

```sh
npm start
```

The API and dashboard will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `GET /status`: Service status and live monitoring data
- `GET /token`: Get a CAPTCHA token
- `POST /start`: Start token generation
- `POST /stop`: Stop token generation
- `POST /generate`: Generate a single token manually
