import PixelCanvas from "./lib/pixel_canvas";
import { vec3, color } from "./lib/vec3.js";
import { HittableList } from "./lib/hittable.js";
import Camera from "./lib/camera.js";
import Sphere from "./lib/sphere.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let pixels = PixelCanvas(ctx);

// Image
const imageWidth = canvas.width;
const imageHeight = canvas.height;
const aspectRatio = imageWidth / imageHeight;
const samplesPerPixel = 16;

// World
let world = HittableList();
world.add(Sphere(vec3(0, -100.5, -1), 100));
world.add(Sphere(vec3(0, 0, -1), 0.5));

// Camera
const cam = Camera(aspectRatio);

function rayColor(ray, world) {
  let hit = world.hit(ray, 0, Number.MAX_SAFE_INTEGER);
  if (hit !== false) {
    // don't have shading yet, map normal to visible color range
    return hit.normal.add(color(1, 1, 1)).mulScalar(0.5);
  }

  // default background
  const unit_direction = ray.direction.unit();
  let t = 0.5 * (unit_direction.y + 1.0);
  return color(1, 1, 1)
    .mulScalar(1.0 - t)
    .add(color(0.5, 0.7, 1.0).mulScalar(t));
}

/*
 * Scan render scene
 */
let currentLine = 0;
function render() {
  for (let i = 0; i < imageWidth; ++i) {
    const u = i / imageWidth;
    const v = currentLine / imageHeight;
    let pixel = color(0, 0, 0);
    for (let s = 0; s < samplesPerPixel; ++s) {
      const su = u + Math.random() / imageWidth;
      const sv = v + Math.random() / imageHeight;

      const r = cam.getRay(su, sv);
      // add up all samples
      pixel = pixel.add(rayColor(r, world));
    }
    // divide samples back down to color range
    pixel = pixel.divScalar(samplesPerPixel);

    pixels.write(u, v, pixel);
  }

  pixels.display();
  currentLine++;
  if (currentLine < imageHeight) requestAnimationFrame(render);
}
requestAnimationFrame(render);
