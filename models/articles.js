var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: {type: String, required: true, unique: true},
  txt: {type: String, required: true}
});

Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
