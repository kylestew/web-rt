const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import writeColor from "./lib/color.js";
import { vec3, color } from "./lib/vec3.js";
import ray from "./lib/ray.js";

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

function rayColor(r) {
  const unit_direction = r.direction.unit();
  const t = 0.5 * (unit_direction.y + 1.0);
  return color(1, 1, 1)
    .mulScalar(1.0 - t)
    .add(color(0.5, 0.7, 1.0).mulScalar(t));
}

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
for (var j = image_height - 1; j >= 0; --j) {
  for (var i = 0; i < image_width; ++i) {
    const u = i / (image_width - 1);
    const v = j / (image_height - 1);
    const direction = lower_left_corner.add(
      horizontal.mulScalar(u).add(vertical.mulScalar(v)).sub(origin)
    );
    const r = ray.create(origin, direction);
    const color = rayColor(r);
    const idx = ((image_height - j) * image_width + i) * 4;
    writeColor(data, idx, color);
  }
}
ctx.putImageData(imageData, 0, 0);
