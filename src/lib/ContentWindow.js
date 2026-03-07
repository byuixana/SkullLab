/**
 * A component that renders different content types based on the selected item.
 * Displays ImgWindow, VideoPlayer, or Lecture components depending on the item type.
 *
 * @returns {JSX.Element} A content window that renders the appropriate component
 */

import { useState, useEffect } from 'react'
import VideoPlayer from './VideoPlayer.js'
import ImgWindow from './ImgWindow.js'
import Lecture from './Lecture.js'
import { useSelectionContext } from '../context/SelectionContext.js'

export default function ContentWindow(){
    const { selectedItem } = useSelectionContext();
    
    useEffect(() => {
        console.log('Selection updated:', selectedItem);
    }, [selectedItem]);

    function renderContent() {
        if (selectedItem?.type === 'img'){
            return <ImgWindow />
        }
        else if (selectedItem?.type === 'video'){
            return <VideoPlayer />
        }
        else {
            return <Lecture />
            
        }
    }

    function hasImage(item){
        if (!item) return false;
        console.log('hasImage called with:', item); // This should now fire
        
        if (item.type && item.type === 'img') return true;
        
        return false;
    }

        // Early return if no item
    if (!selectedItem) {
        return <div className="bg-red-50 w-64 h-10">Select and item</div>; // or return <div>Select an item</div>
    } 

    let src = "https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/41338032/partner_id/1157612?iframeembed=true&playerId=kaltura_player&entry_id=1_fon44m6t&flashvars[localizationCode]=en&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_mbz6ioam";
        return (<div className="w-full h-full">



            {renderContent()}

        
            

            
        </div>
    )
}