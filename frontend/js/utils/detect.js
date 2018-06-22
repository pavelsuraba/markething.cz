import Device from './device';
import Viewport from './viewport';

const detect = {
    dimensions: Viewport,
    device: Device // tablet, mobile, browser, version, os, isTouch
};

export const dimensions = detect.dimensions;
export const device = detect.device;

export default detect;
