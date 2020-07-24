export function isNullOrUndefined(value) {
  return value === undefined || value === null;
}

export const getParentPath = (path, levels = 1) => {
  let lastSlash;
  for (let i = 0; i < levels; i++) {
    lastSlash = lastSlash ? path.lastIndexOf('/', lastSlash - 1) : path.lastIndexOf('/');
    if (lastSlash === 0) break;
  }
  return lastSlash !== undefined && lastSlash !== -1 ? path.substring(0, lastSlash) : path;
};

export const getPaddingProps = noPadding => (noPadding ? { className: 'u-padding-0' } : null);

export const getRowMarginProps = noPadding => (noPadding ? { className: 'u-margin-0' } : null);

export const preventWindowZoom = () => {
  const viewPortMeta = document.getElementsByName('viewport')[0];
  viewPortMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
};
