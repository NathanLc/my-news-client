module.exports = {
  "extends": "standard",
  "plugins": [
    "standard",
    "react",
    "promise"
  ],
  "rules": {
    "indent": [1, 2],
    "semi": [1, "always"],
    "no-unused-vars": [1, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "react/jsx-uses-vars": [2]
  }
};
