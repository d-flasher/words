import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { FC, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

interface ITab {
    label: string
    placeholder: string
    to: string
    mask: string
}

export function getNavTabs(): ITab[] {
    return [
        {
            label: 'words',
            placeholder: 'words link',
            to: 'words',
            mask: 'words/*',
        },
        {
            label: 'lessons',
            placeholder: 'lessons link',
            to: 'lessons',
            mask: 'lessons/*',
        },
    ]
}

const NavTabs: FC = () => {
    const [tabs] = useState<ITab[]>(() => getNavTabs())
    const { pathname } = useLocation()

    const currentTab = tabs.find(tab => matchPath(tab.mask, pathname))
    let currentTabValue: string | false | undefined = currentTab?.to
    if (currentTabValue == null) currentTabValue = false

    return (
        <Tabs value={currentTabValue}>
            {tabs.map(tab => (
                <Tab
                    key={tab.to}
                    component={Link}
                    label={tab.label}
                    to={tab.to}
                    value={tab.to}
                    placeholder={tab.placeholder}
                />
            ))}
        </Tabs>
    )
}
export default NavTabs
