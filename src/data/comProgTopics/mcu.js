/**
 * Com-Prog Topic: Microcontroller (MCU) Programming (Multi-Page Engineering Hub)
 * Embedded C/C++, hardware registers, memory-mapped I/O, timers, interrupts, and serial communication.
 */

const foundationsSubPage = {
  id: 'foundations',
  title: 'Architecture & Registers',
  icon: '🔌',
  tag: 'Embedded C/C++',
  subtitle:
    'Microcontroller architecture, Harvard vs Von Neumann memory, CPU cores (AVR, ARM Cortex-M), Flash vs SRAM, and memory-mapped hardware registers.',
  estimatedTime: '20 min read + interactive MCU lab',
  overview: [
    'Welcome to the Microcontroller (MCU) Engineering Guide. While general-purpose computers run desktop operating systems with abundant virtual memory, microcontrollers are self-contained embedded computer chips integrating CPU cores, volatile SRAM, non-volatile Flash program memory, and hardware peripherals onto a single silicon die.',
    'In embedded programming, software interacts directly with physical hardware through Memory-Mapped I/O (MMIO): specific addresses in the microcontroller\'s memory space are wired directly to hardware peripheral control registers rather than RAM cells.',
    'Writing to or reading from these registers manipulates physical pin voltages, starts hardware timers, triggers analog-to-digital conversions, or sends bits across serial communication buses.',
    'Explore the interactive hardware register and GPIO pin lab below, then navigate through the chapters covering bitwise register manipulation, hardware timers, interrupts, and communication protocols (UART, I2C, SPI)!',
  ],
  keyConcepts: [
    {
      title: 'Memory-Mapped I/O & The volatile Keyword',
      content:
        'In embedded C, hardware registers are accessed via pointers to fixed physical addresses. You MUST declare register pointers using the volatile keyword: volatile uint8_t *reg = (uint8_t*)0x25. The volatile qualifier instructs the compiler that hardware can change the register value independently, preventing the compiler from erroneously caching or optimizing away register reads/writes.',
      exampleLabel: 'Volatile Register Pointer Declaration',
      latex:
        '\\mathtt{\\#define\\;PORTB\\;(*(volatile\\;uint8\\_t*)0x25)}',
    },
    {
      title: 'Harvard Architecture: Flash ROM vs SRAM',
      content:
        'Most modern MCUs (AVR, PIC, ARM Cortex) utilize Harvard architecture, separating the instruction bus (Flash memory where program code resides) from the data bus (SRAM where stack, heap, and static variables reside).',
      exampleLabel: 'Embedded Memory Hierarchy',
      latex:
        '\\text{Flash ROM (Program Code)} \\;\\; \\Vert \\;\\; \\text{SRAM (Variables, Stack)} \\;\\; \\Vert \\;\\; \\text{EEPROM (Non-volatile config)}',
    },
  ],
  equations: [
    {
      name: 'Ohm’s Law for Embedded GPIO Current Limiting',
      latex: 'R_{\\text{limit}} = \\frac{V_{\\text{GPIO}} - V_{\\text{LED}}}{I_{\\text{forward}}}',
      summary: 'Calculates the current-limiting resistor required to protect microcontroller output pins from overcurrent damage.',
      conditions: ['V_GPIO typically 3.3V or 5.0V; max pin current typically 20mA - 40mA'],
      variables: [
        { symbol: 'V_{\\text{GPIO}}', name: 'Pin Logic High Voltage', unit: '\\text{Volts (V)}', description: 'MCU operating voltage.', connections: '3.3V for ARM Cortex, 5.0V for AVR Atmega328P.' },
        { symbol: 'I_{\\text{forward}}', name: 'Desired LED Current', unit: '\\text{Amperes (A)}', description: 'Typically 10mA to 20mA for standard indicator LEDs.', connections: 'Exceeding pin max current burns the internal MOSFET driver.' },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive MCU lab below to toggle 8-bit hardware registers, test bitwise operations (Set, Clear, Toggle), and observe live pin LED logic states.',
};

const gpioAndBitwiseSubPage = {
  id: 'gpio-and-bitwise',
  title: 'GPIO & Bitwise Registers',
  icon: '💡',
  tag: 'DDRx, PORTx & PINx',
  subtitle:
    'General Purpose Input/Output (GPIO), Direction Registers (DDRx), Output Registers (PORTx), Input Registers (PINx), internal pull-ups, and bitwise operators.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'General Purpose Input/Output (GPIO) pins are the physical interface connecting the microcontroller to external circuitry (LEDs, buttons, relays, sensors).',
    'In classic 8-bit MCUs (such as the ATmega328P), each physical port (Port B, C, D) is controlled by a trio of 8-bit registers: DDRx (Data Direction Register: 0=Input, 1=Output), PORTx (Output Register / Pull-up enable), and PINx (Input Pin State Register).',
    'Software controls these pins using atomic bitwise expressions: setting bits with OR (|=), clearing bits with AND-NOT (&= ~), and toggling bits with XOR (^=).',
  ],
  keyConcepts: [
    {
      title: 'The GPIO Register Triad',
      content:
        '• DDRB: Configures pin direction (Bit=1 sets Output, Bit=0 sets Input).\n' +
        '• PORTB: When Output, Bit=1 drives High (Vcc), Bit=0 drives Low (GND). When Input, Bit=1 activates internal pull-up resistor!\n' +
        '• PINB: Reads physical logic level currently present on external pins.',
      exampleLabel: 'Configuring Pin as Output',
      latex:
        '\\text{DDRB} \\mid= (1 \\ll \\text{PB5}); \\quad \\text{PORTB} \\mid= (1 \\ll \\text{PB5}); \\quad \\text{// LED ON}',
    },
    {
      title: 'Atomic Bit Manipulation Formulas',
      content:
        '• Set bit n: REG |= (1 << n)\n' +
        '• Clear bit n: REG &= ~(1 << n)\n' +
        '• Toggle bit n: REG ^= (1 << n)\n' +
        '• Read bit n: (REG & (1 << n)) != 0',
      exampleLabel: 'Bitwise Idioms Table',
      latex:
        '\\text{Toggle Pin: } \\text{PORTB} \\;\\wedge= (1 \\ll 5), \\qquad \\text{Read Button: } \\text{pressed} = !(\\text{PINB} \\;\\&\\; (1 \\ll 2))',
    },
  ],
  equations: [
    {
      name: 'Bitmask Shift Formula',
      latex: '\\text{Mask}(n) = 1 \\ll n \\equiv 2^n',
      summary: 'Generates a binary bitmask with a single 1 at bit position n (0-indexed).',
      conditions: ['0 <= n < 8 for 8-bit registers, 0 <= n < 32 for 32-bit registers'],
      variables: [
        { symbol: 'n', name: 'Bit Position', unit: '\\text{index}', description: 'Target pin index (e.g. 5 for PB5).', connections: 'Positions range from 0 (LSB) to 7 (MSB).' },
      ],
    },
  ],
};

const timersAndPwmSubPage = {
  id: 'timers-and-pwm',
  title: 'Timers, Interrupts & PWM',
  icon: '⏱️',
  tag: 'ISR & Waveforms',
  subtitle:
    'Hardware timer/counters, prescalers, Interrupt Service Routines (ISRs), non-blocking timekeeping, and Pulse-Width Modulation (PWM) for motor and LED control.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Software delays (such as _delay_ms() in C) are blocking: they keep the CPU spinning in empty no-op loops, preventing other tasks from executing. Hardware Timers count system clock cycles independently in hardware, freeing the CPU.',
    'A Prescaler divides the high-frequency system oscillator (e.g. 16 MHz) by a factor (1, 8, 64, 256, 1024) to slow the timer clock so it can measure longer time intervals without overflowing.',
    'Interrupt Service Routines (ISRs) asynchronously interrupt normal program flow when hardware events occur (timer compare match, external pin state change), executing rapid handler code before resuming main execution.',
    'Pulse-Width Modulation (PWM) generates analog-like average voltages by rapidly pulsing a digital output pin between High and Low, controlled by the Duty Cycle (ton / T).',
  ],
  keyConcepts: [
    {
      title: 'Timer Frequency & Prescaler Formula',
      content:
        'The timer tick frequency f_timer = f_cpu / Prescaler. When counting up to a compare value OCRnA, the resulting interrupt/PWM frequency is f = f_cpu / (Prescaler × (1 + OCRnA)).',
      exampleLabel: 'Timer Tick Calculation',
      latex:
        'f_{\\text{timer}} = \\frac{f_{\\text{CPU}}}{\\text{Prescaler}}, \\qquad T_{\\text{tick}} = \\frac{1}{f_{\\text{timer}}}',
    },
    {
      title: 'Pulse-Width Modulation (PWM) & Duty Cycle',
      content:
        'Duty cycle D = (t_high / T) × 100%. The effective average voltage delivered to an LED or DC motor is V_avg = D × V_cc.',
      exampleLabel: 'Average Voltage Formula',
      latex:
        'V_{\\text{avg}} = \\frac{t_{\\text{on}}}{T} \\times V_{\\text{CC}} = \\text{DutyCycle} \\times V_{\\text{CC}}',
    },
    {
      title: 'Interrupt Service Routine (ISR) Golden Rule',
      content:
        'Keep ISRs as short as possible! Never call delay functions, serial prints, or long loops inside an ISR. Set a volatile flag in the ISR and process heavy logic in the main loop.',
      exampleLabel: 'Clean ISR Architecture',
      latex:
        '\\mathtt{ISR}(\\text{TIMER1\\_COMPA\\_vect}) \\;\\{\\; \\mathtt{flag = 1;} \\;\\}',
    },
  ],
  equations: [
    {
      name: 'PWM Average Output Voltage',
      latex: 'V_{\\text{avg}} = \\frac{\\text{OCR}}{\\text{TOP}} \\times V_{\\text{CC}}',
      summary: 'Relates hardware timer output compare register (OCR) to physical average voltage.',
      conditions: ['TOP is timer resolution (e.g. 255 for 8-bit fast PWM)'],
      variables: [
        { symbol: '\\text{OCR}', name: 'Output Compare Register Value', unit: '\\text{counts}', description: 'Determines the duration pin stays High during each cycle.', connections: '0 yields 0V; TOP yields V_CC.' },
      ],
    },
  ],
};

const communicationBusesSubPage = {
  id: 'communication-buses',
  title: 'Serial Buses: UART, I2C & SPI',
  icon: '📡',
  tag: 'Serial Protocols',
  subtitle:
    'Hardware serial communication: asynchronous UART (baud rate, TX/RX), synchronous I2C (two-wire, master/slave, open-drain), and high-speed synchronous SPI (MOSI/MISO/SCK/CS).',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Microcontrollers communicate with sensors, displays, and other microcontrollers using dedicated serial communication hardware peripherals.',
    'UART (Universal Asynchronous Receiver-Transmitter): Asynchronous point-to-point protocol using 2 wires (TX and RX) with synchronized Baud Rate clocks.',
    'I2C (Inter-Integrated Circuit / TWI): Synchronous multi-device bus using only 2 wires (SDA data and SCL clock) with open-drain pull-up architecture and 7-bit device addressing.',
    'SPI (Serial Peripheral Interface): Synchronous full-duplex, high-speed 4-wire bus (MOSI, MISO, SCK, CS/SS) capable of megabit throughputs, ideal for displays, SD cards, and fast sensors.',
  ],
  keyConcepts: [
    {
      title: 'UART Baud Rate & Frame Structure',
      content:
        'UART transmits 8-bit data frames bordered by 1 Start bit (low) and 1-2 Stop bits (high). Both transmitter and receiver must agree on baud rate (e.g. 9600, 115200 bps).',
      exampleLabel: 'UART Frame Diagram',
      latex:
        '[\\text{Idle: 1}] \\to [\\text{Start: 0}] \\to [D_0 \\dots D_7] \\to [\\text{Stop: 1}]',
    },
    {
      title: 'I2C vs SPI Comparison',
      content:
        '• I2C: 2 wires, addressable (up to 127 devices), pull-up resistors required, speeds 100 kHz - 400 kHz.\n' +
        '• SPI: 4 wires, full-duplex, separate Chip Select (CS) pin per device, speeds up to 10-50 MHz.',
      exampleLabel: 'Protocol Throughput Comparison',
      latex:
        '\\text{Speed}(\\text{SPI: 20 Mbps}) \\gg \\text{Speed}(\\text{I2C: 400 kbps}) \\gg \\text{Speed}(\\text{UART: 115.2 kbps})',
    },
  ],
  equations: [
    {
      name: 'UART Baud Rate Generator Formula',
      latex: '\\text{UBRR} = \\frac{f_{\\text{CPU}}}{16 \\times \\text{BaudRate}} - 1',
      summary: 'Calculates the baud rate register divisor value for AVR/ARM UART controllers.',
      conditions: ['Asynchronous normal speed mode (U2X = 0)'],
      variables: [
        { symbol: 'f_{\\text{CPU}}', name: 'Microcontroller Clock Frequency', unit: '\\text{Hz}', description: 'System oscillator frequency (e.g. 16,000,000 Hz).', connections: 'Known at board design.' },
        { symbol: '\\text{BaudRate}', name: 'Transmission Speed', unit: '\\text{bits/second}', description: 'Desired communication rate (e.g. 9600, 115200).', connections: 'Must match receiver rate.' },
      ],
    },
  ],
};

const subPages = [
  foundationsSubPage,
  gpioAndBitwiseSubPage,
  timersAndPwmSubPage,
  communicationBusesSubPage,
];

const mcuData = {
  id: 'mcu',
  title: 'Microcontroller',
  subtitle:
    'Embedded C/C++ systems engineering: hardware registers, memory-mapped I/O, GPIO bitwise manipulation, timers, PWM, interrupts, and serial communication protocols (UART, I2C, SPI).',
  level: 'Advanced',
  estimatedTime: '4 Connected Chapters (Embedded Hardware Syllabus)',
  subPages,
  overview: foundationsSubPage.overview,
  keyConcepts: foundationsSubPage.keyConcepts,
  equations: foundationsSubPage.equations,
  interactiveGuide: foundationsSubPage.interactiveGuide,
};

export default mcuData;
