/**
 * A component that displays images with navigation buttons and audio playback.
 * Allows users to switch between different image views and play associated audio.
 *
 * @returns {JSX.Element} An image viewer with navigation buttons and audio controls
 */

import { useRef, useState, useEffect } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { useSelectionContext } from '../context/SelectionContext.js';

export default function ImgWindow(){
    const { selectedItem } = useSelectionContext();
    
    const [img, setImg] = useState(null);
    const audioRef = useRef(null);

    // Hooks
    useEffect(() => {
        audioRef.current = new Audio(selectedItem.sound)
        console.log(audioRef.current)
    }, [selectedItem]);

    useEffect(() => {
        // attempt to set a sensible initial image from a variety of shapes
        const firstButton = selectedItem?.child_items?.[0];
        
        if (firstButton){
            if (firstButton.link) {
                setImg(firstButton.link);
            }
            else if (firstButton.img && typeof firstButton.img === 'string') {
                setImg(firstButton.img);
            }
            else if (Array.isArray(firstButton.img) && firstButton.img[0]) {
                const imgSrc = firstButton.img[0].link || firstButton.img[0];
                setImg(imgSrc);
            }
            else if (Array.isArray(firstButton.imgs) && firstButton.imgs[0]) {
                const imgSrc = firstButton.imgs[0].link;
                setImg(imgSrc);
            }
        } else {
            console.log('No valid button found to extract image from');
        }
    }, [selectedItem])

    // Functions
    function playSound(){
        audioRef.current.play();
    }

    // vars and helpers
    function linkForButton(button){
        if (!button) return null;
        if (button.img) return button.img;
        if (typeof button.img === 'string') return button.img;
        if (Array.isArray(button.img) && button.img[0]) return button.img[0].img|| button.img[0];
        if (Array.isArray(button.imgs) && button.imgs[0]) return button.imgs[0].img || button.imgs[0];
        return null;
    }
    const buttons = selectedItem?.child_items || []

    // JSX
        return (
                <div className="w-full h-screen overflow-hidden flex items-center flex-col bg-black"
                >
                    <div className="flex flex-col sm:flex-row px-6 pt-4 pb-2 ">
                        {       
                                buttons.map( (button, index) => {
                                    const link = linkForButton(button);
                                    return button.label ? (
                                        <button className=" bg-gray-600 hover:bg-gray-300 px-2 h-7 w-[%10] text-white" key={index} onClick={() => link ? setImg(link) : null}>
                                            {button.label}
                                        </button>
                                    ) : null;
                                })
                                
                            }
                            <button
                            onClick={() => playSound()}
                            className='w-full sm:w-auto h-7 bg-gray-600 py-2 px-4 flex justify-center'>
                                <FaVolumeUp size={20} color={"white"} padding={0} margin={0}/>
                            </button>
                            {/* <button
                            onClick={()=>{playSound()}}
                            className="w-full sm:w-auto h-7 bg-gray-600 py-2 px-4 flex justify-center">
                                <FaVolumeUp size={20} color={"white"} padding={0} margin={0}/>
                                <audio></audio>
                            </button> */}
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-white">{ selectedItem?.label }</div>
                    </div>
                    <div className="w-64 sm:w-64 md:w-80 lg:w-96 flex items-center justify-center aspect-square">
                        { img ? (
                            <img className="object-cover" key={img} src={img} alt={selectedItem?.label || 'image'} />
                        ) : (
                            <div className="text-white">No image available</div>
                        )}
                    </div>
                </div>
    )
    
}