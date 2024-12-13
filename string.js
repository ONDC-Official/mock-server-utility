class Solution {
    frequencySort(s) {
        // Frequency array for characters 'a' to 'z'
        let freq = Array(26).fill(0).map((_, i) => [0, String.fromCharCode(i + 97)]);

        // Count frequency of each character
        for (let ch of s) {
            freq[ch.charCodeAt(0) - 97][0]++;
        }

        

        // Sort by frequency (descending) and alphabetically (ascending)
        freq.sort((a, b) => {
            if (a[0] !== b[0]) return b[0] - a[0];
            return a[1].localeCompare(b[1]);
        });

        // Collect characters with non-zero frequency
        let result = [];
        for (let [count, char] of freq) {
            if (count > 0) result.push(char);
        }
        return result;
    }
}

// Main method to test the function
const sol = new Solution();
const s = "tree";
const result = sol.frequencySort(s);
console.log(result);
