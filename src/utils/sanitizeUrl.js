export const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  // Browsers strip ASCII tab/newline/CR from anywhere in a URL before parsing
  // its scheme, so those characters must be removed before validating -
  // otherwise "java\tscript:" style payloads slip past a literal match.
  const cleaned = url.replace(/[\t\n\r]/g, '').trim();
  // Allowlist safe schemes instead of blocking known-bad ones, so an
  // unlisted dangerous scheme can't slip through un-noticed.
  if (/^https?:\/\//i.test(cleaned) || /^\/\//.test(cleaned) || cleaned.startsWith('/')) {
    return cleaned;
  }
  return '#';
};
