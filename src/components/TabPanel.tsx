import { ReactElement } from "react";

interface TabPanelProps {
    label: string;
    children: ReactElement | ReactElement[];
}

export function TabPanel (props: TabPanelProps) {
    const { children } = props;

    return (
        <div>{children}</div>
    )
}