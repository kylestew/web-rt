import vec3 from "./vec3";

function create(origin, direction) {
  return {
    origin: origin,
    direction: direction,

    at: function (t) {
      return vec3.add(origin, vec3.mulScalar(direction, t));
    },
  };
}

export default {
  create,
};
