/*
https://github.com/greggman/twgl.js/blob/master/src/v3.js
*/
let VecType = Float32Array;

class Vec3 {
  constructor(x, y, z) {
    const dst = new VecType(3);
    if (x) {
      dst[0] = x;
    }
    if (y) {
      dst[1] = y;
    }
    if (z) {
      dst[2] = z;
    }
    this.data = dst;
  }

  get x() {
    return this.data[0];
  }
  get y() {
    return this.data[1];
  }
  get z() {
    return this.data[2];
  }

  add(b) {
    return new Vec3(this.x + b.x, this.y + b.y, this.z + b.z);
  }
  sub(b) {
    return new Vec3(this.x - b.x, this.y - b.y, this.z - b.z);
  }

  mulScalar(k) {
    return new Vec3(this.x * k, this.y * k, this.z * k);
  }
  divScalar(k) {
    return new Vec3(this.x / k, this.y / k, this.z / k);
  }

  lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  unit() {
    return this.divScalar(this.length());
  }

  print() {
    console.log("(" + this.x + ", " + this.y + ", " + this.z + ")");
  }

  static RandomVector(min = 0, max = 1) {
    return new Vec3(
      randomInRange(min, max),
      randomInRange(min, max),
      randomInRange(min, max)
    );
  }

  static RandomInUnitSphere() {
    while (true) {
      let p = this.RandomVector(-1, 1);
      if (p.lengthSquared() >= 1) continue;
      return p;
    }
  }
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function dot(u, v) {
  return u.x * v.x + u.y * v.y + u.z * v.z;
}

const Color = Vec3;

export { Vec3, Color, dot };
export default Vec3;
