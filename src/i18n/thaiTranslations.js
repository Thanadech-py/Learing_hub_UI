import { THAI_PHYSICS_TOPICS, THAI_MATH_TOPICS } from './thaiTopicsPhysicsMath.js';
import { THAI_LINEAR_ALGEBRA_TOPICS, THAI_COMPROG_TOPICS } from './thaiTopicsLaComProg.js';
import { THAI_EQUATIONS_PHYSICS_PART1 } from './thaiEquationsPhysicsPart1.js';
import { THAI_EQUATIONS_PHYSICS_PART2 } from './thaiEquationsPhysicsPart2.js';
import { THAI_EQUATIONS_MATH } from './thaiEquationsMath.js';
import { THAI_EQUATIONS_LA, THAI_EQUATIONS_COMPROG } from './thaiEquationsLaComProg.js';

export const THAI_SUBJECT_META = {
  physics: {
    title: 'ฟิสิกส์ (Physics)',
    description:
      'สำรวจกลศาสตร์ การเคลื่อนที่ แรง พลังงาน คลื่น ของไหล และอุณหพลศาสตร์ พร้อมการจำลองโต้ตอบ 2D และ 3D',
    topics: {
      'units-and-measurement': {
        title: 'พื้นฐานฟิสิกส์และหน่วยวัด (Units & Measurement)',
        description: 'หน่วยมาตรฐาน SI การวิเคราะห์มิติ เลขนัยสำคัญ และความคลาดเคลื่อนจากการวัด',
      },
      kinematics: {
        title: 'การเคลื่อนที่ 1D และ 2D (Motion & Kinematics)',
        description: 'อธิบายการเคลื่อนที่แนวตรงและโพรเจกไทล์ด้วยการกระจัด ความเร็ว และความเร่ง',
      },
      'newtons-laws': {
        title: 'กฎการเคลื่อนที่ของนิวตัน (Newton\'s Laws)',
        description: 'ความเฉื่อย สมการแรงลัพธ์ F = ma แรงกิริยา–ปฏิกิริยา แรงเสียดทาน และพื้นเอียง',
      },
      'work-and-energy': {
        title: 'งานและพลังงาน (Work & Energy)',
        description: 'พลังงานจลน์ พลังงานศักย์โน้มถ่วงและสปริง ทฤษฎีบทงาน–พลังงาน และการอนุรักษ์พลังงานกล',
      },
      momentum: {
        title: 'โมเมนตัมและการชน (Momentum & Collisions)',
        description: 'การดล โมเมนตัมเชิงเส้น และกฎการอนุรักษ์โมเมนตัมในการชนแบบยืดหยุ่นและไม่ยืดหยุ่น',
      },
      'circular-motion': {
        title: 'การเคลื่อนที่แบบวงกลม (Circular Motion)',
        description: 'อัตราเร็วเชิงมุม ความเร่งสู่ศูนย์กลาง แรงสู่ศูนย์กลาง และความโน้มถ่วง',
      },
      oscillations: {
        title: 'การแกว่งกวัดและฮาร์มอนิกอย่างง่าย (Oscillations)',
        description: 'การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย (SHM) มวลติดสปริง ลูกตุ้ม และการสั่นพ้อง',
      },
      waves: {
        title: 'คลื่นกลและคลื่นเสียง (Waves & Acoustics)',
        description: 'สมบัติของคลื่น การซ้อนทับ การแทรกสอด คลื่นนิ่ง ความเข้มเสียง และดอปเพลอร์',
      },
      'fluid-mechanics': {
        title: 'กลศาสตร์ของไหล (Fluid Mechanics)',
        description: 'ความดันสถิต แรงพยุงอาร์คิมิดีส สมการความต่อเนื่อง และหลักของแบร์นูลลี',
      },
      thermodynamics: {
        title: 'การถ่ายโอนความร้อนและอุณหพลศาสตร์ (Thermodynamics)',
        description: 'ความร้อนจำเพาะ การนำ/การพา/การแผ่รังสี กฎแก๊สอุดมคติ และกฎของอุณหพลศาสตร์',
      },
    },
  },

  mathematics: {
    title: 'คณิตศาสตร์และแคลคูลัส (Mathematics)',
    description:
      'สร้างความเข้าใจเชิงภาพสำหรับฟังก์ชัน ตรีโกณมิติ ลิมิต อนุพันธ์ และเทคนิคการอินทิเกรตครบทุกหัวข้อ',
    topics: {
      'number-systems': {
        title: 'ระบบจำนวนและจำนวนเชิงซ้อน (Number Systems)',
        description: 'จำนวนนับ จำนวนเต็ม จำนวนตรรกยะ จำนวนจริง และจำนวนเชิงซ้อนในระนาบเชิงขั้ว',
      },
      'algebraic-expressions': {
        title: 'นิพจน์พีชคณิตและพหุนาม (Algebraic Expressions)',
        description: 'การจัดรูปพหุนาม การแยกตัวประกอบ สมการกำลังสอง และอสมการ',
      },
      functions: {
        title: 'ฟังก์ชันและกราฟ (Functions)',
        description: 'โดเมน เรนจ์ ฟังก์ชันประกอบ ฟังก์ชันผกผัน และการแปลงเลื่อนกราฟ',
      },
      trigonometry: {
        title: 'ตรีโกณมิติและวงกลมหนึ่งหน่วย (Trigonometry)',
        description: 'วงกลมหนึ่งหน่วย กราฟไซน์ โคไซน์ แทนเจนต์ และเอกลักษณ์ตรีโกณมิติ',
      },
      limits: {
        title: 'ลิมิตและความต่อเนื่อง (Limits & Continuity)',
        description: 'การเข้าใกล้ค่า ลิมิตซ้าย–ขวา รูปแบบยังไม่กำหนด 0/0 และความต่อเนื่องของฟังก์ชัน',
      },
      derivatives: {
        title: 'อนุพันธ์และการหาอนุพันธ์ (Derivatives)',
        description: 'อัตราการเปลี่ยนแปลงขณะใดๆ ความชันเส้นสัมผัส กฎการหาอนุพันธ์ และการหาค่าเหมาะที่สุด',
      },
      integrals: {
        title: 'ปริพันธ์และเทคนิคการอินทิเกรต (Integrals)',
        description: 'ผลบวกรีมันน์, FTC, การแทนค่า u, การอินทิเกรตทีละส่วน (IBP), เศษส่วนย่อย และการหาพื้นที่/ปริมาตร',
      },
    },
  },

  'linear-algebra': {
    title: 'พีชคณิตเชิงเส้น (Linear Algebra)',
    description:
      'มองเห็นเวกเตอร์ เมทริกซ์ การแปลงเชิงเส้นในปริภูมิ 3 มิติ และค่าไอเกนอย่างเป็นรูปธรรม',
    topics: {
      vectors: {
        title: 'เวกเตอร์ในปริภูมิ 2D และ 3D (Vectors)',
        description: 'ความหมายของเวกเตอร์ ขนาด ทิศทาง ผลคูณจุด (Dot Product) และผลคูณไขว้ (Cross Product)',
      },
      'linear-combinations': {
        title: 'ผลรวมเชิงเส้นและปริภูมิที่แผ่ได้ (Linear Combinations)',
        description: 'ผลรวมเชิงเส้น ปริภูมิที่แผ่ได้ (Span) ความเป็นอิสระเชิงเส้น และเวกเตอร์ฐานหลัก',
      },
      matrices: {
        title: 'เมทริกซ์และชนิดของเมทริกซ์ (Matrices)',
        description: 'สัญลักษณ์เมทริกซ์ การสลับเปลี่ยนแถว–หลัก (Transpose) เมทริกซ์สมมาตร และเมทริกซ์เอกลักษณ์',
      },
      'matrix-multiplication': {
        title: 'การคูณเมทริกซ์ (Matrix Multiplication)',
        description: 'การคูณเมทริกซ์ในมุมมองของการประกอบการแปลงเชิงเส้นต่อกัน',
      },
      'linear-transformations': {
        title: 'การแปลงเชิงเส้นในปริภูมิ (Linear Transformations)',
        description: 'การหมุน การยืดหด การสะท้อน การเฉือน และวิธีที่เมทริกซ์บิดปริภูมิ',
      },
      'systems-of-equations': {
        title: 'ระบบสมการเชิงเส้น (Systems of Linear Equations)',
        description: 'วิธีกำจัดแบบเกาส์ รูปขั้นบันไดตามแถว (REF/RREF) และโครงสร้างผลเฉลย',
      },
      determinants: {
        title: 'ดีเทอร์มิแนนต์ (Determinants)',
        description: 'อัตราส่วนการขยายพื้นที่และปริมาตรจากการแปลงเชิงเส้น และเกณฑ์เมทริกซ์ผกผัน',
      },
      'vector-spaces': {
        title: 'ปริภูมิเวกเตอร์และมิติ (Vector Spaces)',
        description: 'ปริภูมิหลักของเมทริกซ์ ฐานหลัก (Basis) มิติ และทฤษฎีบทแรงก์–นัลลิตี',
      },
      orthogonal: {
        title: 'การฉายเงาตั้งฉากและกำลังสองน้อยสุด (Projection & Least Squares)',
        description: 'การหาผลเฉลยประมาณที่ดีที่สุดเมื่อระบบสมการ Ax = b ไม่มีผลเฉลยตรงตัว',
      },
      'eigenvalues-and-eigenvectors': {
        title: 'ค่าไอเกนและเวกเตอร์ไอเกน (Eigenvalues & Eigenvectors)',
        description: 'ทิศทางแกนหลักที่ถูกยืดหรือหดโดยไม่เปลี่ยนแนวทิศทางภายใต้การแปลงเมทริกซ์',
      },
    },
  },

  'com-prog': {
    title: 'การเขียนโปรแกรมคอมพิวเตอร์ (Com-Prog)',
    description:
      'เรียนรู้การเขียนโปรแกรมภาษา Python และภาษา C แบบคู่มือ W3Schools พร้อมแผนภาพหน่วยความจำและ IDE ทดสอบโค้ดสด',
    topics: {
      'py-programming': {
        title: 'การเขียนโปรแกรมภาษาไพธอน (Python Programming)',
        description:
          'คู่มือและบทเรียนโต้ตอบ Python 3 ครบ 13 บท: PVM, ชนิดข้อมูล, ลูป, สตริง, List/Tuple/Dict/Set, ฟังก์ชัน LEGB, OOP และไฟล์',
      },
      'c-programming': {
        title: 'การเขียนโปรแกรมภาษาซี (C Programming)',
        description:
          'คู่มือและบทเรียนโต้ตอบ ISO C99/C11 ครบ 12 บท: สถาปัตยกรรมหน่วยความจำ, ผังงาน, อาร์เรย์, สตริง, ตัวชี้ (Pointers), Struct และ Heap',
      },
      mcu: {
        title: 'ไมโครคอนโทรลเลอร์และระบบสมองกลฝังตัว (Microcontroller)',
        description:
          'การเขียนโปรแกรมภาษา C/C++ สำหรับระบบฝังตัว รีจิสเตอร์ฮาร์ดแวร์ GPIO, Timer, PWM, Interrupt และ UART/I2C/SPI (กำลังพัฒนา)',
      },
      ros: {
        title: 'ระบบปฏิบัติการหุ่นยนต์ (ROS & ROS2)',
        description:
          'สถาปัตยกรรมโหนด Topics, Publishers/Subscribers, Services, Actions และการแปลงพิกัด TF2 (กำลังพัฒนา)',
      },
    },
  },
};

const ALL_THAI_TOPICS = {
  physics: THAI_PHYSICS_TOPICS,
  mathematics: THAI_MATH_TOPICS,
  'linear-algebra': THAI_LINEAR_ALGEBRA_TOPICS,
  'com-prog': THAI_COMPROG_TOPICS,
};

const ALL_THAI_EQUATIONS = {
  physics: {
    ...THAI_EQUATIONS_PHYSICS_PART1,
    ...THAI_EQUATIONS_PHYSICS_PART2,
  },
  mathematics: THAI_EQUATIONS_MATH,
  'linear-algebra': THAI_EQUATIONS_LA,
  'com-prog': THAI_EQUATIONS_COMPROG,
};

function mergeThaiEquations(baseEquations, thEquations) {
  if (!Array.isArray(baseEquations) || !Array.isArray(thEquations)) {
    return baseEquations;
  }
  return baseEquations.map((eq, idx) => {
    const thEq = thEquations[idx];
    if (!thEq) return eq;
    return {
      ...eq,
      name: thEq.name || eq.name,
      summary: thEq.summary || eq.summary,
      exampleDescription: thEq.exampleDescription || eq.exampleDescription,
      conditions: thEq.conditions?.length ? thEq.conditions : eq.conditions,
      variables: Array.isArray(eq.variables)
        ? eq.variables.map((v, vIdx) => {
            const thVar = thEq.variables?.[vIdx];
            if (!thVar) return v;
            return {
              ...v,
              name: thVar.name || v.name,
              description: thVar.description || v.description,
              connections: thVar.connections || v.connections,
            };
          })
        : eq.variables,
    };
  });
}

export function formatLevelBadge(level, lang) {
  if (lang !== 'th' || !level) return level;
  const normalized = level.toLowerCase();
  if (normalized === 'beginner') return 'ระดับเริ่มต้น (Beginner)';
  if (normalized === 'intermediate') return 'ระดับกลาง (Intermediate)';
  if (normalized === 'advanced') return 'ระดับสูง (Advanced)';
  if (normalized.includes('beginner')) return 'เริ่มต้น–ระดับกลาง';
  return level;
}

/**
 * Localizes a subject metadata object (used on Home, Sidebar, and SubjectPage).
 */
export function localizeSubject(subject, lang) {
  if (!subject || lang !== 'th') return subject;
  const thSubj = THAI_SUBJECT_META[subject.id];
  if (!thSubj) return subject;

  return {
    ...subject,
    title: thSubj.title || subject.title,
    description: thSubj.description || subject.description,
    topics: subject.topics.map((topic) => {
      const thTopic = thSubj.topics?.[topic.id];
      if (!thTopic) return topic;
      return {
        ...topic,
        title: thTopic.title || topic.title,
        description: thTopic.description || topic.description,
      };
    }),
  };
}

/**
 * Localizes a full topic data object (including overview, equations, keyConcepts, markdownBody, and subPages)
 * when Thai ('th') language mode is active.
 */
export function localizeTopicData(rawTopicData, subjectId, topicId, lang) {
  if (!rawTopicData || lang !== 'th') return rawTopicData;

  const subjectDict = ALL_THAI_TOPICS[subjectId];
  const thEntry = subjectDict?.[topicId];
  const eqDict = ALL_THAI_EQUATIONS[subjectId];
  const thEqEntry = eqDict?.[topicId];

  if (!thEntry && !thEqEntry) return rawTopicData;

  const localized = {
    ...rawTopicData,
    title: thEntry?.title || rawTopicData.title,
    subtitle: thEntry?.subtitle || rawTopicData.subtitle,
    estimatedTime: thEntry?.estimatedTime || rawTopicData.estimatedTime,
    overview: thEntry?.overview?.length ? thEntry.overview : rawTopicData.overview,
    markdownBody: thEntry?.markdownBody || rawTopicData.markdownBody,
    equations: mergeThaiEquations(
      rawTopicData.equations,
      thEqEntry?.equations || thEntry?.equations
    ),
  };

  if (thEntry?.keyConcepts?.length && Array.isArray(rawTopicData.keyConcepts)) {
    localized.keyConcepts = rawTopicData.keyConcepts.map((kc, idx) => {
      const thKc = thEntry.keyConcepts[idx];
      if (!thKc) return kc;
      return {
        ...kc,
        title: thKc.title || kc.title,
        content: thKc.content || kc.content,
      };
    });
  } else if (thEntry?.keyConcepts?.length) {
    localized.keyConcepts = thEntry.keyConcepts;
  }

  // Localize subPages if present
  if (Array.isArray(rawTopicData.subPages)) {
    localized.subPages = rawTopicData.subPages.map((sp) => {
      const thSp = thEntry?.subPages?.[sp.id];
      const thSpEq =
        thEqEntry?.subPages?.[sp.id]?.equations ||
        thEqEntry?.[sp.id]?.equations ||
        eqDict?.[sp.id]?.equations ||
        thSp?.equations;

      if (!thSp && !thSpEq) return sp;

      const mergedKeyConcepts =
        thSp?.keyConcepts?.length && Array.isArray(sp.keyConcepts)
          ? sp.keyConcepts.map((kc, idx) => {
              const thKc = thSp.keyConcepts[idx];
              if (!thKc) return kc;
              return {
                ...kc,
                title: thKc.title || kc.title,
                content: thKc.content || kc.content,
              };
            })
          : thSp?.keyConcepts || sp.keyConcepts;

      return {
        ...sp,
        title: thSp?.title || sp.title,
        subtitle: thSp?.subtitle || sp.subtitle,
        overview: thSp?.overview?.length ? thSp.overview : sp.overview,
        keyConcepts: mergedKeyConcepts,
        markdownBody: thSp?.markdownBody || sp.markdownBody,
        equations: mergeThaiEquations(sp.equations, thSpEq),
      };
    });
  }

  return localized;
}
