'use client';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-[#c9d1d9] hover:border-yellow-500/40 hover:text-yellow-400 transition-all"
    >
      🖨️ Print / Save PDF
    </button>
  );
}
