
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  await Assessment.create({
    catDateOfBirth: assessment.catDate,
    catName: assessment.catName,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,
  });
};
exports.delete = async (id) => {
  // eslint-disable-next-line no-console
  console.log(id);
  const catID = parseInt(id);
  // eslint-disable-next-line no-console
  console.log(catID);
  await Assessment.destroy({
    where: {
      id: catID,
    },
  });

};

// use the sequelize model Assessments from packages/api/src/database/models to fetch
// the assessment data from the PostgreSQL database
exports.getList = async () => await Assessment.findAll();

// console.log(`testthree`);

// console.log(assessments);
