import { Link, useLocation } from "react-router-dom";

const Nav = () => {
    const currentPage = useLocation().pathname;

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/" className={currentPage === "/" ? "nav-link active" : ""}>
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/SavedCandidates"
                    className={currentPage === "/SavedCandidates" ? "nav-link active" : ""}
                >
                    Saved Candidates
                </Link>
            </li>
        </ul>
    );
};

export default Nav;
