const mongoose = require("mongoose");
const Joi = require("joi");
const { typeSchema } = require("./type");

const flavourSchema = new mongoose.Schema({
  //TODO you do not have parameters for these properties (min length ex)
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  type: { type: typeSchema, required: true },
  description: String,
  cost: Number,
  licks: Number,
  //TODO figure out how to add an image to mongodb, currently will just be the path to the picture
  picture: String,
});

const Flavour = mongoose.model("Flavour", flavourSchema);

//Validate the flavour before allowing the requset to occur
function validateflavour(flavour) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    typeId: Joi.string().required(),
    description: Joi.string(),
    cost: Joi.number(),
    licks: Joi.number(),
    picture: Joi.string(),
  };

  return Joi.validate(flavour, schema);
}

exports.Flavour = Flavour;
exports.validate = validateflavour;
