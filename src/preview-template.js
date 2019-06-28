import React from "react"
import {
  decodePreviewUrl,
  withPreview
} from "./preview"

const PreviewPage = props => {
    const { pageMap, fragmentIndex } = props.pageContext
    let components = {}
    if (pageMap) {
        console.log(fragmentIndex)
        Object.keys(pageMap).map(contentType => {
            const componentFile = require(`../../${pageMap[contentType].slice(2)}`)
            components[contentType.toLowerCase()] = withPreview(
                componentFile.default, 
                componentFile.query
            )
        })
       
        const { content_type } = decodePreviewUrl()
        if (content_type) {
            const Component = components[content_type.toLowerCase()]
            if (Component) {
                return <Component />
            }
        }
        return null
    } 
    return null
}

export default PreviewPage
