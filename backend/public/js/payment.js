document.getElementById('').addEventListener('submit', function (event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const amount = document.getElementById('amount').value;
        console.log(name, email);
        //create a Razorpay order
        fetch('customer/payment/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                amount
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //redirect to Razorpay checkout page
                const options = {
                    key: data.RAZORPAY_ID_KEY,
                    amount: data.amount,
                    currency: 'INR',
                    name: 'doorly',
                    description: 'Donation',
                    image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg', //uRL of your NGO logo
                    order_id: data.id,
                    handler: function (response) {
                        //on successful payment, submit the form with Razorpay transaction ID
                        document.getElementById('transactionId').value = response.razorpay_payment_id;
                        document.getElementById('paymentMethod').value = response.razorpay_payment_method;
                        document.getElementById('').submit();
                    },
                    prefill: {
                        name,
                        email,
                        contact: phone
                    },
                    theme: {
                        color: '#3399cc'
                    }
                };


                const rzp = new Razorpay(options);
                rzp.open();
            })
            .catch(error => console.error('Error creating Razorpay order:', error));
    });