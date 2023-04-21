const dummy = blogs => 1;
const totalLikes = blogs => {
  const total = blogs.reduce((sum, ele) => sum + ele.likes, 0);
  return total;
}
const favouriteBlog = blogs => {
  const fav = blogs.reduce((favSoFar, ele) => ele.likes > favSoFar.likes ? ele : favSoFar)
  return fav;
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
