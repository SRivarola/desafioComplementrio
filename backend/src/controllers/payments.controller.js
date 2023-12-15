import createService from '../services/payments.service.js'

export default async function (req, res, next) {
  try {
    const { amount } = req.params;
    console.log(amount)
    const intent = await createService(amount, 'usd')
    console.log(intent)
    return res.sendSuccessCreate({
      message: "done",
      payload: intent,
    });
  } catch (error) {
    next(error);
  }
}
