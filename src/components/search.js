import React, { useState } from 'react';
import './search.css'
import Modal from 'react-modal';

const API_KEY = "H26hdxkNLCsDWSf0va7zkKgWhbEEv_vnJxnfk-OOLhI";
const Search = props => {

    const [images, setImages] = useState([]);
    const [value, setValue] = useState("");
    const [currentImage, setcurrentImage] = useState(false)
    const url = `https://api.unsplash.com/search/photos/?&query=${value}&per_page=9&client_id=${API_KEY}`;

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'floralwhite',
            borderRadius: '2rem',
        }
    };

    const openModal = (event) => {
        console.log(event.target.src);
        setcurrentImage(event.target.src);
        setIsOpen(true);        
    }

    const closeModal = () => {
        setcurrentImage(false);
        setIsOpen(false);
    }

    const getInput = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    const onSearch = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setImages(data.results);
            })
    }

    return (
        <div>
            <div className="row">
            <div className="column searchStyle">
                <input
                    className="inputSearch"
                    type="text"
                    placeholder="Search for images here..."
                    onChange={getInput}
                />                
                <button className="searchButton" onClick={onSearch}>Search</button>
            </div>
            </div>
            
            <div className="imagePageShow">
                {images.map((item) => {
                    return(
                    <div className="container">
                    <img className="imageShow" alt="" onClick={(event) => openModal(event)}  key={item.id} src={item.urls.regular} /> 
                    <div>                        
                    </div>
                    
                    <div className="bottom-left">
                        <img className="smallImage" alt="" src={item.user.profile_image.small}/>
                        image by <span className="userNameStyle">{item.user.username}</span> </div>
                    </div>)                
                })
                }                
            </div>
            <div>
      </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className="container">  
                <img className="modalimage" alt="" src={currentImage} />
                <a className="top-right" href onClick={closeModal}>X</a>
                </div>   
                <div className="contentCenter">
                <button className="downloadButton">
                    <a href={currentImage} target="_blank" download>Download</a>
                    </button>
                </div>
            </Modal>
        </div>
    )
}
export default Search;