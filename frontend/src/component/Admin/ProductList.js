import React, { Fragment, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useSelector , useDispatch } from 'react-redux';
import { clearErrors, getAdminProduct,deleteProduct } from '../../actions/productAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';

const ProductList = ({history}) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, products }  = useSelector((state)=> state.products);
    const { error: deleteError, isDeleted } = useSelector((state)=>  state.product);

    const deleteProductHandler = (id)=>{
         dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
             alert.success("Product Deleted Successfully");
             history.push("/admin/dashboard");
             dispatch({type: DELETE_PRODUCT_RESET});
        }
         dispatch(getAdminProduct());
    }, [dispatch, alert, error,deleteError, history, isDeleted]);

    const column = [
         {field: 'id', headerName:"Product ID", minWidth: 200, flex: 0.5},
         {field: 'name', headerName:"Name", minWidth: 150, flex: 0.7},
         {field: 'stock', headerName:"Stock",type: 'number', minWidth: 150, flex: 0.3},
         {field: 'price', headerName:"Price",type:'number', minWidth: 180, flex: 0.5},
         {field: 'actions', headerName:"Actions",type:'number', minWidth: 150, flex: 0.3, sortable: false, renderCell: (params)=>{
             return( <Fragment>
                 <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                     <EditIcon />
                 </Link>
                 <Button onClick={()=>deleteProductHandler(params.getValue(params.id, 'id'))}>
                     <DeleteIcon/>
                 </Button>
             </Fragment>);
         },}  
    ];

    const rows = [];
    
    products && products.forEach((item)=>{
            rows.push({
                id : item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    return <Fragment>
        <MetaData title={'All Product - Admin'} />

        <div className='dashboard'>
           <SideBar />
           <div className="productListContainer">
               <h1 id ="productListHeading">All Products</h1>

               <DataGrid
                rows={rows}
                columns={column}
                pageSize={8}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
               />
               <div className='allProductsBtn' >
              <a href="/admin/product" className='createProductBtn'>Create Product</a>
               </div>
           </div>
        </div>
    </Fragment>;
    
};

export default ProductList;
