const socket = io('/cashier-customer');


    function addProduct() {
      const product = document.getElementById('productInput').value;
      socket.emit('cashierAddProduct', product);
    }


    socket.on('productAdded', product => {




      console.log('Product added:', product);
    });