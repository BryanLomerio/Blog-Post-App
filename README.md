# 🎉 Blog-Post-App

A simple and efficient blog post application that allows users to **CREATE**, **VIEW**, and **MANAGE** blog posts. This app is built using a **Node.js** backend with a **MySQL** database and a frontend using **React** and **Tailwind CSS** for a modern, responsive user interface.

---

## 🚀 Tech Stack

### Backend
- 📊 **Node.js**
- 🔧 **Express.js**
- 🌐 **MySQL**
- 🔐 **mysql2**

### Frontend
- 🎨 **JavaScript**
- 🎨 **React**
- 🕊 **Tailwind CSS**

---

## 🔍 Features

- 🆕 **Create Blog Posts**: Allows users to create new blog posts via the API.
- 🗃️ **View Blog Posts**: Fetch and display blog posts from the database.
- ✏️ **Update/Delete Blog Posts**: Modify or remove posts as needed.

---

## 🔒 Commit Message Convention

This project follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) style for clear and consistent versioning. Commit messages are structured to include the type of change, ensuring easy tracking of features, fixes, and updates.

---

## 🏦 Database Structure

The application uses a **MySQL** database named `blog_app` with tables to store blog post data, user accounts, and gallery images.

### **Database Name**: `blog_app`
### **Tables**:
- `blog_posts`
- `users`
- `gallery_images`

---

## 🗃️ MySQL Schema Design


### Create Database:
```sql
CREATE DATABASE blog_app; 

Blog Post Table:
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  remark TINYINT(1) DEFAULT 1 NOT NULL 
);

User Accounts Table:

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Gallery Images Table:

CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
