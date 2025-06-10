# CAPTCHA Token Generator Demo

This project demonstrates the power of [scrapeless.com](https://scrapeless.com) by providing a backend service and a modern frontend dashboard for generating and monitoring **Google reCAPTCHA v2** tokens in real time.

## Project Overview

This demo showcases a modern, scalable solution for generating Google reCAPTCHA v2 tokens using scrapeless scraping browser API. It includes both a lightweight backend API and an intuitive frontend dashboard for real-time monitoring and management.

Whether you're a developer looking to integrate automated CAPTCHA token generation, or a QA team needing bulk tokens for testing, this tool gives you a simple, customizable foundation to build upon.

## Features

- Uses scrapeless.com browser automation for reliable Google reCAPTCHA v2 solving
- Asynchronous token generation (configurable)
- Live monitoring dashboard with service status, token buffer, and activity
- REST API for token management
- Easy configuration via environment variables

## Scrapeless Advantages

| Feature | Before | With Scrapeless |
|---------|--------|----------------|
| Anti-Bot Protection | Limited custom solutions | Enterprise-grade bypassing |
| CAPTCHA Handling | Manual intervention required | Automatic solving |
| Proxy Management | Basic single proxy | Global proxy network with country selection |
| Success Rate | ~60-70% on protected sites | ~95% on even heavily protected sites |
| Resource Usage | Heavy (browser instances) | Light (API calls only) |
| Scalability | Limited by local resources | Unlimited - cloud-based |
| Maintenance | Constant updates needed | Automatic updates |
| Development Time | Complex custom code | Simple API calls |

## Screenshot

![](https://github.com/user-attachments/assets/fb8db593-81d5-428a-ae10-11068e59d17c)

## Frontend Dashboard

The live dashboard is implemented in [`index.html`](./public/index.html) and provides real-time monitoring and controls. You can customize the UI or extend its features as needed.

## Getting Started

### Prerequisites

- Node.js 18+
- A [scrapeless.com](https://scrapeless.com) API token

### Get the Scrapeless API Key

1. Sign up and log in to the Scrapeless Dashboard
2. Click on "Settings" → select "API Key Management" → click "Create API Key" to generate your key

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
CAPTCHA_PAGE_URL=https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php
```

- `SCRAPELESS_TOKEN`: Your scrapeless.com API token
- `ENABLE_ASYNC_GENERATION`: Enable/disable async token generation
- `MAX_CONCURRENT_GENERATIONS`: Max concurrent async generations
- `ASYNC_GENERATION_BATCH_SIZE`: Tokens to generate per async batch
- `MAX_TOKENS`: Max tokens to keep in memory
- `GENERATION_INTERVAL`: Interval (ms) between token generations
- `PORT`: Server port
- `CAPTCHA_PAGE_URL`: The URL of the reCAPTCHA v2 page to solve (default: Google demo page, can be any compatible reCAPTCHA v2 site)

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

## Scrapeless SDK Reference

### Web Unlocker

The Web Unlocker is used to bypass anti-bot protections and access content from protected websites:

```python
from scrapeless import ScrapelessClient

scrapeless = ScrapelessClient(api_key='your-api-key')

result = scrapeless.unlocker(
    actor="unlocker.webunlocker",
    input={
        "url": "https://www.protected-website.com",
        "proxy_country": "ANY",
        "method": "GET",
        "redirect": True,
        "js_render": True
    }
)
```

### CAPTCHA Solver

For sites protected by CAPTCHA, the Scrapeless CAPTCHA Solver automatically handles the verification:

```python
from scrapeless import ScrapelessClient

scrapeless = ScrapelessClient(api_key='your-api-key')

result = scrapeless.solver_captcha(
    actor="captcha.recaptcha",
    input={
        "version": "v2",
        "pageURL": "https://www.example.com",
        "siteKey": "6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-",
        "pageAction": ""
    },
    timeout=10
)
```

### Scraper API

For sites with specific structures, the Scraper API can be used to extract structured data directly:

```python
from scrapeless import ScrapelessClient

scrapeless = ScrapelessClient(api_key='your-api-key')

# E-commerce example - Shopee
result = scrapeless.scraper(
    actor="scraper.shopee",
    input={
        "type": "shopee.product",
        "url": "https://shopee.tw/product-url"
    }
)

# Brazilian business data example
result = scrapeless.scraper(
    actor="scraper.consopt",
    input={
        "taxId": "25032537000164",
    },
    proxy={
        "country": "US",
    }
)
```
