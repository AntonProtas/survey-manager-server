const mongoose = require('mongoose');

const SurveyResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey',
      required: true
    },
    answers: {
      type: Object,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('SurveyResult', SurveyResultSchema);
