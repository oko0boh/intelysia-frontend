# API Integration Guide

## 🔧 Fixed Issues

### ✅ API Endpoint Configuration
- **Problem**: Conflicting API base URLs between `useBackendIntegration.ts` (port 8000) and `businessApi.ts` (port 4000)
- **Solution**: Unified configuration using environment variables and centralized config

### ✅ Environment Variable Setup  
- **Problem**: Missing `.env` file for configuration
- **Solution**: Created `.env` and `.env.example` with proper API configuration

### ✅ Type System Standardization
- **Problem**: Different Business interface definitions across files
- **Solution**: Created unified type system with backward compatibility

## 📁 New File Structure

```
src/
├── config/
│   └── api.ts              # Centralized API configuration
├── types/
│   └── business.ts         # Unified business type definitions
├── services/
│   ├── businessApi.ts      # Updated with unified config
│   └── apiHealth.ts        # API health checking service
└── hooks/
    └── useBackendIntegration.ts  # Updated with new API service
```

## ⚙️ Configuration

### Environment Variables
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_API_TIMEOUT=30000

# Google Analytics
REACT_APP_GA_TRACKING_ID=your_ga_tracking_id_here

# Site Configuration  
REACT_APP_SITE_URL=https://your-domain.com
REACT_APP_SITE_NAME=Intelysia

# Development
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG_MODE=true

# Fallback Data
REACT_APP_USE_FALLBACK_DATA=true
REACT_APP_FALLBACK_DATA_PATH=/data/phase3_output.csv
```

### API Endpoints
All endpoints are now centrally managed in `src/config/api.ts`:

- `GET /businesses/all` - Get all businesses (paginated)
- `GET /businesses/categories` - Get all categories
- `GET /businesses/cities` - Get all cities  
- `GET /businesses/:id` - Get business by ID
- `GET /businesses/by-category/:category` - Get businesses by category
- `GET /businesses/by-location/:city` - Get businesses by location
- `GET /businesses/search` - Search businesses (category + location)
- `GET /businesses/search/name` - Search businesses by name
- `GET /businesses/stats` - Get business statistics

## 🧪 Testing API Integration

### Quick Test
```bash
# Test API connectivity
node test-api-integration.js
```

### Expected Backend Response Format
```json
{
  "businesses": [
    {
      "id": 1,
      "name": "Business Name",
      "description": "Business description",
      "city": "Cotonou",
      "latitude": 6.3703,
      "longitude": 2.3912,
      "phone": "+229...",
      "rating": 4.5,
      "isVerified": true,
      "categories": [
        {
          "category": "restaurant",
          "isPrimary": true
        }
      ]
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 50
}
```

## 🔄 Backward Compatibility

The updated system maintains backward compatibility by:

1. **Type Conversion**: New Business types are converted to legacy format
2. **API Wrapping**: Old hook interface remains unchanged
3. **Fallback System**: Automatically falls back to CSV data if API fails

## 🚨 Error Handling

### Automatic Fallback
- API connection failures → CSV fallback data
- Timeout errors → Graceful degradation
- Invalid responses → Empty arrays with error logging

### Debug Mode
Set `REACT_APP_DEBUG_MODE=true` to enable:
- API call logging
- Response time tracking  
- Error detailed logging
- Health check results

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 🔍 Troubleshooting

### API Server Not Running
```bash
# Test API manually
curl http://localhost:4000/api/businesses/categories

# Expected: JSON response with categories array
# If connection refused: Backend server is not running
```

### Environment Variables Not Working
```bash
# Check if .env is loaded
console.log(process.env.REACT_APP_API_URL)

# Restart development server after .env changes
```

### CORS Issues
If you see CORS errors, ensure your backend allows requests from:
- `http://localhost:3000` (development)
- Your production domain

## 📊 Health Monitoring

The application now includes API health monitoring:

```typescript
import { apiHealthService } from './services/apiHealth';

// Check API health
const health = await apiHealthService.checkApiHealth();

// Test all endpoints  
const results = await apiHealthService.testBasicEndpoints();
```

## 🎯 Next Steps

1. **Start Backend Server**: Ensure the API server runs on port 4000
2. **Test Integration**: Run the test script to verify connectivity
3. **Update Endpoints**: Modify API endpoints if your backend uses different URLs
4. **Add Authentication**: Extend the API client for user authentication
5. **Error Boundaries**: Add React error boundaries for better UX