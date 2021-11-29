function Ray(origin, direction) {
  this.origin = origin;
  this.direction = direction;
}

Ray.prototype.at = function (t) {
  return this.origin.add(this.direction.mulScalar(t));
};

export default Ray;
