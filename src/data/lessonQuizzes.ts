export interface LessonQuizQuestion {
  question: string;
  correctAnswer: string;
  wrongAnswers: { answer: string; explanation: string }[];
}

export const lessonQuizzes: Record<string, LessonQuizQuestion[]> = {
  "oop-encapsulation": [
    {
      question: "What is the main purpose of encapsulation?",
      correctAnswer: "Hiding internal implementation details while exposing a controlled interface",
      wrongAnswers: [
        { answer: "Making all class members public for easy access", explanation: "This defeats the purpose of encapsulation. The goal is to restrict access, not open it up." },
        { answer: "Creating multiple instances of a class", explanation: "That's instantiation, not encapsulation. Encapsulation is about hiding data and controlling access." },
        { answer: "Inheriting properties from a parent class", explanation: "That's inheritance, not encapsulation. Encapsulation focuses on data hiding within a class." }
      ]
    },
    {
      question: "Which is the correct way to implement encapsulation?",
      correctAnswer: "Private fields with public properties that include validation",
      wrongAnswers: [
        { answer: "Public fields for all data members", explanation: "Public fields expose internal state directly, bypassing any validation or control." },
        { answer: "Protected fields accessible from anywhere", explanation: "Protected fields are only accessible from derived classes, but still expose implementation details." },
        { answer: "Static fields for all class data", explanation: "Static fields are shared across all instances and don't relate to encapsulation principles." }
      ]
    }
  ],
  "oop-inheritance": [
    {
      question: "What is the recommended maximum depth for inheritance hierarchies?",
      correctAnswer: "2-3 levels to keep complexity manageable",
      wrongAnswers: [
        { answer: "As deep as needed for code reuse", explanation: "Deep hierarchies become fragile and hard to maintain. Favor composition over deep inheritance." },
        { answer: "Only 1 level is allowed in C#", explanation: "C# allows multiple levels of inheritance, but best practices recommend keeping it shallow." },
        { answer: "Unlimited depth is fine with good naming", explanation: "Even with good naming, deep hierarchies cause tight coupling and fragile base class problems." }
      ]
    },
    {
      question: "When should you prefer composition over inheritance?",
      correctAnswer: "When you only need some behaviors from another class, not an 'is-a' relationship",
      wrongAnswers: [
        { answer: "Never, inheritance is always better", explanation: "Inheritance creates tight coupling. Composition provides more flexibility and looser coupling." },
        { answer: "Only when the language doesn't support inheritance", explanation: "This is a design choice, not a language limitation. Composition is often preferred in any language." },
        { answer: "Only for value types like structs", explanation: "Composition applies to all types. It's about design, not the type system." }
      ]
    }
  ],
  "oop-polymorphism": [
    {
      question: "What enables runtime polymorphism in C#?",
      correctAnswer: "Virtual methods with override in derived classes",
      wrongAnswers: [
        { answer: "Method overloading with different parameters", explanation: "Overloading is compile-time polymorphism. Runtime polymorphism requires virtual/override." },
        { answer: "Using the 'new' keyword on methods", explanation: "The 'new' keyword hides methods rather than overriding them, breaking polymorphism." },
        { answer: "Making all methods static", explanation: "Static methods belong to the type, not instances, so they can't participate in polymorphism." }
      ]
    },
    {
      question: "Why should you avoid type checking with 'is' or 'as' in polymorphic code?",
      correctAnswer: "It defeats the purpose of polymorphism and creates maintenance issues",
      wrongAnswers: [
        { answer: "Type checking is faster than virtual dispatch", explanation: "Virtual dispatch is optimized by the runtime. Type checking adds branches and maintenance burden." },
        { answer: "It's deprecated in modern C#", explanation: "Type checking is valid syntax, but using it in polymorphic code is a design smell." },
        { answer: "It only works with interfaces", explanation: "Type checking works with classes too, but it violates the Open/Closed Principle." }
      ]
    }
  ],
  "oop-abstraction": [
    {
      question: "What is a 'leaky abstraction'?",
      correctAnswer: "An abstraction that exposes implementation details it should hide",
      wrongAnswers: [
        { answer: "An abstraction that uses too much memory", explanation: "Memory usage is a performance concern, not related to abstraction quality." },
        { answer: "An interface with too few methods", explanation: "Small interfaces are actually good (Interface Segregation Principle). Leaky means exposing internals." },
        { answer: "An abstract class without any abstract methods", explanation: "That might be a design issue, but leaky abstraction specifically refers to exposed implementation details." }
      ]
    }
  ],
  "solid-srp": [
    {
      question: "How do you identify if a class violates SRP?",
      correctAnswer: "If you describe its purpose and need to use 'and', it likely has multiple responsibilities",
      wrongAnswers: [
        { answer: "If it has more than 100 lines of code", explanation: "Line count alone doesn't indicate SRP violation. A focused class can be large." },
        { answer: "If it has more than 5 public methods", explanation: "Method count doesn't determine SRP. It's about having one reason to change." },
        { answer: "If it imports more than 3 namespaces", explanation: "Import count doesn't indicate responsibility count. Focus on reasons to change." }
      ]
    }
  ],
  "solid-ocp": [
    {
      question: "How do you typically achieve Open/Closed Principle?",
      correctAnswer: "Using abstractions (interfaces/abstract classes) and dependency injection",
      wrongAnswers: [
        { answer: "Making all methods virtual", explanation: "Virtual methods alone don't ensure OCP. You need proper abstraction boundaries." },
        { answer: "Using if/switch statements for new behaviors", explanation: "This requires modifying existing code, which violates OCP." },
        { answer: "Making all classes sealed", explanation: "Sealed classes prevent extension entirely, the opposite of OCP." }
      ]
    }
  ],
  "generics": [
    {
      question: "What is the purpose of generic constraints?",
      correctAnswer: "To restrict type parameters and enable specific operations on them",
      wrongAnswers: [
        { answer: "To make generics run faster", explanation: "Constraints are about type safety, not performance optimization." },
        { answer: "To allow any type to be used", explanation: "No constraints allows any type. Constraints restrict which types are valid." },
        { answer: "To convert between generic types", explanation: "Constraints don't enable type conversion. They ensure type requirements are met." }
      ]
    },
    {
      question: "Which constraint ensures a type has a parameterless constructor?",
      correctAnswer: "where T : new()",
      wrongAnswers: [
        { answer: "where T : class", explanation: "The 'class' constraint only ensures it's a reference type, not that it has a constructor." },
        { answer: "where T : struct", explanation: "The 'struct' constraint ensures value type, not parameterless constructor availability." },
        { answer: "where T : object", explanation: "All types derive from object. This doesn't ensure a parameterless constructor exists." }
      ]
    }
  ],
  "delegates-events": [
    {
      question: "Why should you use Func<> and Action<> instead of custom delegates?",
      correctAnswer: "They're built-in, widely recognized, and reduce redundant delegate declarations",
      wrongAnswers: [
        { answer: "Custom delegates are deprecated in modern C#", explanation: "Custom delegates are still valid. Built-in delegates are just more convenient and standardized." },
        { answer: "Func and Action are faster", explanation: "Performance is identical. The benefit is standardization and reduced boilerplate." },
        { answer: "Custom delegates can't be used with LINQ", explanation: "Custom delegates work fine with LINQ. The issue is unnecessary type proliferation." }
      ]
    },
    {
      question: "What's the safe way to invoke an event?",
      correctAnswer: "Using null-conditional operator: EventName?.Invoke(this, args)",
      wrongAnswers: [
        { answer: "if (EventName != null) EventName(this, args)", explanation: "This has a race condition - the event could become null between check and invoke." },
        { answer: "Always invoke without null check", explanation: "This throws NullReferenceException when no handlers are subscribed." },
        { answer: "Use try-catch around the invocation", explanation: "Exception handling doesn't prevent the race condition. Use null-conditional operator." }
      ]
    }
  ],
  "async-await": [
    {
      question: "Why is 'async void' dangerous?",
      correctAnswer: "Exceptions can't be caught and the method can't be awaited",
      wrongAnswers: [
        { answer: "It's slower than async Task", explanation: "Performance is similar. The danger is in exception handling and awaiting." },
        { answer: "It doesn't actually run asynchronously", explanation: "It does run asynchronously, but exceptions and completion can't be tracked." },
        { answer: "It's deprecated in .NET 6+", explanation: "It's not deprecated, but should only be used for event handlers." }
      ]
    },
    {
      question: "What happens when you call .Result on a Task in a UI thread?",
      correctAnswer: "It can cause a deadlock because the thread is blocked waiting for itself",
      wrongAnswers: [
        { answer: "The result is returned immediately", explanation: ".Result blocks the calling thread, which can deadlock if the continuation needs that thread." },
        { answer: "An exception is always thrown", explanation: "It may complete or deadlock depending on the synchronization context." },
        { answer: "The task runs synchronously", explanation: "The task still runs asynchronously, but the calling thread is blocked waiting." }
      ]
    }
  ],
  "interfaces-vs-abstract": [
    {
      question: "When should you use an abstract class instead of an interface?",
      correctAnswer: "When you need to share implementation code among related classes",
      wrongAnswers: [
        { answer: "When you want multiple inheritance", explanation: "C# doesn't support multiple class inheritance. Interfaces allow multiple implementation." },
        { answer: "When defining a pure contract without implementation", explanation: "Pure contracts are better suited for interfaces, not abstract classes." },
        { answer: "When you need better performance", explanation: "Performance is similar. The choice is about design, not performance." }
      ]
    }
  ],
  "value-vs-reference": [
    {
      question: "What happens when you assign a struct to another variable?",
      correctAnswer: "A complete copy of the data is created",
      wrongAnswers: [
        { answer: "Both variables point to the same data", explanation: "That's reference type behavior. Structs are copied by value." },
        { answer: "Only primitive fields are copied", explanation: "All fields are copied, including nested structs (though reference type fields copy the reference)." },
        { answer: "The original becomes null", explanation: "Structs can't be null (unless nullable). Both variables have independent copies." }
      ]
    },
    {
      question: "Why are mutable structs considered dangerous?",
      correctAnswer: "Modifications to copies don't affect the original, causing unexpected behavior",
      wrongAnswers: [
        { answer: "They use more memory than immutable structs", explanation: "Memory usage is the same. The issue is unexpected behavior when modifying copies." },
        { answer: "They can't be used in collections", explanation: "They can be used, but modifications through indexers operate on copies, not the original." },
        { answer: "They're not allowed in modern C#", explanation: "They're allowed but discouraged due to confusing semantics with boxing and properties." }
      ]
    }
  ],
  "arrays-lists": [
    {
      question: "When should you pre-size a List<T>?",
      correctAnswer: "When you know the approximate number of elements to avoid reallocations",
      wrongAnswers: [
        { answer: "Never, List<T> handles sizing automatically", explanation: "It does auto-size, but with reallocation costs. Pre-sizing avoids copying." },
        { answer: "Only for lists over 1 million elements", explanation: "Pre-sizing benefits any known size. Even small lists benefit from avoiding reallocations." },
        { answer: "Only when using value types", explanation: "Pre-sizing helps regardless of element type. It's about avoiding array copying." }
      ]
    }
  ],
  "dictionaries-hashsets": [
    {
      question: "Why use TryGetValue instead of ContainsKey + indexer?",
      correctAnswer: "TryGetValue performs only one hash lookup instead of two",
      wrongAnswers: [
        { answer: "TryGetValue is thread-safe", explanation: "Neither is thread-safe. TryGetValue is about efficiency, not thread safety." },
        { answer: "ContainsKey doesn't work with null values", explanation: "ContainsKey works fine with null values. The issue is double lookup overhead." },
        { answer: "TryGetValue throws fewer exceptions", explanation: "Both can avoid exceptions. TryGetValue is about performance, not exception handling." }
      ]
    }
  ],
  "queues-stacks": [
    {
      question: "When should you use Stack<T> instead of recursion?",
      correctAnswer: "When processing deep structures that might cause stack overflow",
      wrongAnswers: [
        { answer: "Always, recursion is deprecated", explanation: "Recursion is valid and often clearer. Use Stack when depth might overflow the call stack." },
        { answer: "Only when working with trees", explanation: "Stack can replace recursion for any deep structure, not just trees." },
        { answer: "When you need better memory efficiency", explanation: "Stack<T> may use more memory than recursion. It's about avoiding call stack limits." }
      ]
    }
  ],
  "big-o-notation": [
    {
      question: "Why is List<T>.Contains() O(n) while HashSet<T>.Contains() is O(1)?",
      correctAnswer: "HashSet uses a hash table for direct lookup; List must check each element",
      wrongAnswers: [
        { answer: "HashSet is newer and more optimized", explanation: "Age doesn't matter. It's the data structure - hash table vs linear array." },
        { answer: "List<T> is sorted, HashSet is unsorted", explanation: "List<T> is not sorted. HashSet uses hashing, not sorting, for fast lookup." },
        { answer: "HashSet only works with integers", explanation: "HashSet works with any type that implements GetHashCode properly." }
      ]
    }
  ],
  "access-modifiers": [
    {
      question: "What's the difference between 'protected internal' and 'private protected'?",
      correctAnswer: "protected internal is OR (assembly or derived); private protected is AND (assembly and derived)",
      wrongAnswers: [
        { answer: "They are the same thing", explanation: "They're different. One is union (OR), the other is intersection (AND)." },
        { answer: "private protected is deprecated", explanation: "It's not deprecated. It was added in C# 7.2 for more precise access control." },
        { answer: "protected internal is more restrictive", explanation: "It's less restrictive (OR). private protected requires both conditions." }
      ]
    }
  ],
  "static-readonly-const": [
    {
      question: "Why might changing a public const value break other assemblies?",
      correctAnswer: "const values are embedded at compile time in consuming assemblies",
      wrongAnswers: [
        { answer: "const is deprecated and should be avoided", explanation: "const is valid. The issue is binary compatibility when changing values." },
        { answer: "const values are always strings", explanation: "const works with many types. The issue is compile-time embedding." },
        { answer: "Other assemblies cache the value at runtime", explanation: "The value is embedded at compile time, not cached at runtime." }
      ]
    }
  ],
  "virtual-override-sealed": [
    {
      question: "What happens when you use 'new' instead of 'override' on a method?",
      correctAnswer: "The method hides the base version - polymorphism doesn't work through base references",
      wrongAnswers: [
        { answer: "It creates a completely new method with no relation to base", explanation: "It does hide, but base references still call the base method, breaking polymorphism." },
        { answer: "It works the same as override", explanation: "No - with 'new', base-type references call the base method, not the derived one." },
        { answer: "A compile error is generated", explanation: "It compiles (with warning), but the behavior differs from override." }
      ]
    }
  ],
  "ref-out-in": [
    {
      question: "When should you use 'in' parameters?",
      correctAnswer: "For large structs that should be passed by reference without copying, but not modified",
      wrongAnswers: [
        { answer: "For all reference type parameters", explanation: "Reference types already pass by reference. 'in' is for large value types." },
        { answer: "When the parameter might be null", explanation: "'in' doesn't affect nullability. It's for read-only pass-by-reference." },
        { answer: "For small types like int or bool", explanation: "Small types have overhead from indirection. Use 'in' for large structs (>16 bytes)." }
      ]
    }
  ],
  "async-await-keyword": [
    {
      question: "What does ConfigureAwait(false) do?",
      correctAnswer: "Allows the continuation to run on any thread pool thread, not the captured context",
      wrongAnswers: [
        { answer: "Disables async behavior entirely", explanation: "The method still runs asynchronously. It just doesn't resume on the original context." },
        { answer: "Makes the operation run faster", explanation: "It may improve performance in libraries but that's not its purpose. It avoids context capture." },
        { answer: "Prevents exceptions from being thrown", explanation: "Exceptions still propagate. It only affects which thread the continuation runs on." }
      ]
    }
  ],
  "nullable-operators": [
    {
      question: "When should you use the null-forgiving operator (!)?",
      correctAnswer: "Only when you're certain the value isn't null and the compiler can't determine this",
      wrongAnswers: [
        { answer: "Whenever you want to silence null warnings", explanation: "Using ! to silence warnings hides real bugs. Only use when you're certain it's safe." },
        { answer: "On all nullable reference types", explanation: "That defeats the purpose of nullable annotations. Use only when you have proof." },
        { answer: "Instead of null checks for better performance", explanation: "! doesn't check anything - it just suppresses warnings. Real null causes runtime exception." }
      ]
    }
  ],
  "memory-management": [
    {
      question: "Why should you avoid allocations in performance-critical loops?",
      correctAnswer: "Allocations trigger garbage collection which pauses all threads",
      wrongAnswers: [
        { answer: "Memory is limited to 2GB in .NET", explanation: "64-bit processes can use much more. The issue is GC pauses, not memory limits." },
        { answer: "Allocations are slow because of disk access", explanation: "Allocations are in RAM, not disk. The cost is GC pressure and pauses." },
        { answer: "The JIT can't optimize code with allocations", explanation: "JIT optimization isn't the issue. It's the GC pause overhead." }
      ]
    }
  ],
  "span-memory": [
    {
      question: "Why can't Span<T> be used in async methods?",
      correctAnswer: "Span<T> is a ref struct that can only live on the stack, but async methods use heap-allocated state machines",
      wrongAnswers: [
        { answer: "Span<T> is not thread-safe", explanation: "Thread safety isn't the issue. It's the stack-only nature of ref structs." },
        { answer: "async was added before Span<T>", explanation: "The timeline isn't relevant. It's the fundamental design of ref structs." },
        { answer: "Span<T> doesn't support the await pattern", explanation: "It's not about await pattern support. Span can't be stored in the async state machine." }
      ]
    }
  ],
  "stringbuilder": [
    {
      question: "At approximately how many concatenations should you switch to StringBuilder?",
      correctAnswer: "Around 4 or more concatenations, especially in loops",
      wrongAnswers: [
        { answer: "Always use StringBuilder for any string operation", explanation: "For 1-3 concatenations, + or $ is cleaner and equally efficient." },
        { answer: "Only for strings over 1000 characters", explanation: "It's about number of operations, not string length. Loops matter most." },
        { answer: "StringBuilder is deprecated, use string.Concat", explanation: "StringBuilder is not deprecated. It's essential for many concatenations." }
      ]
    }
  ],
  "linq-performance": [
    {
      question: "Why is multiple enumeration of LINQ queries a problem?",
      correctAnswer: "Each enumeration re-executes the query, potentially hitting databases or recomputing expensive operations",
      wrongAnswers: [
        { answer: "LINQ queries can only be enumerated once", explanation: "They can be enumerated multiple times - that's the problem. Each time re-executes." },
        { answer: "It causes memory leaks", explanation: "It doesn't leak memory. It wastes CPU/network resources by re-executing." },
        { answer: "It throws an InvalidOperationException", explanation: "No exception is thrown. The query silently re-executes each time." }
      ]
    },
    {
      question: "Why should you use Any() instead of Count() > 0?",
      correctAnswer: "Any() stops at the first element while Count() must enumerate the entire collection",
      wrongAnswers: [
        { answer: "Any() is newer and more readable", explanation: "Readability is a benefit, but the main reason is performance - short-circuit evaluation." },
        { answer: "Count() doesn't work with IEnumerable", explanation: "Count() works with IEnumerable via LINQ, but enumerates everything." },
        { answer: "Any() handles null collections automatically", explanation: "Neither handles null automatically. Any() is about short-circuit efficiency." }
      ]
    }
  ],
  "lazy-initialization": [
    {
      question: "What thread-safety mode should you use for most Lazy<T> scenarios?",
      correctAnswer: "ExecutionAndPublication (the default) - ensures only one value is created",
      wrongAnswers: [
        { answer: "None - for best performance", explanation: "LazyThreadSafetyMode.None risks creating multiple instances in multi-threaded code." },
        { answer: "PublicationOnly - most flexible", explanation: "PublicationOnly may create multiple instances, only publishing one. Use default for safety." },
        { answer: "Thread safety doesn't matter with Lazy<T>", explanation: "Thread safety is crucial. Wrong mode can create race conditions." }
      ]
    }
  ],
  "parallel-processing": [
    {
      question: "When should you NOT use Parallel.ForEach?",
      correctAnswer: "For I/O-bound operations - use async/await instead",
      wrongAnswers: [
        { answer: "For collections with over 1000 items", explanation: "Large collections benefit from parallelism. Size isn't the issue." },
        { answer: "When order matters", explanation: "You can use Parallel with ordered results. The real issue is I/O-bound work." },
        { answer: "With generic collections", explanation: "Parallel works fine with generics. The issue is I/O blocking threads." }
      ]
    }
  ]
};
