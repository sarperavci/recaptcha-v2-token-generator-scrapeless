# CAPTCHA Token Generator Demo

This project demonstrates the power of [scrapeless.com](https://app.scrapeless.com/passport/login?utm_source=github&utm_campaign=sarperavci) by providing a backend service and a modern frontend dashboard for generating and monitoring **Google reCAPTCHA v2** tokens in real time.

## Project Overview

This demo showcases a modern, scalable solution for generating Google reCAPTCHA v2 tokens using scrapeless scraping browser API. It includes both a lightweight backend API and an intuitive frontend dashboard for real-time monitoring and management.

Whether you're a developer looking to integrate automated CAPTCHA token generation, or a QA team needing bulk tokens for testing, this tool gives you a simple, customizable foundation to build upon.

## Market Analysis

- $3.52B Web scraping market by 2037 (13.2% CAGR)
- $187B No-code development market by 2030
- 84% of businesses adopting no-code solutions
- 71% of companies struggle with technical complexity
- 98.5% Scrapeless success rate vs. 58.1% industry average

### Demand for Automated CAPTCHA Bypass Continues to Rise

As automated testing, web scraping, and robotic process automation become more widespread, the ability to obtain high-quality Google reCAPTCHA v2 tokens at scale has become a critical industry need.

### Limitations of Traditional CAPTCHA Bypass Solutions

Most traditional approaches rely on manual solving services or inefficient proxy setups, which suffer from low success rates and high maintenance costs — making them ill-suited for modern, high-concurrency, large-scale applications.

### Scrapeless.com Offers an Innovative CAPTCHA Solution
Scrapeless.com leverages cloud-based headless browsers combined with intelligent anti-detection technology to provide stable and efficient CAPTCHA bypass capabilities, ensuring smooth operation of automated workflows.

### Broad Applicability Across Industries
The solution serves a wide range of industries, including:
- Automated testing (QA teams)
- Price monitoring
- E-commerce fraud prevention
- Data collection and analysis
- Ad verification

It helps businesses improve efficiency and significantly reduce labor costs.

### Real-Time Monitoring and Flexible Configuration
The platform features built-in real-time dashboards and asynchronous task management, ensuring stable and controllable token supply. It supports customized configurations tailored to various business scenarios.

## Use Cases

### Use Case 1: Automated Testing / QA – Bulk Generation of reCAPTCHA Tokens
**Background**: QA teams need to perform end-to-end testing on systems protected by Google reCAPTCHA, but frequent verification challenges interrupt scripts.
**Solution**: Use this project to bulk-generate Google reCAPTCHA v2 tokens and inject them into testing flows via API, improving efficiency and test continuity.
**Value**:
- Minimize manual intervention for smoother test execution
- Increase coverage in regression and load testing
- Support async bulk generation to meet large-scale testing demands

### Use Case 2: Web Scraping – Bypass CAPTCHA Restrictions
**Background**: A company needs to scrape websites protected by reCAPTCHA (e.g., product data, public records, pricing info).
**Solution**: Integrate this service into the scraping system. Use the API to retrieve valid tokens and inject them into form requests to enable uninterrupted data extraction.
**Value**:
- Prevent scraping failures due to CAPTCHA blocks
- Support global proxies to bypass geo-based restrictions
- Significantly improve success rate (>95%) and efficiency

### Use Case 3: Low-code / No-code Platforms – CAPTCHA Integration
**Background**: No-code platforms require submitting forms to sites protected by Google reCAPTCHA.
**Solution**: Use this tool to generate tokens and invoke the API via built-in HTTP modules, enabling successful submissions without custom CAPTCHA handling.
**Value**:
- Lower technical barriers—no need for complex logic
- Easily integrated with Webhooks and visual workflows
- Real-time monitoring and visual dashboard support

### Use Case 4: SaaS Integration – Improve End-user Conversion
**Background**: A SaaS platform helps clients automate form submissions, but reCAPTCHA interruptions lower the conversion rate.
**Solution**: Integrate this service to provide automatic token generation, reducing CAPTCHA-related submission failures.
**Value**:
- Increase form submission success rates
- Reduce bounce and drop-off rates
- Enable client-specific configuration and deployment

### Use Case 5: CAPTCHA Solving Service – Token API Wrapping
**Background**: Developers want to build a reCAPTCHA token-solving service for end users with a simplified API interface.
**Solution**: Use this project as the backend for a SaaS MVP, adding features like billing and user management to quickly launch a market-ready solution.
**Value**:
- Shorten time-to-market
- Monetize easily via API-as-a-Service
- Real-time status visualization builds transparency and trust

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
- A [scrapeless.com](https://app.scrapeless.com/passport/login?utm_source=github&utm_campaign=sarperavci) API token

### Get the Scrapeless API Key

1. Sign up and log in to the Scrapeless Dashboard
2. Click on "Settings" → select "API Key Management" → click "Create API Key" to generate your key

### Installation

```sh
npm install
```

### Configuration

Create a `.env` file with the following variables:

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

## Why Choose Scrapeless

[![](https://github.com/user-attachments/assets/783ce396-fa8c-4e10-846e-86d0ba0d0144)](https://app.scrapeless.com/passport/login?utm_source=github&utm_campaign=sarperavci)

- **Scraping Browser**: Powerful cloud browser with stealth mode to bypass restrictions. Supports high concurrency, automation, and bulk scraping. Enables Crawl, and Extract.
- **Crawl**: Supports scalable single-page and recursive crawling, with flexible output formats including JSON, Markdown, Metadata, HTML, links, and screenshots. Billed by actual data usage ($1.8/GB), ensuring you pay only for results that matter.
- **Universal Scraping API**: Bypass CAPTCHAs, IP blocks, and dynamic content in real time, ensuring uninterrupted access.
- **Scraping API**: Effortless and highly customizable data extraction with a single API call, providing structured data from any website.
- **Deep SerpApi**: Focused on SERP data scraping — effortlessly extracts real-time information. 1–2 second response time & only $1.5 per 1,000 requests.
- **Proxies**: Use high-quality, rotating proxies to scrape top platforms, with global coverage in 195+ countries.
- **Enterprise-Grade**: Custom solutions for large-scale and complex data needs.
- **Free Trial**: Try before you buy-experience our service firsthand.
- **Pay-Per-Use**: Flexible, cost-effective pricing with no long-term commitments.
- **Easy Integration**: Seamlessly integrate with your existing tools and workflows for hassle-free automation.

## Support & Contact

- General Questions: market@scrapeless.com
- Bug Reports: GitHub Issues
- Partnerships: market@scrapeless.com
- Enterprise: market@scrapeless.com

© 2025 Scrapeless.
