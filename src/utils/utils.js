
export function rnd(){
    return parseInt(Math.random()*100000);
}

export const uuid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const getQueryStringParams = () => {
    var search = window.location.search.substring(1);
    return search && JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}