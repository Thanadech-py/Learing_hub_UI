/**
 * Comprehensive W3Schools + Handbook Documentation Data for Python Programming
 * Synthesizes CLI_WS/Document/Python-Programming for Learning hub.pdf & CLI_WS/source/Python-Programming lecture slides.
 */

export const PY_HANDBOOK_PARTS = [
  {
    part: 'PART I: CORE FOUNDATIONS & FLOW',
    chapters: ['foundations', 'control-flow-and-loops'],
  },
  {
    part: 'PART II: DATA STRUCTURES & SLICING',
    chapters: ['strings-and-text', 'lists-and-tuples', 'dicts-and-sets', 'comprehensions-and-generators'],
  },
  {
    part: 'PART III: FUNCTIONS, DECORATORS & MODULES',
    chapters: ['functions-and-scope', 'functional-and-decorators', 'modules-and-packages'],
  },
  {
    part: 'PART IV: OOP, DUNDERS & ROBUST SYSTEMS',
    chapters: ['oop-and-classes', 'inheritance-and-dunders', 'exceptions-and-files', 'pythonic-idioms'],
  },
];

export const PY_HANDBOOK_DOCS = {
  foundations: {
    partBadge: 'PART I • CORE FOUNDATIONS, TYPES & FLOW OF CONTROL',
    chapterBadge: 'CHAPTER 1 & 2',
    sections: [
      {
        num: '1.1',
        title: 'The Python Execution Pipeline: Source → Bytecode → PVM',
        paragraphs: [
          'Unlike C which compiles directly to native CPU machine instructions, Python executes through a two-stage virtual machine architecture:',
        ],
        bullets: [
          '1. Bytecode Compilation: The Python parser transforms human-readable `.py` source code into platform-independent bytecode instructions (cached in `__pycache__/*.pyc`).',
          '2. Python Virtual Machine (`PVM`): The PVM—an evaluation loop written in C—reads bytecode instructions and dispatches them at runtime.',
          '3. Interactive Shell (`REPL`) vs Script Mode (Lecture 2): In interactive mode (`>>>`), expressions are evaluated one line at a time. In Script Mode, sequences of statements are saved inside a `.py` module file so experiments (such as changing `Wind = 20` to `Wind = 30` in the Windchill calculation) can be re-run cleanly.',
        ],
      },
      {
        num: '1.2',
        title: 'Variables as Reference Pointers & Dynamic Typing (Lecture 1)',
        paragraphs: [
          'From Lecture 1 (`1. AssignAndTypes.pdf`): in algebra, `=` denotes equality, but in Python `=` is the Assignment Statement (`r = 10` means "variable `r` gets assigned the value `10`"). Exponentiation is written with `**` (`A = 3.14 * r**2`), not `^`.',
          'Under the hood, Python variables do not hold raw values inside fixed-size stack boxes. Instead, every value is an object on the heap (`PyObject`), and a variable name is a reference label bound to that object\'s memory address (`id(x)`).',
        ],
        diagram: {
          type: 'py-references',
          title: 'Lecture 1 Visual Model: Variable Reference Binding & Object Identity',
          bindings: [
            { varName: 'r', arrow: '───►', objType: 'int', objVal: '10', objId: '0x7f8a100' },
            { varName: 'A = 3.14 * r**2', arrow: '───►', objType: 'float', objVal: '314.0', objId: '0x7f8a240' },
            { varName: 'Temp, Wind', arrow: '───►', objType: 'float', objVal: '32.0, 20.0', objId: '0x7f8a380' },
          ],
        },
        table: {
          headers: ['Python Type', 'Category', 'Mutability', 'Example Literals & Characteristics'],
          rows: [
            ['`int`', 'Arbitrary-Precision Integer', 'Immutable', '`42`, `-7`, `0xFF`, `10**100` (Never overflows!)'],
            ['`float`', 'IEEE 754 Double Float (64-bit)', 'Immutable', '`3.14159`, `-0.001`, `2.5e-4` (~15–17 digits precision)'],
            ['`complex`', 'Complex Number', 'Immutable', '`3 + 4j`, `2.5j` (`z.real`, `z.imag`)'],
            ['`bool`', 'Boolean Truth Type (subclass of `int`)', 'Immutable', '`True` (`1`), `False` (`0`)'],
            ['`str`', 'Unicode Text Sequence', 'Immutable', "`'Hello'`, `\"Python\"`, `f\"Val: {x}\"`"],
            ['`NoneType`', 'Null / Absence Singleton', 'Immutable', '`None` (Always test with `is None`)'],
          ],
        },
      },
      {
        num: '1.3',
        title: 'True Division (`/`) vs Floor Division (`//`) & The Windchill Script',
        paragraphs: [
          'Python 3 distinguishes True Division (`7 / 2` → `3.5`, always returns `float`) from Floor Division (`7 // 2` → `3`, truncates down toward $-\\infty$) and Modulo (`7 % 2` → `1`).',
          'Below is the classic National Weather Service Windchill calculation from Lecture 2 (`2. ModulesAndScripts.pdf`), modernized with Python 3 f-strings:',
        ],
        example: {
          title: 'Example: Lecture 1 & 2 Circle Area + National Weather Service Windchill',
          lang: 'python',
          code: `# Lecture 1: Circle Area with ** exponentiation
r = 10
A = 3.14 * r**2
print(f"Radius r = {r} -> Circle Area A = {A}")

# Lecture 2: National Weather Service Windchill Formula
# Applies when T <= 50 F and Wind >= 3 mph
Temp = 32.0
Wind = 20.0
WC = (35.74 + 0.6215 * Temp) + (-35.75 + 0.4275 * Temp) * (Wind ** 0.16)
print(f"Air Temp: {Temp} F | Wind: {Wind} mph -> Windchill: {WC:.2f} F")

# True division (/) vs Floor division (//)
print(f"7 / 2 = {7 / 2} | 7 // 2 = {7 // 2} | 7 % 2 = {7 % 2}")`,
          output: `Radius r = 10 -> Circle Area A = 314.0
Air Temp: 32.0 F | Wind: 20.0 mph -> Windchill: 19.99 F
7 / 2 = 3.5 | 7 // 2 = 3 | 7 % 2 = 1`,
        },
      },
    ],
  },

  'control-flow-and-loops': {
    partBadge: 'PART I • CORE FOUNDATIONS, TYPES & FLOW OF CONTROL',
    chapterBadge: 'CHAPTER 3 & 4',
    sections: [
      {
        num: '3.1',
        title: 'Truthiness, `==` vs `is`, and Conditional Execution (Lecture 3)',
        paragraphs: [
          'From Lecture 3 (`3. ConditionalExec.pdf`): a boolean expression such as `aTob > bToa` evaluates to either `True` or `False` and directs conditional execution (`if ... elif ... else`).',
          'In Python, any object can be tested for truth value: empty collections (`[]`, `{}`, `""`, `set()`), zero numbers (`0`, `0.0`), and `None` are Falsy; all non-empty collections and non-zero numbers are Truthy.',
        ],
        table: {
          headers: ['Comparison / Operator', 'Syntax', 'Semantic Meaning & Best Practice'],
          rows: [
            ['Value Equality', '`a == b`', 'Tests if two objects have equal values (invokes `__eq__`).'],
            ['Object Identity', '`a is b`', 'Tests if two variables point to the exact same memory address (`id(a) == id(b)`). Use for `is None`.'],
            ['Short-Circuit `and`', '`x and y`', 'Returns `x` if `x` is Falsy, otherwise evaluates and returns `y`.'],
            ['Short-Circuit `or`', '`x or y`', 'Returns `x` if `x` is Truthy, otherwise evaluates and returns `y`.'],
          ],
        },
      },
      {
        num: '4.1',
        title: 'Iteration with `range(n)`, Summation Accumulators & `enumerate()` (Lecture 9A)',
        paragraphs: [
          'From Lecture 9A (`9A. IterRange.pdf`): `for k in range(n):` generates the half-open integer sequence `0, 1, 2, ..., n - 1` (stopping strictly before `n`). Rather than recomputing sums from scratch on each step, an accumulator variable `s = 0` updates incrementally via `s = s + x` inside the loop body.',
        ],
        example: {
          title: 'Example: Lecture 3 (a**b vs b**a) & Lecture 9A Power-of-2 Summation',
          lang: 'python',
          code: `# Lecture 3: Compare a**b vs b**a
a = 2
b = 7
aTob = a ** b
bToa = b ** a
print(f"a={a}, b={b} -> a**b = {aTob}, b**a = {bToa}")
if aTob > bToa:
    print(f"Winner: a**b ({aTob})")
else:
    print(f"Winner: b**a ({bToa})")

# Lecture 9A: Summation of powers of 2 using range(n)
n = 4
s = 0
for k in range(n):
    x = 2 ** k
    s = s + x
    print(f"k = {k}: 2**{k} = {x} -> Running sum s = {s}")
print(f"Final Sum (1 + 2 + 4 + 8) = {s}")`,
          output: `a=2, b=7 -> a**b = 128, b**a = 49
Winner: a**b (128)
k = 0: 2**0 = 1 -> Running sum s = 1
k = 1: 2**1 = 2 -> Running sum s = 3
k = 2: 2**2 = 4 -> Running sum s = 7
k = 3: 2**3 = 8 -> Running sum s = 15
Final Sum (1 + 2 + 4 + 8) = 15`,
        },
      },
    ],
  },

  'strings-and-text': {
    partBadge: 'PART II • DATA STRUCTURES & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 5',
    sections: [
      {
        num: '5.1',
        title: 'String Immutability, Extended Slicing `s[start:stop:step]` & String Methods',
        paragraphs: [
          'Python `str` objects are immutable sequences of Unicode characters. Attempting to mutate a character in place (`s[0] = "H"`) raises a `TypeError`. Instead, string methods return new string objects.',
          'Extended slicing `s[start:stop:step]` extracts a subsequence from `start` up to (but excluding) `stop` in increments of `step`. Negative indices count from the right end (`s[-1]` is the last character), and `s[::-1]` reverses a string in one expression.',
        ],
        table: {
          headers: ['String Method / Slice', 'Return Value & Behavior', 'Example Usage'],
          rows: [
            ['`s[start:stop:step]`', 'Extracts slice from `start` to `stop - 1` by `step`', '`"PYTHON"[1:5]` → `"YTHO"`, `"PYTHON"[::-1]` → `"NOHTYP"`'],
            ['`s.strip()` / `lstrip()` / `rstrip()`', 'Removes leading/trailing whitespace (or specified chars)', '`"  hello\\n".strip()` → `"hello"`'],
            ['`s.split(sep)`', 'Splits string by delimiter into a `list` of substrings', '`"a,b,c".split(",")` → `["a", "b", "c"]`'],
            ['`sep.join(iterable)`', 'Concatenates iterable of strings with separator `sep`', '`" - ".join(["A", "B", "C"])` → `"A - B - C"`'],
            ['`s.find(sub)` / `s.replace(a, b)`', 'Returns first index of `sub` (or `-1`) / Replaces substrings', '`"bananas".replace("a", "o")` → `"bononos"`'],
          ],
        },
        example: {
          title: 'Example: Extended String Slicing & Text Processing Pipeline',
          lang: 'python',
          code: `s = "PYTHON_ENGINEERING"
print(f"Original: {s}")
print(f"First 6 chars s[:6]:   {s[:6]}")
print(f"Last 4 chars s[-4:]:   {s[-4:]}")
print(f"Every 2nd char s[::2]: {s[::2]}")
print(f"Reversed s[::-1]:      {s[::-1]}")

raw_csv = "  Alice, 95, Computer_Science  "
fields = [item.strip() for item in raw_csv.strip().split(",")]
print(f"Parsed CSV fields: {fields}")`,
          output: `Original: PYTHON_ENGINEERING
First 6 chars s[:6]:   PYTHON
Last 4 chars s[-4:]:   RING
Every 2nd char s[::2]: PTO_NIERN
Reversed s[::-1]:      GNIREENIGNE_NOHTYP
Parsed CSV fields: ['Alice', '95', 'Computer_Science']`,
        },
      },
    ],
  },

  'lists-and-tuples': {
    partBadge: 'PART II • DATA STRUCTURES & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 6',
    sections: [
      {
        num: '6.1',
        title: 'Dynamic Mutable Lists vs Immutable Tuples & Sequence Unpacking',
        paragraphs: [
          'A `list` (`[10, 20, 30]`) is a dynamic array of object references that supports in-place mutation (`append`, `extend`, `insert`, `pop`, `sort`). A `tuple` (`(10, 20, 30)`) is an immutable record: once created, its elements cannot be reassigned, making tuples hashable and valid as `dict` keys.',
        ],
        table: {
          headers: ['Operation / Method', 'Complexity', 'Effect on `list`'],
          rows: [
            ['`lst.append(x)`', '$O(1)$ amortized', 'Appends single item `x` to the end of `lst` in-place.'],
            ['`lst.extend(iter)`', '$O(k)$', 'Appends all elements from `iter` onto `lst`.'],
            ['`lst.insert(i, x)`', '$O(n)$', 'Inserts `x` at index `i`, shifting subsequent elements right.'],
            ['`lst.pop([i])`', '$O(1)$ at end, $O(n)$ at `i`', 'Removes and returns item at index `i` (defaults to last item `-1`).'],
            ['`lst.sort()` vs `sorted(lst)`', '$O(n \\log n)$ Timsort', '`lst.sort()` sorts in-place (returns `None`); `sorted(lst)` returns a new list.'],
          ],
        },
        example: {
          title: 'Example: List Mutations, Star Unpacking (*rest) & Shallow Copy',
          lang: 'python',
          code: `scores = [88, 72, 95, 91]
scores.append(100)
scores.sort(reverse=True)
print(f"Sorted scores (descending): {scores}")

# Extended iterable unpacking (PEP 3132)
first, second, *others = scores
print(f"Top 1: {first} | Top 2: {second} | Remaining: {others}")

# Alias vs Shallow Copy
alias = scores
copy_list = scores[:]
scores.pop()
print(f"After pop -> alias len: {len(alias)}, copy_list len: {len(copy_list)}")`,
          output: `Sorted scores (descending): [100, 95, 91, 88, 72]
Top 1: 100 | Top 2: 95 | Remaining: [91, 88, 72]
After pop -> alias len: 4, copy_list len: 5`,
        },
      },
    ],
  },

  'dicts-and-sets': {
    partBadge: 'PART II • DATA STRUCTURES & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 7',
    sections: [
      {
        num: '7.1',
        title: 'Dictionaries (`dict` $O(1)$ Hash Maps) & Set Algebra (`set`)',
        paragraphs: [
          'A `dict` maps unique hashable keys to arbitrary values with $O(1)$ average-case lookup, insertion, and deletion, while preserving insertion order (guaranteed since Python 3.7+). Always use `d.get(key, default)` to avoid `KeyError` when a key might be absent.',
          'A `set` is an unordered collection of unique hashable elements supporting fast $O(1)$ membership testing (`x in s`) and mathematical set algebra.',
        ],
        table: {
          headers: ['Set / Dict Operation', 'Syntax', 'Mathematical / Operational Meaning'],
          rows: [
            ['Safe Dict Lookup', '`d.get(key, default)`', 'Returns `d[key]` if present, else `default` (never raises `KeyError`).'],
            ['Dict Key-Value Loop', '`for k, v in d.items():`', 'Iterates over `(key, value)` pairs in insertion order.'],
            ['Set Union', '`A | B` or `A.union(B)`', 'Elements present in `A`, `B`, or both.'],
            ['Set Intersection', '`A & B` or `A.intersection(B)`', 'Elements common to BOTH `A` and `B`.'],
            ['Set Difference / Sym-Diff', '`A - B` / `A ^ B`', 'Elements in `A` not in `B` / Elements in exactly one of `A` or `B`.'],
          ],
        },
        example: {
          title: 'Example: Dictionary Frequency Counter & Set Theory Algebra',
          lang: 'python',
          code: `student = {"id": 6801, "name": "Thanadech", "gpa": 3.92}
major = student.get("major", "Robotics & AI Engineering")
print(f"Student: {student['name']} | GPA: {student['gpa']} | Major: {major}")

A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(f"Union (A | B):         {A | B}")
print(f"Intersection (A & B):  {A & B}")
print(f"Symmetric Diff (A ^ B): {A ^ B}")`,
          output: `Student: Thanadech | GPA: 3.92 | Major: Robotics & AI Engineering
Union (A | B):         {1, 2, 3, 4, 5, 6}
Intersection (A & B):  {3, 4}
Symmetric Diff (A ^ B): {1, 2, 5, 6}`,
        },
      },
    ],
  },

  'comprehensions-and-generators': {
    partBadge: 'PART II • DATA STRUCTURES & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 8',
    sections: [
      {
        num: '8.1',
        title: 'List, Dict & Set Comprehensions vs Lazy Generator Expressions',
        paragraphs: [
          'Comprehensions provide a concise, declarative syntax for transforming and filtering iterables in C-speed bytecode. Replacing brackets `[...]` with parentheses `(...)` creates a lazy Generator Expression that yields items one at a time in $O(1)$ memory.',
        ],
        table: {
          headers: ['Construct', 'Syntax Pattern', 'Memory Profile & Return Type'],
          rows: [
            ['List Comprehension', '`[expr for x in iter if cond]`', 'Eagerly allocates full `list` in memory ($O(n)$ space).'],
            ['Dict Comprehension', '`{k_expr: v_expr for x in iter if cond}`', 'Eagerly constructs a new `dict` mapping.'],
            ['Set Comprehension', '`{expr for x in iter if cond}`', 'Eagerly constructs a deduplicated `set`.'],
            ['Generator Expression', '`(expr for x in iter if cond)`', 'Lazy iterator yielding items on demand ($O(1)$ space).'],
          ],
        },
        example: {
          title: 'Example: List & Dict Comprehensions + Lazy Generator Sum',
          lang: 'python',
          code: `nums = [1, 2, 3, 4, 5, 6, 7, 8]
even_squares = [x**2 for x in nums if x % 2 == 0]
square_map = {x: x**2 for x in nums[:5]}

print(f"Even squares: {even_squares}")
print(f"Square dict:  {square_map}")

# Lazy generator sum (zero intermediate list allocation)
gen_sum = sum(x * x for x in range(1, 6))
print(f"Sum of squares 1..5 via generator: {gen_sum}")`,
          output: `Even squares: [4, 16, 36, 64]
Square dict:  {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
Sum of squares 1..5 via generator: 55`,
        },
      },
    ],
  },

  'functions-and-scope': {
    partBadge: 'PART III • MODULAR FUNCTIONS & FUNCTIONAL PROGRAMMING',
    chapterBadge: 'CHAPTER 9',
    sections: [
      {
        num: '9.1',
        title: 'Function Mechanics, Heron Square Root (Lecture 4), `*args`/`**kwargs` & LEGB Scope',
        paragraphs: [
          'From Lecture 4 (`4. ModulesAndFunctions.pdf`): a function packages a computational idea—like Heron\'s iterative square-root refinement `L = (L + x / L) / 2`—into a reusable factory that takes inputs and returns outputs.',
          'Python resolves variable names following the `LEGB` hierarchy: `L` (Local function scope) → `E` (Enclosing closure scope) → `G` (Global module scope) → `B` (Built-in Python namespace).',
        ],
        table: {
          headers: ['Parameter Syntax', 'Binding Behavior', 'Inside Function Body'],
          rows: [
            ['`def f(a, b=10):`', 'Positional or keyword; `b` has default `10`', 'Regular local variables `a`, `b`'],
            ['`*args`', 'Packs extra positional arguments', 'Received as an immutable `tuple`'],
            ['`**kwargs`', 'Packs extra keyword arguments (`k=v`)', 'Received as a `dict` mapping'],
          ],
        },
        example: {
          title: 'Example: Lecture 4 Heron Square Root Function & *args / **kwargs',
          lang: 'python',
          code: `# Lecture 4: Heron's Iterative Square Root Factory
def heron_sqrt(x, steps=5):
    L = float(x)
    for _ in range(steps):
        L = (L + x / L) / 2.0
    return L

print(f"Heron sqrt(9)  = {heron_sqrt(9):.6f}")
print(f"Heron sqrt(25) = {heron_sqrt(25):.6f}")

def telemetry(sensor, *readings, **meta):
    avg = sum(readings) / len(readings)
    print(f"[{sensor}] Avg: {avg:.1f} | Meta: {meta}")

telemetry("IMU_GYRO", 10.2, 10.6, 10.4, unit="deg/s", hz=200)`,
          output: `Heron sqrt(9)  = 3.000000
Heron sqrt(25) = 5.000000
[IMU_GYRO] Avg: 10.4 | Meta: {'unit': 'deg/s', 'hz': 200}`,
        },
        callout: {
          type: 'warning',
          title: 'Critical Trap: Never Use Mutable Default Arguments!',
          body: 'Default arguments in `def append_item(x, items=[]):` are evaluated ONLY ONCE when `def` is defined, not on each call! Every call without `items` will mutate the exact same shared list. Always use `def append_item(x, items=None): if items is None: items = []`.',
        },
      },
    ],
  },

  'functional-and-decorators': {
    partBadge: 'PART III • MODULAR FUNCTIONS & FUNCTIONAL PROGRAMMING',
    chapterBadge: 'CHAPTER 10 & 11',
    sections: [
      {
        num: '10.1',
        title: 'First-Class Functions, `lambda`, `yield` Generators & `@decorator` Wrappers',
        paragraphs: [
          'In Python, functions are first-class objects. A generator function uses `yield` to produce a value and suspend its stack frame, resuming from that exact line on the next `next()` call. A `@decorator` wraps a target function inside a closure to add logging, timing, caching, or authentication without modifying the function\'s core code.',
        ],
        example: {
          title: 'Example: @trace Decorator Closure & Fibonacci yield Generator',
          lang: 'python',
          code: `def trace_call(func):
    def wrapper(*args, **kwargs):
        print(f"[DECORATOR] Calling {func.__name__}{args}")
        res = func(*args, **kwargs)
        print(f"[DECORATOR] Result = {res}")
        return res
    return wrapper

@trace_call
def compute_energy(mass, velocity):
    return 0.5 * mass * (velocity ** 2)

compute_energy(4.0, 10.0)`,
          output: `[DECORATOR] Calling compute_energy(4.0, 10.0)
[DECORATOR] Result = 200.0`,
        },
      },
    ],
  },

  'modules-and-packages': {
    partBadge: 'PART III • MODULAR FUNCTIONS & FUNCTIONAL PROGRAMMING',
    chapterBadge: 'CHAPTER 12',
    sections: [
      {
        num: '12.1',
        title: 'The Module System (`import`), Standard Library & `if __name__ == "__main__":`',
        paragraphs: [
          'Every `.py` file is a module. When a file is executed directly (`python3 app.py`), Python sets its special variable `__name__` to `"__main__"`. When imported by another module (`import app`), `__name__` is set to `"app"`. Guarding entry-point code with `if __name__ == "__main__":` allows a file to act both as a runnable script and an importable library.',
        ],
        example: {
          title: 'Example: Math Module Imports & __name__ Entry Guard',
          lang: 'python',
          code: `import math

def circle_metrics(radius):
    area = math.pi * (radius ** 2)
    circumference = 2 * math.pi * radius
    return area, circumference

if __name__ == "__main__":
    a, c = circle_metrics(5.0)
    print(f"Module __name__: {__name__}")
    print(f"r=5.0 -> Area: {a:.2f}, Circumference: {c:.2f}")`,
          output: `Module __name__: __main__
r=5.0 -> Area: 78.54, Circumference: 31.42`,
        },
      },
    ],
  },

  'oop-and-classes': {
    partBadge: 'PART IV • OBJECT-ORIENTED PROGRAMMING & PROTOCOLS',
    chapterBadge: 'CHAPTER 13',
    sections: [
      {
        num: '13.1',
        title: 'Classes, `__init__`, Explicit `self` & Instance vs `@classmethod` / `@staticmethod`',
        paragraphs: [
          'When instantiating `obj = MyClass(arg1, arg2)`, Python allocates a new instance and invokes `MyClass.__init__(obj, arg1, arg2)`, passing the instance itself as the first parameter `self`. Attributes bound to `self.attr` belong to that specific instance, whereas attributes assigned directly inside the `class` block are shared across all instances.',
        ],
        table: {
          headers: ['Method Type', 'Decorator', 'First Parameter', 'Primary Purpose'],
          rows: [
            ['Instance Method', 'None (default)', '`self` (Instance)', 'Reads or modifies instance attributes (`self.x`).'],
            ['Class Method', '`@classmethod`', '`cls` (Class object)', 'Alternative constructors (`cls.from_json(...)`) or class-wide state.'],
            ['Static Method', '`@staticmethod`', 'None', 'Utility function logically grouped inside the class namespace.'],
            ['Property Getter', '`@property`', '`self`', 'Exposes a method as a computed attribute (`obj.area` instead of `obj.area()`).'],
          ],
        },
        example: {
          title: 'Example: Sensor Class with __init__ & @property',
          lang: 'python',
          code: `class TemperatureSensor:
    unit_system = "Metric"

    def __init__(self, location, celsius):
        self.location = location
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return (self.celsius * 9.0 / 5.0) + 32.0

sensor = TemperatureSensor("Lab_Server_Rack", 25.0)
print(f"Sensor [{sensor.location}]: {sensor.celsius} C = {sensor.fahrenheit} F")`,
          output: `Sensor [Lab_Server_Rack]: 25.0 C = 77.0 F`,
        },
      },
    ],
  },

  'inheritance-and-dunders': {
    partBadge: 'PART IV • OBJECT-ORIENTED PROGRAMMING & PROTOCOLS',
    chapterBadge: 'CHAPTER 14',
    sections: [
      {
        num: '14.1',
        title: 'Inheritance, `super()`, Method Resolution Order (MRO) & Magic Dunder Methods',
        paragraphs: [
          'Python\'s Data Model is powered by Special ("Dunder" — double underscore) methods. Implementing `__repr__`, `__add__`, `__len__`, or `__eq__` allows your custom classes to work seamlessly with built-in operators (`+`, `==`, `len()`, `print()`).',
        ],
        table: {
          headers: ['Dunder Method', 'Triggered By', 'Expected Return Value'],
          rows: [
            ['`__init__(self, ...)`', '`obj = Class(...)`', '`None` (Initializes instance attributes)'],
            ['`__repr__(self)`', '`repr(obj)` / debugger inspection', 'Unambiguous developer string, e.g. `"Vector2D(3, 4)"`'],
            ['`__str__(self)`', '`print(obj)` / `str(obj)`', 'Human-readable display string'],
            ['`__add__(self, other)`', '`obj1 + obj2`', 'New instance representing the sum'],
            ['`__len__(self)` / `__getitem__`', '`len(obj)` / `obj[k]`', 'Integer length / Element at key or index `k`'],
          ],
        },
        example: {
          title: 'Example: Custom Vector2D with __repr__, __add__ & Magnitude',
          lang: 'python',
          code: `class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector2D({self.x}, {self.y})"

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def magnitude(self):
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2
print(f"v1 + v2 = {v3} | v1 magnitude = {v1.magnitude():.1f}")`,
          output: `v1 + v2 = Vector2D(4, 6) | v1 magnitude = 5.0`,
        },
      },
    ],
  },

  'exceptions-and-files': {
    partBadge: 'PART IV • OBJECT-ORIENTED PROGRAMMING & PROTOCOLS',
    chapterBadge: 'CHAPTER 15 & 16',
    sections: [
      {
        num: '15.1',
        title: 'Structured Exception Handling (`try / except / else / finally`) & `with` Context Managers',
        paragraphs: [
          'Python uses structured exception blocks to recover from runtime errors cleanly, and Context Managers (`with open(...) as fp:`) to guarantee that files, locks, and network sockets are automatically closed (`__exit__`) even if an exception is raised inside the block.',
        ],
        table: {
          headers: ['Block Keyword', 'Execution Condition', 'Typical Purpose'],
          rows: [
            ['`try:`', 'Always executed first', 'Contains operations that may raise an exception.'],
            ['`except ExceptionType as e:`', 'Runs ONLY if a matching exception occurs in `try`', 'Logs error, provides fallback value, or re-raises.'],
            ['`else:`', 'Runs ONLY if `try` completed with ZERO exceptions', 'Code that depends on `try` succeeding but shouldn\'t be caught by `except`.'],
            ['`finally:`', 'ALWAYS runs (whether exception occurred or not)', 'Deterministic cleanup actions.'],
          ],
        },
        example: {
          title: 'Example: Complete try-except-else-finally Block',
          lang: 'python',
          code: `def parse_ratio(num_str, den_str):
    try:
        val = float(num_str) / float(den_str)
    except ValueError:
        print("[ERROR] Invalid number format!")
    except ZeroDivisionError:
        print("[ERROR] Division by zero prevented!")
    else:
        print(f"[SUCCESS] Ratio = {val:.2f}")
    finally:
        print("[FINALLY] Audit step complete.")

parse_ratio("45", "6")
parse_ratio("10", "0")`,
          output: `[SUCCESS] Ratio = 7.50
[FINALLY] Audit step complete.
[ERROR] Division by zero prevented!
[FINALLY] Audit step complete.`,
        },
      },
    ],
  },

  'pythonic-idioms': {
    partBadge: 'PART IV • OBJECT-ORIENTED PROGRAMMING & PROTOCOLS',
    chapterBadge: 'CHAPTER 17 & APPENDICES',
    sections: [
      {
        num: '17.1',
        title: "Common Python Pitfalls, Memory Internals (GIL) & Master Built-in Reference",
        paragraphs: [
          'CPython manages memory automatically using Reference Counting (`ob_refcnt`) paired with a Cyclic Garbage Collector (`gc`). Below is the defensive summary of Python traps and the Master Built-in Functions & Collection Methods Cheat Sheet from Appendices A–C.',
        ],
        table: {
          headers: ['Common Python Trap', 'Buggy Pattern', 'Why It Fails', 'Pythonic Solution'],
          rows: [
            ['Mutating List While Iterating', '`for x in lst: lst.remove(x)`', 'Internal iterator index skips adjacent elements', 'Iterate over copy `for x in lst[:]:` or use list comprehension'],
            ['Mutable Default Arg', '`def f(items=[]):`', 'Default list created once at `def` time and shared across calls', 'Use `def f(items=None): items = [] if items is None else items`'],
            ['Late-Binding Loop Closures', '`[lambda: i for i in range(4)]`', 'All lambdas look up `i` after loop ends (all return `3`)', 'Capture default arg: `[lambda i=i: i for i in range(4)]`'],
            ['Identity vs Equality', '`if x == None:`', 'Slow and can be overridden by custom `__eq__`', 'Always use identity: `if x is None:`'],
          ],
        },
      },
      {
        num: 'App.B',
        title: 'Appendix B & C: Master Built-in Functions & Collection Methods Cheat Sheet',
        paragraphs: [
          'Essential built-in functions and collection methods available in every Python 3 environment:',
        ],
        table: {
          headers: ['Function / Collection', 'Key Signatures & Methods', 'Operational Summary'],
          rows: [
            ['Iteration & Pairing', '`range(start, stop, step)`, `enumerate(it)`, `zip(a, b)`', 'Lazy index sequence, `(idx, val)` pairs, parallel tuple pairing'],
            ['Aggregation & Sorting', '`len(s)`, `sum(it)`, `min(it)`, `max(it)`, `sorted(it, key=...)`', 'Fast C-level sequence reduction and Timsort ordering'],
            ['Logic & Introspection', '`any(it)`, `all(it)`, `isinstance(x, T)`, `id(x)`, `type(x)`', 'Short-circuit boolean checks and runtime type/memory inspection'],
            ['`str` Methods', '`.strip()`, `.split()`, `.join()`, `.replace()`, `.find()`, `.upper()`', 'Immutable text transformations (always return a new `str`)'],
            ['`list` / `dict` / `set`', '`lst.append()`, `d.get(k, default)`, `d.items()`, `s1 & s2`, `s1 | s2`', 'Core mutable container operations ($O(1)$ amortized)'],
          ],
        },
      },
    ],
  },
};
