import { Button, message } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';

const Images = (
    selectedProduct,
    setShowProductForm,
    getData,
) => {

    const [file = null, setFile] = React.useState(null);
    const dispatch = useDispatch(); 

    const upload = ()=>{
        try {
            dispatch(SetLoader(true));
            // uploading image to cloudinary

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }

    return (
        <div>
            <Upload
                listType='picture'
                beforeUpload={() => false}
                onChange={(info) =>{
                    setFile(info.file)
                }}
            >
                <Button type='dashed'>Upload Image</Button>
            </Upload>

            <div className="flex justify-end gap-5 mt-5">
                <Button
                    type='default'
                    onClick={()=>{setShowProductForm(false)}}
                >Cancel</Button>

                <Button
                    type='primary'
                    disabled ={!file}
                    onClick={upload}
                >Upload</Button>
            
            </div>
        </div>
    )
}

export default Images
