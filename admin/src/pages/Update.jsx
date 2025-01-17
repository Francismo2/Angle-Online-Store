import React, {useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { backendURL } from '../App'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import './Update.css'


const Update = ({token}) => {
  const {productItem, setProductItem, toastSuccess, toastError} = useContext(ShopContext);
  const { product_id } = useParams();
  const [loading, setLoading] = useState(false);

  const [image_1, setImage_1] = useState(false);
  const existingImage = productItem.image_1;
  const [image_2, setImage_2] = useState(false);
  const [image_3, setImage_3] = useState(false);
  const [image_4, setImage_4] = useState(false);

  const [image_2Close, setImage_2Close] = useState(false);
  const [image_3Close, setImage_3Close] = useState(false);
  const [image_4Close, setImage_4Close] = useState(false);

  const handleImgCloseButton = (imageIndex) => {
    if (imageIndex === 2) {
      setImage_2Close(true);
      setImage_2(false);
    }
    if (imageIndex === 3) {
      setImage_3Close(true);
      setImage_3(false);
    }
    if (imageIndex === 4) {
      setImage_4Close(true);
      setImage_4(false);
    }
  }

  const [removeImage_2, setRemoveImage_2] = useState(false);
  const [removeImage_3, setRemoveImage_3] = useState(false);
  const [removeImage_4, setRemoveImage_4] = useState(false);

  if (removeImage_2) {
    setImage_2(false);
    setRemoveImage_2(false)
  }
  
  if (removeImage_3) {
    setImage_3(false);
    setRemoveImage_3(false)
  }
  
  if (removeImage_4) {
    setImage_4(false);
    setRemoveImage_4(false)
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stocks, setStocks] = useState('');
  const [sizes, setSizes] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendURL + '/api/product/single', {product_id: Number(product_id)});
      if (response.data.success) {
        setProductItem(response.data.product);
        setName(response.data.product.product_name);
        setDescription(response.data.product.description);
        setDetails(response.data.product.product_details || '');
        setCategory(response.data.product.category_name);
        setPrice(String(response.data.product.price));
        setStocks(String(response.data.product.stock_quantity));
        setSizes(response.data.product.sizes || '');
        setBestSeller(response.data.product.is_bestseller);
        setIsActive(response.data.product.is_active);
        toast.success(response.data.message, {...toastSuccess});
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message, {...toastError});
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  const onSubmitHandler = async (e) => {

    setLoading(true); // LOADING

    e.preventDefault(); 
    try {
      const formData = new FormData()
      formData.append("product_id", product_id);
      formData.append("product_name", name);
      formData.append("description", description);
      formData.append("product_details", details);
      formData.append("sizes", sizes);
      formData.append("category_name", category);
      formData.append("price", price);
      formData.append("stock_quantity", stocks);
      formData.append("is_bestseller", bestSeller);
      formData.append("is_active", isActive);

      if (image_1) {
        formData.append("image_1", image_1);
      } else {
          formData.append("image_1", productItem.image_1);
      }
      
      if (image_2 && image_2Close || image_2 && !image_2Close) {
        formData.append("image_2", image_2);
      } else if (image_2Close && !image_2) {
        formData.append("image_2", null); // REMOVE THE IMG
      }

      if (image_3 && image_3Close || image_3 && !image_3Close) {
        formData.append("image_3", image_3);
      } else if (image_3Close && !image_3) {
        formData.append("image_3", null); // REMOVE THE IMG
      }

      if (image_4 && image_4Close || image_4 && !image_4Close) {
        formData.append("image_4", image_4);
      } else if (image_4Close && !image_4) {
        formData.append("image_4", null); // REMOVE THE IMG
      }

      const response = await axios.put(backendURL + "/api/product/update", formData, {headers:{token}})

      if (response.data.success) {
        window.location.reload();
        toast.success(response.data.message, {...toastSuccess});
      }
      else {
        toast.error(response.data.message, {...toastError});
      }

    } catch (error) {
      console.log(error)
      toast.error(response.data.message, {...toastError});
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className='main-container'>
      <Title setText={'UPDATE ITEM'}/>
      <div className='flex gap-2 semi-container'>
          <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
              <p className='mb-2'>Upload Image</p>
              <div className='flex gap-2'>
                {/* IMAGE #1 */}
                  <label htmlFor="image_1" className='img-label'>
                    <div className="img-container-u">
                      <img className="image-con" src={image_1 ? URL.createObjectURL(image_1) : existingImage} alt="Product"/>
                    </div>
                    <input onChange={(e) => setImage_1(e.target.files[0])} type="file" id="image_1" hidden/>
                  </label>
                {/* IMAGE #2  COPY PASTE TO SA 3 AND 4*/}
                <div> 
                {productItem.image_2 && !image_2Close ? (
                    <div className="img-container-u-edt">
                      <p onClick={() => handleImgCloseButton(2)} className='img-close-btn'><IoIosCloseCircle  /></p>
                      <img className="image-con" src={productItem.image_2} alt="" />
                    </div>
                  ) : (
                    <div className='main-img-container'>
                      <p onClick={() => setRemoveImage_2(true)}  className={`img-remove-btn ${image_2 ? '' : 'hidden-clbt'}`}><IoIosCloseCircle/></p>
                      <label htmlFor="image_2" className='img-label'>
                        <div className="img-container-u">
                          <img className="image-con" src={!image_2 ? assets.imgIcon : URL.createObjectURL(image_2)} alt=""/>
                        </div>
                        <input onChange={(e) => setImage_2(e.target.files[0])} type="file" id="image_2" hidden/>
                      </label>
                    </div>
                  )}
                </div>
                {/* IMAGE #3*/}
                <div> 
                {productItem.image_3 && !image_3Close ? (
                    <div className="img-container-u-edt">
                      <p onClick={() => handleImgCloseButton(3)} className='img-close-btn'><IoIosCloseCircle  /></p>
                      <img className="image-con" src={productItem.image_3} alt="" />
                    </div>
                  ) : (
                    <div className='main-img-container'>
                      <p onClick={() => setRemoveImage_3(true)}  className={`img-remove-btn ${image_3 ? '' : 'hidden-clbt'}`}><IoIosCloseCircle/></p>
                      <label htmlFor="image_3" className='img-label'>
                        <div className="img-container-u">
                          <img className="image-con" src={!image_3 ? assets.imgIcon : URL.createObjectURL(image_3)} alt=""/>
                        </div>
                        <input onChange={(e) => setImage_3(e.target.files[0])} type="file" id="image_3" hidden/>
                      </label>
                    </div>
                  )}
                </div>
                {/* IMAGE #4*/}
                <div> 
                {productItem.image_4 && !image_4Close ? (
                    <div className="img-container-u-edt">
                      <p onClick={() => handleImgCloseButton(4)} className='img-close-btn'><IoIosCloseCircle  /></p>
                      <img className="image-con" src={productItem.image_4} alt="" />
                    </div>
                  ) : (
                    <div className='main-img-container'>
                      <p onClick={() => setRemoveImage_4(true)}  className={`img-remove-btn ${image_4 ? '' : 'hidden-clbt'}`}><IoIosCloseCircle/></p>
                      <label htmlFor="image_4" className='img-label'>
                        <div className="img-container-u">
                          <img className="image-con" src={!image_4 ? assets.imgIcon : URL.createObjectURL(image_4)} alt=""/>
                        </div>
                        <input onChange={(e) => setImage_4(e.target.files[0])} type="file" id="image_4" hidden/>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ETO NA 1 */}
            <div className='w-full'>
              <p className='mb-2'>Product Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 p-2 style-input' type="text" placeholder="What's this product called?" required/>
            </div>
            <div className='w-full'>
              <p className='mb-2'>Product Description</p>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 p-2 style-input' type="text" placeholder="Tell me about this product" required/>
            </div>
            <div className='w-full'>
              <p className='mb-2'>Product Details</p>
              <textarea onChange={(e)=>setDetails(e.target.value)} value={details}  className='w-full max-w-[500px] px-3 p-2 style-input' rows="5" type="text" placeholder="Enter product details (e.g., materials, dimensions, care instructions)"/>
            </div>
            {/* ETO NA 2 */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
              {/* PRODUCT CATEGORY*/}
              <div>
                <p className='mb-2'>Product Category</p>
                <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2 style-input'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Striped Shirts(UNISEX)">Striped Shirts(UNISEX)</option>
                </select>
              </div>
              {/* PRODUCT STOCKS*/}
              <div>
                <p className='mb-2'>Product Stocks</p>
                <input onChange={(e)=>setStocks(e.target.value)} value={stocks} className='w-full px-3 py-2 sm:w-[120px] style-input' type="Number" placeholder='250' min="0" required/>
              </div>
              {/* PRODUCT PRICE*/}
              <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e)=>setPrice(e.target.value)} value={price}  className='w-full px-3 py-2 sm:w-[120px] style-input' type="Number" placeholder='₱150' min="0" required/>
              </div>
            </div>
            {/* SIZES */}
            <div>
              <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                  <div onClick={()=>setSizes(prev => prev.includes("XS") ? prev.filter(item => item !== "XS") : [...prev, "XS"])}>
                    <p className={sizes.includes("XS") ? 'text-sizes-slc' : 'text-sizes'}>XS</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                    <p className={sizes.includes("S") ? 'text-sizes-slc' : 'text-sizes'}>S</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                    <p className={sizes.includes("M") ? 'text-sizes-slc' : 'text-sizes'}>M</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                    <p className={sizes.includes("L") ? 'text-sizes-slc' : 'text-sizes'}>L</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                    <p className={sizes.includes("XL") ? 'text-sizes-slc' : 'text-sizes'}>XL</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                    <p className={sizes.includes("XXL") ? 'text-sizes-slc' : 'text-sizes'}>XXL</p>
                  </div>
                  <div onClick={()=>setSizes(prev => prev.includes("3XL") ? prev.filter(item => item !== "3XL") : [...prev, "3XL"])}>
                    <p className={sizes.includes("3XL") ? 'text-sizes-slc' : 'text-sizes'}>3XL</p>
                  </div>
                </div>
              </div>
            </div>
            {/* CHECKBOX  */}
            <div className='checkbox-container'>
              <div className='flex gap-2 mt-2'>
                <input onChange={()=>setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller'/>
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
              </div>
              <div className='flex gap-2 mt-2'>
                <input onChange={()=>setIsActive(prev => !prev)} checked={isActive} type="checkbox" id='isActive'/>
                <label className='cursor-pointer' htmlFor="isActive">Active product</label>
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button type='submit' className='update-submit' disabled={loading}>{loading ? 'UPDATING...' : 'UPDATE ITEM'}</button>
            {loading && <div className="loaderUPD"></div>}
        </form>
      </div>
    </div>
  )
}

export default Update

