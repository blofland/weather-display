const useStorage = (name="data", defaultObj={}) => {
    name = name.toLocaleLowerCase()
    if(!localStorage.getItem(name)) localStorage.setItem(name, JSON.stringify(defaultObj))

    const getStore = () => JSON.parse(localStorage.getItem(name)) 
    const setStore = (cb) => {
        let data 
        if(typeof cb === "function") data = cb(getStore()) 
        else data = cb
        localStorage.setItem(name, JSON.stringify(data))
    }
    return [getStore, setStore]
}