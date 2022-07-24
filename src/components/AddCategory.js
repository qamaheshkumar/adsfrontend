import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCategory() {
    const [addCategory, setAddCategory] = useState({ 'id': '', 'category': '' });
    const [allCategory, setAllCategory] = useState('');
    const [isEditCategory, setIsEditCategory] = useState(false);

    const handleCategory = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if (isEditCategory) {
            var baseURL = 'https://www.janathads.com/api/category-update/' + addCategory.id + '/'
            await axios
                .put(baseURL, { 'category': addCategory.category })
                .then((response) => {
                });
            setIsEditCategory(false)
        } else {
            baseURL = 'https://www.janathads.com/api/category-create/'
            try {
                await axios
                    .post(baseURL, { 'category': addCategory.category })
                    .then((response) => {
                    });
            } catch (error) {
                console.log(error)
            }
        }
        setAddCategory({ 'id': '', 'category': '' });
        axiosCategoryResponse()
    }

    const editCategory = (category) => {
        setIsEditCategory(true)
        setAddCategory(category)
    }

    const deleteCategory = (category) => {
        var baseURL = 'https://www.janathads.com/api/category-delete/' + category.id + '/'
        axios
            .delete(baseURL)
            .then((response) => {
                axiosCategoryResponse()
            });

    }

    const axiosCategoryResponse = async () => {
        const categoryResponse = await axios.get('https://www.janathads.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        // const allCategory = await categoryResponse.data
    }

    useEffect(() => {
        axiosCategoryResponse()
    }, [])


    return (
        <div className="container py-5">
            <h4 className="linetitle mb-4">Add Categories</h4>
            <div className="row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input onChange={(e) => setAddCategory({ 'id': addCategory.id, 'category': e.target.value })} value={addCategory.category} className="form-control" id="title" type="text" placeholder="Add Category here.." />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={handleCategory} type="submit" id="button-addon2">Add</button>
                        </div>
                    </div>


                    <ul className="list-group list-group-flush">
                        {allCategory ? (
                            allCategory.map(function (eachCategory, index) {
                                return (
                                    <li className="list-group-item d-flex px-0" key={index}>
                                        {eachCategory.category}
                                        <button onClick={() => editCategory(eachCategory)} className="btn btn-sm btn-warning ml-auto mr-2"><i className="fa fa-pencil mr-1"></i>Edit</button>
                                        <button onClick={() => deleteCategory(eachCategory)} className="btn btn-sm btn-danger delete"><i className="fa fa-trash mr-1"></i>Delete</button></li>


                                )
                            })
                        ) : null}</ul>
                </div>
            </div>  </div>
    )

}

export default AddCategory;