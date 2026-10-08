/**
 * Services offered, community/photo gallery, and accomplishments.
 *
 * Kept as data rather than inline JSX so the sections stay declarative and the
 * copy can be edited without touching component logic.
 */

export interface Service {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  icon: "code" | "api" | "database" | "mobile" | "test" | "write" | "design";
}

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    summary:
      "Complete web applications from database to interface — the whole product lifecycle in one delivery.",
    deliverables: [
      "React & TypeScript frontends",
      "Node.js / Express backends",
      "Database schema design",
      "Authentication & RBAC",
      "Deployment & configuration",
    ],
    icon: "code",
  },
  {
    id: "apis",
    title: "API & Backend Development",
    summary:
      "REST APIs designed around real consumers, with validation, versioning and documented contracts.",
    deliverables: [
      "RESTful API design",
      "Auth, OAuth 2.0 & RBAC",
      "Input validation & error handling",
      "API documentation",
      "Third-party integrations",
    ],
    icon: "api",
  },
  {
    id: "databases",
    title: "Database Development",
    summary:
      "Relational modelling that holds up under real data volume and changing requirements.",
    deliverables: [
      "PostgreSQL & MySQL design",
      "Data modelling & normalisation",
      "Query optimisation",
      "Migrations & seeding",
      "Backup & recovery planning",
    ],
    icon: "database",
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    summary:
      "Cross-platform apps for Android and iOS from a shared codebase.",
    deliverables: [
      "React Native & Expo",
      "Flutter",
      "API integration",
      "Offline-first data handling",
      "Store submission support",
    ],
    icon: "mobile",
  },
  {
    id: "testing",
    title: "Software Testing",
    summary:
      "Testing treated as part of building, not a phase at the end of it.",
    deliverables: [
      "Unit & integration tests",
      "API testing with Postman",
      "End-to-end tests with Playwright",
      "Regression & performance testing",
      "Test documentation",
    ],
    icon: "test",
  },
  {
    id: "fintech",
    title: "Fintech & Payment Systems",
    summary:
      "Digital financial services built around ledgers, compliance and trust.",
    deliverables: [
      "Wallet & transfer systems",
      "Mobile money integration",
      "KYC / AML flows",
      "Transaction & audit logging",
      "Reconciliation reporting",
    ],
    icon: "database",
  },
  {
    id: "documentation",
    title: "Technical & UX Writing",
    summary:
      "Documentation that lets another developer pick up the work without a meeting.",
    deliverables: [
      "Technical documentation",
      "API references",
      "SRS & system specifications",
      "User guides",
      "Architecture decision records",
    ],
    icon: "write",
  },
  {
    id: "uiux",
    title: "UI/UX & Product Design",
    summary:
      "Interfaces that turn complex functionality into straightforward user journeys.",
    deliverables: [
      "Figma prototypes",
      "User journey mapping",
      "Design systems",
      "Responsive layouts",
      "Accessibility review",
    ],
    icon: "design",
  },
];

/**
 * Community, speaking and event activity.
 *
 * Photos live in `public/photos` and were supplied by the site owner.
 */
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  context: string;
  year: string;
  span?: "wide" | "tall";
}

export const gallery: GalleryItem[] = [
  {
    src: "/photos/dev-club-speaking.jpg",
    alt: "Speaking to the Developer Club at YIBS about open source and GitHub collaboration",
    caption: "Speaking at the YIBS Developer Club",
    context:
      "Walked through Git fundamentals, GitHub workflows and how to make a first open-source contribution.",
    year: "2026",
    span: "wide",
  },
  {
    src: "/photos/yibs-field-visit.jpg",
    alt: "Angel at a YIBS programme site visit wearing a high-visibility vest",
    caption: "YIBS programme visit",
    context:
      "On-site work with students during a YIBS programme, applying engineering practice outside the classroom.",
    year: "2026",
  },
  {
    src: "/photos/community-day-frame.jpg",
    alt: "At Student Community Day holding a photo frame with another attendee",
    caption: "Student Community Day",
    context:
      "AWS-supported community event focused on connecting students with the technology industry.",
    year: "2026",
  },
  {
    src: "/photos/aws-community-day.jpg",
    alt: "Angel volunteering at AWS Community Day in an AWS Community Day t-shirt",
    caption: "Volunteering at AWS Community Day",
    context:
      "Helped run an event that introduced more students to cloud and developer tooling.",
    year: "2026",
  },
  {
    src: "/photos/devfest-yaounde.jpg",
    alt: "At DevFest Yaoundé wearing a DevFest Yaoundé t-shirt",
    caption: "DevFest Yaoundé",
    context:
      "Attended the Yaoundé edition of DevFest to keep close to the local developer scene.",
    year: "2026",
  },
  {
    src: "/photos/gallery-exhibit.jpg",
    alt: "Angel viewing an exhibition with peers at a gallery space",
    caption: "Exhibition visit",
    context:
      "A day away from the screen — the same instinct behind my open-source AI nature project.",
    year: "2026",
  },
];

export interface Accomplishment {
  id: string;
  title: string;
  detail: string;
  metric?: string;
  category: "community" | "engineering" | "professional";
}

/**
 * Community and professional accomplishments.
 *
 * Sourced from the owner's own profile summary. Kept specific and verifiable
 * rather than inflated.
 */
export const accomplishments: Accomplishment[] = [
  {
    id: "hacktoberfest",
    title: "Organised Hacktoberfest Yaoundé 2026",
    detail:
      "Coordinated a community programme introducing developers and complete beginners to open-source contribution — covering Git, GitHub, pull requests, beginner-friendly repositories and open-source AI. Handled community activities, technical support, communication and learning sessions.",
    metric: "Open-source onboarding",
    category: "community",
  },
  {
    id: "reach",
    title: "Community sessions reaching ~200 people",
    detail:
      "Delivered sessions on Git fundamentals, GitHub workflows, open-source contribution and AI tools, helping beginners who had never contributed to a public repository before take their first steps.",
    metric: "~200 reached",
    category: "community",
  },
  {
    id: "digimark",
    title: "Software Developer at DigiMark Consulting SARL",
    detail:
      "Worked within the Software Engineering department on web applications, Laravel and React/TypeScript interfaces, PostgreSQL databases, API integration, debugging, testing, documentation and Git/GitHub collaboration — including e-learning, incubation management and research laboratory systems.",
    metric: "Full-stack, documented",
    category: "professional",
  },
  {
    id: "nfc",
    title: "Engineering internship at NFC Bank SA",
    detail:
      "Completed an internship inside a live banking environment, gaining practical exposure to how secure and reliable enterprise technology is delivered, and to the engineering discipline that comes with regulated systems.",
    metric: "Banking environment",
    category: "professional",
  },
  {
    id: "bachelor",
    title: "B.Sc. Software Engineering, YIBS",
    detail:
      "Graduated from Yaoundé International Business School after an HND in Computer Software Engineering, combining software engineering study with systems design and project management.",
    metric: "2025 — 2026",
    category: "professional",
  },
  {
    id: "certifications",
    title: "24+ professional certifications",
    detail:
      "Microsoft AI and digital-skills certifications, AWS Cloud Practitioner, Meta Front-End Developer, Oracle Java and IBM Python for Data Science.",
    metric: "24+ credentials",
    category: "professional",
  },
];