/**
 * Returns: viewport width or height without scrollbar
 * Usage: viewport().width || viewport().height
 */
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[a + 'Width'], height : e[a + 'Height'] };
}

export default viewport;
