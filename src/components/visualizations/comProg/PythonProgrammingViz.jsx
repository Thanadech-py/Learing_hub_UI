import { useState } from 'react';
import '../shared/VizShared.css';
import { MetricBadge, SliderControl } from '../shared/VizControls.jsx';

/**
 * Interactive Python Programming 2D Visualizer
 * Visualizes dynamic reference binding, object identity vs equality,
 * mutable vs immutable types, LEGB scope resolution, and extended slicing.
 */
export default function PythonProgrammingViz() {
  const [mode, setMode] = useState('references'); // 'references' | 'mutability' | 'scope' | 'slicing'
  const [isAlias, setIsAlias] = useState(true); // b = a (alias) vs b = a.copy()
  const [listA, setListA] = useState([10, 20]);
  const [listB, setListB] = useState([10, 20]);
  const [intVal, setIntVal] = useState(42);
  const [sliceStart, setSliceStart] = useState(1);
  const [sliceStop, setSliceStop] = useState(5);
  const [sliceStep, setSliceStep] = useState(1);

  const sampleList = ['P', 'Y', 'T', 'H', 'O', 'N'];

  const handleAppendItem = () => {
    const nextVal = (listA[listA.length - 1] || 0) + 10;
    if (isAlias) {
      const updated = [...listA, nextVal];
      setListA(updated);
      setListB(updated);
    } else {
      setListA([...listA, nextVal]);
    }
  };

  const handleToggleAlias = (alias) => {
    setIsAlias(alias);
    if (alias) {
      setListB(listA);
    } else {
      setListB([...listA]);
    }
  };

  // Compute sliced indices
  const getSliceIndices = () => {
    const indices = [];
    const len = sampleList.length;
    let start = sliceStart < 0 ? Math.max(0, len + sliceStart) : Math.min(sliceStart, len);
    let stop = sliceStop < 0 ? Math.max(0, len + sliceStop) : Math.min(sliceStop, len);
    const step = sliceStep === 0 ? 1 : sliceStep;

    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        indices.push(i);
      }
    } else {
      for (let i = start; i > stop; i += step) {
        indices.push(i);
      }
    }
    return indices;
  };

  const slicedIndices = getSliceIndices();

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Python Object Model & Runtime Lab</h3>
          <span className="viz-header__tag">CPython 3.12+</span>
        </div>

        <div className="viz-mode-tabs" role="tablist">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'references' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('references')}
          >
            🔗 Name Binding & Aliases
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'mutability' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('mutability')}
          >
            🧊 Mutability (int vs list)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'scope' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('scope')}
          >
            🎯 LEGB Scope Resolver
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'slicing' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('slicing')}
          >
            ✂️ Extended Slicing [::]
          </button>
        </div>
      </header>

      {/* Real-time Metrics Bar */}
      <div className="viz-metrics-bar">
        {mode === 'references' && (
          <>
            <MetricBadge
              label="a is b (Identity)"
              value={isAlias ? 'True' : 'False'}
              highlight={isAlias}
            />
            <MetricBadge
              label="a == b (Equality)"
              value="True"
              unit="values equal"
            />
            <MetricBadge
              label="Shared Heap Object id(a)"
              value="1402938840"
              unit="heap id"
            />
          </>
        )}

        {mode === 'mutability' && (
          <>
            <MetricBadge label="int Type" value="Immutable" unit="id changes on +" highlight />
            <MetricBadge label="list Type" value="Mutable" unit="in-place append" />
            <MetricBadge label="Current int value" value={intVal} />
          </>
        )}

        {mode === 'scope' && (
          <>
            <MetricBadge label="Lookup Strategy" value="L → E → G → B" highlight />
            <MetricBadge label="Resolution" value="First Match Wins" unit="O(1) hash" />
          </>
        )}

        {mode === 'slicing' && (
          <>
            <MetricBadge
              label="Slice Expression"
              value={`s[${sliceStart}:${sliceStop}:${sliceStep}]`}
              highlight
            />
            <MetricBadge
              label="Extracted Result"
              value={slicedIndices.map((i) => sampleList[i]).join('') || '""'}
            />
            <MetricBadge
              label="Extracted Length"
              value={slicedIndices.length}
              unit="elements"
            />
          </>
        )}
      </div>

      {/* Visual Canvas Area */}
      <div className="viz-canvas-area" style={{ minHeight: '360px', padding: '1.5rem' }}>
        {mode === 'references' && (
          <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 1fr) auto minmax(260px, 1.4fr)', alignItems: 'center', gap: '1.25rem' }}>
              {/* Namespaces (Identifiers) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Variable Names
                </div>
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.16)',
                    border: '2px solid #38bdf8',
                    borderRadius: '12px',
                    padding: '0.9rem 1.1rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                  }}
                >
                  variable a &rarr;
                </div>
                <div
                  style={{
                    background: isAlias ? 'rgba(56, 189, 248, 0.16)' : 'rgba(167, 139, 250, 0.16)',
                    border: `2px solid ${isAlias ? '#38bdf8' : '#a78bfa'}`,
                    borderRadius: '12px',
                    padding: '0.9rem 1.1rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                  }}
                >
                  variable b &rarr;
                </div>
              </div>

              {/* Connecting arrows indicator */}
              <div style={{ color: '#38bdf8', fontSize: '1.8rem', fontWeight: 800 }}>
                &rArr;
              </div>

              {/* Heap Objects */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Heap Memory Objects
                </div>
                {isAlias ? (
                  <div
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '2px solid #38bdf8',
                      borderRadius: '14px',
                      padding: '1.2rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8' }}>
                      <span>list object</span>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>id: 1402938840 (refcount: 2)</span>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: '0.4rem 0' }}>
                      [{listA.join(', ')}]
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                      Both names &lsquo;a&rsquo; and &lsquo;b&rsquo; bind to this exact same instance!
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        background: 'rgba(56, 189, 248, 0.12)',
                        border: '2px solid #38bdf8',
                        borderRadius: '14px',
                        padding: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                        <span>list object (a)</span>
                        <span style={{ fontFamily: 'monospace' }}>id: 1402938840</span>
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                        [{listA.join(', ')}]
                      </div>
                    </div>
                    <div
                      style={{
                        background: 'rgba(167, 139, 250, 0.12)',
                        border: '2px solid #a78bfa',
                        borderRadius: '14px',
                        padding: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                        <span>list object (b)</span>
                        <span style={{ fontFamily: 'monospace' }}>id: 1402939920</span>
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                        [{listB.join(', ')}]
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Python code output */}
            <div
              style={{
                background: 'rgba(8, 13, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.88rem',
                color: '#e2e8f0',
              }}
            >
              a = [{listA.slice(0, 2).join(', ')}] <br />
              {isAlias ? 'b = a  # Creates an alias reference' : 'b = a.copy()  # Creates a distinct shallow copy'} <br />
              b.append(...) &rarr; a is [{listA.join(', ')}]
            </div>
          </div>
        )}

        {mode === 'mutability' && (
          <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Immutable int */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase' }}>
                  Immutable: int
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', margin: '0.5rem 0' }}>
                  x = {intVal}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Modifying x += 1 does NOT change value in-place! It destroys the binding and points x to a newly allocated integer object on the heap.
                </div>
                <button
                  type="button"
                  className="viz-btn viz-btn--secondary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => setIntVal((v) => v + 1)}
                >
                  Execute: x += 1
                </button>
              </div>

              {/* Mutable list */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase' }}>
                  Mutable: list
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: '0.5rem 0' }}>
                  [{listA.join(', ')}]
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  Calling list.append() mutates the existing heap buffer in-place without changing the list&rsquo;s physical object id.
                </div>
                <button
                  type="button"
                  className="viz-btn viz-btn--primary"
                  style={{ marginTop: '1rem' }}
                  onClick={handleAppendItem}
                >
                  Execute: list.append()
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === 'scope' && (
          <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.84rem', color: '#94a3b8', textAlign: 'center', marginBottom: '0.25rem' }}>
              Python LEGB Scope Lookup Order (Narrowest &rarr; Broadest)
            </div>

            {[
              { level: '1. Local (L)', desc: 'Inside current function (e.g. x defined inside inner())', active: true, color: '#38bdf8' },
              { level: '2. Enclosing (E)', desc: 'Nested enclosing functions (closures / nonlocal x)', active: false, color: '#a78bfa' },
              { level: '3. Global (G)', desc: 'Module-level variables declared at top of file (global x)', active: false, color: '#facc15' },
              { level: '4. Built-in (B)', desc: 'Python built-ins (len, range, print, Exception)', active: false, color: '#4ade80' },
            ].map((scope, idx) => (
              <div
                key={idx}
                style={{
                  background: scope.active ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                  border: `2px solid ${scope.active ? scope.color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: scope.color, fontSize: '0.94rem' }}>{scope.level}</div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}>{scope.desc}</div>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    background: scope.active ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: scope.active ? '#38bdf8' : '#94a3b8',
                  }}
                >
                  {scope.active ? 'Checked 1st' : `Priority ${idx + 1}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {mode === 'slicing' && (
          <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
              {sampleList.map((char, idx) => {
                const isSelected = slicedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    style={{
                      background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                      border: `2px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      padding: '0.9rem',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>[{idx}]</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isSelected ? '#38bdf8' : '#f8fafc' }}>
                      &lsquo;{char}&rsquo;
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>[{idx - sampleList.length}]</div>
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
              s = &quot;PYTHON&quot; <br />
              <span style={{ color: '#38bdf8' }}>s[{sliceStart}:{sliceStop}:{sliceStep}]</span> &rarr; &quot;{slicedIndices.map((i) => sampleList[i]).join('')}&quot;
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Panel */}
      <div className="viz-controls-panel">
        {mode === 'references' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Assignment Mode:</span>
            <button
              type="button"
              className={`viz-btn ${isAlias ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
              onClick={() => handleToggleAlias(true)}
            >
              b = a (Same Reference Alias)
            </button>
            <button
              type="button"
              className={`viz-btn ${!isAlias ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
              onClick={() => handleToggleAlias(false)}
            >
              b = a.copy() (Independent Copy)
            </button>

            <button
              type="button"
              className="viz-btn viz-btn--secondary"
              style={{ marginLeft: 'auto' }}
              onClick={handleAppendItem}
            >
              Append to b (+10)
            </button>
          </div>
        )}

        {mode === 'slicing' && (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Slice Start index"
              value={sliceStart}
              min={0}
              max={5}
              step={1}
              onChange={setSliceStart}
            />
            <SliderControl
              label="Slice Stop index"
              value={sliceStop}
              min={0}
              max={6}
              step={1}
              onChange={setSliceStop}
            />
            <SliderControl
              label="Slice Step (Stride)"
              value={sliceStep}
              min={1}
              max={3}
              step={1}
              onChange={setSliceStep}
            />
          </div>
        )}
      </div>
    </div>
  );
}
