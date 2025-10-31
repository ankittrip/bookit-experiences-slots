export const normalizeDate = (dateInput) => {
  const d = new Date(dateInput);
  return d.toISOString().split("T")[0];
};
