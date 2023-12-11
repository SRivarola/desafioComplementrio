import MyRouter from "../router.js";
import env from "../../config/env.js";
import Stripe from "stripe";

export default class PaymentsRouter extends MyRouter {
    init() {

        this.post(
            '/payment-intents/:amount',
            ["USER", "PREMIUM"],
            async (req, res, next) => {
                try {
                    const { amount } = req.params;

                    const data = {
                        amount: amount * 100,
                        currency: 'usd'
                    }
                    const stripe = new Stripe(env.STRIPE_KEY);
                    const intent = await stripe.paymentIntents.create(data);

                    return res.sendSuccessCreate({
                        message: "done",
                        payload: intent
                    })

                } catch (error) {
                    next(error)
                }
            }
        )

    }
}
