# Backend Skill: Node.js + Express + TypeScript MVC Blueprint

A production-ready technical blueprint for building scalable, strongly-typed RESTful APIs using **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This document establishes standard patterns for Model-View-Controller (MVC) decoupling, secure middleware execution, and isolated routing interfaces within modern IDEs like VS Code.

---

## 1. Directory Structure

```text
src/
├── config/
│   └── database.ts       # Database connection lifecycle management
├── controllers/
│   └── product.controller.ts # Extracted business logic & HTTP parsing
├── middlewares/
│   └── rate-limiter.middleware.ts # Request interceptors & pre-flight security
├── models/
│   └── product.model.ts  # Strongly-typed schemas & database query engines
├── routes/
│   └── product.routes.ts # Clean URI endpoints mapping to controllers
└── app.ts                # Application configuration & server bootstraping