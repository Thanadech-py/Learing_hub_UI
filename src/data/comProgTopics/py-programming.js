/**
 * Com-Prog Topic: Python Programming (Multi-Page Engineering Hub)
 * Rigorous curriculum synthesis from university lecture series & professional Python Notes for Professionals.
 */

const foundationsSubPage = {
  id: 'foundations',
  title: 'Runtime & Dynamic Typing',
  icon: '🐍',
  tag: 'PVM & Name Binding',
  subtitle:
    'The CPython execution pipeline: source to bytecode (.pyc) to the Python Virtual Machine (PVM), variables as reference pointers, dynamic typing, and the REPL.',
  estimatedTime: '24 min read + interactive reference lab',
  overview: [
    'Welcome to the Python Programming Master Guide. Created in 1991 by Guido van Rossum, Python is an expressive, high-level, dynamically typed language engineered for readability, developer velocity, and robust multi-paradigm programming (imperative, object-oriented, and functional).',
    'Under the hood, standard CPython uses a two-stage hybrid execution pipeline: source code (.py) is first compiled into portable intermediate Bytecode (.pyc), which is then interpreted by the stack-based Python Virtual Machine (PVM).',
    'A critical mental model for Python: variables are NOT named memory buckets (like in C); they are symbolic reference tags bound to heap-allocated objects. Writing x = 42 creates an integer object on the heap and binds the reference x to it.',
    'Start with the interactive object-reference visualizer below, then explore the 12 sub-topic chapters covering control flow, data structures, comprehensions, LEGB scope, decorators, OOP, dunder protocols, and robust exception architecture!',
  ],
  keyConcepts: [
    {
      title: 'CPython Execution Pipeline: Source → Bytecode → PVM',
      content:
        'When running a script (python app.py), the compiler compiles source code into platform-independent Bytecode stored in the __pycache__ directory (.pyc). The Python Virtual Machine (PVM) reads and executes these bytecode instructions sequentially.',
      exampleLabel: 'Bytecode Disassembly (dis module)',
      latex:
        '\\mathtt{x = a + b} \\implies \\mathtt{LOAD\\_NAME\\;a} \\to \\mathtt{LOAD\\_NAME\\;b} \\to \\mathtt{BINARY\\_ADD} \\to \\mathtt{STORE\\_NAME\\;x}',
      exampleNote:
        'Python bytecode is cached so subsequent executions skip the compilation step if the source timestamp is unchanged.',
    },
    {
      title: 'Variables as Reference Pointers (Name Binding)',
      content:
        'In Python, variables are names pointing to heap objects. If you write a = [1, 2] and b = a, both variables point to the exact same list object in memory! Mutating a.append(3) changes the object seen by b.',
      exampleLabel: 'Reference Binding & Object Identity',
      latex:
        'a = [1, 2]; \\; b = a \\implies \\mathtt{id}(a) == \\mathtt{id}(b) \\quad (a \\text{ is } b \\to \\text{True})',
    },
    {
      title: 'Interactive REPL & Formatted String Literals (f-strings)',
      content:
        'Python 3.6+ introduced f-strings (f"Hello {name}") for formatted output. Expressions inside {expr} are evaluated at runtime with full access to formatting specifiers (e.g., f"{pi:.3f}").',
      exampleLabel: 'Modern Formatted String Syntax',
      latex:
        'f"\\mathtt{Radius: } \\{r\\}, \\; \\mathtt{Area: } \\{\\pi \\times r^2:\\!.2f\\}"',
    },
  ],
  equations: [
    {
      name: 'Object Identity vs Equality Invariant',
      latex: '(a \\text{ is } b) \\implies (a == b), \\quad \\text{but } (a == b) \\;\\not\\!\\!\\implies (a \\text{ is } b)',
      summary: 'Distinguishes physical memory address identity (is) from value equality (==) in Python.',
      conditions: ['a and b are arbitrary Python objects'],
      variables: [
        { symbol: 'a \\text{ is } b', name: 'Identity Comparison', unit: '\\text{boolean}', description: 'Tests id(a) == id(b) (whether both variables point to the exact same memory address).', connections: 'Fast pointer comparison; best practice for comparing to None.' },
        { symbol: 'a == b', name: 'Equality Comparison', unit: '\\text{boolean}', description: 'Calls a.__eq__(b) to check whether the contents or values match.', connections: 'Overridable by custom classes.' },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive lab to inspect Python object references, see how variables bind to heap objects, test mutable vs immutable types, and step through scope resolution.',
};

const controlFlowAndLoopsSubPage = {
  id: 'control-flow-and-loops',
  title: 'Control Flow & Iteration',
  icon: '🔀',
  tag: 'Truthiness & Loops',
  subtitle:
    'Truth value testing (truthiness vs falsiness), conditional branching, modern match-case pattern matching, for-in iterators, and the range() generator.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Python uses indentation (4 spaces per PEP 8) rather than curly braces to define code blocks. Any object can be evaluated in a boolean context for Truthiness or Falsiness.',
    'Falsy objects include: None, False, zero of any numeric type (0, 0.0, 0j), empty sequences ("", [], ()), and empty collections ({}, set()). All other objects are Truthy.',
    'Python\'s for loop is fundamentally a For-Each iterator: it traverses items from any iterable object directly. The built-in range(start, stop, step) generates an arithmetic sequence on demand without storing the entire list in memory.',
    'Python loops support an optional else clause: the else block executes if and only if the loop terminates normally without encountering a break statement.',
  ],
  keyConcepts: [
    {
      title: 'Truthiness & Boolean Short-Circuiting',
      content:
        'Logical operators and / or return the actual operand that determined the result: x or y returns x if x is truthy, otherwise y. Useful for default values: name = user_input or "Anonymous".',
      exampleLabel: 'Short-Circuit Value Extraction',
      latex:
        '\\text{"" or "default"} \\to \\text{"default"}, \\qquad \\text{[1, 2] and "ready"} \\to \\text{"ready"}',
    },
    {
      title: 'Structural Pattern Matching (Python 3.10+ match-case)',
      content:
        'match-case provides structural pattern matching for inspecting types, shapes, and values simultaneously.',
      exampleLabel: 'Pattern Matching Syntax',
      latex:
        '\\mathtt{match\\;command:}\\; \\mathtt{case\\;["go",\\;dir]:\\;move(dir)}\\; \\mathtt{case\\;\\_:\\;invalid()}',
    },
    {
      title: 'Half-Open Range Arithmetic range(start, stop, step)',
      content:
        'range(a, b) generates integers i satisfying a <= i < b. The number of elements produced is exactly (b - a) when step=1. Memory complexity is O(1) regardless of range size.',
      exampleLabel: 'Range Cardinality Formula',
      latex:
        '\\text{Count}(\\mathtt{range}(a, b, s)) = \\max\\left(0, \\left\\lceil \\frac{b - a}{s} \\right\\rceil\\right)',
    },
  ],
  equations: [
    {
      name: 'Loop Else Invariant',
      latex: '\\text{Loop Else Executes} \\iff \\text{Loop finishes without hitting } \\mathtt{break}',
      summary: 'Guarantees execution of the loop else clause only when no break was triggered (ideal for search algorithms).',
      conditions: ['Applies to both for and while loops in Python'],
      variables: [
        { symbol: '\\mathtt{break}', name: 'Loop Exit Jump', unit: '\\text{statement}', description: 'Immediately aborts the loop, bypassing the else block.', connections: 'Used when target item is found.' },
      ],
    },
  ],
};

const stringsAndTextSubPage = {
  id: 'strings-and-text',
  title: 'Strings & Text Slicing',
  icon: '🔤',
  tag: 'Unicode & Slicing',
  subtitle:
    'String immutability, UTF-8 unicode encoding, extended slicing [start:stop:step], text search, transformations, and modern f-string formatting.',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'In Python, strings (str) are immutable sequences of Unicode code points. Because strings are immutable, any modification (replace, upper, strip) produces a brand-new string object on the heap, leaving the original unchanged.',
    'Python provides powerful Extended Slicing syntax: s[start:stop:step]. Negative indices count backward from the end (-1 is the last character). Omitting start or stop defaults to the beginning or end of the sequence.',
    'Methods like .split(delimiter) split text into lists, while delimiter.join(sequence) joins list elements into a single string with O(n) performance (far faster than repeated += string concatenation).',
  ],
  keyConcepts: [
    {
      title: 'Extended Slicing Mechanics [start:stop:step]',
      content:
        's[::2] selects every second character. s[::-1] reverses a string cleanly in O(n) time. Negative step traverses the string in reverse direction.',
      exampleLabel: 'Slicing Equivalences',
      latex:
        's[1:5] \\to \\text{index 1 to 4}, \\qquad s[::-1] \\to \\text{Reversed String}',
    },
    {
      title: 'Efficient String Construction: join() vs Concatenation',
      content:
        'Because strings are immutable, using += inside a loop creates O(n²) memory churn. Using "".join(list_of_strings) pre-calculates the exact required buffer and builds the string in O(n) time.',
      exampleLabel: 'O(n) String Assembly',
      latex:
        '\\text{output} = \\text{", ".join}([s_1, s_2, \\dots, s_n]) \\implies O(n) \\text{ time}',
    },
  ],
  equations: [
    {
      name: 'Sequence Slicing Offset Formula',
      latex: '\\text{indices} = \\{ \\text{start} + k \\cdot \\text{step} \\mid 0 \\le k < \\text{count} \\}',
      summary: 'Mathematical definition of element positions extracted by Python extended slicing.',
      conditions: ['step != 0 (step=0 raises ValueError)'],
      variables: [
        { symbol: '\\text{step}', name: 'Stride', unit: '\\text{integer}', description: 'Step size and direction between elements.', connections: 'Negative values reverse traversal.' },
      ],
    },
  ],
};

const listsAndTuplesSubPage = {
  id: 'lists-and-tuples',
  title: 'Lists, Tuples & Slicing',
  icon: '📋',
  tag: 'Dynamic Arrays & Tuples',
  subtitle:
    'Dynamic array over-allocation mechanics, mutable lists, immutable tuples, tuple unpacking (*args), and shallow vs deep copying.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Lists (list) are mutable dynamic arrays of heterogeneous object references. When items are appended, CPython employs an over-allocation strategy: allocating extra capacity so append() operates in O(1) amortized time.',
    'Tuples (tuple) are immutable sequences. Once created, their length and element references cannot be modified. Because of their immutability, tuples are hashable (can be used as dictionary keys) and have lower memory overhead.',
    'Tuple unpacking allows multiple assignment in a single line: a, b = b, a swaps two variables without requiring an explicit temporary variable. Extended unpacking (*rest) captures remaining items into a list.',
  ],
  keyConcepts: [
    {
      title: 'Dynamic Array Resizing (Over-Allocation)',
      content:
        'When list capacity is exceeded, CPython resizes the underlying array using an over-allocation formula: new_allocated = (size + (size >> 3) + 6). This prevents reallocating memory on every single append.',
      exampleLabel: 'Amortized O(1) Appends',
      latex:
        '\\text{Capacity Growth} \\approx \\text{Size} \\times 1.125 + 6 \\implies O(1) \\text{ amortized append}',
    },
    {
      title: 'Tuple Unpacking & Variable Swapping',
      content:
        'Python evaluates the entire right-hand side tuple into a temporary structure before assigning to the left-hand variables, enabling atomic swapping.',
      exampleLabel: 'Atomic Variable Swap',
      latex:
        'a, b = b, a \\iff (a, b) \\leftarrow \\text{tuple}(b, a)',
    },
    {
      title: 'Shallow Copy vs Deep Copy',
      content:
        '• Shallow Copy (lst.copy(), lst[:]): Creates a new outer list, but elements inside point to the same child objects.\n' +
        '• Deep Copy (copy.deepcopy(lst)): Recursively duplicates all nested objects, guaranteeing complete memory isolation.',
      exampleLabel: 'Copy Isolation Check',
      latex:
        '\\mathtt{b = a.copy()} \\implies b[0] \\text{ is } a[0], \\quad \\mathtt{c = copy.deepcopy(a)} \\implies c[0] \\text{ is not } a[0]',
    },
  ],
  equations: [
    {
      name: 'List Index Negative Wrap Formula',
      latex: '\\text{Physical Index}(i) = \\begin{cases} i & \\text{if } i \\ge 0 \\\\ n + i & \\text{if } i < 0 \\end{cases}',
      summary: 'Resolution of negative indices into non-negative buffer offsets where n = len(list).',
      conditions: ['-n <= i < n (indices outside this range raise IndexError)'],
      variables: [
        { symbol: 'n', name: 'Sequence Length', unit: '\\text{count}', description: 'Total number of items in collection: len(seq).', connections: 'Evaluated in O(1) time.' },
      ],
    },
  ],
};

const dictsAndSetsSubPage = {
  id: 'dicts-and-sets',
  title: 'Dictionaries & Sets',
  icon: '📚',
  tag: 'Hash Tables & O(1)',
  subtitle:
    'Hash tables, O(1) average lookup/insert/delete, the hash() function, collision resolution, dictionary views, and mathematical set algebra (|, &, -, ^).',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Dictionaries (dict) and Sets (set) are Python\'s core associative collections, built on highly optimized Hash Tables. Keys must be Hashable (immutable types like int, float, str, tuple whose hash value never changes during their lifetime).',
    'A dictionary maps unique keys to values. Looking up, inserting, or deleting a key operates in O(1) average time complexity. Since Python 3.7, dictionaries maintain insertion order.',
    'Sets store unique, unordered elements and provide mathematical set algebra operations: union (|), intersection (&), difference (-), and symmetric difference (^).',
  ],
  keyConcepts: [
    {
      title: 'The Hash Table Architecture & O(1) Complexity',
      content:
        'When looking up d[key], Python computes hash(key) and maps it to a table bucket index via index = hash(key) & (capacity - 1). Collisions are resolved using open addressing with quadratic perturbation.',
      exampleLabel: 'Bucket Index Calculation',
      latex:
        '\\text{bucket} = \\mathtt{hash}(\\text{key}) \\;\\&\\; (\\text{table\\_size} - 1) \\implies O(1) \\text{ average lookup}',
    },
    {
      title: 'Safe Key Access: .get() with Defaults',
      content:
        'Accessing d[key] raises KeyError if key is missing. Using d.get(key, default) returns default if key is not found, avoiding exceptions.',
      exampleLabel: 'Frequency Counter Idiom',
      latex:
        '\\text{counts}[\\text{item}] = \\text{counts.get}(\\text{item}, 0) + 1',
    },
    {
      title: 'Mathematical Set Operations',
      content:
        '• Union (A | B): All items in A or B.\n' +
        '• Intersection (A & B): Items common to both A and B.\n' +
        '• Difference (A - B): Items in A but not in B.\n' +
        '• Symmetric Difference (A ^ B): Items in either A or B, but not both.',
      exampleLabel: 'Set Algebraic Operators',
      latex:
        'A \\cup B \\to A \\mid B, \\quad A \\cap B \\to A \\;\\&\\; B, \\quad A \\setminus B \\to A - B, \\quad A \\Delta B \\to A \\oplus B',
    },
  ],
  equations: [
    {
      name: 'Set Symmetric Difference Identity',
      latex: 'A \\oplus B = (A \\cup B) \\setminus (A \\cap B) = (A - B) \\cup (B - A)',
      summary: 'Mathematical definition of symmetric difference (A ^ B) in Python sets.',
      conditions: ['All elements in sets A and B must be hashable'],
      variables: [
        { symbol: 'A \\oplus B', name: 'Symmetric Difference', unit: '\\text{set}', description: 'Elements in exactly one of the two sets.', connections: 'Computed via A ^ B in Python.' },
      ],
    },
  ],
};

const comprehensionsAndGeneratorsSubPage = {
  id: 'comprehensions-and-generators',
  title: 'Comprehensions & Generators',
  icon: '⚡',
  tag: 'Comprehensions & Yield',
  subtitle:
    'List, dictionary, and set comprehensions, conditional filtering, lazy evaluation, generator functions (yield), and memory efficiency.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Comprehensions provide a concise, declarative syntax for transforming and filtering collections. They are executed at C speed in CPython bytecode, running significantly faster than manual for-loop appends.',
    'List comprehensions construct a full list in memory immediately: [x*2 for x in seq if x > 0]. Dict comprehensions build key-value mappings: {k: v for k, v in items}.',
    'When dealing with millions of records, generating a complete list wastes memory. Generator Expressions (x*2 for x in seq) and Generator Functions with yield compute values Lazily one at a time on demand, operating in O(1) memory space!',
  ],
  keyConcepts: [
    {
      title: 'List Comprehension Syntax & Pipeline',
      content:
        '[expression for item in iterable if condition] filters items by condition, transforms them via expression, and gathers results into a new list.',
      exampleLabel: 'Even Square Filter',
      latex:
        '[x^2 \\mid x \\in \\text{nums}, \\; x \\text{ is even}] \\iff [x**2 \\; \\mathtt{for\\;} x \\;\\mathtt{in\\;} \\text{nums} \\; \\mathtt{if\\;} x \\% 2 == 0]',
    },
    {
      title: 'Lazy Generators with yield (O(1) Space)',
      content:
        'A function containing the yield keyword is a Generator Function. Calling it returns a generator object. Each call to next(gen) runs until encountering yield, yields the value, and suspends function state.',
      exampleLabel: 'Infinite Fibonacci Generator',
      latex:
        '\\mathtt{def\\;} fib(): \\; a, b = 0, 1; \\; \\mathtt{while\\;True}: \\; \\mathtt{yield\\;} a; \\; a, b = b, a + b',
    },
  ],
  equations: [
    {
      name: 'Generator Memory Efficiency Invariant',
      latex: '\\text{Memory}(\\text{ListComp}) = O(n), \\qquad \\text{Memory}(\\text{GenExpr}) = O(1)',
      summary: 'Space complexity comparison between eagerly evaluated list comprehensions and lazily evaluated generators.',
      conditions: ['n is the number of elements in the stream'],
      variables: [
        { symbol: 'n', name: 'Stream Length', unit: '\\text{count}', description: 'Total number of items yielded by iterable.', connections: 'Can be infinite for lazy generators without memory exhaustion.' },
      ],
    },
  ],
};

const functionsAndScopeSubPage = {
  id: 'functions-and-scope',
  title: 'Functions & LEGB Scope',
  icon: '🎯',
  tag: 'LEGB & Parameters',
  subtitle:
    'Function definition (def), *args and **kwargs, positional-only (/) and keyword-only (*) markers, the LEGB scope resolution rule, and closures.',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'Functions in Python are defined with the def keyword. Parameters support default values, arbitrary positional arguments (*args), and arbitrary keyword arguments (**kwargs).',
    'Python 3.8+ introduced parameter position markers: parameters before / are Positional-Only; parameters after * are Keyword-Only, enabling bulletproof API design.',
    'Variable lookup follows the strict LEGB Rule: Local scope → Enclosing scope (nested functions) → Global scope (module level) → Built-in scope (len, range, print).',
    'To modify a global variable from inside a function, declare global var. To modify a variable in an enclosing function, declare nonlocal var.',
  ],
  keyConcepts: [
    {
      title: 'The LEGB Scope Hierarchy',
      content:
        '1. L (Local): Variables assigned within current function.\n' +
        '2. E (Enclosing): Variables in outer enclosing functions (closures).\n' +
        '3. G (Global): Variables assigned at top-level module.\n' +
        '4. B (Built-in): Built-in Python identifiers (int, str, len).',
      exampleLabel: 'Scope Lookup Hierarchy',
      latex:
        '\\text{Local} \\to \\text{Enclosing} \\to \\text{Global} \\to \\text{Built-in}',
    },
    {
      title: 'Arbitrary Arguments: *args and **kwargs',
      content:
        '*args packs arbitrary positional arguments into a tuple. **kwargs packs arbitrary keyword arguments into a dictionary.',
      exampleLabel: 'Universal Wrapper Signature',
      latex:
        '\\mathtt{def\\;} wrapper(*args, **kwargs): \\; return \\; func(*args, **kwargs)',
    },
    {
      title: 'The Mutable Default Argument Trap',
      content:
        'Default argument expressions are evaluated once at definition time, not on each call. If you use a mutable default like def foo(lst=[]), that single list is shared across all calls! Always use None as sentinel default.',
      exampleLabel: 'Defensive Sentinel Pattern',
      latex:
        '\\mathtt{def\\;} append\\_val(x, lst=\\mathtt{None}): \\; \\mathtt{if\\;} lst \\text{ is } \\mathtt{None}: lst = []',
    },
  ],
  equations: [
    {
      name: 'Positional & Keyword Boundary Specification',
      latex: '\\mathtt{def\\;} f(pos_1, \\dots, /\\,, \\; p\\_or\\_k, \\dots, \\; *\\,, \\; kw_1, \\dots)',
      summary: 'Python parameter syntax enforcing positional-only (before /) and keyword-only (after *).',
      conditions: ['Introduced in Python 3.8'],
      variables: [
        { symbol: '/', name: 'Positional Marker', unit: '\\text{syntax}', description: 'Arguments before / cannot be passed by keyword name.', connections: 'Prevents caller code breaking on parameter rename.' },
        { symbol: '*', name: 'Keyword Marker', unit: '\\text{syntax}', description: 'Arguments after * must be passed with explicit keyword names.', connections: 'Forces explicit, self-documenting call sites.' },
      ],
    },
  ],
};

const functionalAndDecoratorsSubPage = {
  id: 'functional-and-decorators',
  title: 'Decorators & Closures',
  icon: '🎀',
  tag: 'Higher-Order Functions',
  subtitle:
    'First-class functions, anonymous lambda expressions, map/filter, lexical closures, @decorator syntax, and preserving metadata with functools.wraps.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'In Python, functions are First-Class Citizens: they can be assigned to variables, stored in data structures, passed as arguments to other functions, and returned from functions.',
    'A Lexical Closure is an inner function that remembers and retains access to variables in its enclosing scope, even after the outer function has finished executing.',
    'A Decorator is a higher-order function that takes a function as input, extends or alters its behavior, and returns a modified wrapper function without modifying the original source code.',
    'The @decorator syntactic sugar applies decorators cleanly. Always use @functools.wraps(fn) on the inner wrapper to preserve the original function name and docstrings.',
  ],
  keyConcepts: [
    {
      title: 'Lexical Closures',
      content:
        'A closure captures variables from its enclosing environment. Useful for factory functions (e.g. creating multiplier functions).',
      exampleLabel: 'Closure Factory Example',
      latex:
        '\\mathtt{def\\;} make\\_multiplier(n): \\; \\mathtt{def\\;} mult(x): \\mathtt{return\\;} x \\times n; \\; \\mathtt{return\\;} mult',
    },
    {
      title: 'Decorator Anatomy & @wraps Protocol',
      content:
        '@my_decorator above def foo() is equivalent to foo = my_decorator(foo). Wrappers intercept calls to add timing, logging, validation, or caching (lru_cache).',
      exampleLabel: 'Standard Decorator Boilerplate',
      latex:
        '@\\mathtt{functools.wraps}(fn) \\implies \\mathtt{wrapper.\\_\\_name\\_\\_} \\equiv \\mathtt{fn.\\_\\_name\\_\\_}',
    },
  ],
  equations: [
    {
      name: 'Decorator Syntactic Equivalence',
      latex: '@decorator \\quad \\mathtt{def\\;} f(x): \\dots \\iff f = decorator(f)',
      summary: 'The exact semantic transformation performed by Python decorator syntax.',
      conditions: ['decorator must be a callable returning a callable'],
      variables: [
        { symbol: 'decorator', name: 'Higher-Order Wrapper', unit: '\\text{callable}', description: 'Function accepting target function and returning wrapper.', connections: 'Can be chained: @dec1 then @dec2 runs dec1(dec2(f)).' },
      ],
    },
  ],
};

const modulesAndPackagesSubPage = {
  id: 'modules-and-packages',
  title: 'Modules & Packages',
  icon: '📦',
  tag: 'Project Architecture',
  subtitle:
    'Import mechanics, sys.path resolution, packages and __init__.py, the if __name__ == "__main__" entry point pattern, and standard library modules.',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'A Module is simply a Python file (.py) containing definitions and executable statements. A Package is a directory containing modules and an __init__.py file.',
    'When importing a module (import math), Python searches directories listed in sys.path in order: current working directory, PYTHONPATH environment variable, standard library, and installed site-packages.',
    'Modules execute top-level code once when imported. The standard guard if __name__ == "__main__": ensures test code runs only when the file is executed directly, not when imported as a library.',
  ],
  keyConcepts: [
    {
      title: 'The __name__ == "__main__" Idiom',
      content:
        'When a script is run directly, Python sets the special variable __name__ to "__main__". If imported by another script, __name__ is set to the module\'s filename.',
      exampleLabel: 'Module Execution Guard',
      latex:
        '\\mathtt{if\\;\\_\\_name\\_\\_ == "\\_\\_main\\_\\_":\\;main()}',
    },
    {
      title: 'Module Search Order (sys.path)',
      content:
        'sys.path is a list of directory strings searched sequentially. The first directory containing a matching module name is loaded and cached in sys.modules.',
      exampleLabel: 'sys.path Search Order',
      latex:
        '\\text{sys.path} = [\\text{Script Dir}, \\; \\text{PYTHONPATH}, \\; \\text{Standard Lib}, \\; \\text{site-packages}]',
    },
  ],
  equations: [
    {
      name: 'Module Import Caching Invariant',
      latex: '\\text{import mod} \\implies \\begin{cases} \\text{sys.modules}[\\text{"mod"}] & \\text{if already cached} \\\\ \\text{load, execute \\& cache} & \\text{if first import} \\end{cases}',
      summary: 'Guarantees top-level module code executes exactly once per process lifetime regardless of import count.',
      conditions: ['To reload modified modules, importlib.reload() must be called explicitly'],
      variables: [
        { symbol: '\\text{sys.modules}', name: 'Module Cache', unit: '\\text{dict}', description: 'Internal dictionary mapping module names to loaded module objects.', connections: 'Subsequent imports return cached reference in O(1) time.' },
      ],
    },
  ],
};

const oopAndClassesSubPage = {
  id: 'oop-and-classes',
  title: 'OOP: Classes & Properties',
  icon: '🏛️',
  tag: 'Classes & Encapsulation',
  subtitle:
    'Object-oriented programming, class definition, __init__ constructor, the explicit self reference, instance vs class attributes, @classmethod, @staticmethod, and @property.',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'In Python, everything is an object, and classes are first-class objects created via the class keyword. Classes define blueprints for creating instances.',
    'When an instance is created (obj = BankAccount("Alice", 100)), Python invokes __init__(self, ...), passing the new instance as the first argument, conventionally named self.',
    'Instance attributes belong to individual objects (self.balance). Class attributes belong to the class itself and are shared across all instances.',
    'Python favors clean property access over Java-style getters/setters: the @property decorator allows methods to be accessed with attribute syntax while maintaining full validation and encapsulation.',
  ],
  keyConcepts: [
    {
      title: 'The Explicit self Parameter',
      content:
        'Unlike C++ or Java where this is implicit, Python requires methods to explicitly declare self as their first parameter. When calling obj.method(x), Python transforms it into ClassName.method(obj, x).',
      exampleLabel: 'Method Dispatch Transformation',
      latex:
        'obj.\\mathtt{deposit}(100) \\iff \\mathtt{BankAccount.deposit}(obj, 100)',
    },
    {
      title: '@classmethod vs @staticmethod',
      content:
        '• @classmethod: Receives cls (the class object) as first argument; ideal for alternative factory constructors.\n' +
        '• @staticmethod: Does not receive self or cls; simple utility function namespaced inside the class.',
      exampleLabel: 'Factory Constructor Pattern',
      latex:
        '@\\mathtt{classmethod\\;} \\mathtt{def\\;} from\\_json(cls, data): \\; return \\; cls(data["name"])',
    },
    {
      title: 'Pythonic Encapsulation with @property',
      content:
        '@property turns a getter method into a read-only attribute. @attribute.setter defines a setter for validation.',
      exampleLabel: 'Property Decorator Syntax',
      latex:
        '@\\mathtt{property\\;} \\mathtt{def\\;} radius(self): \\dots \\; @\\mathtt{radius.setter\\;} \\mathtt{def\\;} radius(self, val): \\dots',
    },
  ],
  equations: [
    {
      name: 'Attribute Lookup Priority Chain',
      latex: '\\text{Lookup}(obj.x) = \\text{Data Descriptor} \\to obj.\\_\\_dict\\_\\_ \\to \\text{Class Attribute} \\to \\text{Class Descriptor} \\to \\_\\_getattr\\_\\_',
      summary: 'The deterministic sequence Python follows when resolving an attribute name on an object.',
      conditions: ['Governed by Python descriptor protocol'],
      variables: [
        { symbol: 'obj.\\_\\_dict\\_\\_', name: 'Instance Namespace', unit: '\\text{dict}', description: 'Dictionary storing instance attributes.', connections: 'Can be bypassed using __slots__ to save memory.' },
      ],
    },
  ],
};

const inheritanceAndDundersSubPage = {
  id: 'inheritance-and-dunders',
  title: 'Inheritance & Magic Dunders',
  icon: '🪄',
  tag: 'MRO & Operator Overloading',
  subtitle:
    'Inheritance, super() delegation, Method Resolution Order (MRO / C3 Linearization), duck typing, and special magic dunder methods (__str__, __repr__, __len__, __getitem__, __add__).',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'Inheritance allows a subclass to derive attributes and behavior from a base class. Subclasses override methods and invoke parent implementations using super().',
    'Python supports Multiple Inheritance. Method lookup conflicts are resolved deterministically using the C3 Linearization algorithm to compute the Method Resolution Order (MRO). Inspect it via ClassName.mro().',
    'Python protocols rely on Magic Dunder Methods (double underscore names). Implementing dunders allows custom classes to integrate with built-in language operators: __len__ enables len(obj), __getitem__ enables obj[key], and __add__ enables obj1 + obj2.',
    'Duck Typing ("If it walks like a duck and quacks like a duck, it\'s a duck") means Python checks for the presence of methods rather than explicit type hierarchies.',
  ],
  keyConcepts: [
    {
      title: 'The super() Method Resolution Protocol',
      content:
        'super() delegates calls to the next class in the MRO chain. Essential for cooperative multiple inheritance.',
      exampleLabel: 'Super Constructor Chaining',
      latex:
        '\\mathtt{super().\\_\\_init\\_\\_}(name, age) \\implies \\text{Calls next class in MRO}',
    },
    {
      title: 'Representation Dunders: __repr__ vs __str__',
      content:
        '• __str__: User-friendly string representation intended for end-user display (called by print(obj) and str(obj)).\n' +
        '• __repr__: Unambiguous developer representation; should ideally look like valid Python code to recreate the object (called by interactive REPL).',
      exampleLabel: 'Representation Dunder Invariant',
      latex:
        '\\mathtt{\\_\\_repr\\_\\_} \\to \\text{"Point(x=3, y=4)"}, \\qquad \\mathtt{\\_\\_str\\_\\_} \\to \\text{"(3, 4)"}',
    },
    {
      title: 'Operator Overloading Dunders',
      content:
        '• a + b calls a.__add__(b)\n' +
        '• len(a) calls a.__len__()\n' +
        '• a[i] calls a.__getitem__(i)\n' +
        '• a == b calls a.__eq__(b)',
      exampleLabel: 'Vector Addition Overload',
      latex:
        '\\mathtt{def\\;\\_\\_add\\_\\_}(self, other): \\; return \\; Vector(self.x + other.x, self.y + other.y)',
    },
  ],
  equations: [
    {
      name: 'Pythonic Operator Mapping Invariant',
      latex: 'a + b \\iff a.\\_\\_add\\_\\_(b) \\; \\text{or} \\; b.\\_\\_radd\\_\\_(a)',
      summary: 'Dual dispatch protocol for binary operators when left operand does not support the operation.',
      conditions: ['If a.__add__(b) returns NotImplemented, Python tries b.__radd__(a)'],
      variables: [
        { symbol: '\\_\\_radd\\_\\_', name: 'Reflected Binary Operator', unit: '\\text{dunder}', description: 'Right-hand operand fallback when left operand cannot handle the operation.', connections: 'Enables mixed-type math like 2 + Vector(1, 2).' },
      ],
    },
  ],
};

const exceptionsAndFilesSubPage = {
  id: 'exceptions-and-files',
  title: 'Exceptions, Files & Contexts',
  icon: '🛡️',
  tag: 'Robust Systems & with',
  subtitle:
    'Exception hierarchy, try-except-else-finally blocks, custom exception classes, file streams with open(), context managers (with statement), and JSON/CSV serialization.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Robust Python applications follow the EAFP principle ("Easier to Ask for Forgiveness than Permission"): executing code inside a try block and handling exceptions cleanly rather than checking conditions beforehand (LBYL).',
    'The complete exception construct coordinates four clauses: try (monitored code), except (error handler), else (runs only if NO exception occurred), and finally (cleanup guaranteed to run even if an exception or return occurred).',
    'Resource management relies on Context Managers via the with statement: with open("data.txt") as f: guarantees the file descriptor is closed immediately upon exiting the block, even if an exception is raised.',
  ],
  keyConcepts: [
    {
      title: 'The Complete try-except-else-finally Block',
      content:
        '• try: Risky operations.\n' +
        '• except SpecificError as err: Catch specific errors; never use bare except:!\n' +
        '• else: Code that should run only if try succeeded without error.\n' +
        '• finally: Guaranteed cleanup (closing connections, unlocking mutexes).',
      exampleLabel: 'Robust Exception Architecture',
      latex:
        '\\mathtt{try} \\to [\\mathtt{except} \\mid \\mathtt{else}] \\to \\mathtt{finally}',
    },
    {
      title: 'Context Managers & The with Statement',
      content:
        'The with statement automates the Context Management Protocol by invoking __enter__() on entry and __exit__(exc_type, exc_val, exc_tb) on exit.',
      exampleLabel: 'Context Manager Protocol',
      latex:
        '\\mathtt{with\\;} open("file.txt") \\;\\mathtt{as\\;} f: \\dots \\iff f = \\mathtt{open}(); \\; \\mathtt{try}: \\dots \\; \\mathtt{finally}: f.\\mathtt{close}()',
    },
    {
      title: 'JSON & CSV Data Serialization',
      content:
        '• json.dump(obj, fp) / json.dumps(obj): Serializes Python dicts/lists to JSON.\n' +
        '• json.load(fp) / json.loads(str): Deserializes JSON to Python objects.',
      exampleLabel: 'JSON Serialization Syntax',
      latex:
        '\\mathtt{json.dump}(data, f, indent=4); \\quad data = \\mathtt{json.load}(f);',
    },
  ],
  equations: [
    {
      name: 'Context Manager Lifecycle Invariant',
      latex: '\\text{with } X \\text{ as } y \\implies y = X.\\_\\_enter\\_\\_() \\dots X.\\_\\_exit\\_\\_(\\text{exc})',
      summary: 'Guarantees execution of cleanup method __exit__ regardless of whether block completed normally or aborted via exception.',
      conditions: ['If __exit__ returns True, the raised exception is suppressed'],
      variables: [
        { symbol: '\\_\\_exit\\_\\_', name: 'Teardown Hook', unit: '\\text{method}', description: 'Called on block exit with exception details.', connections: 'Guaranteed cleanup of hardware and OS resources.' },
      ],
    },
  ],
};

const pythonicIdiomsSubPage = {
  id: 'pythonic-idioms',
  title: 'Pythonic Idioms & Optimization',
  icon: '⭐',
  tag: 'PEP 8 & Best Practices',
  subtitle:
    'Writing idiomatic "Pythonic" code, Zen of Python, PEP 8 style guide, time complexity of built-in operations, itertools, and memory profiling.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    '"Pythonic" code adheres to the idioms and conventions embraced by the Python community, summarized in Tim Peters\' Zen of Python (import this): "Simple is better than complex", "Readability counts", and "There should be one—and preferably only one—obvious way to do it".',
    'PEP 8 defines formatting standards: 4 spaces per indentation level, snake_case for functions and variables, PascalCase for classes, and UPPER_CASE for constants.',
    'Performance optimization requires knowing Big-O complexities of built-in types: list lookups are O(n), while set and dict lookups are O(1). Checking if x in my_set is hundreds of times faster than if x in my_list.',
  ],
  keyConcepts: [
    {
      title: 'EAFP vs LBYL Philosophy',
      content:
        '• LBYL (Look Before You Leap): Checking conditions first (e.g. if key in d: return d[key]). Subject to race conditions in multi-threaded environments.\n' +
        '• EAFP (Easier to Ask for Forgiveness than Permission): Assuming keys exist and catching KeyError (Pythonic standard).',
      exampleLabel: 'Pythonic EAFP Pattern',
      latex:
        '\\mathtt{try}: \\; val = d[k] \\; \\mathtt{except\\;} \\mathtt{KeyError}: \\dots \\quad \\text{(Idiomatic Python)}',
    },
    {
      title: 'Standard Library Iteration Tools (enumerate & zip)',
      content:
        '• enumerate(seq): Yields (index, element) pairs without manual counter index variables.\n' +
        '• zip(seq1, seq2): Pairs corresponding elements from two sequences in parallel.',
      exampleLabel: 'Clean Iteration Idioms',
      latex:
        '\\mathtt{for\\;} i, item \\;\\mathtt{in\\;} \\mathtt{enumerate}(items): \\dots \\qquad \\mathtt{for\\;} a, b \\;\\mathtt{in\\;} \\mathtt{zip}(x, y): \\dots',
    },
    {
      title: 'Time Complexity of Python Built-ins',
      content:
        '• list.append: O(1) amortized | list.insert(0, x): O(n)\n' +
        '• list search (x in lst): O(n) | set/dict lookup (x in s): O(1) average\n' +
        '• dict.get: O(1) | sorted(lst): O(n log n) (Timsort)',
      exampleLabel: 'Collection Lookup Complexity',
      latex:
        'O(1) \\text{ for set/dict membership} \\quad \\ll \\quad O(n) \\text{ for list membership}',
    },
  ],
  equations: [
    {
      name: 'Python Operation Complexity Comparison',
      latex: 'T_{\\text{lookup}}(\\text{set}) = O(1) \\quad \\text{vs} \\quad T_{\\text{lookup}}(\\text{list}) = O(n)',
      summary: 'Fundamental algorithmic performance disparity between hash-based collections and sequential arrays.',
      conditions: ['Hash function has good distribution; list is unsorted'],
      variables: [
        { symbol: 'n', name: 'Collection Size', unit: '\\text{items}', description: 'Number of elements stored in collection.', connections: 'As n grows to 10^6, set lookups remain instantaneous (~50ns) while list lookups take milliseconds.' },
      ],
    },
  ],
};

const subPages = [
  foundationsSubPage,
  controlFlowAndLoopsSubPage,
  stringsAndTextSubPage,
  listsAndTuplesSubPage,
  dictsAndSetsSubPage,
  comprehensionsAndGeneratorsSubPage,
  functionsAndScopeSubPage,
  functionalAndDecoratorsSubPage,
  modulesAndPackagesSubPage,
  oopAndClassesSubPage,
  inheritanceAndDundersSubPage,
  exceptionsAndFilesSubPage,
  pythonicIdiomsSubPage,
];

const pyProgrammingData = {
  id: 'py-programming',
  title: 'Python Programming',
  subtitle:
    'The complete engineering syllabus: bytecode & PVM runtime, dynamic typing, comprehensions, decorators, object-oriented dunder protocols, and robust systems architecture.',
  level: 'Beginner',
  estimatedTime: '13 Connected Chapters (Complete Technical Syllabus)',
  subPages,
  overview: foundationsSubPage.overview,
  keyConcepts: foundationsSubPage.keyConcepts,
  equations: foundationsSubPage.equations,
  interactiveGuide: foundationsSubPage.interactiveGuide,
};

export default pyProgrammingData;
