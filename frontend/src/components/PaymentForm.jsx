import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if (!error) {
            // createAlertWithCallback('success','¡Pago completado!',"El pago ha sido procesado con éxito",()=>window.location.replace('/'))
        } else {
            console.log(error);
        //    createAlert('error','Error al procesar el pago',error.message)
        }
    }
    return <>
        <form>
            <PaymentElement />
            <div className="">
                <button className="" onClick={handleSubmit}>PAY</button>
            </div>
        </form>
    </>
}
export default PaymentForm;