/**
 * A custom TreeItem component that extends MUI's TreeItem.
 *
 * @typedef {object} TreeItemProps
 * @property {string} itemId - The unique identifier for the tree item
 * @property {string} label - The label text to display
 * @property {Array} [children] - Optional child items
 * @property {object} [sx] - MUI sx prop for styling. Lets you access the dom to customize a MUI component.
 *
 * @param {TreeItemProps} itemProps - Props passed to the TreeItem component
 * @param {React.Ref} ref - Forwarded ref to the TreeItem
 * @returns {JSX.Element} A TreeItem component
 */

import { TreeItem } from '@mui/x-tree-view/TreeItem';
import * as React from 'react';
import { useTreeItemModel } from '@mui/x-tree-view/hooks';

const SectionTreeItem = React.forwardRef(function SectionTreeItem(itemProps, ref) {
    
    return (
        <TreeItem className = "item"
        {...itemProps}
        ref = {ref}
        sx = {{
            width:"100%",
            color: 'white'
        }}
        slotProps={{
        }}
        />
    )
} )

export default SectionTreeItem;
