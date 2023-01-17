module.exports = {
  "Article": {
    "body": function (body, _id) {
      return {
        ...body,
        author: _id
      }
    }
  }
}
