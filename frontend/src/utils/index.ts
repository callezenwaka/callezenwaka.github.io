'use strict'

/**
 * Define handle adjust
 * Multi line textarea: https://stackoverflow.com/a/51908469
 * https://github.com/facebook/flow/issues/2050#issuecomment-326773333
 * @param {*} event 
 */
export const handleAdjustFocus = (event: any) => {
  event.target.style.height = "1px";
  event.target.style.height = 25 + event.target.scrollHeight + "px";
  event.target.style.height = event.target.scrollHeight + "px";
}

/**
 * Define handle adjust
 * Multi line textarea: https://stackoverflow.com/a/51908469
 * https://github.com/facebook/flow/issues/2050#issuecomment-326773333
 * @param {*} event 
 */
export const handleAdjustBlur = (event: any) => {
  // Reset the height to auto
  event.target.style.height = "1px";
  event.target.style.height = 25 + event.target.scrollHeight + "px";
  event.target.style.height = event.target.scrollHeight + "px";
  event.target.style.height = "auto";
};

/**
 * Define write text
 * @param {*} event 
 */
export const handleWrite = (event: any) => {
  if (event) event.target.focus = true;
};

/**
 * Define a function that takes a string as an argument
 * @param str 
 * @returns 
 */
export const handleShortener = (str: string) => {
  // Remove all spaces from the string
  // let noSpaces = str.replace(/ /g, "");
  // // Get the first 5 characters of the string
  // let first = noSpaces.slice(0, 5);
  // // Get the last 5 characters of the string
  // let last = noSpaces.slice(-5);
  // // Return the concatenated string with 3 dots
  // return first + "&ctdot;" + last;
  // Check if the string is more than 12 characters long
  if (str.length > 12) {
    // Remove any spaces from the string
    let noSpaces = str.replace(/ /g, "");
    // Get the first and last 5 characters of the string
    let first = noSpaces.slice(0, 5);
    let last = noSpaces.slice(-5);
    // Concatenate the characters with 3 dots
    let result = first + "..." + last;
    // Return the result
    return result;
  } else {
    // Return the string unchanged
    return str;
  }
}