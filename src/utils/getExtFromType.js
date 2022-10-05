const getExtFromType = (type) => type.split(/\/(?=[^\.]+$)/)[1]

export default getExtFromType
