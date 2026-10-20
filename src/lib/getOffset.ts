const getOffset = (page: number, size: number) => {
  const offset = (page - 1) * size;
  return offset;
};

export { getOffset };
