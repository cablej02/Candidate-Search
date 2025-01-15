import { Link, useLocation } from "react-router-dom";

const Nav = () => {
    const currentPage = useLocation().pathname;

    return (
        <ul className="d-flex justify-content-end w-100 mt-4 px-5 gap-3 align-items-center">
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
