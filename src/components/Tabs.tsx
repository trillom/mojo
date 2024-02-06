import { ReactElement, useState } from 'react';
import { Tab, TabProps } from './Tab';
import './Tabs.css';

interface TabsProps {
    children: ReactElement<TabProps>[];
}

export function Tabs (props: TabsProps) {
    const { children } = props;

    const [currentTabIdx, setCurrentTab] = useState(0);

    return (
        <div>
            <ul>
                {children.map((item, index) => (
                    <Tab
                        key={item.props.label}
                        label={item.props.label}
                        index={index}
                        isActive={index === currentTabIdx}
                        setCurrentTab={setCurrentTab}
                    />
                ))}
            </ul>

            {children[currentTabIdx]}
        </div>
    )
}