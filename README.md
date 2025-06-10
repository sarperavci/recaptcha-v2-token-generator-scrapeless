# CAPTCHA Token Generator Demo

This project demonstrates the power of [scrapeless.com](https://scrapeless.com) by providing a backend service and a modern frontend dashboard for generating and monitoring **Google reCAPTCHA v2** tokens in real time.

## Project Overview

This demo showcases a modern, scalable solution for generating Google reCAPTCHA v2 tokens using scrapeless scraping browser API. It includes both a lightweight backend API and an intuitive frontend dashboard for real-time monitoring and management.

Whether you're a developer looking to integrate automated CAPTCHA token generation, or a QA team needing bulk tokens for testing, this tool gives you a simple, customizable foundation to build upon.

## Market Analysis

- $3.52B Web scraping market by 2037 (13.2% CAGR)
- $187B No-code development market by 2030
- 84% of businesses adopting no-code solutions
- 71% of companies struggle with technical complexity
- 98.5% Scrapeless success rate vs. 58.1% industry average

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

## Success Stories

### Case Study 1: E-commerce Price Monitoring
**Challenge**: Sarah runs an electronics store and needs to track competitor prices daily
**Solution**: Uses CyberScrapeless + Scrapeless to monitor 50+ competitor websites
**Results**:
- Saves 15 hours/week of manual checking
- Increased profit margins by 12% through dynamic pricing
- Automated alerts when competitors change prices

### Case Study 2: Lead Generation for B2B
**Challenge**: Marketing agency needs qualified leads from industry directories
**Solution**: Scrapes LinkedIn, industry directories, and company websites
**Results**:
- Generated 10,000+ qualified leads per month
- Increased lead quality by 40% through detailed data collection
- Reduced lead generation cost from $15 to $2 per lead

### Case Study 3: Social Media Monitoring
**Challenge**: Brand manager needs to track mentions across multiple platforms
**Solution**: Monitors Twitter, Reddit, review sites, and news outlets
**Results**:
- Tracks 1000+ mentions daily across 50+ platforms
- Real-time alerts for negative sentiment
- Comprehensive brand sentiment analysis

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

## Security & Compliance

### Data Protection
- End-to-end encryption for all API communications
- Zero data retention - your scraped data stays private
- API key rotation with automatic security updates
- No logging of sensitive scraped content
- GDPR & CCPA compliant data handling

### Infrastructure Security
- Enterprise-grade infrastructure with 99.9% uptime SLA
- Automatic failover across multiple data centers
- Real-time monitoring and threat detection
- Regular security audits and vulnerability assessments
- SOC 2 Type II compliance (in progress)

### Proxy Network Security
- 70+ million residential IPs across 195+ countries
- Intelligent IP rotation preventing blacklisting
- Advanced fingerprint masking for maximum anonymity
- High-speed connections with sub-500ms response times
- Mobile and desktop user agent simulation

## Responsible Scraping Guidelines

### Best Practices
- Always respect robots.txt files
- Implement reasonable rate limiting (built into Scrapeless)
- Only scrape publicly available data
- Honor website terms of service
- Use data responsibly and ethically

### Don't Use For
- Scraping copyrighted content without permission
- Collecting personal data without consent
- Bypassing paywalls or access controls
- Any illegal or unethical activities

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

## Support & Contact

- General Questions: market@scrapeless.com
- Bug Reports: GitHub Issues
- Partnerships: market@scrapeless.com
- Enterprise: market@scrapeless.com

© 2024 Scrapeless. Licensed under MIT.
