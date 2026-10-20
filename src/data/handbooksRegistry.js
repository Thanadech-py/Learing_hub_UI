/**
 * Official Handbooks Registry
 * 
 * Houses metadata for all downloadable master reference handbooks copied into public/handbooks/
 * Strictly contains synthesized master handbooks (zero raw source textbook/slide distribution).
 */

export const HANDBOOKS_CATALOG = [
  // ==================== PHYSICS VOLUMES ====================
  {
    id: 'phy-01-kinematics',
    title: 'Physics Volume 1: Kinematics & 2D Motion Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 1: คู่มือจลนศาสตร์และการเคลื่อนที่ 2 มิติ',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['kinematics'],
    filename: 'Physics - 01 Kinematics & 2D Motion.pdf',
    downloadUrl: '/handbooks/physics/Physics - 01 Kinematics & 2D Motion.pdf',
    fileSize: '182 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Shankar & University Mechanics series',
    authorTh: 'สังเคราะห์จากตำรา Shankar และชุดคำสอนกลศาสตร์มหาวิทยาลัย',
    description: 'Vector calculus of motion, 1D SUVAT constant-acceleration equations, projectile flight trajectory, range & apex derivations, uniform/non-uniform circular kinematics, and Galilean relative motion.',
    descriptionTh: 'แคลคูลัสเวกเตอร์ของการเคลื่อนที่, สมการ SUVAT 1 มิติ, การเคลื่อนที่แบบโพรเจกไทล์, การพิสูจน์ระยะทางสูงสุดและแนวยิง, จลนศาสตร์การหมุน และการแปลงกรอบอ้างอิงสัมพัทธ์ของกาลิเลโอ',
    tags: ['Kinematics', 'SUVAT', 'Projectile Motion', 'Trajectory', 'Galilean Transformation']
  },
  {
    id: 'phy-02-newtons-laws',
    title: "Physics Volume 2: Newton's Laws & Classical Dynamics Handbook",
    titleTh: 'ฟิสิกส์ เล่ม 2: คู่มือกฎการเคลื่อนที่ของนิวตันและพลศาสตร์คลาสสิก',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['newtons-laws'],
    filename: "Physics - 02 Newton's Laws & Dynamics.pdf",
    downloadUrl: "/handbooks/physics/Physics - 02 Newton's Laws & Dynamics.pdf",
    fileSize: '301 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Halliday-Resnick & Shankar Mechanics',
    authorTh: 'สังเคราะห์จาก Halliday-Resnick และ Shankar Mechanics',
    description: "Inertial reference frames, vector formulation of Newton's three laws, systematic free-body diagram isolation, Coulomb-Amontons friction, inclined planes, and multi-body Atwood pulley mechanics.",
    descriptionTh: 'กรอบอ้างอิงเฉื่อย, เวกเตอร์กฎสามข้อของนิวตัน, วิธีการเขียนแผนภาพอิสระ (FBD) อย่างเป็นระบบ, แรงเสียดทานคูลอมบ์, พลศาสตร์พื้นเอียง และกลไกระบบรอกหลายมวล (Atwood Machines)',
    tags: ["Newton's Laws", 'Free-Body Diagrams', 'Friction', 'Inclined Plane', 'Atwood Machine']
  },
  {
    id: 'phy-03-work-energy',
    title: 'Physics Volume 3: Work, Energy & Momentum Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 3: คู่มืองาน พลังงาน และโมเมนตัมเชิงเส้น',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['work-and-energy', 'momentum'],
    filename: 'Physics - 03 Work, Energy & Momentum.pdf',
    downloadUrl: '/handbooks/physics/Physics - 03 Work, Energy & Momentum.pdf',
    fileSize: '166 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from University Physics & Yale Open Physics',
    authorTh: 'สังเคราะห์จากชุดคำสอนฟิสิกส์มหาวิทยาลัยและ Yale Open Physics',
    description: 'Work line integrals, Work-Kinetic Energy Theorem, conservative fields and potential energy landscapes, impulse-momentum theorem, 1D/2D collisions with coefficient of restitution, and variable-mass rocket propulsion.',
    descriptionTh: 'อินทิกรัลเส้นของงาน, ทฤษฎีบทงาน-พลังงานจลน์, สนามอนุรักษ์และกราฟพลังงานศักย์, การดลและโมเมนตัม, การชน 1 และ 2 มิติด้วยสัมประสิทธิ์การคืนสภาพ (e) และสมการจรวดมวลแปรผัน',
    tags: ['Work', 'Kinetic Energy', 'Potential Energy', 'Momentum', 'Collisions', 'Rocket Equation']
  },
  {
    id: 'phy-04-rotational',
    title: 'Physics Volume 4: Rotational Dynamics & Angular Momentum Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 4: คู่มือพลศาสตร์การหมุนและโมเมนตัมเชิงมุม',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['circular-motion'],
    filename: 'Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
    downloadUrl: '/handbooks/physics/Physics - 04 Rotational Dynamics & Angular Momentum.pdf',
    fileSize: '144 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Halliday-Resnick & University Physics',
    authorTh: 'สังเคราะห์จาก Halliday-Resnick และฟิสิกส์วิศวกรรมมหาวิทยาลัย',
    description: 'Rotational kinematics, moment of inertia integrals, Parallel Axis Theorem, torque and Newton second law for rotation, rolling without slipping, vector angular momentum conservation, and gyroscopic precession.',
    descriptionTh: 'จลนศาสตร์การหมุน, การอินทิเกรตโมเมนต์ความเฉื่อย, ทฤษฎีบทแกนขนาน, ทอร์กและกฎข้อสองของการหมุน, การกลิ้งโดยไม่ไถล, การอนุรักษ์โมเมนตัมเชิงมุม และการส่ายไจโรสโคป',
    tags: ['Rotation', 'Moment of Inertia', 'Torque', 'Rolling Without Slipping', 'Angular Momentum', 'Gyroscopes']
  },
  {
    id: 'phy-05-elasticity',
    title: 'Physics Volume 5: Elasticity & Modulus of Materials Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 5: คู่มือความยืดหยุ่นและมอดุลัสของวัสดุ',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['elasticity'],
    filename: 'Physics - 05 Elasticity & Modulus of Materials.pdf',
    downloadUrl: '/handbooks/physics/Physics - 05 Elasticity & Modulus of Materials.pdf',
    fileSize: '220 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from University Mechanics & Materials Science references',
    authorTh: 'สังเคราะห์จากคำสอนกลศาสตร์วัสดุและวิศวกรรมวัสดุมหาวิทยาลัย',
    description: "Stress-strain curves, Young's modulus, shear modulus, bulk modulus, Poisson's ratio, elastic potential energy density, coupled thermal-mechanical stresses, and fast-track scaling shortcuts.",
    descriptionTh: 'กราฟความเค้น-ความเครียด, มอดุลัสของยัง, มอดุลัสเฉือน, มอดุลัสเชิงปริมาตร, อัตราส่วนปัวซง, ความหนาแน่นพลังงานความเครียด, ความเค้นจากอุณหภูมิ และสูตรลัดวิศวกรรม',
    tags: ['Elasticity', 'Young Modulus', 'Shear Modulus', 'Bulk Modulus', 'Poisson Ratio', 'Thermal Stress']
  },
  {
    id: 'phy-06-fluid',
    title: 'Physics Volume 6: Fluid Mechanics: Hydrostatics, Potential Dynamics & Viscous Transport Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 6: คู่มือกลศาสตร์ของไหล สถิตศาสตร์ของไหล จลนศาสตร์ และการไหลหนืด',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['fluid-mechanics'],
    filename: 'Physics - 06 Fluid Mechanics.pdf',
    downloadUrl: '/handbooks/physics/Physics - 06 Fluid Mechanics.pdf',
    fileSize: '197 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Shankar Physics & University Fluid Dynamics series',
    authorTh: 'สังเคราะห์จากตำรา Shankar และฟิสิกส์ของไหลระดับมหาวิทยาลัย',
    description: "Hydrostatic pressure fields, Pascal's principle, Archimedes buoyancy, volumetric continuity, Bernoulli principle & applications (Venturi meter, Torricelli efflux, Pitot tube), Hagen-Poiseuille flow, and Reynolds number.",
    descriptionTh: 'ความดันสถิตของไหล, หลักการของปาสกาล, แรงลอยตัวอาร์คิมิดีส, สมการความต่อเนื่อง, สมการแบร์นูลลีและการประยุกต์ (ท่อเวนจูรี, กฎทอร์ริเชลลี, หลอดปีโตต์), การไหลหนืดของปัวซอยล์ และตัวเลขเรย์โนลด์',
    tags: ['Fluids', 'Hydrostatics', 'Bernoulli', 'Buoyancy', 'Torricelli', 'Poiseuille', 'Reynolds Number']
  },
  {
    id: 'phy-07-oscillations',
    title: 'Physics Volume 7: Oscillations & Simple Harmonic Motion Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 7: คู่มือการสั่นและการเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['oscillations'],
    filename: 'Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
    downloadUrl: '/handbooks/physics/Physics - 07 Oscillations & Simple Harmonic Motion.pdf',
    fileSize: '781 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Yale Open Physics (Shankar) & University Physics',
    authorTh: 'สังเคราะห์จาก Yale Open Physics (Shankar) และฟิสิกส์มหาวิทยาลัย',
    description: 'Kinematics and differential equations of SHM, spring-mass systems, simple, physical and torsion pendulums, mechanical energy oscillation, damped harmonic decay, quality factor, and driven resonance curves.',
    descriptionTh: 'จลนศาสตร์และสมการเชิงอนุพันธ์ของ SHM, ระบบมวลติดสปริง, ลูกตุ้มอย่างง่าย ลูกตุ้มกายภาพ และลูกตุ้มบิด, การแปลงผันพลังงานกล, การสั่นแบบหน่วง แฟกเตอร์คุณภาพ และเรโซแนนซ์จากการสั่นถูกบังคับ',
    tags: ['Oscillations', 'Simple Harmonic Motion', 'Pendulums', 'Damping', 'Resonance', 'Q-Factor']
  },
  {
    id: 'phy-08-waves',
    title: 'Physics Volume 8: Waves & Sound Acoustics Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 8: คู่มือคลื่นกลและสวนศาสตร์ของเสียง',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['waves'],
    filename: 'Physics - 08 Waves & Sound.pdf',
    downloadUrl: '/handbooks/physics/Physics - 08 Waves & Sound.pdf',
    fileSize: '283 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from University Wave Physics & Acoustic Engineering series',
    authorTh: 'สังเคราะห์จากชุดคำสอนฟิสิกส์คลื่นและวิศวกรรมสวนศาสตร์',
    description: '1D classical wave equation, transverse wave speed on tensioned strings, acoustic speed in gas, sound intensity & decibel dB scale, Doppler frequency shift kinematics, standing resonant modes in strings/pipes, and acoustic beats.',
    descriptionTh: 'สมการคลื่นคลาสสิก 1 มิติ, ความเร็วคลื่นในเส้นเชือกขึงตึง, อัตราเร็วเสียงในก๊าซ, ความเข้มเสียงและระดับความเข้มในหน่วยเดซิเบล (dB), ปรากฏการณ์ดอปเปลอร์, โหมดการสั่นพ้องในสายและท่อลม และบีตของเสียง',
    tags: ['Waves', 'Sound', 'Wave Equation', 'Decibel Scale', 'Doppler Effect', 'Resonant Modes', 'Acoustic Beats']
  },
  {
    id: 'phy-09-thermo',
    title: 'Physics Volume 9: Thermodynamics & Heat Transfer Handbook',
    titleTh: 'ฟิสิกส์ เล่ม 9: คู่มืออุณหพลศาสตร์และการถ่ายโอนความร้อน',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['thermodynamics'],
    filename: 'Physics - 09 Thermodynamics & Heat Transfer.pdf',
    downloadUrl: '/handbooks/physics/Physics - 09 Thermodynamics & Heat Transfer.pdf',
    fileSize: '286 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Shankar Fundamentals & University Thermal Physics',
    authorTh: 'สังเคราะห์จากตำรา Shankar และฟิสิกส์เชิงความร้อนมหาวิทยาลัย',
    description: "Thermal expansion and stress, calorimetry, Fourier conduction, Newton's law of cooling, Stefan-Boltzmann radiation, First Law and 4 ideal gas processes (isobaric, isochoric, isothermal, adiabatic), Carnot cycle, heat pumps, and entropy.",
    descriptionTh: 'การขยายตัวจากความร้อน, แคลอริมิเตอร์, การนำความร้อนฟูเรียร์, การพาความร้อน, การแผ่รังสีสเตฟาน-โบลต์ซมันน์, กฎข้อหนึ่งและ 4 กระบวนการก๊าซอุดมคติ, วัฏจักรคาร์โนต์, ประสิทธิภาพเครื่องทำความเย็น และเอนโทรปี',
    tags: ['Thermodynamics', 'Heat Transfer', 'Conduction', 'Radiation', 'Carnot Cycle', 'Entropy', 'Ideal Gas']
  },
  {
    id: 'phy-master-formula',
    title: 'Physics: Comprehensive Master Formula Sheet & Constants Handbook',
    titleTh: 'ฟิสิกส์: เอกสารรวมสูตรหลักและค่าคงที่พื้นฐานฉบับสมบูรณ์',
    subjectId: 'physics',
    subjectName: 'Physics',
    subjectNameTh: 'ฟิสิกส์',
    topicIds: ['units-and-measurement', 'kinematics', 'newtons-laws', 'work-and-energy', 'momentum', 'circular-motion', 'elasticity', 'oscillations', 'waves', 'fluid-mechanics', 'thermodynamics'],
    filename: 'Physics - Comprehensive Master Formula Sheet & Constants.pdf',
    downloadUrl: '/handbooks/physics/Physics - Comprehensive Master Formula Sheet & Constants.pdf',
    fileSize: '135 KB',
    badge: 'Master Compendium',
    badgeTh: 'เอกสารรวมสูตรหลัก',
    author: 'University Physics Faculty Standards & Learning Hub Repository',
    authorTh: 'มาตรฐานวิชาการฟิสิกส์มหาวิทยาลัยและ Learning Hub Repository',
    description: 'Official master compendium of university physics equations: fundamental physical constants, standard SI units, kinematics, dynamics, energy, momentum, rotation, elasticity, fluids, oscillations, waves, and thermal physics.',
    descriptionTh: 'คลังสูตรทางการครอบคลุมทุกหมวดหมู่วิชาฟิสิกส์มหาวิทยาลัย: ค่าคงที่ทางฟิสิกส์พื้นฐาน หน่วยเอสไอมาตรฐาน กลศาสตร์ จลนศาสตร์ แรง พลังงาน โมเมนตัม การหมุน ความยืดหยุ่น ของไหล คลื่น และความร้อน',
    tags: ['Master Formula Sheet', 'Physical Constants', 'SI Units', 'Mechanics', 'Waves', 'Thermodynamics']
  },

  // ==================== LINEAR ALGEBRA VOLUMES ====================
  {
    id: 'la-01-vectors',
    title: 'Linear Algebra Volume 1: Vectors & Linear Combinations Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 1: คู่มือเวกเตอร์และผลรวมเชิงเส้น',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['vectors', 'linear-combinations'],
    filename: 'Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra - 01 Vectors & Linear Combinations.pdf',
    fileSize: '173 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Gilbert Strang & MIT 18.06',
    authorTh: 'สังเคราะห์จากตำรา Gilbert Strang และ MIT 18.06',
    description: 'Geometric and algebraic vectors in ℝⁿ, linear combinations, vector span, linear independence tests, dot products, vector norms, and Cauchy-Schwarz / triangle inequalities.',
    descriptionTh: 'เวกเตอร์เชิงเรขาคณิตและพีชคณิตใน ℝⁿ, ผลรวมเชิงเส้น, การแผ่ของเวกเตอร์ (Span), การทดสอบความเป็นอิสระเชิงเส้น, ผลคูณจุด (Dot Product), นอร์ม และอสมการโคชี-ชวาร์ซ',
    tags: ['Vectors', 'Linear Combinations', 'Span', 'Linear Independence', 'Dot Product', 'Norms']
  },
  {
    id: 'la-02-solving-elimination',
    title: 'Linear Algebra Volume 2: Solving Linear Equations & Elimination Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 2: คู่มือการแก้ระบบสมการเชิงเส้นและการกำจัด',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['systems-of-equations', 'matrices', 'matrix-multiplication'],
    filename: 'Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra - 02 Solving Linear Equations & Elimination.pdf',
    fileSize: '188 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Gilbert Strang & Numerical Linear Algebra',
    authorTh: 'สังเคราะห์จากตำรา Gilbert Strang และการคำนวณเชิงตัวเลข',
    description: 'Systematic Gaussian elimination, pivot selection, row echelon form (REF/RREF), matrix multiplication row/column perspectives, matrix inverses, and LU factorization without pivoting.',
    descriptionTh: 'การกำจัดแบบเกาส์อย่างเป็นระบบ, การเลือกไพวอต, รูปแบบขั้นบันไดแถว (REF/RREF), มุมมองการคูณเมทริกซ์แบบแถวและคอลัมน์, เมทริกซ์ผกผัน และการแยกตัวประกอบ A = LU',
    tags: ['Linear Systems', 'Gaussian Elimination', 'Pivots', 'RREF', 'Matrix Inverse', 'LU Decomposition']
  },
  {
    id: 'la-03-vector-spaces',
    title: 'Linear Algebra Volume 3: Vector Spaces & Fundamental Subspaces Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 3: คู่มือปริภูมิเวกเตอร์และ 4 ปริภูมิย่อยหลัก',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['vector-spaces'],
    filename: 'Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra - 03 Vector Spaces & Subspaces.pdf',
    fileSize: '184 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Gilbert Strang & MIT Linear Algebra series',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และชุดบรรยาย MIT',
    description: 'Vector spaces and subspaces, span, basis and dimension, the Four Fundamental Subspaces (Column Space C(A), Nullspace N(A), Row Space C(Aᵀ), Left Nullspace N(Aᵀ)), and the Rank-Nullity Theorem.',
    descriptionTh: 'ปริภูมิเวกเตอร์และปริภูมิย่อย, ฐานหลักและมิติ, สี่ปริภูมิย่อยพื้นฐาน (Column Space, Nullspace, Row Space, Left Nullspace) และทฤษฎีบทแรงก์-นัลลิตี (Rank-Nullity Theorem)',
    tags: ['Vector Spaces', 'Subspaces', 'Basis', 'Dimension', 'Four Subspaces', 'Rank-Nullity']
  },
  {
    id: 'la-04-determinants',
    title: "Linear Algebra Volume 4: Determinants & Cramer's Rule Handbook",
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 4: คู่มือดีเทอร์มิแนนต์และกฎของคราเมอร์',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['determinants'],
    filename: "Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
    downloadUrl: "/handbooks/linear-algebra/Linear-Algebra - 04 Determinants & Cramer's Rule.pdf",
    fileSize: '200 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Gilbert Strang & Classical Linear Algebra',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และตำราพีชคณิตเชิงเส้นคลาสสิก',
    description: 'Properties of determinants, pivot formula, cofactor expansion, geometric volume scaling factor, matrix inverse formula via adjugate, and Cramer rule for exact analytic solutions.',
    descriptionTh: 'สมบัติของดีเทอร์มิแนนต์, สูตรผลคูณไพวอต, การกระจายโคแฟกเตอร์, อัตราส่วนการขยายปริมาตรเชิงเรขาคณิต, สูตรเมทริกซ์ผกผันผ่านเมทริกซ์ผูกพัน (Adjugate) และกฎของคราเมอร์',
    tags: ['Determinants', 'Volume Scaling', 'Cofactor Expansion', 'Adjugate', "Cramer's Rule"]
  },
  {
    id: 'la-05-linear-transformations',
    title: 'Linear Algebra Volume 5: Linear Transformations & Change of Basis Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 5: คู่มือการแปลงเชิงเส้นและการเปลี่ยนฐานหลัก',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['linear-transformations'],
    filename: 'Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra - 05 Linear Transformations & Change of Basis.pdf',
    fileSize: '233 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Gilbert Strang & Geometric Linear Algebra',
    authorTh: 'สังเคราะห์จาก Gilbert Strang และพีชคณิตเชิงเส้นเรขาคณิต',
    description: 'Linear mappings T: V → W, matrix representations with respect to bases, rotation, reflection, scaling and shear matrices in 2D and 3D, change of basis matrices, and similarity transformations.',
    descriptionTh: 'การส่งเชิงเส้น T: V → W, เมทริกซ์ของการแปลงเทียบกับฐานหลัก, เมทริกซ์การหมุน การสะท้อน การขยาย และการเฉือนใน 2D และ 3D, การเปลี่ยนฐานหลัก และการแปลงคล้าย (Similarity)',
    tags: ['Linear Transformations', 'Change of Basis', 'Rotation Matrices', 'Shear', 'Similarity']
  },
  {
    id: 'la-orthogonality',
    title: 'Linear Algebra Volume 6: Orthogonality & Projections Master Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 6: คู่มือเจาะลึกความตั้งฉากและการฉายเวกเตอร์',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['orthogonal'],
    filename: 'Linear-Algebra-Orthogonality-Master.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra-Orthogonality-Master.pdf',
    fileSize: '146 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Strang & TUDelft references',
    authorTh: 'สังเคราะห์จากเอกสารอ้างอิง Strang & TUDelft',
    description: 'Comprehensive handbook covering Orthogonal Subspaces, Projection Matrices, Normal Equations, Least Squares Regression, Gram-Schmidt Orthogonalization, and QR Factorization.',
    descriptionTh: 'คู่มือสรุปเนื้อหาแบบสมบูรณ์ ครอบคลุมปริภูมิย่อยตั้งฉาก เมทริกซ์การฉาย สมการปรกติ (Normal Equations) วิธีกำลังสองน้อยที่สุด กระบวนการ Gram-Schmidt และการแยกตัวประกอบ QR',
    tags: ['Orthogonality', 'Projection', 'Least Squares', 'Gram-Schmidt', 'QR Factorization']
  },
  {
    id: 'la-eigenvalues',
    title: 'Linear Algebra Volume 7: Eigenvalues & Matrix Decompositions Master Handbook',
    titleTh: 'พีชคณิตเชิงเส้น เล่ม 7: คู่มือเจาะลึกไอเกนแวลูและการแปลงรูปเมทริกซ์',
    subjectId: 'linear-algebra',
    subjectName: 'Linear Algebra',
    subjectNameTh: 'พีชคณิตเชิงเส้น',
    topicIds: ['eigenvalues-and-eigenvectors', 'diagonalization', 'symmetric-matrices', 'positive-definite', 'svd'],
    filename: 'Linear-Algebra-Eigenvalues-Master.pdf',
    downloadUrl: '/handbooks/linear-algebra/Linear-Algebra-Eigenvalues-Master.pdf',
    fileSize: '128 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized from Strang & MIT Linear Algebra series',
    authorTh: 'สังเคราะห์จากเอกสารอ้างอิง Strang & MIT 18.06',
    description: 'In-depth handbook on Eigenvalues, Eigenvectors, Diagonalization (A = XΛX⁻¹), Matrix Powers, Fibonacci, Real Symmetric Matrices, Spectral Theorem, Positive Definiteness, and SVD.',
    descriptionTh: 'คู่มือเจาะลึกไอเกนแวลูและไอเกนเวกเตอร์ การแปลงเมทริกซ์ทแยงมุม เลขยกกำลังเมทริกซ์ ลำดับฟีโบนัชชี เมทริกซ์สมมาตร ทฤษฎีบทสเปกตรัล เมทริกซ์บวกแน่นอน (Positive Definite) และ SVD',
    tags: ['Eigenvalues', 'Diagonalization', 'Spectral Theorem', 'Positive Definite', 'SVD']
  },

  // ==================== COMPUTER PROGRAMMING ====================
  {
    id: 'cp-c-programming',
    title: 'C Programming: Master Syntax & Systems Handbook',
    titleTh: 'การเขียนโปรแกรมภาษา C: คู่มือไวยากรณ์และสถาปัตยกรรมระบบ',
    subjectId: 'com-prog',
    subjectName: 'Computer Programming',
    subjectNameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    topicIds: ['c-programming'],
    filename: 'C-Programming-Master-Handbook.pdf',
    downloadUrl: '/handbooks/com-prog/C-Programming-Master-Handbook.pdf',
    fileSize: '230 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized Engineering Reference',
    authorTh: 'คู่มืออ้างอิงเชิงวิศวกรรม',
    description: 'Essential engineering guide to C programming: syntax, data types, control flow, functions, arrays, memory pointers, struct architectures, and system compilation.',
    descriptionTh: 'คู่มือวิศวกรรมการเขียนโปรแกรม C: ไวยากรณ์ ชนิดข้อมูล การควบคุมลูปและเงื่อนไข ฟังก์ชัน อาร์เรย์ พอยน์เตอร์หน่วยความจำ สตรักต์ และกระบวนการคอมไพล์ระดับระบบ',
    tags: ['C Language', 'Pointers', 'Memory Management', 'Structures', 'Compilation']
  },
  {
    id: 'cp-python-programming',
    title: 'Python Programming: Modern Syntax & Applications Handbook',
    titleTh: 'การเขียนโปรแกรมภาษา Python: คู่มือไวยากรณ์สมัยใหม่และการประยุกต์ใช้',
    subjectId: 'com-prog',
    subjectName: 'Computer Programming',
    subjectNameTh: 'การเขียนโปรแกรมคอมพิวเตอร์',
    topicIds: ['py-programming'],
    filename: 'Python-Programming-Master-Handbook.pdf',
    downloadUrl: '/handbooks/com-prog/Python-Programming-Master-Handbook.pdf',
    fileSize: '185 KB',
    badge: 'Master Document',
    badgeTh: 'เอกสารสรุปหลัก',
    author: 'Synthesized Engineering Reference',
    authorTh: 'คู่มืออ้างอิงเชิงวิศวกรรม',
    description: 'Practical guide covering Python core syntax, data structures (lists, tuples, dicts), functions, object-oriented programming, modules, and scientific scripting.',
    descriptionTh: 'คู่มือปฏิบัติการ Python ครอบคลุมไวยากรณ์หลัก โครงสร้างข้อมูล (List, Dict, Tuple, Set) ฟังก์ชัน การเขียนโปรแกรมเชิงวัตถุ (OOP) โมดูล และการประยุกต์ใช้ในการคำนวณทางวิศวกรรม',
    tags: ['Python', 'OOP', 'Data Structures', 'Functions', 'Engineering Scripting']
  }
];

/**
 * Find handbooks relevant to a specific topic ID
 */
export function getHandbooksByTopic(topicId) {
  if (!topicId) return [];
  return HANDBOOKS_CATALOG.filter(h => h.topicIds && h.topicIds.includes(topicId));
}

/**
 * Find the primary handbook for a specific topic ID (or null)
 */
export function getPrimaryHandbookForTopic(topicId) {
  const matches = getHandbooksByTopic(topicId);
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Find handbooks by subject ID
 */
export function getHandbooksBySubject(subjectId) {
  if (!subjectId || subjectId === 'all') return HANDBOOKS_CATALOG;
  return HANDBOOKS_CATALOG.filter(h => h.subjectId === subjectId);
}

/**
 * Return all registered handbooks
 */
export function getAllHandbooks() {
  return HANDBOOKS_CATALOG;
}
