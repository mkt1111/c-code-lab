export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Core Concepts - OOP
  {
    id: "q1",
    question: "What is encapsulation in object-oriented programming?",
    correctAnswer: "Bundling data and methods together while restricting direct access to internal data",
    wrongAnswers: [
      "Creating multiple classes with the same name",
      "Inheriting all properties from a parent class",
      "Converting objects to strings for serialization",
      "Using interfaces instead of abstract classes",
      "Making all class members public for easy access"
    ],
    explanation: "Encapsulation bundles data and methods into a single unit while hiding internal implementation details through access modifiers like private.",
    category: "Core Concepts"
  },
  {
    id: "q2",
    question: "Which access modifier allows access only within the same class?",
    correctAnswer: "private",
    wrongAnswers: [
      "public",
      "protected",
      "internal",
      "protected internal",
      "sealed"
    ],
    explanation: "The private modifier restricts access to the containing class only, providing the highest level of encapsulation.",
    category: "Keywords"
  },
  {
    id: "q3",
    question: "What is the primary difference between an interface and an abstract class?",
    correctAnswer: "A class can implement multiple interfaces but inherit from only one abstract class",
    wrongAnswers: [
      "Interfaces are faster than abstract classes",
      "Abstract classes cannot have methods with implementation",
      "Interfaces can have constructors while abstract classes cannot",
      "Abstract classes can only be used with sealed classes",
      "Interfaces must have at least one abstract method"
    ],
    explanation: "C# supports single inheritance for classes but allows implementing multiple interfaces, giving interfaces more flexibility for defining contracts.",
    category: "Core Concepts"
  },
  {
    id: "q4",
    question: "What does the 'virtual' keyword indicate in C#?",
    correctAnswer: "The method can be overridden in a derived class",
    wrongAnswers: [
      "The method runs asynchronously",
      "The method is only visible within the assembly",
      "The method cannot be inherited",
      "The method must be static",
      "The method is automatically cached"
    ],
    explanation: "The virtual keyword marks a method as overridable, allowing derived classes to provide their own implementation using the override keyword.",
    category: "Keywords"
  },
  {
    id: "q5",
    question: "What is the Single Responsibility Principle?",
    correctAnswer: "A class should have only one reason to change",
    wrongAnswers: [
      "A class should only have one public method",
      "A class should only depend on one other class",
      "A method should only have one parameter",
      "A project should only have one main class",
      "A file should only contain one class"
    ],
    explanation: "SRP states that a class should have only one responsibility, making it easier to understand, test, and maintain.",
    category: "Core Concepts"
  },
  {
    id: "q6",
    question: "Which pattern does the async/await syntax implement in C#?",
    correctAnswer: "Task-based Asynchronous Pattern (TAP)",
    wrongAnswers: [
      "Observer Pattern",
      "Factory Pattern",
      "Singleton Pattern",
      "Repository Pattern",
      "Decorator Pattern"
    ],
    explanation: "Async/await is the syntactic sugar for the Task-based Asynchronous Pattern, making asynchronous code look and behave like synchronous code.",
    category: "Core Concepts"
  },
  {
    id: "q7",
    question: "What is the return type recommendation for async methods?",
    correctAnswer: "Task or Task<T>",
    wrongAnswers: [
      "void",
      "IEnumerable",
      "object",
      "dynamic",
      "Action"
    ],
    explanation: "Async methods should return Task or Task<T> so they can be awaited. Async void should only be used for event handlers.",
    category: "Core Concepts"
  },
  {
    id: "q8",
    question: "What constraint ensures a generic type parameter is a reference type?",
    correctAnswer: "where T : class",
    wrongAnswers: [
      "where T : ref",
      "where T : reference",
      "where T : object",
      "where T : heap",
      "where T : type"
    ],
    explanation: "The 'class' constraint restricts the type parameter to reference types only, excluding value types like int or struct.",
    category: "Core Concepts"
  },
  // Data Structures
  {
    id: "q9",
    question: "What is the time complexity of accessing an element in a Dictionary<TKey, TValue> by key?",
    correctAnswer: "O(1) average case",
    wrongAnswers: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(n log n)",
      "O(2ⁿ)"
    ],
    explanation: "Dictionary uses a hash table internally, providing O(1) average-case lookup by hashing the key to find the bucket directly.",
    category: "Data Structures"
  },
  {
    id: "q10",
    question: "Which data structure should you use when you need to check if an element exists in a collection frequently?",
    correctAnswer: "HashSet<T>",
    wrongAnswers: [
      "List<T>",
      "Queue<T>",
      "Stack<T>",
      "Array",
      "LinkedList<T>"
    ],
    explanation: "HashSet<T> provides O(1) average Contains() performance, while List<T>.Contains() is O(n).",
    category: "Data Structures"
  },
  {
    id: "q11",
    question: "What is the difference between Queue<T> and Stack<T>?",
    correctAnswer: "Queue is FIFO, Stack is LIFO",
    wrongAnswers: [
      "Queue is faster than Stack",
      "Stack can only hold reference types",
      "Queue is thread-safe, Stack is not",
      "Stack is sorted, Queue is unsorted",
      "Queue uses less memory than Stack"
    ],
    explanation: "Queue is First-In-First-Out (like a line at a store), while Stack is Last-In-First-Out (like a stack of plates).",
    category: "Data Structures"
  },
  {
    id: "q12",
    question: "What happens when you add an element to a List<T> that has reached its capacity?",
    correctAnswer: "The internal array doubles in size and elements are copied",
    wrongAnswers: [
      "An exception is thrown",
      "The oldest element is removed",
      "The list becomes a LinkedList",
      "Nothing, the capacity is unlimited",
      "The element is added to a overflow buffer"
    ],
    explanation: "List<T> automatically resizes its internal array (typically doubling capacity) when capacity is reached, copying existing elements to the new array.",
    category: "Data Structures"
  },
  {
    id: "q13",
    question: "Which collection should you avoid for new code in C#?",
    correctAnswer: "ArrayList",
    wrongAnswers: [
      "List<T>",
      "Dictionary<TKey, TValue>",
      "HashSet<T>",
      "Queue<T>",
      "LinkedList<T>"
    ],
    explanation: "ArrayList is the non-generic, legacy collection that lacks type safety and causes boxing for value types. Use List<T> instead.",
    category: "Data Structures"
  },
  // Keywords
  {
    id: "q14",
    question: "What is the difference between 'const' and 'readonly'?",
    correctAnswer: "const is compile-time, readonly is runtime evaluated",
    wrongAnswers: [
      "const can be used with any type, readonly cannot",
      "readonly is faster than const",
      "const values can be changed, readonly cannot",
      "readonly is deprecated in favor of const",
      "const works with classes, readonly only with structs"
    ],
    explanation: "const values are embedded at compile time, while readonly fields are evaluated and assigned at runtime (in constructor or declaration).",
    category: "Keywords"
  },
  {
    id: "q15",
    question: "What does the 'sealed' keyword do when applied to a class?",
    correctAnswer: "Prevents other classes from inheriting from it",
    wrongAnswers: [
      "Makes all methods final",
      "Makes the class singleton",
      "Prevents the class from being instantiated",
      "Makes the class immutable",
      "Hides the class from reflection"
    ],
    explanation: "A sealed class cannot be used as a base class, preventing inheritance. This can improve performance and ensure the class behavior isn't modified.",
    category: "Keywords"
  },
  {
    id: "q16",
    question: "What is the purpose of the 'out' parameter modifier?",
    correctAnswer: "To return a value from a method through a parameter that must be assigned before the method returns",
    wrongAnswers: [
      "To make the parameter read-only",
      "To pass large structs by reference",
      "To indicate the parameter is optional",
      "To create an output stream",
      "To mark deprecated parameters"
    ],
    explanation: "The out modifier passes a parameter by reference and requires the method to assign a value before returning, useful for methods that need to return multiple values.",
    category: "Keywords"
  },
  {
    id: "q17",
    question: "What does the '??' operator do in C#?",
    correctAnswer: "Returns the right operand if the left is null",
    wrongAnswers: [
      "Checks if both operands are null",
      "Converts null to an empty string",
      "Throws an exception if null",
      "Compares two nullable values",
      "Creates a nullable type"
    ],
    explanation: "The null-coalescing operator (??) returns its left operand if it's not null, otherwise returns the right operand, providing a default value.",
    category: "Keywords"
  },
  {
    id: "q18",
    question: "What is the difference between 'ref' and 'in' parameters?",
    correctAnswer: "ref allows modification, in is read-only",
    wrongAnswers: [
      "ref is for value types, in is for reference types",
      "in is deprecated in favor of ref",
      "ref is faster than in",
      "in creates a copy, ref does not",
      "ref works with async, in does not"
    ],
    explanation: "Both pass by reference, but 'in' passes a readonly reference preventing modification, useful for large struct optimization without copying.",
    category: "Keywords"
  },
  // Optimization
  {
    id: "q19",
    question: "What is the recommended way to build strings in a loop?",
    correctAnswer: "StringBuilder",
    wrongAnswers: [
      "String concatenation with +",
      "String.Format()",
      "String interpolation $\"\"",
      "String.Concat()",
      "Array of characters"
    ],
    explanation: "StringBuilder maintains a mutable buffer, avoiding the O(n²) cost of creating new string objects with each concatenation in a loop.",
    category: "Optimization"
  },
  {
    id: "q20",
    question: "What is the purpose of Span<T> in C#?",
    correctAnswer: "To provide a type-safe view over contiguous memory without allocation",
    wrongAnswers: [
      "To span multiple threads safely",
      "To measure execution time",
      "To create generic collections",
      "To manage database connections",
      "To implement the observer pattern"
    ],
    explanation: "Span<T> allows zero-allocation slicing and manipulation of arrays, strings, and other contiguous memory, improving performance in hot paths.",
    category: "Optimization"
  },
  {
    id: "q21",
    question: "Why should you use Any() instead of Count() > 0 in LINQ?",
    correctAnswer: "Any() stops at the first element while Count() must enumerate all elements",
    wrongAnswers: [
      "Any() is newer and more modern",
      "Count() can throw exceptions",
      "Any() works with all collections, Count() doesn't",
      "Count() returns a nullable value",
      "Any() uses less memory allocation"
    ],
    explanation: "Any() short-circuits after finding the first matching element, while Count() must enumerate the entire collection to count all elements.",
    category: "Optimization"
  },
  {
    id: "q22",
    question: "What is lazy initialization?",
    correctAnswer: "Deferring object creation until the object is first accessed",
    wrongAnswers: [
      "Creating objects in a background thread",
      "Using weak references for object storage",
      "Initializing objects with default values",
      "Creating objects asynchronously",
      "Delaying garbage collection"
    ],
    explanation: "Lazy initialization delays expensive object creation until the object is actually needed, saving resources for objects that may never be used.",
    category: "Optimization"
  },
  {
    id: "q23",
    question: "When should you use Parallel.ForEach instead of async/await?",
    correctAnswer: "For CPU-bound operations that can run in parallel",
    wrongAnswers: [
      "For any operation that needs to be fast",
      "For I/O-bound operations like HTTP calls",
      "For small collections under 100 items",
      "When you need to maintain element order",
      "For operations that modify shared state"
    ],
    explanation: "Parallel.ForEach is designed for CPU-bound parallel processing. For I/O-bound operations, async/await is more efficient as it doesn't block threads.",
    category: "Optimization"
  },
  // More Core Concepts
  {
    id: "q24",
    question: "What is polymorphism in OOP?",
    correctAnswer: "The ability of objects of different types to be treated through the same interface",
    wrongAnswers: [
      "Having multiple constructors in a class",
      "Using multiple inheritance",
      "Converting between data types",
      "Creating many instances of a class",
      "Defining multiple namespaces"
    ],
    explanation: "Polymorphism allows code to work with objects of different types through a common interface, enabling flexibility and extensibility.",
    category: "Core Concepts"
  },
  {
    id: "q25",
    question: "What is the Open/Closed Principle?",
    correctAnswer: "Software entities should be open for extension but closed for modification",
    wrongAnswers: [
      "Classes should be either open or closed, not both",
      "Files should be opened before being closed",
      "Public methods should not call private methods",
      "Database connections must always be closed",
      "Sealed classes must be opened for testing"
    ],
    explanation: "OCP states you should be able to extend a class's behavior without modifying its source code, typically achieved through abstractions.",
    category: "Core Concepts"
  },
  {
    id: "q26",
    question: "What problem does dependency injection solve?",
    correctAnswer: "Tight coupling between classes",
    wrongAnswers: [
      "Memory leaks in applications",
      "Slow database queries",
      "Thread synchronization issues",
      "File system access problems",
      "Network latency issues"
    ],
    explanation: "Dependency injection allows classes to receive their dependencies from external sources, reducing tight coupling and improving testability.",
    category: "Core Concepts"
  },
  {
    id: "q27",
    question: "What is the difference between value types and reference types?",
    correctAnswer: "Value types store data directly, reference types store a reference to data on the heap",
    wrongAnswers: [
      "Value types are faster, reference types are slower",
      "Value types are immutable, reference types are mutable",
      "Value types can only be numeric, reference types can be anything",
      "Value types are deprecated in modern C#",
      "Reference types cannot be null"
    ],
    explanation: "Value types (struct, int, etc.) are stored on the stack and copied by value. Reference types (class) store a heap reference and are copied by reference.",
    category: "Core Concepts"
  },
  // More Data Structures
  {
    id: "q28",
    question: "What is the time complexity of inserting at the beginning of a List<T>?",
    correctAnswer: "O(n)",
    wrongAnswers: [
      "O(1)",
      "O(log n)",
      "O(n²)",
      "O(n log n)",
      "O(2ⁿ)"
    ],
    explanation: "Inserting at index 0 requires shifting all existing elements by one position, making it an O(n) operation.",
    category: "Data Structures"
  },
  {
    id: "q29",
    question: "Why might you prefer Dictionary.TryGetValue over using ContainsKey followed by indexer access?",
    correctAnswer: "TryGetValue does a single lookup instead of two",
    wrongAnswers: [
      "TryGetValue is newer and more modern",
      "TryGetValue handles null keys automatically",
      "ContainsKey doesn't work with generic types",
      "TryGetValue creates less garbage",
      "ContainsKey is deprecated"
    ],
    explanation: "ContainsKey + indexer performs two hash lookups, while TryGetValue does a single lookup and returns both existence and value.",
    category: "Data Structures"
  },
  {
    id: "q30",
    question: "What data structure is best for implementing an undo feature?",
    correctAnswer: "Stack<T>",
    wrongAnswers: [
      "Queue<T>",
      "List<T>",
      "HashSet<T>",
      "Dictionary<TKey, TValue>",
      "LinkedList<T>"
    ],
    explanation: "Stack's LIFO (Last-In-First-Out) behavior naturally fits undo operations - the most recent action is the first to be undone.",
    category: "Data Structures"
  },
  // More Keywords
  {
    id: "q31",
    question: "What is the purpose of the 'yield' keyword?",
    correctAnswer: "To create iterators that produce values one at a time",
    wrongAnswers: [
      "To pause thread execution",
      "To give up CPU time to other threads",
      "To release unmanaged resources",
      "To mark methods as asynchronous",
      "To create singleton instances"
    ],
    explanation: "The yield keyword enables lazy enumeration by returning values one at a time, maintaining state between calls without creating intermediate collections.",
    category: "Keywords"
  },
  {
    id: "q32",
    question: "What does the 'using' statement do in C#?",
    correctAnswer: "Ensures Dispose() is called on an IDisposable object, even if an exception occurs",
    wrongAnswers: [
      "Imports a namespace into the file",
      "Creates an alias for a type",
      "Marks resources for garbage collection",
      "Enables async operations",
      "Prevents null reference exceptions"
    ],
    explanation: "The using statement (not directive) creates a scope that automatically calls Dispose() when exiting, ensuring proper resource cleanup.",
    category: "Keywords"
  },
  {
    id: "q33",
    question: "What is the difference between '?.' and '!' operators?",
    correctAnswer: "?. safely accesses members if not null, ! asserts a value is not null",
    wrongAnswers: [
      "?. creates nullable types, ! removes them",
      "?. is for reference types, ! is for value types",
      "Both do the same thing but ! is newer",
      "?. checks at runtime, ! checks at compile time",
      "?. is deprecated in favor of !"
    ],
    explanation: "The null-conditional operator (?.) returns null if the object is null. The null-forgiving operator (!) suppresses null warnings.",
    category: "Keywords"
  },
  {
    id: "q34",
    question: "When should you use 'async void' in C#?",
    correctAnswer: "Only for event handlers",
    wrongAnswers: [
      "For any async method that doesn't return a value",
      "When performance is critical",
      "When you don't care about exceptions",
      "For fire-and-forget operations",
      "Never, it's deprecated"
    ],
    explanation: "Async void methods can't be awaited and their exceptions can't be caught. They're only appropriate for event handlers where the signature is fixed.",
    category: "Keywords"
  },
  // More Optimization
  {
    id: "q35",
    question: "What is the Large Object Heap (LOH)?",
    correctAnswer: "A special heap area for objects larger than ~85KB",
    wrongAnswers: [
      "A heap that's automatically garbage collected more frequently",
      "A heap for objects with many properties",
      "Memory reserved for static objects",
      "A cache for frequently accessed objects",
      "Memory used by the string intern pool"
    ],
    explanation: "Objects larger than approximately 85KB are allocated on the LOH, which is collected less frequently and can cause fragmentation.",
    category: "Optimization"
  },
  {
    id: "q36",
    question: "Why is it recommended to pre-size a List<T> when the count is known?",
    correctAnswer: "To avoid multiple array reallocations and copying",
    wrongAnswers: [
      "To make the list thread-safe",
      "To enable binary search",
      "To reduce garbage collection",
      "To prevent index out of bounds exceptions",
      "To make the list immutable"
    ],
    explanation: "Pre-sizing with the constructor capacity parameter allocates the array once, avoiding multiple resize operations that copy all elements.",
    category: "Optimization"
  },
  {
    id: "q37",
    question: "What is ArrayPool<T> used for?",
    correctAnswer: "Renting and returning reusable arrays to avoid allocations",
    wrongAnswers: [
      "Pooling database connections",
      "Managing thread pools",
      "Creating fixed-size arrays",
      "Sorting large arrays efficiently",
      "Converting arrays between types"
    ],
    explanation: "ArrayPool<T> allows you to rent arrays from a shared pool and return them after use, avoiding frequent allocations for temporary buffers.",
    category: "Optimization"
  },
  {
    id: "q38",
    question: "What is the main benefit of using 'readonly struct'?",
    correctAnswer: "Guarantees immutability and prevents defensive copies",
    wrongAnswers: [
      "Makes the struct faster to create",
      "Allows the struct to be used with LINQ",
      "Enables the struct to be nullable",
      "Makes the struct thread-safe automatically",
      "Allows larger struct sizes on stack"
    ],
    explanation: "Readonly struct ensures all members are readonly, preventing mutation and eliminating defensive copies when passed as 'in' parameters.",
    category: "Optimization"
  },
  // Additional questions for comprehensive coverage
  {
    id: "q39",
    question: "What is the Liskov Substitution Principle?",
    correctAnswer: "Derived classes must be substitutable for their base classes without altering correctness",
    wrongAnswers: [
      "All classes should be substitutable for Object",
      "Interfaces should always have one method",
      "Base classes should never be instantiated",
      "Derived classes must override all base methods",
      "Only final classes can be substituted"
    ],
    explanation: "LSP states that objects of a superclass should be replaceable with objects of subclasses without affecting the program's correctness.",
    category: "Core Concepts"
  },
  {
    id: "q40",
    question: "What is the purpose of the 'lock' keyword?",
    correctAnswer: "To ensure only one thread can execute a code block at a time",
    wrongAnswers: [
      "To prevent garbage collection of an object",
      "To make variables immutable",
      "To prevent inheritance",
      "To optimize memory usage",
      "To encrypt sensitive data"
    ],
    explanation: "The lock keyword creates a mutual exclusion section, preventing multiple threads from executing the same code simultaneously.",
    category: "Keywords"
  },
  {
    id: "q41",
    question: "What is the difference between IEnumerable<T> and ICollection<T>?",
    correctAnswer: "ICollection<T> adds Count, Add, Remove, and Contains to IEnumerable<T>",
    wrongAnswers: [
      "ICollection is faster than IEnumerable",
      "IEnumerable works with LINQ, ICollection doesn't",
      "ICollection is for reference types only",
      "IEnumerable is deprecated",
      "They are the same interface"
    ],
    explanation: "IEnumerable<T> only provides iteration. ICollection<T> extends it with Count property and methods for modifying the collection.",
    category: "Data Structures"
  },
  {
    id: "q42",
    question: "When is multiple enumeration a problem in LINQ?",
    correctAnswer: "When the source is a database query or expensive computation",
    wrongAnswers: [
      "When the collection is empty",
      "When using ToList()",
      "When the collection is sorted",
      "When there are null elements",
      "When using generic types"
    ],
    explanation: "Multiple enumeration re-executes the query each time, causing multiple database calls or repeated expensive computations.",
    category: "Optimization"
  },
  {
    id: "q43",
    question: "What does the Interface Segregation Principle recommend?",
    correctAnswer: "Clients should not be forced to depend on interfaces they don't use",
    wrongAnswers: [
      "All interfaces should be segregated into separate files",
      "Interfaces should have at most three methods",
      "Only one class should implement each interface",
      "Interfaces should extend IDisposable",
      "Segregated interfaces run in isolation"
    ],
    explanation: "ISP suggests creating smaller, focused interfaces rather than large ones, so implementing classes only need to implement relevant methods.",
    category: "Core Concepts"
  },
  {
    id: "q44",
    question: "What is boxing in C#?",
    correctAnswer: "Converting a value type to a reference type by wrapping it in an object",
    wrongAnswers: [
      "Creating a defensive copy of a struct",
      "Putting objects in a container class",
      "Wrapping exceptions in try-catch blocks",
      "Converting nullable to non-nullable types",
      "Encapsulating fields in properties"
    ],
    explanation: "Boxing allocates heap memory to wrap a value type as an object. This is common with ArrayList and non-generic collections.",
    category: "Core Concepts"
  },
  {
    id: "q45",
    question: "What is the Dependency Inversion Principle?",
    correctAnswer: "High-level modules should depend on abstractions, not concrete implementations",
    wrongAnswers: [
      "Dependencies should be inverted in the dependency tree",
      "High-level modules should not have dependencies",
      "Constructors should not receive dependencies",
      "All dependencies should be singletons",
      "Dependencies must be created using factories"
    ],
    explanation: "DIP states that both high-level and low-level modules should depend on abstractions, decoupling them from concrete implementations.",
    category: "Core Concepts"
  },
  {
    id: "q46",
    question: "What is the purpose of ConfigureAwait(false)?",
    correctAnswer: "To avoid capturing and resuming on the original synchronization context",
    wrongAnswers: [
      "To make the async method run faster",
      "To prevent the method from being awaited",
      "To disable exception handling",
      "To force synchronous execution",
      "To enable parallel execution"
    ],
    explanation: "ConfigureAwait(false) allows the continuation to run on any thread pool thread, avoiding deadlocks in libraries and improving performance.",
    category: "Core Concepts"
  },
  {
    id: "q47",
    question: "What is the time complexity of Array.BinarySearch?",
    correctAnswer: "O(log n)",
    wrongAnswers: [
      "O(1)",
      "O(n)",
      "O(n²)",
      "O(n log n)",
      "O(2ⁿ)"
    ],
    explanation: "Binary search halves the search space with each comparison, resulting in logarithmic time complexity, but requires a sorted array.",
    category: "Data Structures"
  },
  {
    id: "q48",
    question: "What is the '??=' operator used for?",
    correctAnswer: "Assigning a value only if the variable is currently null",
    wrongAnswers: [
      "Checking if two values are both null",
      "Assigning null to a variable",
      "Comparing two nullable values",
      "Creating a nullable type",
      "Throwing if the value is null"
    ],
    explanation: "The null-coalescing assignment operator (??=) assigns the right-hand value only if the left-hand variable is null, useful for lazy initialization.",
    category: "Keywords"
  },
  {
    id: "q49",
    question: "What does 'protected internal' mean?",
    correctAnswer: "Accessible within the same assembly OR from derived classes in any assembly",
    wrongAnswers: [
      "Accessible only within the same assembly AND derived classes",
      "More restrictive than protected",
      "Only accessible from internal classes",
      "Accessible from anywhere",
      "Deprecated access modifier"
    ],
    explanation: "Protected internal is the union of protected and internal - accessible from the same assembly or from derived classes anywhere.",
    category: "Keywords"
  },
  {
    id: "q50",
    question: "When should you use PriorityQueue<TElement, TPriority>?",
    correctAnswer: "When you need to process items in priority order, not insertion order",
    wrongAnswers: [
      "When you need faster Queue operations",
      "When items must be unique",
      "When the queue needs to be thread-safe",
      "When you have more than 1000 items",
      "When items need to be sorted alphabetically"
    ],
    explanation: "PriorityQueue dequeues elements by priority, useful for scheduling algorithms, Dijkstra's algorithm, and task prioritization.",
    category: "Data Structures"
  },
  {
    id: "q51",
    question: "What is an Action delegate used for?",
    correctAnswer: "Representing a method that takes parameters but returns void",
    wrongAnswers: [
      "Representing an event handler",
      "Executing code asynchronously",
      "Creating anonymous types",
      "Defining extension methods",
      "Representing a method that returns a boolean"
    ],
    explanation: "Action<T1, T2, ...> is a built-in delegate for methods with up to 16 parameters that return void, avoiding custom delegate declarations.",
    category: "Core Concepts"
  },
  {
    id: "q52",
    question: "What is a Func delegate used for?",
    correctAnswer: "Representing a method that returns a value",
    wrongAnswers: [
      "Representing a method with no parameters",
      "Creating function pointers in unsafe code",
      "Defining callback functions",
      "Executing parallel code",
      "Representing a method that throws exceptions"
    ],
    explanation: "Func<T1, T2, ..., TResult> represents methods that return a value, where the last type parameter is the return type.",
    category: "Core Concepts"
  },
  {
    id: "q53",
    question: "Why is mutable static state considered dangerous?",
    correctAnswer: "It can cause thread-safety issues and hidden dependencies",
    wrongAnswers: [
      "It uses more memory than instance state",
      "It prevents garbage collection",
      "It makes the code run slower",
      "It's not supported in .NET Core",
      "It causes null reference exceptions"
    ],
    explanation: "Mutable static state is shared across all threads and instances, creating race conditions and making behavior hard to predict and test.",
    category: "Optimization"
  },
  {
    id: "q54",
    question: "What is the 'new' keyword's purpose when used in method declarations?",
    correctAnswer: "To hide an inherited member intentionally",
    wrongAnswers: [
      "To override a virtual method",
      "To create a new instance of a class",
      "To mark a method as new in the latest .NET version",
      "To indicate the method was recently added",
      "To enable polymorphism"
    ],
    explanation: "The new modifier explicitly hides an inherited member. Unlike override, it doesn't participate in polymorphism - the base version is called on base references.",
    category: "Keywords"
  },
  {
    id: "q55",
    question: "What type of operation is best suited for async/await?",
    correctAnswer: "I/O-bound operations like network or file access",
    wrongAnswers: [
      "CPU-intensive calculations",
      "Simple arithmetic operations",
      "Synchronous database queries",
      "Short-running loops",
      "Static method calls"
    ],
    explanation: "Async/await excels at I/O-bound operations where the thread can be released while waiting, rather than CPU-bound work which needs Parallel.",
    category: "Core Concepts"
  }
];

export function getRandomQuestions(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffleAnswers(question: QuizQuestion): string[] {
  const allWrong = [...question.wrongAnswers].sort(() => Math.random() - 0.5);
  const selectedWrong = allWrong.slice(0, 3);
  const allAnswers = [question.correctAnswer, ...selectedWrong];
  return allAnswers.sort(() => Math.random() - 0.5);
}
