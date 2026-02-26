/**
 * Opens the actual CV PDF file in a new browser tab.
 * The PDF is served from /public/Maina Eric  CV.pdf
 */
export const downloadCV = (
  _data: unknown,
  _version?: string,
  showFeedback?: (msg: string) => void
): void => {
  // Use the actual PDF file from the public folder
  const pdfUrl = '/Maina Eric  CV.pdf';
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (showFeedback) {
    showFeedback('Opening CV...');
  }
};
