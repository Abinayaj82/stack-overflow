import * as api from '../api';

export const handleSubscription = (id,amount) => async(dispatch)=>{
    try {
        const { data : {order}}= await api.order(amount)
       // console.log(data);

       const options ={
        key:'rzp_test_bjixu96qD2TWQh',
        amount: order.amount,
        currency: "INR",
        name: "StackOverflow Plan",
        description: "Tutorial of RazorPay",
        order_id: order.id,
        handler : async function(response){
            console.log("Response",response);
            const result = await api.verifyOrder({id, amount, response});
            console.log(result);
            if(result.data.success === true){
                alert("New Subscription Plan is activated. Please login again.");
            } else {
                alert("The Plan has failed to activate")
            }
        },
        prefill:{
            name:"Abinaya",
            email:"abinaya@gmail.com",
            contact:"012345678"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#ef8236"
        }
       }
       const razor = new window.Razorpay(options);
       razor.open();
    } catch (error) {
         console.log(error)
    }
}
export const checkSubscription = (id)=> async(dispatch)=>{
    try {
        const {data} = await api.checkSubscription(id);
        console.log(data);
        if(data.subs=== 'Free'){
            dispatch({type:'UPDATE_CURRENT_USER', payload: data.newUser})
            alert('Your monthly subscription ended')
        }
    } catch (error) {
        console.log(error)
    }
}