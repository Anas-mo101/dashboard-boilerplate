import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";


interface LoggedInLayoutProps {
    children: ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children }) => {

    return (
        <main className="px-12 pt-12 pb-10">
            <Header/>
            {children ? children : null}
        </main>
    );
};

export default LoggedInLayout;