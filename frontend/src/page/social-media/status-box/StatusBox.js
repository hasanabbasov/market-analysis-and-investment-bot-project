import React,{useEffect, useState} from 'react';
import './statusBox.css'
import Statuses from "./Statuses";
import uploadIcon from "../../../styles/upload.png";
import {Paper} from "@material-ui/core";
import Resizer from "react-image-file-resizer";

const StatusBox = () => {
    const [storyInfo,setStoryInfo] = useState('')
    const [storyPhoto, setStoryPhoto] = useState(null);
    const [showStoryPhoto, setSehowStoryPhoto] = useState(null);
    const userId = localStorage.getItem("currentUserId");

    // console.log("storyInfo",storyInfo)

    const fetchStatuses = () => {
        fetch('/status/getAllStatus')
            .then((response) => response.json())
            .then((res) => setStoryInfo(res))
    };

    useEffect(fetchStatuses, []);

    const uploadStatus = async (event) => {
        const file = event.target.files[0];
        Resizer.imageFileResizer(
            file,
            100, // maxWidth
            100, // maxHeight
            'JPEG', // compressFormat
            20, // quality
            0, // rotation
            (uri) => {
                setStoryPhoto(uri);
            },
            'base64', // outputType
        );
    };

    useEffect(() => {
        const StoryEntity = {
            userId: userId,
            statusImageUrl: storyPhoto,
        }

        // console.log("StoryEntity",StoryEntity)

        if (storyPhoto) {
            fetch(`/status/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Değiştirilen satır
                },
                body: JSON.stringify(StoryEntity)
            })
                .then((response) => response.json())
                .then((res) => {
                    setSehowStoryPhoto(res);
                    fetchStatuses(); // Save işlemi başarılı olduğunda fetchStatuses fonksiyonunu çağırıyoruz
                })
                .catch((error) => console.error("Error: ", error))
        }
    },[storyPhoto])



    return (
        <div className='statusbar_container'>
            <Paper className='statusbar_status'>
                <label htmlFor="file-upload-status" className="upload__tabs">
                    <img src={uploadIcon} className="upload__icon" />
                </label>
                <input type='file' id="file-upload-status" onChange={uploadStatus}/>
            </Paper>

            { storyInfo && storyInfo?.map((value) => (<Statuses user={value.userId} story={value.statusImageUrl} />)) }

        </div>
    );
};

export default StatusBox;