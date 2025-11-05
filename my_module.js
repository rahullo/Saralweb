/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Sorting ranges by start time
  const sorted = ranges.sort((a, b) => a[0] - b[0]);

  // Initialize merged list
  const merged = [];
  let [currentStart, currentEnd] = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];

    if (nextStart <= currentEnd + threshold) {
      currentEnd = Math.max(currentEnd, nextEnd); // Extend current range
    } else {
      merged.push([currentStart, currentEnd]); // Push closed range
      [currentStart, currentEnd] = [nextStart, nextEnd]; // Start new range
    }
  }

  // final range
  merged.push([currentStart, currentEnd]);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
