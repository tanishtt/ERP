const socket = io();



    function addProduct() {
      const productName = document.getElementById('productNameInput').value;
      const productQuantity = document.getElementById('productQuantityInput').value;
      const product = {
        name: productName,
        quantity: productQuantity
      };
      socket.emit('cashierAddProduct', product);
    }


    
    socket.on('productAdded', product => {
      // Handle displaying the product added by customer
      console.log('Product added:', product);
    });