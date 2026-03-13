export const mergeByKey = (left = [], right = [], key = 'id') => {
  const map = new Map(left.map((item) => [item[key], item]));
  right.forEach((item) => map.set(item[key], { ...(map.get(item[key]) || {}), ...item }));
  return [...map.values()];
};
