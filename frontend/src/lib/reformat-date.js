const mongoDateReformat = (date) => {
  const newDate = new Date(date);
  const mm = newDate.getMonth() + 1;
  const dd = newDate.getDate();
  const yy = newDate.getFullYear();

  const reformatDate = `${mm}/${dd}/${yy}`;
  return reformatDate;
};

export default mongoDateReformat;
