Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image">
    </div>


    <div class="product-info">

        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p> Shipping: {{ shipping}} </p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
        :key="variant.variantid"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProductImage(index)">
    
        </div>

        <button v-on:click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock}">Add to Cart</button>

        

    </div>


</div>
    `,
    data() {
        return {

            brand: 'Vue Masterful',
            product: 'Socks',
            inStock: true,
            selectedVariant: 0,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [{
                    variantId: 1,
                    variantColor: 'green',
                    variantImage: './assets/vue-socks-green.jpeg'
                },
                {
                    variantId: 2,
                    variantColor: 'blue',
                    variantImage: './assets/vue-socks-blue.jpeg'
                }
            ]

        }
    },
    methods: {
        addToCart: function () {
           this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProductImage: function (index) {
            this.selectedVariant = index

        }
    },
    computed: {
        title() {

            return this.brand + ' ' + this.product

        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }

        }

    }
})
var product = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        }
    }

})