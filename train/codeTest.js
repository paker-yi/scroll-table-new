/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {

    // nums1.splice(m, nums1.length - m)
    nums1 = nums1.slice(0, m)
    nums1 = nums1.concat(nums2)
    nums1.sort()
    // nums1 = nums1.slice(0, m)

    // if (nums1.length == 0){
    //     nums1 = nums2
    // }else {
    //     for(let i = 0; i< nums2.length; i++){
    //         let value1 = nums2[i];
    //         for(j = 0; j< nums1.length; j++ ){
    //             let value2 = nums1[j];
    //             if(value1 <= value2){
    //                 nums1.splice(j, 0, value1)
    //                 break;
    //             }
    //             if(j == nums1.length - 1){
    //                 nums1.push(value1)
    //                 break;
    //             }
    //         }
    //     }
    // }
    console.log(nums1);
};

let nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;

    merge(nums1, m, nums2, n);