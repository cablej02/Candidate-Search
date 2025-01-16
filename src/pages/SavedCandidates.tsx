import { MdRemoveCircleOutline } from 'react-icons/md';
import { useSavedCandidates } from '../components/SavedCandidatesContext';

const SavedCandidates = () => {
    const { savedCandidates, setSavedCandidates } = useSavedCandidates();

    const deleteCandidate = (id: number) => {
        const newCandidates = {...savedCandidates};
        delete newCandidates[id];
        setSavedCandidates(newCandidates);
    }

    return (
        <table className='table table-dark table-striped content-container table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Bio</th>
                    <th>Reject</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(savedCandidates).map((candidate: any) => (
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
