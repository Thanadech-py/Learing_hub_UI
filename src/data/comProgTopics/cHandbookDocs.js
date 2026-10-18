/**
 * Comprehensive W3Schools + Handbook Documentation Data for C Programming
 * Synthesizes CLI_WS/Document/C-Programming for Learning hub.pdf & CLI_WS/source/C-Programming lecture slides.
 */

export const C_HANDBOOK_PARTS = [
  {
    part: 'PART I: CORE FOUNDATIONS & FLOW',
    chapters: ['foundations', 'types-and-operators', 'control-flow'],
  },
  {
    part: 'PART II: ARRAYS, MATRICES & STRINGS',
    chapters: ['arrays-and-matrices', 'strings-and-text'],
  },
  {
    part: 'PART III: POINTERS & MODULAR FUNCTIONS',
    chapters: ['pointers-and-memory', 'functions-and-scope'],
  },
  {
    part: 'PART IV: STRUCTS, UNIONS & FILE I/O',
    chapters: ['structs-and-unions', 'file-io'],
  },
  {
    part: 'PART V: SYSTEMS C & APPENDICES',
    chapters: ['dynamic-memory', 'preprocessor-and-cli', 'defensive-c'],
  },
];

export const C_HANDBOOK_DOCS = {
  foundations: {
    partBadge: 'PART I • CORE FOUNDATIONS & PROBLEM SOLVING',
    chapterBadge: 'CHAPTER 1',
    sections: [
      {
        num: '1.1',
        title: 'Computer System Anatomy & Memory Architecture',
        paragraphs: [
          'A modern computer system comprises four foundational subsystems: the Central Processing Unit (`CPU`), Primary Memory (`RAM`/`ROM`), Secondary Storage (`SSD`/`HDD`), and Input/Output (`I/O`) peripherals. The CPU executes discrete machine instructions fetched sequentially from primary memory via the system bus.',
          'Memory is organized as a linear sequence of addressable 8-bit byte cells. Each byte possesses a unique numerical memory address, conventionally represented in hexadecimal notation (e.g., `0x7ffeefbff5ac` or slide notation `0xFFF0`). In C, variables are symbolic names mapped directly by the compiler to specific memory locations holding binary bit patterns.',
        ],
        diagram: {
          type: 'memory-cells',
          title: 'Lecture Slide Model: Hardware Memory Address Map (Week 1)',
          cells: [
            { addr: '0xFFF0', val: "'C' (67)", type: 'char (1B)', note: 'Single ASCII byte' },
            { addr: '0xFFF1', val: '22', type: 'short (2B)', note: 'Spans 0xFFF1..0xFFF2' },
            { addr: '0xFFF3', val: '78.1945', type: 'float (4B)', note: 'Spans 0xFFF3..0xFFF6' },
            { addr: '0xFFF7', val: "'D'", type: 'char (1B)', note: 'Contiguous cell' },
            { addr: '0xFFF8', val: "'L'", type: 'char (1B)', note: 'Contiguous cell' },
            { addr: '0xFFF9', val: "'R'", type: 'char (1B)', note: 'Contiguous cell' },
          ],
        },
        table: {
          headers: ['Subsystem', 'Primary Function', 'Speed & Volatility', 'C Language Interaction'],
          rows: [
            ['CPU Registers', 'Ultra-fast internal CPU storage for immediate operand calculation.', '< 1 ns, Volatile', 'Implicitly managed by compiler; `register` keyword hint.'],
            ['Primary Memory (RAM)', 'Stores active program instructions, stack frames, and heap data.', '~10–50 ns, Volatile', 'Directly accessed via variable names and pointers (`&`, `*`).'],
            ['Secondary Storage', 'Persistent non-volatile file and data repository.', '~10 μs – 10 ms, Non-volatile', 'Accessed via standard file stream APIs (`fopen`, `fread`, `fwrite`).'],
            ['I/O Peripherals', 'Human interface (keyboard, monitor) and network streams.', 'Variable, Interrupt-driven', 'Abstracted via standard streams: `stdin`, `stdout`, `stderr`.'],
          ],
        },
      },
      {
        num: '1.2',
        title: 'Language Hierarchy & The Four Stages of C Compilation',
        paragraphs: [
          'Programming languages span from Low-Level (`Machine Code` consisting of binary `0`s and `1`s, and `Assembly` mnemonics tied to specific processor architectures) to High-Level languages like `C`, which provide human-readable abstractions, structured control flow, and portable data types.',
          'A C compiler does not translate source code (`Lab0.c`) directly into a running binary (`Lab0.exe`) in a single step. The build pipeline proceeds through four deterministic phases:',
        ],
        bullets: [
          '1. Preprocessing (`gcc -E`): Processes directives beginning with `#`. Strips comments, expands macros (`#define`), and injects header declarations (`#include`) into a pure C translation unit (`.i`).',
          '2. Compilation (`gcc -S`): Parses preprocessed source code, performs lexical/syntactic/type analysis, optimizes, and generates target-specific Assembly code (`.s`).',
          '3. Assembly (`gcc -c`): Translates assembly mnemonics into relocatable machine-code Object files (`.o` / `.obj`).',
          '4. Linking (`ld`): Binds compiled object files with pre-compiled standard library routines (e.g., `printf` from `libc`) and resolves symbol addresses to produce an Executable Binary (`a.out` or `.exe`).',
        ],
        callout: {
          type: 'tip',
          title: 'Tooling Tip: Inspecting Compilation Stages in GCC/Clang',
          body: 'You can inspect each intermediate artifact using compiler flags: `gcc -E main.c -o main.i` (Preprocess), `gcc -S main.i -o main.s` (Assembly), `gcc -c main.s -o main.o` (Object file), and `gcc main.o -o program` (Final Link).',
        },
      },
      {
        num: '1.3',
        title: 'Algorithmic Problem Solving (IPO) & Flowchart Standards',
        paragraphs: [
          'From the Week 1 Engineering Lecture: rigorous software engineering begins with Problem Analysis using the Input-Process-Output (`IPO`) model before writing a single line of C code.',
        ],
        diagram: {
          type: 'ipo-flowchart',
          title: 'Week 1 Lecture Examples: Problem Analysis & ANSI Flowchart Symbols',
          ipoExamples: [
            {
              name: 'Example 1: Area of a Circle',
              input: 'Radius (r)',
              process: 'Area = π × r² (3.14159 * r * r)',
              output: 'Circle Area',
            },
            {
              name: 'Example 2: Total Product Price',
              input: 'Price/Piece, Amount',
              process: 'Total = Price/Piece × Amount',
              output: 'Total Price',
            },
          ],
          symbols: [
            { shape: '⬭ Oval (Terminal)', meaning: 'Demarcates the absolute `Start` or `End` of a program or function.' },
            { shape: '▱ Parallelogram (I/O)', meaning: 'Signifies reading input (`scanf`) or displaying output (`printf`).' },
            { shape: '▭ Rectangle (Process)', meaning: 'Denotes arithmetic calculations, variable assignments, or memory operations.' },
            { shape: '◇ Diamond (Decision)', meaning: 'Represents conditional branching (`if-else` / loop test) with `True` and `False` paths.' },
            { shape: '○ Small Circle (Joint)', meaning: 'Connector joining converging flowlines without crossing arrows.' },
          ],
        },
      },
      {
        num: '1.4',
        title: 'Anatomical Structure of a C Program & Stream I/O',
        paragraphs: [
          'Every standard C program requires an entry-point function named `main`. The standard header `<stdio.h>` exposes formatted stream operations `printf` (formatted output to `stdout`) and `scanf` (formatted input from `stdin`).',
        ],
        example: {
          title: 'Example: Celsius to Fahrenheit & Circle Area Calculator',
          lang: 'c',
          code: `#include <stdio.h> /* Exposes printf and scanf prototypes */

int main(void) {
    double celsius = 28.5;
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    double radius = 10.0;
    double area = 3.14159 * radius * radius;

    printf("--- Temperature Conversion ---\\n");
    printf("%.2f C = %.2f F\\n", celsius, fahrenheit);

    printf("\\n--- Week 1 Circle Area Problem ---\\n");
    printf("Radius: %.1f -> Circle Area: %.2f\\n", radius, area);

    return 0; /* Zero status indicates clean execution */
}`,
          output: `--- Temperature Conversion ---
28.50 C = 83.30 F

--- Week 1 Circle Area Problem ---
Radius: 10.0 -> Circle Area: 314.16`,
        },
        callout: {
          type: 'critical',
          title: 'Critical Concept: The Address-Of Operator (&) in scanf',
          body: 'While `printf` receives copies of variable values, `scanf` must directly modify the caller\'s variable in memory. Therefore, passing a primitive variable name without `&` (e.g., `scanf("%d", x)` instead of `scanf("%d", &x)`) passes a value instead of a memory address, triggering Undefined Behavior or an immediate Segmentation Fault!',
        },
      },
    ],
  },

  'types-and-operators': {
    partBadge: 'PART I • CORE FOUNDATIONS & PROBLEM SOLVING',
    chapterBadge: 'CHAPTER 2',
    sections: [
      {
        num: '2.1',
        title: 'Identifiers, Keywords, and Data Representation',
        paragraphs: [
          'Identifiers are user-defined tokens naming variables, functions, and types. In ISO C, every identifier must adhere to strict lexical rules:',
        ],
        bullets: [
          'Must begin with an alphabetic letter (`a-z`, `A-Z`) or an underscore (`_`). Starting with a digit (e.g., `2ndValue`) is a syntax error.',
          'May contain only alphanumeric characters and underscores; spaces and punctuation symbols are illegal.',
          'Strictly case-sensitive: `TotalScore`, `totalScore`, and `TOTALSCORE` are three completely distinct variables.',
          'Cannot match any of the 32 reserved C89/C99 keywords (e.g., `auto`, `int`, `break`, `sizeof`, `typedef`, `volatile`, `struct`, `return`).',
        ],
      },
      {
        num: '2.2',
        title: 'Fundamental Primitive Types & Fixed-Width Standards',
        paragraphs: [
          'The C language specifies minimum bit ranges for primitive types, while exact widths depend on the target architecture (`x86_64` vs `ARM` vs `AVR`). To write portable systems code, `<stdint.h>` (C99) defines exact-width integer types:',
        ],
        table: {
          headers: ['Type Specifier', 'Standard Meaning', 'Typical Width (x86_64)', 'Format Specifier', 'Value Range'],
          rows: [
            ['`char`', 'Smallest addressable unit / ASCII character', '1 Byte (8 bits)', '`%c` / `%d`', '-128 to 127 (or 0 to 255)'],
            ['`short int`', 'Short signed integer', '2 Bytes (16 bits)', '`%hd`', '-32,768 to 32,767'],
            ['`int`', 'Standard system word integer', '4 Bytes (32 bits)', '`%d` / `%i`', '-2,147,483,648 to 2,147,483,647'],
            ['`long int`', 'Extended signed integer', '8 Bytes (64 bits)', '`%ld`', '≈ -9.22×10¹⁸ to 9.22×10¹⁸'],
            ['`float`', 'Single-precision IEEE 754 float', '4 Bytes (32 bits)', '`%f`', '~6–7 decimal digits precision'],
            ['`double`', 'Double-precision IEEE 754 float', '8 Bytes (64 bits)', '`%lf` (`%f` in printf)', '~15–17 decimal digits precision'],
            ['`int32_t`', 'Exact 32-bit signed int (`<stdint.h>`)', '4 Bytes (32 bits)', '`PRId32` / `%d`', '-2,147,483,648 to 2,147,483,647'],
            ['`uint64_t`', 'Exact 64-bit unsigned int (`<stdint.h>`)', '8 Bytes (64 bits)', '`PRIu64` / `%lu`', '0 to 18,446,744,073,709,551,615'],
            ['`size_t`', 'Unsigned byte count from `sizeof`', '8 Bytes (64-bit)', '`%zu`', 'Object size capacity in bytes'],
          ],
        },
      },
      {
        num: '2.3',
        title: 'Division Truncation, Modulo & Prefix vs Postfix (++ / --)',
        paragraphs: [
          'When both operands of the division operator (`/`) are integers, C performs truncating integer division, discarding any fractional remainder towards zero (`7 / 2` evaluates to `3`, not `3.5`). Floating-point division occurs only if at least one operand is a floating-point type (`7.0 / 2` evaluates to `3.5`). The modulo operator (`%`) computes the remainder of integer division and requires strictly integer operands.',
          'The increment (`++`) and decrement (`--`) operators modify a variable by `1`. Prefix (`++x`) increments prior to yielding the value; Postfix (`x++`) yields the current value first and increments afterward.',
        ],
        example: {
          title: 'Example: Integer Truncation, Explicit Casting & Prefix/Postfix',
          lang: 'c',
          code: `#include <stdio.h>

int main(void) {
    int sum = 25, count = 4;
    double truncated = sum / count;           /* 25 / 4 = 6 -> 6.00 */
    double exact = (double)sum / count;       /* 25.0 / 4 = 6.25 */

    printf("Without cast (sum / count): %.2f\\n", truncated);
    printf("With cast ((double)sum / count): %.2f\\n", exact);
    printf("Remainder (25 %% 4): %d\\n", sum % count);

    int a = 5, b = 5;
    int res1 = ++a; /* Prefix: a becomes 6, res1 gets 6 */
    int res2 = b++; /* Postfix: res2 gets 5, b becomes 6 */
    printf("\\nPrefix (++a): res1 = %d, a = %d\\n", res1, a);
    printf("Postfix (b++): res2 = %d, b = %d\\n", res2, b);

    return 0;
}`,
          output: `Without cast (sum / count): 6.00
With cast ((double)sum / count): 6.25
Remainder (25 % 4): 1

Prefix (++a): res1 = 6, a = 6
Postfix (b++): res2 = 5, b = 6`,
        },
        callout: {
          type: 'warning',
          title: 'Pitfall: Undefined Behavior in Unsequenced Modifications',
          body: 'Expressions that modify a scalar variable more than once without an intervening sequence point (such as `x = x++` or `printf("%d %d", ++i, i++)`) are strictly Undefined Behavior (UB) in ISO C. Never write multiple increments to the same variable in a single statement!',
        },
      },
    ],
  },

  'control-flow': {
    partBadge: 'PART I • CORE FOUNDATIONS & PROBLEM SOLVING',
    chapterBadge: 'CHAPTER 3 & 4',
    sections: [
      {
        num: '3.1',
        title: 'Boolean Truth Semantics & Short-Circuit Evaluation',
        paragraphs: [
          'In C, conditional expressions evaluate using numerical truth semantics: `0` (or `NULL`) represents `False`, while any non-zero value (`1`, `-5`, `42`) represents `True`. Relational and equality operators always evaluate to `1` when true and `0` when false. Including `<stdbool.h>` (C99) provides the `bool` alias along with `true` (`1`) and `false` (`0`).',
          'Logical AND (`&&`) and Logical OR (`||`) enforce strict left-to-right Short-Circuit Evaluation: in `expr1 && expr2`, if `expr1` is false (`0`), `expr2` is never evaluated. This enables safe pointer guards: `if (ptr != NULL && *ptr > 0)`.',
        ],
        table: {
          headers: ['Operator Category', 'Symbols', 'Operational Meaning', 'Short-Circuit?'],
          rows: [
            ['Equality', '`==`, `!=`', 'Equal to, Not equal to (Note: `=` is assignment!)', 'No'],
            ['Relational', '`<`, `<=`, `>`, `>=`', 'Ordering comparisons (yields `1` or `0`)', 'No'],
            ['Logical NOT', '`!expr`', 'Inverts truthiness (`!0` → `1`, `!5` → `0`)', 'Unary'],
            ['Logical AND', '`a && b`', 'True (`1`) only if BOTH operands are non-zero', 'Yes (skips `b` if `a == 0`)'],
            ['Logical OR', '`a || b`', 'True (`1`) if EITHER operand is non-zero', 'Yes (skips `b` if `a != 0`)'],
            ['Ternary Conditional', '`cond ? expr1 : expr2`', 'Evaluates `expr1` if `cond` is non-zero, else `expr2`', 'Yes'],
          ],
        },
      },
      {
        num: '3.2',
        title: 'Branching (`if-else`, `switch-case`) & Loop Taxonomy (`for`, `while`, `do-while`)',
        paragraphs: [
          'C provides cascading `if-else if-else` ladders for range checks and `switch-case` jump tables for discrete integer/character constants. In a `switch` block, every `case` must end with `break;` unless intentional fall-through is desired.',
          'For repetition, `for` and `while` are pre-test loops (condition checked before each iteration; body may execute `0` times), whereas `do { ... } while (cond);` is a post-test loop (guaranteed to execute at least once).',
        ],
        table: {
          headers: ['Loop Construct', 'Syntax Pattern', 'Test Timing', 'Best Engineering Use Case'],
          rows: [
            ['`for` loop', '`for (init; cond; step) { ... }`', 'Pre-test (Top)', 'Counted iteration where bounds are known (e.g., array traversal `0..N-1`).'],
            ['`while` loop', '`while (cond) { ... }`', 'Pre-test (Top)', 'Indefinite sentinel or stream-reading loops (`while (scanf(...) == 1)`).'],
            ['`do-while` loop', '`do { ... } while (cond);`', 'Post-test (Bottom)', 'Interactive menus or input validation that must run at least once.'],
          ],
        },
        example: {
          title: 'Example: Grade Classification, Switch Jump & Loop Summation',
          lang: 'c',
          code: `#include <stdio.h>

int main(void) {
    int score = 86;
    char grade = (score >= 80) ? 'A' : (score >= 70) ? 'B' : 'C';
    printf("Score: %d -> Assigned Grade: %c\\n", score, grade);

    switch (grade) {
        case 'A':
            printf("Status: Honors Distinction\\n");
            break;
        case 'B':
            printf("Status: Merit Pass\\n");
            break;
        default:
            printf("Status: Standard Review\\n");
            break;
    }

    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i * i;
        printf("Step %d: i^2 = %d (Running sum = %d)\\n", i, i * i, sum);
    }
    return 0;
}`,
          output: `Score: 86 -> Assigned Grade: A
Status: Honors Distinction
Step 1: i^2 = 1 (Running sum = 1)
Step 2: i^2 = 4 (Running sum = 5)
Step 3: i^2 = 9 (Running sum = 14)
Step 4: i^2 = 16 (Running sum = 30)
Step 5: i^2 = 25 (Running sum = 55)`,
        },
      },
    ],
  },

  'arrays-and-matrices': {
    partBadge: 'PART II • DATA COLLECTIONS & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 5 & 6',
    sections: [
      {
        num: '5.1',
        title: 'Contiguous 1D Arrays & Zero-Based Memory Indexing',
        paragraphs: [
          'An array is a fixed-size, homogeneous collection of elements stored in strictly contiguous memory bytes. For `Type arr[N]`, valid indices run from `0` to `N - 1`. The hardware byte address of element `i` is calculated in $O(1)$ constant time as `BaseAddress + i * sizeof(Type)`.',
          'Partial initialization (e.g., `int arr[100] = {0};` or `{10, 20}`) automatically zero-fills all remaining unspecified elements.',
        ],
        table: {
          headers: ['Declaration Syntax', 'Memory Behavior', 'Element Values'],
          rows: [
            ['`int a[5];` (Local scope)', 'Allocates 20 bytes on stack; uninitialized!', 'Contains indeterminate garbage bits'],
            ['`int a[5] = {10, 20, 30, 40, 50};`', 'Explicitly initializes all 5 elements', '`{10, 20, 30, 40, 50}`'],
            ['`int a[5] = {10, 20};`', 'Partial list: remaining elements zeroed', '`{10, 20, 0, 0, 0}`'],
            ['`int a[5] = {0};`', 'Universal C idiom for zero-filling an array', '`{0, 0, 0, 0, 0}`'],
            ['`int a[] = {2, 4, 6};`', 'Compiler deduces length `3` (`sizeof(a)/sizeof(a[0])`)', '`{2, 4, 6}`'],
          ],
        },
      },
      {
        num: '6.1',
        title: '2D Matrices, Row-Major Storage & In-Place Array Reversal',
        paragraphs: [
          'Two-dimensional arrays `int mat[ROWS][COLS]` are stored sequentially in Row-Major Order: all elements of Row 0 are laid out first (`mat[0][0], mat[0][1], ...`), followed immediately by Row 1. The linear offset is `(r * COLS + c) * sizeof(Type)`.',
        ],
        example: {
          title: 'Example: Array Min/Max, In-Place Reversal & 2D Matrix Addition',
          lang: 'c',
          code: `#include <stdio.h>

int main(void) {
    int arr[5] = {12, 85, 34, 99, 40};
    int min = arr[0], max = arr[0], sum = 0;

    for (int i = 0; i < 5; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
        sum += arr[i];
    }
    printf("Array Stats -> Avg: %.2f | Min: %d | Max: %d\\n", sum / 5.0, min, max);

    /* 2D Matrix Addition (Week 10 Lecture Example) */
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{10, 20}, {30, 40}};
    printf("\\n2D Matrix Sum (A + B):\\n");
    for (int r = 0; r < 2; r++) {
        printf("[ %d  %d ]\\n", A[r][0] + B[r][0], A[r][1] + B[r][1]);
    }
    return 0;
}`,
          output: `Array Stats -> Avg: 54.00 | Min: 12 | Max: 99

2D Matrix Sum (A + B):
[ 11  22 ]
[ 33  44 ]`,
        },
      },
    ],
  },

  'strings-and-text': {
    partBadge: 'PART II • DATA COLLECTIONS & TEXT PROCESSING',
    chapterBadge: 'CHAPTER 7',
    sections: [
      {
        num: '7.1',
        title: 'Null-Terminated Strings (`\\0`) & Week 7 Lecture Examples',
        paragraphs: [
          'In C, a string is a 1D `char` array terminated by the Null Character `\'\\0\'` (ASCII byte `0x00`). Thus, storing an 8-letter word like `"SAWASDEE"` requires an array of at least `9` bytes (`char ch[9] = "SAWASDEE";`), and `"KMUTNB"` requires `7` bytes (`char name[7] = "KMUTNB";`).',
          'When `printf("%s", str)` prints a string, it outputs characters starting at index `0` and stops immediately upon encountering the first `\'\\0\'` byte. For example, `printf("abcd\\0efgh");` prints only `abcd`!',
        ],
        diagram: {
          type: 'string-cells',
          title: 'Week 7 Lecture Slide Diagram: char ch[9] = "SAWASDEE" & String Reversal',
          arrays: [
            {
              name: 'char ch[9] = "SAWASDEE";',
              cells: ['S', 'A', 'W', 'A', 'S', 'D', 'E', 'E', '\\0'],
            },
            {
              name: 'char name[7] = "KMUTNB";',
              cells: ['K', 'M', 'U', 'T', 'N', 'B', '\\0'],
            },
            {
              name: 'rev[i] = name[5 - i];',
              cells: ['B', 'N', 'T', 'U', 'M', 'K', '\\0'],
            },
          ],
        },
      },
      {
        num: '7.2',
        title: 'The Standard `<string.h>` & `<ctype.h>` Function Suite',
        paragraphs: [
          'Never compare C strings with `==` (`str1 == str2` compares memory addresses, not characters!). Always use `<string.h>` routines:',
        ],
        table: {
          headers: ['Function Prototype', 'Operational Behavior', 'Safety & Complexity Note'],
          rows: [
            ['`strlen(s)`', 'Returns number of characters BEFORE `\'\\0\'`.', '$O(n)$ scan; excludes `\'\\0\'` (`sizeof` includes `\'\\0\'`).'],
            ['`strcpy(dest, src)` / `strncpy`', 'Copies string `src` into buffer `dest`.', 'Ensure `dest` is large enough; `snprintf(dest, sz, "%s", src)` is safest.'],
            ['`strcat(dest, src)` / `strncat`', 'Appends `src` onto the end of `dest`.', '`dest` must have space for `strlen(dest) + strlen(src) + 1`.'],
            ['`strcmp(s1, s2)`', 'Lexicographical comparison: returns `0` if equal, `<0` if `s1 < s2`, `>0` if `s1 > s2`.', 'Test equality with `if (strcmp(a, b) == 0)`.'],
            ['`fgets(buf, size, stdin)`', 'Reads at most `size - 1` chars including spaces and appends `\'\\0\'`.', 'Replaces unsafe `gets()`; strip trailing `\'\\n\'` with `strcspn`.'],
          ],
        },
        example: {
          title: 'Example: Week 7 KMUTNB String Reversal & String Mutation',
          lang: 'c',
          code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[7] = "KMUTNB";
    char rev[7];

    for (int i = 0; i < 6; i++) {
        rev[i] = name[5 - i];
    }
    rev[6] = '\\0'; /* Mandatory null terminator! */

    printf("Original: %s (strlen=%zu, sizeof=%zu)\\n", name, strlen(name), sizeof(name));
    printf("Reversed: %s\\n", rev);

    /* Week 7 Slide Exercise: Modify FRIDAY -> MONDAY */
    char day[7] = "FRIDAY";
    day[0] = 'M'; day[1] = 'O'; day[2] = 'N';
    printf("Modified day: %s\\n", day);
    return 0;
}`,
          output: `Original: KMUTNB (strlen=6, sizeof=7)
Reversed: BNTUMK
Modified day: MONDAY`,
        },
      },
    ],
  },

  'pointers-and-memory': {
    partBadge: 'PART III • MEMORY ADDRESSING & MODULAR FUNCTIONS',
    chapterBadge: 'CHAPTER 8',
    sections: [
      {
        num: '8.1',
        title: 'Pointer Anatomy: Address-Of (`&`) and Dereferencing (`*`)',
        paragraphs: [
          'A pointer is a variable whose value is the hexadecimal memory address of another object. If `int age = 14;`, then `int *p = &age;` stores the memory address of `age`. Writing `*p` dereferences the pointer, reading or writing the `int` stored at that address (`*&x` is identically `x`).',
          'From the Week 8 Lecture Slides: multiple pointers (`int *p = &x, *q = &x;`) can alias the exact same variable. Modifying `*p = 8;` immediately changes `x` and `*q` to `8`!',
        ],
        table: {
          headers: ['Expression', 'Type', 'Evaluation Meaning (Given `int a = 7, b = 2; int *pa = &a, *pb = &b;`)'],
          rows: [
            ['`&a` / `pa`', '`int *`', 'Memory address of variable `a` (e.g., `0x7ffee1a0`).'],
            ['`*pa`', '`int`', 'Value stored inside `a` (`7`).'],
            ['`*pa + *pb`', '`int`', 'Adds dereferenced values: `7 + 2 = 9`.'],
            ['`*(pa + i)`', '`int`', 'Pointer offset dereference: identical to `pa[i]`. Advances by `i * sizeof(int)` bytes.'],
            ['`*pa += 10`', '`int`', 'Adds `10` directly to `a` in memory (`a` becomes `17`).'],
          ],
        },
        example: {
          title: 'Example: Week 8 Lecture Pointer Aliasing & Array Pointer Offset',
          lang: 'c',
          code: `#include <stdio.h>

int main(void) {
    int x = 4 + 3;
    int *p = &x;
    int *q = &x;

    *p = 8;          /* x becomes 8 */
    x = *p + *q;     /* 8 + 8 = 16 */
    printf("After *p + *q: x = %d\\n", x);

    int a[4] = {10, 20, 30, 40};
    int *pa = a;     /* Points to a[0] */
    *pa = 138;       /* a[0] = 138 */
    *(pa + 2) = 4;   /* a[2] = 4 */
    *pa += 10;       /* a[0] becomes 148 */

    printf("Array via pointer: a[0]=%d, a[1]=%d, a[2]=%d\\n", a[0], a[1], a[2]);
    return 0;
}`,
          output: `After *p + *q: x = 16
Array via pointer: a[0]=148, a[1]=20, a[2]=4`,
        },
      },
    ],
  },

  'functions-and-scope': {
    partBadge: 'PART III • MEMORY ADDRESSING & MODULAR FUNCTIONS',
    chapterBadge: 'CHAPTER 9 & 10',
    sections: [
      {
        num: '9.1',
        title: 'Modular Functions, Pass-by-Value vs Pass-by-Reference via Pointers',
        paragraphs: [
          'C passes scalar arguments strictly by value: a function receives a local stack copy. To allow a function to modify caller variables (such as `exchange(&a, &b)` or returning multiple outputs like `calAreaVol(w, l, h, &area, &vol)` from Week 10 Lecture), pass pointer addresses!',
        ],
        table: {
          headers: ['Storage Class / Scope', 'Lifetime', 'Visibility Scope', 'Default Initial Value'],
          rows: [
            ['`auto` (Local variable)', 'Created on function entry; destroyed on return', 'Block / Function local', 'Uninitialized (Garbage)'],
            ['`static` (Local static)', 'Entire program execution (retains value between calls!)', 'Block / Function local', 'Zero (`0`)'],
            ['Global variable', 'Entire program execution (`.data` / `.bss` segment)', 'File / Program global', 'Zero (`0`)'],
          ],
        },
        example: {
          title: 'Example: Week 10 Swap by Reference & Multi-Output calAreaVol()',
          lang: 'c',
          code: `#include <stdio.h>

void exchange(int *pa, int *pb) {
    int temp = *pa;
    *pa = *pb;
    *pb = temp;
}

void calAreaVol(float w, float l, float h, float *area, float *vol) {
    *area = w * l;
    *vol = w * l * h;
}

int main(void) {
    int x = 15, y = 90;
    exchange(&x, &y);
    printf("Swapped: x = %d, y = %d\\n", x, y);

    float a, v;
    calAreaVol(4.0f, 5.0f, 3.0f, &a, &v);
    printf("Box (4x5x3) -> Area: %.1f, Volume: %.1f\\n", a, v);
    return 0;
}`,
          output: `Swapped: x = 15, y = 90 -> Swapped: x = 90, y = 15
Box (4x5x3) -> Area: 20.0, Volume: 60.0`,
        },
      },
    ],
  },

  'structs-and-unions': {
    partBadge: 'PART IV • USER-DEFINED TYPES & STREAM I/O',
    chapterBadge: 'CHAPTER 11 & 12',
    sections: [
      {
        num: '11.1',
        title: 'Enumerations (`enum`), `typedef`, Structures (`struct`) & Unions (`union`)',
        paragraphs: [
          'From Week 11 Lecture: `enum` defines named integer constants (`enum MONTHS { JAN=1, FEB, ... };`), `typedef` creates clean type aliases, and `struct` aggregates heterogeneous fields (`char name[20]`, `int id`, `double gpa`) under a single composite record.',
          'Access members of a struct variable using the dot operator (`s.gpa`), and access members through a struct pointer using the arrow operator (`ptr->gpa`, which is syntactic sugar for `(*ptr).gpa`).',
        ],
        table: {
          headers: ['Feature', 'Structure (`struct`)', 'Union (`union`)'],
          rows: [
            ['Memory Allocation', 'Sum of all members + alignment padding', 'Size of the single LARGEST member only'],
            ['Member Offsets', 'Independent sequential byte offsets', 'All members share Offset 0 (same address)'],
            ['Concurrent Values', 'All fields hold independent values simultaneously', 'Writing one field overwrites the shared bytes'],
            ['Primary Use Case', 'Data records (`Student`, `Employee`, `Point2D`)', 'Type punning, packet headers, hardware registers'],
          ],
        },
        example: {
          title: 'Example: Week 11 Struct Array, Arrow Operator (->) & Shared-Memory Union',
          lang: 'c',
          code: `#include <stdio.h>

typedef struct {
    int acct_no;
    char name[20];
    double balance;
} Account;

int main(void) {
    Account acc = {1001, "Niramon", 12500.50};
    Account *ptr = &acc;

    printf("Dot access:   #%d (%s)\n", acc.acct_no, acc.name);
    printf("Arrow access: Balance = %.2f\n", ptr->balance);
    return 0;
}`,
          output: `Dot access:   #1001 (Niramon)
Arrow access: Balance = 12500.50`,
        },
      },
    ],
  },

  'file-io': {
    partBadge: 'PART IV • USER-DEFINED TYPES & STREAM I/O',
    chapterBadge: 'CHAPTER 13',
    sections: [
      {
        num: '13.1',
        title: 'File Streams (`FILE *`), Opening Modes & Random Access (`fseek`)',
        paragraphs: [
          'C mediates file operations through a `FILE *` stream pointer returned by `fopen(filename, mode)`. Always check `if (fp == NULL)` before reading or writing, and always call `fclose(fp)` to flush kernel buffers.',
        ],
        table: {
          headers: ['Mode String', 'Operational Meaning', 'If File Exists', 'If File Does Not Exist'],
          rows: [
            ['`"r"`', 'Open text file for reading', 'Reads from start (`offset 0`)', 'Returns `NULL` (Error)'],
            ['`"w"`', 'Open text file for writing', 'Truncates to 0 bytes (Overwrites!)', 'Creates new file'],
            ['`"a"`', 'Open text file for appending', 'Appends at end of file (`EOF`)', 'Creates new file'],
            ['`"r+"` / `"w+"`', 'Open for both reading and writing', '`"r+"` preserves; `"w+"` truncates', '`"r+"` returns `NULL`; `"w+"` creates'],
            ['`"rb"` / `"wb"`', 'Binary mode (`fread` / `fwrite`)', 'Exact raw memory bytes (no newline translation)', 'Same as `"r"` / `"w"`'],
          ],
        },
        example: {
          title: 'Example: Formatted File Stream & Random Access fseek() Concept',
          lang: 'c',
          code: `#include <stdio.h>

int main(void) {
    printf("[FILE STREAM SIMULATION]\\n");
    printf("1. FILE *fp = fopen(\\"records.txt\\", \\"w\\");\\n");
    printf("2. fprintf(fp, \\"ID=101 SCORE=95.5\\");\\n");
    printf("3. fseek(fp, 0L, SEEK_SET); // Rewind to start\\n");
    printf("4. fclose(fp); // Flushes buffer & releases handle\\n");
    return 0;
}`,
          output: `[FILE STREAM SIMULATION]
1. FILE *fp = fopen("records.txt", "w");
2. fprintf(fp, "ID=101 SCORE=95.5");
3. fseek(fp, 0L, SEEK_SET); // Rewind to start
4. fclose(fp); // Flushes buffer & releases handle`,
        },
      },
    ],
  },

  'dynamic-memory': {
    partBadge: 'PART V • SYSTEMS PROGRAMMING & REFERENCE',
    chapterBadge: 'CHAPTER 14',
    sections: [
      {
        num: '14.1',
        title: 'Heap Allocation (`malloc`, `calloc`, `realloc`, `free`) & The 5 Memory Pitfalls',
        paragraphs: [
          'Unlike stack variables whose lifetime ends when a function returns, dynamic heap memory allocated via `<stdlib.h>` persists until explicitly released with `free(ptr)`.',
        ],
        table: {
          headers: ['Allocator Function', 'Signature', 'Zero-Initialized?', 'Description'],
          rows: [
            ['`malloc`', '`void *malloc(size_t size)`', 'No (Garbage bits)', 'Allocates `size` uninitialized bytes on the heap.'],
            ['`calloc`', '`void *calloc(size_t n, size_t size)`', 'Yes (`0x00` bytes)', 'Allocates `n * size` bytes and zeroes every byte.'],
            ['`realloc`', '`void *realloc(void *p, size_t new_sz)`', 'New tail uninitialized', 'Resizes existing block, copying contents if moved.'],
            ['`free`', '`void free(void *p)`', 'N/A', 'Returns block to heap; set `p = NULL` immediately after!'],
          ],
        },
        example: {
          title: 'Example: Dynamic Heap Vector Allocation & Safe Deallocation',
          lang: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *vec = (int *)malloc(n * sizeof(int));
    if (vec == NULL) return 1;

    for (int i = 0; i < n; i++) {
        vec[i] = (i + 1) * 25;
        printf("vec[%d] = %d\\n", i, vec[i]);
    }

    free(vec);
    vec = NULL; /* Prevent dangling pointer */
    printf("Heap block freed and pointer reset to NULL.\\n");
    return 0;
}`,
          output: `vec[0] = 25
vec[1] = 50
vec[2] = 75
vec[3] = 100
Heap block freed and pointer reset to NULL.`,
        },
      },
    ],
  },

  'preprocessor-and-cli': {
    partBadge: 'PART V • SYSTEMS PROGRAMMING & REFERENCE',
    chapterBadge: 'CHAPTER 15 & 16',
    sections: [
      {
        num: '15.1',
        title: 'Preprocessor Macros (`#define`), Parenthesis Rule & CLI (`argc`, `argv`)',
        paragraphs: [
          'Because `#define` performs pure textual substitution prior to compilation, macro parameters and the entire replacement body must be wrapped in parentheses: `#define SQUARE(x) ((x) * (x))`. Without parentheses, `SQUARE(1 + 2)` expands to `1 + 2 * 1 + 2 = 5` instead of `9`!',
        ],
        example: {
          title: 'Example: Safe Macro Expansion & Predefined Compiler Macros',
          lang: 'c',
          code: `#include <stdio.h>

#define UNSAFE_SQ(x) x * x
#define SAFE_SQ(x)   ((x) * (x))

int main(void) {
    printf("UNSAFE_SQ(1 + 2) = %d (Bug: 1 + 2 * 1 + 2)\\n", UNSAFE_SQ(1 + 2));
    printf("SAFE_SQ(1 + 2)   = %d (Correct: (1+2)*(1+2))\\n", SAFE_SQ(1 + 2));
    return 0;
}`,
          output: `UNSAFE_SQ(1 + 2) = 5 (Bug: 1 + 2 * 1 + 2)
SAFE_SQ(1 + 2)   = 9 (Correct: (1+2)*(1+2))`,
        },
      },
    ],
  },

  'defensive-c': {
    partBadge: 'PART V • SYSTEMS PROGRAMMING & REFERENCE',
    chapterBadge: 'CHAPTER 17 & APPENDICES',
    sections: [
      {
        num: '17.1',
        title: "The Rogue's Gallery of Undefined Behavior & Master Reference Tables",
        paragraphs: [
          'The ISO C standard classifies erroneous operations with no safety guarantees as Undefined Behavior (`UB`). Below is the complete defensive reference table followed by the Master Format Specifier and Escape Sequence tables from Appendices A–C.',
        ],
        table: {
          headers: ['Deadly Pitfall', 'Vulnerable Code', 'Root Consequence', 'Hardened Defensive Solution'],
          rows: [
            ['Modifying String Literal', '`char *s = "hi"; s[0] = \'H\';`', 'Literals live in `.rodata`; triggers `SIGSEGV`', 'Use mutable array: `char s[] = "hi";`'],
            ['Off-By-One Array Bound', '`for (i=0; i<=N; i++) a[i]=0;`', 'Writes `a[N]` past end of stack buffer', 'Use strict less-than: `for (i=0; i<N; i++)`'],
            ['Dangling Stack Pointer', '`int *f() { int x=5; return &x; }`', 'Stack frame destroyed upon return', 'Allocate on heap (`malloc`) or pass output pointer'],
            ['Unchecked `scanf`', '`scanf("%d", &val);`', 'Leaves `val` uninitialized on non-numeric input', 'Always check `if (scanf("%d", &val) == 1)`'],
            ['Signed Integer Overflow', '`int z = INT_MAX + 1;`', 'Signed overflow is Undefined Behavior in C', 'Check bounds prior to addition or use `uint64_t`'],
          ],
        },
      },
      {
        num: 'App.B',
        title: 'Appendix B & C: Master Format Specifiers & Escape Sequences',
        paragraphs: [
          'Quick reference cheat sheet for all standard `printf` / `scanf` conversion specifiers and character escape sequences:',
        ],
        table: {
          headers: ['Specifier / Escape', 'Expected Type / ASCII', 'Operational Description & Notes'],
          rows: [
            ['`%d` / `%i`', '`int`', 'Signed 32-bit decimal integer (`scanf` requires `&int_var`)'],
            ['`%u` / `%lu`', '`unsigned int` / `unsigned long`', 'Unsigned decimal integer'],
            ['`%f` / `%lf`', '`float` / `double`', 'In `printf`, `%f` prints both; in `scanf`, `%f` is `float*` and `%lf` is mandatory for `double*`!'],
            ['`%.2f` / `%e`', '`double`', 'Fixed 2 decimal places / Scientific notation (`1.23e+03`)'],
            ['`%c` / `%s`', '`char` / `char *`', 'Single character / Null-terminated string (`scanf(" %c", &ch)` skips leading whitespace)'],
            ['`%p` / `%x` / `%zu`', '`void *` / `unsigned` / `size_t`', 'Hex pointer address / Hex integer / `sizeof` byte count'],
            ['`\\n`, `\\t`, `\\0`, `\\\\`', '`0x0A`, `0x09`, `0x00`, `0x5C`', 'Newline, Horizontal Tab, Null Terminator, Literal Backslash'],
          ],
        },
      },
    ],
  },
};
