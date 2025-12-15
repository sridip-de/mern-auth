function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Why this approach?
// >> 100000 is the smallest 6 digit number
// >> 999999 is the largest 6 digit number
// >> Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
// >> Multiplying by 900000 gives a range from 0 to 899999.999...
// >> Adding 100000 shifts the range to 100000 to 999999.999...
// >> Math.floor() removes the decimal part, resulting in a number between 100000 and 999999
// >> Finally, converting to string for easier handling (like sending via SMS or email)

export default generateOtp;