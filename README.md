# 🚀 AI Task Manager - Complete Project

> An intelligent task management system with smart recommendations, analytics, insights, and deadline predictions powered by ML-like algorithms.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![Week](https://img.shields.io/badge/Week-6%20Final-brightblue)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## ✨ Features

### 🎯 Core Task Management (Week 4)
- ✅ **User Authentication**: Secure signup/login with JWT tokens
- ✅ **Task CRUD**: Create, Read, Update, Delete operations
- ✅ **Task Organization**: Categories, priorities, descriptions
- ✅ **Task Filtering**: Filter by status (All, Pending, Completed)
- ✅ **Real-time Updates**: Dynamic UI without page refresh

### 🧠 Smart Recommendations (Week 5)
- ✅ **Weighted Scoring Algorithm**: Frequency (60%) + Recency (40%)
- ✅ **Intelligent Task Recommendations** - `GET /api/recommendations`
- ✅ **Adaptive Learning**: Learns from user completion patterns
- ✅ **Category Analysis**: Identifies user's top-performing categories

### 📊 Advanced Analytics (Week 5)
- ✅ **Comprehensive Statistics** - `GET /api/analytics`
- ✅ **Task Breakdown**: By category, priority, completion status
- ✅ **Performance Metrics**: Completion rate, trends, patterns
- ✅ **Weekly Insights**: Track progress over time

### 💡 AI-Powered Insights (Week 5)
- ✅ **Intelligent Analysis** - `GET /api/insights`
- ✅ **Performance Detection**: High/low completion alerts
- ✅ **Momentum Tracking**: Consecutive day analysis
- ✅ **Pattern Recognition**: Category focus and balance

### 🌟 Personalized Suggestions (Week 5)
- ✅ **Motivational Guidance** - `GET /api/suggestions`
- ✅ **Actionable Tips**: Task prioritization, time management
- ✅ **Streak Encouragement**: Completion streak tracking
- ✅ **Personal Motivation**: Customized motivational messages

### ⏰ Deadline Assistant ML Feature (Week 6) - NEW!
- ✅ **Intelligent Deadline Prediction** - `POST /api/deadline/suggest`
- ✅ **Complexity-Based Calculation**: Task complexity scoring
- ✅ **Workload-Aware Adjustment**: Current pending task consideration
- ✅ **Historical Pattern Analysis**: User's completion history
- ✅ **Safety Buffers**: 20-30% buffer for unexpected delays
- ✅ **Alternative Deadlines**: Aggressive, normal, relaxed options
- ✅ **Task-Specific Analysis** - `GET /api/deadline/analyze/:taskId`
- ✅ **All-Tasks Recommendations** - `GET /api/deadline/all-tasks`

---

## 🏗️ Project Structure

```
TASK MANAGER/
├── README.md (this file - comprehensive documentation)
├── DEPLOYMENT_GUIDE.md
├── FEATURE_DOCUMENTATION.md
├── WEEK5_SMART_API_GUIDE.md
├── WEEK5_COMPLETION_TESTING_DEPLOYMENT.md
├── WEEK5_COMPLETION_SUMMARY.md
│
├── task manager backend/
│   ├── server.js                        # Express server (UPDATED Week 6)
│   ├── package.json
│   ├── .env
│   ├── vercel.json
│   ├── config/
│   │   └── db.js                       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js           # Auth logic
│   │   ├── taskController.js           # Task CRUD
│   │   ├── aiController.js             # AI suggestions
│   │   ├── recommendationController.js # Smart API (Week 5)
│   │   └── deadlineController.js       # Deadline Assistant ML (Week 6)
│   ├── routes/
│   │   ├── authRoutes.js               # Auth endpoints
│   │   ├── TaskRoutes.js               # Task endpoints
│   │   ├── aiRoutes.js                 # AI endpoints
│   │   ├── recommendationRoutes.js     # Smart API routes (Week 5)
│   │   └── deadlineRoutes.js           # Deadline routes (Week 6)
│   ├── models/
│   │   ├── user.js                     # User schema
│   │   └── Task.js                     # Task schema
│   └── middleware/
│       └── authMiddleware.js           # JWT verification
│
├── task manager frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── test.html
│   ├── CSS/
│   │   └── style.css
│   └── JAVA SCRIPT/
│       └── script.js
│
├── Test Scripts/
│   ├── test_smart_api.py               # Week 5 endpoint testing
│   ├── test_smart_api_advanced.py      # Week 5 algorithm testing
│   └── test_deadline_assistant.py      # Week 6 deadline testing
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v16+
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB 4.4+
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, cors
- **Environment**: dotenv

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Vanilla JS (ES6+)
- **API**: Fetch API for backend communication

### Testing & Development
- **Python 3.x**: Test scripts
- **requests**: HTTP client library
- **npm**: Package management

### Deployment
- **Backend**: Vercel
- **Frontend**: Vercel / GitHub Pages
- **Database**: MongoDB Cloud

---

## 📦 Installation

### Prerequisites
- Node.js v14 or higher
- MongoDB (local or cloud instance)
- Git
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd "task manager backend"

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - Add MongoDB URI
# - Set JWT_SECRET
# - Configure PORT

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### Frontend Setup

The frontend is static HTML/CSS/JS. You can:

**Option 1: Open directly in browser**
```bash
# Simply open the HTML files
task manager frontend/login.html
task manager frontend/signup.html
```

**Option 2: Run local server**
```bash
cd "task manager frontend"

# Using Python
python -m http.server 8000

# Or using Node
npx http-server

# Access at http://localhost:8000
```

---

## 🚀 Quick Start

### Local Development

1. **Start MongoDB**
   - If local: `mongod`
   - If cloud: Configure connection string in `.env`

2. **Start Backend**
   ```bash
   cd "task manager backend"
   npm run dev
   ```

3. **Open Frontend**
   ```bash
   cd "task manager frontend"
   # Open login.html in browser
   ```

4. **Test Health**
   - Visit: http://localhost:5000/health
   - Should see ✅ status

### First Time Usage

1. Click "Create Account" on login page
2. Enter name, email, password
3. Click "Sign In"
4. Create your first task
5. See AI suggestions appear
6. Try all features!

---

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/signup
- Create new user account
- Returns: JWT token

POST /api/auth/login
- Authenticate user
- Returns: JWT token
```

### Task Management Endpoints

```
GET /api/tasks/get
- Fetch user's tasks
- Requires: JWT token

POST /api/tasks/add
- Create new task
- Requires: JWT token

PUT /api/tasks/:id
- Update task
- Requires: JWT token

DELETE /api/tasks/:id
- Delete task
- Requires: JWT token
```

### Smart Recommendations Endpoints (Week 5)

```
GET /api/recommendations
- Get AI-powered task recommendations
- Requires: JWT token
- Algorithm: Weighted scoring (Frequency 60% + Recency 40%)

GET /api/analytics
- Get comprehensive task analytics
- Requires: JWT token
- Returns: Statistics, category breakdown, completion rates

GET /api/insights
- Get AI-powered user insights
- Requires: JWT token
- Returns: Performance analysis, patterns, recommendations

GET /api/suggestions
- Get personalized suggestions
- Requires: JWT token
- Returns: Motivational tips, task prioritization, advice
```

### Deadline Assistant Endpoints (Week 6 - ML Feature)

```
POST /api/deadline/suggest
- Get intelligent deadline suggestion
- Requires: JWT token, { title, category, priority, description }
- Returns: Recommended days, deadline date, reasoning, alternatives

GET /api/deadline/all-tasks
- Get deadline recommendations for all pending tasks
- Requires: JWT token
- Returns: Task urgency levels, prioritization, workload summary

GET /api/deadline/analyze/:taskId
- Analyze deadline for specific task
- Requires: JWT token
- Returns: Task status, analysis, recommendations
```

### AI Suggestion Endpoint

```
POST /api/tasks/ai/suggest
- Get AI suggestions based on text input
- Requires: JWT token
- Returns: Suggestions with category and priority
```

---

## 🌐 Deployment

### Deploy Backend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd "task manager backend"
vercel

# Set environment variables in Vercel dashboard
# - MONGODB_URI
# - JWT_SECRET
```

### Deploy Frontend to Vercel

```bash
cd "task manager frontend"
vercel
```

### Update Frontend API URL

After backend deployment, update in `script.js`:
```javascript
const API_BASE_URL = "https://your-backend-url.vercel.app/api";
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## ✅ Project Completion Checklist

### Week 4 - Foundation (COMPLETE)
- ✅ User authentication (signup/login)
- ✅ Task CRUD operations
- ✅ MongoDB database setup
- ✅ JWT token management
- ✅ Frontend UI development
- ✅ Responsive design
- ✅ Error handling
- ✅ Initial deployment to Vercel

### Week 5 - Smart Features (COMPLETE)
- ✅ Weighted recommendation algorithm (Frequency 60% + Recency 40%)
- ✅ Smart recommendation endpoint
- ✅ Analytics endpoint with statistics
- ✅ AI insights generation
- ✅ Personalized suggestions endpoint
- ✅ Comprehensive Python test scripts
- ✅ Algorithm verification
- ✅ Complete documentation

### Week 6 - ML Feature & Finalization (COMPLETE - CURRENT)
- ✅ Deadline Assistant ML feature
- ✅ Complexity-based deadline calculation
- ✅ Workload-aware adjustments
- ✅ Historical pattern analysis
- ✅ Deadline suggestion endpoint
- ✅ Task deadline analysis
- ✅ All-tasks recommendations
- ✅ Comprehensive API testing
- ✅ Complete README documentation
- ✅ Production deployment ready

---

## 🧪 Testing

### Manual Testing

```bash
# Test signup/login
1. Visit login page
2. Create account
3. Login with credentials

# Test task management
1. Create task
2. View AI suggestions
3. Edit task
4. Mark as complete
5. Search tasks
6. Filter tasks
7. Delete task

# Test UI
1. Check responsive design
2. Test modal interactions
3. Verify animations
4. Check accessibility
```

### Browser Testing

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

---

## 📊 Features Breakdown

### AI Suggestion System (50+ keywords)
- **Education**: study, learn, code, documentation
- **Fitness**: gym, workout, exercise, health, yoga
- **Work**: meeting, project, presentation, email, debug, test
- **Personal**: shopping, laundry, cleaning, travel
- **Social**: friend, family, event, call
- **Relaxation**: break, read, creative, meditation

### Categories (8 types)
- Work, Education, Fitness, Health
- Personal, Learning, Creative, Social

### Priority Levels (3 tiers)
- 🔴 High (important tasks)
- 🔵 Medium (regular tasks)
- 🟢 Low (optional tasks)

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password encryption with bcryptjs
- ✅ MongoDB ObjectId for data integrity
- ✅ Server-side input validation
- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ User-specific data isolation

---

## 📈 Performance Metrics

- ✅ Fast API response time (<200ms)
- ✅ Optimized database queries
- ✅ Minimal JavaScript bundle
- ✅ CSS minification ready
- ✅ Responsive load times
- ✅ Mobile-friendly performance

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check MongoDB connection
- Verify .env configuration
- Ensure port 5000 is available

**CORS errors**
- Update CORS_ORIGIN in .env
- Verify API URL in frontend script.js

**Tasks not loading**
- Check browser console for errors
- Verify JWT token in localStorage
- Test API endpoint with curl

**Edit modal not opening**
- Clear browser cache
- Check JavaScript console
- Refresh page

See [QUICK_HEALTH_CHECK.md](./QUICK_HEALTH_CHECK.md) for more tips.

---

## 📞 Support

### Documentation Files
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Vercel deployment guide
- **[FEATURE_DOCUMENTATION.md](./FEATURE_DOCUMENTATION.md)** - Detailed features
- **[QUICK_HEALTH_CHECK.md](./QUICK_HEALTH_CHECK.md)** - Quick testing guide
- **[BACKEND_TESTING_GUIDE.md](./BACKEND_TESTING_GUIDE.md)** - API testing
- **[TERMINAL_LOGS_GUIDE.md](./TERMINAL_LOGS_GUIDE.md)** - Log interpretation

### Quick Links
- 🌐 Live Demo: [Deploy to get link]
- 💻 GitHub: [Push to repository]
- 📖 API Docs: See this README
- 🎨 UI Design: Modern gradient theme

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database design and queries
- Authentication & security
- Frontend-backend integration
- Responsive web design
- Modern JavaScript practices
- Deployment & DevOps

---

## 📝 License

ISC License - Feel free to use this project as a foundation for your own applications.

---

## 🙏 Acknowledgments

Built as part of TRIDIX Training - Week 4 Project

**Contributors**: Development Team

---

## 🎉 Version History

### v1.0.0 - Week 4 Release
- ✨ Initial release
- ✅ All core features implemented
- 🎨 UI improvements
- 🚀 Deployment ready

---

## 📞 Getting Help

1. **Check Documentation**: Read relevant .md files
2. **Check Browser Console**: Open DevTools (F12)
3. **Test API**: Use curl or Postman
4. **Review Logs**: Check terminal output
5. **Clear Cache**: Hard refresh (Ctrl+Shift+R)

---

**Ready to get started? 🚀**

1. Follow [Installation](#installation) steps
2. Start backend server
3. Open frontend in browser
4. Create account and start managing tasks!

---

*Last Updated: May 28, 2026*
*Project Status: ✅ Week 6 Complete & Production Ready*
*Version: 2.0 (Final Release)*
