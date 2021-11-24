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
 * Progressively render scene by randomly scattering rays
 * TODO: make this smarter (i.e. when are enough rays scattered?)
 */
var frameCount = 0;
const maxFrames = 400;
function render() {
  for (var i = 0; i < 4000; ++i) {
    const u = Math.random();
    const v = Math.random();
    const r = cam.getRay(u, v);
    const color = rayColor(r, world);
    pixels.write(u, v, color);
  }
  pixels.display();

  frameCount++;
  if (frameCount < maxFrames) requestAnimationFrame(render);
}
requestAnimationFrame(render);
