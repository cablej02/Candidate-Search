import { Link, useLocation } from "react-router-dom";

const Nav = () => {
    const currentPage = useLocation().pathname;

    return (
        <div className="position-fixed d-flex justify-content-end w-100 align-items-center" style={{zIndex: 100, backgroundColor: '#050658'}}>
            {/* make h1 clickthrough using bootstrap */}
            <h1
                className="position-fixed text-center w-100 text-white"
                style={{pointerEvents: "none"}}
            >
                {currentPage === "/" ? 'Candidate Search' : 'Saved Candidates'}
            </h1>
            <ul className="d-flex flex-row gap-3 align-items-center px-5 pt-3">
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
        </div>
    );
};

export default Nav;
