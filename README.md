## FinPrism

### 🛠 Tech Stack / Стек технологий

[![Next.js](https://img.shields.io)](https://nextjs.org)
[![React](https://img.shields.io)](https://reactjs.org)
[![TypeScript](https://img.shields.io)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io)](https://tailwindcss.com)
[![Redux](https://img.shields.io)](https://redux-toolkit.js.org)
[![TanStack Query](https://img.shields.io)](https://tanstack.com)

[![Node.js](https://img.shields.io)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io)](https://www.postgresql.org)
[![Prisma](https://img.shields.io)](https://www.prisma.io)
[![Redis](https://img.shields.io)](https://redis.io)
[![WebSockets](https://img.shields.io)](https://socket.io)

[![Zod](https://img.shields.io)](https://zod.dev)
[![Playwright](https://img.shields.io)](https://playwright.dev)
[![JWT](https://img.shields.io)](https://jwt.io)

🇷🇺 Русский (Russian)

🚀 О проекте

Простой и наглядный трекер финансов с упором на производительность и real-time взаимодействие. Проект демонстрирует работу со сложными выборками данных, кэшированием и стейт-менеджментом.

🛠 Стек технологий

Frontend: Next.js, Tailwind CSS, Lucide Icons.
State Management:
TanStack Query (v5): Серверное состояние, оптимистичные обновления, кэширование.
Redux Toolkit: Состояние UI (фильтры, модалки, темы).
Backend: Node.js (Express), PostgreSQL + Prisma.
Real-time & Performance:
Redis: Кэширование тяжелой аналитики, Pub/Sub.
WebSockets: Обновление чартов без перезагрузки страницы.
Data & Safety: Zod (валидация), React Hook Form, JWT (Access/Refresh в HttpOnly cookies).
Testing: Playwright (E2E тесты критических сценариев).

🏗 Архитектура

Проект построен на четком разделении ответственности:
Client State: Redux управляет только тем, что видит пользователь (фильтры, темы).
Server State: TanStack Query синхронизирует UI с БД, используя оптимистичные обновления для мгновенного отклика.
Database Layer: Prisma обеспечивает типизацию и сложные агрегации для графиков.
Cache Layer: Redis хранит результаты тяжелых запросов аналитики, которые инвалидируются при новых транзакциях.

🇺🇸 English

🚀 About

Advanced financial tracker focused on performance and real-time data visualization. This project demonstrates handling complex data relations, multi-level caching, and modern state management patterns.

🛠 Tech Stack

Frontend: Next.js, Tailwind CSS.
State Management:
TanStack Query: All CRUD operations, optimistic updates, server-state sync.
Redux Toolkit: UI logic, filters, modals, and auth state.
Backend: Node.js, PostgreSQL, Prisma ORM.
Real-time & Performance:
Redis: Analytics caching & Pub/Sub mechanism.
WebSockets: Live chart updates.
Security: JWT Auth (Role-based: User/Premium/Admin), Zod validation.
Testing: Playwright (E2E: "Add expense → Check chart" flow).

🏗 Architecture Highlights

Optimistic UI: Transactions feel instantaneous thanks to TanStack Query mutations.
Role-Based Access (RBAC): Granular control over features for different user tiers.
Analytics Pipeline: Complex SQL queries via Prisma → Cached in Redis → Streamed via WebSockets.