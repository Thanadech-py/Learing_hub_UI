import { useState } from 'react';
import '../shared/VizShared.css';
import { MetricBadge } from '../shared/VizControls.jsx';

/**
 * Interactive C Programming 2D Visualizer
 * Visualizes hardware memory addresses, pointer dereferencing,
 * contiguous array indexing, stack frames, and dynamic heap allocation.
 */
export default function CProgrammingViz() {
  const [mode, setMode] = useState('pointers'); // 'pointers' | 'arrays' | 'stack' | 'heap'
  const [valX, setValX] = useState(42);
  const [valY, setValY] = useState(100);
  const [pointerTarget, setPointerTarget] = useState('x'); // 'x' | 'y' | 'null'
  const [arrayIndex, setArrayIndex] = useState(1);
  const [heapBlocks, setHeapBlocks] = useState([
    { id: 1, size: 16, addr: '0x10a200', active: true, tag: 'int_vector' },
    { id: 2, size: 32, addr: '0x10a210', active: true, tag: 'char_buffer' },
  ]);

  const baseAddr = 0x7ffee1a0;

  const handleFreeBlock = (id) => {
    setHeapBlocks((blocks) =>
      blocks.map((b) => (b.id === id ? { ...b, active: false } : b))
    );
  };

  const handleAddBlock = () => {
    setHeapBlocks((blocks) => [
      ...blocks,
      {
        id: Date.now(),
        size: 24,
        addr: `0x10a${(200 + blocks.length * 16).toString(16)}`,
        active: true,
        tag: `heap_obj_${blocks.length + 1}`,
      },
    ]);
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">C Memory & Pointer Architecture Lab</h3>
          <span className="viz-header__tag">ISO C99 / C11 Model</span>
        </div>

        <div className="viz-mode-tabs" role="tablist">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'pointers' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('pointers')}
          >
            📍 Pointers & Addresses
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'arrays' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('arrays')}
          >
            📊 Array Contiguity
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'stack' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('stack')}
          >
            🥞 Call Stack Frames
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'heap' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('heap')}
          >
            🧠 Dynamic Heap (malloc/free)
          </button>
        </div>
      </header>

      {/* Real-time Metric Readouts */}
      <div className="viz-metrics-bar">
        {mode === 'pointers' && (
          <>
            <MetricBadge
              label="Pointer Target"
              value={pointerTarget === 'null' ? 'NULL' : `&${pointerTarget}`}
              highlight={pointerTarget !== 'null'}
            />
            <MetricBadge
              label="Dereferenced (*ptr)"
              value={
                pointerTarget === 'x'
                  ? valX
                  : pointerTarget === 'y'
                  ? valY
                  : 'SEGFAULT'
              }
              unit={pointerTarget === 'null' ? 'UB' : 'int'}
              highlight={pointerTarget === 'null'}
            />
            <MetricBadge
              label="ptr Memory Address"
              value={`0x${(baseAddr + 8).toString(16)}`}
            />
          </>
        )}

        {mode === 'arrays' && (
          <>
            <MetricBadge
              label="Array Base &arr[0]"
              value={`0x${baseAddr.toString(16)}`}
              highlight
            />
            <MetricBadge
              label={`Element arr[${arrayIndex}] Address`}
              value={`0x${(baseAddr + arrayIndex * 4).toString(16)}`}
            />
            <MetricBadge
              label="Stride Step"
              value="4"
              unit="bytes (sizeof(int))"
            />
          </>
        )}

        {mode === 'stack' && (
          <>
            <MetricBadge label="Active Stack Frame" value="calc_hypotenuse()" highlight />
            <MetricBadge label="Frame Pointer (RBP)" value="0x7ffeefbff560" />
            <MetricBadge label="Stack Direction" value="Grows Downward" unit="high → low" />
          </>
        )}

        {mode === 'heap' && (
          <>
            <MetricBadge
              label="Active Heap Allocations"
              value={heapBlocks.filter((b) => b.active).length}
              unit="blocks"
              highlight
            />
            <MetricBadge
              label="Total Heap Bytes"
              value={heapBlocks
                .filter((b) => b.active)
                .reduce((acc, b) => acc + b.size, 0)}
              unit="bytes"
            />
          </>
        )}
      </div>

      {/* Visual Canvas Area */}
      <div className="viz-canvas-area" style={{ minHeight: '360px', padding: '1.5rem' }}>
        {mode === 'pointers' && (
          <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {/* Variable X */}
              <div
                style={{
                  background: pointerTarget === 'x' ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                  border: `2px solid ${pointerTarget === 'x' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '14px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>int x</span>
                  <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>0x{baseAddr.toString(16)}</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>{valX}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>4 bytes (0x{(valX).toString(16).padStart(8, '0')})</div>
              </div>

              {/* Variable Y */}
              <div
                style={{
                  background: pointerTarget === 'y' ? 'rgba(167, 139, 250, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                  border: `2px solid ${pointerTarget === 'y' ? '#a78bfa' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '14px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>int y</span>
                  <span style={{ fontFamily: 'monospace', color: '#a78bfa' }}>0x{(baseAddr + 4).toString(16)}</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>{valY}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>4 bytes (0x{(valY).toString(16).padStart(8, '0')})</div>
              </div>

              {/* Pointer Variable ptr */}
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.14)',
                  border: '2px solid #f59e0b',
                  borderRadius: '14px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>int *ptr</span>
                  <span style={{ fontFamily: 'monospace', color: '#f59e0b' }}>0x{(baseAddr + 8).toString(16)}</span>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#facc15', fontFamily: 'monospace' }}>
                  {pointerTarget === 'x'
                    ? `0x${baseAddr.toString(16)}`
                    : pointerTarget === 'y'
                    ? `0x${(baseAddr + 4).toString(16)}`
                    : '0x00000000 (NULL)'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                  Stores 64-bit target address (points to {pointerTarget})
                </div>
              </div>
            </div>

            {/* Code simulation box */}
            <div
              style={{
                background: 'rgba(8, 13, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: '#e2e8f0',
              }}
            >
              <span style={{ color: '#60a5fa' }}>int</span> x = {valX}; <br />
              <span style={{ color: '#60a5fa' }}>int</span> y = {valY}; <br />
              <span style={{ color: '#60a5fa' }}>int</span> *ptr = {pointerTarget === 'null' ? 'NULL' : `&${pointerTarget}`}; <br />
              <span style={{ color: '#f59e0b' }}>*ptr</span> = {pointerTarget === 'x' ? valX : pointerTarget === 'y' ? valY : '/* CRASH: Segfault */'};
            </div>
          </div>
        )}

        {mode === 'arrays' && (
          <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {[10, 25, 50, 99].map((val, idx) => {
                const addr = baseAddr + idx * 4;
                const isSelected = arrayIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setArrayIndex(idx)}
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                      border: `2px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                      arr[{idx}]
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc' }}>{val}</div>
                    <div style={{ fontSize: '0.72rem', color: isSelected ? '#38bdf8' : '#64748b', fontFamily: 'monospace', marginTop: '0.4rem' }}>
                      0x{addr.toString(16)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                background: 'rgba(8, 13, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: '#e2e8f0',
              }}
            >
              <span style={{ color: '#4ade80' }}>// Array-Pointer Duality Invariant:</span> <br />
              arr[{arrayIndex}] &equiv; *(arr + {arrayIndex}) <br />
              <span style={{ color: '#94a3b8' }}>Physical Address:</span> 0x{baseAddr.toString(16)} + ({arrayIndex} &times; 4 bytes) = <span style={{ color: '#38bdf8' }}>0x{(baseAddr + arrayIndex * 4).toString(16)}</span>
            </div>
          </div>
        )}

        {mode === 'stack' && (
          <div style={{ width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center' }}>
              &uarr; Lower Addresses (Stack Top) &uarr;
            </div>

            {/* Frame 2: calc_hypotenuse */}
            <div
              style={{
                background: 'rgba(56, 189, 248, 0.14)',
                border: '2px solid #38bdf8',
                borderRadius: '14px',
                padding: '1.1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
                <span>Stack Frame: calc_hypotenuse(3.0, 4.0)</span>
                <span style={{ fontFamily: 'monospace' }}>[RBP: 0x7ffe50]</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                &bull; double a = 3.0 (8 bytes) <br />
                &bull; double b = 4.0 (8 bytes) <br />
                &bull; double result = 5.0 (8 bytes) <br />
                &bull; Return Address to main() &rarr; 0x4011d8
              </div>
            </div>

            {/* Frame 1: main */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '1.1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                <span>Stack Frame: main(argc, argv)</span>
                <span style={{ fontFamily: 'monospace' }}>[RBP: 0x7ffe90]</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6 }}>
                &bull; int argc = 1, char **argv <br />
                &bull; Return to OS startup runtime (_start)
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center' }}>
              &darr; Higher Addresses (Stack Bottom) &darr;
            </div>
          </div>
        )}

        {mode === 'heap' && (
          <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {heapBlocks.map((block) => (
                <div
                  key={block.id}
                  style={{
                    background: block.active ? 'rgba(74, 222, 128, 0.14)' : 'rgba(244, 63, 94, 0.12)',
                    border: `2px dashed ${block.active ? '#4ade80' : '#f43f5e'}`,
                    borderRadius: '14px',
                    padding: '1rem',
                    minWidth: '180px',
                    flex: 1,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>{block.tag}</span>
                    <span style={{ fontFamily: 'monospace' }}>{block.addr}</span>
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: block.active ? '#4ade80' : '#f43f5e', margin: '0.4rem 0' }}>
                    {block.size} bytes
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                    {block.active ? 'Allocated (malloc)' : 'Freed (Dangling hazard)'}
                  </div>
                  {block.active && (
                    <button
                      type="button"
                      onClick={() => handleFreeBlock(block.id)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: 'rgba(244, 63, 94, 0.25)',
                        border: '1px solid #f43f5e',
                        color: '#fca5a5',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      free(ptr)
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddBlock}
              style={{
                alignSelf: 'flex-start',
                padding: '0.5rem 1rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid #38bdf8',
                color: '#38bdf8',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              + malloc(24) New Heap Block
            </button>
          </div>
        )}
      </div>

      {/* Interactive Controls Panel */}
      <div className="viz-controls-panel">
        {mode === 'pointers' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Set Pointer Target:</span>
            <button
              type="button"
              className={`viz-btn ${pointerTarget === 'x' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
              onClick={() => setPointerTarget('x')}
            >
              ptr = &x
            </button>
            <button
              type="button"
              className={`viz-btn ${pointerTarget === 'y' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
              onClick={() => setPointerTarget('y')}
            >
              ptr = &y
            </button>
            <button
              type="button"
              className={`viz-btn ${pointerTarget === 'null' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
              onClick={() => setPointerTarget('null')}
            >
              ptr = NULL (Null Pointer)
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto', alignItems: 'center' }}>
              <button
                type="button"
                className="viz-btn viz-btn--secondary"
                onClick={() => setValX((v) => v + 1)}
              >
                Increment x ({valX})
              </button>
              <button
                type="button"
                className="viz-btn viz-btn--secondary"
                onClick={() => setValY((v) => v + 10)}
              >
                Add 10 to y ({valY})
              </button>
            </div>
          </div>
        )}

        {mode === 'arrays' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Select Element Index (i):</span>
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                type="button"
                className={`viz-btn ${arrayIndex === idx ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setArrayIndex(idx)}
              >
                i = {idx}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
