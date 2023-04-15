const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v) {
        let numArray = v.split('-');
        if (numArray.length > 2) {
          return false;
        }
        if (numArray[0].lenth < 2 || numArray[0].length > 3) {
          return false
        }
        if (!/^\d+$/.test(numArray[1])) {
          return false;
        }
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
