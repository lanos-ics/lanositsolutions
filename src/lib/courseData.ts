/* ─── Course Data ───────────────────────────────────────────────
 * Central data source for all EdTech tracks and courses.
 * Designed for easy future migration to a CMS or API.
 * ──────────────────────────────────────────────────────────────── */

export type CourseBadge = "new" | "popular" | "bestseller";

export interface Course {
  slug: string;
  title: string;
  description: string;
  icon: string;
  originalPrice: number;
  price: number;
  syllabusUrl: string;
  badge?: CourseBadge;
}

export interface Track {
  slug: string;
  label: string;
  description: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  emoji: string;
  courses: Course[];
  comingSoon?: boolean;
}

/* ─── All Tracks ──────────────────────────────────────────────── */
export const TRACKS: Track[] = [
  /* ── 1. Programming Foundations ──────────────────────────────── */
  {
    slug: "programming-foundations",
    label: "Programming Foundations",
    description:
      "Start from zero and build strong logical and coding fundamentals. These courses lay the groundwork for every engineering career path.",
    accent: "#E5404F",
    accentBg: "rgba(229,64,79,0.08)",
    accentBorder: "rgba(229,64,79,0.18)",
    accentGlow: "rgba(229,64,79,0.11)",
    emoji: "🔰",
    courses: [
      {
        slug: "c-data-to-data-structures",
        title: "C: From Data to Data Structures",
        description:
          "Master the C language from variables to advanced data structures. Build a deep understanding of memory, pointers, and algorithms.",
        icon: "⚙️",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "dbms",
        title: "DBMS (MySQL, PostgreSQL, MongoDB)",
        description:
          "Learn relational and NoSQL databases from scratch. Design schemas, write complex queries, and understand database internals.",
        icon: "🗄️",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
      {
        slug: "python-zero-level",
        title: "0-Level Programming with Python",
        description:
          "Your first step into programming. Learn Python from absolute basics — variables, loops, functions, and problem solving.",
        icon: "🐍",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
        badge: "bestseller",
      },
      {
        slug: "java-zero-level",
        title: "0-Level Programming with Java",
        description:
          "Begin your coding journey with Java. Understand OOP, data types, control flow, and build your first real programs.",
        icon: "☕",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
      },
    ],
  },

  /* ── 2. Programming Mastery ─────────────────────────────────── */
  {
    slug: "programming-mastery",
    label: "Programming Mastery",
    description:
      "Master languages like Java, Python, C++, Go, and Rust. Build system-level thinking and advanced problem-solving skills.",
    accent: "#E5404F",
    accentBg: "rgba(229,64,79,0.08)",
    accentBorder: "rgba(229,64,79,0.18)",
    accentGlow: "rgba(229,64,79,0.11)",
    emoji: "🏆",
    courses: [
      {
        slug: "cpp-dsa-expert",
        title: "C++: Become DSA Expert",
        description:
          "Deep dive into C++ with Data Structures & Algorithms. Crack coding interviews and build competitive programming skills.",
        icon: "⚡",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "java-se-core",
        title: "Java SE: Core Java Guide",
        description:
          "Comprehensive Java SE course covering collections, generics, multithreading, I/O, and enterprise-grade patterns.",
        icon: "☕",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "python-impact",
        title: "Python Impact",
        description:
          "Advance your Python skills with real-world projects — automation, scripting, APIs, and production-grade code quality.",
        icon: "🐍",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "bestseller",
      },
      {
        slug: "go-lang",
        title: "Go Lang",
        description:
          "Learn Go from fundamentals to concurrency. Build high-performance microservices and cloud-native applications.",
        icon: "🦫",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "new",
      },
      {
        slug: "rust-developer",
        title: "Rust Developer",
        description:
          "Master Rust's ownership system, zero-cost abstractions, and build memory-safe, blazing-fast systems software.",
        icon: "🦀",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
        badge: "new",
      },
    ],
  },

  /* ── 3. Web Design & UI Systems ─────────────────────────────── */
  {
    slug: "web-design-ui-systems",
    label: "Web Design & UI Systems",
    description:
      "Design modern, responsive interfaces with real-world design principles. From HTML/CSS fundamentals to advanced animation systems.",
    accent: "#2A7DE1",
    accentBg: "rgba(42,125,225,0.08)",
    accentBorder: "rgba(42,125,225,0.18)",
    accentGlow: "rgba(42,125,225,0.11)",
    emoji: "🎨",
    courses: [
      {
        slug: "html-css",
        title: "HTML & CSS",
        description:
          "Build pixel-perfect, semantic, and accessible web pages. Master Flexbox, Grid, responsive design, and modern CSS.",
        icon: "🌐",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
        badge: "bestseller",
      },
      {
        slug: "javascript-core",
        title: "JavaScript Core",
        description:
          "Understand JavaScript deeply — closures, prototypes, async patterns, DOM manipulation, and ES2024+ features.",
        icon: "💛",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "sass-advanced-css",
        title: "SASS Advanced CSS",
        description:
          "Level up your CSS with SASS — mixins, functions, architecture patterns, and scalable design systems.",
        icon: "💅",
        originalPrice: 2499,
        price: 1249,
        syllabusUrl: "#",
      },
      {
        slug: "gsap-complete-guide",
        title: "GSAP Complete Guide",
        description:
          "Master web animations with GSAP — timelines, ScrollTrigger, morphing, and production-grade motion design.",
        icon: "✨",
        originalPrice: 3499,
        price: 1749,
        syllabusUrl: "#",
        badge: "new",
      },
    ],
  },

  /* ── 4. Frontend Engineering ────────────────────────────────── */
  {
    slug: "frontend-engineering",
    label: "Frontend Engineering",
    description:
      "Build interactive, scalable user interfaces using modern frameworks. Production-ready skills for the modern frontend engineer.",
    accent: "#2A7DE1",
    accentBg: "rgba(42,125,225,0.08)",
    accentBorder: "rgba(42,125,225,0.18)",
    accentGlow: "rgba(42,125,225,0.11)",
    emoji: "🖥️",
    courses: [
      {
        slug: "reactjs",
        title: "ReactJS",
        description:
          "Build modern UIs with React — hooks, context, state management, routing, and real-world project architecture.",
        icon: "⚛️",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
        badge: "bestseller",
      },
      {
        slug: "angularjs",
        title: "AngularJS",
        description:
          "Enterprise-grade frontend with Angular — modules, services, RxJS, forms, and scalable application patterns.",
        icon: "🅰️",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "nextjs",
        title: "NextJS",
        description:
          "Full-stack React with Next.js — SSR, SSG, API routes, App Router, and production deployment strategies.",
        icon: "▲",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "vuejs",
        title: "VueJS",
        description:
          "Progressive frontend framework — Composition API, Vuex/Pinia, Vue Router, and building elegant SPAs.",
        icon: "💚",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
    ],
  },

  /* ── 5. Backend Engineering ─────────────────────────────────── */
  {
    slug: "backend-engineering",
    label: "Backend Engineering",
    description:
      "Develop secure, scalable server-side applications and architectures. Master the engines that power modern web applications.",
    accent: "#2A7DE1",
    accentBg: "rgba(42,125,225,0.08)",
    accentBorder: "rgba(42,125,225,0.18)",
    accentGlow: "rgba(42,125,225,0.11)",
    emoji: "🔧",
    courses: [
      {
        slug: "spring-boot",
        title: "Spring Boot",
        description:
          "Build enterprise Java backends with Spring Boot — REST APIs, JPA, security, microservices, and cloud deployment.",
        icon: "🍃",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "django",
        title: "Django",
        description:
          "Python web development with Django — ORM, authentication, admin, REST framework, and deployment pipelines.",
        icon: "🎸",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
      {
        slug: "nodejs",
        title: "NodeJS",
        description:
          "Server-side JavaScript with NodeJS — Express, middleware, authentication, real-time apps, and scalable architectures.",
        icon: "💚",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "bestseller",
      },
    ],
  },

  /* ── 6. API & System Integration ────────────────────────────── */
  {
    slug: "api-system-integration",
    label: "API & System Integration",
    description:
      "Design and build REST APIs powering real-world applications. Learn API architecture, security, testing, and documentation.",
    accent: "#2A7DE1",
    accentBg: "rgba(42,125,225,0.08)",
    accentBorder: "rgba(42,125,225,0.18)",
    accentGlow: "rgba(42,125,225,0.11)",
    emoji: "🔗",
    courses: [
      {
        slug: "rest-api-spring-boot",
        title: "REST API with Spring Boot",
        description:
          "Build production-grade REST APIs with Spring Boot — CRUD, validation, security, Swagger, and cloud deployment.",
        icon: "🍃",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
      {
        slug: "rest-api-django",
        title: "REST API with Django",
        description:
          "Master Django REST Framework — serializers, viewsets, authentication, throttling, and API best practices.",
        icon: "🎸",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
      {
        slug: "rest-api-nodejs",
        title: "REST API with NodeJS",
        description:
          "Build scalable REST APIs with Express/Fastify — middleware, JWT, rate limiting, and database integration.",
        icon: "💚",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
    ],
  },

  /* ── 7. Data Science & Analytics ────────────────────────────── */
  {
    slug: "data-science-analytics",
    label: "Data Science & Analytics",
    description:
      "Analyze data, build models, and extract actionable business insights. From spreadsheets to machine learning pipelines.",
    accent: "#1DAB6E",
    accentBg: "rgba(29,171,110,0.08)",
    accentBorder: "rgba(29,171,110,0.18)",
    accentGlow: "rgba(29,171,110,0.11)",
    emoji: "📊",
    courses: [
      {
        slug: "numpy-pandas",
        title: "NumPy & Pandas",
        description:
          "Data manipulation mastery — arrays, DataFrames, cleaning, transformation, aggregation, and visualization pipelines.",
        icon: "🐼",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "excel-powerbi",
        title: "Excel & PowerBI",
        description:
          "Business intelligence with Excel and PowerBI — dashboards, DAX, data modeling, and executive-level reporting.",
        icon: "📈",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
      },
      {
        slug: "machine-learning",
        title: "Machine Learning (SciPy, Sklearn)",
        description:
          "Build ML models from scratch — regression, classification, clustering, feature engineering, and model evaluation.",
        icon: "🤖",
        originalPrice: 5999,
        price: 2999,
        syllabusUrl: "#",
        badge: "new",
      },
      {
        slug: "ai-pytorch-nlp",
        title: "AI (PyTorch, NLP)",
        description:
          "Deep learning with PyTorch — neural networks, CNNs, RNNs, transformers, NLP, and deploying AI models.",
        icon: "🧠",
        originalPrice: 5999,
        price: 2999,
        syllabusUrl: "#",
        badge: "new",
      },
    ],
  },

  /* ── 8. Tools ───────────────────────────────────────────────── */
  {
    slug: "tools",
    label: "Tools",
    description:
      "Master the essential tools that power modern workplaces. From office productivity to DevOps and AI automation.",
    accent: "#E88C2A",
    accentBg: "rgba(232,140,42,0.08)",
    accentBorder: "rgba(232,140,42,0.18)",
    accentGlow: "rgba(232,140,42,0.11)",
    emoji: "🛠️",
    courses: [
      {
        slug: "ms-office-360",
        title: "MS Office 360",
        description:
          "Complete Microsoft Office suite — Word, Excel, PowerPoint, Outlook, and Teams for professional productivity.",
        icon: "📋",
        originalPrice: 1999,
        price: 999,
        syllabusUrl: "#",
      },
      {
        slug: "linux",
        title: "Linux",
        description:
          "Linux administration — commands, shell scripting, file systems, networking, and server management essentials.",
        icon: "🐧",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
        badge: "popular",
      },
      {
        slug: "mysql-tools",
        title: "MySQL",
        description:
          "MySQL database administration — installation, queries, optimization, backups, replication, and security hardening.",
        icon: "🗄️",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
      },
      {
        slug: "production-tools",
        title: "Production Tools (Jira, Grafana, Prometheus)",
        description:
          "DevOps and project management tools — Jira workflows, Grafana dashboards, Prometheus monitoring, and CI/CD.",
        icon: "📊",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "new",
      },
      {
        slug: "autocad-sketchup-revit",
        title: "AutoCAD, SketchUp, Revit",
        description:
          "Industry-standard design software — 2D/3D drafting, BIM modeling, architectural visualization, and rendering.",
        icon: "📐",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "tally-erp-sap",
        title: "Tally ERP & SAP",
        description:
          "Enterprise resource planning — GST accounting, inventory management, payroll processing, and financial reporting.",
        icon: "💰",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
      },
      {
        slug: "n8n-ai-agents",
        title: "N8N (AI Agents)",
        description:
          "Build AI-powered automation workflows with N8N — integrations, triggers, custom nodes, and intelligent agents.",
        icon: "🤖",
        originalPrice: 3999,
        price: 1999,
        syllabusUrl: "#",
        badge: "new",
      },
      {
        slug: "prompt-engineering",
        title: "Prompt Engineering Tools",
        description:
          "Master the art of AI prompting — ChatGPT, Claude, Midjourney, and building production AI workflows.",
        icon: "✍️",
        originalPrice: 2999,
        price: 1499,
        syllabusUrl: "#",
        badge: "bestseller",
      },
    ],
  },

  /* ── 9. AI & Mathematics (Coming Soon) ──────────────────────── */
  {
    slug: "ai-mathematics",
    label: "AI & Mathematics",
    description:
      "Deep mathematical foundations for AI — linear algebra, calculus, probability, and their applications in machine learning and AI systems.",
    accent: "#9B5CF6",
    accentBg: "rgba(155,92,246,0.08)",
    accentBorder: "rgba(155,92,246,0.18)",
    accentGlow: "rgba(155,92,246,0.11)",
    emoji: "🧮",
    comingSoon: true,
    courses: [
      {
        slug: "m1-m2-m3",
        title: "M1, M2, M3",
        description: "Mathematical foundations for AI — linear algebra, calculus, and probability theory.",
        icon: "📐",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "mlops",
        title: "MLOps",
        description: "Production ML systems — model deployment, monitoring, CI/CD for ML, and infrastructure.",
        icon: "⚙️",
        originalPrice: 5999,
        price: 2999,
        syllabusUrl: "#",
      },
      {
        slug: "ai-development",
        title: "AI Development",
        description: "End-to-end AI application development — from research to production systems.",
        icon: "🧠",
        originalPrice: 5999,
        price: 2999,
        syllabusUrl: "#",
      },
      {
        slug: "ml-engineering",
        title: "ML Engineering",
        description: "Machine learning engineering — pipelines, feature stores, model serving, and scaling.",
        icon: "🔬",
        originalPrice: 5999,
        price: 2999,
        syllabusUrl: "#",
      },
    ],
  },

  /* ── 10. Mobile Development (Coming Soon) ───────────────────── */
  {
    slug: "mobile-development",
    label: "Mobile Development",
    description:
      "Build native and cross-platform mobile applications. From iOS to Android — create apps that millions of users love.",
    accent: "#9B5CF6",
    accentBg: "rgba(155,92,246,0.08)",
    accentBorder: "rgba(155,92,246,0.18)",
    accentGlow: "rgba(155,92,246,0.11)",
    emoji: "📱",
    comingSoon: true,
    courses: [
      {
        slug: "flutter-dart",
        title: "Flutter & Dart",
        description: "Cross-platform mobile development with Flutter — widgets, state management, and native APIs.",
        icon: "🦋",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "react-native",
        title: "React Native",
        description: "Build mobile apps with React Native — navigation, native modules, and app store deployment.",
        icon: "⚛️",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
      {
        slug: "swift",
        title: "Swift",
        description: "iOS development with Swift — UIKit, SwiftUI, Core Data, and Apple ecosystem integration.",
        icon: "🍎",
        originalPrice: 4999,
        price: 2499,
        syllabusUrl: "#",
      },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────────── */

/** Look up a track by its URL slug */
export function getTrackBySlug(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

/** Get all track slugs (for generateStaticParams) */
export function getAllTrackSlugs(): string[] {
  return TRACKS.map((t) => t.slug);
}

/** Format price in INR */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
