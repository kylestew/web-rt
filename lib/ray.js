function Ray(origin, direction) {
  return {
    origin: origin,
    direction: direction,

    at: function (t) {
      return origin.add(direction.mulScalar(t));
    },
  };
}

export default Ray;
