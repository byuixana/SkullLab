/**
 * A slide-in menu component that displays tree views for multiple weeks/sections.
 *
 * @typedef {object} SectionMenuProps
 * @property {object} week1 - Week 1 data object with title and data array
 * @property {object} week2 - Week 2 data object with title and data array
 * @property {object} selectedItem - Currently selected item from the tree
 * @property {function} onSelect - Callback function when an item is selected
 * 
 * @returns {JSX.Element} A slide-in menu with multiple section tree views
 */
import React from 'react';
import { useState, useEffect } from 'react';
import SelectionContextProvider from '../context/SelectionContext.js'
import SectionTreeView from './SectionTreeView'
import { HiMenu } from 'react-icons/hi';
import { createPortal } from 'react-dom';

export default function SectionMenu({ week1, week2, selectedItem, onSelect }){

    //Is the menu open?
    const [open, setOpen] = useState(false)
    
    // Hooks

    //Helpers
    // week 1 and 2 will be dictionaries with names
    console.log("Rendering with open =", open)
    const menu = (
        <React.Fragment>
                <button
                    onClick={() => {
                        console.log("Button clicked, open is:", open);
                        setOpen(true)}}
                    className="z-50 bg-white rounded p-2 transition "
                    style = {{
                        position: "fixed",
                        left: "1rem",
                        top: "1rem"
                    }}
                    >
                        <HiMenu size={20} color={"black"}/>
                </button> 
                
                    <aside
                    className="flex flex-col top-0 left-0 h-full w-72 bg-[#1a5e80] shadow-md z-50 transform transition-transform duration-300 overflow-scroll
                    scroll"
                        style={{ 
                            position: "fixed",
                            transform: open ? 'translateX(0)' : 'translateX(-100%)',
                            transition: 'transform 300ms ease-in-out',
                            height: "100vh",
                            zIndex: 1000
                        }}>
                        <button
                            onClick={() => {
                                setOpen(false)}}
                            className="flex justify-end items-center w-full h-[5%] mr-2 rounded-none selection:p-2 transition"
                            style = {{
                                position: 'fixed',
                                right: 0,
                                border: 'none',
                                borderRadius: '4px',
                                zIndex: 2000
                            }}
                            >
                            <svg width="20" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button> 

                        <nav className='w-full h-[1%]'>
                                <SectionTreeView className="tree" section={ week1.title } data={ week1.data }/>
                                <SectionTreeView className="tree" section={ week2.title } data={ week2.data }/>
                        </nav>  
                       
                    </aside>
                
        </React.Fragment>
    )
    return createPortal(menu, document.body);
}