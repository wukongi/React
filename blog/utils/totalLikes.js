const likesNum = (target) => {
  let counter = target.reduce((sum, item) => sum + item.likes, 0);
  return counter;
};
const maxLikes = (target) => {
  let max = Math.max(...target.map((n) => n.likes));
  return target.find((n) => n.likes === max);
};

module.exports = {
  likesNum,
  maxLikes,
};
