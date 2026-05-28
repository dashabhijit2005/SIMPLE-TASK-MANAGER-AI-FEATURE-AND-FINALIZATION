# 📋 Task Manager - Feature Documentation

## 🎯 Project Overview

**Task Manager** is an AI-powered web application that helps users organize, prioritize, and manage their daily tasks. It features smart task suggestions, real-time categorization, and a beautiful user interface.

---

## ✨ Key Features

### 1. Authentication System

#### Sign Up
- Create new account with email and password
- Password encryption with bcryptjs
- JWT token generation upon signup
- Input validation

**Usage**:
1. Click "Create Account" link
2. Enter full name, email, password
3. Click "Create Account"
4. Redirected to login page

#### Login
- Email and password verification
- JWT token stored in localStorage
- Session persistence
- Logout functionality

**Usage**:
1. Enter email and password
2. Click "Sign In"
3. Access dashboard

---

### 2. Task Management

#### Create Tasks
- **AI-Powered Suggestions**: 
  - Type keywords like "study", "gym", "meeting"
  - See 5 relevant suggestions instantly
  - Click any suggestion to apply

- **Auto-Categorization**:
  - System automatically assigns category based on task content
  - Categories: Work, Education, Fitness, Health, Personal, Learning, Creative, Social

- **Priority Assignment**:
  - System assigns priority (High, Medium, Low)
  - Visual indicators: 🔴 High, 🔵 Medium, 🟢 Low

- **Add by Pressing Enter**:
  - Type task and press Enter key
  - Or click the "Add" button

**Example Tasks**:
```
- "Study for exam" → Education, High priority
- "Gym workout" → Fitness, High priority
- "Buy groceries" → Personal, Medium priority
- "Code review" → Work, High priority
- "Coffee break" → Personal, Low priority
```

#### Edit Tasks

**Access Edit Modal**:
1. Find the task you want to edit
2. Click the ✏️ (pencil) button
3. Modal opens with all editable fields

**Edit Fields**:
- **Task Title**: Main task name
- **Description**: Additional details (optional)
- **Category**: Choose from dropdown
- **Priority**: Select Low/Medium/High

**Save Changes**:
1. Modify desired fields
2. Click "Save Changes"
3. Task updates in real-time
4. Modal closes automatically

**Cancel Editing**:
- Click "Cancel" button
- Click X button on modal header
- Click outside modal

#### Mark as Complete
- Check the checkbox on any task
- Task gets strikethrough styling
- Moves to completed section if filtered
- Uncheck to reopen task
- Visual feedback with opacity change

#### Delete Tasks
- Click 🗑️ (trash) button
- Confirmation dialog appears
- Confirm deletion
- Task removed from list

---

### 3. Task Organization

#### Filter Tasks
```
- All: Shows all tasks
- ⏳ Pending: Shows incomplete tasks
- ✅ Completed: Shows completed tasks
```

**Usage**:
1. Click filter button
2. View filtered tasks
3. Button highlight shows active filter

#### Sort Tasks
```
- 🔴 By Priority: High → Medium → Low
- 📁 By Category: Alphabetical by category
- 📅 By Date: Newest first
```

#### Search Tasks
- Use search box to find tasks
- Searches in: Title, Category, Description
- Real-time filtering
- Case-insensitive

#### Group by Category
- Tasks automatically grouped by category
- Visual category headers
- Easy navigation between groups

---

### 4. Dashboard Features

#### Welcome Message
- Personalized greeting with user email
- Displayed in sidebar

#### Time-Based Greetings
```
- 🌅 Good Morning! (before 12 PM)
- 🌤️ Good Afternoon! (12 PM - 5 PM)
- 🌆 Good Evening! (5 PM - 9 PM)
- 🌙 Good Night! (after 9 PM)
```

#### Task Statistics
- **Total Tasks**: Count of all tasks
- **Pending Tasks**: Count of incomplete tasks
- **Completed Tasks**: Count of finished tasks
- **Completion Rate**: Percentage of completed tasks
- **Most Productive Category**: Category with most tasks

#### Task Counter
- Real-time count updates
- Shows completion percentage
- Highlights most common category

---

### 5. AI Suggestion System

#### Keywords with Suggestions

**Education & Learning**:
- study → Study for 2 hours, Study chapter 5, Complete assignments
- learn → Learn new topic, Take online course, Watch tutorial
- code → Write code, Fix bugs, Code review

**Fitness & Health**:
- gym → Gym session - 1 hour, Cardio workout, Strength training
- workout → Home workout - 30 mins, Morning run, Weight training
- health → Doctor appointment, Health checkup, Medical test

**Work & Professional**:
- meeting → Team meeting - 30 mins, Client call, Standup meeting
- project → Work on project, Update project status, Project planning
- email → Send important emails, Reply to emails, Check inbox

**Personal & Social**:
- shopping → Grocery shopping, Buy groceries, Shop for clothes
- friend → Call friend, Meet friend, Friend hangout
- event → Plan event, Organize event, Attend event

**Relaxation**:
- break → Coffee break - 15 mins, Lunch break - 1 hour, Short break
- read → Read book chapter, Read article, Reading time - 30 mins

**And many more...** ~50+ keywords with suggestions

---

## 🎨 User Interface

### Layout
```
┌─────────────────────────────────────────┐
│ Sidebar          │     Main Content     │
│ - Task Manager   │   - Dashboard        │
│ - Welcome User   │   - Task Form        │
│ - Logout         │   - Filters/Sorting  │
│                  │   - Task List        │
└─────────────────────────────────────────┘
```

### Color Scheme
- **Primary**: Blue gradient (#1e3a8a to #9333ea)
- **Accent**: Light blue (#60a5fa)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

### Responsive Design
- Works on desktop, tablet, mobile
- Sidebar hides on mobile
- Touch-friendly buttons
- Optimized spacing

---

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Tokens stored in localStorage
- Automatic logout on token expiration
- Password encryption with bcryptjs

### Data Protection
- All tasks linked to authenticated user
- User-specific task retrieval
- MongoDB ObjectId for data integrity
- Server-side validation

### Input Validation
- Email validation
- Password requirements
- Task title required
- Category/priority validation

---

## 🚀 Performance Features

### Real-time Updates
- Tasks update without page reload
- Instant filter/search results
- Smooth animations

### Database Optimization
- Indexed queries
- Efficient MongoDB queries
- Connection pooling

### Frontend Optimization
- Minimal DOM manipulation
- Event delegation
- Efficient localStorage usage

---

## 📱 Mobile Responsiveness

### Breakpoints
```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Mobile Optimizations
- Single column layout
- Larger touch targets
- Simplified controls
- Optimized spacing

---

## 🔧 API Reference

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-vercel-url.vercel.app/api
```

### Authentication Endpoints

**POST /auth/signup**
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User Created Successfully",
  "token": "eyJhbGc..."
}
```

**POST /auth/login**
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login Successful",
  "token": "eyJhbGc..."
}
```

### Task Endpoints

**POST /tasks/add**
```json
Request:
{
  "title": "Study for exam",
  "description": "Focus on chapters 5-7"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Study for exam",
  "description": "Focus on chapters 5-7",
  "category": "Education",
  "priority": "High",
  "completed": false,
  "user": "507f1f77bcf86cd799439010",
  "createdAt": "2024-05-20T10:30:00Z"
}
```

**GET /tasks/get**
```
Headers:
Authorization: Bearer <token>

Response:
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Study for exam",
    ...
  },
  ...
]
```

**PUT /tasks/:id**
```json
Request:
{
  "title": "New title",
  "completed": true,
  "priority": "Medium"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "New title",
  "completed": true,
  ...
}
```

**DELETE /tasks/:id**
```
Headers:
Authorization: Bearer <token>

Response:
{
  "message": "Task Deleted Successfully"
}
```

---

## 💡 Usage Tips

### Productivity Tips
1. Use AI suggestions for faster task entry
2. Prioritize high-priority tasks first
3. Complete tasks regularly to boost completion rate
4. Use search for quick task lookup
5. Sort by priority to focus on important tasks

### Best Practices
1. Add descriptive task titles
2. Use categories consistently
3. Update task status regularly
4. Delete completed tasks to declutter
5. Review statistics for productivity insights

### Keyboard Shortcuts
- **Enter**: Add task (when in input field)
- **Esc**: Close modal
- **Click outside modal**: Close edit dialog

---

## 🐛 Common Issues & Solutions

### Issue: Task not saving
**Solution**: Check if you're logged in, verify network connection

### Issue: Suggestions not appearing
**Solution**: Make sure to type a keyword, wait 1-2 seconds

### Issue: Modal not opening
**Solution**: Clear browser cache, refresh page

### Issue: Tasks disappearing
**Solution**: Check filter (might be filtered out), verify login status

---

## 📊 Statistics & Metrics

### Tracked Metrics
- Total tasks created
- Completion rate (%)
- Tasks by category
- Tasks by priority
- Most productive category

### Dashboard Display
- Real-time updates
- Color-coded statistics
- Progress bar visualization
- Category breakdown

---

## 🎓 Learning Features

This project demonstrates:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **AI/ML**: Keyword-based categorization
- **RESTful APIs**: Standard HTTP methods
- **Security**: Password encryption, JWT

---

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Calendar view
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Dark mode toggle
- [ ] Export to PDF
- [ ] Voice input
- [ ] Browser notifications
- [ ] Offline support

---

## 📞 Support & Feedback

For questions or suggestions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Test with different browsers
5. Review network requests

---

**Enjoy using Task Manager! 🎉**
