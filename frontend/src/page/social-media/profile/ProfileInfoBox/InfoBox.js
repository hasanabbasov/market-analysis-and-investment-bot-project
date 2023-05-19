import React, {useState} from 'react';
import {Paper} from '@material-ui/core'
import './info.css'

const InfoBox = () => {
    const infoBoxTitle = [
        'Education',
        'Tweetr',
        'Facebook',
        'Info',
        'Lives in'
    ]
    const [editButton, setEditButton] = useState(false);
    const [formValues, setFormValues] = useState({});

    const handleChange = (title, value) => {
        setFormValues(prevState => ({...prevState, [title]: value}));
    }

    const handleSubmit = async () => {
        console.log("formValues", formValues)
        // try {
        //     const response = await fetch('/save/info', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formValues),
        //     });
        //
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error("Error:", error);
        // }
    }
    return (
        <div>
            <Paper>
                {editButton ? <>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Education:</div>
                            <div className='info-box-answer'>Akdeniz</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Tweetr:</div>
                            <div className='info-box-answer'>Akdeniz</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Facebook:</div>
                            <div className='info-box-answer'>Akdeniz</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Info:</div>
                            <div className='info-box-answer'>Akdeniz</div>
                        </div>
                        <div className='info-box-title-background'>
                            <div className='info-box-title'>Lives in:</div>
                            <div className='info-box-answer'>Turkiye</div>
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
                <div>
                    {editButton ? <button onClick={() => setEditButton(!editButton)}>
                            Edit Info!
                        </button> :
                        <>
                            <button onClick={() => setEditButton(!editButton)}>
                                Close Edit!
                            </button>
                            <button onClick={handleSubmit}>Send</button>
                        </>
                    }
                </div>
            </Paper>
        </div>
    );
};

export default InfoBox;