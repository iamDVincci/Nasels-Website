import React from 'react';
import { X, Award, BookOpen, CheckCircle, HelpCircle, PenTool, AlertTriangle } from 'lucide-react';

interface StudyTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyTipsModal: React.FC<StudyTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2A1F18]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#DCD3C1] overflow-hidden text-[#3E2F24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FDFCF7] text-[#3E2F24] px-6 py-4 flex items-center justify-between border-b border-[#DCD3C1]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#8B7355]" />
            <div>
              <h2 className="text-base font-bold font-serif text-[#3E2F24]">
                NASELS UNIZIK Academic Excellence & Exam Guide
              </h2>
              <p className="text-xs text-[#5A4638] font-serif">
                Department of English Language and Literature • Faculty of Arts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F5F1E9] text-[#8B7355] hover:text-[#3E2F24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto font-serif text-[#5A4638] text-xs sm:text-sm leading-relaxed bg-[#FDFCF7]/30">
          {/* Section 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8B7355] font-serif font-bold text-xs uppercase tracking-wider">
              <PenTool className="w-4 h-4 text-[#8B7355]" />
              <span>Strategy 1: Conquering English Language Exams (ENG 101, 102, 201, 202, 301, 402)</span>
            </div>
            <h3 className="text-base font-bold font-serif text-[#3E2F24]">
              Mastering Question One (Compulsory) & Linguistic Rigor
            </h3>
            <p>
              In UNIZIK English Language examinations, Question One is almost invariably compulsory and carries up to 30% of the entire examination marks. Lecturers look for <strong>empirical linguistic evidence</strong> rather than vague colloquial explanations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#5A4638] font-serif text-xs">
              <li><strong>Phonetics (ENG 102):</strong> Always enclose phonemic transcriptions inside slant brackets (e.g., <code className="bg-[#F5F1E9] border border-[#DCD3C1] px-1.5 py-0.5 rounded text-[#3E2F24] font-mono">/fəˈnetɪks/</code>). Indicate stress marks (ˈ) strictly before the stressed syllable.</li>
              <li><strong>Syntax (ENG 202, 301):</strong> When asked to draw phrase structure or X-Bar trees, ensure every branch terminates in a lexical head or trace (<code className="bg-[#F5F1E9] border border-[#DCD3C1] px-1.5 py-0.5 rounded text-[#3E2F24] font-mono">t_i</code>). Clearly show intermediate projections (X').</li>
              <li><strong>Morphology (ENG 201):</strong> Distinguish between root, base, and stem. Always specify whether an affix is inflectional or derivational, and state whether it causes word-class alteration.</li>
              <li><strong>Concord (ENG 101):</strong> State the exact principle invoked (Grammatical Concord, Notional Concord, or Concord of Proximity).</li>
            </ul>
          </div>

          <div className="h-px bg-[#DCD3C1]" />

          {/* Section 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8B7355] font-serif font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#8B7355]" />
              <span>Strategy 2: Writing High-Scoring Literature Essays (ENG 111, 211, 212, 313, 322, 411)</span>
            </div>
            <h3 className="text-base font-bold font-serif text-[#3E2F24]">
              Textual Fidelity, Theoretical Framing & Avoiding Mere Plot Retelling
            </h3>
            <p>
              The most frequent error in university literature essays is spending pages summarizing the plot. UNIZIK literature examiners look for analytical arguments:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#5A4638] font-serif text-xs">
              <li><strong>Use the P.E.E.L Structure:</strong> Point (argument statement), Evidence (verbatim quote or specific scene reference), Explanation (critical analysis), Link (tying back to the essay question).</li>
              <li><strong>Engage Critical Theorists:</strong> Don't just analyze Achebe or Soyinka in isolation. Frame them with theoretical voices (e.g. Frantz Fanon on colonial psychology, Edward Said on Orientalism, Terry Eagleton on ideological superstructure, or Chikwenye Ogunyemi on African Womanism).</li>
              <li><strong>Integrate Dramatic Techniques:</strong> When writing on drama (*The Lion and the Jewel*, *Death and the King’s Horseman*), discuss stagecraft, mime, lighting, ritual songs, and chorus functions—not just dialogue.</li>
            </ul>
          </div>

          <div className="h-px bg-[#DCD3C1]" />

          {/* Section 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8B7355] font-serif font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-[#8B7355]" />
              <span>Strategy 3: MLA 9th Edition Quick Citation Standard (ENG 490 Project)</span>
            </div>
            <h3 className="text-base font-bold font-serif text-[#3E2F24]">
              NASELS UNIZIK Reference Format
            </h3>
            <div className="bg-[#F5F1E9] p-4 rounded-xl border border-[#DCD3C1] space-y-2 font-serif text-xs">
              <p><strong>Book by a Single Author:</strong></p>
              <code className="block bg-white p-2.5 rounded-lg border border-[#DCD3C1] text-[#3E2F24]">
                Achebe, Chinua. <em>Things Fall Apart</em>. William Heinemann, 1958.
              </code>
              <p className="mt-2"><strong>Journal Article:</strong></p>
              <code className="block bg-white p-2.5 rounded-lg border border-[#DCD3C1] text-[#3E2F24]">
                Okafor, E. O. "Morphological Innovations in Educated Nigerian English." <em>UNIZIK Journal of Arts and Humanities</em>, vol. 18, no. 2, 2022, pp. 45-62.
              </code>
              <p className="mt-2 text-[#5A4638] italic">
                Remember: In MLA 9th Edition, do NOT use "Ibid." in subsequent citations. Use parenthetical citations containing the author's surname and page number without a comma (e.g., Achebe 47).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F5F1E9] px-6 py-3.5 border-t border-[#DCD3C1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#3E2F24] hover:bg-[#5A4638] text-[#FDFCF7] font-serif text-xs font-semibold transition-colors shadow-xs"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
