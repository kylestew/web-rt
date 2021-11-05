const writeColor = function (data, idx, pixelColor) {
  data[idx] = pixelColor.x * 255.99;
  data[idx + 1] = pixelColor.y * 255.99;
  data[idx + 2] = pixelColor.z * 255.99;
  data[idx + 3] = 255.99;
};

export default writeColor;
