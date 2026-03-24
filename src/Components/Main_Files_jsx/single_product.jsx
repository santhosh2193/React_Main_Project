import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../CSS_Styles/./singel_product.css'


function Single_product() {
    const {id} = useParams()
    const [product,setProduct] = useState({})

    useEffect(()=>{

        async function one_product(){
            try {
                
                let res = await fetch(`https://fakestoreapi.com/products/${id}`,{
                    method:"GET"
                })
                let jsonres = await res.json()
                setProduct(jsonres)

            } catch (error) {
                console.log(error)
            }
        }

        one_product()

    },[])




  return (
        <div className="single-product-container">
            {product.image && <img src={product.image} alt={product.title} />}
            <h2>{product.title}</h2>
            <h3>Price: ${product.price}</h3>
            <h4>Category: {product.category}</h4>
            {product.rating && <p>Rating: {product.rating.rate} ⭐</p>}
            <p>About Product: {product.description}</p>

            <Link to="/products" className="back-btn">⬅ Back to Products</Link>
        </div>
  )
}

export default Single_product