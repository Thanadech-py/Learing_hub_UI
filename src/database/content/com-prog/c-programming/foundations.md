---
id: foundations
title: "Chapter 1: Foundations, Toolchains & I/O"
subtitle: "System anatomy, RAM byte addressing, IPO flowcharts, GCC compilation pipeline, and formatted stdio streams."
tag: Foundations
icon: "⚙️"
level: Beginner
estimatedTime: 25 min read + interactive IDE
---

## 1. Compilation Pipeline (`gcc` Four-Stage Model)

When compiling a C source file (`main.c`) into a native machine executable, the GNU Compiler Collection (`gcc`) executes four sequential stages:

| Stage | Tool | Flag | Output | Function |
| :--- | :--- | :--- | :--- | :--- |
| **1. Preprocessing** | `cpp` | `gcc -E` | `main.i` | Expands `#include` headers, `#define` macros, and strips comments. |
| **2. Compilation** | `cc1` | `gcc -S` | `main.s` | Translates preprocessed C into target CPU assembly instructions. |
| **3. Assembly** | `as` | `gcc -c` | `main.o` | Encodes assembly mnemonics into relocatable binary machine code. |
| **4. Linking** | `ld` | `gcc -o` | `a.out` | Resolves external symbols (`printf`) against `libc` and builds executable. |

```c
#include <stdio.h>

int main(void) {
    int counter = 255;
    printf("Decimal: %d | Hex: 0x%X | Addr: %p\n", counter, counter, (void*)&counter);
    return 0;
}
```

> [!WARNING]
> **Always Pass the Address (`&`) to `scanf`**: Passing a scalar variable `scanf("%d", x)` instead of its memory address `scanf("%d", &x)` causes undefined behavior and segmentation faults!
