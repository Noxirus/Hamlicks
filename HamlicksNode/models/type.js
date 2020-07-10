const mongoose = require("mongoose");
const Joi = require("joi");

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Type = mongoose.model("Type", typeSchema);

//Validate the flavour before allowing the requset to occur
function validatetype(type) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(type, schema);
}

exports.Type = Type;
exports.validate = validatetype;
exports.typeSchema = typeSchema;
