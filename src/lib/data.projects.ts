/**
 * Project data.
 *
 * Tiers reflect what is actually verifiable:
 *  - `shipped`    built and substantiated by a real repository
 *  - `progress`   actively designed/being built, not yet complete
 *  - `openSource` public repositories others can read, run or contribute to
 *  - `archive`    early coursework, templates and learning artefacts, kept for
 *                 honesty rather than presented as finished work
 *
 * Every `repo` value was verified against the GitHub API.
 */

export type ProjectStatus = "shipped" | "progress" | "openSource" | "archive";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  /** Shown on the card as a one-line outcome rather than marketing copy. */
  outcome?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  technologies: string[];
  repo?: string;
  live?: string;
  lessonsLearned?: string;
  screenshots?: string[];
  /** Year started, used for the archive and progress timelines. */
  year?: string;
}

export const projects: Project[] = [
  // ─────────────────────────  SHIPPED  ─────────────────────────
  {
    slug: "refugeeid",
    title: "RefugeeID",
    tagline: "Self-sovereign identity for displaced persons",
    description:
      "A decentralised identity system for refugee and displaced-person beneficiaries, built as a pnpm monorepo. Field agents issue W3C-style verifiable credentials to a mobile wallet, and verifiers check them by QR — with every cryptographic operation happening on-device so it still works without connectivity.",
    status: "shipped",
    outcome:
      "289-file monorepo: API server, mobile wallet, issuer portal and admin console, plus four shared libraries (API client, OpenAPI spec, Zod schemas, database layer).",
    problem:
      "Displaced people frequently have no reliable identity document, which blocks access to aid, healthcare, education and financial services.",
    solution:
      "A credential-based system where issuance, holding and verification are separated. The holder keeps their own credentials; issuers sign them; verifiers check signatures instead of querying a central database.",
    features: [
      "Beneficiary registration and decentralised identity creation",
      "Verifiable Credential issuance via an issuer portal",
      "Mobile wallet with QR-based presentation and verification",
      "Role-based access control across issuer, verifier and admin roles",
      "Credential revocation and audit logging",
      "Offline and simulated-offline workflows",
      "Typed API contract shared across every app in the monorepo",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "pnpm workspaces",
      "Zod",
      "REST APIs",
      "RBAC",
    ],
    repo: "https://github.com/ANGELcode-coder/RefugeeID",
    lessonsLearned:
      "Designing identity as a set of signed claims rather than a database row is what makes revocation, selective disclosure and offline use tractable.",
    screenshots: ["/projects/did-wallet-1.jpg", "/projects/did-wallet-2.jpg"],
    year: "2026",
  },
  {
    slug: "smooth-rentalsol",
    title: "SMOOTH (rentalsol)",
    tagline: "All-in-one living, services and lifestyle platform",
    description:
      "Cameroon's all-in-one living platform, spanning property search and booking, home services, concierge errands, administrative paperwork and a jobs board — with MTN Mobile Money and Orange Money payment integration. Structured as a monorepo with a Node/Express API, a React web frontend and a Flutter mobile app.",
    status: "shipped",
    outcome:
      "Monorepo with server, web and mobile apps, plus written SRS and API contract docs and a Trello automation script.",
    problem:
      "Finding housing and managing the administrative tasks that come with it means juggling separate agents, apps and payments across a fragmented market.",
    solution:
      "One platform covering the whole tenant journey — discovery, booking, services, documents and payments — in a bilingual, mobile-first interface.",
    features: [
      "Property listings across buy, rent, short/long-term, commercial and land",
      "Home services: cleaning, caregiving, home chefs",
      "Concierge: errands, delivery, airport services",
      "Administration: documents, NGO registration, bills, travel",
      "Jobs board for employers and job seekers",
      "MTN Mobile Money and Orange Money payment integration",
      "Bilingual (EN/FR) mobile-first web interface",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Flutter",
      "Dart",
      "REST APIs",
      "Mobile Money",
    ],
    repo: "https://github.com/ANGELcode-coder/rentalsol",
    lessonsLearned:
      "Writing the SRS and API contract before the first component forced scope decisions that a feature-first approach would have deferred too late.",
    screenshots: ["/projects/rental-1.png"],
    year: "2026",
  },
  {
    slug: "nfc-loan-management",
    title: "NFC Bank Loan Management",
    tagline: "Loan processing system from a banking internship",
    description:
      "A loan management system covering the full lending lifecycle — application intake, credit assessment, approval routing, repayment schedules, delinquency monitoring and management reporting.",
    status: "shipped",
    outcome:
      "Delivered during an engineering internship inside a live banking environment, with strict security and documentation requirements.",
    problem:
      "Manual loan tracking made it hard to see application status, approval history and repayment performance at a glance.",
    solution:
      "A structured module with role-scoped approval routing, scheduled repayment tracking and dashboards for both operations staff and management.",
    features: [
      "Loan application submission and document management",
      "Credit assessment workflow with automated scoring",
      "Approval routing with role-based access",
      "Repayment schedule generation and tracking",
      "Delinquency monitoring and alerting",
      "Management reporting and analytics",
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Git", "REST APIs"],
    lessonsLearned:
      "Enterprise banking software is mostly about auditability and access control — the interesting logic is a smaller part of the work than the discipline around it.",
    screenshots: ["/projects/nfc-loan-1.jpg"],
    year: "2025",
  },
  {
    slug: "incubator-management",
    title: "Incubator Management System",
    tagline: "Management tooling for a business incubator",
    description:
      "A management system built during my internship at DigiMark Consulting, covering incubator operations, tracking and reporting.",
    status: "shipped",
    outcome: "Shipped as part of client project work at DigiMark Consulting SARL.",
    problem: "Incubator operations were tracked across disconnected spreadsheets and manual follow-ups.",
    solution:
      "A single system for tracking the entities an incubator supports and the services delivered to them.",
    features: [
      "Entity and programme tracking",
      "Operational management workflows",
      "Reporting and dashboards",
      "User and role management",
      "Database-backed records",
    ],
    technologies: ["React", "Spring Boot", "MySQL", "Docker", "REST APIs"],
    screenshots: ["/projects/incubator-1.png"],
    year: "2025",
  },
  {
    slug: "nextjs-dashboard",
    title: "Next.js Dashboard",
    tagline: "Full-stack dashboard built while learning the App Router",
    description:
      "A dashboard application covering authentication, database integration, invoices, customers and revenue charts — built as a study of the Next.js App Router, server components and typed data access.",
    status: "shipped",
    outcome: "Next.js App Router application with auth, database integration and charting.",
    problem: "Learning server components and typed data fetching properly requires a real application, not isolated examples.",
    solution:
      "A full dashboard applying App Router patterns end to end.",
    features: [
      "Credential-based authentication",
      "Invoice creation and management",
      "Revenue chart visualisation",
      "Server-side rendering and typed data fetching",
      "Responsive dashboard layout",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/ANGELcode-coder/nextjs-dashboard",
    lessonsLearned:
      "Server components change where you put data access and loading state — moving a query into a server component removed most of the client fetching code.",
    screenshots: ["/projects/dashboard-1.png"],
    year: "2024",
  },

  // ─────────────────────────  IN PROGRESS  ─────────────────────────
  {
    slug: "afrilink-pay",
    title: "Afrilink Pay",
    tagline: "Unified wallet and mobile-money platform",
    description:
      "A digital financial-services concept bringing wallets, mobile money and transfers together behind one experience. Covers wallet transfers, mobile-money top-up and withdrawal, identity verification and administration, with country-specific integration requirements for Cameroon, Nigeria and Kenya.",
    status: "progress",
    outcome: "Currently in design: architecture, ledger rules and compliance scope.",
    problem:
      "Mobile-money ecosystems are fragmented — each operator runs a closed loop, so users and small businesses juggle multiple apps and balances.",
    solution:
      "A shared ledger with pluggable per-country mobile-money adapters, tiered KYC/AML checks and merchant settlement reporting.",
    features: [
      "Unified wallet: transfer, top-up, withdraw",
      "Per-country mobile-money adapters (CMR, NGA, KEN)",
      "Tiered KYC / AML checks and transaction limits",
      "Merchant settlement and reconciliation dashboard",
      "Role-based administration and audit logging",
    ],
    technologies: [
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "REST APIs",
      "RBAC",
      "KYC / AML",
    ],
    lessonsLearned:
      "Modelling ledger invariants and making payment handling idempotent is where most of the real design work sits.",
    year: "2026",
  },
  {
    slug: "illunex",
    title: "ILLUNEX",
    tagline: "Solar energy and intelligent power management",
    description:
      "A platform combining solar generation, battery storage, intelligent power management and professional maintenance services to deliver reliable, sustainable electricity. Currently scoped and specified.",
    status: "progress",
    outcome: "Specification and architecture phase; public repository opened as the concept is formalised.",
    problem:
      "Solar installations degrade quietly — without monitoring, underperforming panels and failing batteries go unnoticed until output drops.",
    solution:
      "Live generation and storage telemetry paired with automated power-management rules and scheduled maintenance workflows.",
    features: [
      "Solar generation and battery storage monitoring",
      "Intelligent load and power management rules",
      "Automated fault and underperformance alerts",
      "Professional maintenance scheduling and job tracking",
      "Customer usage and savings reporting",
    ],
    technologies: ["Next.js", "TypeScript", "REST APIs", "PostgreSQL"],
    repo: "https://github.com/ANGELcode-coder/ILLUNEX",
    year: "2026",
  },
  {
    slug: "nature-ai",
    title: "NatureLens",
    tagline: "Open-weight vision model for identifying things outdoors",
    description:
      "An AI application that helps people identify what they encounter in nature using an open-weight vision model, with the explicit goal of getting people off their screens and into the physical world.",
    status: "progress",
    outcome: "Early research and prototyping; open-source AI direction.",
    problem:
      "Nature identification tools either require an internet connection or push people toward more screen time rather than less.",
    solution:
      "A lightweight identification flow that runs close to the user and gets out of the way — identify the thing, then return attention to the outdoors.",
    features: [
      "Image capture and identification",
      "Open-weight vision model inference",
      "Local/offline-friendly operation",
      "Minimal, glanceable results UI",
    ],
    technologies: ["Python", "Open-weight models", "Computer Vision", "Edge inference"],
    year: "2026",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    tagline: "Full-stack task management application",
    description:
      "A full-stack task manager with separated frontend and backend, JWT authentication, role-based access control, REST resources and automated API tests.",
    status: "progress",
    outcome: "Built as a capstone; currently being extended and hardened.",
    problem:
      "Managing work needs authentication, per-user data isolation and a dependable API boundary between client and server.",
    solution:
      "A separated frontend and backend with JWT auth, RBAC and automated API tests before deployment.",
    features: [
      "JWT authentication with role-based access control",
      "Task CRUD with filtering and status tracking",
      "Clean separation between frontend and REST API",
      "Automated API and system testing",
      "Cloud deployment with environment configuration",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "REST APIs",
    ],
    year: "2026",
  },
  {
    slug: "helpdesk-pro",
    title: "HelpDesk Pro",
    tagline: "Multi-tenant helpdesk and support platform",
    description:
      "A multi-tenant helpdesk covering tickets, priority management, assignment and an analytics dashboard, built with multi-tenant RBAC.",
    status: "progress",
    outcome: "Functional build; repository is private while it is hardened.",
    problem:
      "Support teams need tenant isolation, priority-based triage and reporting without running separate systems per client.",
    solution:
      "A tenant-aware platform where access control and reporting are first-class concerns.",
    features: [
      "Ticket creation and lifecycle management",
      "Priority management system",
      "Assignment and escalation",
      "Analytics and reporting dashboard",
      "Multi-tenant role-based access control",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "RBAC"],
    screenshots: ["/projects/helpdesk-1.jpg", "/projects/helpdesk-2.jpg", "/projects/helpdesk-3.jpg"],
    year: "2025",
  },
  {
    slug: "pharmacy",
    title: "Pharmacy",
    tagline: "Pharmacy and health mobile application",
    description:
      "A React Native application for finding pharmacies, searching for medications and booking consultations — an early mobile project from my React Native period.",
    status: "progress",
    outcome: "Early mobile build; code is archived in-repository as a zip pending cleanup.",
    problem:
      "Finding an open pharmacy or a specific medication at short notice needed a single reliable source.",
    solution: "A mobile-first directory with search and consultation booking.",
    features: [
      "Pharmacy directory with location info",
      "Medication search",
      "Consultation booking",
      "Mobile-first React Native UI",
    ],
    technologies: ["React Native", "JavaScript"],
    repo: "https://github.com/ANGELcode-coder/Pharmacy",
    screenshots: ["/projects/pharmacy-1.jpg"],
    year: "2026",
  },

  // ─────────────────────  OPEN SOURCE / CONTRIBUTE  ─────────────────────
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline: "Open-source portfolio site",
    description:
      "The site you are reading. Next.js App Router, Tailwind CSS and Framer Motion, with a generated-PDF resume, contact API and blog feed. Public, and open to issues or pull requests.",
    status: "openSource",
    outcome: "Next.js 16, TypeScript, Tailwind v4 — deployed and public.",
    features: [
      "Server-rendered App Router pages",
      "Client-generated PDF resume",
      "Nodemailer contact endpoint",
      "Atom blog feed and sitemap",
      "JSON-LD structured data and Open Graph metadata",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "jsPDF"],
    repo: "https://github.com/ANGELcode-coder/angel-codes",
    live: "https://angel-codes-portfolio.vercel.app",
    year: "2026",
  },
];

// ─────────────────────────  ARCHIVE  ─────────────────────────
// Kept deliberately: early coursework and learning artefacts, listed plainly
// rather than dressed up as finished products.
export const archivedProjects = [
  {
    title: "house_rental",
    description:
      "A PHP/MySQL rental management system from my earlier PHP period. Educational in scope; the repository vendors a third-party mailer library, which I would clean up before treating it as production code.",
    technologies: ["PHP", "MySQL", "PHPMailer"],
    repo: "https://github.com/ANGELcode-coder/house_rental",
    year: "2025",
  },
  {
    title: "architectureVC",
    description:
      "Architecture documentation and design artefacts for a virtual-card payment system — written analysis and reference material rather than shipped software.",
    technologies: ["System Design", "Payments Architecture"],
    repo: "https://github.com/ANGELcode-coder/architectureVC",
    year: "2025",
  },
] as const;

/** Public repositories that others can read, run or contribute to. */
export const openSourceRepos = [
  {
    name: "RefugeeID",
    description: "Self-sovereign identity platform — API, wallet, issuer and admin apps.",
    url: "https://github.com/ANGELcode-coder/RefugeeID",
    language: "TypeScript",
  },
  {
    name: "rentalsol",
    description: "SMOOTH — all-in-one living, services and lifestyle platform.",
    url: "https://github.com/ANGELcode-coder/rentalsol",
    language: "JavaScript",
  },
  {
    name: "angel-codes",
    description: "This portfolio site.",
    url: "https://github.com/ANGELcode-coder/angel-codes",
    language: "TypeScript",
  },
  {
    name: "ILLUNEX",
    description: "Solar energy and power management platform (in progress).",
    url: "https://github.com/ANGELcode-coder/ILLUNEX",
    language: "—",
  },
  {
    name: "house_rental",
    description: "PHP rental management system.",
    url: "https://github.com/ANGELcode-coder/house_rental",
    language: "PHP",
  },
] as const;