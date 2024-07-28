import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import style from "./BackLink.module.scss";

export default function BackLink({ to, children }) {
    return (
        <Link className={style.link} to={to}>
            <HiArrowLeft size="24" />
            {children}
        </Link>
    );
};