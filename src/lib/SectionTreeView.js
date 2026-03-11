/**
 * A component that displays a tree view of section items for navigation.
 *
 * @typedef {object} SectionTreeProps
 * @property {Array<object>} data - Array of section items with id and children properties
 * @property {string} section - The section label to display
 * @returns {JSX.Element} A tree view component for section navigation
 */

import { useSelectionContext } from '../context/SelectionContext';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import {useState} from 'react'
import SectionTreeItem from './SectionTreeItem';

export default function SectionTreeView({data, section}) {
    // Hooks
    const { selectedItem, setSelected } = useSelectionContext();

    //Helpers
    const createMap = (data, map = {}) => {

        data.forEach( item => {
            map[item.id] = item;
            
            if (item.children && item.children.length > 0){
                createMap(item.children, map);
            }
        });
        return map;
    }

    const convertIdsToStrings = (items) => {
        return items.map(item => ({
            ...item,
            id: String(item.id),
            children: item.children ? convertIdsToStrings(item.children) : []
        }));
    }

    function findItem(id, map){
        const selectedItem = map[id]
        return selectedItem
    }

    // In-component variable

    const map = createMap(data);
    const stringIdData = convertIdsToStrings(data);

    return <div className = "container">
                <h3> { section } </h3>
                <RichTreeView 
                items = { stringIdData }
                onItemClick = {(event, itemId) => {
                    // Find the element within data
                    const item = findItem(itemId, map)
                    
                    // Check if this is an external HTML link that should open in new tab
                    if (item?.type === 'html' && item?.child_items?.[0]?.page) {
                        window.open(item.child_items[0].page, '_blank', 'noopener,noreferrer');
                    } else {
                        setSelected(item)
                    }
                    
                    console.log(item)
                }}
                sx = {{ width: "100%"}}
                slotProps = {{
                    treeItem: {
                        
                    }
                }}
                slots = {{
                    expandIcon: ()=>(<div> + </div>),
                    collapseIcon: ()=>(<div> - </div>),
                    item: SectionTreeItem
                }}
                
                />
            </div>
}