# 📝 React Blog App

A simple blog management application built using **React (with Material UI)** and **Node.js (Express + MongoDB)**.
This project allows users to create, read, and delete blog posts seamlessly with a clean, responsive UI.

---

## 🚀 Features

- ➕ **Add New Posts** — Create new blog posts with title and content fields.  
- 🗑️ **Delete Posts** — Remove existing blog posts from the UI and database.  
- 📋 **List All Posts** — View all posts fetched dynamically from the backend.  
- 💾 **Persistent Storage** — Data is stored in MongoDB via a Node.js backend.  
- 🎨 **Responsive UI** — Built using Material UI (MUI) for modern styling.  
- 🔄 **Auto Refresh** — Updates post list dynamically after adding or deleting posts.  

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React.js, Material UI |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Communication | Axios (HTTP Requests) |

---

## 📁 Project Structure

```
BLOG_WEBSITE/
│
├── client/                      # Frontend (React)
│   ├── public/
│   │   └── index.html           # Main HTML template
│   ├── src/
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # Component styles
│   │   ├── index.js             # React DOM entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # React dependencies & scripts
│   ├── package-lock.json
│   └── .gitignore
│
├── server/                      # Backend (Node.js + Express)
│   ├── server.js                # Main server file
│   ├── package.json             # Server dependencies & scripts
│   ├── package-lock.json
│   └── node_modules/
│
└── .gitignore                   # Root-level ignore file
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/react-blog-app.git
cd react-blog-app
```

### 2️⃣ Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file with the following values:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Then start the server:
```bash
npm start
```

### 3️⃣ Setup the Frontend
```bash
cd ../client
npm install
npm start
```

The app will open in your browser at **http://localhost:5173** (or **3000** if using CRA).

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/posts` | Fetch all blog posts |
| POST | `/posts` | Add a new blog post |
| DELETE | `/posts/:id` | Delete a post by ID |

---

## 💅 Styling Notes

The content area has horizontal scroll enabled for wide content:

```css
.card-content {
  flex-grow: 1;
  padding: 20px;
  max-height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```

Built entirely using Material UI components such as:

```jsx
<AppBar />, <Card />, <Button />, <Typography />
```

---

## 🧠 Future Improvements

- ✏️ Edit Post functionality  
- 🔍 Search and Filter posts  
- 🧾 Pagination for large datasets  
- 🌙 Dark mode support  

---

## 👨‍💻 Author

**Madhusudan**  
*Full Stack Developer*  

🔗 [LinkedIn](https://www.linkedin.com/in/madhu-sudan-0006a429a/) • [GitHub](https://github.com/Madhusudan04337)
