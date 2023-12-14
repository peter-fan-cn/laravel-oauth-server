import {classNames} from 'primereact/utils';

const AsideMenuItem = ({
    root = true,
    active,
    setActive = (path) => {},
    items,
    path,
    label,
    href,
    visible = true,
    target,
    icon,
    iconClassName,
    className,
    disabled
}) => {
    const itemClick = (event, {path, disabled}) => {
        if (disabled) return;
        setActive(path)
    }
    return (
        <li className='ml-4'>
            {visible && root && <div className="py-3 text-sm font-bold">{label}</div>}
            {visible && !root &&
                (
                    href ?
                        <a
                            className={classNames(className, 'block text-sm p-2 transition-colors relative')}
                            href={href} target={target} onClick={event => itemClick(event, {path, disabled})}>
                            {icon}
                            {iconClassName && <i className={classNames(iconClassName, 'mr-2')}></i>}
                            <span className="">{label}</span>
                            {items &&
                                <i className={classNames("fa fa-fw fa-angle-down", {'rotate-180': active?.startsWith(path)})}></i>}
                        </a> :
                        <button
                            className={classNames(className, 'block text-sm p-2 transition-colors relative')}
                            onClick={event => itemClick(event, {path, disabled})}
                        >
                            {icon}
                            {iconClassName && <i className={classNames(iconClassName, 'mr-2')}></i>}
                            <span className="">{label}</span>
                            {items &&
                                <i className={classNames("fa fa-fw fa-angle-down", {'rotate-180': active?.startsWith(path)})}></i>}
                        </button>
                )
            }
            {items &&
                <ul className={classNames({'hidden': !root && !active?.startsWith(path)})}>
                    {
                        items && items.map((item, index) =>
                            <AsideMenuItem
                                {...item}
                                path={`${path}-${index}`}
                                root={false}
                                active={active}
                                setActive={setActive}
                                key={index}
                            />
                        )
                    }
                </ul>
            }
        </li>
    )
}

export default AsideMenuItem