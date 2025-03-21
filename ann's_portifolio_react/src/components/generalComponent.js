import React from 'react';

function GeneralComponent({heading, paragraph}) {
    return(
    <>
    <h1>{heading}</h1>
    <hr />
    <p>{paragraph}</p>
    </>
    )
}


export default GeneralComponent;