import { useState } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { useSavedCandidates } from '../components/SavedCandidatesContext';

const SavedCandidates = () => {
    const { savedCandidates, setSavedCandidates } = useSavedCandidates();

    //sorting state
    const [sorting, setSorting] = useState<{ headerTitle: string; direction: "asc" | "desc" }>({headerTitle: "name", direction: "desc"});

    // delete a candidate from savedCandidates
    const deleteCandidate = (id: number) => {
        const newCandidates = {...savedCandidates};
        delete newCandidates[id];
        setSavedCandidates(newCandidates);
    }

    // create a sorted array of candidates to display
    const sortedCandidates = Object.values(savedCandidates).sort((a: any, b: any) => {
        // get values to compare
        const aValue = a[sorting.headerTitle];
        const bValue = b[sorting.headerTitle];

        // return -1 to move a to a lower index than b (a displays first)
        // return 1 to move a to a higher index than b (b displays first)
        if (aValue < bValue) return sorting.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sorting.direction === "asc" ? 1 : -1;
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

    return (
        <table className='table table-dark table-striped content-container table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("location")}>Location</th>
                    <th onClick={() => handleSort("email")}>Email</th>
                    <th onClick={() => handleSort("company")}>Company</th>
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
                        <td className='fw-bold'>
                            {/* if candidate name is undefined, just use login */}
                            {candidate.name ?
                                <div>{candidate.name}</div> 
                                : <div>{candidate.login}</div>
                            }
                            <div className='fst-italic'> ({candidate.login})</div>
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
