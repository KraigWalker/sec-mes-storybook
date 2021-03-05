const normalisedBrandId = {
  CB: 'CB',
  YB: 'YB',
  DYB: 'B',
  VM: 'VM',
};

export function getBrandReducer(brandId = 'VM') {
  return function brandReducer(state = normalisedBrandId[brandId] || 'VM') {
    return state;
  };
}
