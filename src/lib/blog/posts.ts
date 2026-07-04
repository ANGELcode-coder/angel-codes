export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-apis-with-spring-boot",
    title: "Building Scalable REST APIs with Spring Boot",
    excerpt:
      "A comprehensive guide to building production-ready REST APIs using Spring Boot, JPA, and PostgreSQL with best practices for error handling, validation, and security.",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    tags: ["Java", "Spring Boot", "REST"],
    content: `
## Why Spring Boot?

Spring Boot makes it easy to create stand-alone, production-grade Spring-based applications. With its auto-configuration and opinionated defaults, you can get a REST API up and running in minutes.

## Setting Up the Project

Start with Spring Initializr and add the following dependencies:
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Validation
- Spring Security

\`\`\`java
@SpringBootApplication
public class ApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}
\`\`\`

## Creating the Entity

Define your JPA entity with proper annotations:

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String name;

    // getters and setters
}
\`\`\`

## Building the REST Controller

Use \`@RestController\` and \`@RequestMapping\` to define your API endpoints:

\`\`\`java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.status(201).body(userService.create(request));
    }
}
\`\`\`

## Error Handling

Implement a global exception handler with \`@ControllerAdvice\`:

\`\`\`java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        var errors = ex.getBindingResult().getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return ResponseEntity.badRequest().body(new ErrorResponse("Validation failed", errors));
    }
}
\`\`\`

## Security with JWT

Add Spring Security with JWT authentication for stateless API security:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
\`\`\`

## Database Configuration

Configure PostgreSQL in \`application.yml\`:

\`\`\`yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
\`\`\`

## Testing the API

Write integration tests with \`@SpringBootTest\` and \`TestRestTemplate\`:

\`\`\`java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserControllerTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateUser() {
        var request = new CreateUserRequest("john@example.com", "John");
        var response = restTemplate.postForEntity("/api/v1/users", request, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }
}
\`\`\`

## Conclusion

Spring Boot provides a solid foundation for building scalable REST APIs. Combined with JPA for database access, Validation for input checking, and Spring Security for authentication, you can build production-ready APIs quickly.
  `.trim(),
  },
  {
    slug: "nextjs-app-router-deep-dive",
    title: "Next.js App Router: A Deep Dive",
    excerpt:
      "Explore the Next.js App Router pattern — server components, layouts, data fetching, and how to build modern full-stack applications with React Server Components.",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    tags: ["Next.js", "React", "TypeScript"],
    content: `
## The App Router Revolution

Next.js 13+ introduced the App Router, a fundamental shift from the Pages Router. It's built on React Server Components, enabling better performance and a more intuitive file-based routing system.

## File-Based Routing

The App Router uses a directory-based routing system where folders define routes:

\`\`\`
app/
├── page.tsx          → /
├── layout.tsx        → Root layout
├── blog/
│   ├── page.tsx      → /blog
│   └── [slug]/
│       └── page.tsx  → /blog/:slug
└── api/
    └── hello/
        └── route.ts  → /api/hello
\`\`\`

## Server Components vs Client Components

By default, all components in the App Router are Server Components. They render on the server and send only HTML to the client:

\`\`\`tsx
// This is a Server Component (no 'use client' directive)
async function BlogList() {
  const posts = await db.post.findMany();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

Use \`'use client'\` when you need interactivity — state, effects, or event handlers:

\`\`\`tsx
'use client';

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
\`\`\`

## Data Fetching Patterns

The App Router simplifies data fetching with async components:

\`\`\`tsx
async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 3600 }, // ISR
  });
  return res.json();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
\`\`\`

## Layouts and Templates

Layouts persist across route changes and don't re-render:

\`\`\`tsx
// app/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>Blog navigation</nav>
      {children}
    </section>
  );
}
\`\`\`

## Loading and Error States

Built-in loading and error files handle async states gracefully:

\`\`\`tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>;
}

// app/blog/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
\`\`\`

## Conclusion

The App Router represents the future of Next.js. With Server Components, nested layouts, and simplified data fetching, it's a powerful paradigm for building modern web applications.
  `.trim(),
  },
  {
    slug: "react-native-cross-platform-development",
    title: "Cross-Platform Mobile Development with React Native",
    excerpt:
      "Learn how to build production-ready mobile apps for iOS and Android using React Native, Expo, and TypeScript with shared business logic and platform-specific UIs.",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    tags: ["React Native", "Expo", "Mobile"],
    content: `
## Why React Native?

React Native lets you build mobile apps using JavaScript and React. With a single codebase, you can target both iOS and Android, sharing up to 90% of your code.

## Setting Up with Expo

Expo is the recommended way to start a React Native project:

\`\`\`bash
npx create-expo-app@latest MyApp --template blank-typescript
cd MyApp
npx expo start
\`\`\`

Expo provides a managed workflow with built-in access to device APIs, OTA updates, and easy deployment.

## Project Structure

Organize your code for cross-platform sharing:

\`\`\`
src/
├── components/    # Shared UI components
├── screens/       # Screen-level components
├── navigation/    # React Navigation setup
├── hooks/         # Custom hooks
├── services/      # API and business logic
├── utils/         # Helper functions
└── platform.ts    # Platform-specific exports
\`\`\`

## Platform-Specific Code

Use the \`Platform\` API for platform-specific behavior:

\`\`\`tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 },
    }),
  },
});
\`\`\`

Use \`.ios.tsx\` and \`.android.tsx\` file extensions for entirely different implementations:

\`\`\`tsx
// Button.ios.tsx
export function Button(props: ButtonProps) {
  return <TouchableOpacity style={iosStyles.button} {...props} />;
}

// Button.android.tsx
export function Button(props: ButtonProps) {
  return <TouchableNativeFeedback>{/* ... */}</TouchableNativeFeedback>;
}
\`\`\`

## Navigation with React Navigation

Set up type-safe navigation:

\`\`\`tsx
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
\`\`\`

## State Management

For complex apps, use Zustand or Context + useReducer:

\`\`\`tsx
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (email, password) => {
    const user = await api.login(email, password);
    set({ user });
  },
  logout: () => set({ user: null }),
}));
\`\`\`

## Expo SDK Features

Expo provides a rich SDK for device features:

\`\`\`tsx
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';

// Pick an image
const result = await ImagePicker.launchImageLibraryAsync();
if (!result.canceled) {
  const uri = result.assets[0].uri;
}

// Send a notification
await Notifications.scheduleNotificationAsync({
  content: { title: 'Hello!', body: 'This is a notification' },
  trigger: { seconds: 5 },
});
\`\`\`

## Performance Optimizations

Key performance tips:

\`\`\`tsx
// Use FlashList for long lists
import { FlashList } from '@shopify/flash-list';

function PostList({ posts }: { posts: Post[] }) {
  return (
    <FlashList
      data={posts}
      estimatedItemSize={200}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}

// Memoize expensive computations
const sortedPosts = useMemo(() => {
  return [...posts].sort((a, b) => b.date - a.date);
}, [posts]);

// Lazy load screens
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
\`\`\`

## Conclusion

React Native with Expo is a powerful combination for cross-platform development. With shared business logic, platform-specific UIs, and a rich ecosystem of libraries, you can build production-quality mobile apps efficiently.
  `.trim(),
  },
];
