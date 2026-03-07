/**
 * Main application component that loads data and renders the header, menu, and content window.
 *
 * @returns {JSX.Element} The main app component with header, menu, and content
 */

import { useState, useEffect } from 'react'
import './App.css';
import Header from './lib/Header.js'
import SectionMenu from './lib/SectionMenu.js';
import ImgWindow2 from './lib/ImgWindow.js'
import VideoPlayer from './lib/VideoPlayer.js'
import ContentWindow from './lib/ContentWindow.js';
import SelectionContextProvider from './context/SelectionContext.js';

function App() {

  const [selectedItem, setSelectedItem] = useState({});
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        console.log("Here")
        try {
            const response = await fetch('./lab_data.json');
            const json = await response.json()

            setData(json)
            
            setSelectedItem(json["week1"]["data"][2]["children"][0])
            
        } catch (error){
            console.error("Could not fetch data:", error)
        }
    }

    fetchData()

    }, [])

  return (
    <SelectionContextProvider>
        {data && 
          (
              <>
                  <Header sectionTitle={"Skull Lab"}/>
                  <SectionMenu week1={data.week1} week2={data.week2} />
                  <ContentWindow />
              </>
          )
        }
    </SelectionContextProvider>
  );
}

export default App;

