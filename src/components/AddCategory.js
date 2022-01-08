import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddCategory() {
    const [addCategory, setAddCategory] = useState({'id':'', 'category':''});
    const [allCategory, setAllCategory] = useState('');
    const [isEditCategory, setIsEditCategory] = useState(false);

   const handleCategory = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if(isEditCategory) {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/category-update/'+addCategory.id+'/'
            await axios
            .put(baseURL, {'category':addCategory.category})
            .then((response) => {
            });
            setIsEditCategory(false)
        } else {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/category-create/'
            try{
                await axios
                .post(baseURL, {'category':addCategory.category})
                .then((response) => {
                });                
            } catch (error) {
                console.log(error)
            }    
        }
        setAddCategory({'id':'', 'category':''});
        axiosCategoryResponse()
    }

    const editCategory = (category) => {
        setIsEditCategory(true)    
        setAddCategory(category)
    }

    const deleteCategory = (category) => {
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/category-delete/'+category.id+'/'
        axios
        .delete(baseURL)
        .then((response) => {
            axiosCategoryResponse()
        });
        
    }    

    const axiosCategoryResponse = async () => {
        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        const allCategory = await categoryResponse.data
    }
    
    useEffect(() => {
        axiosCategoryResponse()
    }, [])


    return (
        <div className="container">
            <div className="col-md-12 justify-content-center">
                <label className="form-label" ><h4>Add Categories Here...</h4></label> 
                    <div  className="col-md-6">
                        <div className="flex-wrapper">
                            <div style={{flex: 4}}>
                                <input onChange={(e)=>setAddCategory({'id':addCategory.id, 'category':e.target.value})} value={addCategory.category} className="form-control" id="title" type="text" placeholder="Add category here.." />
                            </div>
                            <div style={{flex: 1}}>
                                <button className="btn btn-primary" onClick={handleCategory} type="submit">Add</button>                                        
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {allCategory? (
                        allCategory.map(function(eachCategory, index){
                            return(
                                <div key={index} className="task-wrapper flex-wrapper">

                                    <div style={{flex:7}}>
                                        <span>{eachCategory.category}</span>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => editCategory(eachCategory)} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => deleteCategory(eachCategory)} className="btn btn-sm btn-outline-dark delete">-</button>
                                    </div>

                                </div>
                            )
                        })
                        ): null}
                    </div>                            
            </div>            
        </div>    
    )
      
  }

export default AddCategory;