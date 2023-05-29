/*
 *rawData and displayData must be in same order

 *For Ex: value = ["statistics", "activity", "settings"]
          name = ["Statistics", "Activity", "Settings"]

 *WHY: Because we sync both arrays values with index number        

 ------------BOTH VALUES MUST BE ARRAY--------------------
 */
function syncDisplayWithRawData(values, names) {

  return values.reduce((acc, curr, idx) => {
    acc = {
      ...acc,
      [curr]: { value: curr, name: names[idx] }
    };
    return acc;
  }, {});
}
export default syncDisplayWithRawData;
