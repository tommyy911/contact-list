import React, {FC} from 'react';
import './LoadMore.css'

export const LoadMore: FC<{onClick: ()=> void}> = ({onClick}) => {
    return (
       <button className="load-more" onClick={onClick}>
            Load more
       </button>
    )
}