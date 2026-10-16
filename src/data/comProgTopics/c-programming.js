/**
 * Com-Prog Topic: C Programming (Multi-Page Engineering Hub)
 * Rigorous curriculum synthesis from university lecture series & professional ISO/IEC 9899 standards.
 */

const foundationsSubPage = {
  id: 'foundations',
  title: 'Foundations & Architecture',
  icon: '⚡',
  tag: 'ISO C & Architecture',
  subtitle:
    'Hardware memory architecture, Von Neumann execution, the multi-stage compilation pipeline, and fundamental stream I/O (printf / scanf).',
  estimatedTime: '25 min read + interactive memory lab',
  overview: [
    'Welcome to the C Programming Master Guide. Designed in 1972 by Dennis Ritchie at Bell Labs to implement the UNIX operating system, C remains the bedrock of modern systems engineering, operating systems (Linux, Windows, macOS kernels), embedded firmware, high-performance database engines, and runtime virtual machines.',
    'Unlike higher-level managed languages, C provides transparent, deterministic mapping to hardware: variables correspond directly to physical memory addresses, pointers manipulate raw memory cells, and there is zero garbage collection overhead.',
    'The compilation pipeline transforms human-readable C source code into machine-executable binary through four distinct stages: Preprocessing (#include, #define), Compilation (C source to Assembly), Assembly (Assembly to Object code .o/.obj), and Linking (resolving symbol tables and runtime libraries into an executable).',
    'Explore the foundational interactive memory model and compilation principles below, then navigate through the 11 sub-topic chapters covering types, control flow, arrays, pointers, structs, file I/O, dynamic memory, and undefined behavior prevention!',
  ],
  keyConcepts: [
    {
      title: 'Von Neumann Architecture & Memory Byte Cells',
      content:
        'A modern computer system comprises the CPU, primary memory (RAM), secondary storage, and I/O peripherals. Memory is organized as a linear sequence of addressable byte cells (8 bits), each identified by a hexadecimal address (e.g., 0x7ffeefbff5ac). In C, variables are symbolic names mapped directly by the compiler to these concrete memory locations.',
      exampleLabel: 'C Memory Inspection Example',
      latex:
        '\\text{int } x = 42; \\quad \\&x \\to \\mathtt{0x7ffee1a4} \\quad [\\mathtt{0x2a}, \\mathtt{0x00}, \\mathtt{0x00}, \\mathtt{0x00}]',
      exampleNote:
        'On standard 32-bit/64-bit systems, a 4-byte int stores the value 42 (0x0000002A) across 4 contiguous memory bytes in Little-Endian byte order.',
    },
    {
      title: 'The 4-Stage Compilation Pipeline (GCC / Clang)',
      content:
        '1. Preprocessor (gcc -E): Expands macros (#define), includes headers (#include), and strips comments into a translation unit (.i).\n' +
        '2. Compiler (gcc -S): Translates preprocessed C into target-specific assembly instructions (.s).\n' +
        '3. Assembler (gcc -c): Converts assembly instructions into machine-code binary object files (.o).\n' +
        '4. Linker (gcc): Combines object files with runtime startup code and standard C library routines (libc) to produce the final executable binary.',
      exampleLabel: 'Compilation Pipeline Command Sequence',
      latex:
        '\\mathtt{main.c} \\xrightarrow{\\mathtt{-E}} \\mathtt{main.i} \\xrightarrow{\\mathtt{-S}} \\mathtt{main.s} \\xrightarrow{\\mathtt{-c}} \\mathtt{main.o} \\xrightarrow{\\mathtt{ld}} \\mathtt{program}',
      exampleNote:
        'Understanding these stages allows diagnosing linker errors ("undefined reference to symbol") vs compiler errors ("syntax error / type mismatch").',
    },
    {
      title: 'Stream I/O Mechanics: printf & scanf Address Semantics',
      content:
        'printf writes formatted text to the stdout buffer. scanf reads typed data from stdin. Because C uses strict pass-by-value semantics, passing a variable name to scanf would only pass a temporary copy! To modify the caller\'s variable, scanf requires the address-of operator (&var), allowing direct memory modification.',
      exampleLabel: 'Safe Input/Output Format Syntax',
      latex:
        '\\mathtt{printf}("\\%d", x); \\quad \\iff \\quad \\mathtt{scanf}("\\%d", \\&x);',
      exampleNote:
        'Always check the return value of scanf: it returns the number of successfully matched and assigned input items, or EOF on failure.',
    },
  ],
  equations: [
    {
      name: 'Memory Address & Dereferencing Invariant',
      latex: '*(\\&x) \\equiv x \\quad \\text{and} \\quad \\&(*ptr) \\equiv ptr',
      summary:
        'The fundamental dual relationship between memory addresses and dereferenced values in C.',
      conditions: ['ptr must be a valid, non-NULL pointer pointing to accessible allocated memory'],
      variables: [
        {
          symbol: '\\&x',
          name: 'Address-Of Operator',
          unit: '\\text{hex address (uintptr\\_t)}',
          description: 'Yields the starting memory address of variable x in the current memory segment.',
          connections: 'Determined at compile-time/stack allocation; invariant during variable scope lifetime.',
        },
        {
          symbol: '*ptr',
          name: 'Indirection / Dereference Operator',
          unit: '\\text{type of target object}',
          description: 'Accesses the value stored at the memory location pointed to by ptr.',
          connections: 'Reading or writing through an invalid or NULL pointer triggers undefined behavior / segmentation fault.',
        },
      ],
    },
    {
      name: 'Linear Memory Address Model',
      latex: '\\text{Address}(\\text{arr}[i]) = \\text{BaseAddress}(\\text{arr}) + i \\times \\text{sizeof}(\\text{Type})',
      summary:
        'Calculates the physical hardware byte address of any element in a contiguous C array.',
      conditions: ['0 <= i < ArrayLength (bounds safety requirement)'],
      variables: [
        {
          symbol: '\\text{BaseAddress}',
          name: 'Array Base Address',
          unit: '\\text{bytes}',
          description: 'The memory address of the zeroth element: &arr[0].',
          connections: 'Arrays implicitly decay to base pointers when passed into functions.',
        },
        {
          symbol: '\\text{sizeof}(\\text{Type})',
          name: 'Element Type Size',
          unit: '\\text{bytes}',
          description: 'The number of bytes occupied by a single element (e.g. 4 for int, 8 for double).',
          connections: 'Determines the stride of pointer arithmetic: ptr + 1 advances by sizeof(*ptr) bytes.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive lab to inspect memory layout, stack vs heap allocation, and pointer mechanics. Drag the sliders to see how variable addresses and pointer references update in real time.',
};

const typesAndOperatorsSubPage = {
  id: 'types-and-operators',
  title: 'Types, Literals & Operators',
  icon: '🔢',
  tag: 'Primitives & Precedence',
  subtitle:
    'Data types, fixed-width integers (stdint.h), sizeof operator, floating-point precision, type casting, arithmetic, and operator precedence.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'C provides a compact set of primitive arithmetic data types. Because standard type sizes (short, int, long) vary across 16-bit, 32-bit, and 64-bit platforms, modern ISO C provides <stdint.h> with exact fixed-width types: int8_t, int16_t, int32_t, int64_t, and unsigned variants uint8_t through uint64_t.',
    'When evaluating arithmetic expressions, C applies strict Implicit Type Promotion rules: values narrower than int are promoted to int (integer promotion), and mixed-type operations convert the narrower operand to the wider operand following the usual arithmetic conversions hierarchy.',
    'Integer division (a / b) truncates toward zero, discarding fractional parts. The modulo operator (%) requires strictly integer operands. Operator precedence and associativity govern evaluation order when parentheses are omitted.',
  ],
  keyConcepts: [
    {
      title: 'Fixed-Width Integer Primitives (<stdint.h>)',
      content:
        'Standard types like int are only guaranteed to be at least 16 bits. In embedded systems, networking, and binary protocols, always use fixed-width types from <stdint.h>: uint8_t (byte), int32_t (32-bit signed), uint64_t (64-bit unsigned).',
      exampleLabel: 'Portable Type Declarations',
      latex:
        '\\mathtt{uint8\\_t\\;} b = 255; \\quad \\mathtt{int32\\_t\\;} count = -100000; \\quad \\mathtt{size\\_t\\;} bytes = \\mathtt{sizeof}(x);',
    },
    {
      title: 'Integer Division vs Floating-Point Division',
      content:
        'If both operands are integers, 7 / 2 yields 3 (truncation toward zero). If either operand is floating-point (7.0 / 2 or (double)7 / 2), C performs floating-point division yielding 3.5.',
      exampleLabel: 'Division & Modulo Mechanics',
      latex:
        '7 / 2 = 3, \\qquad 7.0 / 2 = 3.5, \\qquad 7 \\% 2 = 1, \\qquad -7 \\% 2 = -1',
    },
    {
      title: 'Operator Precedence & Short-Circuit Evaluation',
      content:
        'Logical AND (&&) and OR (||) guarantee strict left-to-right evaluation with short-circuiting: in (a && b), if a is false, b is never evaluated. In (a || b), if a is true, b is never evaluated.',
      exampleLabel: 'Defensive Pointer Guard Pattern',
      latex:
        '\\mathtt{if\\;} (ptr \\ne \\mathtt{NULL} \\;\\&\\&\\; *ptr > 0) \\;\\{ \\dots \\}',
      exampleNote:
        'Short-circuiting guarantees that if ptr is NULL, the dangerous dereference *ptr is safely bypassed!',
    },
  ],
  equations: [
    {
      name: 'Integer Modulo Identity',
      latex: 'a = (a / b) \\times b + (a \\% b)',
      summary:
        'The ISO C99/C11 standard invariant governing integer division and modulo with signed integers.',
      conditions: ['b != 0 (division by zero is undefined behavior)'],
      variables: [
        { symbol: 'a', name: 'Dividend', unit: '\\text{integer}', description: 'The value being divided.', connections: 'Can be positive or negative.' },
        { symbol: 'b', name: 'Divisor', unit: '\\text{integer}', description: 'The value dividing the dividend.', connections: 'Must be non-zero.' },
        { symbol: 'a \\% b', name: 'Remainder', unit: '\\text{integer}', description: 'Has the same sign as dividend a in ISO C99.', connections: 'Satisfies |a % b| < |b|.' },
      ],
    },
  ],
};

const controlFlowSubPage = {
  id: 'control-flow',
  title: 'Control Flow & Loops',
  icon: '🔀',
  tag: 'Branching & Iteration',
  subtitle:
    'Conditional decision branching (if/else, switch-case), truth semantics, loop mechanics (for, while, do-while), and jump control (break, continue).',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'Control flow statements govern the order of execution in a C program. Unlike languages with a dedicated boolean type, classic C evaluates any non-zero numeric value as True, and exactly zero as False.',
    'Branching constructs include if-else ladders and the switch-case statement. The switch statement provides multi-way jump table dispatch based on an integral constant expression, with fallthrough behavior controlled by explicit break statements.',
    'Loops provide iteration: pre-test loops (while, for) test their condition before executing the loop body (executing 0 or more times); post-test loops (do-while) test the condition after the body, guaranteeing at least one execution.',
  ],
  keyConcepts: [
    {
      title: 'Truth Semantics in C',
      content:
        'In C, the condition in if(expr) evaluates expr: if expr != 0, it is True; if expr == 0, it is False. Stdbool.h (C99) defines bool, true (1), and false (0) as macros over _Bool.',
      exampleLabel: 'C Truth Evaluation',
      latex:
        '\\mathtt{if\\;}(-1) \\to \\text{True}, \\quad \\mathtt{if\\;}(0) \\to \\text{False}, \\quad \\mathtt{if\\;}(0.001) \\to \\text{True}',
    },
    {
      title: 'The for Loop Anatomy',
      content:
        'for (init; condition; update) executes init once, checks condition before each iteration, executes the body, runs update, and repeats until condition is 0.',
      exampleLabel: 'Loop Execution Mechanics',
      latex:
        '\\mathtt{for\\;}(\\mathtt{int\\;} i = 0;\\; i < n;\\; i++) \\iff \\mathtt{int\\;} i = 0; \\; \\mathtt{while\\;}(i < n) \\{ \\dots i++; \\}',
    },
    {
      title: 'Switch-Case & Fallthrough Mechanics',
      content:
        'In a switch construct, execution jumps to matching case constant and continues falling through subsequent cases until encountering a break statement. Omitting break intentionally is called fallthrough.',
      exampleLabel: 'Switch Jump Table Syntax',
      latex:
        '\\mathtt{switch}(cmd) \\;\\{\\; \\mathtt{case\\;}\'A\': \\dots \\mathtt{break}; \\; \\mathtt{default}: \\dots \\}',
    },
  ],
  equations: [
    {
      name: 'Ternary Conditional Expression',
      latex: '\\text{result} = (\\text{condition}) \\;?\\; \\text{expr}_{\\text{true}} \\;:\\; \\text{expr}_{\\text{false}}',
      summary: 'Inline conditional expression evaluating to one of two typed sub-expressions.',
      conditions: ['Both true and false expressions must have compatible types'],
      variables: [
        { symbol: '\\text{condition}', name: 'Boolean Test', unit: '\\text{scalar}', description: 'Evaluated first; non-zero selects true expr, zero selects false expr.', connections: 'Only the selected branch is evaluated.' },
      ],
    },
  ],
};

const arraysAndMatricesSubPage = {
  id: 'arrays-and-matrices',
  title: 'Arrays & Matrix Operations',
  icon: '📊',
  tag: 'Contiguous Memory',
  subtitle:
    'Contiguous one-dimensional arrays, zero-based indexing, bounds hazards, 2D row-major matrix layout, cache locality, and matrix multiplication.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'An array is a collection of elements of identical data type stored sequentially in contiguous physical memory addresses. In C, arrays are zero-indexed: an array of size N has valid indices 0 through N-1.',
    'Crucially, C does NOT perform runtime array bounds checking! Accessing arr[N] or arr[-1] accesses adjacent memory (out-of-bounds read/write), creating security vulnerabilities and undefined behavior.',
    'Multidimensional arrays in C are stored in strict Row-Major Order: all elements of row 0 are contiguous, followed by all elements of row 1. Accessing elements sequentially along rows maximizes CPU L1/L2 cache hits.',
  ],
  keyConcepts: [
    {
      title: 'Row-Major 2D Memory Layout',
      content:
        'For a matrix matrix[R][C], element [i][j] is located at offset (i * C + j) from the base address. To ensure cache-friendly traversal, always iterate the inner loop over columns (j) and outer loop over rows (i).',
      exampleLabel: 'Row-Major Indexing Formula',
      latex:
        '\\text{Offset}(i, j) = (i \\times \\text{Cols} + j) \\times \\text{sizeof}(\\text{Type})',
    },
    {
      title: 'Matrix Multiplication Algorithm',
      content:
        'Multiplication of an M×K matrix A by a K×N matrix B produces an M×N matrix C. Element C[i][j] is the dot product of row i of A with column j of B.',
      exampleLabel: 'Matrix Multiplication Triple Loop',
      latex:
        'C_{ij} = \\sum_{k=0}^{K-1} A_{ik} B_{kj}',
      exampleNote:
        'Complexity is O(M × N × K). For square N×N matrices, complexity is O(N³).',
    },
  ],
  equations: [
    {
      name: '2D Flat Offset Mapping Formula',
      latex: '\\&\\text{matrix}[i][j] = \\text{base} + (i \\cdot C + j) \\cdot \\text{sizeof}(T)',
      summary: 'Direct hardware address resolution for 2D row-major matrices in C.',
      conditions: ['0 <= i < Rows', '0 <= j < Cols'],
      variables: [
        { symbol: 'C', name: 'Column Dimension', unit: '\\text{count}', description: 'The number of columns per row.', connections: 'Must be known at compile-time or passed as VLA dimension.' },
        { symbol: 'i, j', name: 'Row and Column Index', unit: '\\text{indices}', description: 'Zero-based 2D coordinates.', connections: 'i * C + j flattens 2D coordinates into a 1D offset.' },
      ],
    },
  ],
};

const stringsAndTextSubPage = {
  id: 'strings-and-text',
  title: 'Strings & Text Processing',
  icon: '🔤',
  tag: 'Null Terminator & Security',
  subtitle:
    'Character arrays, the null terminator (\\0), safe fgets vs dangerous gets, <string.h> functions, buffer overflow mechanics, and ASCII character classification.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'In C, a string is NOT a built-in primitive type. It is defined as a contiguous array of char elements terminated by a Null Character (\'\\0\', ASCII code 0).',
    'Because string functions (strlen, strcpy, strcmp) rely solely on scanning until encountering \'\\0\', a missing null terminator causes functions to read past buffer bounds into arbitrary memory until a zero byte happens to be encountered.',
    'Buffer overflow vulnerabilities (such as using the banned gets() function) occur when input data exceeds the allocated buffer capacity, overwriting stack return addresses and enabling arbitrary code execution.',
  ],
  keyConcepts: [
    {
      title: 'The Null Terminator Invariant',
      content:
        'A string storing N visible characters requires an array of size at least N + 1 bytes. For example, "HELLO" contains 5 letters but occupies 6 bytes in memory: [\'H\', \'E\', \'L\', \'L\', \'O\', \'\\0\'].',
      exampleLabel: 'String Memory Representation',
      latex:
        '\\text{"HELLO"} \\implies [\\mathtt{0x48}, \\mathtt{0x45}, \\mathtt{0x4C}, \\mathtt{0x4C}, \\mathtt{0x4F}, \\mathtt{0x00}]',
    },
    {
      title: 'Safe String I/O: fgets() over gets() / scanf("%s")',
      content:
        'Never use gets() (removed from ISO C11) or unsized scanf("%s"). Use fgets(buf, sizeof(buf), stdin), which strictly enforces buffer bounds and prevents stack buffer overflow.',
      exampleLabel: 'Hardened String Input Pattern',
      latex:
        '\\mathtt{fgets}(\\text{buffer}, \\mathtt{sizeof}(\\text{buffer}), \\mathtt{stdin});',
    },
    {
      title: 'Standard String Library (<string.h>)',
      content:
        '• strlen(s): Returns length excluding \'\\0\'. Complexity is O(n).\n' +
        '• strcmp(s1, s2): Returns 0 if identical, <0 if s1 < s2, >0 if s1 > s2 (lexicographical comparison).\n' +
        '• snprintf(dest, n, ...): Safe bounded formatted copy into destination buffer.',
      exampleLabel: 'Safe String Copy & Concatenation',
      latex:
        '\\mathtt{snprintf}(\\text{dest}, \\mathtt{sizeof}(\\text{dest}), "\\%s \\%s", s1, s2);',
    },
  ],
  equations: [
    {
      name: 'String Allocation Requirement',
      latex: '\\text{Capacity}(\\text{str}) \\ge \\text{strlen}(\\text{str}) + 1',
      summary: 'Minimum allocated buffer size required to store a null-terminated C string safely.',
      conditions: ['Failure to allocate the +1 null terminator byte causes buffer overflow UB'],
      variables: [
        { symbol: '\\text{strlen}(s)', name: 'Visible Character Count', unit: '\\text{chars}', description: 'Number of non-null characters.', connections: 'Scans until first 0 byte.' },
      ],
    },
  ],
};

const pointersAndMemorySubPage = {
  id: 'pointers-and-memory',
  title: 'Pointers & Memory Model',
  icon: '📍',
  tag: 'Pointers & Addressing',
  subtitle:
    'Memory addresses, pointer syntax, NULL safety, dereferencing, pointer arithmetic, array-pointer duality, and void* generic pointers.',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'Pointers are C\'s defining and most powerful feature. A pointer is a variable that stores the physical memory address of another variable or object.',
    'Pointers enable pass-by-reference semantics in functions, dynamic memory management on the heap, efficient traversal of large data structures without copying, and direct hardware memory-mapped register manipulation.',
    'Pointer arithmetic operates in units of the pointed-to type: incrementing a pointer (ptr + 1) does NOT add 1 byte—it advances the pointer address by sizeof(*ptr) bytes!',
    'The fundamental Array-Pointer Duality dictates that array subscription arr[i] is strictly syntactic sugar for *(arr + i).',
  ],
  keyConcepts: [
    {
      title: 'Pointer Syntax & Declaration',
      content:
        'int *p declares a pointer to an integer. p stores an address (e.g., 0x7ffd9a). *p dereferences the pointer to read or write the integer value stored at that address.',
      exampleLabel: 'Address & Dereference Example',
      latex:
        '\\mathtt{int\\;} x = 10; \\quad \\mathtt{int\\;*p\\;} = \\&x; \\quad *p = 25; \\implies x = 25;',
    },
    {
      title: 'Pointer Arithmetic Mechanics',
      content:
        'When an integer i is added to a pointer ptr of type T*, the resulting address is: Address = BaseAddress + i × sizeof(T). For int* on a 32/64-bit system, ptr + 1 advances by 4 bytes.',
      exampleLabel: 'Pointer Arithmetic Formula',
      latex:
        'ptr + i \\iff (\\mathtt{uintptr\\_t})ptr + i \\times \\mathtt{sizeof}(*ptr)',
    },
    {
      title: 'Array-Pointer Duality Invariant',
      content:
        'An array name in expressions automatically decays into a pointer to its first element (arr ≡ &arr[0]). Array subscript notation is identical to pointer dereferencing: arr[i] ≡ *(arr + i) ≡ i[arr].',
      exampleLabel: 'Array Duality Equivalence',
      latex:
        '\\text{arr}[i] \\equiv *(\\text{arr} + i) \\equiv i[\\text{arr}]',
    },
  ],
  equations: [
    {
      name: 'Pointer Difference Formula',
      latex: 'p_2 - p_1 = \\frac{(\\mathtt{uintptr\\_t})p_2 - (\\mathtt{uintptr\\_t})p_1}{\\mathtt{sizeof}(T)} = \\text{elements between}',
      summary: 'Calculates the number of array elements between two pointers of identical type T*.',
      conditions: ['Both pointers must point into, or one past the end of, the same array object'],
      variables: [
        { symbol: 'p_2 - p_1', name: 'Pointer Offset', unit: '\\text{ptrdiff\\_t}', description: 'Signed number of elements between pointers.', connections: 'Positive if p2 is after p1; negative if before.' },
      ],
    },
  ],
};

const functionsAndScopeSubPage = {
  id: 'functions-and-scope',
  title: 'Functions, Scope & Callbacks',
  icon: '⚙️',
  tag: 'Call Stack & Callbacks',
  subtitle:
    'Function prototypes, call stack frames, pass-by-value copy semantics, pass-by-reference via pointers, variable lifetimes (auto, static), and function pointers.',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'Modular programming decomposes large programs into discrete, reusable functions. A C function consists of a return type, identifier, parameter list, and body block.',
    'Execution relies on the Call Stack: calling a function pushes an activation record (stack frame) containing parameters, local variables, and return address. Exiting the function pops its frame, reclaiming local storage.',
    'Because C strictly uses pass-by-value, functions receive copies of arguments. To simulate pass-by-reference, the caller passes the address of a variable (&var), and the function accepts a pointer (Type *param).',
    'Function Pointers store the entry point address of executable code in the text segment, enabling dynamic callbacks, sorting comparison predicates (qsort), and dispatch tables.',
  ],
  keyConcepts: [
    {
      title: 'Simulating Pass-by-Reference (Swap Function)',
      content:
        'To swap two integers in caller scope, pass their addresses: swap(&a, &b). The function dereferences the pointers to modify the caller memory directly.',
      exampleLabel: 'Classic Swap Implementation',
      latex:
        '\\mathtt{void\\;swap}(\\mathtt{int\\;*a},\\; \\mathtt{int\\;*b}) \\;\\{\\; \\mathtt{int\\;} t = *a; \\; *a = *b; \\; *b = t; \\;\\}',
    },
    {
      title: 'Variable Lifetimes & Storage Duration',
      content:
        '• Automatic (local): Created when block entered, destroyed when exited.\n' +
        '• Static local: Retains value across function calls for entire program run.\n' +
        '• Global (file scope): Allocated in data/BSS segment, accessible across files unless declared static.',
      exampleLabel: 'Static Variable Preservation',
      latex:
        '\\mathtt{void\\;} counter() \\;\\{\\; \\mathtt{static\\;int\\;} count = 0; \\; count++; \\;\\}',
    },
    {
      title: 'Function Pointers & Callbacks (qsort)',
      content:
        'A function pointer int (*cmp)(const void*, const void*) allows passing comparison functions into generic algorithms like qsort().',
      exampleLabel: 'Function Pointer Declaration',
      latex:
        '\\mathtt{int\\;(*fp)(int,\\;int) = \\&add; \\quad int\\;result = fp(3,\\;5);}',
    },
  ],
  equations: [
    {
      name: 'Function Call Stack Frame Layout',
      latex: '\\text{Stack Frame} = [\\text{Return Address}] + [\\text{Saved Frame Pointer}] + [\\text{Parameters}] + [\\text{Local Variables}]',
      summary: 'Architecture of a function activation record allocated on the thread execution stack.',
      conditions: ['Stack space is finite; unbounded recursion causes fatal stack overflow'],
      variables: [
        { symbol: '\\text{Return Address}', name: 'Instruction Pointer', unit: '\\text{code address}', description: 'Address in .text segment where CPU resumes after function returns.', connections: 'Target of buffer overflow attacks.' },
      ],
    },
  ],
};

const structsAndUnionsSubPage = {
  id: 'structs-and-unions',
  title: 'Structs, Unions & Bit-Fields',
  icon: '📦',
  tag: 'Composite Types & Memory',
  subtitle:
    'Composite types (struct), member access (. vs ->), structure alignment and padding, shared-memory unions, bitwise operators (&, |, ^, ~, <<, >>), and bit-fields.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'A structure (struct) aggregates multiple variables of different data types into a single contiguous block of memory. Individual fields are accessed via the dot operator (.) on instances or arrow operator (->) on pointers.',
    'CPUs require data types to be aligned at memory addresses that are multiples of their size (e.g. 4-byte int at 4-byte boundary). To satisfy hardware alignment, compilers insert invisible Padding Bytes between struct members.',
    'A union shares the same memory space among all its members: its size is equal to the size of its largest member. Writing to one member overwrites the others.',
    'Bitwise operators (&, |, ^, ~, <<, >>) and bit-fields allow manipulating individual hardware bits, essential for microcontroller register programming, network packet headers, and compact flag sets.',
  ],
  keyConcepts: [
    {
      title: 'Structure Memory Padding & Alignment',
      content:
        'Consider struct { char c; int i; }. Despite char being 1 byte and int being 4 bytes, sizeof is 8 bytes, not 5! The compiler inserts 3 padding bytes after char c so int i aligns to a 4-byte boundary.',
      exampleLabel: 'Structure Padding Visualization',
      latex:
        '[\\mathtt{c}] \\; [\\text{pad}] \\; [\\text{pad}] \\; [\\text{pad}] \\; [\\mathtt{i}_0] \\; [\\mathtt{i}_1] \\; [\\mathtt{i}_2] \\; [\\mathtt{i}_3] = 8\\text{ bytes}',
      exampleNote:
        'Optimize memory by ordering struct members from largest to smallest type to eliminate unnecessary padding.',
    },
    {
      title: 'Unions: Memory Reuse & Type Punning',
      content:
        'In a union, all members begin at offset 0. Size equals the largest member. Useful for variant records or low-level byte inspection.',
      exampleLabel: 'Union Memory Sharing',
      latex:
        '\\mathtt{union\\;Data\\;} \\{\\; \\mathtt{int\\;} i; \\; \\mathtt{float\\;} f; \\; \\mathtt{char\\;} c[4]; \\;\\}; \\quad \\mathtt{sizeof}(\\text{Data}) = 4',
    },
    {
      title: 'Bitwise Masking Patterns',
      content:
        '• Set bit n: reg |= (1 << n)\n' +
        '• Clear bit n: reg &= ~(1 << n)\n' +
        '• Toggle bit n: reg ^= (1 << n)\n' +
        '• Test bit n: (reg & (1 << n)) != 0',
      exampleLabel: 'Idiomatic Bit Manipulation Formulas',
      latex:
        '\\text{Set: } R \\leftarrow R \\mid (1 \\ll n), \\quad \\text{Clear: } R \\leftarrow R \\;\\&\\; \\sim(1 \\ll n)',
    },
  ],
  equations: [
    {
      name: 'Bitwise Shifting Arithmetic Invariant',
      latex: 'x \\ll n \\equiv x \\times 2^n \\quad \\text{and} \\quad x \\gg n \\equiv \\lfloor x / 2^n \\rfloor',
      summary: 'Mathematical equivalence between bitwise shifting and binary powers of two for unsigned integers.',
      conditions: ['0 <= n < bitwidth of type (shifting by >= bitwidth is undefined behavior)'],
      variables: [
        { symbol: 'x \\ll n', name: 'Left Shift', unit: '\\text{integer}', description: 'Shifts binary representation left by n bit positions, filling low bits with 0.', connections: 'Multiplies by 2^n.' },
        { symbol: 'x \\gg n', name: 'Right Shift', unit: '\\text{integer}', description: 'Shifts binary representation right by n positions.', connections: 'Divides by 2^n.' },
      ],
    },
  ],
};

const fileIoSubPage = {
  id: 'file-io',
  title: 'File Handling & Streams',
  icon: '💾',
  tag: 'Stream & Binary I/O',
  subtitle:
    'File streams (FILE*), access modes, buffered text I/O (fgetc, fgets, fprintf), raw binary I/O (fread, fwrite), and file positioning (fseek, ftell, rewind).',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'In C, all file I/O is abstracted through File Streams represented by pointers to FILE structures (FILE*). Three streams are automatically opened at startup: stdin, stdout, and stderr.',
    'Files are opened via fopen(filename, mode). Standard modes include "r" (read), "w" (overwrite), "a" (append), and binary flags "rb", "wb". Every fopen must be paired with fclose to flush internal I/O buffers and release operating system file descriptors.',
    'Binary file I/O transfers memory byte blocks directly between RAM and disk using fread() and fwrite(), avoiding text formatting overhead and preserving full numerical precision.',
  ],
  keyConcepts: [
    {
      title: 'File Open & Close Protocol',
      content:
        'Always verify if fopen succeeded by testing fp != NULL. Attempting to read or write through a NULL file pointer causes an immediate crash.',
      exampleLabel: 'Defensive File Pattern',
      latex:
        '\\mathtt{FILE\\;*fp\\;} = \\mathtt{fopen}("data.txt", "r"); \\; \\mathtt{if\\;}(!fp) \\;\\{ \\mathtt{perror}("Error"); \\;\\}',
    },
    {
      title: 'Binary Block Transfer: fread & fwrite',
      content:
        'fread(ptr, size, count, fp) reads count objects of size bytes into buffer ptr. Returns number of items successfully transferred.',
      exampleLabel: 'Binary Struct Serialization',
      latex:
        '\\mathtt{fwrite}(\\&record, \\mathtt{sizeof}(\\text{Record}), 1, fp); \\quad \\mathtt{fread}(\\&record, \\mathtt{sizeof}(\\text{Record}), 1, fp);',
    },
    {
      title: 'File Positioning (fseek, ftell, rewind)',
      content:
        'fseek(fp, offset, whence) moves file cursor relative to SEEK_SET (start), SEEK_CUR (current), or SEEK_END (end). ftell(fp) returns the current byte position.',
      exampleLabel: 'Determining File Size in Bytes',
      latex:
        '\\mathtt{fseek}(fp, 0, \\mathtt{SEEK\\_END}); \\quad \\mathtt{long\\;} size = \\mathtt{ftell}(fp);',
    },
  ],
  equations: [
    {
      name: 'Binary I/O Byte Transfer Formula',
      latex: '\\text{Bytes Transferred} = \\text{size} \\times \\text{count}',
      summary: 'Total volume of bytes transferred between memory buffer and storage stream.',
      conditions: ['Buffer pointed to by ptr must be at least size * count bytes in capacity'],
      variables: [
        { symbol: '\\text{size}', name: 'Element Size', unit: '\\text{bytes}', description: 'Size of individual object: sizeof(T).', connections: 'Typically determined via sizeof.' },
        { symbol: '\\text{count}', name: 'Element Count', unit: '\\text{items}', description: 'Number of objects to read or write.', connections: 'fread/fwrite return number of successfully transferred items.' },
      ],
    },
  ],
};

const dynamicMemorySubPage = {
  id: 'dynamic-memory',
  title: 'Dynamic Memory & Heap Safety',
  icon: '🧠',
  tag: 'Heap Management',
  subtitle:
    'Heap memory allocation (malloc, calloc, realloc), deallocation (free), memory leak prevention, dangling pointer hazards, and dynamic resizable vector implementation.',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'While stack memory is automatically allocated and reclaimed with function scope, dynamic memory is allocated on the Heap at runtime using <stdlib.h> functions.',
    'malloc(size) allocates uninitialized bytes. calloc(n, size) allocates memory and clears every byte to zero. realloc(ptr, new_size) resizes existing heap blocks.',
    'Every block allocated on the heap remains allocated until explicitly released via free(ptr). Failing to call free causes a Memory Leak. Accessing memory after calling free causes a Dangling Pointer bug (Use-After-Free).',
    'Dynamic memory enables resizable data structures (vectors, linked lists, trees, hash tables) whose capacity grows flexibly at runtime.',
  ],
  keyConcepts: [
    {
      title: 'The malloc & free Lifecycle',
      content:
        'Always check if malloc returned NULL (out of memory). After calling free(ptr), immediately set ptr = NULL to avoid dangling pointer dereferences.',
      exampleLabel: 'Hardened Heap Allocation Pattern',
      latex:
        '\\mathtt{int\\;*arr\\;} = \\mathtt{malloc}(n \\times \\mathtt{sizeof}(\\mathtt{int})); \\; \\mathtt{if\\;}(!arr) \\;\\{ \\dots \\} \\; \\mathtt{free}(arr); \\; arr = \\mathtt{NULL};',
    },
    {
      title: 'Safe realloc Idiom',
      content:
        'Never assign realloc directly back to original pointer: arr = realloc(arr, new_size). If realloc fails, it returns NULL and the original buffer is leaked! Use a temporary pointer.',
      exampleLabel: 'Safe Reallocation Idiom',
      latex:
        '\\mathtt{int\\;*temp\\;} = \\mathtt{realloc}(arr, new\\_size); \\; \\mathtt{if\\;}(temp) \\; arr = temp; \\; \\mathtt{else\\;} \\{ \\dots \\}',
    },
    {
      title: 'Dynamic Array (Vector) Amortized Growth',
      content:
        'When capacity is exhausted, double the capacity (capacity * 2). This guarantees O(1) amortized insertion time complexity.',
      exampleLabel: 'Geometric Growth Factor',
      latex:
        '\\text{capacity}_{\\text{new}} = \\text{capacity}_{\\text{old}} \\times 2',
    },
  ],
  equations: [
    {
      name: 'Dynamic Allocation Byte Request',
      latex: '\\text{Bytes} = n \\times \\mathtt{sizeof}(\\text{Type})',
      summary: 'Required memory byte size passed to malloc / calloc.',
      conditions: ['Multiplication must not overflow size_t (integer overflow vulnerability)'],
      variables: [
        { symbol: 'n', name: 'Item Count', unit: '\\text{count}', description: 'Number of elements to allocate on heap.', connections: 'Must be > 0.' },
        { symbol: '\\mathtt{sizeof}(\\text{Type})', name: 'Element Stride', unit: '\\text{bytes}', description: 'Bytes per element.', connections: 'Evaluated at compile-time.' },
      ],
    },
  ],
};

const preprocessorAndCliSubPage = {
  id: 'preprocessor-and-cli',
  title: 'Preprocessor & CLI Architecture',
  icon: '🛠️',
  tag: 'Macros & CLI',
  subtitle:
    'Preprocessor directives (#define, #include, #ifdef), macro hygiene and parentheses safety, header guards, and command-line arguments (argc, argv).',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'The C preprocessor runs prior to compilation, performing text-substitution directives starting with #. Directives include #include (inserting header files), #define (defining macros and constants), and conditional compilation (#ifdef, #ifndef, #endif).',
    'Macro Hygiene is critical: function-like macros perform blind text replacement without type checking. Every parameter and the entire macro body must be enclosed in parentheses to prevent operator precedence bugs.',
    'Header files must be protected with Header Guards (#ifndef MY_HEADER_H / #define MY_HEADER_H) or #pragma once to prevent multiple inclusion redefinition errors.',
    'Command-line arguments allow passing inputs at runtime: int main(int argc, char *argv[]) receives argument count (argc) and an array of string pointers (argv).',
  ],
  keyConcepts: [
    {
      title: 'Macro Hygiene: The Parentheses Rule',
      content:
        '#define SQUARE(x) x * x is dangerous: SQUARE(1 + 2) expands to 1 + 2 * 1 + 2 = 5! The correct hygienic definition is #define SQUARE(x) ((x) * (x)), producing ((1 + 2) * (1 + 2)) = 9.',
      exampleLabel: 'Hygienic Macro vs Flawed Macro',
      latex:
        '\\text{Flawed: } x * x \\implies 1 + 2 \\times 1 + 2 = 5, \\qquad \\text{Hygienic: } ((x) * (x)) \\implies 9',
    },
    {
      title: 'Header Guards Architecture',
      content:
        'Prevents duplicate symbol definitions when headers are included transitively across multiple source files.',
      exampleLabel: 'Standard Header Guard Boilerplate',
      latex:
        '\\mathtt{\\#ifndef\\;MODULE\\_H} \\;\\; \\mathtt{\\#define\\;MODULE\\_H} \\; \\dots \\; \\mathtt{\\#endif}',
    },
    {
      title: 'Command-Line Arguments (argc, argv)',
      content:
        'argv[0] is the executable program name. argv[1] through argv[argc - 1] are user arguments. argv[argc] is guaranteed to be NULL.',
      exampleLabel: 'CLI Argument Parsing',
      latex:
        '\\mathtt{int\\;main}(\\mathtt{int\\;} argc,\\; \\mathtt{char\\;*argv[]}) \\;\\{\\; \\mathtt{long\\;} val = \\mathtt{strtol}(argv[1], \\mathtt{NULL}, 10); \\;\\}',
    },
  ],
  equations: [
    {
      name: 'CLI Argument Boundary Invariant',
      latex: '\\text{Valid Arguments} = \\{ \\text{argv}[1], \\dots, \\text{argv}[argc - 1] \\}, \\quad \\text{argv}[argc] \\equiv \\mathtt{NULL}',
      summary: 'ISO C guarantees on command-line argument array bounds and termination.',
      conditions: ['argc >= 1 (argv[0] always represents executable command)'],
      variables: [
        { symbol: 'argc', name: 'Argument Count', unit: '\\text{integer}', description: 'Total number of arguments including program name.', connections: 'Always >= 1.' },
        { symbol: 'argv', name: 'Argument Vector', unit: '\\text{char**}', description: 'Array of null-terminated string pointers.', connections: 'Terminated by NULL at index argc.' },
      ],
    },
  ],
};

const defensiveCSubPage = {
  id: 'defensive-c',
  title: 'Undefined Behavior & Safe C',
  icon: '🛡️',
  tag: 'Defensive Systems C',
  subtitle:
    'Undefined Behavior (UB) taxonomy, sequence points, off-by-one errors, compiler sanitizers (-fsanitize=address,undefined), and defensive programming.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'In the C standard, Undefined Behavior (UB) represents code constructs for which the standard imposes no requirements. If UB occurs, the compiler is permitted to generate arbitrary code, crash, format your disk, or silently delete checks during optimization!',
    'Common sources of UB include: dereferencing NULL or dangling pointers, reading uninitialized variables, array out-of-bounds access, signed integer overflow, division by zero, and violating sequence point rules (e.g. i = i++ + 1).',
    'Modern safe systems development relies on compiler sanitizers: AddressSanitizer (-fsanitize=address) detects memory leaks and buffer overruns at runtime; UndefinedBehaviorSanitizer (-fsanitize=undefined) detects integer overflows and null dereferences.',
  ],
  keyConcepts: [
    {
      title: 'Taxonomy of C Behaviors',
      content:
        '• Defined: Exact behavior specified by ISO standard (e.g., unsigned wrap).\n' +
        '• Implementation-Defined: Documented by compiler (e.g., sizeof(int)).\n' +
        '• Unspecified: Compiler picks valid options (e.g., argument evaluation order).\n' +
        '• Undefined (UB): Complete absence of guarantees; optimization hazards!',
      exampleLabel: 'Common UB Trap: Signed Integer Overflow',
      latex:
        '\\mathtt{int\\;} x = \\mathtt{INT\\_MAX}; \\; x++; \\implies \\text{UNDEFINED BEHAVIOR (Not guaranteed to wrap!)}',
      exampleNote:
        'Compilers may optimize away checks like "if (x + 1 < x)" because UB assumes signed overflow never occurs!',
    },
    {
      title: 'Sequence Points & Order of Evaluation',
      content:
        'Modifying a scalar variable more than once between sequence points (e.g., a[i] = i++) invokes undefined behavior. In a function call f(g(), h()), whether g() or h() runs first is unspecified.',
      exampleLabel: 'Sequence Point Violation',
      latex:
        'i = i++ + 1; \\quad \\text{or} \\quad f(v[i], i++); \\implies \\text{UB: Unsequenced modification}',
    },
    {
      title: 'Defensive Hardening & Compiler Sanitizers',
      content:
        'Compile with modern defensive flags:\ngcc -Wall -Wextra -Wpedantic -Werror -fsanitize=address,undefined -g program.c',
      exampleLabel: 'Hardened GCC / Clang Build Command',
      latex:
        '\\mathtt{gcc\\;-Wall\\;-Wextra\\;-fsanitize=address,undefined\\;-O2\\;main.c}',
    },
  ],
  equations: [
    {
      name: 'Unsigned Integer Modular Arithmetic Invariant',
      latex: '(u_{\\text{max}} + 1) \\pmod{2^w} \\equiv 0 \\quad \\text{(Well-defined modular wrap)}',
      summary: 'ISO C guarantees unsigned integer arithmetic is well-defined modulo 2^w, unlike signed integer overflow.',
      conditions: ['Applies strictly to unsigned integer types (uint8_t, uint32_t, size_t)'],
      variables: [
        { symbol: 'w', name: 'Word Bit Width', unit: '\\text{bits}', description: 'Number of bits in the unsigned type (e.g. 32 or 64).', connections: 'Values wrap at 2^w.' },
      ],
    },
  ],
};

const subPages = [
  foundationsSubPage,
  typesAndOperatorsSubPage,
  controlFlowSubPage,
  arraysAndMatricesSubPage,
  stringsAndTextSubPage,
  pointersAndMemorySubPage,
  functionsAndScopeSubPage,
  structsAndUnionsSubPage,
  fileIoSubPage,
  dynamicMemorySubPage,
  preprocessorAndCliSubPage,
  defensiveCSubPage,
];

const cProgrammingData = {
  id: 'c-programming',
  title: 'C Programming',
  subtitle:
    'The complete engineering syllabus: hardware architecture, compilation pipeline, pointers, memory addressing, structs, file I/O, dynamic memory, and safe systems programming.',
  level: 'Intermediate',
  estimatedTime: '12 Connected Chapters (Complete Technical Syllabus)',
  subPages,
  overview: foundationsSubPage.overview,
  keyConcepts: foundationsSubPage.keyConcepts,
  equations: foundationsSubPage.equations,
  interactiveGuide: foundationsSubPage.interactiveGuide,
};

export default cProgrammingData;
