export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

export const getParentPath = (path, levels = 1) => {
    let lastSlash;
    for (let i=0; i < levels; i++)
    {
      lastSlash = lastSlash ? path.lastIndexOf("/", lastSlash - 1) : path.lastIndexOf('/');
      if (lastSlash === 0) break;
    }
    return lastSlash !== undefined && lastSlash != -1 
      ? path.substring(0, lastSlash) 
      : path;
}
  