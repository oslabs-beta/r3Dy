import { jsx as _jsx } from "react/jsx-runtime";
import ChipLoader from './ChipLoader';
import HexagonLoader from './HexagonLoader';
import MeshLoader from './MeshLoader';
export default function Loader(props) {
    const model = props.model || 1;
    if (model === 1) {
        return _jsx(ChipLoader, Object.assign({}, props));
    }
    else if (model === 2) {
        return _jsx(HexagonLoader, Object.assign({}, props));
    }
    else if (model === 3) {
        return _jsx(MeshLoader, Object.assign({}, props));
    }
    else {
        return _jsx(ChipLoader, Object.assign({}, props));
    }
}
