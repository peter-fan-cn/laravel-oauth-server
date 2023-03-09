import React from "react";

const Link = ({url, label, active, loadPage}) => {
    const html = {__html: label}
    let classes = 'page-link'
    if (!url) classes += ' disabled'
    if (active) classes += ' active';
    const handlePageClick = () => {
        if (loadPage) loadPage(url)
    }
    return <li className="page-item">
        <a className={classes} href="#" dangerouslySetInnerHTML={html} onClick={handlePageClick}></a>
    </li>
}

export default ({links, loadPage, total, ...props}) => {

    return <nav aria-label="Page navigation" {...props}>
        <ul className="pagination">
            {links.map(link => <Link {...link} loadPage={loadPage} key={link.label}/>)}
            <li className={'page-item d-flex align-items-center px-3'}>
                <span>Total: {total} records</span>
            </li>
        </ul>
    </nav>
}
