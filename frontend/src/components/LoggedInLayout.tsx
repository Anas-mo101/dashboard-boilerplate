import React, { ReactNode } from "react";


interface LoggedInLayoutProps {
    children: ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children }) => {

    return (
        <div>
            {children ? children : null}
        </div>
    );
};

export default LoggedInLayout;