import puppeteer from "puppeteer-core";
import { EventEmitter } from 'events';

class CaptchaService extends EventEmitter {
  constructor() {
    super();
    this.browser = null;
    this.isRunning = false;
    this.tokens = [];
    this.maxTokens = parseInt(process.env.MAX_TOKENS) || 10;
    this.generationInterval = parseInt(process.env.GENERATION_INTERVAL) || 30000;
    this.connectionURL = this.buildConnectionURL();
    this.enableAsyncGeneration = process.env.ENABLE_ASYNC_GENERATION === 'true';
    this.maxConcurrentGenerations = parseInt(process.env.MAX_CONCURRENT_GENERATIONS) || 3;
    this.asyncBatchSize = parseInt(process.env.ASYNC_GENERATION_BATCH_SIZE) || 2;
    this.totalTokens = 0;
    this.activeGenerations = 0;
  }

  buildConnectionURL() {
    const query = new URLSearchParams({
      token: process.env.SCRAPELESS_TOKEN,
      proxy_country: "ANY",
      session_recording: true,
      session_ttl: 900,
      session_name: "reCAPTCHA V2 Generator",
    });
    return `wss://browser.scrapeless.com/browser?${query.toString()}`;
  }

  async initialize() {
    try {
      this.browser = await puppeteer.connect({
        browserWSEndpoint: this.connectionURL,
        defaultViewport: null,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async startContinuousGeneration() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.enableAsyncGeneration) {
      this._startAsyncGeneration();
    } else {
      await this.generateToken();
      this.generationTimer = setInterval(async () => {
        if (this.tokens.length < this.maxTokens) await this.generateToken();
      }, this.generationInterval);
    }
  }

  async _startAsyncGeneration() {
    const runBatch = async () => {
      if (!this.isRunning) return;
      const batch = [];
      const toGenerate = Math.min(this.maxTokens - this.tokens.length, this.asyncBatchSize);
      for (let i = 0; i < toGenerate; i++) {
        if (this.tokens.length < this.maxTokens) {
          batch.push(this._generateTokenAsync());
        }
      }
      if (batch.length > 0) await Promise.all(batch);
      if (this.isRunning) {
        this.generationTimer = setTimeout(runBatch, this.generationInterval);
      }
    };
    runBatch();
  }

  async _generateTokenAsync() {
    this.activeGenerations++;
    try {
      await this.generateToken();
    } finally {
      this.activeGenerations--;
    }
  }

  async generateToken() {
    if (!this.browser) return null;
    let page = null;
    try {
      page = await this.browser.newPage();
      const captchaPromise = this.addCaptchaListener(page);
      const url = process.env.CAPTCHA_PAGE_URL || "https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php";
      await page.goto(url, {timeout: 30000, waitUntil: "domcontentloaded"});
      const captchaResult = await this.onCaptchaFinished(captchaPromise);
      const token = {
        id: Date.now(),
        token: captchaResult.token || captchaResult.response,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000).toISOString()
      };
      this.tokens.push(token);
      this.totalTokens++;
      this.emit('tokenGenerated', token);
      return token;
    } catch (error) {
      this.emit('tokenError', error);
      return null;
    } finally {
      if (page) await page.close().catch(() => {});
    }
  }

  async addCaptchaListener(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await page.createCDPSession();
        client.on("Captcha.detected", (msg) => {});
        client.on("Captcha.solveFinished", async (msg) => {
          resolve(msg);
          client.removeAllListeners();
        });
        setTimeout(() => {
          client.removeAllListeners();
          reject(new Error('Captcha solving timeout'));
        }, 60000);
      } catch (error) {
        reject(error);
      }
    });
  }

  async onCaptchaFinished(promise, timeout = 60000) {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Captcha timeout")), timeout)
      )
    ]);
  }

  getToken() {
    this.cleanupExpiredTokens();
    if (this.tokens.length === 0) {
      return null;
    }
    return this.tokens.shift();
  }

  getTokenCount() {
    this.cleanupExpiredTokens();
    return this.tokens.length;
  }

  cleanupExpiredTokens() {
    const now = new Date();
    const initialCount = this.tokens.length;
    this.tokens = this.tokens.filter(token => 
      new Date(token.expiresAt) > now
    );
    if (this.tokens.length < initialCount) {}
  }

  async stop() {
    this.isRunning = false;
    if (this.generationTimer) clearInterval(this.generationTimer);
    if (this.generationTimer) clearTimeout(this.generationTimer);
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    this.tokens = [];
    this.activeGenerations = 0;
  }

  getStatus() {
    const now = Date.now();
    const tokens = this.tokens.map(t => ({
      id: t.id,
      timestamp: t.timestamp,
      expiresAt: t.expiresAt,
      timeRemaining: Math.max(0, Math.floor((new Date(t.expiresAt) - now) / 1000)),
      isUsed: false
    }));
    return {
      isRunning: this.isRunning,
      tokenCount: this.getTokenCount(),
      maxTokens: this.maxTokens,
      generationInterval: this.generationInterval,
      browserConnected: !!this.browser,
      totalTokens: this.totalTokens,
      asyncGeneration: {
        enabled: this.enableAsyncGeneration,
        maxConcurrent: this.maxConcurrentGenerations,
        activeGenerations: this.activeGenerations
      },
      tokens
    };
  }
}

export default CaptchaService;