const getFileExt = (name) => name.split(/\.(?=[^\.]+$)/)[1]

export default getFileExt
