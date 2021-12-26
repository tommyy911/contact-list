import React from "react";
import "./PersonInfo.css";

type Props = {
    data: {
        firstNameLastName: string;
        jobTitle: string;
        emailAddress: string;
    };
    onClick: () => void;
    isSelected: boolean;
};

export const PersonInfo = (props: Props) => {
    const { data, onClick, isSelected } = props;
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                height: "100px",
                justifyContent: "center",
                flexDirection: "column",
                padding: "32px",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
                margin: "10px 0",
                background: "#fff",
                cursor: "pointer",
                outline: `${isSelected ? "3px solid pink" : "none"}`,
            }}
            className="person-info"
        >
            <div className="firstNameLastName">{data.firstNameLastName}</div>
            <div className="jobTitle">{data.jobTitle}</div>
            <div className="emailAddress">{data.emailAddress}</div>
        </div>
    );
};
