
const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      // console.log(assessment);

      await AssessmentService.submit(assessment);

      ResponseHandler(
        res,
        `Submitted assessment`,
        { },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.post(
  `/delete`,
  async (req, res, next) => {
    try {
      const { id } = req.body;

      await AssessmentService.delete(id);

      ResponseHandler(
        res,
        `Deleted assessment`,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,
  async (req, res, next) => {
    try {

      const data = await AssessmentService.getList();

      ResponseHandler(
        res,
        `Fetched assessments`,
        data,
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
