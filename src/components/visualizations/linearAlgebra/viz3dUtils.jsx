import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Right-handed 3D coordinate system with Z-up (X × Y = Z), matching
 * standard Linear Algebra 3D visualizations (e.g. edu.gradual-lab.dev).
 */
export const CAMERA_PRESETS = {
  Isometric: { rx: 0.62, ry: 0.78, zoom: 1.0 },
  'Top (XY)': { rx: Math.PI / 2 - 0.01, ry: 0, zoom: 1.05 },
  'Front (XZ)': { rx: 0.05, ry: 0, zoom: 1.05 },
  'Side (YZ)': { rx: 0.05, ry: Math.PI / 2, zoom: 1.05 },
};

/**
 * Compute orthonormal right, up, depth basis vectors for a 3D camera
 * given pitch `rx` (elevation above XY plane) and yaw `ry` (azimuth around Z axis).
 */
export function getCameraBasis(rx, ry) {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);

  // Right vector in XY plane
  const R = [-sinY, cosY, 0];
  // Screen-up vector (tilted toward +Z)
  const U = [-cosY * sinX, -sinY * sinX, cosX];
  // Forward depth vector (from origin toward viewer)
  const D = [cosY * cosX, sinY * cosX, sinX];

  return { R, U, D };
}

/**
 * Project a 3D world point [x, y, z] to 2D canvas coordinates { x, y, depth, scale }.
 */
export function project3D(pt, camera, width, height, baseScale = 44, centerOffset = { x: 0, y: 12 }) {
  // Gracefully handle both project3D([x, y, z], camera, width, height) and project3D(x, y, z, camera, width, height)
  let point = pt;
  let cam = camera;
  let w = width;
  let h = height;
  let bScale = baseScale;
  let cOffset = centerOffset;

  if (typeof pt === 'number' && typeof camera === 'number' && typeof width === 'number') {
    point = [pt, camera, width];
    cam = height;
    w = baseScale;
    h = centerOffset;
    bScale = typeof arguments[6] === 'number' ? arguments[6] : 44;
    cOffset = arguments[7] && typeof arguments[7] === 'object' ? arguments[7] : { x: 0, y: 12 };
  }

  if (!cam) return { x: 0, y: 0, depth: 0, scale: bScale };

  const { R, U, D } = getCameraBasis(cam.rx || 0, cam.ry || 0);
  const scale = bScale * (cam.zoom || 1);
  const cx = (w || 0) / 2 + (cOffset?.x || 0);
  const cy = (h || 0) / 2 + (cOffset?.y || 0);

  const px = (point[0] || 0) * R[0] + (point[1] || 0) * R[1] + (point[2] || 0) * R[2];
  const py = (point[0] || 0) * U[0] + (point[1] || 0) * U[1] + (point[2] || 0) * U[2];
  const depth = (point[0] || 0) * D[0] + (point[1] || 0) * D[1] + (point[2] || 0) * D[2];

  return {
    x: cx + px * scale,
    y: cy - py * scale,
    depth,
    scale,
  };
}

/**
 * Convert a 2D screen pointer delta (dx, dy in canvas pixels) into a 3D world delta.
 * - Normal drag: moves in the XY ground plane (or screen-aligned plane if zFixed is false)
 * - Shift + drag: moves purely along the vertical Z axis!
 */
export function unprojectDelta3D(dx, dy, camera, baseScale = 44, shiftKey = false, mode = 'screen') {
  const { R, U } = getCameraBasis(camera.rx, camera.ry);
  const scale = baseScale * (camera.zoom || 1);
  const ux = dx / scale;
  const uy = -dy / scale; // canvas y is inverted

  if (shiftKey) {
    // Pure vertical Z-axis adjustment
    const zSensitivity = Math.max(0.35, Math.abs(U[2]));
    return [0, 0, uy / zSensitivity];
  }

  if (mode === 'xy') {
    // Move strictly in the XY plane while preserving Z
    const det = R[0] * U[1] - R[1] * U[0];
    if (Math.abs(det) > 0.12) {
      const dX = (ux * U[1] - uy * R[1]) / det;
      const dY = (-ux * U[0] + uy * R[0]) / det;
      return [dX, dY, 0];
    }
  }

  // Default screen-parallel 3D plane movement: natural in any 3D view (Isometric, Top, Front, Side)
  return [
    ux * R[0] + uy * U[0],
    ux * R[1] + uy * U[1],
    ux * R[2] + uy * U[2],
  ];
}

/**
 * Draw the XY reference floor grid and optional ambient cube wireframe.
 */
export function draw3DGrid(ctx, camera, width, height, options = {}) {
  const {
    range = 4,
    baseScale = 44,
    centerOffset = { x: 0, y: 12 },
    showCube = true,
    cubeRange = 3,
  } = options;

  const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);

  // Subtle radial backdrop glow
  const cx = width / 2 + centerOffset.x;
  const cy = height / 2 + centerOffset.y;
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.55);
  grad.addColorStop(0, 'rgba(30, 58, 138, 0.14)');
  grad.addColorStop(1, 'rgba(8, 13, 26, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // XY Ground Floor Grid (z = 0)
  ctx.lineWidth = 1;
  for (let i = -range; i <= range; i++) {
    const isMajor = i === 0;
    ctx.strokeStyle = isMajor ? 'rgba(148, 163, 184, 0.28)' : 'rgba(51, 65, 85, 0.45)';
    const p1 = proj([i, -range, 0]);
    const p2 = proj([i, range, 0]);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    const q1 = proj([-range, i, 0]);
    const q2 = proj([range, i, 0]);
    ctx.beginPath();
    ctx.moveTo(q1.x, q1.y);
    ctx.lineTo(q2.x, q2.y);
    ctx.stroke();
  }

  // Optional ambient 3D reference cube wireframe
  if (showCube) {
    const r = cubeRange;
    const corners = [
      [-r, -r, -r], [r, -r, -r], [r, r, -r], [-r, r, -r],
      [-r, -r, r], [r, -r, r], [r, r, r], [-r, r, r],
    ].map(proj);
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(corners[a].x, corners[a].y);
      ctx.lineTo(corners[b].x, corners[b].y);
    }
    ctx.stroke();
  }
}

/**
 * Draw X (red), Y (green), and Z (blue) coordinate axes in 3D.
 */
export function draw3DAxes(ctx, camera, width, height, options = {}) {
  const {
    range = 4.2,
    baseScale = 44,
    centerOffset = { x: 0, y: 12 },
  } = options;

  const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);
  const axes = [
    { dir: [1, 0, 0], color: '#f87171', negColor: 'rgba(248, 113, 113, 0.28)', label: 'X' },
    { dir: [0, 1, 0], color: '#4ade80', negColor: 'rgba(74, 222, 128, 0.28)', label: 'Y' },
    { dir: [0, 0, 1], color: '#60a5fa', negColor: 'rgba(96, 165, 250, 0.28)', label: 'Z' },
  ];

  const o = proj([0, 0, 0]);

  for (const ax of axes) {
    const neg = proj([-ax.dir[0] * range, -ax.dir[1] * range, -ax.dir[2] * range]);
    const pos = proj([ax.dir[0] * range, ax.dir[1] * range, ax.dir[2] * range]);

    // Negative half-axis (dashed)
    ctx.strokeStyle = ax.negColor;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(neg.x, neg.y);
    ctx.lineTo(o.x, o.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Positive half-axis
    ctx.strokeStyle = ax.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    // Axis label
    ctx.fillStyle = ax.color;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(ax.label, pos.x + 5, pos.y - 4);
  }
}

/**
 * Draw the top-right 3D Orientation Gizmo (X red, Y green, Z blue).
 */
export function drawOrientationGizmo(ctx, camera, width, options = {}) {
  const gx = options.x ?? width - 48;
  const gy = options.y ?? 48;
  const len = options.radius ?? 26;

  // Backdrop circle
  ctx.save();
  ctx.fillStyle = 'rgba(11, 16, 32, 0.8)';
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(gx, gy, len + 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const { R, U, D } = getCameraBasis(camera.rx, camera.ry);
  const dirs = [
    { v: [1, 0, 0], color: '#f87171', label: 'X' },
    { v: [0, 1, 0], color: '#4ade80', label: 'Y' },
    { v: [0, 0, 1], color: '#60a5fa', label: 'Z' },
  ].map((d) => {
    const px = d.v[0] * R[0] + d.v[1] * R[1] + d.v[2] * R[2];
    const py = d.v[0] * U[0] + d.v[1] * U[1] + d.v[2] * U[2];
    const depth = d.v[0] * D[0] + d.v[1] * D[1] + d.v[2] * D[2];
    return { ...d, x: gx + px * len, y: gy - py * len, depth };
  });

  // Sort back-to-front by depth
  dirs.sort((a, b) => a.depth - b.depth);

  for (const d of dirs) {
    ctx.strokeStyle = d.color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(d.x, d.y);
    ctx.stroke();

    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#080d1a';
    ctx.font = 'bold 8px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.label, d.x, d.y);
  }
  ctx.restore();
}

/**
 * Draw a 3D vector with optional floor drop-line stalk, ground shadow, arrowhead, and draggable tip handle.
 * Returns the projected tip screen coordinates { x, y } so callers can register hit targets.
 */
export function draw3DVector(ctx, camera, width, height, vec, options = {}) {
  const {
    from = [0, 0, 0],
    color = '#38bdf8',
    label = '',
    lineWidth = 3,
    dashed = false,
    showDropStalk = true,
    draggable = false,
    isHovered = false,
    isDragging = false,
    baseScale = 44,
    centerOffset = { x: 0, y: 12 },
  } = options;

  const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);
  const pFrom = proj(from);
  const pTo = proj(vec);

  ctx.save();

  // Floor drop-line stalk from (vx, vy, vz) to (vx, vy, 0) + XY shadow from origin
  if (showDropStalk && (Math.abs(vec[2]) > 0.04 || draggable)) {
    const pFloor = proj([vec[0], vec[1], 0]);
    const pOriginFloor = proj([from[0], from[1], 0]);

    // Ground shadow ray on XY plane
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(pOriginFloor.x, pOriginFloor.y);
    ctx.lineTo(pFloor.x, pFloor.y);
    ctx.stroke();

    // Vertical drop-stalk
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.42;
    ctx.lineWidth = 1.3;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(pFloor.x, pFloor.y);
    ctx.lineTo(pTo.x, pTo.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Floor shadow dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pFloor.x, pFloor.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Main vector shaft
  ctx.strokeStyle = color;
  ctx.lineWidth = isDragging || isHovered ? lineWidth + 1 : lineWidth;
  if (dashed) ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(pFrom.x, pFrom.y);
  ctx.lineTo(pTo.x, pTo.y);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead
  const dx = pTo.x - pFrom.x;
  const dy = pTo.y - pFrom.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 4) {
    const angle = Math.atan2(dy, dx);
    const headLen = 10.5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(pTo.x, pTo.y);
    ctx.lineTo(pTo.x - headLen * Math.cos(angle - Math.PI / 6), pTo.y - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(pTo.x - headLen * Math.cos(angle + Math.PI / 6), pTo.y - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  // Interactive draggable handle ring at tip
  if (draggable) {
    ctx.beginPath();
    ctx.arc(pTo.x, pTo.y, isDragging ? 9 : isHovered ? 8 : 6.5, 0, Math.PI * 2);
    ctx.fillStyle = isDragging ? 'rgba(255, 255, 255, 0.32)' : 'rgba(255, 255, 255, 0.14)';
    ctx.fill();
    ctx.lineWidth = isDragging || isHovered ? 2.2 : 1.5;
    ctx.strokeStyle = isDragging ? '#ffffff' : color;
    ctx.stroke();
  }

  // Label badge
  if (label) {
    ctx.font = 'bold 12px system-ui, sans-serif';
    const textW = ctx.measureText(label).width;
    const lx = pTo.x + 10;
    const ly = pTo.y - 8;
    ctx.fillStyle = 'rgba(8, 13, 26, 0.78)';
    ctx.fillRect(lx - 3, ly - 11, textW + 6, 15);
    ctx.fillStyle = color;
    ctx.fillText(label, lx, ly);
  }

  ctx.restore();
  return pTo;
}

/**
 * Draw a translucent 3D plane spanned by two basis vectors u and v around `origin`.
 */
export function draw3DPlane(ctx, camera, width, height, u, v, options = {}) {
  const {
    origin = [0, 0, 0],
    extent = 2.4,
    steps = 4,
    fillColor = 'rgba(56, 189, 248, 0.13)',
    strokeColor = 'rgba(56, 189, 248, 0.35)',
    gridColor = 'rgba(56, 189, 248, 0.16)',
    baseScale = 44,
    centerOffset = { x: 0, y: 12 },
  } = options;

  // Normalize u and v so plane visual size is consistent
  const lenU = Math.hypot(u[0], u[1], u[2]);
  const lenV = Math.hypot(v[0], v[1], v[2]);
  if (lenU < 1e-4 || lenV < 1e-4) return;
  const e1 = [u[0] / lenU, u[1] / lenU, u[2] / lenU];
  // Orthogonalize e2 against e1 for clean rectangular patch
  const dot = v[0] * e1[0] + v[1] * e1[1] + v[2] * e1[2];
  const o2 = [v[0] - dot * e1[0], v[1] - dot * e1[1], v[2] - dot * e1[2]];
  const lenO2 = Math.hypot(o2[0], o2[1], o2[2]);
  if (lenO2 < 1e-3) return;
  const e2 = [o2[0] / lenO2, o2[1] / lenO2, o2[2] / lenO2];

  const ptAt = (s, t) => [
    origin[0] + s * e1[0] + t * e2[0],
    origin[1] + s * e1[1] + t * e2[1],
    origin[2] + s * e1[2] + t * e2[2],
  ];
  const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);

  const c1 = proj(ptAt(-extent, -extent));
  const c2 = proj(ptAt(extent, -extent));
  const c3 = proj(ptAt(extent, extent));
  const c4 = proj(ptAt(-extent, extent));

  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(c1.x, c1.y);
  ctx.lineTo(c2.x, c2.y);
  ctx.lineTo(c3.x, c3.y);
  ctx.lineTo(c4.x, c4.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Internal grid lines on the plane
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -steps + 1; i < steps; i++) {
    const val = (i / steps) * extent;
    const a1 = proj(ptAt(val, -extent));
    const a2 = proj(ptAt(val, extent));
    ctx.moveTo(a1.x, a1.y);
    ctx.lineTo(a2.x, a2.y);

    const b1 = proj(ptAt(-extent, val));
    const b2 = proj(ptAt(extent, val));
    ctx.moveTo(b1.x, b1.y);
    ctx.lineTo(b2.x, b2.y);
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Draw a 3D parallelepiped spanned by three 3D vectors v1, v2, v3 from origin.
 */
export function draw3DParallelepiped(ctx, camera, width, height, v1, v2, v3, options = {}) {
  const {
    origin = [0, 0, 0],
    fillColor = 'rgba(56, 189, 248, 0.14)',
    strokeColor = 'rgba(56, 189, 248, 0.55)',
    dashed = false,
    baseScale = 44,
    centerOffset = { x: 0, y: 12 },
  } = options;

  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const p000 = origin;
  const p100 = add(origin, v1);
  const p010 = add(origin, v2);
  const p001 = add(origin, v3);
  const p110 = add(p100, v2);
  const p101 = add(p100, v3);
  const p011 = add(p010, v3);
  const p111 = add(p110, v3);

  const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);
  const verts = [p000, p100, p110, p010, p001, p101, p111, p011].map(proj);

  const faces = [
    [0, 1, 2, 3], // bottom
    [4, 5, 6, 7], // top
    [0, 1, 5, 4], // front
    [2, 3, 7, 6], // back
    [1, 2, 6, 5], // right
    [0, 3, 7, 4], // left
  ].map((idx) => ({
    idx,
    depth: (verts[idx[0]].depth + verts[idx[1]].depth + verts[idx[2]].depth + verts[idx[3]].depth) / 4,
  }));

  // Painter's algorithm: back to front
  faces.sort((a, b) => a.depth - b.depth);

  ctx.save();
  if (dashed) ctx.setLineDash([4, 4]);
  for (const f of faces) {
    const [a, b, c, d] = f.idx.map((i) => verts[i]);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Custom React Hook for interactive 3D Isometric Canvas:
 * - Supports camera presets (`Isometric`, `Top (XY)`, `Front (XZ)`, `Side (YZ)`)
 * - Allows directly dragging 3D vector arrowheads on the canvas (`handlesRef.current`)
 * - Orbits the 3D camera when dragging empty background space
 * - Zooms with the mouse wheel
 */
export function useIsometric3D(initialPreset = 'Isometric', options = {}) {
  const baseScale = options.baseScale ?? 44;
  const centerOffset = options.centerOffset ?? { x: 0, y: 12 };
  const snapStep = options.snap ?? 0.1;
  const clampRange = options.clampRange ?? 5;

  const [camera, setCamera] = useState(() => ({
    ...(CAMERA_PRESETS[initialPreset] || CAMERA_PRESETS.Isometric),
    activePreset: initialPreset,
  }));
  const [activeHandleId, setActiveHandleId] = useState(null);
  const [hoveredHandleId, setHoveredHandleId] = useState(null);

  const canvasRef = useRef(null);
  // Each frame, the component populates handlesRef.current = [{ id, vec: [x,y,z], screen: {x,y}, onChange: ([nx,ny,nz]) => ... }]
  const handlesRef = useRef([]);
  const dragStateRef = useRef(null);
  const cameraRef = useRef(camera);
  cameraRef.current = camera;

  const setPreset = useCallback((name) => {
    const preset = CAMERA_PRESETS[name] || CAMERA_PRESETS.Isometric;
    setCamera({ ...preset, activePreset: name });
  }, []);

  useEffect(() => {
    const onDimChange = (e) => {
      if (e.detail === '2d') {
        setPreset('Top (XY)');
      } else if (e.detail === '3d') {
        setPreset('Isometric');
      }
    };
    window.addEventListener('viz-dimension-change', onDimChange);
    return () => window.removeEventListener('viz-dimension-change', onDimChange);
  }, [setPreset]);

  const getCanvasPoint = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      scaleX,
      scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const findNearestHandle = (pt, maxRadius = 16) => {
      let best = null;
      let bestDist = maxRadius;
      for (const h of handlesRef.current) {
        if (!h.screen) continue;
        const d = Math.hypot(pt.x - h.screen.x, pt.y - h.screen.y);
        if (d <= bestDist) {
          bestDist = d;
          best = h;
        }
      }
      return best;
    };

    const onPointerDown = (e) => {
      const pt = getCanvasPoint(e, canvas);
      const hit = findNearestHandle(pt, 18);

      if (hit) {
        // Grabbed a 3D vector tip!
        dragStateRef.current = {
          mode: 'vector',
          id: hit.id,
          lastX: pt.x,
          lastY: pt.y,
          vec: [...hit.vec],
          onChange: hit.onChange,
          dragMode: hit.dragMode || 'screen',
        };
        setActiveHandleId(hit.id);
      } else {
        // Orbit camera
        dragStateRef.current = {
          mode: 'orbit',
          lastX: pt.x,
          lastY: pt.y,
        };
      }
      if (canvas.setPointerCapture && e.pointerId !== undefined) {
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    const onPointerMove = (e) => {
      const pt = getCanvasPoint(e, canvas);
      const drag = dragStateRef.current;

      if (!drag) {
        const hit = findNearestHandle(pt, 16);
        setHoveredHandleId(hit ? hit.id : null);
        canvas.style.cursor = hit ? 'grab' : 'move';
        return;
      }

      const dx = pt.x - drag.lastX;
      const dy = pt.y - drag.lastY;
      drag.lastX = pt.x;
      drag.lastY = pt.y;

      if (drag.mode === 'vector') {
        canvas.style.cursor = 'grabbing';
        // keep latest callback from handlesRef if available
        const liveHandle = handlesRef.current.find((h) => h.id === drag.id);
        const onChange = liveHandle?.onChange || drag.onChange;

        if (liveHandle?.customDrag) {
          liveHandle.customDrag(pt, dx, dy, e);
          return;
        }

        const delta3D = unprojectDelta3D(
          dx,
          dy,
          cameraRef.current,
          baseScale,
          e.shiftKey,
          drag.dragMode
        );
        const next = [
          Math.max(-clampRange, Math.min(clampRange, drag.vec[0] + delta3D[0])),
          Math.max(-clampRange, Math.min(clampRange, drag.vec[1] + delta3D[1])),
          Math.max(-clampRange, Math.min(clampRange, drag.vec[2] + delta3D[2])),
        ];
        drag.vec = next;
        const snapped = next.map((v) => Math.round(v / snapStep) * snapStep);
        if (onChange) onChange(snapped);
      } else if (drag.mode === 'orbit') {
        canvas.style.cursor = 'grabbing';
        setCamera((prev) => ({
          ...prev,
          ry: prev.ry - dx * 0.0085,
          rx: Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, prev.rx + dy * 0.0085)),
          activePreset: null,
        }));
      }
    };

    const onPointerUp = (e) => {
      if (dragStateRef.current) {
        dragStateRef.current = null;
        setActiveHandleId(null);
      }
      if (canvas.releasePointerCapture && e.pointerId !== undefined) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      setCamera((prev) => ({
        ...prev,
        zoom: Math.max(0.55, Math.min(2.2, (prev.zoom || 1) * factor)),
      }));
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [baseScale, clampRange, snapStep]);

  return {
    canvasRef,
    camera,
    setCamera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  };
}

/**
 * Reusable 3D View Toolbar + Interactive Drag Hint Overlay for Linear Algebra Canvases.
 */
export function IsometricToolbar({ camera, setPreset, extraButtons, hintText }) {
  return (
    <>
      <div className="viz-3d-toolbar">
        <span className="viz-3d-toolbar__label">3D View:</span>
        {Object.keys(CAMERA_PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={`viz-3d-btn ${camera.activePreset === name ? 'viz-3d-btn--active' : ''}`}
            onClick={() => setPreset(name)}
          >
            {name}
          </button>
        ))}
        {extraButtons}
      </div>
      <div className="viz-3d-hud-bottom">
        <div className="viz-3d-badge">
          <span aria-hidden="true">🎯</span>
          <span>
            {hintText || 'Drag vector arrowheads to move lines in 3D (hold Shift for Z height) • Drag background to orbit • Scroll to zoom'}
          </span>
        </div>
      </div>
    </>
  );
}
