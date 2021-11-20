import PixelCanvas from "./lib/pixel_canvas";
import { vec3, color, dot } from "./lib/vec3.js";
import ray from "./lib/ray.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let pixels = PixelCanvas(ctx);

const image_width = canvas.width;
const image_height = canvas.height;
const aspect_ratio = image_width / image_height;

const viewport_height = 2.0;
const viewport_width = aspect_ratio * viewport_height;
const focal_length = 1.0;

const origin = vec3();
const horizontal = vec3(viewport_width, 0, 0);
const vertical = vec3(0, viewport_height, 0);
const lower_left_corner = origin
  .sub(horizontal.divScalar(2))
  .sub(vertical.divScalar(2))
  .sub(vec3(0, 0, focal_length));

function hitSphere(center, radius, r) {
  const oc = r.origin.sub(center);
  const a = dot(r.direction, r.direction);
  const b = 2.0 * dot(oc, r.direction);
  const c = dot(oc, oc) - radius * radius;
  const discriminant = b * b - 4 * a * c;
  return discriminant > 0;
}

function rayColor(r) {
  if (hitSphere(vec3(0, 0, -1), 0.5, r)) return color(1, 0, 0);

  const unit_direction = r.direction.unit();
  const t = 0.5 * (unit_direction.y + 1.0);
  return color(1, 1, 1)
    .mulScalar(1.0 - t)
    .add(color(0.5, 0.7, 1.0).mulScalar(t));
}

var frameCount = 0;
const maxFrames = 1000;
function render() {
  for (var i = 0; i < 2000; ++i) {
    const u = Math.random();
    const v = Math.random();
    const direction = lower_left_corner.add(
      horizontal.mulScalar(u).add(vertical.mulScalar(v)).sub(origin)
    );
    const r = ray.create(origin, direction);
    const color = rayColor(r);
    pixels.write(u, v, color);
  }
  pixels.display();

  frameCount++;
  if (frameCount < maxFrames) requestAnimationFrame(render);
}
requestAnimationFrame(render);
