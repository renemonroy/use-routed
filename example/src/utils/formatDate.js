export default function formatISODate(isoString) {
  const res = isoString.split(/\D+/);
  const date = new Date(
    Date.UTC(res[0], --res[1], res[2], res[3], res[4], res[5], res[6])
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month}' ${day}, ${year}`;
}
