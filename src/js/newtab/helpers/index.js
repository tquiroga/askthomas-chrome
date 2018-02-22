
/**
 * Return the right greeting according to the time of the day
 * E.g: morning, afternoon, evening
 * @param moment Date 
 * @return string
 */
export const getGreetingTime = (m) => {
  let g = null;
  if (!m || !m.isValid()) { return; }
  var split_afternoon = 12;
  var split_evening = 17;
  var currentHour = parseFloat(m.format("HH"));
  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "afternoon";
  } else if (currentHour >= split_evening) {
    g = "evening";
  } else {
    g = "morning";
  }

  return g;
};