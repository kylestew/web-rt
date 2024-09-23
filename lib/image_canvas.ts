/*
 * All color values are in the range 0.0 to 1.0
 */
type Color = [number, number, number]

function ImageCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw new Error('Could not get 2d context from canvas')
    }

    return {
        ctx: ctx,
        width: ctx.canvas.width,
        height: ctx.canvas.height,
        imageData: ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),

        write: function (x: number, y: number, color: Color) {
            const idx = x * 4 + y * this.width * 4

            const img = this.imageData.data
            img[idx + 0] = Math.min(Math.max(color[0] * 255.99, 0), 255)
            img[idx + 1] = Math.min(Math.max(color[1] * 255.99, 0), 255)
            img[idx + 2] = Math.min(Math.max(color[2] * 255.99, 0), 255)
            img[idx + 3] = 255
        },

        display: function () {
            this.ctx.putImageData(this.imageData, 0, 0)
        },
    }
}

export { Color, ImageCanvas }
