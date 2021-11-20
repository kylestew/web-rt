/*
 * All color values are in the range 0.0 to 1.0
 */
function PixelCanvas(ctx) {
  return {
    ctx: ctx,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    imageData: ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),

    write: function (u, v, color) {
      const col = parseInt(u * (this.width - 1));
      const row = parseInt(v * (this.height - 1));
      const idx = ((this.height - row) * this.width + col) * 4;

      const img = this.imageData.data;
      img[idx] = color.x * 255.99;
      img[idx + 1] = color.y * 255.99;
      img[idx + 2] = color.z * 255.99;
      img[idx + 3] = 255.99;
    },

    display: function () {
      this.ctx.putImageData(this.imageData, 0, 0);
    },
  };
}

export { PixelCanvas };
export default PixelCanvas;
