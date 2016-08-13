const EXAM_WEIGHT = 0.65;
const EXERCISE_WEIGHT = 0.35;

function getLetterGrade(finalScore) {
  if (finalScore >= 93) {
    return 'A';
  } else if (finalScore >= 85 && finalScore < 93) {
    return 'B';
  } else if (finalScore >= 77 && finalScore < 85) {
    return 'C';
  } else if (finalScore >= 69 && finalScore < 77) {
    return 'D';
  } else if (finalScore >= 60 && finalScore < 69) {
    return 'E';
  } else {
    return 'F';
  }
}

function calcGrade(score) {
  var examAvg = getExamAverage(score.exams);
  var exerciseTotal = score.exercises.reduce(add);
  var finalScore = Math.round(examAvg * EXAM_WEIGHT + exerciseTotal * EXERCISE_WEIGHT);
  return finalScore + " (" + getLetterGrade(finalScore) + ")";
}

function getGrades(scores) {
  return scores.map(function(score) {
    return calcGrade(score);
  });
}

function transpose(examScores) {
  return examScores[0].map(function(column, columnIndex) {
    return examScores.map(function(row) {
      return row[columnIndex];
    });
  });
}

function add(total, score) {
  return total ? total + score : score;
}

function getExamMin(scores) {
  return Math.min.apply(null, scores);
}

function getExamMax(scores) {
  return Math.max.apply(null, scores);
}

function getExamAverage(scores) {
  return scores.reduce(add) / scores.length;
}

function getExamSummary(examScores) {
  return transpose(examScores).map(function(set) {
    return {
      average: getExamAverage(set),
      minimum: getExamMin(set),
      maximum: getExamMax(set)
    };
  });
}

function generateClassRecordSummary(data) {
  var scores = Object.keys(data).map( student => data[student].scores );
  var examScores = scores.map( s => s.exams );

  return {
    studentGrades: getGrades(scores),
    exams: getExamSummary(examScores)
  };
}
