const app = require("./app");
const populateDb = require("./utils/helpers");
const { PORT } = require("./utils/config");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
