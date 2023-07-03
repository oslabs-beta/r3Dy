import React from 'react'
import ChipLoader from './ChipLoader'
import HexagonLoader from './HexagonLoader'
import MeshLoader from './MeshLoader'


export default function Loader(props: any) {
    const loader: number = props.loader || 1
    if (loader === 1) {
        return <HexagonLoader {...props} />
    } else if (loader === 2) {
        return <ChipLoader {...props} />
    } else if (loader === 3) {
        return <MeshLoader {...props} />
    } else {
        return <HexagonLoader {...props} />
    }
}
