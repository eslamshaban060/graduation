// function Genr(arr) {
//   let lent = 0;
//   let newarr = [];
//   arr.map((item) => {
//     item.toString().length > lent
//       ? (lent = item.toString().length)
//       : (lent = lent);
//   });

//   //   ---------------------

//   arr.map((num, i) => {
//     let zeros = Number(lent) - num.toString().length;
//     let z = "";
//     for (let n = 0; n < zeros; n++) {
//       z += "0";
//     }
//     newarr[i] = num + z;
//   });
//   console.log(newarr);
// }
// Genr([2363, 65, 65656, 6666.32365666, 636, 3]);

console.log([1, 2, 3] == [1, 2, 3]);
