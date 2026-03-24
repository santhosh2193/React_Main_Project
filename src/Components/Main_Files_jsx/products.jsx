import React, { useEffect,useState } from 'react'
import '../CSS_Styles/./products.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from "react"; 
import { CartContext } from "./cart_context";

function Products() {

    const { cart, addToCart, decrementFromCart } = useContext(CartContext);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const [product,setProduct] = useState([])
    const [search,setSearch] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [sortOrder,setSortOrder] = useState("asc")
    const navigate = useNavigate()

    if (localStorage.getItem("user_login")==null){
            navigate("/")
    }

    useEffect(()=>{
        async function get_products(){
            try {
                setIsLoading(true)
                let res = await fetch("https://fakestoreapi.com/products")
                let jsonres = await res.json()
                setProduct(jsonres)
                setIsLoading(false) 
            } catch (error) {
                console.log(error)
            }

        }
        get_products()
    },[])

    const onLogoutBtn = ()=>{
        navigate("/")
        localStorage.removeItem("user_login")
    }



    // fetch either all products or a specific category
    let onHandleSubmitBtn = async (category)=>{
        try {
            setIsLoading(true)
            let url = "https://fakestoreapi.com/products";
            if (category && category !== "Home") {
                url = `https://fakestoreapi.com/products/category/${category}`;
            }
            let res = await fetch(url);
            let jsonres = await res.json();
            setProduct(jsonres);
            // alert("Successfully added to cart!");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    let onSortprice = () => {                   /*This function for Sorting Array */
        const sorted = [...product].sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProduct(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };




    let filterData = product.filter((item)=>{

        return item.title.toLowerCase().includes(search.toLocaleLowerCase())
    })





            let onHandleCart = async (id) => {
            try {
              let res = await fetch(`https://fakestoreapi.com/products/${id}`);
              let jsonres = await res.json();
              addToCart(jsonres);
              alert("Successfully added to cart!");
            } catch (error) {
              console.error("Failed to add product to cart:", error);
            }
            };







  return (
    <>

    <div className='headers'>
        <button onClick={()=>onHandleSubmitBtn("Home")}>🏡Home</button>
        <button onClick={()=>onHandleSubmitBtn("men's clothing")}>👔men's</button>
        <button onClick={()=>onHandleSubmitBtn("women's clothing")}>👚women's</button>
        <button onClick={()=>onHandleSubmitBtn("jewelery")}>💍jewelery</button>
        <button onClick={()=>onHandleSubmitBtn("electronics")}>🚃electronics</button>
    
        <button onClick={onSortprice} className='sort-order'>
            Price {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
        <input type="search" onChange={(e)=>setSearch(e.target.value)} width={10} placeholder="Search products..." />

         <Link to="/cart" className="position-relative">
         <button>            🛒 Cart
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {totalItems}
            </span>
         </button>

        </Link>




        <button onClick={onLogoutBtn} >Logout</button>
    </div>


    <div className='product_parent_card'>
        {
            isLoading?(

               <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-50"> 
                    <div className="spinner-border text-primary" role="status"> 
                        <span className="visually-hidden">Loading...</span> 
                    </div> 
                </div>


            ):(

                filterData.length === 0 ? (
                <h1>No Products Found....</h1>
            ) : (
                filterData.map((item)=>{
                const inCart = cart.find((product)=> product.id === item.id);
                const qty = inCart ? inCart.qty : 0;
                return(
                        <div className='card' key={item.id}>
                            <Link to={`/singleproduct/${item.id}`} ><img src={item.image} alt="" width={200} height={150}/></Link>
                            <h2>{item.title}</h2>
                            <h2>price: ${item.price}</h2>
                            <h4>{item.category}</h4>
                            <h2>rating: {item.rating.rate}</h2>
                            {qty === 0 ? (
                              <button onClick={()=>onHandleCart(item.id)}>Add To Cart</button>
                            ) : (
                              <div className='qty-actions'>
                                <button className='qty-btn' onClick={()=>decrementFromCart(item.id)}>-</button>
                                <span className='qty-count'>{qty}</span>
                                <button className='qty-btn' onClick={()=>addToCart(item)}>+</button>
                              </div>
                            )}
                        </div>
                    
                )
            })
            )

            )
            
        }
    </div>
    </>
  )
}

export default Products