/**
 * Main application component that loads data and renders the header, menu, and content window.
 *
 * @returns {JSX.Element} The main app component with header, menu, and content
 */

import { useState, useEffect } from 'react'
import './App.css';
import Header from './lib/Header.js'
import SectionMenu from './lib/SectionMenu.js';
import ContentWindow from './lib/ContentWindow.js';
import SelectionContextProvider from './context/SelectionContext.js';

function App() {

  const [data, setData] = useState(null)
  const [initialSelectedItem, setInitialSelectedItem] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        console.log("Here")
        try {
            const response = await fetch('./lab_data.json');
            const json = await response.json()

            setData(json)
            
            setInitialSelectedItem(json["week1"]["data"][1])
            console.log(json["week1"]["data"][1])
            
        } catch (error){
            console.error("Could not fetch data:", error)
        }
    }

    fetchData()

    }, [])

  // Only render the provider once we have both data and initial selected item
  if (!data || !initialSelectedItem) {
    return <div>Loading...</div>
  }

  return (
    <SelectionContextProvider initialSelectedItem={initialSelectedItem}>
        <div className="flex flex-col h-screen">
            <Header sectionTitle={"Skull Lab"}/>
            <div className="flex flex-1 overflow-hidden">
                <SectionMenu week1={data.week1} week2={data.week2} />
                <div className="flex-1 overflow-auto">
                    <ContentWindow />
                </div>
            </div>
        </div>
    </SelectionContextProvider>
  );
}

export default App;

