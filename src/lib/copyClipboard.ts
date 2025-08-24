export const handleCopy = async (
  output: string,
   setCopiedIndex: (index: number | null) => void,
  index: number
): Promise<void> => {
  if (!output) return;
  try {
    await navigator.clipboard.writeText(output);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};
