/**
 * Unified Code Syntax Registry for Com-Prog
 * Provides exhaustive code-based syntax breakdowns, compiler/runtime mechanics,
 * step-by-step programming guidelines, token anatomies, and verified examples.
 */

export const CODE_SYNTAX_REGISTRY = {
  'c-programming': {
    foundations: [
      {
        title: 'Memory Address-Of (&) & Dereferencing (*)',
        tag: 'ISO C99 / Architecture',
        language: 'c',
        syntax: `int x = 42;
int *ptr = &x;     // & yields memory address
int val = *ptr;    // * dereferences address to read value
*ptr = 100;        // * dereferences address to write value`,
        howItWorks: [
          'The compiler allocates a 4-byte memory slot for integer x on the stack at a concrete hexadecimal address (e.g. 0x7ffee1a4).',
          'The address-of operator (&) evaluates to this memory location. A pointer variable int *ptr stores this 64-bit numerical address.',
          'The dereference operator (*) instructs the CPU to generate an indirect memory access instruction (e.g., MOV [rax], rbx), reading or mutating the byte cell at that address directly without copying.',
          'Modifying *ptr changes the underlying value of x in place because both point to the same physical memory cell.',
        ],
        howToProgram: [
          'Always declare the pointer type matching the pointee (e.g., int* for int, double* for double) so pointer arithmetic advances by the exact type stride.',
          'Always initialize pointers upon declaration: either assign the address of an active variable (&x) or explicitly assign NULL (void* 0).',
          'Never dereference an uninitialized pointer (wild pointer) or NULL pointer, as this triggers immediate Segmentation Fault (SIGSEGV).',
          'When reading input with scanf("%d", &x), always pass the address-of (&x) so scanf can modify the caller variable in memory.',
        ],
        tokens: [
          {
            token: '&x',
            role: 'Address-Of Operator',
            description: 'Computes the memory address of lvalue variable x.',
            rules: 'Operand must be an addressable lvalue; cannot take address of literals like &42.',
            pitfall: 'Taking address of a register-allocated variable produces a compile-time error.',
          },
          {
            token: '*ptr',
            role: 'Indirection / Dereference Operator',
            description: 'Accesses the object stored at the address pointed to by ptr.',
            rules: 'ptr must contain a valid, accessible non-NULL address within process space.',
            pitfall: 'Dereferencing dangling or NULL pointers causes undefined behavior / crash.',
          },
          {
            token: 'int *',
            role: 'Pointer Type Specifier',
            description: 'Designates that the variable stores the address of an integer.',
            rules: 'Occupies 8 bytes on 64-bit platforms and 4 bytes on 32-bit platforms regardless of pointee type.',
            pitfall: 'In int *p1, p2;, only p1 is a pointer! p2 is a regular int.',
          },
        ],
        pitfalls: [
          'Reading from an uninitialized pointer: int *p; *p = 5; will write to a random memory address.',
          'Dangling pointer: Returning the address of a local stack variable from a function causes undefined behavior once the stack frame pops.',
        ],
        codeExample: `#include <stdio.h>

int main() {
    int counter = 42;
    int *ptr = &counter;

    printf("Variable value: %d\\n", counter);
    printf("Address (&counter): %p\\n", (void*)&counter);
    printf("Pointer stores:     %p\\n", (void*)ptr);
    printf("Dereferenced (*ptr): %d\\n", *ptr);

    *ptr = 100; // Modify in-place
    printf("New counter value:  %d\\n", counter);
    return 0;
}`,
        expectedOutput: `Variable value: 42
Address (&counter): 0x7ffee1a4
Pointer stores:     0x7ffee1a4
Dereferenced (*ptr): 42
New counter value:  100`,
      },
      {
        title: 'Stream Input & Output Formatting (printf / scanf)',
        tag: 'Standard I/O <stdio.h>',
        language: 'c',
        syntax: `printf("Format string with specifiers: %d, %f, %s\\n", int_val, float_val, str);
int status = scanf("%d %lf", &int_val, &double_val);`,
        howItWorks: [
          'printf pushes format specifiers onto the standard stdout buffer. The format string is parsed from left to right, matching placeholders with variadic arguments.',
          'scanf reads whitespace-delimited tokens from the stdin stream, converts characters into binary representations, and stores them via the provided pointer addresses.',
          'scanf returns the count of successfully matched and assigned items, or EOF on input failure or end-of-file.',
        ],
        howToProgram: [
          'Always provide matching specifiers: %d for int, %ld for long, %f for float, %lf for double, %s for char array, %c for char.',
          'Always pass memory addresses (&var) to scanf for primitive types, but omit & for arrays/strings since array names decay to addresses.',
          'Always verify the return value of scanf: if (scanf("%d", &x) != 1) to guard against non-numeric input causing an infinite loop.',
        ],
        tokens: [
          {
            token: '%d',
            role: 'Format Specifier (Signed Decimal)',
            description: 'Formats a 32-bit signed integer for decimal representation.',
            rules: 'Argument must be int or promotable integer type.',
            pitfall: 'Passing double to %d produces corrupted garbage output.',
          },
          {
            token: '%lf',
            role: 'Format Specifier (Double Precision)',
            description: 'Required in scanf to read a 64-bit IEEE 754 double precision float.',
            rules: 'Must be paired with double* address in scanf.',
            pitfall: 'Using %f instead of %lf in scanf will corrupt memory due to 4-byte vs 8-byte size mismatch.',
          },
        ],
        pitfalls: [
          'Omitting the & operator in scanf("%d", x) passes the value of x as an address, causing a SIGSEGV segmentation fault.',
          'Using gets() instead of fgets() causes critical buffer overflow vulnerabilities.',
        ],
        codeExample: `#include <stdio.h>

int main() {
    int age = 21;
    double gpa = 3.85;
    char code = 'A';

    printf("Student Grade: %c | Age: %d | GPA: %.2f\\n", code, age, gpa);
    printf("Hex representation: 0x%X\\n", age);
    return 0;
}`,
        expectedOutput: `Student Grade: A | Age: 21 | GPA: 3.85
Hex representation: 0x15`,
      },
    ],

    'types-and-operators': [
      {
        title: 'Type Sizes, Modulo & Explicit Type Casting',
        tag: 'C Data Types & Conversions',
        language: 'c',
        syntax: `// Explicit cast syntax
double result = (double)numerator / denominator;
size_t bytes = sizeof(int);
int remainder = a % b; // Modulo requires integer operands`,
        howItWorks: [
          'C performs integer division when both operands are integers, truncating any fractional part towards zero (e.g., 7 / 2 evaluates to 3, not 3.5).',
          'Explicit casting (double)numerator converts numerator to IEEE double before division. In mixed expressions, C promotes denominator to double and performs floating-point division.',
          'sizeof is a compile-time operator that computes the exact byte size of a type or variable without evaluating expressions.',
        ],
        howToProgram: [
          'Cast at least one operand to double or float before dividing when precision is needed.',
          'Use <stdint.h> fixed-width types (uint8_t, int16_t, uint32_t, int64_t) in embedded or portable network code to guarantee consistent bit-width.',
          'Remember that % only works on integers. For floating-point remainder, use fmod() from <math.h>.',
        ],
        tokens: [
          {
            token: '(type)',
            role: 'Explicit Cast Operator',
            description: 'Temporarily coerces an expression to the designated type.',
            rules: 'Has higher precedence than arithmetic operators (+, -, *, /).',
            pitfall: '(double)(a / b) casts AFTER division is already truncated!',
          },
          {
            token: 'sizeof',
            role: 'Compile-Time Size Operator',
            description: 'Returns size in bytes as type size_t.',
            rules: 'Does not evaluate runtime expressions inside sizeof(expr++).',
            pitfall: 'sizeof(pointer) returns 8 bytes, NOT the length of the array it points to!',
          },
        ],
        pitfalls: [
          'Writing (double)(a / b) truncates a / b first before converting the integer result to double.',
          'Integer overflow: Signed integer overflow triggers undefined behavior in C (unlike unsigned wraparound).',
        ],
        codeExample: `#include <stdio.h>

int main() {
    int a = 7, b = 2;
    printf("Integer division (a / b):        %d\\n", a / b);
    printf("Explicit cast ((double)a / b):   %.2f\\n", (double)a / b);
    printf("Incorrect cast ((double)(a / b)): %.2f\\n", (double)(a / b));
    printf("Modulo remainder (a %% b):        %d\\n", a % b);
    return 0;
}`,
        expectedOutput: `Integer division (a / b):        3
Explicit cast ((double)a / b):   3.50
Incorrect cast ((double)(a / b)): 3.00
Modulo remainder (a % b):        1`,
      },
    ],

    'control-flow': [
      {
        title: 'Iterative Loops (for / while) & Branching (switch-case)',
        tag: 'Control Flow & Jumps',
        language: 'c',
        syntax: `// For loop syntax
for (initialization; condition; increment) {
    // Body executed while condition is non-zero (true)
}

// Switch-case syntax
switch (expression) {
    case CONSTANT_1:
        // Statements
        break; // Required to prevent fall-through!
    default:
        // Fallback
}`,
        howItWorks: [
          'In C, conditions evaluate truthiness numerically: 0 is false, any non-zero value is true.',
          'In a for loop, initialization executes once. Before each iteration, condition is tested. If true, body executes followed by increment.',
          'switch evaluates an integer expression and jumps directly to the matching case label using a jump table or comparison ladder.',
          'Without an explicit break statement, execution falls through into subsequent case blocks unconditionally.',
        ],
        howToProgram: [
          'Always include break; at the end of each case block unless deliberate fall-through is desired and documented.',
          'Prefer for loops when the number of iterations is known; prefer while loops for event-driven or sentinel-controlled conditions.',
          'Avoid modifying the loop index variable inside the body of a for loop to prevent unpredictable iterations.',
        ],
        tokens: [
          {
            token: 'break',
            role: 'Control Flow Jump',
            description: 'Immediately terminates the innermost enclosing loop or switch statement.',
            rules: 'Cannot break out of multiple nested loops with a single break.',
            pitfall: 'Missing break in switch leads to unexpected fall-through bugs.',
          },
          {
            token: 'continue',
            role: 'Loop Stepping Jump',
            description: 'Skips the remaining body statements and jumps directly to the loop update/increment step.',
            rules: 'Valid only inside loop bodies (for, while, do-while).',
            pitfall: 'In while loops, continue might skip index increment, causing an infinite loop.',
          },
        ],
        pitfalls: [
          'Accidental semicolon after for or if: for (int i=0; i<10; i++); { ... } executes the body once with i=10!',
          'Using assignment = instead of equality == in if (x = 5): assigns 5 to x and evaluates to true.',
        ],
        codeExample: `#include <stdio.h>

int main() {
    printf("For loop step testing:\\n");
    for (int i = 1; i <= 4; i++) {
        printf("Iteration %d -> square: %d\\n", i, i * i);
    }

    int code = 2;
    switch (code) {
        case 1: printf("Status: Active\\n"); break;
        case 2: printf("Status: Pending Validation\\n"); break;
        default: printf("Status: Unknown\\n"); break;
    }
    return 0;
}`,
        expectedOutput: `For loop step testing:
Iteration 1 -> square: 1
Iteration 2 -> square: 4
Iteration 3 -> square: 9
Iteration 4 -> square: 16
Status: Pending Validation`,
      },
    ],

    'arrays-and-matrices': [
      {
        title: '1D Arrays, 2D Matrices & Contiguous Memory Offsets',
        tag: 'Arrays & Row-Major Storage',
        language: 'c',
        syntax: `// 1D Array declaration and indexing
int arr[5] = {10, 20, 30, 40, 50};
int val = arr[2]; // Access element at index 2 (value 30)

// 2D Matrix declaration (row-major order)
int matrix[ROWS][COLS] = { {1, 2}, {3, 4} };
// Memory offset: &matrix[r][c] == base + (r * COLS + c) * sizeof(int)`,
        howItWorks: [
          'Arrays in C are stored in contiguous physical memory. Element arr[i] is located at BaseAddress + (i * sizeof(Type)).',
          'In multi-dimensional arrays, C uses strict Row-Major Order: all elements of row 0 are stored sequentially, followed by row 1, etc.',
          'Array names implicitly decay to pointers pointing to their first element when passed as arguments to functions.',
        ],
        howToProgram: [
          'Always enforce index bounds: valid indices for an array of size N are strictly 0 to N-1.',
          'Pass array length explicitly when passing arrays to functions: void process(int arr[], size_t len).',
          'Remember C provides NO bounds checking: accessing arr[10] on an array of size 5 silently accesses out-of-bounds memory!',
        ],
        tokens: [
          {
            token: 'arr[i]',
            role: 'Subscript Operator',
            description: 'Syntactic sugar for *(arr + i). Accesses element at index i.',
            rules: 'Because *(a+b) == *(b+a), i[arr] is technically legal C, identical to arr[i]!',
            pitfall: 'Accessing index >= size causes buffer over-read or memory corruption.',
          },
          {
            token: 'sizeof(arr)/sizeof(arr[0])',
            role: 'Array Element Count Idiom',
            description: 'Computes total elements in a stack-allocated array.',
            rules: 'Only works in the exact scope where array was declared.',
            pitfall: 'Fails inside functions where array has decayed to a pointer (returns 8/4 = 2).',
          },
        ],
        pitfalls: [
          'Off-by-one errors: looping for (int i = 0; i <= size; i++) accesses an illegal N-th element.',
          'Trying to assign arrays directly: arr1 = arr2; is illegal syntax in C. Must use memcpy or loop.',
        ],
        codeExample: `#include <stdio.h>

int main() {
    int mat[2][3] = { {10, 20, 30}, {40, 50, 60} };

    printf("Row-major traversal & memory addresses:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("mat[%d][%d] = %d at %p\\n", r, c, mat[r][c], (void*)&mat[r][c]);
        }
    }
    return 0;
}`,
        expectedOutput: `Row-major traversal & memory addresses:
mat[0][0] = 10 at 0x7ffee1a0
mat[0][1] = 20 at 0x7ffee1a4
mat[0][2] = 30 at 0x7ffee1a8
mat[1][0] = 40 at 0x7ffee1ac
mat[1][1] = 50 at 0x7ffee1b0
mat[1][2] = 60 at 0x7ffee1b4`,
      },
    ],

    'strings-and-text': [
      {
        title: 'Null-Terminated Strings & Standard String Functions',
        tag: 'C Strings <string.h>',
        language: 'c',
        syntax: `// String declaration with null terminator
char str[] = "Hello"; // 6 bytes: 'H','e','l','l','o','\\0'
char buf[32];

// Safe bounded copy
strncpy(buf, str, sizeof(buf) - 1);
buf[sizeof(buf) - 1] = '\\0'; // Ensure termination`,
        howItWorks: [
          'C has no native string object. A string is simply a contiguous array of char terminated by a null byte \'\\0\' (ASCII value 0).',
          'strlen() counts characters sequentially until reaching the first \'\\0\'. It does NOT count the null terminator.',
          'sizeof() on a string literal or char array includes the trailing null terminator byte.',
        ],
        howToProgram: [
          'Always allocate space for the null terminator: a string of length N requires a buffer of at least N + 1 bytes.',
          'Never use unbounded functions like strcpy or gets; prefer bounded functions like strncpy, snprintf, and fgets.',
          'Always ensure buffers are explicitly null-terminated after using strncpy.',
        ],
        tokens: [
          {
            token: "'\\0'",
            role: 'Null Character Sentinel',
            description: 'Signals the end of a valid string to all C library functions.',
            rules: 'Must be present at the end of every valid C string.',
            pitfall: 'Omitting \\0 causes string routines to read random memory until finding a 0 byte.',
          },
          {
            token: 'strlen()',
            role: 'String Length Function',
            description: 'Computes character count in O(n) time by scanning until \\0.',
            rules: 'Requires null-terminated input.',
            pitfall: 'Calling strlen() inside a loop condition for (i=0; i<strlen(s); i++) degrades to O(n²)!',
          },
        ],
        pitfalls: [
          'Modifying string literals: char *s = "hello"; s[0] = \'H\'; triggers a SIGSEGV because literals reside in read-only memory.',
          'Buffer overflow: Writing 20 characters into char buf[10] overwrites adjacent stack variables.',
        ],
        codeExample: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[] = "Hello";
    printf("String: %s\\n", greeting);
    printf("strlen (characters): %zu\\n", strlen(greeting));
    printf("sizeof (bytes in memory): %zu\\n", sizeof(greeting));

    for (size_t i = 0; i < sizeof(greeting); i++) {
        if (greeting[i] == '\\0')
            printf("greeting[%zu] = '\\\\0' (terminator)\\n", i);
        else
            printf("greeting[%zu] = '%c'\\n", i, greeting[i]);
    }
    return 0;
}`,
        expectedOutput: `String: Hello
strlen (characters): 5
sizeof (bytes in memory): 6
greeting[0] = 'H'
greeting[1] = 'e'
greeting[2] = 'l'
greeting[3] = 'l'
greeting[4] = 'o'
greeting[5] = '\\0' (terminator)`,
      },
    ],

    'pointers-and-memory': [
      {
        title: 'Pointer Arithmetic, Strides & Array Equivalence',
        tag: 'Pointers & Memory Offsets',
        language: 'c',
        syntax: `int arr[] = {10, 20, 30, 40};
int *ptr = arr; // Points to arr[0]

int val1 = *(ptr + 1); // Access arr[1] (val1 == 20)
ptr++;                 // Advances pointer by sizeof(int) = 4 bytes`,
        howItWorks: [
          'Pointer arithmetic is automatically scaled by the size of the referenced type: ptr + k advances the address by k * sizeof(*ptr) bytes.',
          'Array subscripting arr[i] is syntactically equivalent to *(arr + i).',
          'Subtracting two pointers (ptr2 - ptr1) pointing into the same array yields the number of elements between them (type ptrdiff_t).',
        ],
        howToProgram: [
          'Only perform pointer arithmetic within the bounds of a contiguous array (or one past the last element).',
          'Ensure the pointer is explicitly typed; pointer arithmetic is not permitted on void* without casting.',
          'Use const int *ptr to indicate that the data pointed to cannot be modified through this pointer.',
        ],
        tokens: [
          {
            token: 'ptr + 1',
            role: 'Pointer Arithmetic Addition',
            description: 'Computes address advanced by 1 element (sizeof(*ptr) bytes).',
            rules: 'Both pointers must belong to the same array or allocation block.',
            pitfall: 'Advancing beyond array bounds leads to undefined behavior.',
          },
          {
            token: '*(ptr + i)',
            role: 'Offset Dereference',
            description: 'Equivalent to arr[i]. Reads element at offset i.',
            rules: 'Parentheses around (ptr + i) are mandatory; *ptr + i adds i to the value!',
            pitfall: '*ptr + 1 evaluates to (*ptr) + 1, not element 1.',
          },
        ],
        pitfalls: [
          'Writing *ptr++ vs (*ptr)++: *ptr++ dereferences then advances pointer; (*ptr)++ increments the value in place!',
          'Comparing pointers from different memory allocations triggers undefined behavior.',
        ],
        codeExample: `#include <stdio.h>

int main() {
    int nums[] = {100, 200, 300, 400};
    int *p = nums;

    printf("p points to: %p with value %d\\n", (void*)p, *p);
    printf("p + 1 points to: %p with value %d (+%zu bytes)\\n", 
           (void*)(p + 1), *(p + 1), sizeof(int));
    printf("p + 2 points to: %p with value %d (+%zu bytes)\\n", 
           (void*)(p + 2), *(p + 2), 2 * sizeof(int));
    return 0;
}`,
        expectedOutput: `p points to: 0x7ffee1a0 with value 100
p + 1 points to: 0x7ffee1a4 with value 200 (+4 bytes)
p + 2 points to: 0x7ffee1a8 with value 300 (+8 bytes)`,
      },
    ],

    'dynamic-memory': [
      {
        title: 'Dynamic Heap Allocation (malloc, calloc, realloc & free)',
        tag: 'Dynamic Memory <stdlib.h>',
        language: 'c',
        syntax: `// Allocation on the heap
int *arr = (int*)malloc(n * sizeof(int));

// Always check for allocation failure!
if (arr == NULL) {
    perror("Memory allocation failed");
    exit(EXIT_FAILURE);
}

// Release heap memory when done
free(arr);
arr = NULL; // Prevent dangling pointer`,
        howItWorks: [
          'malloc(size) asks the operating system allocator (via brk or mmap) for a contiguous block of size bytes on the heap.',
          'Memory returned by malloc contains uninitialized garbage bytes. calloc(n, size) allocates and zeroes out all bytes.',
          'free(ptr) returns the memory block to the allocator. It does NOT clear the pointer variable itself; ptr still holds the old address (dangling pointer).',
        ],
        howToProgram: [
          'Always use sizeof(*ptr) or sizeof(type) when calculating byte count: malloc(n * sizeof(int)).',
          'Always check if the returned pointer is NULL before attempting to access it.',
          'Always pair every malloc/calloc call with a corresponding free call on all exit paths.',
          'Immediately set pointers to NULL after freeing them: free(p); p = NULL; to prevent double-free errors.',
        ],
        tokens: [
          {
            token: 'malloc()',
            role: 'Heap Allocation Function',
            description: 'Allocates uninitialized memory of specified byte size.',
            rules: 'Returns void* which implicitly converts to any pointer type in C.',
            pitfall: 'Returns NULL if system is out of memory.',
          },
          {
            token: 'free()',
            role: 'Heap Deallocation Function',
            description: 'Releases previously allocated heap memory block.',
            rules: 'Argument must be a pointer previously returned by malloc/calloc/realloc, or NULL.',
            pitfall: 'Calling free() twice on the same pointer triggers a crash (double free error).',
          },
        ],
        pitfalls: [
          'Memory leak: Losing the pointer to allocated memory before freeing it causes system memory exhaustion.',
          'Use-after-free: Accessing *ptr after calling free(ptr) causes critical security vulnerabilities.',
        ],
        codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int size = 4;
    int *dyn_array = (int*)malloc(size * sizeof(int));

    if (dyn_array == NULL) {
        printf("Allocation failed!\\n");
        return 1;
    }

    printf("Allocated %zu bytes at heap address: %p\\n", 
           size * sizeof(int), (void*)dyn_array);

    for (int i = 0; i < size; i++) {
        dyn_array[i] = (i + 1) * 25;
        printf("dyn_array[%d] = %d\\n", i, dyn_array[i]);
    }

    free(dyn_array);
    dyn_array = NULL;
    printf("Memory freed successfully.\\n");
    return 0;
}`,
        expectedOutput: `Allocated 16 bytes at heap address: 0x10a200
dyn_array[0] = 25
dyn_array[1] = 50
dyn_array[2] = 75
dyn_array[3] = 100
Memory freed successfully.`,
      },
    ],
  },

  'py-programming': {
    foundations: [
      {
        title: 'Dynamic Typing, Reference Binding & id()',
        tag: 'Python 3.12 / Execution Model',
        language: 'python',
        syntax: `# Variable reference assignment
x = 42             # Creates int object 42, binds name 'x' to it
y = x              # Binds name 'y' to the same object
is_same = (x is y) # True: both refer to the exact same memory id

# Re-binding x to a different object
x = "Hello"        # Name 'x' now points to str object; y still points to 42`,
        howItWorks: [
          'In Python, variables do not store values directly; variables are names (labels) bound to objects stored on the heap.',
          'Every Python object contains a type pointer, a reference counter (PyObject_HEAD), and the actual data payload.',
          'The `id()` function returns the unique integer identity of an object (its memory address in CPython).',
          'The `is` operator checks object identity (id(a) == id(b)), whereas `==` checks value equality (invoking __eq__).',
        ],
        howToProgram: [
          'Use `==` when comparing values (e.g. `if count == 0:`), and use `is` when comparing singleton identities (e.g. `if val is None:`).',
          'Be aware that Python interns small integers (-5 to 256) and short strings as singleton objects for memory efficiency.',
          'Remember that variables in Python are untyped references, but the objects they point to are strongly typed.',
        ],
        tokens: [
          {
            token: 'is',
            role: 'Identity Comparison Operator',
            description: 'Evaluates to True if two variables refer to the exact same object in memory.',
            rules: 'Compares memory identity: id(a) == id(b).',
            pitfall: 'Do not use `is` to compare numbers or strings; use `==` instead.',
          },
          {
            token: 'id()',
            role: 'Built-in Introspection Function',
            description: 'Returns the distinct memory identity of the given object.',
            rules: 'Guaranteed unique and constant for the object during its lifetime.',
            pitfall: 'Two objects with non-overlapping lifetimes may share the same id.',
          },
        ],
        pitfalls: [
          'Assuming variable assignment copies data: `list_b = list_a` does NOT copy the list; both names point to the same list in memory.',
        ],
        codeExample: `a = [1, 2, 3]
b = a          # Alias (same reference)
c = a.copy()   # Shallow copy (new object)

print(f"a == b: {a == b} (Values equal)")
print(f"a is b: {a is b} (Same object)")
print(f"a is c: {a is c} (Separate objects in memory)")

a.append(99)
print(f"b after modifying a: {b}")
print(f"c after modifying a: {c}")`,
        expectedOutput: `a == b: True (Values equal)
a is b: True (Same object)
a is c: False (Separate objects in memory)
b after modifying a: [1, 2, 3, 99]
c after modifying a: [1, 2, 3]`,
      },
    ],

    'control-flow-and-loops': [
      {
        title: 'Iteration Protocol & enumerate() / zip()',
        tag: 'Control Flow & Idiomatic Loops',
        language: 'python',
        syntax: `# Looping with enumerate for index + value
for index, item in enumerate(iterable, start=0):
    # Process index and item

# Parallel looping with zip
for val1, val2 in zip(list1, list2):
    # Process matched pairs`,
        howItWorks: [
          'Python for loops do not use counter indices under the hood; they request an iterator using iter(iterable) and repeatedly call next() until StopIteration is raised.',
          'enumerate() returns an iterator yielding 2-tuples containing a count and the value from the wrapped sequence.',
          'zip() pairs corresponding elements from multiple iterables until the shortest iterable is exhausted.',
        ],
        howToProgram: [
          'Avoid `for i in range(len(items)): items[i]`; always write `for item in items:` or `for i, item in enumerate(items):`.',
          'Use `for ... else:` when searching: the `else` block runs only if the loop completes without encountering a `break`.',
        ],
        tokens: [
          {
            token: 'enumerate()',
            role: 'Built-in Iterator Factory',
            description: 'Wraps an iterable and yields (index, element) tuples.',
            rules: 'Accepts optional `start` parameter (e.g. `start=1`).',
            pitfall: 'Do not unpack with mismatched variables (needs 2 identifiers).',
          },
        ],
        pitfalls: [
          'Modifying a collection while iterating over it leads to skipped elements and unpredictable bugs.',
        ],
        codeExample: `tasks = ['Review PR', 'Run Unit Tests', 'Deploy to Staging']

print("--- Ordered Deployment Checklist ---")
for step, task in enumerate(tasks, start=1):
    print(f"Step {step}: {task}")`,
        expectedOutput: `--- Ordered Deployment Checklist ---
Step 1: Review PR
Step 2: Run Unit Tests
Step 3: Deploy to Staging`,
      },
    ],

    'comprehensions-and-generators': [
      {
        title: 'List, Dict & Set Comprehensions and Generator Expressions',
        tag: 'Comprehensions & Lazy Evaluation',
        language: 'python',
        syntax: `# List Comprehension with filtering
result_list = [expression for item in iterable if condition]

# Generator Expression (lazy streaming evaluation)
gen = (expression for item in iterable if condition)

# Dict Comprehension
word_lengths = {word: len(word) for word in words}`,
        howItWorks: [
          'List comprehensions construct a new list in C-level optimized bytecode (BUILD_LIST, LIST_APPEND), executing significantly faster than manual for-loop appends.',
          'A generator expression enclosed in parentheses does not build a list in memory; it returns a generator object that produces items on demand upon next() or iteration.',
          'Generators maintain internal execution frame state with negligible memory footprint regardless of dataset size (O(1) memory).',
        ],
        howToProgram: [
          'Use list comprehensions for concise, readable transformations; if the comprehension spans more than 2 lines, write a regular loop.',
          'Use generator expressions or functions with `yield` when processing large files, streaming sensor packets, or infinite sequences to avoid Out-Of-Memory crashes.',
        ],
        tokens: [
          {
            token: '[expr for x in seq if cond]',
            role: 'List Comprehension Syntax',
            description: 'Generates a new list by mapping expr over seq filtered by cond.',
            rules: 'Creates a private comprehension scope in Python 3.',
            pitfall: 'Overly nested comprehensions hurt readability.',
          },
          {
            token: 'yield',
            role: 'Generator Suspension Keyword',
            description: 'Pauses function execution and produces a value to the caller.',
            rules: 'Can only be used inside a function definition.',
            pitfall: 'Calling a generator function returns a generator object, does not run the code immediately.',
          },
        ],
        pitfalls: [
          'Building huge lists with comprehensions: `[x for x in range(10**8)]` consumes gigabytes of RAM; use `(x for x in range(10**8))` instead.',
        ],
        codeExample: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List comprehension: squares of even numbers
even_squares = [n**2 for n in numbers if n % 2 == 0]
print(f"Even squares: {even_squares}")

# Generator function yielding Fibonacci numbers
def fibonacci(limit):
    a, b = 0, 1
    for _ in range(limit):
        yield a
        a, b = b, a + b

print("Fibonacci stream:", list(fibonacci(7)))`,
        expectedOutput: `Even squares: [4, 16, 36, 64, 100]
Fibonacci stream: [0, 1, 1, 2, 3, 5, 8]`,
      },
    ],

    'functional-and-decorators': [
      {
        title: 'Function Decorators & Closure Mechanics',
        tag: 'Decorators & Higher-Order Functions',
        language: 'python',
        syntax: `@decorator_function
def my_target_function(*args, **kwargs):
    # Function body

# Syntactic sugar equivalent to:
# my_target_function = decorator_function(my_target_function)`,
        howItWorks: [
          'In Python, functions are first-class citizens: they can be passed as arguments, returned from other functions, and bound to variables.',
          'The `@decorator` syntax passes the decorated function into the decorator callable at definition time and rebinds the function name to the returned wrapper.',
          'The wrapper forms a closure, retaining access to the enclosed function and any surrounding state even after the outer function has finished executing.',
        ],
        howToProgram: [
          'Always use `@functools.wraps(func)` inside the wrapper function to preserve the original function\'s `__name__` and `__doc__`.',
          'Use `*args, **kwargs` in the wrapper signature to ensure the decorator works with functions taking any argument structure.',
        ],
        tokens: [
          {
            token: '@decorator',
            role: 'Decorator Syntactic Sugar',
            description: 'Rebinds target function to the output of decorator(target).',
            rules: 'Must precede def or class statement directly.',
            pitfall: 'Executes immediately when the module is imported, not when function is called.',
          },
        ],
        pitfalls: [
          'Forgetting to return the result of `func(*args, **kwargs)` from inside the wrapper causes the decorated function to return None.',
        ],
        codeExample: `def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"[TRACE] Executing '{func.__name__}' with args={args}")
        result = func(*args, **kwargs)
        print(f"[TRACE] '{func.__name__}' returned {result}")
        return result
    return wrapper

@log_call
def calculate_power(base, exponent):
    return base ** exponent

ans = calculate_power(2, 8)`,
        expectedOutput: `[TRACE] Executing 'calculate_power' with args=(2, 8)
[TRACE] 'calculate_power' returned 256`,
      },
    ],

    'oop-and-classes': [
      {
        title: 'Classes, __init__ Constructor & Encapsulation',
        tag: 'Object-Oriented Programming',
        language: 'python',
        syntax: `class ClassName:
    class_attr = 0 # Shared across all instances

    def __init__(self, param1, param2):
        self.param1 = param1 # Instance attribute
        self._protected = param2

    def instance_method(self):
        return self.param1 * 2`,
        howItWorks: [
          'When an instance is created via ClassName(args), Python calls `__new__` to allocate the object, then calls `__init__` passing the newly created instance as `self`.',
          'Attributes stored on `self` are held in the instance\'s `__dict__` dictionary.',
          'Method resolution searches the instance dict first, then the class dict, followed by parent classes in Method Resolution Order (MRO).',
        ],
        howToProgram: [
          'Always declare `self` as the first parameter of instance methods.',
          'Use single leading underscore (`_protected`) to signal implementation details intended for internal class use.',
          'Use `@property` decorators to expose clean attribute access with validation instead of Java-style `get_x()` and `set_x()` methods.',
        ],
        tokens: [
          {
            token: 'self',
            role: 'Explicit Instance Reference',
            description: 'Refers to the specific object instance on which the method is called.',
            rules: 'Passed automatically by Python when invoking instance methods.',
            pitfall: 'Omitting self in method definition causes TypeError on invocation.',
          },
          {
            token: '__init__',
            role: 'Instance Initializer Dunder',
            description: 'Initializes attributes on the newly allocated object.',
            rules: 'Must return None.',
            pitfall: 'Attempting to return a value other than None raises TypeError.',
          },
        ],
        pitfalls: [
          'Using mutable default arguments in methods: `def __init__(self, items=[]):` causes all instances to share the exact same list!',
        ],
        codeExample: `class Robot:
    def __init__(self, name, battery=100):
        self.name = name
        self.battery = battery

    def report(self):
        print(f"Robot '{self.name}': Battery at {self.battery}%")

r1 = Robot("Atlas", 95)
r1.report()`,
        expectedOutput: `Robot 'Atlas': Battery at 95%`,
      },
    ],
  },

  mcu: {
    'gpio-and-bitwise': [
      {
        title: 'Direct Hardware Register Bitwise Masking',
        tag: 'Embedded C / Bare-Metal',
        language: 'c',
        syntax: `// Set bit N to 1 (HIGH)
REG |= (1U << PIN);

// Clear bit N to 0 (LOW)
REG &= ~(1U << PIN);

// Toggle bit N (Invert state)
REG ^= (1U << PIN);

// Read bit N state
bool is_high = (REG & (1U << PIN)) != 0;`,
        howItWorks: [
          'Microcontroller hardware peripherals are mapped to special memory-mapped I/O register addresses.',
          'The bitshift `(1U << PIN)` constructs a bitmask with bit PIN set to 1 and all other bits 0.',
          'Bitwise OR (`|=`) forces the target bit to 1 without altering any other bits in the register.',
          'Bitwise AND with NOT (`&= ~mask`) forces the target bit to 0, preserving all other bits.',
          'Bitwise XOR (`^=`) flips the target bit (0 to 1, or 1 to 0), ideal for LED toggling.',
        ],
        howToProgram: [
          'Always use compound bitwise operators (`|=`, `&= ~`) rather than direct assignment (`REG = ...`) to prevent clobbering neighboring peripheral pins.',
          'Always use the `volatile` keyword when defining hardware register pointers to prevent the compiler optimizer from caching register reads in CPU registers.',
          'Configure Data Direction Registers (DDRx) before writing to Port Output Registers (PORTx).',
        ],
        tokens: [
          {
            token: '|=(1 << PIN)',
            role: 'Bitwise Set Operator',
            description: 'Sets specific register bit to 1 without affecting others.',
            rules: 'PIN must be within the register bit width (0-7 for 8-bit, 0-31 for 32-bit).',
            pitfall: 'Using regular = instead of |= overwrites the entire port!',
          },
          {
            token: '&= ~(1 << PIN)',
            role: 'Bitwise Clear Operator',
            description: 'Clears specific register bit to 0 without affecting others.',
            rules: 'Requires bitwise NOT ~ on the mask.',
            pitfall: 'Omitting ~ causes all OTHER bits in the register to be wiped to 0.',
          },
        ],
        pitfalls: [
          'Writing `PORTB = (1 << 5);` turns off pins 0, 1, 2, 3, 4, 6, 7! Must write `PORTB |= (1 << 5);`.',
        ],
        codeExample: `#include <stdio.h>

#define PIN_LED 5

int main() {
    unsigned char DDRB = 0x00;  // Direction
    unsigned char PORTB = 0x00; // Output

    // Set Pin 5 as OUTPUT
    DDRB |= (1 << PIN_LED);
    printf("DDRB after config: 0x%02X (Pin %d is OUTPUT)\\n", DDRB, PIN_LED);

    // Turn LED ON
    PORTB |= (1 << PIN_LED);
    printf("PORTB (LED ON):    0x%02X\\n", PORTB);

    // Toggle LED
    PORTB ^= (1 << PIN_LED);
    printf("PORTB (LED OFF):   0x%02X\\n", PORTB);
    return 0;
}`,
        expectedOutput: `DDRB after config: 0x20 (Pin 5 is OUTPUT)
PORTB (LED ON):    0x20
PORTB (LED OFF):   0x00`,
      },
    ],
  },

  ros: {
    'nodes-and-topics': [
      {
        title: 'ROS 2 Publisher / Subscriber Node Syntax',
        tag: 'ROS 2 Humble / rclpy',
        language: 'python',
        syntax: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic_name', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2'
        self.publisher_.publish(msg)`,
        howItWorks: [
          'ROS 2 nodes inherit from `rclpy.node.Node`, registering the process with the DDS (Data Distribution Service) middleware.',
          '`create_publisher` declares a topic topic_name with a QoS (Quality of Service) history depth buffer of 10.',
          'The ROS 2 executor manages thread scheduling and timer callbacks, serializing messages into CDR (Common Data Representation) wire packets for pub/sub subscribers across network interfaces.',
        ],
        howToProgram: [
          'Always call `super().__init__(\'node_name\')` in the constructor to register the node name in the ROS 2 computational graph.',
          'Use appropriate message types (e.g. `geometry_msgs/Twist` for velocities, `sensor_msgs/LaserScan` for LiDAR).',
          'Clean up nodes gracefully by shutting down rclpy: `node.destroy_node(); rclpy.shutdown()`.',
        ],
        tokens: [
          {
            token: 'create_publisher()',
            role: 'ROS 2 Publisher Factory',
            description: 'Instantiates a publisher channel for broadcasting messages.',
            rules: 'Requires (MsgType, topic_name, qos_profile).',
            pitfall: 'Publishing messages with mismatched types raises SerializationError.',
          },
        ],
        pitfalls: [
          'Blocking inside a timer callback: Long-running or sleep() calls in callbacks starve the executor and delay other topics.',
        ],
        codeExample: `class SimulatedNode:
    def __init__(self, name):
        self.name = name
        print(f"[ROS2] Initialized node: /{self.name}")

    def publish_telemetry(self, topic, data):
        print(f"[ROS2] [{self.name}] -> Published to /{topic}: {data}")

node = SimulatedNode("teleop_keyboard")
node.publish_telemetry("cmd_vel", {"linear": 1.2, "angular": -0.4})`,
        expectedOutput: `[ROS2] Initialized node: /teleop_keyboard
[ROS2] [teleop_keyboard] -> Published to /cmd_vel: {'linear': 1.2, 'angular': -0.4}`,
      },
    ],
  },
};

/**
 * Retrieves syntax items for a given subject/topic/subtopic.
 * Falls back gracefully if an exact subtopic entry is not specified.
 */
export function getCodeSyntaxForTopic(topicId, subTopicId, existingContent) {
  // If content explicitly has codeSyntax array, use it
  if (existingContent?.codeSyntax?.length) {
    return existingContent.codeSyntax;
  }

  // Check registry
  const topicMap = CODE_SYNTAX_REGISTRY[topicId];
  if (topicMap) {
    if (subTopicId && topicMap[subTopicId]) {
      return topicMap[subTopicId];
    }
    // Return first available or foundations
    const firstKey = Object.keys(topicMap)[0];
    if (firstKey && topicMap[firstKey]) {
      return topicMap[firstKey];
    }
  }

  // Gracefully adapt existing equations into code-syntax format if available
  if (existingContent?.equations?.length) {
    return existingContent.equations.map((eq, i) => ({
      title: eq.name || `Language Syntax #${i + 1}`,
      tag: eq.conditions?.[0] || 'Language Mechanics',
      language: topicId === 'py-programming' ? 'python' : 'c',
      syntax: eq.latex ? eq.latex.replace(/\\text\{([^}]+)\}/g, '$1').replace(/\\mathtt\{([^}]+)\}/g, '$1').replace(/\\quad/g, ' ').replace(/\\to/g, '->').replace(/\\equiv/g, '==') : '// Code syntax pattern',
      howItWorks: [
        eq.summary || 'Under-the-hood language mechanics and runtime execution behavior.',
        'Compiler translates this structure into low-level instructions following strict evaluation semantics.',
      ],
      howToProgram: [
        'Declare variables with matching data types.',
        'Adhere to language standards and prevent undefined behavior.',
        'Verify preconditions and error bounds prior to execution.',
      ],
      tokens: (eq.variables || []).map((v) => ({
        token: v.symbol ? v.symbol.replace(/\\/g, '') : 'token',
        role: v.name || 'Keyword / Operator',
        description: v.description || 'Syntactic element in language grammar.',
        rules: v.connections || 'Follows standard language evaluation rules.',
      })),
      pitfalls: [
        'Ensure proper syntax scoping and avoid accessing uninitialized data.',
      ],
      codeExample: `// Verified implementation\\nprintf("Executing: %s\\n", "${eq.name}");`,
      expectedOutput: `Executing: ${eq.name}`,
    }));
  }

  return [];
}
