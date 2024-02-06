import { useCallback } from "react";

export interface TabProps {
    label: string;
    index: number;
    setCurrentTab: (index: number) => void;
    isActive?: boolean;
}

export function Tab (props: TabProps) {
    const { label, index, setCurrentTab, isActive } = props;

    const handleClick = useCallback(() => {
        setCurrentTab(index);
    }, [ setCurrentTab, index]);

    return (
        <li className={`tab_label ${isActive ? 'active' : ''}`}>
            <button onClick={handleClick}>{label}</button>
        </li>
    );

}