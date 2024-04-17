// Variant picker
let variantButtons = document.querySelectorAll('.variant-btn');
if(variantButtons) {
  variantButtons.forEach((item) =>{
    item.addEventListener('click', function() {
      let variantId = this.getAttribute('data-variant-id');
      let parent = this.parentNode;
      let MainParent = parent.parentNode;
      parent.querySelectorAll('.variant-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      MainParent.querySelector('.add-to-cart-btn').setAttribute('data-variant-id', variantId);
    });
  })

}

// Add to cart
let addButtons = document.querySelectorAll('.add-to-cart-btn');
if ( addButtons) {
  addButtons.forEach((item) => {
    item.addEventListener('click', function() {
      let custom_tag = item.getAttribute('data-custom-tag');
      let variantId = this.getAttribute('data-variant-id');
      let originalText = this.innerText;
      this.innerText = 'Adding';
      this.disabled = true;
      let object = {};

      if(custom_tag === 'true') {
        object = {
          id: variantId,
          quantity: 1,
          properties: {
            custom_tag: 'bought_featured'
          }
        }
      } else {
        object = {
          id: variantId,
          quantity: 1
        }
      }

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      })
          .then(response => {
            this.innerText = 'Added';
            setTimeout(() => {
              this.innerText = originalText;
              this.disabled = false;
            }, 1500);
          })
          .catch(error => {
            console.error('Error adding product to cart:', error);
            this.innerText = originalText;
            this.disabled = false;
          });
    });
  })
}
