/**
 * A component that displays lecture content in an iframe.
 * Loads HTML pages from the selected item's buttons.
 *
 * @returns {JSX.Element} An iframe displaying lecture content
 */

import { useState, useEffect } from 'react'
import { useSelectionContext } from '../context/SelectionContext.js';

export default function Lecture(){
    const { selectedItem } = useSelectionContext();
    const [pageSource, setSource] = useState('')

    useEffect(() => {
        console.log(selectedItem)
        const newSource = selectedItem?.load;
        setSource(newSource)
    }, [selectedItem])

    return (
        <div
        className="
        shadow-black
        w-screen
        h-screen">
            <iframe src={pageSource} 
            className="w-screen h-screen"
            style={{border: "none"}}
            allowFullScreen 
            title="4_1_1_intro_bone_anat"></iframe>
        </div>
    )
}