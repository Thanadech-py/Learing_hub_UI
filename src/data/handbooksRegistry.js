/**
 * Official Handbooks Registry (Bilingual Edition Support: TH & EN)
 *
 * Connected to Google Drive Repository:
 * https://drive.google.com/drive/folders/1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl
 *
 * Supports:
 * 1. Instant direct-to-device downloads via Google Drive uc?export=download endpoint (no new tab redirection).
 * 2. Browser PDF preview via Google Drive file/d/<ID>/view endpoint.
 * 3. Dynamic folder & file synchronization via src/services/googleDriveSync.js.
 */

export const GOOGLE_DRIVE_ROOT_FOLDER_ID = '1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl';
export const GOOGLE_DRIVE_ROOT_URL = `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_ROOT_FOLDER_ID}`;

export const GOOGLE_DRIVE_SUBJECT_FOLDERS = {
  physics: {
    id: '1jlt2q_-LUGpR0Oe13o0OGzPZMNi-HP0V',
    en: '1Yyv2P6TT52VRbq38R5oRGBQOqd5_UtfE',
    th: '12lO0uAii2oEugo8tJHseDk6lf_Asq190',
  },
  'linear-algebra': {
    id: '1YOhKrSJoVAMz055t654jSycwui4pwjoD',
    en: '11Z8PxMUAavBPNwnrlGn5DRPIfh4G8iOA',
    th: '10e0-bvnNwTK4VimbhXePkgOVMNc97PGj',
  },
  'com-prog': {
    id: '1ruWsJYblw43yz6ae2_0BNUMxXMiCcB8q',
    en: '12cTzDw-6o0nXG6_WQo03Z1ag9XZxkvs4',
    th: '1br6vhLtnZc7yAaTuowf1n3ZUYMe2s_xy',
  },
};

/**
 * Canonical mapping of relative handbook paths to their Google Drive File IDs.
 * Used as the built-in baseline and enriched dynamically when new files/folders are added on Drive.
 */
export const GOOGLE_DRIVE_FILE_MAP = {
  // Physics (EN)
  '/handbooks/physics/en/Physics - 01 Kinematics & 2D Motion.pdf': '1k94-2yqVwkBTCCMPnRAkop4SR936-5ob',
  "/handbooks/physics/en/Physics - 02 Newton's Laws & Dynamics.pdf": '1lkwSX7MKu8KP96q2ntnLp1TzzX-pUcFy',
  '/handbooks/physics/en/Physics - 03 Work, Energy & Momentum.pdf': '1OYXhMzkq0HxsDPhqrYSY6Ot3ZD85kdz2',
  '/handbooks/physics/en/Physics - 04 Rotational Dynamics & Angular Momentum.pdf': '1Td7OgBGb9f0QUkXs2V19m4jtVZrV1099',
  '/handbooks/physics/en/Physics - 05 Elasticity & Modulus of Materials.pdf': '1W5w6g2VzyZlYLhfQuD1NHdxyc1bLAOku',
  '/handbooks/physics/en/Physics - 06 Fluid Mechanics.pdf': '1DT18N4U5D2fU8VMB9sE9PbdUI7HoeY2v',
  '/handbooks/physics/en/Physics - 07 Oscillations & Simple Harmonic Motion.pdf': '1R_2_zBLEbrOW-cXpu-9fs7vKy2_tLbmF',
  '/handbooks/physics/en/Physics - 08 Waves & Sound.pdf': '1XpsHiGQ53nTG-0lqW8CM7Qh3q26O5fP3',
  '/handbooks/physics/en/Physics - 09 Thermodynamics & Heat Transfer.pdf': '1h4mYJIhy7leDS5DQg6HCu_ebYyrNrWdH',
  '/handbooks/physics/en/Physics - Comprehensive Master Formula Sheet & Constants.pdf': '1W9KigGGzKz40GB9WSeQtlLfExGxLmYeK',

  // Physics (TH)
  '/handbooks/physics/th/Physics - 01 Kinematics & 2D Motion.pdf': '1WnkYKQdmaPKRd6VQ6nNr0WkcUp0kVE3f',
  "/handbooks/physics/th/Physics - 02 Newton's Laws & Dynamics.pdf": '1wLqMAs7uA4c1icBzkZJjDvc34wz8BUJX',
  '/handbooks/physics/th/Physics - 03 Work, Energy & Momentum.pdf': '1spqGrx6eJWIQQZi6j4-am3SzcLIDlbdv',
  '/handbooks/physics/th/Physics - 04 Rotational Dynamics & Angular Momentum.pdf': '19nisgj2A9suTz9jmFjtkrdEeFViwMxDj',
  '/handbooks/physics/th/Physics - 05 Elasticity & Modulus of Materials.pdf': '1UUN_IW1mU0S4YE08MaWbTuhzwAacT0na',
  '/handbooks/physics/th/Physics - 06 Fluid Mechanics.pdf': '1FEGZOddEOk3pNVR9qApGDffu4U6B-lRx',
  '/handbooks/physics/th/Physics - 07 Oscillations & Simple Harmonic Motion.pdf': '1cP7PUQhpRR0O-esy-caneSs9ID-y7j8N',
  '/handbooks/physics/th/Physics - 08 Waves & Sound.pdf': '1EWquRHkw4l7tPqbzEWp6UYjw_CXMib9a',
  '/handbooks/physics/th/Physics - 09 Thermodynamics & Heat Transfer.pdf': '11waWXOu0V6Ndub-DaPXmCTbOzcIcZriH',

  // Linear Algebra (EN)
  '/handbooks/linear-algebra/en/Linear-Algebra - 01 Vectors & Linear Combinations.pdf': '1P-AheL4V2BsXKoChS804huevO2lsG0lA',
  '/handbooks/linear-algebra/en/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf': '12knR4-FJnPRf8rZCyjQYo-M_VMTdcoXy',
  '/handbooks/linear-algebra/en/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf': '1CGYtKw8Vaj2HPGZ9MzJ4v2GVJ6MDyD1o',
  "/handbooks/linear-algebra/en/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf": '1NuFUZ73X3Mag3Xhn0zC5Okzs0Wa2YOuk',
  '/handbooks/linear-algebra/en/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf': '1UbPf9hEkbuXjAvzSMGXJfwQs2lBtgj-m',
  '/handbooks/linear-algebra/en/Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf': '1LnB6Eriyfcs_gQ4DdSQDD_i8Jo__sJSx',
  '/handbooks/linear-algebra/en/Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf': '1HO5b-4xSBptOC-_SyxyH9NBWAUXWauov',
  '/handbooks/linear-algebra/en/Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf': '101hYJ_bOBgEPWy3jDMqVc2jw6SOdk4zj',
  '/handbooks/linear-algebra/en/Linear-Algebra - 09 Orthogonality.pdf': '1_Pf7ssQlIYlcADodtBpYZc1gehSH5vxS',
  '/handbooks/linear-algebra/en/Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf': '19M252J4TzYq1j1lyehHF5o2dWvD_-eRf',
  '/handbooks/linear-algebra/en/Linear-Algebra - 10 Eigenvalues.pdf': '1yvI4_wC0jMlkMokQfnTqRAZGqf8MC_Hd',
  '/handbooks/linear-algebra/en/Linear-Algebra - 10.1 Prefinals-Explanation.pdf': '1vlD8ilYQBAG9YN7SGgE4onhQhx0abiIq',

  // Linear Algebra (TH)
  '/handbooks/linear-algebra/th/Linear-Algebra - 01 Vectors & Linear Combinations.pdf': '15TcCIUac41U-NmvctiUYn_FIYhR-ZM0I',
  '/handbooks/linear-algebra/th/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf': '1CzC9Elb73xPDv7TBmOZPTvZevcBY1LTl',
  '/handbooks/linear-algebra/th/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf': '1MshGBkYkl7urSXKY6VPzEFMNVNpAghq2',
  "/handbooks/linear-algebra/th/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf": '1-Uk5bw2OmklBp5O8Wwp3sa4BJ7GpAyqk',
  '/handbooks/linear-algebra/th/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf': '16yibNPTzAYsIx1Nqj7mZNCjTalyA3B5r',
  '/handbooks/linear-algebra/th/Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf': '1fcXcq68LlhgTEr6QfgjXe6BZ3sCJ0yzj',
  '/handbooks/linear-algebra/th/Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf': '1rhSlIVGfM7kEfwYsLkJ45CxJR4ZlEaY3',
  '/handbooks/linear-algebra/th/Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf': '1-FelpHBfhXLWX6Ada8ycuu7NwLHxREk3',
  '/handbooks/linear-algebra/th/Linear-Algebra - 09 Orthogonality.pdf': '1aKuSglgfiOBdyl_2teD-yogWkiG1mm28',
  '/handbooks/linear-algebra/th/Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf': '1zcLldDB_I6RxGkK7k2X4Og1a4g44tfrK',
  '/handbooks/linear-algebra/th/Linear-Algebra - 10 Eigenvalues.pdf': '1t5mW6XwfQc1U0SN2ArEVRQsaB3MuIk--',
  '/handbooks/linear-algebra/th/Linear-Algebra - 10.1 Prefinals-Explanation.pdf': '1it5wc6WTBol9ReX3B7UfkBT8mjLJ0nnF',

  // Computer Programming (EN)
  '/handbooks/com-prog/en/C-Programming-Master-Handbook.pdf': '1sOYU8y24MYbbKvMWdWMYLQgvKK6zjz0G',
  '/handbooks/com-prog/en/Python-Programming-Master-Handbook.pdf': '18b7bbtbNQpJM1pbHon22GldMuZHXRfQj',

  // Computer Programming (TH)
  '/handbooks/com-prog/th/C-Programming-Master-Handbook.pdf': '19Pbyj_bzKW7gX81Y2UBXdd1B_LC0bav6',
  '/handbooks/com-prog/th/Python-Programming-Master-Handbook.pdf': '1gTlUx-f63n8-VDKH6gyjSoBMduK-q_X-',
};

/**
 * Ensures relative path resolution with Vite base URL support.
 */
export function withBase(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Validate that a string is a strictly well-formed Google Drive File/Folder ID.
 * Prevents XSS, parameter injection, and open-redirect attacks.
 */
export function isValidDriveId(id) {
  if (!id || typeof id !== 'string') return false;
  return /^[a-zA-Z0-9_-]{10,64}$/.test(id.trim());
}

/**
 * Extract Google Drive File ID from a raw ID, a Google Drive share URL, or a mapped local handbook path.
 */
export function extractDriveFileId(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (GOOGLE_DRIVE_FILE_MAP[trimmed]) {
    return GOOGLE_DRIVE_FILE_MAP[trimmed];
  }
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && isValidDriveId(fileMatch[1])) return fileMatch[1];
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && isValidDriveId(idMatch[1])) return idMatch[1];
  if (/^[a-zA-Z0-9_-]{18,64}$/.test(trimmed) && !trimmed.includes('/')) {
    return trimmed;
  }
  return null;
}

/**
 * Generate a Google Drive direct-to-device download URL (Content-Disposition: attachment).
 */
export function toDriveDownloadUrl(fileId) {
  if (!isValidDriveId(fileId)) return '';
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId.trim())}`;
}

/**
 * Generate a Google Drive browser preview URL.
 */
export function toDrivePreviewUrl(fileId) {
  if (!isValidDriveId(fileId)) return '';
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId.trim())}/view`;
}

/**
 * Resolve any handbook URL/path/Drive ID into { driveId, downloadUrl, previewUrl, isGoogleDrive }.
 */
export function resolveHandbookUrls(pathOrDriveInput, explicitDriveId = null) {
  const driveId = explicitDriveId || extractDriveFileId(pathOrDriveInput);
  if (driveId) {
    return {
      driveId,
      downloadUrl: toDriveDownloadUrl(driveId),
      previewUrl: toDrivePreviewUrl(driveId),
      isGoogleDrive: true,
    };
  }
  const resolvedLocal = withBase(pathOrDriveInput);
  return {
    driveId: null,
    downloadUrl: resolvedLocal,
    previewUrl: resolvedLocal,
    isGoogleDrive: false,
  };
}

/**
 * Verify that a download URL is safe to load (either same-origin relative path or official Google Drive direct download).
 */
export function isSafeDownloadUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
  return /^https:\/\/drive\.google\.com\/uc\?export=download&id=[a-zA-Z0-9_-]{10,64}$/.test(trimmed);
}

/**
 * Trigger an immediate direct-to-device download without opening a new tab or navigating away.
 * Uses a hidden iframe so Google Drive's Content-Disposition: attachment header downloads seamlessly
 * in the current window context.
 */
export function triggerDirectDownload(event, url) {
  if (!isSafeDownloadUrl(url)) return;
  if (event) {
    // Allow Ctrl/Cmd/Middle-click if user explicitly wants a new tab, otherwise stay on current page
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
      return;
    }
    event.preventDefault();
  }

  try {
    let iframe = document.getElementById('handbook-direct-dl-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'handbook-direct-dl-iframe';
      iframe.title = 'Direct Download Frame';
      iframe.style.display = 'none';
      iframe.setAttribute('sandbox', 'allow-downloads allow-scripts allow-same-origin');
      document.body.appendChild(iframe);
    }
    iframe.src = url;
  } catch {
    window.location.assign(url);
  }
}

const RAW_HANDBOOKS_CATALOG = [
  // ==================== PHYSICS VOLUMES ====================
  {
    id: 'phy-01-kinematics',
    code: 'PHY-01',
    title: 'Physics Volume 1: Kinematics & 2D Motion Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 1: คู่มือจลนศาสตร์และการเคลื่อนที่ 2 มิติ',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['kinematics'],
    filename: 'Physics - 01 Kinematics & 2D Motion.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 01 Kinematics & 2D Motion.pdf',
    fileSize: '182 KB',
    badge: 'Volume 01',
    badgeTh: 'เล่มที่ 01',
    author: 'Synthesized from Shankar & University Mechanics series',
    authorTh: 'สังเคราะห์จากตำรา Shankar และชุดคำสอนกลศาสตร์มหาวิทยาลัย',
    description:
      'Vector calculus of motion, 1D SUVAT constant-acceleration equations, projectile flight trajectory, range & apex derivations, uniform/non-uniform circular kinematics, and Galilean relative motion.',
    descriptionTh:
      'แคลคูลัสเวกเตอร์ของการเคลื่อนที่, สมการ SUVAT 1 มิติ, การเคลื่อนที่แบบโพรเจกไทล์, การพิสูจน์ระยะทางสูงสุดและแนวยิง, จลนศาสตร์การหมุน และการแปลงกรอบอ้างอิงสัมพัทธ์ของกาลิเลโอ',
    tags: ['Kinematics', 'SUVAT', 'Projectile Motion', 'Trajectory', 'Galilean Transformation'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 01 Kinematics & 2D Motion (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 01 Kinematics & 2D Motion.pdf',
        fileSize: '202 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 01 Kinematics & 2D Motion (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 01 Kinematics & 2D Motion.pdf',
        fileSize: '182 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-02-newtons-laws',
    code: 'PHY-02',
    title: "Physics Volume 2: Newton's Laws & Classical Dynamics Handbook",
    titleTh: 'ฟิสิกส์ เล่ม 2: คู่มือกฎการเคลื่อนที่ของนิวตันและพลศาสตร์คลาสสิก',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['newtons-laws'],
    filename: "Physics - 02 Newton's Laws & Dynamics.pdf",
    downloadUrl: "/handbooks/physics/en/Physics - 02 Newton's Laws & Dynamics.pdf",
    fileSize: '301 KB',
    badge: 'Volume 02',
    badgeTh: 'เล่มที่ 02',
    author: 'Synthesized from Halliday-Resnick & Shankar Mechanics',
    authorTh: 'สังเคราะห์จาก Halliday-Resnick และ Shankar Mechanics',
    description:
      "Inertial reference frames, vector formulation of Newton's three laws, systematic free-body diagram isolation, Coulomb-Amontons friction, inclined planes, and multi-body Atwood pulley mechanics.",
    descriptionTh:
      'กรอบอ้างอิงเฉื่อย, เวกเตอร์กฎสามข้อของนิวตัน, วิธีการเขียนแผนภาพอิสระ (FBD) อย่างเป็นระบบ, แรงเสียดทานคูลอมบ์, พลศาสตร์พื้นเอียง และกลไกระบบรอกหลายมวล (Atwood Machines)',
    tags: ["Newton's Laws", 'Free-Body Diagrams', 'Friction', 'Inclined Plane', 'Atwood Machine'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: "Physics - 02 Newton's Laws & Dynamics (TH).pdf",
        downloadUrl: "/handbooks/physics/th/Physics - 02 Newton's Laws & Dynamics.pdf",
        fileSize: '343 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: "Physics - 02 Newton's Laws & Dynamics (EN).pdf",
        downloadUrl: "/handbooks/physics/en/Physics - 02 Newton's Laws & Dynamics.pdf",
        fileSize: '301 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-03-work-energy',
    code: 'PHY-03',
    title: 'Physics Volume 3: Work, Energy & Momentum Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 3: คู่มืองาน พลังงาน และโมเมนตัมเชิงเส้น',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['work-and-energy', 'momentum'],
    filename: 'Physics - 03 Work, Energy & Momentum.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 03 Work, Energy & Momentum.pdf',
    fileSize: '166 KB',
    badge: 'Volume 03',
    badgeTh: 'เล่มที่ 03',
    author: 'Synthesized from University Physics & Yale Open Physics',
    authorTh: 'สังเคราะห์จากชุดคำสอนฟิสิกส์มหาวิทยาลัยและ Yale Open Physics',
    description:
      'Work line integrals, Work-Kinetic Energy Theorem, conservative fields and potential energy landscapes, impulse-momentum theorem, 1D/2D collisions with coefficient of restitution, and variable-mass rocket propulsion.',
    descriptionTh:
      'อินทิกรัลเส้นของงาน, ทฤษฎีบทงาน-พลังงานจลน์, สนามอนุรักษ์และกราฟพลังงานศักย์, การดลและโมเมนตัม, การชน 1 และ 2 มิติด้วยสัมประสิทธิ์การคืนสภาพ (e) และสมการจรวดมวลแปรผัน',
    tags: ['Work', 'Kinetic Energy', 'Potential Energy', 'Momentum', 'Collisions', 'Rocket Equation'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 03 Work, Energy & Momentum (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 03 Work, Energy & Momentum.pdf',
        fileSize: '209 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 03 Work, Energy & Momentum (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 03 Work, Energy & Momentum.pdf',
        fileSize: '166 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-04-rotational',
    code: 'PHY-04',
    title: 'Physics Volume 4: Rotational Dynamics & Angular Momentum Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 4: คู่มือพลศาสตร์การหมุนและโมเมนตัมเชิงมุม',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['circular-motion'],
    filename: 'Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
    fileSize: '144 KB',
    badge: 'Volume 04',
    badgeTh: 'เล่มที่ 04',
    author: 'Synthesized from Halliday-Resnick & University Physics',
    authorTh: 'สังเคราะห์จาก Halliday-Resnick และฟิสิกส์วิศวกรรมมหาวิทยาลัย',
    description:
      'Rotational kinematics, moment of inertia integrals, Parallel Axis Theorem, torque and Newton second law for rotation, rolling without slipping, vector angular momentum conservation, and gyroscopic precession.',
    descriptionTh:
      'จลนศาสตร์การหมุน, การอินทิเกรตโมเมนต์ความเฉื่อย, ทฤษฎีบทแกนขนาน, ทอร์กและกฎข้อสองของการหมุน, การกลิ้งโดยไม่ไถล, การอนุรักษ์โมเมนตัมเชิงมุม และการส่ายไจโรสโคป',
    tags: ['Rotation', 'Moment of Inertia', 'Torque', 'Rolling Without Slipping', 'Angular Momentum', 'Gyroscopes'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 04 Rotational Dynamics & Angular Momentum (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
        fileSize: '179 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 04 Rotational Dynamics & Angular Momentum (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
        fileSize: '144 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-05-elasticity',
    code: 'PHY-05',
    title: 'Physics Volume 5: Elasticity & Modulus of Materials Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 5: คู่มือความยืดหยุ่นและมอดุลัสของวัสดุ',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['elasticity'],
    filename: 'Physics - 05 Elasticity & Modulus of Materials.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 05 Elasticity & Modulus of Materials.pdf',
    fileSize: '220 KB',
    badge: 'Volume 05',
    badgeTh: 'เล่มที่ 05',
    author: 'Synthesized from University Mechanics & Materials Science references',
    authorTh: 'สังเคราะห์จากคำสอนกลศาสตร์วัสดุและวิศวกรรมวัสดุมหาวิทยาลัย',
    description:
      "Stress-strain curves, Young's modulus, shear modulus, bulk modulus, Poisson's ratio, elastic potential energy density, coupled thermal-mechanical stresses, and fast-track scaling shortcuts.",
    descriptionTh:
      'กราฟความเค้น-ความเครียด, มอดุลัสของยัง, มอดุลัสเฉือน, มอดุลัสเชิงปริมาตร, อัตราส่วนปัวซง, ความหนาแน่นพลังงานความเครียด, ความเค้นจากอุณหภูมิ และสูตรลัดวิศวกรรม',
    tags: ['Elasticity', 'Young Modulus', 'Shear Modulus', 'Bulk Modulus', 'Poisson Ratio', 'Thermal Stress'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 05 Elasticity & Modulus of Materials (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 05 Elasticity & Modulus of Materials.pdf',
        fileSize: '295 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 05 Elasticity & Modulus of Materials (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 05 Elasticity & Modulus of Materials.pdf',
        fileSize: '220 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-06-fluid',
    code: 'PHY-06',
    title: 'Physics Volume 6: Fluid Mechanics & Viscous Transport Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 6: คู่มือกลศาสตร์ของไหล สถิตศาสตร์ของไหล และการไหลหนืด',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['fluid-mechanics'],
    filename: 'Physics - 06 Fluid Mechanics.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 06 Fluid Mechanics.pdf',
    fileSize: '197 KB',
    badge: 'Volume 06',
    badgeTh: 'เล่มที่ 06',
    author: 'Synthesized from Shankar Physics & University Fluid Dynamics series',
    authorTh: 'สังเคราะห์จากตำรา Shankar และฟิสิกส์ของไหลระดับมหาวิทยาลัย',
    description:
      "Hydrostatic pressure fields, Pascal's principle, Archimedes buoyancy, volumetric continuity, Bernoulli principle & applications (Venturi meter, Torricelli efflux, Pitot tube), Hagen-Poiseuille flow, and Reynolds number.",
    descriptionTh:
      'ความดันสถิตของไหล, หลักการของปาสกาล, แรงลอยตัวอาร์คิมิดีส, สมการความต่อเนื่อง, สมการแบร์นูลลีและการประยุกต์ (ท่อเวนจูรี, กฎทอร์ริเชลลี, หลอดปีโตต์), การไหลหนืดของปัวซอยล์ และตัวเลขเรย์โนลด์',
    tags: ['Fluids', 'Hydrostatics', 'Bernoulli', 'Buoyancy', 'Torricelli', 'Poiseuille', 'Reynolds Number'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 06 Fluid Mechanics (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 06 Fluid Mechanics.pdf',
        fileSize: '253 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 06 Fluid Mechanics (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 06 Fluid Mechanics.pdf',
        fileSize: '197 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-07-oscillations',
    code: 'PHY-07',
    title: 'Physics Volume 7: Oscillations & Simple Harmonic Motion Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 7: คู่มือการสั่นและการเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['oscillations'],
    filename: 'Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
    fileSize: '781 KB',
    badge: 'Volume 07',
    badgeTh: 'เล่มที่ 07',
    author: 'Synthesized from Yale Open Physics (Shankar) & University Physics',
    authorTh: 'สังเคราะห์จาก Yale Open Physics (Shankar) และฟิสิกส์มหาวิทยาลัย',
    description:
      'Kinematics and differential equations of SHM, spring-mass systems, simple, physical and torsion pendulums, mechanical energy oscillation, damped harmonic decay, quality factor, and driven resonance curves.',
    descriptionTh:
      'จลนศาสตร์และสมการเชิงอนุพันธ์ของ SHM, ระบบมวลติดสปริง, ลูกตุ้มอย่างง่าย ลูกตุ้มกายภาพ และลูกตุ้มบิด, การแปลงผันพลังงานกล, การสั่นแบบหน่วง แฟกเตอร์คุณภาพ และเรโซแนนซ์จากการสั่นถูกบังคับ',
    tags: ['Oscillations', 'Simple Harmonic Motion', 'Pendulums', 'Damping', 'Resonance', 'Q-Factor'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 07 Oscillations & Simple Harmonic Motion (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
        fileSize: '789 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 07 Oscillations & Simple Harmonic Motion (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
        fileSize: '781 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-08-waves',
    code: 'PHY-08',
    title: 'Physics Volume 8: Waves & Sound Acoustics Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 8: คู่มือคลื่นกลและสวนศาสตร์ของเสียง',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['waves'],
    filename: 'Physics - 08 Waves & Sound.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 08 Waves & Sound.pdf',
    fileSize: '283 KB',
    badge: 'Volume 08',
    badgeTh: 'เล่มที่ 08',
    author: 'Synthesized from University Wave Physics & Acoustic Engineering series',
    authorTh: 'สังเคราะห์จากชุดคำสอนฟิสิกส์คลื่นและวิศวกรรมสวนศาสตร์',
    description:
      '1D classical wave equation, transverse wave speed on tensioned strings, acoustic speed in gas, sound intensity & decibel dB scale, Doppler frequency shift kinematics, standing resonant modes in strings/pipes, and acoustic beats.',
    descriptionTh:
      'สมการคลื่นคลาสสิก 1 มิติ, ความเร็วคลื่นในเส้นเชือกขึงตึง, อัตราเร็วเสียงในก๊าซ, ความเข้มเสียงและระดับความเข้มในหน่วยเดซิเบล (dB), ปรากฏการณ์ดอปเปลอร์, โหมดการสั่นพ้องในสายและท่อลม และบีตของเสียง',
    tags: ['Waves', 'Sound', 'Wave Equation', 'Decibel Scale', 'Doppler Effect', 'Resonant Modes', 'Acoustic Beats'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 08 Waves & Sound (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 08 Waves & Sound.pdf',
        fileSize: '325 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 08 Waves & Sound (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 08 Waves & Sound.pdf',
        fileSize: '283 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-09-thermo',
    code: 'PHY-09',
    title: 'Physics Volume 9: Thermodynamics & Heat Transfer Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 9: คู่มืออุณหพลศาสตร์และการถ่ายโอนความร้อน',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['thermodynamics'],
    filename: 'Physics - 09 Thermodynamics & Heat Transfer.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - 09 Thermodynamics & Heat Transfer.pdf',
    fileSize: '286 KB',
    badge: 'Volume 09',
    badgeTh: 'เล่มที่ 09',
    author: 'Synthesized from Shankar Fundamentals & University Thermal Physics',
    authorTh: 'สังเคราะห์จากตำรา Shankar และฟิสิกส์เชิงความร้อนมหาวิทยาลัย',
    description:
      "Thermal expansion and stress, calorimetry, Fourier conduction, Newton's law of cooling, Stefan-Boltzmann radiation, First Law and 4 ideal gas processes (isobaric, isochoric, isothermal, adiabatic), Carnot cycle, heat pumps, and entropy.",
    descriptionTh:
      'การขยายตัวจากความร้อน, แคลอริมิเตอร์, การนำความร้อนฟูเรียร์, การพาความร้อน, การแผ่รังสีสเตฟาน-โบลต์ซมันน์, กฎข้อหนึ่งและ 4 กระบวนการก๊าซอุดมคติ, วัฏจักรคาร์โนต์, ประสิทธิภาพเครื่องทำความเย็น และเอนโทรปี',
    tags: ['Thermodynamics', 'Heat Transfer', 'Conduction', 'Radiation', 'Carnot Cycle', 'Entropy', 'Ideal Gas'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Physics - 09 Thermodynamics & Heat Transfer (TH).pdf',
        downloadUrl: '/handbooks/physics/th/Physics - 09 Thermodynamics & Heat Transfer.pdf',
        fileSize: '274 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Physics - 09 Thermodynamics & Heat Transfer (EN).pdf',
        downloadUrl: '/handbooks/physics/en/Physics - 09 Thermodynamics & Heat Transfer.pdf',
        fileSize: '286 KB',
        available: true,
      },
    },
  },
  {
    id: 'phy-master-formula',
    code: 'PHY-REF',
    title: 'Physics: Comprehensive Master Formula Sheet & Constants Handbook',
    titleTh: 'ฟิสิกส์: เอกสารรวมสูตรหลักและค่าคงที่พื้นฐานฉบับสมบูรณ์',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: [
      'units-and-measurement',
      'kinematics',
      'newtons-laws',
      'work-and-energy',
      'momentum',
      'circular-motion',
      'elasticity',
      'oscillations',
      'waves',
      'fluid-mechanics',
      'thermodynamics',
    ],
    filename: 'Physics - Comprehensive Master Formula Sheet & Constants.pdf',
    downloadUrl: '/handbooks/physics/en/Physics - Comprehensive Master Formula Sheet & Constants.pdf',
    fileSize: '135 KB',
    badge: 'Master Compendium',
    badgeTh: 'รวมสูตรหลัก',
    author: 'University Physics Faculty Standards & Learning Hub Repository',
    authorTh: 'มาตรฐานวิชาการฟิสิกส์มหาวิทยาลัยและ Learning Hub Repository',
    description:
      'Official master compendium of university physics equations: fundamental physical constants, standard SI units, kinematics, dynamics, energy, momentum, rotation, elasticity, fluids, oscillations, waves, and thermal physics.',
    descriptionTh:
      'คลังสูตรทางการครอบคลุมทุกหมวดหมู่วิชาฟิสิกส์มหาวิทยาลัย: ค่าคงที่ทางฟิสิกส์พื้นฐาน หน่วยเอสไอมาตรฐาน กลศาสตร์ จลนศาสตร์ แรง พลังงาน โมเมนตัม การหมุน ความยืดหยุ่น ของไหล คลื่น และความร้อน',
    tags: ['Master Formula Sheet', 'Physical Constants', 'SI Units', 'Mechanics', 'Waves', 'Thermodynamics'],
    editions: {
      en: {
        lang: 'en',
        label: 'Universal Formula Sheet (EN)',
        shortLabel: 'EN/Universal',
        filename: 'Physics - Comprehensive Master Formula Sheet & Constants.pdf',
        downloadUrl: '/handbooks/physics/en/Physics - Comprehensive Master Formula Sheet & Constants.pdf',
        fileSize: '135 KB',
        available: true,
      },
    },
  },

  // ==================== LINEAR ALGEBRA VOLUMES ====================
  {
    id: 'la-01-vectors',
    code: 'LA-01',
    title: 'Linear Algebra Volume 1: Vectors & Linear Combinations Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 1: คู่มือเวกเตอร์และผลรวมเชิงเส้น',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['vectors', 'linear-combinations'],
    filename: 'Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
    fileSize: '173 KB',
    badge: 'Volume 01',
    badgeTh: 'เล่มที่ 01',
    series: 'core',
    pages: { th: 31, en: 30 },
    author: 'Synthesized from Gilbert Strang & MIT 18.06',
    authorTh: 'สังเคราะห์จากตำรา Gilbert Strang และ MIT 18.06',
    description:
      'Geometric and algebraic vectors in ℝⁿ, linear combinations, vector span, linear independence tests, dot products, vector norms, and Cauchy-Schwarz / triangle inequalities.',
    descriptionTh:
      'เวกเตอร์เชิงเรขาคณิตและพีชคณิตใน ℝⁿ, ผลรวมเชิงเส้น, การแผ่ของเวกเตอร์ (Span), การทดสอบความเป็นอิสระเชิงเส้น, ผลคูณจุด (Dot Product), นอร์ม และอสมการโคชี-ชวาร์ซ',
    tags: ['Vectors', 'Linear Combinations', 'Span', 'Linear Independence', 'Dot Product', 'Norms'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 01 Vectors & Linear Combinations (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
        fileSize: '235 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 01 Vectors & Linear Combinations (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
        fileSize: '173 KB',
        available: true,
      },
    },
  },
  {
    id: 'la-02-solving-elimination',
    code: 'LA-02',
    title: 'Linear Algebra Volume 2: Solving Linear Equations & Elimination Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 2: คู่มือการแก้ระบบสมการเชิงเส้นและการกำจัด',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['systems-of-equations', 'matrices', 'matrix-multiplication'],
    filename: 'Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
    fileSize: '188 KB',
    badge: 'Volume 02',
    badgeTh: 'เล่มที่ 02',
    series: 'core',
    pages: { th: 20, en: 24 },
    author: 'Synthesized from Gilbert Strang & Numerical Linear Algebra',
    authorTh: 'สังเคราะห์จากตำรา Gilbert Strang และการคำนวณเชิงตัวเลข',
    description:
      'Systematic Gaussian elimination, pivot selection, row echelon form (REF/RREF), matrix multiplication row/column perspectives, matrix inverses, and LU factorization without pivoting.',
    descriptionTh:
      'การกำจัดแบบเกาส์อย่างเป็นระบบ, การเลือกไพวอต, รูปแบบขั้นบันไดแถว (REF/RREF), มุมมองการคูณเมทริกซ์แบบแถวและคอลัมน์, เมทริกซ์ผกผัน และการแยกตัวประกอบ A = LU',
    tags: ['Linear Systems', 'Gaussian Elimination', 'Pivots', 'RREF', 'Matrix Inverse', 'LU Decomposition'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 02 Solving Linear Equations & Elimination (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
        fileSize: '197 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 02 Solving Linear Equations & Elimination (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
        fileSize: '188 KB',
        available: true,
      },
    },
  },
  {
    id: 'la-03-vector-spaces',
    code: 'LA-03',
    title: 'Linear Algebra Volume 3: Vector Spaces & Fundamental Subspaces Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 3: คู่มือปริภูมิเวกเตอร์และ 4 ปริภูมิย่อยหลัก',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['vector-spaces'],
    filename: 'Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
    fileSize: '184 KB',
    badge: 'Volume 03',
    badgeTh: 'เล่มที่ 03',
    series: 'core',
    pages: { th: 14, en: 19 },
    author: 'Synthesized from Gilbert Strang & MIT Linear Algebra series',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และชุดบรรยาย MIT',
    description:
      'Vector spaces and subspaces, span, basis and dimension, the Four Fundamental Subspaces (Column Space C(A), Nullspace N(A), Row Space C(Aᵀ), Left Nullspace N(Aᵀ)), and the Rank-Nullity Theorem.',
    descriptionTh:
      'ปริภูมิเวกเตอร์และปริภูมิย่อย, ฐานหลักและมิติ, สี่ปริภูมิย่อยพื้นฐาน (Column Space, Nullspace, Row Space, Left Nullspace) และทฤษฎีบทแรงก์-นัลลิตี (Rank-Nullity Theorem)',
    tags: ['Vector Spaces', 'Subspaces', 'Basis', 'Dimension', 'Four Subspaces', 'Rank-Nullity'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 03 Vector Spaces & Subspaces (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
        fileSize: '158 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 03 Vector Spaces & Subspaces (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
        fileSize: '184 KB',
        available: true,
      },
    },
  },
  {
    id: 'la-04-determinants',
    code: 'LA-04',
    title: "Linear Algebra Volume 4: Determinants & Cramer's Rule Handbook",
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 4: คู่มือดีเทอร์มิแนนต์และกฎของคราเมอร์',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['determinants'],
    filename: "Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
    downloadUrl: "/handbooks/linear-algebra/en/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
    fileSize: '200 KB',
    badge: 'Volume 04',
    badgeTh: 'เล่มที่ 04',
    series: 'core',
    pages: { th: 14, en: 26 },
    author: 'Synthesized from Gilbert Strang & Classical Linear Algebra',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และตำราพีชคณิตเชิงเส้นคลาสสิก',
    description:
      'Properties of determinants, pivot formula, cofactor expansion, geometric volume scaling factor, matrix inverse formula via adjugate, and Cramer rule for exact analytic solutions.',
    descriptionTh:
      'สมบัติของดีเทอร์มิแนนต์, สูตรผลคูณไพวอต, การกระจายโคแฟกเตอร์, อัตราส่วนการขยายปริมาตรเชิงเรขาคณิต, สูตรเมทริกซ์ผกผันผ่านเมทริกซ์ผูกพัน (Adjugate) และกฎของคราเมอร์',
    tags: ['Determinants', 'Volume Scaling', 'Cofactor Expansion', 'Adjugate', "Cramer's Rule"],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: "Linear-Algebra - 04 Determinants & Cramer's Rule (TH).pdf",
        downloadUrl: "/handbooks/linear-algebra/th/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
        fileSize: '173 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: "Linear-Algebra - 04 Determinants & Cramer's Rule (EN).pdf",
        downloadUrl: "/handbooks/linear-algebra/en/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
        fileSize: '200 KB',
        available: true,
      },
    },
  },
  {
    id: 'la-05-linear-transformations',
    code: 'LA-05',
    title: 'Linear Algebra Volume 5: Linear Transformations & Change of Basis Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 5: คู่มือการแปลงเชิงเส้นและการเปลี่ยนฐานหลัก',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['linear-transformations'],
    filename: 'Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
    fileSize: '233 KB',
    badge: 'Volume 05',
    badgeTh: 'เล่มที่ 05',
    series: 'core',
    pages: { th: 14, en: 28 },
    author: 'Synthesized from Gilbert Strang & Geometric Linear Algebra',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และพีชคณิตเชิงเส้นเรขาคณิต',
    description:
      'Linear mappings T: V → W, matrix representations with respect to bases, rotation, reflection, scaling and shear matrices in 2D and 3D, change of basis matrices, and similarity transformations.',
    descriptionTh:
      'การส่งเชิงเส้น T: V → W, เมทริกซ์ของการแปลงเทียบกับฐานหลัก, เมทริกซ์การหมุน การสะท้อน การขยาย และการเฉือนใน 2D และ 3D, การเปลี่ยนฐานหลัก และการแปลงคล้าย (Similarity)',
    tags: ['Linear Transformations', 'Change of Basis', 'Rotation Matrices', 'Shear', 'Similarity'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 05 Linear Transformations & Change of Basis (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
        fileSize: '186 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 05 Linear Transformations & Change of Basis (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
        fileSize: '233 KB',
        available: true,
      },
    },
  },
  {
    id: 'la-06-diagonalization',
    code: 'LA-06',
    title: 'Linear Algebra Volume 6: Diagonalization, Matrix Powers & Dynamical Systems Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 6: คู่มือการแปลงเมทริกซ์ทแยงมุม เลขยกกำลัง และระบบพลวัต',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['diagonalization'],
    filename: 'Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf',
    fileSize: '234 KB',
    badge: 'Volume 06',
    badgeTh: 'เล่มที่ 06',
    series: 'core',
    isNew: true,
    pages: { th: 20, en: 22 },
    author: 'Synthesized from Gilbert Strang (5th Ed., Ch. 6) & Kenji Hiranabe',
    authorTh: 'สังเคราะห์จากตำรา Gilbert Strang (พิมพ์ครั้งที่ 5 บทที่ 6) และ Kenji Hiranabe',
    description:
      'Spectral Diagonalization Theorem A = XΛX⁻¹, Multiplicity Criteria (AM vs. GM), defective shear matrices, discrete powers Aᵏ, Fibonacci companion matrix, Markov steady states, continuous differential systems du/dt = Au, matrix exponential e^{At}, Jordan canonical forms, and 6 hand-calculation Fast-Tracks.',
    descriptionTh:
      'ทฤษฎีบทการแปลงทแยงมุม A = XΛX⁻¹, การวิเคราะห์ภาวะทวีคูณ (AM vs. GM), เมทริกซ์บกพร่อง, เลขยกกำลังเมทริกซ์ Aᵏ, เมทริกซ์ฟีโบนัชชี, สภาวะคงตัวมาร์คอฟ, ระบบสมการเชิงอนุพันธ์ต่อเนื่อง du/dt = Au, เมทริกซ์เอกซ์โพเนนเชียล e^{At}, รูปแบบบัญญัติจอร์แดน และ 6 เทคนิคคำนวณเร็ว (Fast-Tracks)',
    tags: ['Diagonalization', 'Matrix Powers', 'Eigenvalues', 'Fibonacci Matrix', 'Markov Chains', 'Matrix Exponential', 'Jordan Form'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 06 Diagonalization & Matrix Powers (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf',
        fileSize: '263 KB',
        pages: 20,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 06 Diagonalization & Matrix Powers (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 06 Diagonalization & Matrix Powers.pdf',
        fileSize: '234 KB',
        pages: 22,
        available: true,
      },
    },
  },
  {
    id: 'la-07-symmetric-spectral',
    code: 'LA-07',
    title: 'Linear Algebra Volume 7: Symmetric Matrices & The Spectral Theorem Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 7: คู่มือเมทริกซ์สมมาตรและทฤษฎีบทสเปกตรัม',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['symmetric-matrices'],
    filename: 'Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf',
    fileSize: '205 KB',
    badge: 'Volume 07',
    badgeTh: 'เล่มที่ 07',
    series: 'core',
    isNew: true,
    pages: { th: 18, en: 19 },
    author: 'Synthesized from Gilbert Strang (5th Ed., Ch. 6.4) & Kenji Hiranabe',
    authorTh: 'สังเคราะห์จาก Gilbert Strang (พิมพ์ครั้งที่ 5 บทที่ 6.4) และ Kenji Hiranabe',
    description:
      "Universal orthogonal diagonalization S = QΛQᵀ, real eigenvalue and orthogonal eigenvector proofs, rank-1 projection decomposition S = ∑ λᵢ qᵢ qᵢᵀ, spectral functional calculus, Sylvester's Law of Inertia (pivot signs = eigenvalue signs), spectrum slicing bisection, complex Hermitian matrices H = UΛUᴴ, and 7 Fast-Tracks.",
    descriptionTh:
      'การแปลงทแยงมุมเชิงตั้งฉากสากล S = QΛQᵀ, การพิสูจน์ไอเกนแวลูจำนวนจริงและไอเกนเวกเตอร์ตั้งฉาก, การกระจายตัวฉายภาพอันดับหนึ่ง (Rank-1 Projections) S = ∑ λᵢ qᵢ qᵢᵀ, แคลคูลัสฟังก์ชันสเปกตรัม, กฎความเฉื่อยของซิลเวสเตอร์ (เครื่องหมายไพวอต = เครื่องหมายไอเกนแวลู), การสไลซ์สเปกตรัม, เมทริกซ์แฮร์มีเชียนเชิงซ้อน และ 7 สูตรลัด',
    tags: ['Symmetric Matrices', 'Spectral Theorem', 'Orthogonal Diagonalization', 'Rank-1 Projections', 'Sylvesters Law of Inertia', 'Hermitian Matrices'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf',
        fileSize: '232 KB',
        pages: 18,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 07 Symmetric Matrices & Spectral Theorem.pdf',
        fileSize: '205 KB',
        pages: 19,
        available: true,
      },
    },
  },
  {
    id: 'la-08-positive-definite',
    code: 'LA-08',
    title: 'Linear Algebra Volume 8: Positive Definite Matrices & Quadratic Forms Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 8: คู่มือเมทริกซ์โพซิตีฟเดฟินิตและรูปแบบกำลังสอง',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['positive-definite'],
    filename: 'Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf',
    fileSize: '178 KB',
    badge: 'Volume 08',
    badgeTh: 'เล่มที่ 08',
    series: 'core',
    isNew: true,
    pages: { th: 21, en: 21 },
    author: 'Synthesized from Gilbert Strang (5th Ed., Ch. 6.5, 7.1-7.2) & Kenji Hiranabe',
    authorTh: 'สังเคราะห์จาก Gilbert Strang (พิมพ์ครั้งที่ 5 บทที่ 6.5, 7.1-7.2) และ Kenji Hiranabe',
    description:
      'Energy topography f(x) = xᵀ S x, the 5 canonical equivalence tests for positive definiteness (S ≻ 0), completing the square ↔ S = LDLᵀ, Cholesky factorization S = LLᵀ, geometry of hyper-ellipsoids (semi-axes aᵢ = 1/√λᵢ), Rayleigh quotient bounds, multivariable Hessian optimization H ≻ 0, and 6 calculation Fast-Tracks.',
    descriptionTh:
      'ภูมิทัศน์พลังงาน f(x) = xᵀ S x, การทดสอบความสมมูลทั้ง 5 ประการสำหรับเมทริกซ์บวกแน่นอน (S ≻ 0), การจัดรูปกำลังสองสมบูรณ์เชื่อมโยง S = LDLᵀ, การแยกตัวประกอบโชเลสกี S = LLᵀ, เรขาคณิตของทรงรีไฮเพอร์ (แกนหลัก aᵢ = 1/√λᵢ), ขอบเขตผลหารเรย์ลี (Rayleigh Quotient), การหาค่าสุดขีดเมทริกซ์เฮสเซียน และ 6 สูตรลัด',
    tags: ['Positive Definite', 'Quadratic Forms', 'Cholesky Factorization', 'Energy Landscapes', 'Ellipsoids', 'Rayleigh Quotient', 'Hessian Optimization'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf',
        fileSize: '221 KB',
        pages: 21,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 08 Positive Definite Matrices & Quadratic Forms.pdf',
        fileSize: '178 KB',
        pages: 21,
        available: true,
      },
    },
  },
  {
    id: 'la-orthogonality',
    code: 'LA-09',
    title: 'Linear Algebra Volume 9: Orthogonality, Projections & Least Squares Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 9: คู่มือเจาะลึกความตั้งฉาก การฉายเวกเตอร์ และกำลังสองน้อยที่สุด',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['orthogonal'],
    filename: 'Linear-Algebra - 09 Orthogonality.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 09 Orthogonality.pdf',
    fileSize: '146 KB',
    badge: 'Volume 09',
    badgeTh: 'เล่มที่ 09',
    series: 'core',
    isNew: true,
    pages: { th: 22, en: 25 },
    author: 'Synthesized from Strang & TUDelft references',
    authorTh: 'สังเคราะห์จากเอกสารอ้างอิง Strang & TUDelft',
    description:
      'Comprehensive handbook covering Orthogonal Subspaces, Projection Matrices, Normal Equations, Least Squares Regression, Gram-Schmidt Orthogonalization, and QR Factorization.',
    descriptionTh:
      'คู่มือสรุปเนื้อหาแบบสมบูรณ์ ครอบคลุมปริภูมิย่อยตั้งฉาก เมทริกซ์การฉาย สมการปรกติ (Normal Equations) วิธีกำลังสองน้อยที่สุด กระบวนการ Gram-Schmidt และการแยกตัวประกอบ QR',
    tags: ['Orthogonality', 'Projection', 'Least Squares', 'Gram-Schmidt', 'QR Factorization'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 09 Orthogonality (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 09 Orthogonality.pdf',
        fileSize: '175 KB',
        pages: 22,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 09 Orthogonality (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 09 Orthogonality.pdf',
        fileSize: '146 KB',
        pages: 25,
        available: true,
      },
    },
  },
  {
    id: 'la-09-svd',
    code: 'LA-09',
    title: 'Linear Algebra Volume 9: Singular Value Decomposition (SVD) & Pseudoinverse Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 9: คู่มือการแยกย่อยค่าเอกฐาน (SVD) และเมทริกซ์ผกผันเทียม',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['svd'],
    filename: 'Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf',
    fileSize: '686 KB',
    badge: 'Volume 09',
    badgeTh: 'เล่มที่ 09',
    series: 'core',
    isNew: true,
    pages: { th: 20, en: 19 },
    author: 'Synthesized from Gilbert Strang (Ch. 7) & Kenji Hiranabe Visual SVD',
    authorTh: 'สังเคราะห์จาก Gilbert Strang (บทที่ 7) และ Kenji Hiranabe (The Art of Linear Algebra)',
    description:
      'The pinnacle of matrix factorization: A = UΣVᵀ, hyper-ellipsoid geometry, four fundamental subspaces, Eckart-Young low-rank compression, Moore-Penrose pseudoinverse A⁺, minimum-norm least squares, matrix norms, condition numbers, and 6 exam shortcut cards (S1–S6).',
    descriptionTh:
      'จุดสูงสุดของการแยกตัวประกอบเมทริกซ์: การแยกตัวประกอบ A = UΣVᵀ, เรขาคณิตการส่งทรงกลมสู่ทรงรี, สี่ปริภูมิพื้นฐานตามทัศนะของ Strang, ทฤษฎีบทการบีบอัดข้อมูล Eckart-Young, เมทริกซ์ผกผันเทียมมัวร์-เพนโรส A⁺, กำลังสองน้อยที่สุดนอร์มต่ำสุด, ค่าภาวะ (Condition Number) และ 6 สูตรลัดการคำนวณด้วยมือ (S1–S6)',
    tags: [
      'SVD',
      'Singular Value Decomposition',
      'Pseudoinverse',
      'Moore-Penrose',
      'Eckart-Young',
      'Low-Rank Approximation',
      'Four Subspaces',
      'Condition Number',
      'Polar Decomposition',
    ],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 09 Singular Value Decomposition (SVD) (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf',
        fileSize: '728 KB',
        pages: 20,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 09 Singular Value Decomposition (SVD) (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 09 Singular Value Decomposition (SVD).pdf',
        fileSize: '686 KB',
        pages: 19,
        available: true,
      },
    },
  },
  {
    id: 'la-eigenvalues',
    code: 'LA-10',
    title: 'Linear Algebra Volume 10: Eigenvalues & Dynamical Systems Master Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 10: คู่มือเจาะลึกไอเกนแวลูและระบบพลวัตฉบับสมบูรณ์',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['eigenvalues-and-eigenvectors', 'diagonalization', 'symmetric-matrices', 'positive-definite', 'svd'],
    filename: 'Linear-Algebra - 10 Eigenvalues.pdf',
    downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 10 Eigenvalues.pdf',
    fileSize: '128 KB',
    badge: 'Volume 10',
    badgeTh: 'เล่มที่ 10',
    series: 'core',
    isNew: true,
    pages: { th: 17, en: 19 },
    author: 'Synthesized from Strang & MIT Linear Algebra series',
    authorTh: 'สังเคราะห์จากเอกสารอ้างอิง Strang & MIT 18.06',
    description:
      'In-depth handbook on Eigenvalues, Eigenvectors, Diagonalization (A = XΛX⁻¹), Matrix Powers, Fibonacci, Real Symmetric Matrices, Spectral Theorem, Positive Definiteness, and SVD.',
    descriptionTh:
      'คู่มือเจาะลึกไอเกนแวลูและไอเกนเวกเตอร์ การแปลงเมทริกซ์ทแยงมุม เลขยกกำลังเมทริกซ์ ลำดับฟีโบนัชชี เมทริกซ์สมมาตร ทฤษฎีบทสเปกตรัล เมทริกซ์บวกแน่นอน (Positive Definite) และ SVD',
    tags: ['Eigenvalues', 'Diagonalization', 'Spectral Theorem', 'Positive Definite', 'SVD'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 10 Eigenvalues (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 10 Eigenvalues.pdf',
        fileSize: '168 KB',
        pages: 17,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Linear-Algebra - 10 Eigenvalues (EN).pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 10 Eigenvalues.pdf',
        fileSize: '128 KB',
        pages: 19,
        available: true,
      },
    },
  },
  {
    id: 'la-prefinals',
    code: 'LA-10.1',
    title: 'Linear Algebra Volume 10.1: Pre-Final Examination Comprehensive Theory & Step-by-Step Solutions',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 10.1: คู่มือสรุปเนื้อหาและเฉลยข้อสอบเตรียมไฟนอลอย่างละเอียด',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['eigenvalues-and-eigenvectors', 'diagonalization', 'svd', 'vector-spaces', 'linear-transformations'],
    filename: 'Linear-Algebra - 10.1 Prefinals-Explanation.pdf',
    downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 10.1 Prefinals-Explanation.pdf',
    fileSize: '682 KB',
    badge: 'Volume 10.1',
    badgeTh: 'เล่มที่ 10.1',
    series: 'exam',
    isNew: true,
    pages: { th: 22, en: 22 },
    author: 'Synthesized from Gilbert Strang & Kenji Hiranabe Visual Linear Algebra',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และ Kenji Hiranabe (The Art of Linear Algebra)',
    description:
      '22-page comprehensive examination synthesis: similarity transformations, diagonalization, nilpotent matrices & binomial power expansions, full SVD construction, four fundamental subspaces, and 6 fast-track computation techniques.',
    descriptionTh:
      'คู่มือเตรียมสอบไฟนอลความยาว 22 หน้า: เจาะลึกการแปลงความคล้าย (Similarity), การแปลงทแยงมุม, เมทริกซ์นิลโพเทนต์และสูตรยกกำลังทวินาม, การแยกค่าเอกฐานแบบสมบูรณ์ (Full SVD), สี่ปริภูมิย่อยหลัก และ 6 เทคนิคคิดเลขเร็วพร้อมพิสูจน์ทุกขั้นตอน',
    tags: ['Pre-Final Exam', 'Similarity', 'Nilpotent Matrices', 'Full SVD', 'Fast-Track Techniques', 'Step-by-Step Proofs'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Linear-Algebra - 10.1 Prefinals-Explanation (TH).pdf',
        downloadUrl: '/handbooks/linear-algebra/th/Linear-Algebra - 10.1 Prefinals-Explanation.pdf',
        fileSize: '682 KB',
        pages: 22,
        available: true,
      },
      en: {
        lang: 'en',
        label: 'Bilingual (TH/EN)',
        shortLabel: 'EN/TH',
        filename: 'Linear-Algebra - 10.1 Prefinals-Explanation.pdf',
        downloadUrl: '/handbooks/linear-algebra/en/Linear-Algebra - 10.1 Prefinals-Explanation.pdf',
        fileSize: '682 KB',
        pages: 22,
        available: true,
      },
    },
  },

  // ==================== COMPUTER PROGRAMMING ====================
  {
    id: 'cp-c-programming',
    code: 'CP-01',
    title: 'C Programming: Master Syntax & Systems Architecture Handbook',
    titleTh: 'การเขียนโปรแกรมภาษา C: คู่มือไวยากรณ์และสถาปัตยกรรมระบบ',
    subjectId: 'com-prog',
    subjectName: 'Computer Programming',
    subjectNameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    topicIds: ['c-programming'],
    filename: 'C-Programming-Master-Handbook.pdf',
    downloadUrl: '/handbooks/com-prog/en/C-Programming-Master-Handbook.pdf',
    fileSize: '230 KB',
    badge: 'Systems Guide',
    badgeTh: 'คู่มือภาษา C',
    author: 'Synthesized Engineering Reference',
    authorTh: 'คู่มืออ้างอิงเชิงวิศวกรรม',
    description:
      'Essential engineering guide to C programming: syntax, data types, control flow, functions, arrays, memory pointers, struct architectures, and system compilation.',
    descriptionTh:
      'คู่มือวิศวกรรมการเขียนโปรแกรม C: ไวยากรณ์ ชนิดข้อมูล การควบคุมลูปและเงื่อนไข ฟังก์ชัน อาร์เรย์ พอยน์เตอร์หน่วยความจำ สตรักต์ และกระบวนการคอมไพล์ระดับระบบ',
    tags: ['C Language', 'Pointers', 'Memory Management', 'Structures', 'Compilation'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'C-Programming-Master-Handbook (TH).pdf',
        downloadUrl: '/handbooks/com-prog/th/C-Programming-Master-Handbook.pdf',
        fileSize: '317 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'C-Programming-Master-Handbook (EN).pdf',
        downloadUrl: '/handbooks/com-prog/en/C-Programming-Master-Handbook.pdf',
        fileSize: '230 KB',
        available: true,
      },
    },
  },
  {
    id: 'cp-python-programming',
    code: 'CP-02',
    title: 'Python Programming: Modern Syntax & Applications Handbook',
    titleTh: 'การเขียนโปรแกรมภาษา Python: คู่มือไวยากรณ์สมัยใหม่และการประยุกต์ใช้',
    subjectId: 'com-prog',
    subjectName: 'Computer Programming',
    subjectNameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    topicIds: ['py-programming'],
    filename: 'Python-Programming-Master-Handbook.pdf',
    downloadUrl: '/handbooks/com-prog/en/Python-Programming-Master-Handbook.pdf',
    fileSize: '185 KB',
    badge: 'Scripting Guide',
    badgeTh: 'คู่มือภาษา Python',
    author: 'Synthesized Engineering Reference',
    authorTh: 'คู่มืออ้างอิงเชิงวิศวกรรม',
    description:
      'Practical guide covering Python core syntax, data structures (lists, tuples, dicts), functions, object-oriented programming, modules, and scientific scripting.',
    descriptionTh:
      'คู่มือปฏิบัติการ Python ครอบคลุมไวยากรณ์หลัก โครงสร้างข้อมูล (List, Dict, Tuple, Set) ฟังก์ชัน การเขียนโปรแกรมเชิงวัตถุ (OOP) โมดูล และการประยุกต์ใช้ในการคำนวณทางวิศวกรรม',
    tags: ['Python', 'OOP', 'Data Structures', 'Functions', 'Engineering Scripting'],
    editions: {
      th: {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: 'Python-Programming-Master-Handbook (TH).pdf',
        downloadUrl: '/handbooks/com-prog/th/Python-Programming-Master-Handbook.pdf',
        fileSize: '264 KB',
        available: true,
      },
      en: {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: 'Python-Programming-Master-Handbook (EN).pdf',
        downloadUrl: '/handbooks/com-prog/en/Python-Programming-Master-Handbook.pdf',
        fileSize: '185 KB',
        available: true,
      },
    },
  },
];

/**
 * Hydrate an edition object with Google Drive Direct Download & Preview URLs.
 */
function hydrateEdition(edition) {
  if (!edition) return null;
  const resolved = resolveHandbookUrls(edition.localPath || edition.downloadUrl, edition.driveId);
  return {
    ...edition,
    localPath: edition.localPath || edition.downloadUrl,
    driveId: resolved.driveId,
    downloadUrl: resolved.downloadUrl,
    previewUrl: resolved.previewUrl,
    isGoogleDrive: resolved.isGoogleDrive,
  };
}

/**
 * Hydrate a handbook catalog entry so all editions point directly to Google Drive.
 */
export function hydrateHandbookEntry(entry) {
  const mainResolved = resolveHandbookUrls(entry.localPath || entry.downloadUrl, entry.driveId);
  const editions = {};
  if (entry.editions?.th) {
    editions.th = hydrateEdition(entry.editions.th);
  }
  if (entry.editions?.en) {
    editions.en = hydrateEdition(entry.editions.en);
  }
  return {
    ...entry,
    localPath: entry.localPath || entry.downloadUrl,
    driveId: mainResolved.driveId,
    downloadUrl: mainResolved.downloadUrl,
    previewUrl: mainResolved.previewUrl,
    isGoogleDrive: mainResolved.isGoogleDrive,
    editions,
  };
}

export const HANDBOOKS_CATALOG = RAW_HANDBOOKS_CATALOG.map(hydrateHandbookEntry);

/**
 * Resolve the specific language edition for a handbook, with fallback if only one edition exists.
 * Returns { ...edition, downloadUrl, previewUrl, driveId }.
 */
export function getHandbookEdition(handbook, preferredLang = 'en') {
  if (!handbook) return null;
  const editions = handbook.editions || {};
  let chosen = null;
  if (preferredLang === 'th' && editions.th?.available) {
    chosen = editions.th;
  } else if (editions.en?.available) {
    chosen = editions.en;
  } else if (editions.th?.available) {
    chosen = editions.th;
  } else {
    chosen = {
      lang: 'en',
      label: 'PDF',
      shortLabel: 'PDF',
      filename: handbook.filename,
      downloadUrl: handbook.downloadUrl,
      previewUrl: handbook.previewUrl,
      driveId: handbook.driveId,
      fileSize: handbook.fileSize,
      available: true,
    };
  }

  return hydrateEdition(chosen);
}

/**
 * Series priority comparator: Core volumes (01-08) -> Master Compendiums -> Exam Guides -> Reference
 */
const SERIES_PRIORITY = { core: 1, compendium: 2, exam: 3, reference: 4 };

/**
 * Find all handbooks relevant to a specific topic ID, ordered by pedagogical series priority.
 */
export function getHandbooksForTopic(topicId, catalog = HANDBOOKS_CATALOG) {
  if (!topicId) return [];
  return catalog
    .filter((h) => h.topicIds && h.topicIds.includes(topicId))
    .sort((a, b) => (SERIES_PRIORITY[a.series || 'core'] || 99) - (SERIES_PRIORITY[b.series || 'core'] || 99));
}

/**
 * Find handbooks relevant to a specific topic ID (alias for backward compatibility)
 */
export function getHandbooksByTopic(topicId, catalog = HANDBOOKS_CATALOG) {
  return getHandbooksForTopic(topicId, catalog);
}

/**
 * Find the primary handbook for a specific topic ID (or null)
 */
export function getPrimaryHandbookForTopic(topicId, catalog = HANDBOOKS_CATALOG) {
  const matches = getHandbooksForTopic(topicId, catalog);
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Find handbooks by subject ID
 */
export function getHandbooksBySubject(subjectId, catalog = HANDBOOKS_CATALOG) {
  if (!subjectId || subjectId === 'all') return catalog;
  return catalog.filter((h) => h.subjectId === subjectId);
}

/**
 * Return all registered handbooks
 */
export function getAllHandbooks() {
  return HANDBOOKS_CATALOG;
}

/**
 * Return summary statistics for a handbook catalog
 */
export function getHandbooksSummary(catalog = HANDBOOKS_CATALOG) {
  let thCount = 0;
  let enCount = 0;
  catalog.forEach((h) => {
    if (h.editions?.th?.available) thCount += 1;
    if (h.editions?.en?.available) enCount += 1;
  });
  return {
    totalVolumes: catalog.length,
    thCount,
    enCount,
    totalFiles: thCount + enCount,
  };
}
