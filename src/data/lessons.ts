export interface Lesson {
  id: string;
  title: string;
  category: string;
  description: string;
  content: {
    definition: string;
    syntax?: string;
    useCases: string[];
    pitfalls: string[];
    bestPractices: string[];
    goodExample?: { code: string; explanation: string };
    badExample?: { code: string; explanation: string };
  };
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const categories: Category[] = [
  {
    id: "core-concepts",
    title: "Core Concepts",
    description: "Fundamental OOP principles and C# programming paradigms",
    icon: "🎯",
    lessons: [
      {
        id: "oop-encapsulation",
        title: "Encapsulation",
        category: "Core Concepts",
        description: "Bundling data and methods that operate on that data within a single unit",
        content: {
          definition: "Encapsulation is the bundling of data (fields) and methods that operate on that data within a single unit (class), while restricting direct access to some of the object's components. This is achieved through access modifiers.",
          syntax: `public class BankAccount
{
    private decimal _balance; // Hidden from outside
    
    public decimal Balance 
    { 
        get => _balance;
        private set => _balance = value; 
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0)
            _balance += amount;
    }
}`,
          useCases: [
            "Protecting sensitive data from unauthorized access - by hiding internal state, you prevent external code from putting objects into invalid states that could cause security vulnerabilities or data corruption",
            "Hiding implementation details from consumers - allows you to change how something works internally (like switching from an array to a list) without breaking code that uses your class",
            "Maintaining data integrity through validation - setters can enforce business rules (e.g., age must be positive, email must be valid) so the object is always in a consistent state",
            "Allowing internal changes without affecting external code - since consumers only interact with the public interface, you can refactor internals freely"
          ],
          pitfalls: [
            "Over-exposing fields with public setters defeats encapsulation - if any code can set any property to any value, you've essentially made the field public and lost all protection",
            "Using public fields instead of properties prevents you from adding validation, change notification, or lazy loading later without breaking all consuming code",
            "Not validating data in setters allows invalid state to creep in - once an object contains invalid data, every method must defensively check it, leading to bugs and complexity",
            "Breaking encapsulation with reflection or friend patterns makes code brittle - you're coupling to implementation details that may change, causing silent failures"
          ],
          bestPractices: [
            "Use private fields with public properties - this gives you a stable public contract while keeping implementation flexible; you can add logging, validation, or caching without API changes",
            "Implement validation in property setters to catch errors at the source - it's easier to debug 'invalid email in setter' than 'null reference somewhere downstream'",
            "Expose only what's necessary (minimal public API) - every public member is a commitment you must maintain; fewer public members mean more freedom to refactor",
            "Use init-only setters for immutable objects - combines the convenience of object initializers with the safety of immutability after construction"
          ],
          goodExample: {
            code: `public class Employee
{
    private string _email;
    
    public string Email
    {
        get => _email;
        set
        {
            if (!IsValidEmail(value))
                throw new ArgumentException("Invalid email");
            _email = value;
        }
    }
    
    private bool IsValidEmail(string email) => 
        email.Contains("@");
}`,
            explanation: "Validates data before setting, protecting invariants"
          },
          badExample: {
            code: `public class Employee
{
    public string Email; // Public field - no validation!
}

// Anyone can do:
employee.Email = "not-an-email";`,
            explanation: "Public fields allow invalid data and expose implementation"
          }
        }
      },
      {
        id: "oop-inheritance",
        title: "Inheritance",
        category: "Core Concepts",
        description: "Creating new classes based on existing classes",
        content: {
          definition: "Inheritance allows a class (derived/child) to inherit properties and methods from another class (base/parent), promoting code reuse and establishing a hierarchical relationship between classes.",
          syntax: `public class Animal // Base class
{
    public string Name { get; set; }
    public virtual void Speak() => Console.WriteLine("...");
}

public class Dog : Animal // Derived class
{
    public override void Speak() => Console.WriteLine("Woof!");
}`,
          useCases: [
            "Creating specialized versions of existing classes - when you have a true 'is-a' relationship (a Dog IS an Animal), inheritance lets derived classes reuse and extend base functionality naturally",
            "Sharing common functionality across related classes - abstract base classes can provide shared implementation while allowing customization through virtual/abstract methods",
            "Building class hierarchies for domain modeling (e.g., Shape → Circle, Rectangle) - when the hierarchy reflects real conceptual relationships, inheritance makes code intuitive",
            "Framework extension points - base classes in frameworks provide hooks (virtual methods) that applications can override to customize behavior"
          ],
          pitfalls: [
            "Deep inheritance hierarchies make code harder to understand and maintain - prefer composition where objects contain other objects rather than inheriting from them",
            "Inheriting just for code reuse violates the Liskov Substitution Principle (LSP) - if a derived class can't be used everywhere the base class is expected (because it changes behavior in unexpected ways), the inheritance relationship is semantically wrong. For example, a Square inheriting from Rectangle breaks LSP because setting width shouldn't also change height",
            "Fragile base class problem: changes to base class implementation can unexpectedly break derived classes that depend on internal behaviors, even if the public interface remains unchanged",
            "Tight coupling between base and derived classes means derived classes become dependent on base class implementation details, making both harder to modify independently"
          ],
          bestPractices: [
            "Favor composition over inheritance - ask 'does X HAVE a Y?' vs 'is X a Y?'; if it's a 'has-a' relationship, use composition; objects containing other objects are more flexible and testable",
            "Keep inheritance hierarchies shallow (2-3 levels max) - deep hierarchies make it hard to understand what any class actually does because behavior is scattered across many files",
            "Use abstract classes for shared implementation - when multiple derived classes need the same code, abstract base classes avoid duplication while interfaces define pure contracts",
            "Follow Liskov Substitution Principle - derived classes must be usable wherever base classes are expected without surprising behavior changes; if you need to check types, your hierarchy is wrong",
            "Seal classes that shouldn't be inherited - prevents unintended extension and communicates design intent; also enables compiler optimizations"
          ],
          goodExample: {
            code: `public abstract class Shape
{
    public abstract double CalculateArea();
}

public class Circle : Shape
{
    public double Radius { get; set; }
    public override double CalculateArea() => 
        Math.PI * Radius * Radius;
}`,
            explanation: "Clear hierarchy with meaningful override"
          },
          badExample: {
            code: `public class Stack : List<int> // DON'T DO THIS
{
    // Inherits Add, Insert, RemoveAt...
    // Stack should only have Push/Pop!
}`,
            explanation: "Inheriting for code reuse exposes unwanted methods"
          }
        }
      },
      {
        id: "oop-polymorphism",
        title: "Polymorphism",
        category: "Core Concepts",
        description: "Objects of different types responding to the same interface",
        content: {
          definition: "Polymorphism allows objects of different types to be treated as objects of a common base type. The same method call can behave differently depending on the actual object type at runtime.",
          syntax: `// Runtime polymorphism (method overriding)
Animal animal = new Dog();
animal.Speak(); // "Woof!" - calls Dog's implementation

// Compile-time polymorphism (method overloading)
public int Add(int a, int b) => a + b;
public double Add(double a, double b) => a + b;`,
          useCases: [
            "Processing collections of different object types uniformly - iterate over a List<Shape> and call Draw() on each; circles, rectangles, and triangles all respond appropriately without type checking",
            "Plugin architectures and extensibility - define an interface (IPlugin), and any new plugin can be loaded and executed without modifying the core application code",
            "Strategy pattern implementation - swap algorithms at runtime by injecting different strategy implementations (e.g., different sorting, pricing, or validation strategies)",
            "Dependency injection and loose coupling - depend on abstractions (interfaces), not concrete classes, so implementations can be swapped for testing or different environments"
          ],
          pitfalls: [
            "Overusing type checking with 'is' or 'as' is a code smell - if you're checking types to decide behavior, you're not using polymorphism; the type-specific behavior should be in the derived classes",
            "Not making base methods virtual when override is needed - without 'virtual', derived class methods hide rather than override, breaking polymorphism when using base type references",
            "Forgetting to use 'override' keyword - using 'new' instead of 'override' causes method hiding; the base method runs when called through a base type reference, causing subtle bugs",
            "Breaking polymorphism with conditional logic based on type - switch statements on types indicate missing polymorphism; each case should be a derived class with its own implementation"
          ],
          bestPractices: [
            "Program to interfaces, not implementations - declare variables and parameters as interface types; this makes code flexible and testable by allowing any conforming implementation",
            "Use virtual/override for runtime polymorphism - mark base methods virtual when derived classes might need different behavior; always use override (not new) in derived classes",
            "Avoid type checking in polymorphic code - if you need to check types, consider redesigning your hierarchy; polymorphism should eliminate the need for type-based branching",
            "Consider using interfaces for maximum flexibility - unlike abstract classes, interfaces allow multiple inheritance and don't consume the single inheritance slot"
          ],
          goodExample: {
            code: `public interface IPaymentProcessor
{
    void ProcessPayment(decimal amount);
}

public class PaymentService
{
    public void Pay(IPaymentProcessor processor, decimal amount)
    {
        processor.ProcessPayment(amount);
        // Works with ANY processor implementation
    }
}`,
            explanation: "Interface-based polymorphism allows any implementation"
          },
          badExample: {
            code: `public void Pay(object processor, decimal amount)
{
    if (processor is CreditCardProcessor cc)
        cc.ProcessCard(amount);
    else if (processor is PayPalProcessor pp)
        pp.ProcessPayPal(amount);
    // This defeats the purpose of polymorphism!
}`,
            explanation: "Type checking breaks polymorphism benefits"
          }
        }
      },
      {
        id: "oop-abstraction",
        title: "Abstraction",
        category: "Core Concepts",
        description: "Hiding complex implementation details behind simple interfaces",
        content: {
          definition: "Abstraction is the concept of hiding complex implementation details and exposing only the essential features of an object. It focuses on WHAT an object does rather than HOW it does it.",
          syntax: `public abstract class DatabaseConnection
{
    public abstract void Connect();
    public abstract void Execute(string query);
    public abstract void Disconnect();
    
    // Template method using abstract methods
    public void RunQuery(string query)
    {
        Connect();
        Execute(query);
        Disconnect();
    }
}`,
          useCases: [
            "Defining contracts without implementation details - interfaces and abstract classes specify WHAT must be done without dictating HOW, allowing multiple implementations",
            "Creating framework extension points - abstract methods force derived classes to provide specific functionality while the base class handles common orchestration",
            "Simplifying complex systems for consumers - hide intricate implementation behind a simple interface; users call SendEmail() without knowing about SMTP, retries, or templates",
            "Template method pattern implementation - abstract base class defines the algorithm skeleton, calling abstract methods that subclasses implement for specific steps"
          ],
          pitfalls: [
            "Leaky abstractions expose implementation details - if your IDatabase interface has methods like GetSqlConnection(), it reveals you're using SQL, making it impossible to swap to NoSQL later",
            "Over-abstraction adds unnecessary complexity - not every class needs an interface; if there's only one implementation and no testing/DI need, abstraction just adds indirection",
            "Abstract classes with too many abstract members become 'interface in disguise' - if there's no shared implementation, use an interface instead and preserve the inheritance slot",
            "Mixing abstraction levels within a class confuses consumers - a class shouldn't have high-level methods (ProcessOrder) mixed with low-level details (OpenDatabaseConnection)"
          ],
          bestPractices: [
            "Keep abstractions at a consistent level - all methods in an interface should be at the same conceptual level; don't mix business operations with infrastructure concerns",
            "Use interfaces for pure abstraction when you only need a contract - interfaces support multiple inheritance and are easier to mock in tests",
            "Use abstract classes when shared implementation is needed - abstract classes can provide common code while still enforcing that derived classes implement specific methods",
            "Hide implementation details completely - a good abstraction shouldn't leak; consumers shouldn't need to know or care how it works internally"
          ],
          goodExample: {
            code: `public interface IEmailService
{
    Task SendAsync(string to, string subject, string body);
}

// Consumer doesn't know if it's SMTP, SendGrid, etc.
public class NotificationService
{
    private readonly IEmailService _emailService;
    
    public async Task NotifyUser(User user, string message)
    {
        await _emailService.SendAsync(
            user.Email, "Notification", message);
    }
}`,
            explanation: "Clean abstraction hides email provider details"
          },
          badExample: {
            code: `public interface IEmailService
{
    SmtpClient GetSmtpClient(); // Leaky abstraction!
    void ConfigureSmtpSettings(SmtpSettings settings);
    Task SendAsync(string to, string subject, string body);
}`,
            explanation: "Exposing SMTP details defeats abstraction purpose"
          }
        }
      },
      {
        id: "solid-srp",
        title: "Single Responsibility Principle",
        category: "Core Concepts",
        description: "A class should have only one reason to change",
        content: {
          definition: "The Single Responsibility Principle (SRP) states that a class should have only one reason to change, meaning it should have only one job or responsibility. This promotes high cohesion and makes code easier to understand and maintain.",
          useCases: [
            "Separating business logic from data access - your OrderProcessor shouldn't know about SQL; separate repositories handle persistence, making business logic testable without databases",
            "Extracting validation into dedicated classes - EmailValidator focuses solely on email rules; changes to email validation don't affect order processing or user registration",
            "Separating UI concerns from domain logic - View components render data, but business rules live in separate services; UI changes don't break business logic",
            "Creating focused, testable components - small classes with one job are easy to unit test; you test validation separately from persistence separately from notification"
          ],
          pitfalls: [
            "God classes that do everything become unmaintainable - when a single class handles validation, persistence, notifications, and business rules, every change risks breaking unrelated functionality",
            "Over-fragmentation into too many tiny classes adds complexity - having 50 single-method classes can be worse than a few well-organized classes; find the right balance",
            "Misidentifying what constitutes a 'responsibility' leads to poor boundaries - 'responsibility' means 'reason to change'; if the same person/team changes both pieces together, they might belong together",
            "Mixing logging, validation, and business logic makes testing hard - when core logic depends on logging infrastructure, you can't test business rules without mocking loggers"
          ],
          bestPractices: [
            "Ask 'What is the single purpose of this class?' - if you can't answer in one simple sentence without using 'and', the class likely has multiple responsibilities",
            "If you can't describe it without using 'and', split it - 'validates and saves and notifies' clearly has three responsibilities that should be three classes",
            "Separate data persistence from business rules - business logic should be pure and testable; persistence is an infrastructure concern that changes for different reasons",
            "Use dependency injection for collaborating classes - when responsibilities are split, classes need to work together; DI keeps them loosely coupled and testable"
          ],
          goodExample: {
            code: `// Each class has ONE responsibility
public class OrderValidator
{
    public bool Validate(Order order) { /* validation */ }
}

public class OrderRepository
{
    public void Save(Order order) { /* persistence */ }
}

public class OrderNotifier
{
    public void NotifyCustomer(Order order) { /* email */ }
}

public class OrderService
{
    public void ProcessOrder(Order order)
    {
        _validator.Validate(order);
        _repository.Save(order);
        _notifier.NotifyCustomer(order);
    }
}`,
            explanation: "Each class has a single, clear responsibility"
          },
          badExample: {
            code: `public class Order
{
    public void Validate() { /* validation logic */ }
    public void Save() { /* database access */ }
    public void SendEmail() { /* email logic */ }
    public void GeneratePdf() { /* PDF generation */ }
    public void CalculateTax() { /* tax rules */ }
}`,
            explanation: "One class doing everything - hard to test and maintain"
          }
        }
      },
      {
        id: "solid-ocp",
        title: "Open/Closed Principle",
        category: "Core Concepts",
        description: "Open for extension, closed for modification",
        content: {
          definition: "The Open/Closed Principle states that software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to add new functionality without changing existing code.",
          useCases: [
            "Plugin systems and extensible architectures - new plugins are new classes implementing a plugin interface; the core system never needs modification to support new plugins",
            "Adding new payment methods without modifying core code - each payment type is a separate class implementing IPaymentProcessor; new types are added, not edited into switch statements",
            "Strategy pattern for algorithm selection - inject different sorting, pricing, or routing strategies without changing the code that uses them",
            "Decorator pattern for adding behaviors - wrap existing functionality with new layers (caching, logging, retry logic) without modifying the original classes"
          ],
          pitfalls: [
            "Modifying existing code for every new requirement violates OCP - if adding a new discount type requires editing the discount calculator, you'll eventually break existing functionality",
            "Using if/switch statements for type-based behavior is a code smell - every new type requires modifying the switch; polymorphism eliminates this pattern entirely",
            "Premature abstraction before patterns emerge wastes effort - don't create plugin architectures for a feature with only one implementation; wait until you see the need",
            "Over-engineering simple scenarios adds unnecessary complexity - not every feature needs to be extensible; apply OCP when you've experienced the pain of modification"
          ],
          bestPractices: [
            "Use abstractions (interfaces/abstract classes) - depend on abstractions so new concrete types can be added without changing dependent code",
            "Implement Strategy pattern for varying behaviors - encapsulate each algorithm variant in its own class; the context delegates to the current strategy without knowing which one",
            "Use composition and dependency injection - inject dependencies rather than instantiating them; this allows swapping implementations without code changes",
            "Apply when you see patterns repeating - if you've added a third payment type by copying switch cases, it's time to refactor to polymorphism"
          ],
          goodExample: {
            code: `public interface IDiscountStrategy
{
    decimal Calculate(decimal price);
}

public class RegularDiscount : IDiscountStrategy
{
    public decimal Calculate(decimal price) => price * 0.1m;
}

public class VIPDiscount : IDiscountStrategy
{
    public decimal Calculate(decimal price) => price * 0.2m;
}

// Adding new discount = new class, no modification!
public class HolidayDiscount : IDiscountStrategy
{
    public decimal Calculate(decimal price) => price * 0.3m;
}`,
            explanation: "New discounts added without touching existing code"
          },
          badExample: {
            code: `public decimal CalculateDiscount(Customer customer, decimal price)
{
    if (customer.Type == "Regular")
        return price * 0.1m;
    else if (customer.Type == "VIP")
        return price * 0.2m;
    else if (customer.Type == "Holiday") // Must modify!
        return price * 0.3m;
    // Every new type requires modification
}`,
            explanation: "Adding new types requires modifying existing code"
          }
        }
      },
      {
        id: "generics",
        title: "Generics & Type Constraints",
        category: "Core Concepts",
        description: "Writing type-safe, reusable code with generic types",
        content: {
          definition: "Generics allow you to define type-safe classes, interfaces, and methods with placeholders (type parameters) that are specified when the code is used. Type constraints restrict what types can be used as generic arguments.",
          syntax: `// Generic class with constraints
public class Repository<T> where T : class, IEntity, new()
{
    public T Create() => new T();
    public void Save(T entity) { }
}

// Generic method
public T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) > 0 ? a : b;

// Multiple type parameters
public class Pair<TKey, TValue> { }`,
          useCases: [
            "Type-safe collections (List<T>, Dictionary<K,V>) - generics eliminate casting and provide compile-time type checking; you can't accidentally add a string to a List<int>",
            "Generic repositories for data access - one Repository<T> class handles CRUD for any entity type, reducing code duplication while maintaining type safety",
            "Reusable algorithms that work with any type - a generic Sort<T>() method works for any comparable type; write once, use everywhere with full type safety",
            "Factory patterns with type safety - generic factories like Create<T>() return strongly-typed instances, avoiding casting and enabling IDE autocomplete"
          ],
          pitfalls: [
            "Not using constraints when operations require them - if your generic method calls .CompareTo(), you need 'where T : IComparable<T>' or you'll get compile errors or runtime exceptions",
            "Over-complicating with too many type parameters - a class with 5+ type parameters becomes hard to understand and use; consider if the design can be simplified",
            "Runtime type checking instead of using constraints defeats generics - if you're using 'if (typeof(T) == ...)' inside generic code, you're missing constraints or have the wrong abstraction",
            "Forgetting that generic types are reference-equal - List<int> and List<string> are different types at runtime; static fields aren't shared between closed generic types"
          ],
          bestPractices: [
            "Use meaningful type parameter names (TEntity, TKey) - 'T' is fine for simple cases, but descriptive names like TEntity, TValue, TRequest improve readability for complex generics",
            "Apply appropriate constraints for type safety - constraints like 'where T : class, new()' enable operations (null checks, instantiation) and catch errors at compile time",
            "Consider covariance/contravariance for interfaces - 'out T' (covariance) allows IEnumerable<Dog> to be used as IEnumerable<Animal>; 'in T' (contravariance) is the reverse",
            "Use 'where T : struct' for value type constraints - this enables Nullable<T> patterns and prevents boxing, ensuring your generic works correctly with value types"
          ],
          goodExample: {
            code: `public interface IRepository<T> where T : class, IEntity
{
    T GetById(int id);
    void Add(T entity);
}

public class GenericRepository<T> : IRepository<T> 
    where T : class, IEntity
{
    private readonly DbContext _context;
    
    public T GetById(int id) => 
        _context.Set<T>().Find(id);
}`,
            explanation: "Constraints ensure type safety and enable operations"
          },
          badExample: {
            code: `public class Repository<T>
{
    public T GetById(int id)
    {
        // Runtime check - defeats purpose of generics!
        if (typeof(T).IsClass)
            return (T)_context.Find(typeof(T), id);
        throw new InvalidOperationException();
    }
}`,
            explanation: "Runtime type checks indicate missing constraints"
          }
        }
      },
      {
        id: "delegates-events",
        title: "Delegates, Events & Lambdas",
        category: "Core Concepts",
        description: "Function references and event-driven programming",
        content: {
          definition: "Delegates are type-safe function pointers that allow methods to be passed as parameters. Events are a special kind of delegate for implementing the observer pattern. Lambdas are inline anonymous functions.",
          syntax: `// Delegate declaration
public delegate int MathOperation(int a, int b);

// Using built-in delegates
Func<int, int, int> add = (a, b) => a + b;
Action<string> log = msg => Console.WriteLine(msg);
Predicate<int> isEven = n => n % 2 == 0;

// Event declaration
public event EventHandler<OrderEventArgs> OrderPlaced;

// Lambda expression
list.Where(x => x.IsActive).Select(x => x.Name);`,
          useCases: [
            "LINQ queries with lambda expressions - lambdas make queries readable: users.Where(u => u.Age > 18) is cleaner than defining a separate IsAdult method",
            "Event-driven programming (UI, messaging) - events decouple publishers from subscribers; UI buttons don't need to know what handles their clicks",
            "Callback patterns and async operations - pass a delegate for 'when done' actions; the async method calls back without knowing who's listening",
            "Strategy pattern with function delegates - instead of creating strategy classes, pass Func<T> for simple strategies; less boilerplate for small behaviors"
          ],
          pitfalls: [
            "Memory leaks from unsubscribed event handlers - if object A subscribes to object B's event, B holds a reference to A; if B outlives A, A can't be garbage collected",
            "Capturing variables in closures unexpectedly - lambdas capture variables by reference; a loop variable captured in a lambda may have the final value, not the expected per-iteration value",
            "Complex lambdas that should be named methods - multi-line lambdas with logic are hard to debug and test; extract them into named methods for clarity and reusability",
            "Not using null-conditional for event invocation - checking 'if (Event != null)' then invoking creates a race condition in multithreaded code; use 'Event?.Invoke()'"
          ],
          bestPractices: [
            "Use Func<>, Action<>, Predicate<> over custom delegates - built-in delegate types are universally understood; custom delegates require developers to look up their signatures",
            "Always unsubscribe from events (IDisposable pattern) - implement IDisposable and unsubscribe in Dispose(); this prevents memory leaks when subscribers are discarded",
            "Use ?. for safe event invocation - 'OrderPlaced?.Invoke(this, args)' is thread-safe and null-safe; it atomically checks and invokes",
            "Keep lambdas simple; extract complex logic to methods - if a lambda has more than 2-3 lines or has complex logic, make it a named method for testability and debugging"
          ],
          goodExample: {
            code: `public class OrderService
{
    public event EventHandler<OrderEventArgs>? OrderPlaced;
    
    public void PlaceOrder(Order order)
    {
        // Process order...
        
        // Safe invocation with null-conditional
        OrderPlaced?.Invoke(this, new OrderEventArgs(order));
    }
}

// Clean unsubscription
public class OrderNotifier : IDisposable
{
    private readonly OrderService _service;
    
    public OrderNotifier(OrderService service)
    {
        _service = service;
        _service.OrderPlaced += OnOrderPlaced;
    }
    
    public void Dispose() => 
        _service.OrderPlaced -= OnOrderPlaced;
}`,
            explanation: "Safe event invocation and proper cleanup"
          },
          badExample: {
            code: `// Memory leak - never unsubscribes!
orderService.OrderPlaced += (s, e) => {
    // This lambda captures 'this' and can't be unsubscribed
    this.UpdateUI(e.Order);
};

// Unsafe invocation
if (OrderPlaced != null) // Race condition!
    OrderPlaced(this, args);`,
            explanation: "Lambda subscriptions and unsafe invocation cause issues"
          }
        }
      },
      {
        id: "async-await",
        title: "Async/Await & Task-based Programming",
        category: "Core Concepts",
        description: "Asynchronous programming for non-blocking operations",
        content: {
          definition: "Async/await is C#'s pattern for writing asynchronous code that looks synchronous. It uses Task and Task<T> to represent ongoing operations, freeing the calling thread while waiting for I/O operations.",
          syntax: `public async Task<string> GetDataAsync()
{
    using var client = new HttpClient();
    
    // Await releases the thread until response arrives
    var response = await client.GetAsync("https://api.example.com");
    
    return await response.Content.ReadAsStringAsync();
}

// Parallel async operations
var tasks = urls.Select(url => FetchAsync(url));
var results = await Task.WhenAll(tasks);`,
          useCases: [
            "Web API calls and HTTP requests - network I/O is naturally async; await releases the thread to handle other requests while waiting for the response",
            "Database queries and file I/O - disk and database operations block for milliseconds or longer; async keeps threads available for other work",
            "UI applications (keeping UI responsive) - async prevents the UI thread from freezing during long operations; the app stays responsive while work happens in the background",
            "Processing multiple operations in parallel - Task.WhenAll executes multiple async operations concurrently; great for calling multiple APIs or databases at once"
          ],
          pitfalls: [
            "Using async void (except for event handlers) - async void methods can't be awaited, and exceptions are lost or crash the app; always use async Task",
            "Blocking on async code with .Result or .Wait() causes deadlocks - in UI/ASP.NET contexts, the synchronization context waits for itself, freezing forever",
            "Forgetting ConfigureAwait(false) in libraries wastes resources - without it, library code captures unnecessary synchronization contexts, causing performance issues",
            "Not handling exceptions in async methods - exceptions become AggregateException when accessed via .Result; use try-catch or handle at the await site"
          ],
          bestPractices: [
            "Async all the way - don't mix sync and async - once you go async, all callers should be async up to the entry point; mixing causes complexity and deadlock risk",
            "Use async Task, not async void - Task allows callers to await completion and catch exceptions; void is only appropriate for event handlers",
            "Use ConfigureAwait(false) in library code - libraries shouldn't care about synchronization contexts; this improves performance and prevents deadlocks",
            "Use CancellationToken for cancellable operations - allows graceful cancellation of long-running operations; always pass tokens through your async call chain"
          ],
          goodExample: {
            code: `public async Task<User> GetUserAsync(
    int id, 
    CancellationToken ct = default)
{
    try
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Id == id, ct);
            
        if (user == null)
            throw new NotFoundException($"User {id} not found");
            
        return user;
    }
    catch (OperationCanceledException)
    {
        _logger.LogInformation("Operation cancelled");
        throw;
    }
}`,
            explanation: "Proper async with cancellation and error handling"
          },
          badExample: {
            code: `// DON'T block on async!
public User GetUser(int id)
{
    // This can cause deadlocks!
    return GetUserAsync(id).Result;
}

// DON'T use async void!
public async void LoadData() // Can't await, can't catch exceptions
{
    var data = await FetchDataAsync();
}`,
            explanation: "Blocking and async void cause deadlocks and lost exceptions"
          }
        }
      },
      {
        id: "interfaces-vs-abstract",
        title: "Interfaces vs Abstract Classes",
        category: "Core Concepts",
        description: "Choosing between interfaces and abstract classes for abstraction",
        content: {
          definition: "Interfaces define a contract with no implementation (before C# 8), while abstract classes can provide partial implementation. Interfaces support multiple inheritance; classes can only inherit one abstract class.",
          syntax: `// Interface - pure contract
public interface IRepository<T>
{
    T GetById(int id);
    void Add(T entity);
}

// Abstract class - partial implementation
public abstract class RepositoryBase<T>
{
    protected readonly DbContext _context;
    
    public abstract T GetById(int id);
    
    public virtual void Add(T entity)
    {
        _context.Set<T>().Add(entity);
    }
}`,
          useCases: [
            "Interface: defining contracts, multiple implementations - interfaces specify what a class can do; different classes implement the same interface differently (SQL vs MongoDB IRepository)",
            "Interface: dependency injection and mocking - depend on IEmailService, not SmtpEmailService; inject mocks for testing without sending real emails",
            "Abstract: sharing implementation across related classes - abstract base class provides common code (connection handling) while requiring subclasses to implement specifics (query execution)",
            "Abstract: template method pattern - abstract base defines the algorithm structure with abstract steps; derived classes implement the steps without changing the overall flow"
          ],
          pitfalls: [
            "Using abstract class when only contract is needed wastes inheritance - classes can inherit from only one class but many interfaces; don't use your one inheritance slot for a pure contract",
            "Large interfaces that violate Interface Segregation Principle (ISP) - if implementers must stub out methods they don't need, the interface is too big; split it into focused interfaces",
            "Default interface methods creating diamond problems - C# 8+ allows interface method implementations; if multiple interfaces provide conflicting defaults, you have ambiguity",
            "Forgetting that abstract classes have single inheritance limits - once you inherit from an abstract class, you can't inherit from another; this might force awkward designs later"
          ],
          bestPractices: [
            "Prefer interfaces for contracts and DI - interfaces are more flexible (multiple inheritance), easier to mock, and don't commit to implementation inheritance",
            "Use abstract classes for shared implementation - when derived classes need common code, abstract classes avoid duplication while still enforcing required overrides",
            "Keep interfaces small and focused - each interface should represent one capability (IComparable, IDisposable); combine them as needed: 'class X : IComparable, IDisposable'",
            "Consider default interface methods for evolution - adding new methods to interfaces traditionally breaks all implementers; default implementations allow extending interfaces without breaking existing code"
          ],
          goodExample: {
            code: `// Interface for contract
public interface IEmailSender
{
    Task SendAsync(Email email);
}

// Abstract class for shared logic
public abstract class EmailSenderBase : IEmailSender
{
    protected abstract Task SendCoreAsync(Email email);
    
    public async Task SendAsync(Email email)
    {
        Validate(email);
        await SendCoreAsync(email);
        Log(email);
    }
    
    private void Validate(Email email) { /* shared */ }
    private void Log(Email email) { /* shared */ }
}`,
            explanation: "Interface for contract, abstract class for shared logic"
          },
          badExample: {
            code: `// Forcing inheritance for no shared implementation
public abstract class PaymentProcessor
{
    public abstract void Process(Payment p);
    // No shared implementation - should be interface!
}

// Now can't inherit from anything else...
public class CreditCardProcessor : PaymentProcessor { }`,
            explanation: "Abstract class with no implementation wastes inheritance"
          }
        }
      },
      {
        id: "value-vs-reference",
        title: "Value Types vs Reference Types",
        category: "Core Concepts",
        description: "Understanding memory allocation and behavior differences",
        content: {
          definition: "Value types (struct, enum, primitives) store data directly and are allocated on the stack. Reference types (class, interface, delegate) store a reference to data allocated on the heap. This affects copying, comparison, and memory behavior.",
          syntax: `// Value type - copied by value
struct Point { public int X, Y; }
Point p1 = new Point { X = 1, Y = 2 };
Point p2 = p1; // Creates a copy
p2.X = 99;     // p1.X is still 1

// Reference type - copied by reference  
class Rectangle { public int Width, Height; }
Rectangle r1 = new Rectangle { Width = 10 };
Rectangle r2 = r1; // Same object!
r2.Width = 99;     // r1.Width is now 99`,
          useCases: [
            "Structs: small, immutable data (Point, DateTime, Money) - value semantics make sense when copies should be independent; changing one Point shouldn't affect another",
            "Classes: complex objects with identity - objects that 'are' something (a Customer, an Order) rather than 'hold' something; identity matters more than values",
            "Structs: performance-critical scenarios avoiding GC pressure - stack allocation means no GC overhead; useful in hot paths processing millions of small items",
            "Records: immutable reference types with value semantics - records combine reference type allocation with value-like equality and immutability; great for DTOs and domain objects"
          ],
          pitfalls: [
            "Large structs causing copying overhead - structs are copied entirely on assignment and parameter passing; large structs (>16 bytes) copy slowly, negating stack allocation benefits",
            "Mutable structs with unexpected behavior - modifying a struct through a property or indexer modifies a copy, not the original; changes mysteriously 'disappear'",
            "Boxing/unboxing performance overhead - when value types are used as objects (stored in ArrayList, passed to object parameter), they're boxed (copied to heap), causing allocations",
            "Comparing reference types with == instead of Equals - for classes, == checks reference equality by default; two different objects with same data are != unless you override"
          ],
          bestPractices: [
            "Keep structs small (<16 bytes ideally) - larger structs lose performance benefits; copying 100 bytes is slower than copying a pointer and benefits from heap allocation",
            "Make structs immutable (readonly struct) - 'readonly struct' prevents mutation, making behavior predictable; mutations should create new instances",
            "Use class for complex objects with identity - objects with behavior, relationships, and lifecycle are better as classes; structs are for simple data groupings",
            "Use record for immutable data with value semantics - records provide equality, ToString, and with-expressions for immutable data; ideal for DTOs and functional patterns"
          ],
          goodExample: {
            code: `// Immutable struct - safe and predictable
public readonly struct Money
{
    public decimal Amount { get; }
    public string Currency { get; }
    
    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }
    
    public Money Add(Money other) => 
        new Money(Amount + other.Amount, Currency);
}`,
            explanation: "Readonly struct prevents mutation issues"
          },
          badExample: {
            code: `// Mutable struct - dangerous!
public struct MutablePoint
{
    public int X, Y;
    public void Move(int dx, int dy) { X += dx; Y += dy; }
}

// Unexpected behavior with properties/indexers
list[0].Move(1, 1); // Modifies a COPY, not the original!`,
            explanation: "Mutable structs cause subtle bugs with boxing"
          }
        }
      }
    ]
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Essential collections and complexity analysis",
    icon: "📊",
    lessons: [
      {
        id: "arrays-lists",
        title: "Arrays & Lists",
        category: "Data Structures",
        description: "Ordered collections with index-based access",
        content: {
          definition: "Arrays are fixed-size, contiguous memory blocks with O(1) index access. List<T> is a dynamic array that grows automatically. ArrayList is the non-generic, legacy version that stores objects.",
          syntax: `// Array - fixed size
int[] numbers = new int[5];
int[] initialized = { 1, 2, 3, 4, 5 };

// List<T> - dynamic, generic
List<string> names = new List<string>();
names.Add("Alice");
names.AddRange(new[] { "Bob", "Charlie" });

// ArrayList - legacy, avoid
ArrayList legacy = new ArrayList();
legacy.Add(1);
legacy.Add("mixed types"); // No type safety!`,
          useCases: [
            "Array: fixed-size buffers, performance-critical code",
            "List<T>: most common collection needs",
            "Array: interop with native code",
            "List<T>: dynamic data with unknown size"
          ],
          pitfalls: [
            "ArrayList causes boxing for value types - every int added becomes an object on the heap; with List<int>, integers stay unboxed, saving memory and CPU",
            "Inserting at beginning is O(n) for both Array and List - all elements must shift right; if you frequently insert at the front, use LinkedList<T> instead",
            "Array resizing requires copying the entire array - when a List<T> grows past capacity, it allocates a new array and copies everything; pre-sizing avoids this",
            "Off-by-one errors with Length vs Count - arrays use .Length, lists use .Count; mixing them up causes subtle bugs when switching between types"
          ],
          bestPractices: [
            "Use List<T> by default, Array for fixed sizes - List<T> handles growth automatically; use arrays only when size is truly fixed or for interop scenarios",
            "Pre-size List<T> if count is known: new List<T>(capacity) - avoids repeated reallocations during population; especially important for large datasets",
            "Never use ArrayList in new code - it's a legacy type from before generics; List<T> is always better for type safety and performance",
            "Use Array.Empty<T>() for empty arrays - returns a cached empty array, avoiding allocation; better than 'new T[0]' which allocates each time"
          ],
          goodExample: {
            code: `// Pre-sized list for known count
public List<Product> GetProducts(int[] ids)
{
    var products = new List<Product>(ids.Length);
    
    foreach (var id in ids)
        products.Add(_repository.GetById(id));
    
    return products;
}

// Array for fixed, known data
private static readonly string[] Months = 
{ 
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
};`,
            explanation: "Pre-sizing prevents reallocations; arrays for fixed data"
          },
          badExample: {
            code: `// Boxing with ArrayList
ArrayList numbers = new ArrayList();
for (int i = 0; i < 1000000; i++)
    numbers.Add(i); // Boxing each int!

// Unknown size without pre-sizing
var results = new List<Result>();
foreach (var item in hugeCollection) // Many reallocations
    results.Add(Process(item));`,
            explanation: "Boxing wastes memory; no pre-sizing causes reallocations"
          }
        }
      },
      {
        id: "dictionaries-hashsets",
        title: "Dictionaries & HashSets",
        category: "Data Structures",
        description: "Hash-based collections for fast lookups",
        content: {
          definition: "Dictionary<TKey,TValue> stores key-value pairs with O(1) average lookup by key. HashSet<T> stores unique values with O(1) membership testing. Both use hash codes for fast access.",
          syntax: `// Dictionary - key-value pairs
var userById = new Dictionary<int, User>
{
    [1] = new User("Alice"),
    [2] = new User("Bob")
};
var user = userById[1]; // O(1) lookup

// HashSet - unique values
var uniqueIds = new HashSet<int> { 1, 2, 3 };
bool exists = uniqueIds.Contains(4); // O(1)
uniqueIds.Add(1); // No duplicate, returns false`,
          useCases: [
            "Dictionary: caching, lookups by ID, grouping",
            "HashSet: removing duplicates, membership testing",
            "Dictionary: indexing data for fast retrieval",
            "HashSet: set operations (union, intersection)"
          ],
          pitfalls: [
            "KeyNotFoundException when key doesn't exist - using dict[key] throws if key isn't present; always use TryGetValue or ContainsKey first in production code",
            "Poor hash codes causing O(n) performance - if GetHashCode returns the same value for many objects, all end up in one bucket, degrading to linear search",
            "Modifying keys after insertion corrupts the dictionary - hash tables find items by hash code; if the key's hash changes, the item becomes unfindable",
            "Assuming order is preserved (use SortedDictionary instead) - Dictionary doesn't guarantee order; if you need sorted keys, use SortedDictionary<K,V>"
          ],
          bestPractices: [
            "Use TryGetValue instead of ContainsKey + indexer - TryGetValue is a single lookup; ContainsKey followed by indexer is two lookups for the same key",
            "Implement GetHashCode properly for custom keys - hash codes should be stable, distributed evenly, and use all fields that affect equality",
            "Use HashSet<T> for existence checks, not List<T>.Contains - HashSet.Contains is O(1) average; List.Contains is O(n) and gets slow with large collections",
            "Consider ImmutableDictionary for thread safety - immutable collections can be safely shared across threads without locks; updates create new instances"
          ],
          goodExample: {
            code: `// TryGetValue pattern
public User? GetUser(int id)
{
    if (_cache.TryGetValue(id, out var user))
        return user;
    
    user = _database.GetUser(id);
    _cache[id] = user;
    return user;
}

// HashSet for fast lookups
public List<Order> GetActiveOrders(List<Order> all)
{
    var activeIds = new HashSet<int>(GetActiveIds());
    return all.Where(o => activeIds.Contains(o.Id)).ToList();
}`,
            explanation: "TryGetValue avoids double lookup; HashSet for O(1) Contains"
          },
          badExample: {
            code: `// Double lookup - inefficient!
if (_cache.ContainsKey(id))
    return _cache[id]; // Second lookup!

// O(n) Contains on List
var activeIds = GetActiveIds().ToList();
return orders.Where(o => activeIds.Contains(o.Id)); // O(n*m)!`,
            explanation: "Double lookup and List.Contains hurt performance"
          }
        }
      },
      {
        id: "queues-stacks",
        title: "Queues & Stacks",
        category: "Data Structures",
        description: "FIFO and LIFO data structures",
        content: {
          definition: "Queue<T> is First-In-First-Out (FIFO) - items are added at the end and removed from the front. Stack<T> is Last-In-First-Out (LIFO) - items are added and removed from the top. PriorityQueue<T,P> orders by priority.",
          syntax: `// Queue - FIFO
var queue = new Queue<string>();
queue.Enqueue("First");
queue.Enqueue("Second");
string first = queue.Dequeue(); // "First"

// Stack - LIFO
var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
int top = stack.Pop(); // 2

// PriorityQueue - by priority
var pq = new PriorityQueue<Task, int>();
pq.Enqueue(task, priority);`,
          useCases: [
            "Queue: job processing, message handling, BFS",
            "Stack: undo operations, expression parsing, DFS",
            "PriorityQueue: scheduling, Dijkstra's algorithm",
            "Stack: managing recursive operations iteratively"
          ],
          pitfalls: [
            "InvalidOperationException on empty Dequeue/Pop",
            "Not using TryDequeue/TryPeek in concurrent scenarios",
            "Stack overflow with deep recursion (use Stack<T>)",
            "PriorityQueue doesn't guarantee order for equal priorities"
          ],
          bestPractices: [
            "Use TryDequeue/TryPeek when collection might be empty",
            "Use Stack<T> to convert recursion to iteration",
            "Consider ConcurrentQueue for thread safety",
            "Use PriorityQueue over sorted lists for priority handling"
          ],
          goodExample: {
            code: `// Job processing with queue
public async Task ProcessJobsAsync(CancellationToken ct)
{
    while (!ct.IsCancellationRequested)
    {
        if (_jobQueue.TryDequeue(out var job))
            await ProcessAsync(job);
        else
            await Task.Delay(100, ct);
    }
}

// Iterative DFS with Stack
public void TraverseTree(Node root)
{
    var stack = new Stack<Node>();
    stack.Push(root);
    
    while (stack.TryPop(out var node))
    {
        Visit(node);
        foreach (var child in node.Children.Reverse())
            stack.Push(child);
    }
}`,
            explanation: "TryDequeue for safe access; Stack for iterative traversal"
          },
          badExample: {
            code: `// Exception on empty
while (true)
{
    var item = queue.Dequeue(); // Throws if empty!
    Process(item);
}

// Recursion can overflow
void Traverse(Node node) // Stack overflow on deep trees!
{
    Visit(node);
    foreach (var child in node.Children)
        Traverse(child);
}`,
            explanation: "No empty check; deep recursion causes stack overflow"
          }
        }
      },
      {
        id: "big-o-notation",
        title: "Big O Notation & Complexity",
        category: "Data Structures",
        description: "Understanding algorithm efficiency and scaling",
        content: {
          definition: "Big O notation describes how an algorithm's time or space requirements grow as input size increases. It focuses on the worst-case scenario and dominant terms, ignoring constants.",
          syntax: `// O(1) - Constant
dict[key]; array[index];

// O(log n) - Logarithmic
binarySearch(sortedArray, target);

// O(n) - Linear
list.Contains(item); foreach loop

// O(n log n) - Linearithmic
list.Sort(); Merge Sort

// O(n²) - Quadratic
nested foreach loops

// O(2ⁿ) - Exponential
recursive Fibonacci without memoization`,
          useCases: [
            "Choosing the right data structure",
            "Identifying performance bottlenecks",
            "Comparing algorithm alternatives",
            "Estimating scalability"
          ],
          pitfalls: [
            "Ignoring hidden O(n) operations in loops - calling list.Contains() inside a loop creates O(n²); use HashSet for O(n) total instead",
            "LINQ methods with O(n) complexity (Contains, Count) can surprise you - Count() enumerates the entire sequence unless it's ICollection; use Any() for existence",
            "Nested loops creating O(n²) unintentionally - double foreach loops often create quadratic complexity; consider hash-based lookups to linearize",
            "Assuming List<T>.Contains is O(1) when it's O(n) - Lists are not hash tables; for frequent lookups, copy data to a HashSet first"
          ],
          bestPractices: [
            "Know complexity of collection operations - List.Contains is O(n), Dictionary/HashSet is O(1); choosing wrong collection can make code 1000x slower",
            "Use HashSet for O(1) Contains checks - converting a list to HashSet is O(n), but then each lookup is O(1); pays off after just a few lookups",
            "Profile before optimizing - don't guess where bottlenecks are; use profilers to find actual hot paths before investing in optimization",
            "Consider amortized complexity for dynamic structures - ArrayList.Add is O(1) amortized despite occasional O(n) resizes; occasional expensive ops are fine"
          ],
          goodExample: {
            code: `// O(n) with HashSet for O(1) lookups
public List<int> FindDuplicates(int[] nums)
{
    var seen = new HashSet<int>();
    var duplicates = new List<int>();
    
    foreach (var num in nums) // O(n)
    {
        if (!seen.Add(num)) // O(1) average
            duplicates.Add(num);
    }
    return duplicates; // Total: O(n)
}`,
            explanation: "HashSet.Add returns false if item exists - O(n) total"
          },
          badExample: {
            code: `// O(n²) - checking list for each element
public List<int> FindDuplicates(int[] nums)
{
    var duplicates = new List<int>();
    
    foreach (var num in nums) // O(n)
    {
        // O(n) Contains check!
        if (duplicates.Contains(num) == false && 
            nums.Count(n => n == num) > 1) // O(n)!
            duplicates.Add(num);
    }
    return duplicates; // Total: O(n²) or worse!
}`,
            explanation: "List.Contains and LINQ Count are O(n) each iteration"
          }
        }
      }
    ]
  },
  {
    id: "keywords",
    title: "Keywords",
    description: "Essential C# keywords and their proper usage",
    icon: "🔑",
    lessons: [
      {
        id: "access-modifiers",
        title: "Access Modifiers",
        category: "Keywords",
        description: "Controlling visibility and accessibility of types and members",
        content: {
          definition: "Access modifiers control where types and members can be accessed from. C# provides six levels: public (anywhere), private (same class), protected (class + derived), internal (same assembly), protected internal (assembly OR derived), private protected (assembly AND derived).",
          syntax: `public class Example
{
    public int PublicField;           // Anywhere
    private int PrivateField;         // This class only
    protected int ProtectedField;     // This + derived classes
    internal int InternalField;       // Same assembly
    protected internal int ProtInt;   // Assembly OR derived
    private protected int PrivProt;   // Assembly AND derived
}

// Internal class - only visible in assembly
internal class InternalHelper { }`,
          useCases: [
            "public: APIs, DTOs, contracts",
            "private: implementation details, helper methods",
            "protected: extension points for derived classes",
            "internal: assembly-level utilities"
          ],
          pitfalls: [
            "Making everything public 'just in case' destroys encapsulation - public members are API commitments; once public, changing them breaks consumers",
            "Using protected when private would work exposes internals unnecessarily - protected members are inherited by derived classes; only use when inheritance requires it",
            "Forgetting internal for assembly-only types exposes implementation - helper classes used only within your library should be internal, not public",
            "Confusing protected internal with private protected - protected internal is OR (assembly OR derived); private protected is AND (assembly AND derived)"
          ],
          bestPractices: [
            "Default to private, expose only what's needed - start with everything private; only make things more accessible when consumers actually need it",
            "Use internal for implementation types - classes that support your public API but aren't part of it should be internal; keeps your public surface small",
            "Protected only when inheritance is intended - protected members invite subclassing; if the class shouldn't be subclassed, don't use protected",
            "Apply principle of least privilege - give the minimum access required for functionality; restricting access prevents misuse and simplifies future changes"
          ],
          goodExample: {
            code: `public class OrderService
{
    private readonly IOrderRepository _repository;
    private readonly ILogger _logger;
    
    public async Task<Order> GetOrderAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
    
    private void LogOperation(string op) =>
        _logger.LogInformation(op);
}`,
            explanation: "Public API methods, private implementation details"
          },
          badExample: {
            code: `public class OrderService
{
    public IOrderRepository Repository; // Exposed!
    public ILogger Logger;              // Exposed!
    
    public void LogOperation(string op) // Should be private!
    {
        Logger.LogInformation(op);
    }
}`,
            explanation: "Over-exposure allows misuse and creates tight coupling"
          }
        }
      },
      {
        id: "static-readonly-const",
        title: "static, readonly, const",
        category: "Keywords",
        description: "Static members and compile-time vs runtime constants",
        content: {
          definition: "static members belong to the type, not instances. const values are compile-time constants embedded in IL. readonly fields can only be assigned at declaration or in constructor, evaluated at runtime.",
          syntax: `public class Configuration
{
    // Compile-time constant - embedded in calling code
    public const int MaxRetries = 3;
    
    // Runtime constant - set once
    public static readonly DateTime StartTime = DateTime.Now;
    
    // Instance readonly - set in constructor
    public readonly string ConnectionString;
    
    // Static field
    private static int _instanceCount;
    
    public Configuration(string connStr)
    {
        ConnectionString = connStr;
        _instanceCount++;
    }
}`,
          useCases: [
            "const: mathematical constants, never-changing values",
            "readonly: configuration, injected dependencies",
            "static: shared state, factory methods, utilities",
            "static readonly: runtime constants (DateTime, Guid)"
          ],
          pitfalls: [
            "const with values that might change (version numbers) burns the value into compiled code - if you change the const, callers must recompile; use static readonly instead",
            "Mutable static state causing threading issues - static fields are shared across all threads; without synchronization, concurrent access causes race conditions",
            "Public const breaks binary compatibility when changed - the old value is embedded in compiled assemblies; changing it requires recompiling all dependent assemblies",
            "Static classes that are hard to mock/test - static methods can't be mocked with standard tools; consider instance methods with DI for testability"
          ],
          bestPractices: [
            "Use const only for true constants (Pi, MaxValue) - values that will never change in the history of the universe; mathematical constants and language limits",
            "Prefer static readonly for runtime-determined values - static readonly is evaluated at startup, not compile time; changing it only requires recompiling your assembly",
            "Avoid mutable static state - if you need shared state, use proper synchronization or dependency-injected services that manage state safely",
            "Use static for pure functions and factories - static methods that only use their parameters (no state) are safe and clear; factory methods often fit this pattern"
          ],
          goodExample: {
            code: `public static class MathConstants
{
    public const double Pi = 3.14159265359;
    public const double E = 2.71828182845;
}

public class ApiClient
{
    // Can change without recompiling callers
    public static readonly TimeSpan DefaultTimeout = 
        TimeSpan.FromSeconds(30);
    
    private readonly HttpClient _client;
    
    public ApiClient(HttpClient client)
    {
        _client = client;
        _client.Timeout = DefaultTimeout;
    }
}`,
            explanation: "const for true constants, static readonly for runtime values"
          },
          badExample: {
            code: `public class BadConstants
{
    // DANGER: Changing this requires recompiling ALL callers!
    public const string ApiVersion = "v2.1";
    
    // Mutable static state - threading nightmare
    public static List<User> AllUsers = new List<User>();
    
    // Should be readonly - can be changed after construction
    public string ConnectionString;
}`,
            explanation: "Versioned const and mutable statics cause issues"
          }
        }
      },
      {
        id: "virtual-override-sealed",
        title: "virtual, override, sealed, abstract",
        category: "Keywords",
        description: "Controlling inheritance and method overriding",
        content: {
          definition: "virtual allows method overriding in derived classes. override replaces a virtual method. sealed prevents further overriding. abstract requires implementation in derived classes. new hides (doesn't override) a base method.",
          syntax: `public abstract class Animal
{
    public abstract void Speak();        // Must override
    public virtual void Sleep() { }      // Can override
}

public class Dog : Animal
{
    public override void Speak() => Console.WriteLine("Woof");
    public sealed override void Sleep() { } // Can't override further
}

public sealed class Poodle : Dog
{
    // Can't override Sleep - it's sealed
    // Can't be inherited - class is sealed
}`,
          useCases: [
            "abstract: enforcing implementation in derived classes",
            "virtual: providing extension points",
            "sealed: preventing inheritance for security/perf",
            "override: specializing behavior in derived classes"
          ],
          pitfalls: [
            "Using new instead of override (hides, doesn't override) - 'new' creates a method with the same name that hides the base; polymorphism through base references calls the wrong method",
            "Calling virtual methods in constructors is dangerous - the derived class's override runs before the derived constructor; the object is in a partially initialized state",
            "Abstract class with too many abstract members is an interface in disguise - if there's no shared implementation, use an interface and preserve the inheritance slot for real reuse",
            "Forgetting virtual when override is needed prevents polymorphism - without virtual, derived methods hide rather than override; polymorphism through base type references fails"
          ],
          bestPractices: [
            "Seal classes that shouldn't be inherited - sealed prevents unintended inheritance, documents design intent, and enables compiler devirtualization optimizations",
            "Don't call virtual methods in constructors - the derived override runs with an uninitialized derived object; use factory methods or two-phase initialization instead",
            "Use abstract for template method pattern - abstract base defines the algorithm skeleton with abstract steps; derived classes implement steps without changing flow",
            "Default to sealed, open only when needed - make inheritance a deliberate design choice; sealing prevents misuse and signals that extension wasn't considered"
          ],
          goodExample: {
            code: `public abstract class PaymentProcessor
{
    public async Task<Result> ProcessAsync(Payment payment)
    {
        Validate(payment);
        var result = await ProcessCoreAsync(payment); // Template
        Log(result);
        return result;
    }
    
    protected abstract Task<Result> ProcessCoreAsync(Payment p);
    protected virtual void Validate(Payment p) { } // Optional
    private void Log(Result r) { }
}

public sealed class StripeProcessor : PaymentProcessor
{
    protected override Task<Result> ProcessCoreAsync(Payment p)
    {
        // Stripe-specific implementation
    }
}`,
            explanation: "Template method with abstract, sealed concrete class"
          },
          badExample: {
            code: `public class Base
{
    public void DoWork() { /* ... */ } // Not virtual!
}

public class Derived : Base
{
    public new void DoWork() { /* ... */ } // Hides, doesn't override!
}

Base b = new Derived();
b.DoWork(); // Calls Base.DoWork - NOT Derived!`,
            explanation: "new keyword hides method - polymorphism doesn't work"
          }
        }
      },
      {
        id: "ref-out-in",
        title: "ref, out, in Parameters",
        category: "Keywords",
        description: "Passing arguments by reference for performance and output",
        content: {
          definition: "ref passes by reference (must be initialized). out is for returning multiple values (caller must assign). in passes by readonly reference (optimization for large structs). All affect how arguments are passed to methods.",
          syntax: `// ref - read and modify
public void Swap(ref int a, ref int b)
{
    (a, b) = (b, a);
}

// out - must assign before return
public bool TryParse(string s, out int result)
{
    return int.TryParse(s, out result);
}

// in - readonly reference (no copy, can't modify)
public double CalculateDistance(in Point p1, in Point p2)
{
    return Math.Sqrt(Math.Pow(p2.X - p1.X, 2) + 
                     Math.Pow(p2.Y - p1.Y, 2));
}`,
          useCases: [
            "ref: modifying caller's variable",
            "out: TryParse pattern, multiple returns",
            "in: large struct optimization (avoid copying)",
            "ref return: returning references to internal data"
          ],
          pitfalls: [
            "Overusing ref/out when not needed complicates APIs - ref/out parameters are harder to call and understand; prefer return values when possible",
            "Forgetting to check bool return with out loses errors - TryParse returns false on failure; ignoring the return value means using uninitialized out parameter",
            "in with small types (worse performance due to indirection) - passing int by 'in' adds pointer indirection; 'in' only helps for large structs (>16 bytes)",
            "ref return creating dangling references is dangerous - returning ref to a local variable leaves a reference to deallocated stack space; causes undefined behavior"
          ],
          bestPractices: [
            "Prefer return values over out parameters - return values are cleaner: 'var result = Calculate()' vs 'Calculate(out var result)'; use out for TryParse patterns",
            "Use tuples for multiple returns when appropriate - '(int x, int y) = GetCoordinates()' is cleaner than multiple out parameters",
            "Use in for large structs (>16 bytes) to avoid copying - Matrix4x4 is 64 bytes; passing by 'in' passes a pointer (8 bytes) instead of copying all 64 bytes",
            "Use out with TryXxx pattern for safe parsing - 'if (TryParse(s, out var value))' is the idiomatic pattern for fallible conversions"
          ],
          goodExample: {
            code: `// Proper TryParse pattern
public bool TryGetUser(int id, out User user)
{
    user = _cache.Get(id);
    return user != null;
}

// Usage with out var
if (TryGetUser(42, out var user))
    Console.WriteLine(user.Name);

// in for large readonly struct
public readonly struct Matrix4x4 { /* 64 bytes */ }

public Matrix4x4 Multiply(in Matrix4x4 a, in Matrix4x4 b)
{
    // No copy of 64-byte structs!
}`,
            explanation: "TryXxx pattern with out; in prevents large copies"
          },
          badExample: {
            code: `// Overusing out - just return a tuple!
public void GetUserInfo(
    int id, 
    out string name, 
    out string email, 
    out int age)
{
    var user = GetUser(id);
    name = user.Name;
    email = user.Email;
    age = user.Age;
}

// Better: return tuple or object
public (string Name, string Email, int Age) GetUserInfo(int id)`,
            explanation: "Multiple out params are harder to use than returns"
          }
        }
      },
      {
        id: "async-await-keyword",
        title: "async, await",
        category: "Keywords",
        description: "Keywords for asynchronous programming",
        content: {
          definition: "async marks a method as asynchronous, allowing await inside it. await pauses execution until the awaited Task completes, releasing the thread for other work. The method returns when the awaited operation finishes.",
          syntax: `public async Task<string> FetchDataAsync()
{
    using var client = new HttpClient();
    
    // await releases thread, resumes when done
    var response = await client.GetAsync(url);
    
    // Continues on captured context (or thread pool)
    return await response.Content.ReadAsStringAsync();
}

// Async lambda
Func<Task<int>> asyncLambda = async () =>
{
    await Task.Delay(100);
    return 42;
};`,
          useCases: [
            "I/O-bound operations (HTTP, database, files)",
            "Keeping UI responsive during long operations",
            "Parallel I/O operations with WhenAll",
            "Asynchronous streams with IAsyncEnumerable"
          ],
          pitfalls: [
            "async void - can't await, exceptions lost - async void methods can't be awaited and unhandled exceptions crash the app or get swallowed; only use for event handlers",
            "Blocking with .Result or .Wait() - deadlocks in UI/ASP.NET - the synchronization context is blocked waiting for itself; the await never completes, freezing forever",
            "Forgetting await - method runs but isn't awaited - the task starts but caller doesn't wait for completion; errors are ignored and operations may be incomplete",
            "Excessive async for CPU-bound work wastes threads - async frees threads during I/O waits; CPU-bound work keeps threads busy, making async pointless overhead"
          ],
          bestPractices: [
            "Async all the way - avoid mixing sync/async - once you await something, all callers should await you; breaking the chain causes complexity and deadlock risk",
            "Use async Task, not async void (except event handlers) - Task allows awaiting and exception handling; async void is fire-and-forget with lost exceptions",
            "Suffix async methods with 'Async' for clarity - GetUserAsync() clearly indicates async; helps callers know to await and distinguishes from sync overloads",
            "Use ConfigureAwait(false) in library code - library code shouldn't capture UI contexts; this improves performance and prevents deadlocks when misused"
          ],
          goodExample: {
            code: `public async Task<List<User>> GetActiveUsersAsync(
    CancellationToken ct = default)
{
    var users = await _repository.GetAllAsync(ct);
    
    // Parallel async operations
    var tasks = users.Select(async u =>
    {
        u.LastSeen = await GetLastSeenAsync(u.Id, ct);
        return u;
    });
    
    return (await Task.WhenAll(tasks))
        .Where(u => u.IsActive)
        .ToList();
}`,
            explanation: "Proper async with cancellation and parallel operations"
          },
          badExample: {
            code: `// DON'T: async void
public async void SaveButton_Click(object sender, EventArgs e)
{
    await SaveAsync(); // Exception? Lost forever!
}

// DON'T: Blocking on async
public User GetUser(int id)
{
    return GetUserAsync(id).Result; // DEADLOCK!
}

// DON'T: Fire and forget without await
public void ProcessOrder(Order order)
{
    SendEmailAsync(order); // Not awaited - might not complete!
}`,
            explanation: "async void, blocking, and unawaited calls cause bugs"
          }
        }
      },
      {
        id: "nullable-operators",
        title: "Nullable Types & Operators",
        category: "Keywords",
        description: "Handling null safely with ??, ??=, ?., and !",
        content: {
          definition: "C# provides operators for null handling: ?? (null-coalescing, provide default), ??= (null-coalescing assignment), ?. (null-conditional member access), and ! (null-forgiving, suppress warnings).",
          syntax: `// ?? - null-coalescing (provide default)
string name = user?.Name ?? "Anonymous";

// ??= - null-coalescing assignment
_cache ??= new Dictionary<int, User>();

// ?. - null-conditional access
int? length = users?.FirstOrDefault()?.Name?.Length;

// ! - null-forgiving (I know it's not null)
string definitelyNotNull = GetValue()!;

// Nullable value type
int? nullableInt = null;
int value = nullableInt ?? 0;`,
          useCases: [
            "?? for default values when null",
            "??= for lazy initialization",
            "?. for safe navigation through object graphs",
            "! to suppress false-positive warnings (use sparingly)"
          ],
          pitfalls: [
            "Overusing ! to hide real null issues defeats null safety - ! tells the compiler to ignore null warnings; if you're wrong, you get NullReferenceException at runtime",
            "Deep ?. chains hiding logic errors make debugging hard - 'a?.b?.c?.d?.e' returns null if anything is null; you can't tell which link was null or why",
            "Forgetting that ?. can still return null requires handling - 'user?.Name' might be null; you often need ?? to provide a default after ?.",
            "Using ! without certainty (NullReferenceException) is risky - only use ! when you've verified non-null through other means the compiler can't see"
          ],
          bestPractices: [
            "Enable nullable reference types project-wide - '<Nullable>enable</Nullable>' in csproj; the compiler then warns about potential null issues at compile time",
            "Prefer ?? over ternary for null checks - 'x ?? default' is cleaner than 'x != null ? x : default'; intent is immediately clear",
            "Use ??= for lazy/cached initialization - '_cache ??= LoadCache()' is cleaner than 'if (_cache == null) _cache = LoadCache()'",
            "Use ! only when you're certain (and add comment) - document why you know it's not null: '// Validated in constructor' helps future maintainers"
          ],
          goodExample: {
            code: `public class UserService
{
    private Dictionary<int, User>? _cache;
    
    public User GetUser(int id)
    {
        // Lazy initialization with ??=
        _cache ??= new Dictionary<int, User>();
        
        // TryGetValue with ?? for default
        return _cache.TryGetValue(id, out var user)
            ? user
            : FetchAndCache(id);
    }
    
    public string GetDisplayName(User? user)
    {
        // Safe navigation with default
        return user?.Profile?.DisplayName 
            ?? user?.Email 
            ?? "Anonymous";
    }
}`,
            explanation: "Clean null handling with appropriate operators"
          },
          badExample: {
            code: `// Overusing null-forgiving operator
public void ProcessUser(User? user)
{
    // Hiding potential bug!
    var name = user!.Name!.ToUpper()!;
    var email = user!.Email!;
}

// Verbose null checks instead of operators
public string GetName(User? user)
{
    if (user != null)
        if (user.Name != null)
            return user.Name;
    return "Anonymous";
}`,
            explanation: "! hides bugs; verbose checks replace ?. and ??"
          }
        }
      }
    ]
  },
  {
    id: "optimization",
    title: "Optimization Techniques",
    description: "Performance optimization and memory management",
    icon: "⚡",
    lessons: [
      {
        id: "memory-management",
        title: "Memory Management & GC",
        category: "Optimization",
        description: "Understanding garbage collection and memory allocation",
        content: {
          definition: "The .NET Garbage Collector (GC) automatically manages memory, tracking object references and reclaiming unused memory. Understanding GC generations, allocation patterns, and how to minimize GC pressure is crucial for performance.",
          syntax: `// GC Generations
// Gen 0: Short-lived objects, frequent collection
// Gen 1: Buffer between short/long-lived
// Gen 2: Long-lived objects, expensive collection

// Force collection (rarely needed)
GC.Collect();
GC.WaitForPendingFinalizers();

// Large Object Heap (>85KB)
var largeArray = new byte[100_000]; // Goes to LOH

// Check memory
long memory = GC.GetTotalMemory(forceFullCollection: false);`,
          useCases: [
            "Reducing allocations in hot paths",
            "Understanding LOH for large objects",
            "Pooling objects to avoid allocation",
            "Identifying memory leaks with profilers"
          ],
          pitfalls: [
            "Creating many short-lived large objects (>85KB) causes LOH fragmentation - the Large Object Heap isn't compacted by default; many allocations create memory holes",
            "Finalizers delaying garbage collection hurt performance - objects with finalizers require two GC passes; the first pass schedules finalization, the second reclaims memory",
            "Event handlers causing memory leaks are common - subscribers hold references to publishers through events; if publishers live longer, subscribers can't be collected",
            "Unnecessary allocations in loops create GC pressure - each allocation in a hot loop means thousands of objects for GC to track and eventually collect"
          ],
          bestPractices: [
            "Avoid allocations in performance-critical loops - allocations trigger GC; in hot paths, reuse objects or use structs/stack allocation",
            "Use object pooling for frequently created objects - ArrayPool<T> and ObjectPool<T> recycle objects; rent, use, return, avoiding allocation/GC overhead",
            "Prefer structs for small, short-lived data - structs go on the stack (no GC) and are copied inline; perfect for temporary calculations in tight loops",
            "Use ArrayPool<T> for temporary arrays - ArrayPool<byte>.Shared.Rent() provides a buffer without allocation; Return() when done for reuse"
          ],
          goodExample: {
            code: `// Using ArrayPool to avoid allocations
public void ProcessData(byte[] input)
{
    byte[] buffer = ArrayPool<byte>.Shared.Rent(1024);
    try
    {
        // Use buffer...
    }
    finally
    {
        ArrayPool<byte>.Shared.Return(buffer);
    }
}

// Struct to avoid heap allocation
public readonly struct Point
{
    public readonly int X, Y;
    public Point(int x, int y) => (X, Y) = (x, y);
}`,
            explanation: "ArrayPool reuses arrays; structs stay on stack"
          },
          badExample: {
            code: `// Allocating in hot loop
public void ProcessItems(List<Item> items)
{
    foreach (var item in items)
    {
        // New array every iteration!
        var buffer = new byte[1024];
        Process(item, buffer);
    }
}

// Large object allocated and discarded
foreach (var file in files)
{
    var content = new byte[1_000_000]; // LOH!
    ReadFile(file, content);
}`,
            explanation: "Loop allocations and LOH thrashing hurt performance"
          }
        }
      },
      {
        id: "span-memory",
        title: "Span<T> & Memory<T>",
        category: "Optimization",
        description: "Zero-allocation slicing and memory views",
        content: {
          definition: "Span<T> provides a type-safe view over contiguous memory without allocation. It's a ref struct (stack-only). Memory<T> is similar but can be stored on heap. Both enable zero-copy slicing and parsing.",
          syntax: `// Span from array
int[] array = { 1, 2, 3, 4, 5 };
Span<int> span = array.AsSpan();
Span<int> slice = span.Slice(1, 3); // [2, 3, 4], no copy!

// Span from string (ReadOnlySpan<char>)
ReadOnlySpan<char> text = "Hello, World!".AsSpan();
ReadOnlySpan<char> hello = text[..5]; // "Hello"

// Stack allocation with Span
Span<byte> buffer = stackalloc byte[256];

// Memory<T> for async scenarios
Memory<byte> memory = new byte[1024];
await stream.ReadAsync(memory);`,
          useCases: [
            "High-performance parsing without substrings",
            "Zero-copy data slicing",
            "Stack allocation for temporary buffers",
            "Interop with native memory"
          ],
          pitfalls: [
            "Span<T> can't be used in async methods because it's a ref struct - ref structs must stay on the stack; async methods might suspend and resume on different threads/stacks",
            "Span<T> can't be stored in fields (heap allocation) - storing a Span would let stack memory escape; the compiler prevents this to avoid dangling references",
            "Escaping stack-allocated memory causes corruption - 'stackalloc' memory is only valid in the current method; returning or storing references to it is undefined behavior",
            "Large stackalloc causing stack overflow crashes the process - stack space is limited (~1MB); allocating too much causes immediate crash with no exception"
          ],
          bestPractices: [
            "Use Span for synchronous hot paths - Span enables zero-allocation string/array manipulation in performance-critical synchronous code",
            "Use Memory for async scenarios - Memory<T> is a class-based wrapper around buffers that can be stored and awaited; use when data must survive async boundaries",
            "Keep stackalloc sizes reasonable (<1KB) - estimate maximum stack usage; leave room for nested calls; use heap allocation for larger or variable sizes",
            "Use ReadOnlySpan for immutable views - ReadOnlySpan<char> for string slicing; prevents modification and makes intent clear"
          ],
          goodExample: {
            code: `// Zero-allocation parsing
public bool TryParseCoordinate(
    ReadOnlySpan<char> input, 
    out int x, 
    out int y)
{
    x = y = 0;
    int commaIndex = input.IndexOf(',');
    if (commaIndex < 0) return false;
    
    // No string allocations!
    return int.TryParse(input[..commaIndex], out x) &&
           int.TryParse(input[(commaIndex + 1)..], out y);
}

// Stack buffer for temporary work
public string ReverseString(string input)
{
    Span<char> buffer = stackalloc char[input.Length];
    input.AsSpan().CopyTo(buffer);
    buffer.Reverse();
    return new string(buffer);
}`,
            explanation: "No heap allocations for parsing or temporary buffers"
          },
          badExample: {
            code: `// Substring allocates new string!
public (int x, int y) ParseCoordinate(string input)
{
    int comma = input.IndexOf(',');
    string xStr = input.Substring(0, comma); // Allocates!
    string yStr = input.Substring(comma + 1); // Allocates!
    return (int.Parse(xStr), int.Parse(yStr));
}

// Heap allocation for temporary buffer
public string ReverseString(string input)
{
    var buffer = new char[input.Length]; // Heap!
    // ...
}`,
            explanation: "Substring and new arrays allocate on heap"
          }
        }
      },
      {
        id: "stringbuilder",
        title: "StringBuilder vs String Concatenation",
        category: "Optimization",
        description: "Efficient string building and manipulation",
        content: {
          definition: "Strings in C# are immutable - every modification creates a new string. StringBuilder maintains a mutable buffer, avoiding allocations when building strings incrementally. Use StringBuilder for loops or many concatenations.",
          syntax: `// String concatenation (each + creates new string)
string result = "";
for (int i = 0; i < 1000; i++)
    result += i.ToString(); // 1000 allocations!

// StringBuilder - mutable buffer
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
string result = sb.ToString(); // 1 final allocation

// String interpolation (OK for few values)
var message = $"User {name} logged in at {time}";`,
          useCases: [
            "Building strings in loops",
            "Generating large text (HTML, SQL, JSON)",
            "Multiple conditional string modifications",
            "When string length exceeds ~4 concatenations"
          ],
          pitfalls: [
            "Using StringBuilder for 1-2 concatenations is slower than + - StringBuilder has allocation overhead; for small, fixed concatenations, + is optimized by the compiler",
            "Not pre-sizing StringBuilder when size is known causes reallocations - StringBuilder doubles capacity when full; pre-sizing avoids intermediate allocations and copying",
            "String.Join is often better than StringBuilder for arrays - String.Join is optimized for joining arrays with separators; cleaner and often faster for that use case",
            "Forgetting StringBuilder is reference type (shared state) - if you pass a StringBuilder to methods, they modify the same instance; unexpected side effects are possible"
          ],
          bestPractices: [
            "Use + or $ for 1-3 small concatenations - the compiler optimizes small concatenation chains; StringBuilder overhead isn't worth it for a few operations",
            "Use StringBuilder for loops or 4+ concatenations - once you're building strings dynamically or in loops, StringBuilder avoids quadratic string copying",
            "Pre-size StringBuilder: new StringBuilder(expectedLength) - if you know the result will be ~1000 chars, allocate that upfront; avoids multiple reallocations",
            "Use string.Join for collections - 'string.Join(\", \", items)' is cleaner and faster than manually looping with StringBuilder for simple joining"
          ],
          goodExample: {
            code: `// Pre-sized StringBuilder for known scenario
public string GenerateCsv(List<Record> records)
{
    var sb = new StringBuilder(records.Count * 50);
    
    foreach (var record in records)
    {
        sb.Append(record.Id)
          .Append(',')
          .Append(record.Name)
          .AppendLine();
    }
    
    return sb.ToString();
}

// String.Join for arrays
public string FormatTags(string[] tags)
{
    return string.Join(", ", tags);
}`,
            explanation: "Pre-sized builder avoids reallocations; Join for arrays"
          },
          badExample: {
            code: `// String concatenation in loop - O(n²) time!
public string GenerateCsv(List<Record> records)
{
    string result = "";
    foreach (var record in records)
    {
        result += record.Id + ",";   // Allocates!
        result += record.Name + "\\n"; // Allocates again!
    }
    return result;
}

// Over-engineering simple case
public string Greet(string name)
{
    var sb = new StringBuilder();
    sb.Append("Hello, ");
    sb.Append(name);
    sb.Append("!");
    return sb.ToString();
    // Just use: return $"Hello, {name}!";
}`,
            explanation: "Loop concatenation is O(n²); StringBuilder overkill for simple cases"
          }
        }
      },
      {
        id: "linq-performance",
        title: "LINQ Performance Considerations",
        category: "Optimization",
        description: "Understanding LINQ overhead and optimization strategies",
        content: {
          definition: "LINQ provides elegant query syntax but can introduce overhead through delegate calls, iterator allocations, and deferred execution. Understanding when LINQ helps vs. hurts performance is key to optimization.",
          syntax: `// LINQ - elegant but has overhead
var adults = users.Where(u => u.Age >= 18)
                  .Select(u => u.Name)
                  .ToList();

// Multiple enumerations (BAD)
var filtered = users.Where(u => u.Active);
var count = filtered.Count();  // Enumerates
var first = filtered.First();  // Enumerates again!

// Deferred execution
var query = users.Where(u => u.Age > 18); // Not executed yet
var list = query.ToList(); // NOW it executes`,
          useCases: [
            "Data transformations and filtering",
            "Readability over micro-optimization",
            "Complex queries with multiple operations",
            "Prototyping before optimization"
          ],
          pitfalls: [
            "Multiple enumeration of the same query executes it multiple times - each Count(), First(), foreach on an IEnumerable re-executes the query; materialize with ToList() first",
            "LINQ in tight loops has delegate overhead - each Where/Select creates delegate invocations per element; in performance-critical code, manual loops avoid this overhead",
            "Count() instead of Any() for existence checks is wasteful - Count() enumerates everything to count; Any() stops at the first match, potentially 1000x faster",
            "ToList() when you only need First() materializes unnecessarily - ToList() builds the entire list; FirstOrDefault() stops after finding one element"
          ],
          bestPractices: [
            "Materialize with ToList/ToArray if used multiple times - if you'll enumerate results more than once, materialize once and reuse the list",
            "Use Any() instead of Count() > 0 for existence - Any() short-circuits on first match; Count() must see every element to count them all",
            "Consider manual loops for hot paths - LINQ is elegant but has overhead; in performance-critical code, explicit loops can be 2-10x faster",
            "Measure before optimizing - LINQ overhead often doesn't matter; profile to find actual bottlenecks before sacrificing readability"
          ],
          goodExample: {
            code: `// Materialize once, use multiple times
var activeUsers = users.Where(u => u.Active).ToList();
var count = activeUsers.Count;  // Property, not method
var first = activeUsers.FirstOrDefault();

// Any() is more efficient than Count()
if (users.Any(u => u.IsAdmin))
    ProcessAdminExists();

// Manual loop for hot path
public int SumEvenNumbers(int[] numbers)
{
    int sum = 0;
    for (int i = 0; i < numbers.Length; i++)
        if (numbers[i] % 2 == 0)
            sum += numbers[i];
    return sum;
}`,
            explanation: "Single enumeration, Any() over Count(), loops for hot paths"
          },
          badExample: {
            code: `// Multiple enumeration
var filtered = users.Where(u => u.Active);
Console.WriteLine($"Count: {filtered.Count()}"); // Enumerates
Console.WriteLine($"First: {filtered.First()}"); // Again!
foreach (var u in filtered) { } // Third time!

// Count for existence check
if (users.Where(u => u.IsAdmin).Count() > 0) // Counts ALL
    ProcessAdminExists();

// LINQ in tight loop
for (int i = 0; i < 1_000_000; i++)
{
    var sum = numbers.Where(n => n > 0).Sum(); // Allocations!
}`,
            explanation: "Multiple enumerations, Count vs Any, allocations in loops"
          }
        }
      },
      {
        id: "lazy-initialization",
        title: "Lazy Initialization",
        category: "Optimization",
        description: "Deferring expensive object creation until needed",
        content: {
          definition: "Lazy initialization delays the creation of an object until it's first accessed. Lazy<T> provides thread-safe lazy initialization with various thread-safety modes. This saves resources for objects that may never be used.",
          syntax: `// Lazy<T> - thread-safe by default
private readonly Lazy<ExpensiveObject> _lazy = 
    new Lazy<ExpensiveObject>(() => new ExpensiveObject());

public ExpensiveObject Instance => _lazy.Value;

// Lazy with specific thread-safety mode
new Lazy<T>(valueFactory, LazyThreadSafetyMode.ExecutionAndPublication);
new Lazy<T>(valueFactory, LazyThreadSafetyMode.PublicationOnly);
new Lazy<T>(valueFactory, LazyThreadSafetyMode.None);

// Double-check locking (manual approach)
if (_instance == null)
    lock (_lock)
        _instance ??= new ExpensiveObject();`,
          useCases: [
            "Expensive object creation that might not be needed",
            "Singleton pattern implementation",
            "Caching computed values",
            "Breaking circular dependencies"
          ],
          pitfalls: [
            "Exception in factory leaves Lazy in faulted state",
            "Thread-safety mode mismatch with usage pattern",
            "Over-using lazy for cheap objects (overhead)",
            "Memory leaks from holding expensive objects too long"
          ],
          bestPractices: [
            "Use Lazy<T> for thread-safe lazy initialization",
            "Choose appropriate LazyThreadSafetyMode",
            "Handle factory exceptions appropriately",
            "Consider if laziness is actually beneficial"
          ],
          goodExample: {
            code: `public class ConfigurationService
{
    // Thread-safe lazy initialization
    private readonly Lazy<Config> _config;
    
    public ConfigurationService(IConfigReader reader)
    {
        _config = new Lazy<Config>(
            () => reader.LoadConfig(),
            LazyThreadSafetyMode.ExecutionAndPublication);
    }
    
    public Config Config => _config.Value;
}

// Using ??= for simple cases
private Dictionary<string, User>? _userCache;
public Dictionary<string, User> UserCache => 
    _userCache ??= LoadUsers();`,
            explanation: "Lazy<T> for thread-safe, ??= for simple single-threaded"
          },
          badExample: {
            code: `// Race condition without proper locking
private ExpensiveObject? _instance;
public ExpensiveObject Instance
{
    get
    {
        if (_instance == null)
            _instance = new ExpensiveObject(); // Race!
        return _instance;
    }
}

// Unnecessary lazy for cheap object
private readonly Lazy<string> _name = 
    new Lazy<string>(() => "John"); // Overkill!`,
            explanation: "Race condition without Lazy; overkill for cheap objects"
          }
        }
      },
      {
        id: "parallel-processing",
        title: "Parallel Processing & PLINQ",
        category: "Optimization",
        description: "Leveraging multiple cores for CPU-bound operations",
        content: {
          definition: "Parallel.For/ForEach and PLINQ (AsParallel) execute operations across multiple CPU cores. Best for CPU-bound operations with large datasets. Can provide significant speedups but adds complexity and overhead.",
          syntax: `// Parallel.ForEach - parallel loop
Parallel.ForEach(items, item =>
{
    ProcessItem(item);
});

// Parallel.For with options
var options = new ParallelOptions 
{ 
    MaxDegreeOfParallelism = Environment.ProcessorCount 
};
Parallel.For(0, 1000, options, i => Process(i));

// PLINQ - parallel LINQ
var results = items
    .AsParallel()
    .WithDegreeOfParallelism(4)
    .Where(x => Filter(x))
    .Select(x => Transform(x))
    .ToList();`,
          useCases: [
            "CPU-bound computations (image processing, calculations)",
            "Processing large independent datasets",
            "Embarrassingly parallel problems",
            "Data transformation pipelines"
          ],
          pitfalls: [
            "Using for I/O-bound operations wastes threads (use async instead) - parallel execution holds threads blocked on I/O; async releases threads during waits, scaling better",
            "Shared mutable state causing race conditions corrupts data - multiple threads incrementing a counter or adding to a list without synchronization produces wrong results",
            "Small datasets where overhead exceeds benefit hurt performance - parallel execution has setup/coordination overhead; small collections run slower parallel than sequential",
            "Ordering dependencies in parallel code produce non-deterministic results - if items must be processed in order or depend on each other, parallel execution gives inconsistent results"
          ],
          bestPractices: [
            "Use for CPU-bound, not I/O-bound work - parallel execution saturates CPU cores; for I/O, use async to release threads during waits",
            "Ensure operations are thread-safe - either use thread-safe collections (ConcurrentBag), lock shared resources, or use pure functions with no shared state",
            "Limit parallelism to available cores - more parallel tasks than cores just adds context switching overhead; MaxDegreeOfParallelism = Environment.ProcessorCount",
            "Measure to confirm actual speedup - parallel overhead can exceed benefit; profile to ensure parallelization actually helps your workload"
          ],
          goodExample: {
            code: `// CPU-bound image processing
public void ProcessImages(List<string> imagePaths)
{
    Parallel.ForEach(
        imagePaths,
        new ParallelOptions { MaxDegreeOfParallelism = Environment.ProcessorCount },
        path =>
        {
            var image = LoadImage(path);
            var processed = ApplyFilters(image);
            SaveImage(processed, GetOutputPath(path));
        });
}

// PLINQ with thread-safe accumulation
var wordCounts = documents
    .AsParallel()
    .SelectMany(doc => doc.Split(' '))
    .GroupBy(word => word.ToLower())
    .ToDictionary(g => g.Key, g => g.Count());`,
            explanation: "Parallel for CPU work; thread-safe PLINQ operations"
          },
          badExample: {
            code: `// I/O-bound - should use async, not parallel!
Parallel.ForEach(urls, url =>
{
    var data = httpClient.GetStringAsync(url).Result; // Blocks thread!
});

// Shared mutable state - race condition!
int total = 0;
Parallel.ForEach(numbers, n =>
{
    total += n; // Race condition!
});

// Small dataset - overhead exceeds benefit
Parallel.ForEach(new[] { 1, 2, 3 }, n => Process(n));`,
            explanation: "Wrong use: I/O-bound, shared state, small datasets"
          }
        }
      }
    ]
  }
];

export function getAllLessons(): Lesson[] {
  return categories.flatMap(cat => cat.lessons);
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(lesson => lesson.id === id);
}

export function getCategoryByLessonId(lessonId: string): Category | undefined {
  return categories.find(cat => cat.lessons.some(l => l.id === lessonId));
}

export function getAdjacentLessons(lessonId: string): { prev?: Lesson; next?: Lesson } {
  const allLessons = getAllLessons();
  const index = allLessons.findIndex(l => l.id === lessonId);
  
  return {
    prev: index > 0 ? allLessons[index - 1] : undefined,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined
  };
}
