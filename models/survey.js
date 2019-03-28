const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SurveySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    surveyName: {
      type: String,
      required: true
    },
    pages: {
      type: Object,
      required: true
    },
    setting: {
      anonQuest: {
        type: Boolean,
        required: true
      },
      questNumb: {
        type: Boolean,
        required: true
      },
      pageNumb: {
        type: Boolean,
        required: true
      },
      randomQuests: {
        type: Boolean,
        required: true
      },
      asterisksFields: {
        type: Boolean,
        required: true
      },
      progressBar: {
        type: Boolean,
        required: true
      }
    },
    url: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

SurveySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Survey', SurveySchema);
