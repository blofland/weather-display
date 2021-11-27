const useStorage = (name="data", defaultObj={}) => {
    name = name.toLocaleLowerCase()
    if(!localStorage.getItem(name)) localStorage.setItem(name, JSON.stringify(defaultObj))
}