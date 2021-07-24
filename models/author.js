// Author
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Schema.Types.Boolean.convertToFalse.add('');

const authorSchema = new mongoose.Schema ({
    name: { type: String, required: [true, 'Name must be provided'] },
    comments: { type: String },
    active: { type: Boolean }
});

module.exports = mongoose.model("Author", authorSchema);
