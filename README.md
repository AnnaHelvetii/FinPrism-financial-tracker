## FinPrism (now in progress)

Frontend:

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com)

Backend & DB:

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)

Tools:

[![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io)

🇷🇺 Русский (Russian)

🚀 О проекте

Простой и наглядный трекер финансов с упором на производительность и real-time взаимодействие. Проект демонстрирует работу со сложными выборками данных, кэшированием и стейт-менеджментом.

🛠 Стек технологий

- Frontend: Next.js, Tailwind CSS, Lucide Icons.
    - State Management: TanStack Query (v5): Серверное состояние, оптимистичные обновления, кэширование.
    - Redux Toolkit: Состояние UI (фильтры, модалки, темы).
- Backend: Node.js (Express), PostgreSQL + Prisma.
- Real-time & Performance:
    - Redis: Кэширование тяжелой аналитики, Pub/Sub.
    - WebSockets: Обновление чартов без перезагрузки страницы.
- Data & Safety: Zod (валидация), React Hook Form, JWT (Access/Refresh в HttpOnly cookies).
- Testing: Playwright (E2E тесты критических сценариев).

🏗 Архитектура

Проект построен на четком разделении ответственности:
- Client State: Redux управляет только тем, что видит пользователь (фильтры, темы).
- Server State: TanStack Query синхронизирует UI с БД, используя оптимистичные обновления для мгновенного отклика.
- Database Layer: Prisma обеспечивает типизацию и сложные агрегации для графиков.
- Cache Layer: Redis хранит результаты тяжелых запросов аналитики, которые инвалидируются при новых транзакциях.

🇺🇸 English

🚀 About

Advanced financial tracker focused on performance and real-time data visualization. This project demonstrates handling complex data relations, multi-level caching, and modern state management patterns.

🛠 Tech Stack

- Frontend: Next.js, Tailwind CSS.
    - State Management:
    - TanStack Query: All CRUD operations, optimistic updates, server-state sync.
    - Redux Toolkit: UI logic, filters, modals, and auth state.
- Backend: Node.js, PostgreSQL, Prisma ORM.
- Real-time & Performance:
    - Redis: Analytics caching & Pub/Sub mechanism.
    - WebSockets: Live chart updates.
- Security: JWT Auth (Role-based: User/Premium/Admin), Zod validation.
- Testing: Playwright (E2E: "Add expense → Check chart" flow).

🏗 Architecture Highlights

- Optimistic UI: Transactions feel instantaneous thanks to TanStack Query mutations.
- Role-Based Access (RBAC): Granular control over features for different user tiers.
- Analytics Pipeline: Complex SQL queries via Prisma → Cached in Redis → Streamed via WebSockets.
