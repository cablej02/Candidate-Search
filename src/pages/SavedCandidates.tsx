import { useState } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useSavedCandidates } from '../components/SavedCandidatesContext';

const SavedCandidates = () => {
    const { savedCandidates, setSavedCandidates } = useSavedCandidates();

    //sorting state
    const [sorting, setSorting] = useState<{ headerTitle: string; direction: "asc" | "desc" }>({headerTitle: "name", direction: "asc"});

    // delete a candidate from savedCandidates
    const deleteCandidate = (id: number) => {
        const newCandidates = {...savedCandidates};
        delete newCandidates[id];
        setSavedCandidates(newCandidates);
    }

    // create a sorted array of candidates to display
    const sortedCandidates = Object.values(savedCandidates).sort((a: any, b: any) => {
        // get values to compare
        let aValue = a[sorting.headerTitle];
        let bValue = b[sorting.headerTitle];

        // if null or undefined, sort to end
        if (!aValue && bValue) return 1;
        if (aValue && !bValue) return -1;
        if (!aValue && !bValue) return 0;

        // return -1 to move a to a lower index than b (a displays first)
        // return 1 to move a to a higher index than b (b displays first)
        if (aValue.toLowerCase() < bValue.toLowerCase()) return sorting.direction === "asc" ? -1 : 1;
        if (aValue.toLowerCase() > bValue.toLowerCase()) return sorting.direction === "asc" ? 1 : -1;
        // return 0 if a and b are equal
        return 0;
    });

    // Handle sort column and direction
    const handleSort = (headerTitle: string) => {
        setSorting((prev) => {
            if (prev.headerTitle === headerTitle) {
                return { headerTitle, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { headerTitle, direction: "asc" };
        });
    };

    const getSortIcon = (headerTitle: string) => {
        if (sorting.headerTitle === headerTitle) {
            return sorting.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    return (
        <table className='table table-dark table-striped content-container table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th onClick={() => handleSort("login")}>
                        Login {getSortIcon("login")}
                    </th>
                    <th onClick={() => handleSort("name")}>
                        Name {getSortIcon("name")}
                    </th>
                    <th onClick={() => handleSort("location")}>
                        Location {getSortIcon("location")}
                    </th>
                    <th onClick={() => handleSort("email")}>
                        Email {getSortIcon("email")}
                    </th>
                    <th onClick={() => handleSort("company")}>
                        Company {getSortIcon("company")}
                    </th>
                    <th>Bio</th>
                    <th>Reject</th>
                </tr>
            </thead>
            <tbody>
                {sortedCandidates.map((candidate: any) => (
                    <tr
                        key={candidate.id}
                        className='text-start align-middle'
                    >
                        <td className='text-center'>
                            <img
                                src={candidate.avatar_url}
                                alt={`${candidate.login} avatar image`}
                                className='rounded-4'
                                style={{width: '75px'}}
                            />
                        </td>
                        <td className='fw-bold'>{candidate.login}</td>
                        <td className='fw-bold'>
                            {candidate.name}
                            {/* if candidate name is undefined, just use login */}
                            {/* {candidate.name ?
                                <div>{candidate.name}</div> 
                                : <div>{candidate.login}</div>
                            }
                            <div className='fst-italic'> ({candidate.login})</div> */}
                        </td>
                        <td>{candidate.location}</td>
                        <td>{candidate.email}</td>
                        <td>{candidate.company}</td>
                        <td>{candidate.bio}</td>
                        <td className='text-center'>
                            <button
                                onClick={() => deleteCandidate(candidate.id)}
                                className='btn text-danger'
                            >
                                <MdRemoveCircleOutline style={{fontSize: '60px'}} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SavedCandidates;
