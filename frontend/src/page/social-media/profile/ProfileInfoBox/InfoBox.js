import React, {useState} from 'react';
import {Paper} from '@material-ui/core'
import './info.css'

const InfoBox = ({user, profile, editButton, setEditButton}) => {
    // console.log("infoBox: ", user)
    // console.log("profile",profile)
    const userid = localStorage.getItem("currentUserId")

    const infoBoxTitle = [
        'education',
        'twitter',
        'facebook',
        'info',
        'live'
    ]
    // const [editButton, setEditButton] = useState(false);
    const [formValues, setFormValues] = useState({});
    // console.log("formValues",formValues)

    const handleChange = (title, value) => {
        setFormValues(prevState => ({...prevState, [title]: value, userId: user?.userId, nick: user?.userName}));
    }



    const handleSubmit = async () => {
        console.log("formValues", formValues)
        try {
            const response = await fetch(`/profile/save/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();
            // console.log(data);
            setEditButton(!editButton)
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div>
            <Paper style={{boxShadow: "0 4px 6px rgba(2, 56, 98, 0.9)"}}>
                {!editButton ? <>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Education:</div>
                            <div className='info-box-answer'>{profile?.education}</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Tweetr:</div>
                            <div className='info-box-answer'>{profile?.twitter}</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Facebook:</div>
                            <div className='info-box-answer'>{profile?.facebook}</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Info:</div>
                            <div className='info-box-answer'>{profile.info}</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Lives in:</div>
                            <div className='info-box-answer'>{profile?.live}</div>
                        </div>
                    </> :
                    infoBoxTitle.map((value) => (
                        <div key={value} className='info-box-title-background'>
                            <div className='info-box-title'>{value} :</div>
                            <input
                                value={formValues[value] || ''}
                                onChange={(e) => handleChange(value, e.target.value)}
                                className='info-box-input'
                                type='text'
                            />
                        </div>
                    ))

                }
                <div className="info-box-background-display">
                    {!editButton ? <button className="info-box-button" onClick={() => setEditButton(!editButton)}>
                            Edit Info!
                        </button> :
                        <>
                            <button className="info-box-button" onClick={() => setEditButton(!editButton)}>
                                Close Edit!
                            </button>
                            <button className="info-box-button" onClick={handleSubmit}>Save</button>
                        </>
                    }
                </div>
            </Paper>
        </div>
    );
};

export default InfoBox;