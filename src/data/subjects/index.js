/**
 * Subject registry.
 *
 * Each subject lives in its own file in this folder (e.g. physics.js) and
 * contains its metadata plus its `topics` array.
 *
 * TO ADD A NEW SUBJECT
 *   1. Copy an existing subject file (e.g. physics.js) and edit it.
 *   2. Import it below and add it to the `subjects` array.
 *   (Optional) add an icon for it in components/SubjectCard/SubjectIcon.jsx.
 *
 * The order of this array is the order shown on the Home page.
 */
import physics from './physics.js';
import mathematics from './mathematics.js';
import linearAlgebra from './linear-algebra.js';
import comProg from './com-prog.js';

const subjects = [physics, mathematics, linearAlgebra, comProg];

/** Find a subject by its URL id, e.g. getSubjectById('physics'). */
export function getSubjectById(id) {
  return subjects.find((subject) => subject.id === id);
}

export default subjects;
