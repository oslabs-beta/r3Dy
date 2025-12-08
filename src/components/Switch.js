import { jsx as _jsx } from "react/jsx-runtime";
import SlideSwitch from './SlideSwitch';
import FlickSwitch from './FlickSwitch';
export default function Loader(props) {
    const model = props.model || 1;
    if (model === 1) {
        return _jsx(SlideSwitch, Object.assign({}, props));
    }
    else if (model === 2) {
        return _jsx(FlickSwitch, Object.assign({}, props));
    }
    else {
        return _jsx(ChipLoader, Object.assign({}, props));
    }
}
