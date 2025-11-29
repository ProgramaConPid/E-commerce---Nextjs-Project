**E-commerce Next.js Project**

**Description:**
- **Purpose:** A modern, full-featured e-commerce web application built with Next.js (App Router), TypeScript and Tailwind CSS. It demonstrates product listing, cart & checkout flows, user registration and authentication, blog pages, and integrations such as Cloudinary and PayPal.

**Objective:**
- Provide a production-ready starter that implements common e-commerce features and best practices, including server-side API routes, modular React components, a context-based checkout flow, and integration points for payment and media.

**Key Features:**
- **Products:** Browse categories, featured/new/discounted lists, best sellers and product details.
- **Cart & Checkout:** Add/remove items, order summary, shipping methods and checkout context.
- **Authentication & Users:** Register and login flows (NextAuth integration), user profiles, and address management.
- **Payments:** PayPal integration endpoints for creating and capturing orders.
- **Media:** Cloudinary helper for image uploads and transformations.
- **Admin/Publishing:** Simple product/blog publishing pages (skeleton present).
- **Contact & Email:** Contact form and email sending endpoint.
- **Blog:** Blog list and individual blog pages.
- **Testing:** Jest tests included for unit components and helpers.

**Quick Start**
- **Install dependencies:**

```powershell
npm install
```

- **Run development server:**

```powershell
npm run dev
```

- **Build for production:**

```powershell
npm run build
npm run start
```

**Project Structure (high level)**
- **`app/`**: Next.js App Router pages and API routes under `app/api/`.
	- `app/page.tsx`, `app/layout.tsx`, and per-page directories (home, login, register, cart, checkout, blog, etc.).
	- `app/api/` contains serverless route handlers for products, cart, contact, register, auth, PayPal and more.
- **`src/components/`**: Reusable UI and layout components (Navbar, Footer, ContactForm, SessionProvider, modals, filters).
- **`src/components/ui/`**: Atomic UI pieces like `Button`, `ProductCard`, `OrderSummary`, `StarRating`, `AddressCard`, etc.
- **`src/context/`**: React contexts such as `CheckoutContext` and general `Context`/`Provider` files.
- **`src/services/`**: Client-side services that call API routes (products, cart, address, contact, userLogged).
- **`src/database/models/`**: Mongoose models: `Users`, `Products`, `Blogs`, `Messages`.
- **`src/lib/`**: Helpers and integrations like `mongodb.ts` and `cloudinary.ts`.
- **`src/pages/`** (app pages): Page-level components for `home`, `about`, `blog`, `cart`, `checkout`, `contact`, `login`, `publish`, `register`.
- **Top-level files**: `Dockerfile`, `docker-compose.yml`, `next.config.ts`, `tailwind.config.js`, `jest.config.ts` and test files in `__tests__/`.

**Notable API Routes (server handlers)**
- `app/api/products/route.ts` and category subroutes: product list, filters, featured, best-seller, discount, new-arrival.
- `app/api/cart/route.ts`: Cart operations.
- `app/api/register/route.ts`: New user registration.
- `app/api/sendEmail/route.ts` and `app/api/contact/route.ts`: Contact and email sending.
- `app/api/paypal/create-order/` and `capture-order/`: PayPal order creation and capture endpoints.
- `app/api/auth/[...nextauth]/route.ts`: Authentication (NextAuth) endpoint.

**Data models**
- **Users**: fields for name, email, password hash, addresses and roles.
- **Products**: title, description, price, categories, images, inventory and ratings.
- **Blogs**: title, content, author, date, images.
- **Messages**: contact messages and logs.

**Environment variables**
Create a `.env.local` at the project root with values similar to:

```
MONGODB_URI=<your-mongodb-connection-string>
NEXTAUTH_SECRET=<random-secret-string>
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
PAYPAL_CLIENT_ID=<paypal-client-id>
PAYPAL_CLIENT_SECRET=<paypal-client-secret>
EMAIL_SERVICE_API_KEY=<sendgrid-or-smtp-key>
```

**Testing**
- Unit tests with Jest are located in `__tests__/` (e.g., `Button.test.tsx`, `math.test.ts`). Run tests with:

```powershell
npm test
```

**Styling & Fonts**
- Tailwind CSS is used for styling. Fonts are configured via `app/fonts/mainFonts.ts` and optimized by Next.js.

**Docker & Deployment**
- A `Dockerfile` and `docker-compose.yml` are included for containerized development and production builds. The project is compatible with Vercel, Docker, and other Node.js hosting providers.

**Development tips & common commands**
- Install: `npm install`
- Dev server: `npm run dev`
- Lint (if configured): `npm run lint`
- Tests: `npm test`
- Build: `npm run build`
- Start (production): `npm start` or use `next start`

**Contributing**
- Fork the repository, create a feature branch and open a pull request. Keep changes focused and add tests for new logic.

**Where to look in the codebase**
- UI components: `src/components/ui/` and `src/components/layout/`.
- Context & state: `src/context/` and `src/providers/Providers.tsx`.
- API & server logic: `app/api/` and `src/lib/mongodb.ts`.
- Models: `src/database/models/`.
- Services that wrap network calls: `src/services/`.

**Notes & Next steps**
- The codebase includes scaffolding for product publishing, PayPal integration, cloud media handling and email sending. To deploy, fill required environment variables and choose a hosting provider (Vercel recommended for Next.js apps). If you want, I can add a sample `.env.example`, CI config, or an expanded developer setup guide.

---

If you'd like, I can also:
- Add a minimal `.env.example` file.
- Add a short developer checklist for running the full stack with Docker.
- Create documentation for each API route in `/app/api`.


