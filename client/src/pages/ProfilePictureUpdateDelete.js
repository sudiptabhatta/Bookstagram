import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { UserProfilepicDeleteService, UserProfilepicUpdateService } from '../services/UserProfilepicUpdateDeleteService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useToast from '../hooks/useToast';

export default function ProfilePictureUpdateDelete({ show, setShow, user, setUser }) {

    const fileInputRef = useRef(null); // create a ref for the hidden file input to access and manipulate the dom element

    const { toastSuccess, toastError } = useToast();

    const handleProPicUpdateDeleteModalClose = () => {
        setShow(false)
    }

    const handleUploadPhotoClick = () => {
        fileInputRef.current.click() // Trigger click on the hidden file input when the button is clicked
    }

    const handleProfilePictureChange = async (event) => {
        const target_name = 'new_profile_picture'
        const file = event.target.files[0]
        setUser({ ...user, [target_name]: file })

        try {
            const accessToken = Cookies.get('accessToken');
            const decoded = jwtDecode(accessToken);
            const response = await UserProfilepicUpdateService(file, decoded.username);
            setUser({ ...user, profile_picture: response.data.profilePhoto.profile_picture })
            toastSuccess(response.data.message)
            handleProPicUpdateDeleteModalClose()
        } catch (error) {
            toastError(error.message)
        }
    }


    const handleProfilePictureDelete = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            const decoded = jwtDecode(accessToken);
            const response = await UserProfilepicDeleteService(decoded.username);
            setUser({ ...user, profile_picture: response.data.profilePhoto.profile_picture })
            handleProPicUpdateDeleteModalClose();
        } catch (error) {
            toastError(error.message)
        }
    }

    return (
        <Modal show={show} onHide={handleProPicUpdateDeleteModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Profile Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col">
                    <div>
                        <Form>
                            <Form.Control type="file" name='profile_picture' style={{ display: 'none' }} ref={fileInputRef} onChange={handleProfilePictureChange} />
                            <Button className='w-100' variant="light" onClick={handleUploadPhotoClick}>Upload Photo</Button>
                        </Form>
                    </div>
                    <br />
                    <div><Button className='w-100 !text-red-400' variant="light" onClick={handleProfilePictureDelete}>Remove Current Picture</Button></div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
