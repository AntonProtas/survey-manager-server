const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    }

    // ,
    // setting: {
    //   anonQuest: {
    //     type: Boolean,
    //     required: true
    //   },
    //   questNumb: {
    //     type: Boolean,
    //     required: true
    //   },
    //   pageNumb: {
    //     type: Boolean,
    //     required: true
    //   },
    //   randomQuests: {
    //     type: Boolean,
    //     required: true
    //   },
    //   asterisksFields: {
    //     type: Boolean,
    //     required: true
    //   },
    //   progressBar: {
    //     type: Boolean,
    //     required: true
    //   }
    // }
  },
  { versionKey: false, strict: false }
);

module.exports = mongoose.model('Survey', SurveySchema);