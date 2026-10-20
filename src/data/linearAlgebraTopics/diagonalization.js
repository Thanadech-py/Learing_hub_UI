/**
 * Linear Algebra Topic: Matrix Diagonalization, Powers & Dynamical Systems
 * Synthesized from Gilbert Strang (5th Ed., Chapters 6) & Kenji Hiranabe (Pattern P4)
 */
const diagonalizationData = {
  id: 'diagonalization',
  title: 'Matrix Diagonalization & Powers',
  subtitle:
    'Decomposing A = XΛX⁻¹, fast matrix powers Aᵏ, discrete Fibonacci recurrence, Markov chains, and continuous differential systems du/dt = Au.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'When an n × n matrix A has n linearly independent eigenvectors x₁, x₂, ..., xₙ, we can place them into the columns of an eigenvector matrix X. Multiplying AX yields [Ax₁ Ax₂ ... Axₙ] = [λ₁x₁ λ₂x₂ ... λₙxₙ] = XΛ, where Λ is the diagonal matrix of eigenvalues.',
    'Because X has linearly independent columns, X is invertible, leading to the central factorizations: A = XΛX⁻¹ and Λ = X⁻¹AX. Diagonalization uncouples matrix interactions, reducing complex coupled operations into pure independent scalar scalings.',
    'This factorization makes matrix powers effortless: Aᵏ = (XΛX⁻¹)...(XΛX⁻¹) = XΛᵏX⁻¹, where Λᵏ simply raises the diagonal eigenvalues to the k-th power (diag(λ₁ᵏ, ..., λₙᵏ)). This unlocks exact closed-form solutions for Fibonacci sequences, Markov transition equilibria, and systems of linear differential equations du/dt = Au.',
  ],
  keyConcepts: [
    {
      title: 'The Diagonalization Theorem: A = XΛX⁻¹',
      content:
        'An n × n matrix A can be diagonalized if and only if it has n linearly independent eigenvectors. Any matrix with n distinct eigenvalues (λᵢ ≠ λⱼ) is automatically diagonalizable. The columns of X are the eigenvectors, and the diagonal entries of Λ are the matching eigenvalues in the same order.',
      exampleLabel: 'Worked Diagonalization Decomposition for A = [[4, 1], [2, 3]]',
      latex:
        'A = X\\Lambda X^{-1} = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix} \\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}^{-1}',
      exampleNote:
        'Notice that multiplying X⁻¹AX eliminates all off-diagonal coupling terms, leaving pure eigenvalues on the diagonal.',
    },
    {
      title: 'Fast Matrix Powers Aᵏ = XΛᵏX⁻¹ & Asymptotic Dominance',
      content:
        'To compute A¹⁰⁰ by hand, instead of performing 99 tedious matrix multiplications, we compute X diag(λ₁¹⁰⁰, λ₂¹⁰⁰) X⁻¹. As k → ∞, the trajectory uₖ = Aᵏu₀ is entirely dominated by the largest eigenvalue in magnitude (|λ₁| > |λ₂|), aligning uₖ along the dominant eigenvector x₁!',
      exampleLabel: 'Powers Formula',
      latex:
        'A^k = X \\begin{bmatrix} \\lambda_1^k & 0 \\\\ 0 & \\lambda_2^k \\end{bmatrix} X^{-1} = \\lambda_1^k \\frac{\\mathbf{x}_1 \\mathbf{y}_1^T}{\\mathbf{y}_1^T \\mathbf{x}_1} + \\lambda_2^k \\frac{\\mathbf{x}_2 \\mathbf{y}_2^T}{\\mathbf{y}_2^T \\mathbf{x}_2}',
      exampleNote:
        'If |λ₁| > 1, the system explodes; if |λ₁| < 1, it decays to 0; if λ₁ = 1 and |λ₂| < 1, it converges to a steady state (Markov chain).',
    },
    {
      title: 'Discrete Dynamical Systems: The Fibonacci Sequence Matrix',
      content:
        'The Fibonacci relation Fₖ₊₂ = Fₖ₊₁ + Fₖ can be written as a 2×2 matrix step: uₖ₊₁ = Auₖ where A = [[1, 1], [1, 0]]. The eigenvalues of A are the golden ratio φ = (1 + √5)/2 ≈ 1.618 and (1 − √5)/2 ≈ −0.618, proving Binet formula Fₖ = (φᵏ − (1−φ)ᵏ)/√5 directly from A = XΛX⁻¹!',
      exampleLabel: 'Fibonacci Matrix State Equation',
      latex:
        '\\begin{bmatrix} F_{k+1} \\\\ F_k \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix}^k \\begin{bmatrix} F_1 \\\\ F_0 \\end{bmatrix} = X \\begin{bmatrix} \\varphi^k & 0 \\\\ 0 & (1-\\varphi)^k \\end{bmatrix} X^{-1} \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}',
      exampleNote:
        'Since |1 − φ| < 1, (1 − φ)ᵏ decays exponentially to 0, meaning Fₖ is simply the closest integer to φᵏ / √5.',
    },
    {
      title: 'Continuous Systems: Solving du/dt = Au via Matrix Exponential',
      content:
        'For coupled differential equations du/dt = Au, substituting u = Xv diagonalizes the system into independent scalar equations dv/dt = Λv, whose solutions are vᵢ(t) = cᵢ e^{λᵢ t}. Recombining gives u(t) = e^{At}u(0) = c₁ e^{λ₁ t}x₁ + c₂ e^{λ₂ t}x₂.',
      exampleLabel: 'Exponential Decoupling',
      latex:
        '\\frac{d\\mathbf{u}}{dt} = A\\mathbf{u} \\implies \\mathbf{u}(t) = e^{At}\\mathbf{u}(0) = X e^{\\Lambda t} X^{-1}\\mathbf{u}(0) = \\sum_{i=1}^n c_i e^{\\lambda_i t}\\mathbf{x}_i',
      exampleNote:
        'System stability: stable if Re(λᵢ) < 0 for all i (trajectories spiral into origin), saddle if eigenvalues have opposite signs.',
    },
  ],
  equations: [
    {
      name: 'Matrix Diagonalization & Similarity Factorization',
      latex: 'A = X \\Lambda X^{-1} \\iff \\Lambda = X^{-1} A X, \\quad X = [\\mathbf{x}_1 \\; \\mathbf{x}_2 \\; \\dots \\; \\mathbf{x}_n]',
      summary:
        'Expresses matrix A in terms of its eigenvector basis matrix X and diagonal eigenvalue matrix Λ.',
      exampleDescription: 'Checking AX = XΛ for 2×2 system',
      exampleLatex:
        'A X = A \\begin{bmatrix} \\mathbf{x}_1 & \\mathbf{x}_2 \\end{bmatrix} = \\begin{bmatrix} \\lambda_1\\mathbf{x}_1 & \\lambda_2\\mathbf{x}_2 \\end{bmatrix} = \\begin{bmatrix} \\mathbf{x}_1 & \\mathbf{x}_2 \\end{bmatrix} \\begin{bmatrix} \\lambda_1 & 0 \\\\ 0 & \\lambda_2 \\end{bmatrix} = X \\Lambda',
      conditions: ['A must possess n linearly independent eigenvectors (non-defective)'],
      variables: [
        {
          symbol: 'X',
          name: 'Eigenvector Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Matrix whose columns are the n linearly independent eigenvectors of A.',
          connections: 'Invertible (det(X) ≠ 0) when all eigenvectors are linearly independent.',
        },
        {
          symbol: '\\Lambda',
          name: 'Eigenvalue Diagonal Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Diagonal matrix holding eigenvalues λ₁, ..., λₙ along the main diagonal.',
          connections: 'Powers Λᵏ = diag(λ₁ᵏ, ..., λₙᵏ) require only n scalar power computations.',
        },
      ],
    },
    {
      name: 'Discrete Power Evolution & Continuous Exponential Solution',
      latex: '\\mathbf{u}_k = A^k \\mathbf{u}_0 = X \\Lambda^k X^{-1} \\mathbf{u}_0, \\qquad \\mathbf{u}(t) = e^{At}\\mathbf{u}_0 = X e^{\\Lambda t} X^{-1} \\mathbf{u}_0',
      summary:
        'Closed-form trajectories for discrete matrix iterations and continuous linear dynamical systems.',
      exampleDescription: 'Decay, Steady State, or Growth determined by eigenvalue magnitudes',
      exampleLatex:
        '|\\lambda_i| < 1 \\implies \\lambda_i^k \\to 0, \\quad \\lambda_1 = 1 \\implies \\text{steady state}, \\quad \\text{Re}(\\lambda_i) < 0 \\implies e^{\\lambda_i t} \\to 0',
      conditions: ['X is invertible'],
      variables: [
        {
          symbol: 'A^k',
          name: 'Matrix Power',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'The k-step transition operator for discrete time systems.',
          connections: 'Computed instantly as X Λᵏ X⁻¹ rather than repeated matrix multiplication.',
        },
        {
          symbol: 'e^{At}',
          name: 'Matrix Exponential',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'The continuous-time state transition matrix: I + At + (At)²/2! + ...',
          connections: 'Evaluates to X diag(e^{λ₁t}, ..., e^{λₙt}) X⁻¹.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Step through discrete matrix powers uₖ = Aᵏu₀ in 3D and watch the trajectory converge toward the dominant eigenvector direction, or toggle continuous phase flow stream-lines.',
};

export default diagonalizationData;
