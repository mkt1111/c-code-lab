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
            "Protecting sensitive data from unauthorized access",
            "Hiding implementation details from consumers",
            "Maintaining data integrity through validation",
            "Allowing internal changes without affecting external code"
          ],
          pitfalls: [
            "Over-exposing fields with public setters",
            "Using public fields instead of properties",
            "Not validating data in setters",
            "Breaking encapsulation with friend classes or reflection"
          ],
          bestPractices: [
            "Use private fields with public properties",
            "Implement validation in property setters",
            "Expose only what's necessary (minimal public API)",
            "Use init-only setters for immutable objects"
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
            "Creating specialized versions of existing classes",
            "Sharing common functionality across related classes",
            "Building class hierarchies (e.g., Shape → Circle, Rectangle)",
            "Framework extension points"
          ],
          pitfalls: [
            "Deep inheritance hierarchies (prefer composition)",
            "Inheriting just for code reuse (violates LSP)",
            "Fragile base class problem",
            "Tight coupling between base and derived classes"
          ],
          bestPractices: [
            "Favor composition over inheritance",
            "Keep inheritance hierarchies shallow (2-3 levels max)",
            "Use abstract classes for shared implementation",
            "Follow Liskov Substitution Principle",
            "Seal classes that shouldn't be inherited"
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
            "Processing collections of different object types uniformly",
            "Plugin architectures and extensibility",
            "Strategy pattern implementation",
            "Dependency injection and loose coupling"
          ],
          pitfalls: [
            "Overusing type checking with 'is' or 'as' (code smell)",
            "Not making base methods virtual when override is needed",
            "Forgetting to use 'override' keyword",
            "Breaking polymorphism with conditional logic based on type"
          ],
          bestPractices: [
            "Program to interfaces, not implementations",
            "Use virtual/override for runtime polymorphism",
            "Avoid type checking in polymorphic code",
            "Consider using interfaces for maximum flexibility"
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
            "Defining contracts without implementation details",
            "Creating framework extension points",
            "Simplifying complex systems for consumers",
            "Template method pattern implementation"
          ],
          pitfalls: [
            "Leaky abstractions that expose implementation details",
            "Over-abstraction leading to unnecessary complexity",
            "Abstract classes with too many abstract members",
            "Mixing abstraction levels within a class"
          ],
          bestPractices: [
            "Keep abstractions at a consistent level",
            "Use interfaces for pure abstraction",
            "Use abstract classes when shared implementation is needed",
            "Hide implementation details completely"
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
            "Separating business logic from data access",
            "Extracting validation into dedicated classes",
            "Separating UI concerns from domain logic",
            "Creating focused, testable components"
          ],
          pitfalls: [
            "God classes that do everything",
            "Over-fragmentation into too many tiny classes",
            "Misidentifying what constitutes a 'responsibility'",
            "Mixing logging, validation, and business logic"
          ],
          bestPractices: [
            "Ask 'What is the single purpose of this class?'",
            "If you can't describe it without using 'and', split it",
            "Separate data persistence from business rules",
            "Use dependency injection for collaborating classes"
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
            "Plugin systems and extensible architectures",
            "Adding new payment methods without modifying core code",
            "Strategy pattern for algorithm selection",
            "Decorator pattern for adding behaviors"
          ],
          pitfalls: [
            "Modifying existing code for every new requirement",
            "Using if/switch statements for type-based behavior",
            "Premature abstraction before patterns emerge",
            "Over-engineering simple scenarios"
          ],
          bestPractices: [
            "Use abstractions (interfaces/abstract classes)",
            "Implement Strategy pattern for varying behaviors",
            "Use composition and dependency injection",
            "Apply when you see patterns repeating"
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
            "Type-safe collections (List<T>, Dictionary<K,V>)",
            "Generic repositories for data access",
            "Reusable algorithms that work with any type",
            "Factory patterns with type safety"
          ],
          pitfalls: [
            "Not using constraints when operations require them",
            "Over-complicating with too many type parameters",
            "Runtime type checking instead of using constraints",
            "Forgetting that generic types are reference-equal"
          ],
          bestPractices: [
            "Use meaningful type parameter names (TEntity, TKey)",
            "Apply appropriate constraints for type safety",
            "Consider covariance/contravariance for interfaces",
            "Use where T : struct for value type constraints"
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
            "LINQ queries with lambda expressions",
            "Event-driven programming (UI, messaging)",
            "Callback patterns and async operations",
            "Strategy pattern with function delegates"
          ],
          pitfalls: [
            "Memory leaks from unsubscribed event handlers",
            "Capturing variables in closures unexpectedly",
            "Complex lambdas that should be named methods",
            "Not using null-conditional for event invocation"
          ],
          bestPractices: [
            "Use Func<>, Action<>, Predicate<> over custom delegates",
            "Always unsubscribe from events (IDisposable pattern)",
            "Use ?. for safe event invocation",
            "Keep lambdas simple; extract complex logic to methods"
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
            "Web API calls and HTTP requests",
            "Database queries and file I/O",
            "UI applications (keeping UI responsive)",
            "Processing multiple operations in parallel"
          ],
          pitfalls: [
            "Using async void (except for event handlers)",
            "Blocking on async code with .Result or .Wait()",
            "Forgetting ConfigureAwait(false) in libraries",
            "Not handling exceptions in async methods"
          ],
          bestPractices: [
            "Async all the way - don't mix sync and async",
            "Use async Task, not async void",
            "Use ConfigureAwait(false) in library code",
            "Use CancellationToken for cancellable operations"
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
            "Interface: defining contracts, multiple implementations",
            "Interface: dependency injection and mocking",
            "Abstract: sharing implementation across related classes",
            "Abstract: template method pattern"
          ],
          pitfalls: [
            "Using abstract class when only contract is needed",
            "Large interfaces that violate ISP",
            "Default interface methods creating diamond problems",
            "Forgetting that abstract classes have single inheritance"
          ],
          bestPractices: [
            "Prefer interfaces for contracts and DI",
            "Use abstract classes for shared implementation",
            "Keep interfaces small and focused",
            "Consider default interface methods for evolution"
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
            "Structs: small, immutable data (Point, DateTime)",
            "Classes: complex objects with identity",
            "Structs: performance-critical scenarios (avoiding GC)",
            "Records: immutable reference types with value semantics"
          ],
          pitfalls: [
            "Large structs causing stack overflow",
            "Mutable structs with unexpected behavior",
            "Boxing/unboxing performance overhead",
            "Comparing reference types with == instead of Equals"
          ],
          bestPractices: [
            "Keep structs small (<16 bytes ideally)",
            "Make structs immutable (readonly struct)",
            "Use class for complex objects with identity",
            "Use record for immutable data with value semantics"
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
            "ArrayList causes boxing for value types",
            "Inserting at beginning is O(n) for both",
            "Array resizing requires copying entire array",
            "Off-by-one errors with Length vs Count"
          ],
          bestPractices: [
            "Use List<T> by default, Array for fixed sizes",
            "Pre-size List<T> if count is known: new List<T>(capacity)",
            "Never use ArrayList in new code",
            "Use Array.Empty<T>() for empty arrays"
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
            "KeyNotFoundException when key doesn't exist",
            "Poor hash codes causing O(n) performance",
            "Modifying keys after insertion",
            "Assuming order is preserved (use SortedDictionary)"
          ],
          bestPractices: [
            "Use TryGetValue instead of ContainsKey + indexer",
            "Implement GetHashCode properly for custom keys",
            "Use HashSet<T> for existence checks, not List<T>.Contains",
            "Consider ImmutableDictionary for thread safety"
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
            "Ignoring hidden O(n) operations in loops",
            "LINQ methods with O(n) complexity (Contains, Count)",
            "Nested loops creating O(n²) unintentionally",
            "Assuming List<T>.Contains is O(1)"
          ],
          bestPractices: [
            "Know complexity of collection operations",
            "Use HashSet for O(1) Contains checks",
            "Profile before optimizing",
            "Consider amortized complexity for dynamic structures"
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
            "Making everything public 'just in case'",
            "Using protected when private would work",
            "Forgetting internal for assembly-only types",
            "Confusing protected internal with private protected"
          ],
          bestPractices: [
            "Default to private, expose only what's needed",
            "Use internal for implementation types",
            "Protected only when inheritance is intended",
            "Apply principle of least privilege"
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
            "const with values that might change (version numbers)",
            "Mutable static state causing threading issues",
            "Public const breaks compatibility when changed",
            "Static classes that are hard to mock/test"
          ],
          bestPractices: [
            "Use const only for true constants (Pi, MaxValue)",
            "Prefer static readonly for runtime-determined values",
            "Avoid mutable static state",
            "Use static for pure functions and factories"
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
            "Using new instead of override (hides, doesn't override)",
            "Calling virtual methods in constructors",
            "Abstract class with too many abstract members",
            "Forgetting virtual when override is needed"
          ],
          bestPractices: [
            "Seal classes that shouldn't be inherited",
            "Don't call virtual methods in constructors",
            "Use abstract for template method pattern",
            "Default to sealed, open only when needed"
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
            "Overusing ref/out when not needed",
            "Forgetting to check bool return with out",
            "in with small types (worse performance due to indirection)",
            "ref return creating dangling references"
          ],
          bestPractices: [
            "Prefer return values over out parameters",
            "Use tuples for multiple returns when appropriate",
            "Use in for large structs (>16 bytes)",
            "Use out with TryXxx pattern"
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
            "async void - can't await, exceptions lost",
            "Blocking with .Result or .Wait() - deadlocks",
            "Forgetting await - method runs but isn't awaited",
            "Excessive async for CPU-bound work"
          ],
          bestPractices: [
            "Async all the way - avoid mixing sync/async",
            "Use async Task, not async void (except event handlers)",
            "Suffix async methods with 'Async'",
            "Use ConfigureAwait(false) in library code"
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
            "Overusing ! to hide real null issues",
            "Deep ?. chains hiding logic errors",
            "Forgetting that ?. can still return null",
            "Using ! without certainty (NullReferenceException)"
          ],
          bestPractices: [
            "Enable nullable reference types project-wide",
            "Prefer ?? over ternary for null checks",
            "Use ??= for lazy/cached initialization",
            "Use ! only when you're certain (and add comment)"
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
            "Creating many short-lived large objects",
            "Finalizers delaying garbage collection",
            "Event handlers causing memory leaks",
            "Unnecessary allocations in loops"
          ],
          bestPractices: [
            "Avoid allocations in performance-critical loops",
            "Use object pooling for frequently created objects",
            "Prefer structs for small, short-lived data",
            "Use ArrayPool<T> for temporary arrays"
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
            "Span<T> can't be used in async methods",
            "Span<T> can't be stored in fields",
            "Escaping stack-allocated memory",
            "Large stackalloc causing stack overflow"
          ],
          bestPractices: [
            "Use Span for synchronous hot paths",
            "Use Memory for async scenarios",
            "Keep stackalloc sizes reasonable (<1KB)",
            "Use ReadOnlySpan for immutable views"
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
            "Using StringBuilder for 1-2 concatenations",
            "Not pre-sizing StringBuilder when size is known",
            "String.Join is often better than StringBuilder for arrays",
            "Forgetting StringBuilder is reference type (shared state)"
          ],
          bestPractices: [
            "Use + or $ for 1-3 small concatenations",
            "Use StringBuilder for loops or 4+ concatenations",
            "Pre-size StringBuilder: new StringBuilder(expectedLength)",
            "Use string.Join for collections"
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
            "Multiple enumeration of the same query",
            "LINQ in tight loops (delegate overhead)",
            "Count() instead of Any() for existence checks",
            "ToList() when you only need First()"
          ],
          bestPractices: [
            "Materialize with ToList/ToArray if used multiple times",
            "Use Any() instead of Count() > 0",
            "Consider manual loops for hot paths",
            "Measure before optimizing"
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
            "Using for I/O-bound operations (use async instead)",
            "Shared mutable state causing race conditions",
            "Small datasets where overhead exceeds benefit",
            "Ordering dependencies in parallel code"
          ],
          bestPractices: [
            "Use for CPU-bound, not I/O-bound work",
            "Ensure operations are thread-safe",
            "Limit parallelism to available cores",
            "Measure to confirm actual speedup"
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
