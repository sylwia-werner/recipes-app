# Recipes REST API

## Description 
- The database used in the project is **MongoDB** and consists of **users** and **recipes** models
- Stateless authentication and authorization done with **JWT** and NestJS **passport / passport-jwt library**
- Caching for GET /recipes with Nest's **cache-manager**

## Installation 🧰 

```
git clone https://github.com/sylwia-werner/recipes-app.git

npm i

npm run start:dev
```

## Prisma

You can see db collections with command ```npx prisma studio```

## Endpoints

Endpoints without **public** require ```Bearer <access_token>```.
Refresh tokens endpoint requires ```Bearer <refresh_token>```

**Auth:**

- POST (public) Signup: /auth/local/signup
- POST (public) Signin: /auth/local/signin
- POST Logout: /auth/logout
- POST Refresh tokens: /auth/refresh

**Recipes:**

- GET (public) Get recipes: /recipes?page=x&limit=x (pagination with optional page and limit query params)
- GET (public) Get recipe: /recipes/id
- POST Add recipe: /recipes 
- PUT Update recipe: /recipes/id
- DELETE Delete recipe: /recipes/id

- GET (public) Search recipes: /search?query=text&page=x&limit=x&difficulty=text (pagination with optional difficulty, page and limit query params)
