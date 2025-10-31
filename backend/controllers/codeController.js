import { executeCode } from "../services/executionService.js";

const compileCode = async (req, res, next) => {
  const { language, code, input } = req.body;

  try {
    const result = await executeCode(language, code, input);
    res.json({ output: result });
  } catch (error) {
    next(error);
  }
};

export { compileCode };
