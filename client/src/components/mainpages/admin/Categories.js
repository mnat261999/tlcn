import React, {useState, useContext,useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import './css/category.css'
import {Link} from 'react-router-dom'
import { Row, Col } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { Tree } from 'antd';
import { Select } from 'antd';

const { Option } = Select;




function Categories() {
    const state = useContext(GlobalState)
    console.log(state)
    const [categories] = state.categoriesAPI.categories
    console.log({categories})
    const [typePage] = state.categoriesAPI.typePage
    const [category, setCategory] = useState('')

    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onAdd, setOnAdd] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [onDelete, setOnDelete] = useState(false)
    const [id, setID] = useState('')

    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryType, setCategoryType] = useState('')

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [selectedArray, setSelectedArray] = useState([]);

    

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpanded(expandedKeysValue)
      };

    const onSelect = (selectedKeys, info) => {
        setSelected(selectedKeys)
        console.log({selectedKeys});
        console.log({selected})
        
      };
    
    const onCheck = (checkedKeys, info) => {
        setChecked(checkedKeys)
        console.log('onCheck', checkedKeys, info);
    };

    
    const  handleCancel = () => {
        setOnAdd(false)
        setOnEdit(false)
        setOnDelete(false)
        setVisible(false)
    };


    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
              index == _index ? { ...item, [key]: value } : item
            );
            setCheckedArray(updatedCheckedArray);
          } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
              index == _index ? { ...item, [key]: value } : item
            );
            setExpandedArray(updatedExpandedArray);
          }else if (type == "selected") {
            const updatedSelectedArray = selectedArray.map((item, _index) =>
              index == _index ? { ...item, [key]: value } : item
            );
            setSelectedArray(updatedSelectedArray);
          }
    }
    
    const showModalAdd = () => {
        setVisible(true)
        setOnAdd(true)
        console.log({onAdd})
        setOnEdit(false)
        setOnDelete(false)
        if(selected)
        {
            setParentCategoryId(selected)
        }
        console.log({selected})
        
       
    };

    const ModalAdd = () =>{
        return <>
            <Modal
                visible={visible}
                title="Add new category"
                onOk={createCategory}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={createCategory}>
                    Create
                    </Button>
                ]}
                >
                <Input style={{marginBottom :'20px'}} value={categoryName} placeholder="Category Name" onChange={(e)=> setCategoryName(e.target.value)} />
                <select style={{marginBottom :'20px'}} className="group-control-model" value={parentCategoryId} onChange={(e)=> setParentCategoryId(e.target.value)} placeholder="Please select a category">
                    <option>Select a category</option>
                    {
                        createCategoryList(categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                <select style={{marginBottom :'20px'}} className="group-control-model" value={categoryType} onChange={(e)=> setCategoryType(e.target.value)} placeholder="Please select a type">
                    <option>Select a type</option>
                    {
                        typePage.map(option =><option key={option._id} value={option._id}>{option.name}</option>)
                    }
                </select>
            </Modal> 
        </>
      }
    
    const updateCheckedExpandedSelected= ()=>{
        setVisible(true)
        const cats = createCategoryList(categories)
        const checkedArray = [];
        const expandedArray = [];
        const selectedArray = [];

        checked.length > 0 && checked.map((categoryId,index) => {
            const cat = cats.find((category, _index) => categoryId === category.value)
            cat && checkedArray.push(cat)
        })

        expanded.length > 0 && expanded.map((categoryId,index) => {
            const cat = cats.find((category, _index) => categoryId === category.value)
            cat && expandedArray.push(cat)
        })

        selected.length > 0 && selected.map((categoryId,index) => {
            const cat = cats.find((category, _index) => categoryId === category.value)
            cat && selectedArray.push(cat)
        })

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        setSelectedArray(selectedArray);
        console.log({checked, expanded,selected, cats, checkedArray, expandedArray,selectedArray})
    }

    const showModalEdit= () => {
        setOnEdit(true)
        updateCheckedExpandedSelected()
    };

    const ModalEdit = () =>{
        return <>
            <Modal
                visible={visible}
                title="Edit new category"
                onOk={editCategory}
                onCancel={handleCancel}
                width={1000}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={editCategory}>
                    Edit
                    </Button>
                ]}
                >
{/*                     <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>

                    {
                        expandedArray.length > 0 && expandedArray.map((item,index) => 
                        
                        <Row key={index} gutter={[8, 8]}>
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                                <Input style={{marginBottom :'20px'}} value={item.name} placeholder="Category Name" onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} />
                            </Col>

                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model"  value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')} placeholder="Please select a category">
                                <option>Select a category</option>
                                {
                                    createCategoryList(categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>

                            <Col  xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model" value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')} placeholder="Please select a type">
                                <option>Select a type</option>
                                {
                                    typePage.map(option =><option key={option._id} value={option._id}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                        </Row>
                        )
                    } */}

                    <Row>
                        <Col>
                            <h6>Checked</h6>
                        </Col>
                    </Row>


                    {
                        checkedArray.length > 0 && checkedArray.map((item,index) => 
                        
                        <Row key={index} gutter={[8, 8]}>
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                                <Input style={{marginBottom :'20px'}} value={item.name} placeholder="Category Name" onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} />
                            </Col>

                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model"  value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')} placeholder="Please select a category">
                                <option>Select a category</option>
                                {
                                    createCategoryList(categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>

                            <Col  xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model" value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')} placeholder="Please select a type">
                                <option>Select a type</option>
                                {
                                    typePage.map(option =><option key={option._id} value={option._id}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                        </Row>
                        )
                    }



{/*                     <Row>
                        <Col>
                            <h6>Selected</h6>
                        </Col>
                    </Row>


                    {
                        selectedArray.length > 0 && selectedArray.map((item,index) => 
                        
                        <Row key={index} gutter={[8, 8]}>
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                                <Input style={{marginBottom :'20px'}} value={item.name} placeholder="Category Name" onChange={(e) => handleCategoryInput('name', e.target.value, index, 'selected')} />
                            </Col>

                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model"  value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'selected')} placeholder="Please select a category">
                                <option>Select a category</option>
                                {
                                    createCategoryList(categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>

                            <Col  xs={{span: 24}} sm={{span: 24}} md={{span: 8}} lg={{span: 8}} lx={{span: 8}}>
                            <select className="group-control-model" value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'selected')} placeholder="Please select a type">
                                <option>Select a type</option>
                                {
                                    typePage.map(option =><option key={option._id} value={option._id}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                        </Row>
                        )
                    }  */}

            </Modal> 
        </>
    }

    const showModalDelete = () => {
        setOnDelete(true)
        updateCheckedExpandedSelected()
    }

    const ModalDelete = () =>{
        console.log('delete', checkedArray)
        return<>
            <Modal
                visible={visible}
                title="Delete category"
                onOk={deleteCategory}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    No
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={deleteCategory}>
                    Yes
                    </Button>
                ]}
                >
{/*                     <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.map((item,index) =>(<span key={index}>{item.name}</span>))
                    } */}

                    <Row>
                        <Col>
                            <h6>Checked</h6>
                        </Col>
                    </Row>
                    {
                        checkedArray.map((item,index) =>(<><span key={index}>{item.name}</span><br></br></>))
                    }
{/* 
                    <Row>
                        <Col>
                            <h6>Selected</h6>
                        </Col>
                    </Row>
                    {
                        selectedArray.map((item,index) =>(<><span key={index}>{item.name}</span><br></br></>))
                    } */}
            </Modal> 
        </>
    }

    const renderCategories = (cate) => {
        console.log(cate);
        let myCategories = [];
        cate.map((cat) => {
            myCategories.push({
            title: cat.name,
            key: cat._id,
            children:cat.children.length > 0 && renderCategories(cat.children),
          });
        });
        return myCategories;
    }; 

    
    const createCategoryList = (cate, options =[]) => {

        cate.map((cat) =>{
            options.push({value:cat._id, name: cat.name, parentId: cat.parentId, type: cat.type, images:cat.images});
            if(cat.children.length > 0)
            {
                createCategoryList(cat.children, options)
            }
        })

        return options;
    };

    const createCategory = async e => {
        const form = new FormData();
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('type', categoryType)
        const res = await axios.post('/api/category', form, {
            headers: {Authorization: token}
        })
        setCategoryName('')
        setParentCategoryId('')
        setCategoryType('')
        setOnAdd(false)
        setCallback(!callback)
        console.log(res)
        setVisible(false)
    };

    const editCategory = async e =>{
/*         const form = new FormData();
        
        expandedArray.map((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        checkedArray.map((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        selectedArray.map((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        const res = await axios.get('/api/category')
        setCategories(res.data.categoryList)
        console.log({res})
        console.log({categories})

        await axios.post('/api/category/update', form, {
            headers: {Authorization: token}
        })

        setCheckedArray('');
        setExpandedArray('');
        setSelectedArray('');
        setSelected([])
        setOnEdit(false);
        setCallback(!callback)
        setVisible(false) */
        const form = new FormData();
/*         expandedArray.forEach((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('type', item.type)
            form.append('parentId', item.parentId ? item.parentId : "")
        }) */

        checkedArray.forEach((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('type', item.type)
            form.append('parentId', item.parentId ? item.parentId : "")
        })

/*         selectedArray.forEach((item,index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('type', item.type)
            form.append('parentId', item.parentId ? item.parentId : "")
        })
 */
        
        //const arr  = Array.from(form);
        //localStorage.setItem('myform', JSON.stringify(arr));
        //console.log(JSON.stringify(arr))

        const res =await axios.post('/api/category/update', form, {
            headers: {Authorization: token}
        })

        if(res.status === 201)
        {
            console.log(res)
        }else{
            console.log(res)
        }
        setCheckedArray('');
        setOnEdit(false);
        setCallback(!callback)
        setVisible(false)
    }

    const deleteCategory = async e =>{

        //const expandedIdsArray = expandedArray.map((item,index) =>({_id: item.value}))
        const checkedIdsArray = checkedArray.map((item,index) =>({_id: item.value}))
        //const selectedIdsArray = selectedArray.map((item,index) =>({_id: item.value}))
        //const idsArray = checkedArray.concat(selectedArray)
        //console.log(idsArray)

        console.log({checkedIdsArray})
        
        if(checkedIdsArray.length > 0){
            const res = await axios.post('/api/category/delete', {ids:checkedIdsArray}, {
                headers: {Authorization: token}
        })

            if(res.status ===  202)
            {
                setSelected([])
                setOnDelete(false)
                setCallback(!callback)
                setVisible(false)
                return alert(res.data.msg)
            }
        }

/*         if(selectedIdsArray.length > 0){
            const res = await axios.post('/api/category/delete', {ids:selectedIdsArray}, {
                headers: {Authorization: token}
            })
            if(res.status ===  202)
            {
                setSelected([])
                setOnDelete(false)
                setCallback(!callback)
                setVisible(false)
                return alert(res.data.msg)
            }
        }
        setSelected([]) */
        setOnDelete(false)
        setCallback(!callback)
        setVisible(false)
    }



    return (
        <>
        <Row justify="space-between">
            <Col xs={{span: 12}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} lx={{span: 12}}>
                <h2 className="text-4xl">All Categories</h2>
            </Col>
            <Col xs={{span: 12}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} lx={{span: 12}} className="text-right mb-2">
                <Button className="mr-7" type="primary" onClick={showModalAdd}>
                    ADD
                </Button>
                <Button className="mr-7" type="primary" onClick={showModalEdit}>
                    EDIT
                </Button> 
                <Button type="primary" onClick={showModalDelete}>
                    DELETE
                </Button> 
                { onEdit ? ModalEdit() : onAdd ? ModalAdd(): onDelete ? ModalDelete():''}
            </Col>
        </Row>

        <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={[]}
            defaultCheckedKeys={[]}
            onExpand={onExpand}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={renderCategories(categories)}
        />
        </>
    );
}

export default Categories;