const socket = io();

    function addProduct(product) {
      const productName = product.product_name;
      const productQuantity = document.getElementById('productQuantityInput').value;
      const product = {
        name: productName,
        quantity: productQuantity
      };
      socket.emit('customerAddProduct', product);
    }

    socket.on('productAdded', product => {




      console.log('Product added:', product);
    });