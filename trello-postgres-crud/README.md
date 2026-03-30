# Trello PostgreSQL CRUD API

Bu loyiha Trello uslubidagi oddiy CRUD board API.

## Board statuslari
- tasks
- pending
- in_progress
- done

## O'rnatish
```bash
npm install
```

## `.env` yaratish
`.env.example` fayldan nusxa olib `.env` yarating.

## PostgreSQL jadval yaratish
`sql/schema.sql` ichidagi kodlarni pgAdmin yoki psql da ishga tushiring.

## Serverni ishga tushirish
```bash
npm run dev
```

## API endpointlar
### 1) Task qo'shish
POST `http://localhost:3000/api/boards`
```json
{
  "title": "Backend yozish",
  "description": "Express va PostgreSQL ulash",
  "status": "tasks"
}
```

### 2) Barcha tasklarni olish
GET `http://localhost:3000/api/boards`

### 3) Bitta taskni olish
GET `http://localhost:3000/api/boards/1`

### 4) Taskni to'liq yangilash
PUT `http://localhost:3000/api/boards/1`
```json
{
  "title": "API tayyorlash",
  "description": "PUT orqali yangilandi",
  "status": "pending"
}
```

### 5) Faqat statusni yangilash
PATCH `http://localhost:3000/api/boards/1/status`
```json
{
  "status": "done"
}
```

### 6) Taskni o'chirish
DELETE `http://localhost:3000/api/boards/1`

## Kerakli paketlar
```bash
npm i express pg dotenv cors
npm i -D nodemon
```
