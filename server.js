import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import CaptchaService from './captchaService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const captchaService = new CaptchaService();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'CAPTCHA Token Generator API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'GET /status': 'Service status',
      'GET /token': 'Get a CAPTCHA token',
      'POST /start': 'Start token generation',
      'POST /stop': 'Stop token generation',
      'POST /generate': 'Generate a single token manually'
    },
    captchaPageUrl: process.env.CAPTCHA_PAGE_URL || 'https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php'
  });
});

app.get('/status', (req, res) => {
  const status = captchaService.getStatus();
  res.json({
    success: true,
    status,
    timestamp: new Date().toISOString()
  });
});

app.get('/token', (req, res) => {
  try {
    const token = captchaService.getToken();

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'No tokens available',
        tokenCount: captchaService.getTokenCount()
      });
    }

    res.json({
      success: true,
      token: token.token,
      id: token.id,
      timestamp: token.timestamp,
      expiresAt: token.expiresAt,
      remainingTokens: captchaService.getTokenCount()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving token',
      error: error.message
    });
  }
});

app.post('/start', async (req, res) => {
  try {
    if (!captchaService.getStatus().browserConnected) {
      const initialized = await captchaService.initialize();
      if (!initialized) {
        return res.status(500).json({
          success: false,
          message: 'Failed to initialize browser connection'
        });
      }
    }

    await captchaService.startContinuousGeneration();

    res.json({
      success: true,
      message: 'Token generation started',
      status: captchaService.getStatus()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start token generation',
      error: error.message
    });
  }
});

app.post('/stop', async (req, res) => {
  try {
    await captchaService.stop();

    res.json({
      success: true,
      message: 'Token generation stopped'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error stopping service',
      error: error.message
    });
  }
});


app.post('/generate', async (req, res) => {
  try {
    if (!captchaService.getStatus().browserConnected) {
      const initialized = await captchaService.initialize();
      if (!initialized) {
        return res.status(500).json({
          success: false,
          message: 'Failed to initialize browser connection'
        });
      }
    }

    const token = await captchaService.generateToken();

    if (!token) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate token'
      });
    }

    res.json({
      success: true,
      message: 'Token generated successfully',
      token: token.token,
      id: token.id,
      timestamp: token.timestamp,
      expiresAt: token.expiresAt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating token',
      error: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

captchaService.on('tokenGenerated', (token) => {
  console.log(`🎊 New token available! ID: ${token.id}`);
});

captchaService.on('tokenError', (error) => {
  console.error('🚨 Token generation error:', error.message);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Gracefully shutting down...');
  await captchaService.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Gracefully shutting down...');
  await captchaService.stop();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 CAPTCHA Token Generator API running on port ${PORT}`);
  console.log(`📋 API Documentation: http://localhost:${PORT}`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);

  setTimeout(async () => {
    console.log('🔄 Auto-starting CAPTCHA generation...');
    try {
      const initialized = await captchaService.initialize();
      if (initialized) {
        await captchaService.startContinuousGeneration();
        console.log('✅ Auto-start completed successfully');
      } else {
        console.log('❌ Auto-start failed - browser initialization error');
      }
    } catch (error) {
      console.error('❌ Auto-start failed:', error.message);
    }
  }, 2000);
});