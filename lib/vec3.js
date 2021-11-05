/*
https://github.com/greggman/twgl.js/blob/master/src/v3.js
*/
let VecType = Float32Array;

function vec3(x, y, z) {
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

  return {
    data: dst,
    get x() {
      return dst[0];
    },
    get y() {
      return dst[1];
    },
    get z() {
      return dst[2];
    },
    add: function (b) {
      return vec3(this.x + b.x, this.y + b.y, this.z + b.z);
    },
    sub: function (b) {
      return vec3(this.x - b.x, this.y - b.y, this.z - b.z);
    },
    mulScalar(k) {
      return vec3(this.x * k, this.y * k, this.z * k);
    },
    divScalar(k) {
      return vec3(this.x / k, this.y / k, this.z / k);
    },
    lengthSquared() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length() {
      return Math.sqrt(this.lengthSquared());
    },
    unit() {
      return this.divScalar(this.length());
    },
    print: function () {
      console.log("(" + this.x + ", " + this.y + ", " + this.z + ")");
    },
  };
}

const color = vec3;

export { vec3, color };
export default vec3;
