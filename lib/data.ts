import type { Project, BlogPost, Author, TechItem, Experience } from "@/types";

// Author data
export const author: Author = {
  id: "hikmet-gulsesli",
  name: "Hikmet Güleşli",
  title: "Full-Stack Developer & Systems Architect",
  bio: "Building high-performance applications with React, Next.js, and TypeScript. Focused on creating immersive digital interfaces that bridge the gap between human and machine.",
  social: {
    github: "https://github.com/hikmetgulsesli",
    linkedin: "https://linkedin.com/in/hikmetgulsesli",
    twitter: "https://twitter.com/hikmetgulsesli",
    email: "hikmet@hikmetgulsesli.com",
    stackoverflow: "https://stackoverflow.com/users/hikmetgulsesli",
  },
};

// Projects data
export const projects: Project[] = [
  {
    id: "vesta-dashboard",
    title: "Vesta Dashboard",
    slug: "vesta-dashboard",
    description:
      "Enterprise-grade IoT device management platform with real-time monitoring and analytics.",
    longDescription:
      "Vesta Dashboard provides comprehensive IoT device management capabilities for enterprise environments. Features include real-time device status monitoring, over-the-air firmware updates, detailed analytics with interactive charts, and a robust alert system. Built with scalability in mind using microservices architecture.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
    imageAlt: "Vesta Dashboard - IoT Device Management Platform",
    category: "WEB",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js"],
    githubUrl: "https://github.com/hikmetgulsesli/vesta-dashboard",
    liveUrl: "https://vesta-dashboard.vercel.app",
    featured: true,
    status: "completed",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "sentinel-dashboard",
    title: "Sentinel Dashboard",
    slug: "sentinel-dashboard",
    description:
      "Real-time network security monitoring interface with 3D packet visualization.",
    longDescription:
      "Sentinel is a security operations dashboard that provides real-time visibility into network traffic patterns. Features include interactive 3D visualizations of network packets, anomaly detection alerts, and comprehensive logging for incident response.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo",
    imageAlt: "Sentinel Dashboard - Network Security Monitor",
    category: "WEB",
    tags: ["React", "Three.js", "TypeScript", "Socket.io"],
    githubUrl: "https://github.com/hikmetgulsesli/sentinel",
    featured: true,
    status: "completed",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "claw-open-projects",
    title: "Claw Open Projects",
    slug: "claw-open-projects",
    description:
      "A decentralized collaboration platform for open-source hardware developers.",
    longDescription:
      "Claw Open Projects connects hardware developers worldwide, enabling collaborative design, version control for hardware schematics, and community-driven innovation. Features real-time collaborative editing, issue tracking, and integrated CAD viewer.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2vN7m8F1qR4vK8jT6xL3wZ9yH2nP5sQ0kO1jM4lA6dF8eG9hI0bJ3cK",
    imageAlt: "Claw Open Projects - Hardware Collaboration Platform",
    category: "AÇIK KAYNAK",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC"],
    githubUrl: "https://github.com/hikmetgulsesli/claw",
    liveUrl: "https://claw-open.vercel.app",
    featured: true,
    status: "completed",
    createdAt: new Date("2023-08-22"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "kinetic-store",
    title: "Kinetic Store",
    slug: "kinetic-store",
    description:
      "E-commerce platform specializing in mechanical keyboards and accessories.",
    longDescription:
      "Kinetic Store is a modern e-commerce experience built for the mechanical keyboard enthusiast community. Features include advanced product filtering, sound tests for switches, community reviews, and real-time inventory tracking.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4vN8n9G2qR5wL9jU7yM4xZ0aH3nP6tS1kO2jL5mA7dF9eG0hI1bJ3cK4d",
    imageAlt: "Kinetic Store - Mechanical Keyboard Shop",
    category: "FREELANCE",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    featured: false,
    status: "completed",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-09-30"),
  },
  {
    id: "dataflow-studio",
    title: "DataFlow Studio",
    slug: "dataflow-studio",
    description:
      "Visual programming environment for building and orchestrating data pipelines.",
    longDescription:
      "DataFlow Studio enables data engineers to build complex data pipelines through a visual interface. Features include drag-and-drop node editor, real-time execution monitoring, and seamless integration with major data warehouses.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuE5wO0pH3qS6xM1kV8nA5yN0bJ4oP7tT2kP3jL6mA8dF0eG1hI2bJ4cK5d",
    imageAlt: "DataFlow Studio - Visual Data Pipeline Builder",
    category: "WEB",
    tags: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    githubUrl: "https://github.com/hikmetgulsesli/dataflow",
    featured: false,
    status: "in-progress",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "mobiletek-android",
    title: "MobileTek",
    slug: "mobiletek-android",
    description:
      "Cross-platform mobile app for tracking technical interviews and job applications.",
    longDescription:
      "MobileTek helps software developers organize their job search by tracking application status, upcoming interviews, and company research. Features include calendar integration, push notifications, and detailed analytics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuF6xP1qI4rT7yN2lV9oB6zO0cK5pP8uU3kQ4jL7mA9dF1eG2hI3bJ5cK6d",
    imageAlt: "MobileTek - Job Application Tracker",
    category: "MOBIL",
    tags: ["React Native", "TypeScript", "Firebase", "Redux"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.mobiletek",
    featured: false,
    status: "completed",
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-07-15"),
  },
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "optimizing-react-60fps",
    title: "Optimizing React for 60fps and Beyond",
    slug: "optimizing-react-60fps",
    excerpt:
      "A deep dive into React performance optimization techniques for building buttery-smooth user interfaces.",
    content: `
## Introduction

Building performant React applications requires understanding how React works under the hood and knowing the right optimization techniques. In this article, we'll explore practical strategies to achieve consistent 60fps performance.

## Identifying Bottlenecks

Before optimizing, we need to identify where the performance issues lie. React DevTools Profiler is your best friend here. Look for components that:

- Render frequently without need
- Take too long to complete their render
- Cause cascading re-renders in child components

## Rendering Strategies

### 1. Code Splitting

Split your bundle to load only what's needed:

\`\`\`tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

### 2. Virtualization

For long lists, use windowing libraries like react-window or react-virtualized to render only visible items.

### 3. Memoization

Use React.memo, useMemo, and useCallback strategically:

\`\`\`tsx
const ExpensiveChild = React.memo(({ data }) => {
  // Only re-renders when data changes
  return <div>{/* expensive computation */}</div>;
});
\`\`\`

## Memoization Patterns

### useMemo for Computed Values

\`\`\`tsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
\`\`\`

### useCallback for Event Handlers

\`\`\`tsx
const handleClick = useCallback((id) => {
  doSomething(id);
}, [doSomething]);
\`\`\`

## Concurrent React

React 18's concurrent features allow us to build more responsive apps:

- **useTransition** for non-urgent updates
- **useDeferredValue** for debouncing values
- **Suspense** for async operations

## Conclusion

Performance optimization is an iterative process. Start with profiling, identify bottlenecks, and apply targeted fixes. Always measure before and after to ensure your changes actually improve performance.
    `,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuG7yQ2rJ5sT8zO3mW0pC7aO1dL6qQ9uV4kR5jM8nA0dF2eG3hI4bJ6cK7d",
    category: "Teknik",
    tags: ["React", "Performance", "TypeScript"],
    author: author,
    readTime: 12,
    published: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "future-ai-agents",
    title: "The Future of AI Agents in Development",
    slug: "future-ai-agents-development",
    excerpt:
      "Exploring how AI agents are reshaping software development workflows and what it means for developers.",
    content: `
## Introduction

AI agents are moving beyond simple chat interfaces into autonomous systems that can reason, plan, and execute complex tasks. This shift is fundamentally changing how we think about software development.

## What Are AI Agents?

At their core, AI agents are systems that can:

- Understand complex, multi-step goals
- Break down tasks into actionable steps
- Use tools and external resources
- Learn from feedback and improve

## Current State

Today's AI agents can already:

- Write and debug code
- Search documentation
- Run terminal commands
- Manage files and projects
- Coordinate with other agents

## The Development Workflow of Tomorrow

Imagine a world where:

1. You describe a feature in natural language
2. An agent breaks this into tasks
3. Multiple specialized agents work in parallel
4. Code is written, tested, and reviewed automatically
5. Human oversight is minimal but present

## Challenges Ahead

### Reliability

Agents still make mistakes. We need better ways to verify their outputs.

### Context Window Limitations

Long conversations can exceed context limits. We need smarter memory management.

### Security Implications

Agents with tool access require careful security boundaries.

## Conclusion

The future belongs to developers who learn to collaborate with AI agents effectively. Those who master this skill will be dramatically more productive than those who don't.
    `,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuH8zR3sK6tT9aO4nX1qD8bP2eL7rR0vW5kS6jN9oA1dF3eG4hI5bJ7cK8d",
    category: "Teknik",
    tags: ["AI", "Development", "Future"],
    author: author,
    readTime: 8,
    published: true,
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
  },
  {
    id: "rust-vs-wasm",
    title: "Rust vs WASM: The Performance Frontier",
    slug: "rust-vs-wasm-performance",
    excerpt:
      "Exploring binary compilation targets for browser-based computation and when to use each.",
    content: `
## Introduction

When performance matters in web applications, developers often face a choice: Rust compiled to WebAssembly, or pure JavaScript with careful optimization. Let's explore when each approach shines.

## Understanding the Trade-offs

### JavaScript's Strengths

- No build step required
- Garbage collected (no memory management)
- Massive ecosystem
- Just-in-time compilation can be very fast

### Rust + WASM Advantages

- Predictable, deterministic performance
- True multi-threading (SharedArrayBuffer)
- Memory control without garbage collection
- Access to Rust's powerful ecosystem

## Benchmark Results

In our tests with a particle simulation:

- **Pure JS**: ~45fps with 10,000 particles
- **Rust/WASM**: ~60fps with 50,000 particles

The gap widens significantly with computational complexity.

## When to Use Each

### Choose JavaScript when:

- Performance isn't critical
- You need maximum ecosystem compatibility
- Team lacks Rust experience

### Choose Rust/WASM when:

- Real-time graphics or simulations
- Cryptographic operations
- Image/video processing
- Scientific computations

## Conclusion

For most web applications, well-optimized JavaScript is sufficient. But for performance-critical paths, Rust + WASM can provide 10x+ improvements.
    `,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuI9aT4sL7uU0bP5oY2rE9cQ3fM8sS1vX6kT7jN0oA2dF4eG5hI6bJ8cK9d",
    category: "Teknik",
    tags: ["Rust", "WebAssembly", "Performance"],
    author: author,
    readTime: 10,
    published: true,
    createdAt: new Date("2024-08-12"),
    updatedAt: new Date("2024-08-12"),
  },
  {
    id: "realtime-websockets",
    title: "Custom Hooks for Real-time WebSockets",
    slug: "custom-hooks-websockets",
    excerpt:
      "Building robust WebSocket connections in React with proper state management and reconnection logic.",
    content: `
## Introduction

WebSockets enable real-time bidirectional communication, but managing them in React applications can be tricky. Let's build a robust custom hook.

## The Challenge

WebSocket connections can:

- Drop unexpectedly
- Need reconnection logic
- Have message ordering issues
- Handle backpressure

## Building useWebSocket Hook

\`\`\`typescript
function useWebSocket(url: string) {
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus('open');
    ws.onclose = () => setStatus('closed');
    ws.onmessage = (event) => setLastMessage(JSON.parse(event.data));

    return () => ws.close();
  }, [url]);

  return { status, lastMessage, send: wsRef.current?.send };
}
\`\`\`

## Advanced Features

### Automatic Reconnection

Implement exponential backoff for reconnection attempts.

### Message Queuing

Queue messages sent while disconnected.

### Heartbeat

Keep connections alive with ping/pong messages.

## Conclusion

A well-designed WebSocket hook abstracts away the complexity, letting components focus on what to do with the data.
    `,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuJ0bU5tM8vV1cQ6pZ3sF0dR4gN9tT2vY7kU8jO1pA3dF5eG6hI7bJ9cK0d",
    category: "Teknik",
    tags: ["React", "WebSocket", "TypeScript"],
    author: author,
    readTime: 9,
    published: true,
    createdAt: new Date("2024-07-05"),
    updatedAt: new Date("2024-07-05"),
  },
  {
    id: "death-of-minimalism",
    title: "The Death of Minimalism in UI",
    slug: "death-of-minimalism-ui",
    excerpt:
      "Why density and data-rich interfaces are returning to the mainstream in modern web applications.",
    content: `
## Introduction

For a decade, minimalism dominated UI design. Clean white spaces, flat design, and "less is more" were the mantras. Now, we're seeing a shift toward richer, denser interfaces.

## Why the Change?

### Information Density Matters

Power users want more information visible at once. Trading platforms, developer tools, and analytics dashboards never fully adopted minimalism for good reason.

### Mobile Constraints Push Desktop Complexity

When mobile forced simplicity there, desktop applications could afford more complexity without overwhelming users.

### User Expectation Evolution

Users today are more sophisticated. They expect powerful tools, not dumbed-down experiences.

## The New Aesthetic

The emerging style features:

- **Darker themes** with vibrant accent colors
- **Data-dense layouts** with clear hierarchy
- **Monospace typography** for technical content
- **Borders and dividers** over whitespace
- **Terminal-inspired interfaces**

## Balancing Act

Density without chaos requires careful attention to:

- Visual hierarchy through color and size
- Consistent spacing and alignment
- Strategic use of whitespace
- Clear interaction patterns

## Conclusion

Minimalism isn't dead—it's found its proper context. But for data-rich applications, a denser aesthetic often serves users better.
    `,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuK1cV6uN9wW2dR7qA4tG1eS5hO0uU3vZ8kV9jP2pA4dF6eG7hI8bJ0cK1d",
    category: "Teknik",
    tags: ["UI Design", "Trends", "UX"],
    author: author,
    readTime: 7,
    published: true,
    createdAt: new Date("2024-06-28"),
    updatedAt: new Date("2024-06-28"),
  },
];

// Tech stack data
export const techStack: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    proficiency: 95,
    description: "Component-based UI library",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    proficiency: 92,
    description: "React framework with SSR and routing",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    proficiency: 90,
    description: "Typed JavaScript superset",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    proficiency: 88,
    description: "Utility-first CSS framework",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    proficiency: 85,
    description: "JavaScript runtime",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    proficiency: 82,
    description: "Advanced relational database",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    proficiency: 78,
    description: "Document-oriented database",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    proficiency: 80,
    description: "Container platform",
  },
  {
    id: "aws",
    name: "AWS",
    category: "DevOps",
    proficiency: 75,
    description: "Cloud infrastructure",
  },
  {
    id: "rust",
    name: "Rust",
    category: "Currently Learning",
    proficiency: 40,
    description: "Systems programming language",
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Backend",
    proficiency: 77,
    description: "Query language for APIs",
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    proficiency: 73,
    description: "In-memory data store",
  },
];

// Experience data
export const experiences: Experience[] = [
  {
    id: "senior-fullstack",
    title: "Senior Full-Stack Developer",
    company: "Kinetic Labs",
    location: "İstanbul, Türkiye",
    startDate: new Date("2022-03-01"),
    current: true,
    description:
      "Leading development of enterprise SaaS products. Architecting microservices, mentoring junior developers, and driving technical decisions.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    createdAt: new Date("2022-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Developer",
    company: "TechStart İstanbul",
    location: "İstanbul, Türkiye",
    startDate: new Date("2019-06-01"),
    endDate: new Date("2022-02-28"),
    current: false,
    description:
      "Built and maintained multiple client projects. Implemented CI/CD pipelines and established coding standards.",
    technologies: ["React", "Vue.js", "Python", "MongoDB", "Docker"],
    createdAt: new Date("2019-06-01"),
    updatedAt: new Date("2022-02-28"),
  },
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    company: "Digital Agency",
    location: "Ankara, Türkiye",
    startDate: new Date("2017-09-01"),
    endDate: new Date("2019-05-31"),
    current: false,
    description:
      "Developed responsive web applications for clients across various industries. Specialized in animation and interactive interfaces.",
    technologies: ["JavaScript", "CSS3", "WordPress", "PHP"],
    createdAt: new Date("2017-09-01"),
    updatedAt: new Date("2019-05-31"),
  },
];

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.published);
}

export function getBlogPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
