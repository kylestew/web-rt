import PixelCanvas from "./lib/pixel_canvas";
import { vec3, color, randomInUnitSphere } from "./lib/vec3.js";
import { HittableList } from "./lib/hittable.js";
import Camera from "./lib/camera.js";
import Sphere from "./lib/sphere.js";
import Ray from "./lib/ray.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let pixels = PixelCanvas(ctx);

// Image
const imageWidth = canvas.width;
const imageHeight = canvas.height;
const aspectRatio = imageWidth / imageHeight;
const samplesPerPixel = 2;
const maxDepth = 16;

// World
let world = HittableList();
world.add(Sphere(vec3(0, -100.5, -1), 100));
world.add(Sphere(vec3(0, 0, -1), 0.5));

// Camera
const cam = Camera(aspectRatio);

function rayColor(ray, world, depth) {
  if (depth <= 0) return color(0, 0, 0);

  let hit = world.hit(ray, 0, Number.MAX_SAFE_INTEGER);
  if (hit !== false) {
    // DIFFUSE REFLECTION:
    // pick a random point S in the unit sphere tangent to hit point P
    // unit sphere is centered at (P + n)
    // (S - P) is the new direction vector of our diffuse reflection
    let S = hit.p.add(hit.n.add(randomInUnitSphere()));
    // ray march recusively in new direction
    return rayColor(Ray(hit.p, S.sub(hit.p)), world, depth - 1).mulScalar(0.5);
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
      pixel = pixel.add(rayColor(r, world, maxDepth));
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
