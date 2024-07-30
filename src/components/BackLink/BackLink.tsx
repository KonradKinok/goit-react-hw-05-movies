import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import style from "./BackLink.module.scss";

interface BackLinkProps {
    to: string;
    children: React.ReactNode;
}

export default function BackLink({ to, children }: BackLinkProps) {
    return (
        <Link className={style.link} to={to}>
            <HiArrowLeft size="24" />
            {children}
        </Link>
    );
};