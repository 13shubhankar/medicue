// app/api/test-gemini/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  console.log('=== GEMINI API TEST STARTED ===');
  
  // Environment debugging
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
  console.log('API Key prefix:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
  console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
  
  try {
    // Test 1: Check API key format
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI_API_KEY environment variable not found',
        debug: {
          allEnvKeys: Object.keys(process.env).filter(key => key.includes('GEMINI')),
          nodeEnv: process.env.NODE_ENV
        }
      });
    }

    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid API key format. Should start with "AIza"',
        debug: {
          keyPrefix: process.env.GEMINI_API_KEY.substring(0, 5),
          keyLength: process.env.GEMINI_API_KEY.length
        }
      });
    }

    // Test 2: Initialize Gemini
    console.log('Initializing Gemini...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 100,
      }
    });

    console.log('Model initialized successfully');

    // Test 3: Simple text generation
    console.log('Testing simple text generation...');
    const prompt = "Respond with exactly: 'Gemini API is working correctly!'";
    
    // Add timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout after 15 seconds')), 15000)
    );
    
    const geminiPromise = model.generateContent(prompt);
    const result = await Promise.race([geminiPromise, timeoutPromise]);
    
    const response = await result.response;
    const text = response.text();
    
    console.log('Response received:', text);

    return NextResponse.json({
      success: true,
      message: 'Gemini API is working!',
      response: text,
      debug: {
        apiKeyPresent: true,
        apiKeyValid: true,
        responseLength: text.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Gemini API Test Error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack?.substring(0, 500)
    });

    // Analyze error type
    let errorType = 'unknown';
    let suggestion = '';

    if (error.message?.includes('API key')) {
      errorType = 'api_key_invalid';
      suggestion = 'Check your API key in Google AI Studio: https://makersuite.google.com/app/apikey';
    } else if (error.message?.includes('quota') || error.message?.includes('billing')) {
      errorType = 'quota_or_billing';
      suggestion = 'Enable billing in Google Cloud Console and check API quotas';
    } else if (error.message?.includes('permission') || error.message?.includes('403')) {
      errorType = 'permissions';
      suggestion = 'Enable Generative Language API in Google Cloud Console';
    } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
      errorType = 'network';
      suggestion = 'Check your internet connection and firewall settings';
    } else if (error.message?.includes('model')) {
      errorType = 'model_error';
      suggestion = 'Try using "gemini-pro" instead of "gemini-1.5-flash"';
    }

    return NextResponse.json({
      success: false,
      error: error.message,
      errorType,
      suggestion,
      debug: {
        apiKeyPresent: !!process.env.GEMINI_API_KEY,
        apiKeyPrefix: process.env.GEMINI_API_KEY?.substring(0, 10),
        errorName: error.name,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}

// Also handle POST for testing
export async function POST() {
  return GET(); // Same logic
}