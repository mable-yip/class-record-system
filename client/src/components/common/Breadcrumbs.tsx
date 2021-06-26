import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useHistory, withRouter } from 'react-router-dom'

const Breadcrumbs = (props: { location: { pathname: any } }) => {
    const { location : { pathname }} = props
    const history = useHistory()
    const pathnames = pathname.split("/").filter((x: string) => x)
    return (
        <Breadcrumb>
            {
                pathnames.map((name: string, index: number) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
                    const isLast = index === pathnames.length - 1
                    const newName = name.replace("-", " ")
                    return(
                        <Breadcrumb.Item active={isLast} onClick={()=> history.push(routeTo)}>
                            {newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase()}
                        </Breadcrumb.Item>
                    )
                })
                
            }
        </Breadcrumb>
    )
}

export default withRouter(Breadcrumbs)