export type Question = { prompt: string; answer: string; explanation: string };
export type Resource = { title: string; subject: string; grade: string; type: string; detail: string; year: string; color: string; tag: string; questions: Question[] };

// Original practice questions and worked answers written for Boardwise. These are not reproduced CBSE papers.
export const resources: Resource[] = [
  { title: 'Real Numbers', subject: 'Mathematics', grade: 'Class 10', type: 'Chapter practice', detail: 'Euclid’s algorithm, HCF and irrationality proofs', year: '3 questions', color: 'blue', tag: 'Chapter 1', questions: [
    { prompt: 'Use Euclid’s division algorithm to find the HCF of 135 and 225.', answer: '45', explanation: '225 = 135 × 1 + 90; 135 = 90 × 1 + 45; 90 = 45 × 2 + 0. The last non-zero remainder is 45.' },
    { prompt: 'Prove that √5 is irrational.', answer: 'Assume √5 = a/b in lowest terms. This leads to both a and b being divisible by 5, a contradiction.', explanation: 'Squaring gives a² = 5b², so 5 divides a. Write a = 5k; then b² = 5k², so 5 also divides b. That contradicts gcd(a,b) = 1.' },
    { prompt: 'Find the HCF and LCM of 26 and 91, and verify their product relation.', answer: 'HCF = 13; LCM = 182.', explanation: '26 = 2 × 13 and 91 = 7 × 13. Their product 26 × 91 = 2366 equals 13 × 182.' },
  ] },
  { title: 'Polynomials', subject: 'Mathematics', grade: 'Class 10', type: 'Chapter practice', detail: 'Zeros, coefficients and polynomial division', year: '3 questions', color: 'blue', tag: 'Chapter 2', questions: [
    { prompt: 'Find the zeroes of x² − 5x + 6 and verify the relationship with its coefficients.', answer: '2 and 3; sum = 5, product = 6.', explanation: 'Factor x² − 5x + 6 = (x − 2)(x − 3). For ax² + bx + c, sum = −b/a = 5 and product = c/a = 6.' },
    { prompt: 'Form a quadratic polynomial whose zeroes are −2 and 7.', answer: 'x² − 5x − 14.', explanation: 'For zeroes α, β the monic polynomial is x² − (α + β)x + αβ. Here the sum is 5 and product is −14.' },
    { prompt: 'If one zero of 2x² + kx + 3 is −3, find k and the other zero.', answer: 'k = 7; the other zero is −1/2.', explanation: 'Substitute x = −3: 18 − 3k + 3 = 0, so k = 7. Product of zeroes = 3/2, so the other zero is −1/2.' },
  ] },
  { title: 'Pair of Linear Equations', subject: 'Mathematics', grade: 'Class 10', type: 'Chapter practice', detail: 'Solve by elimination and interpret consistency', year: '3 questions', color: 'blue', tag: 'Chapter 3', questions: [
    { prompt: 'Solve 2x + 3y = 13 and x + y = 5.', answer: 'x = 2, y = 3.', explanation: 'Double the second equation: 2x + 2y = 10. Subtract it from the first to get y = 3; then x = 2.' },
    { prompt: 'For what value of k do 2x + 3y = 7 and 4x + ky = 14 have infinitely many solutions?', answer: 'k = 6.', explanation: 'For coincident lines a₁/a₂ = b₁/b₂ = c₁/c₂. Here 2/4 = 7/14 = 1/2, so 3/k = 1/2 and k = 6.' },
    { prompt: 'Two adult tickets and three child tickets cost ₹360. One adult and two child tickets cost ₹220. Find each price.', answer: 'Adult ₹60; child ₹80.', explanation: 'Let prices be a and c. 2a + 3c = 360 and a + 2c = 220. Doubling the second and subtracting gives c = 80, hence a = 60.' },
  ] },
  { title: 'Quadratic Equations', subject: 'Mathematics', grade: 'Class 10', type: 'Chapter practice', detail: 'Factorisation, formula and nature of roots', year: '3 questions', color: 'blue', tag: 'Chapter 4', questions: [
    { prompt: 'Solve x² − 7x + 12 = 0.', answer: 'x = 3 or x = 4.', explanation: 'Factor as (x − 3)(x − 4) = 0.' },
    { prompt: 'Find the nature of roots of 3x² − 2x + 1 = 0.', answer: 'No real roots.', explanation: 'The discriminant is b² − 4ac = 4 − 12 = −8, which is negative.' },
    { prompt: 'A rectangle has area 48 cm² and length 2 cm more than its width. Find its dimensions.', answer: 'Width 6 cm; length 8 cm.', explanation: 'If width is w, w(w + 2) = 48. Thus w² + 2w − 48 = 0 = (w − 6)(w + 8). Reject the negative value.' },
  ] },
  { title: 'Triangles', subject: 'Mathematics', grade: 'Class 10', type: 'Chapter practice', detail: 'Similarity, proportionality theorem and area ratios', year: '3 questions', color: 'blue', tag: 'Chapter 6', questions: [
    { prompt: 'In ΔABC, DE ∥ BC, with AD = 2 cm, DB = 3 cm and AE = 4 cm. Find EC.', answer: 'EC = 6 cm.', explanation: 'By the Basic Proportionality Theorem, AD/DB = AE/EC. So 2/3 = 4/EC, giving EC = 6.' },
    { prompt: 'Two similar triangles have corresponding sides in ratio 3:5. Find the ratio of their areas.', answer: '9:25.', explanation: 'For similar triangles, the ratio of areas is the square of the ratio of corresponding sides: 3²:5².' },
    { prompt: 'A right triangle has legs 9 cm and 12 cm. Find its hypotenuse.', answer: '15 cm.', explanation: 'By Pythagoras, hypotenuse² = 9² + 12² = 225.' },
  ] },
  { title: 'Electricity', subject: 'Science', grade: 'Class 10', type: 'Chapter practice', detail: 'Ohm’s law, resistance and electric power', year: '3 questions', color: 'green', tag: 'Physics · Ch. 11', questions: [
    { prompt: 'A 6 Ω resistor is connected across 12 V. Find the current and power.', answer: 'Current = 2 A; power = 24 W.', explanation: 'I = V/R = 12/6 = 2 A. P = VI = 12 × 2 = 24 W.' },
    { prompt: 'Two 4 Ω resistors are connected in parallel. Find their equivalent resistance.', answer: '2 Ω.', explanation: '1/R = 1/4 + 1/4 = 1/2, so R = 2 Ω.' },
    { prompt: 'Why are household appliances connected in parallel?', answer: 'Each appliance gets the full supply voltage and can be switched independently.', explanation: 'Parallel branches have the same potential difference; opening one branch does not break the others.' },
  ] },
  { title: 'Chemical Reactions', subject: 'Science', grade: 'Class 10', type: 'Chapter practice', detail: 'Balance equations and identify reaction types', year: '3 questions', color: 'green', tag: 'Chemistry · Ch. 1', questions: [
    { prompt: 'Balance: Fe + H₂O → Fe₃O₄ + H₂.', answer: '3Fe + 4H₂O → Fe₃O₄ + 4H₂.', explanation: 'Match Fe first (3), O with 4H₂O, then H with 4H₂.' },
    { prompt: 'What type of reaction is CaO + H₂O → Ca(OH)₂? Is heat released?', answer: 'Combination reaction; heat is released (exothermic).', explanation: 'Two reactants combine to form one product, and slaking of lime releases heat.' },
    { prompt: 'What is observed when an iron nail is placed in copper sulphate solution?', answer: 'A reddish-brown copper coating forms and the blue solution turns green.', explanation: 'Fe + CuSO₄ → FeSO₄ + Cu. Iron displaces copper because it is more reactive.' },
  ] },
  { title: 'Life Processes', subject: 'Science', grade: 'Class 10', type: 'Chapter practice', detail: 'Nutrition, respiration, transport and excretion', year: '3 questions', color: 'green', tag: 'Biology · Ch. 5', questions: [
    { prompt: 'What is the role of hydrochloric acid in the stomach?', answer: 'It creates an acidic medium for pepsin and helps kill many microbes.', explanation: 'Pepsin digests proteins and works in acidic conditions. Mucus protects the stomach lining.' },
    { prompt: 'Where does gas exchange occur in human lungs, and how are these structures adapted?', answer: 'In alveoli; they are numerous, thin-walled and surrounded by capillaries.', explanation: 'These features provide a large, moist surface and short diffusion distance for rapid exchange.' },
    { prompt: 'What is the main function of xylem?', answer: 'Transport water and dissolved minerals from roots to the rest of the plant.', explanation: 'Xylem vessels and tracheids form conducting tissues; transpiration pull helps move water upward.' },
  ] },
  { title: 'Carbon and Its Compounds', subject: 'Science', grade: 'Class 10', type: 'Chapter practice', detail: 'Covalent bonding, homologous series and reactions', year: '3 questions', color: 'green', tag: 'Chemistry · Ch. 4', questions: [
    { prompt: 'Why does carbon form covalent bonds rather than usually forming C⁴⁺ or C⁴⁻ ions?', answer: 'Losing or gaining four electrons is energetically unfavourable; sharing electrons gives carbon a stable configuration.', explanation: 'Carbon has four valence electrons and commonly completes its octet by sharing.' },
    { prompt: 'Write the functional group and general formula of alcohols in the saturated open-chain series.', answer: 'Hydroxyl group (−OH); CₙH₂ₙ₊₁OH.', explanation: 'For example, ethanol is C₂H₅OH.' },
    { prompt: 'What happens when ethanol is oxidised with alkaline potassium permanganate?', answer: 'It is oxidised to ethanoic acid.', explanation: 'The oxidising agent supplies oxygen; acidified potassium dichromate is another common oxidant.' },
  ] },
  { title: 'Current Electricity', subject: 'Physics', grade: 'Class 12', type: 'Chapter practice', detail: 'Drift velocity, resistivity and Kirchhoff’s laws', year: '3 questions', color: 'purple', tag: 'Chapter 3', questions: [
    { prompt: 'A 10 Ω resistor is connected to a 5 V battery. Find the current and charge passing in 2 minutes.', answer: 'I = 0.5 A; Q = 60 C.', explanation: 'I = V/R = 0.5 A. In 120 s, Q = It = 0.5 × 120 = 60 C.' },
    { prompt: 'How does the resistance of a uniform wire change if its length is doubled and its radius is halved?', answer: 'It becomes 8 times the original resistance.', explanation: 'R = ρL/(πr²). The length factor is 2 and halving radius increases resistance by 4; total factor = 8.' },
    { prompt: 'State Kirchhoff’s junction rule and the conservation principle behind it.', answer: 'Sum of currents entering a junction equals sum leaving; it follows from conservation of charge.', explanation: 'Charge cannot accumulate at an ideal circuit junction in steady state.' },
  ] },
  { title: 'Electrostatics', subject: 'Physics', grade: 'Class 12', type: 'Chapter practice', detail: 'Coulomb’s law, electric field and potential', year: '3 questions', color: 'purple', tag: 'Chapter 1', questions: [
    { prompt: 'Two point charges are separated by distance r. What happens to the force if the separation is tripled?', answer: 'The force becomes one-ninth.', explanation: 'Coulomb’s law gives F ∝ 1/r², so F′/F = 1/3².' },
    { prompt: 'What is the electric field inside a conductor in electrostatic equilibrium?', answer: 'Zero.', explanation: 'Free charges redistribute on the surface until the internal field cancels.' },
    { prompt: 'A charge of 2 μC moves through a potential difference of 3 V. How much work is done?', answer: '6 μJ.', explanation: 'W = qV = (2 × 10⁻⁶ C)(3 V) = 6 × 10⁻⁶ J.' },
  ] },
  { title: 'Chemical Kinetics', subject: 'Chemistry', grade: 'Class 12', type: 'Chapter practice', detail: 'Rate law, order and first-order half-life', year: '3 questions', color: 'teal', tag: 'Chapter 4', questions: [
    { prompt: 'For a first-order reaction, what is the relation between half-life and rate constant?', answer: 't₁/₂ = 0.693/k.', explanation: 'The integrated first-order rate law gives a half-life independent of initial concentration.' },
    { prompt: 'If the rate doubles when [A] doubles while other conditions stay fixed, what is the order with respect to A?', answer: 'First order.', explanation: 'Rate ∝ [A]ⁿ. The rate ratio 2 = 2ⁿ, hence n = 1.' },
    { prompt: 'A first-order reaction has k = 0.231 min⁻¹. Find its half-life.', answer: '3.00 min (approximately).', explanation: 't₁/₂ = 0.693/0.231 = 3 min.' },
  ] },
  { title: 'Solutions', subject: 'Chemistry', grade: 'Class 12', type: 'Chapter practice', detail: 'Concentration, Raoult’s law and colligative properties', year: '3 questions', color: 'teal', tag: 'Chapter 2', questions: [
    { prompt: 'What is the molarity of 0.5 mol solute dissolved to make 250 mL solution?', answer: '2 mol L⁻¹.', explanation: 'M = n/V in litres = 0.5/0.250 = 2 mol L⁻¹.' },
    { prompt: 'State Raoult’s law for a volatile component in an ideal solution.', answer: 'Its partial vapour pressure equals its mole fraction times its pure vapour pressure: pᵢ = xᵢpᵢ°.', explanation: 'For a binary ideal solution, total pressure is the sum of the two partial pressures.' },
    { prompt: 'Which has the greater boiling-point elevation in the same mass of water: 0.1 mol glucose or 0.1 mol NaCl, assuming ideal dissociation?', answer: 'NaCl solution.', explanation: 'ΔTᵦ = iKᵦm. Glucose has i = 1; ideal NaCl has i ≈ 2, so more particles produce a larger elevation.' },
  ] },
  { title: 'Reproduction in Organisms', subject: 'Biology', grade: 'Class 12', type: 'Chapter practice', detail: 'Asexual reproduction, life span and reproductive phases', year: '3 questions', color: 'green', tag: 'Chapter 1', questions: [
    { prompt: 'Name the asexual reproductive method used by Amoeba.', answer: 'Binary fission.', explanation: 'The parent cell divides mitotically into two daughter cells under favourable conditions.' },
    { prompt: 'What is vegetative propagation? Give one example.', answer: 'A new plant develops from a vegetative part of the parent; e.g. potato tuber or Bryophyllum leaf.', explanation: 'It is a form of asexual reproduction and usually produces genetically similar offspring.' },
    { prompt: 'Distinguish asexual reproduction from sexual reproduction in terms of gametes.', answer: 'Asexual reproduction does not involve fusion of gametes; sexual reproduction involves gamete formation and fusion.', explanation: 'Sexual reproduction typically generates greater genetic variation.' },
  ] },
  { title: 'Principles of Inheritance', subject: 'Biology', grade: 'Class 12', type: 'Chapter practice', detail: 'Mendelian crosses, test crosses and inheritance', year: '3 questions', color: 'green', tag: 'Chapter 4', questions: [
    { prompt: 'In a monohybrid cross Tt × Tt, what is the expected genotypic ratio?', answer: '1 TT : 2 Tt : 1 tt.', explanation: 'Each parent produces T and t gametes with equal probability.' },
    { prompt: 'What is the purpose of a test cross?', answer: 'To determine the genotype of an individual with a dominant phenotype by crossing it with a homozygous recessive individual.', explanation: 'A 1:1 dominant:recessive offspring ratio indicates the unknown parent was heterozygous.' },
    { prompt: 'A father with blood group AB and a mother with blood group O have a child. Which blood groups are possible?', answer: 'A or B.', explanation: 'The AB parent contributes Iᴬ or Iᴮ; the O parent contributes i. Offspring are Iᴬi or Iᴮi.' },
  ] },
  { title: 'Relations and Functions', subject: 'Mathematics', grade: 'Class 12', type: 'Chapter practice', detail: 'Relations, equivalence and types of functions', year: '3 questions', color: 'blue', tag: 'Chapter 1', questions: [
    { prompt: 'Is f: ℝ → ℝ defined by f(x) = 2x + 3 one-one and onto?', answer: 'Yes, it is both one-one and onto.', explanation: '2x₁+3 = 2x₂+3 implies x₁=x₂. For any y∈ℝ, x=(y−3)/2 is real and f(x)=y.' },
    { prompt: 'On integers, define aRb when a − b is divisible by 4. Is R an equivalence relation?', answer: 'Yes.', explanation: 'It is reflexive (4 divides 0), symmetric (divisibility is unchanged by negation), and transitive (sums of multiples of 4 are multiples of 4).' },
    { prompt: 'Find the range of f(x) = x² for domain ℝ.', answer: '[0, ∞).', explanation: 'A square is never negative, and every non-negative y is attained by x = √y.' },
  ] },
  { title: 'Matrices', subject: 'Mathematics', grade: 'Class 12', type: 'Chapter practice', detail: 'Matrix operations, transpose and inverse', year: '3 questions', color: 'blue', tag: 'Chapter 3', questions: [
    { prompt: 'If A = [[1,2],[3,4]], find Aᵀ.', answer: '[[1,3],[2,4]].', explanation: 'Transpose interchanges rows and columns.' },
    { prompt: 'Find the determinant of [[2,1],[5,3]].', answer: '1.', explanation: 'For [[a,b],[c,d]], determinant = ad − bc = 6 − 5 = 1.' },
    { prompt: 'When does a square matrix have an inverse?', answer: 'Exactly when its determinant is non-zero.', explanation: 'For a square matrix A, A⁻¹ = adj(A)/|A| when |A| ≠ 0.' },
  ] },
  { title: 'Mathematics · Mixed Mini Sample Paper', subject: 'Mathematics', grade: 'Class 10', type: 'Sample paper', detail: 'Original mixed-topic test · 3 questions with worked solutions', year: '15 marks · 30 min', color: 'orange', tag: 'Practice paper', questions: [
    { prompt: '[5 marks] Solve x² − 9x + 20 = 0 and state the nature of its roots.', answer: 'x = 4, 5; two distinct real roots.', explanation: 'Factor: (x − 4)(x − 5) = 0. The discriminant is 81 − 80 = 1 > 0.' },
    { prompt: '[5 marks] The 5th term of an AP is 18 and the 11th term is 42. Find the first term and common difference.', answer: 'First term a = 2; common difference d = 4.', explanation: 'a + 4d = 18 and a + 10d = 42. Subtract to get d = 4; then a = 2.' },
    { prompt: '[5 marks] A circle has radius 7 cm. Find its area (use π = 22/7).', answer: '154 cm².', explanation: 'Area = πr² = (22/7) × 49 = 154 cm².' },
  ] },
  { title: 'Physics · Competency Practice Set', subject: 'Physics', grade: 'Class 12', type: 'Sample paper', detail: 'Application-based current electricity and electrostatics', year: '15 marks · 30 min', color: 'purple', tag: 'Competency set', questions: [
    { prompt: '[5 marks] A 12 V battery is connected across a 4 Ω resistor. Calculate current and energy used in 2 minutes.', answer: 'Current = 3 A; energy = 4320 J.', explanation: 'I = V/R = 3 A. P = VI = 36 W. Energy = Pt = 36 × 120 = 4320 J.' },
    { prompt: '[5 marks] Two identical positive charges are moved twice as far apart. Compare the new electrostatic force with the original.', answer: 'The new force is one-fourth the original.', explanation: 'Coulomb’s law follows the inverse-square relation F ∝ 1/r².' },
    { prompt: '[5 marks] Why does a bird sitting on a single high-voltage wire usually not receive a large shock? State when it could be at risk.', answer: 'Its two feet are at nearly the same potential, so little current passes through its body. It is at risk if it bridges two different potentials, such as a wire and earth.', explanation: 'Current through the body depends on the potential difference across it and its resistance; never approach or touch power lines.' },
  ] },
];
