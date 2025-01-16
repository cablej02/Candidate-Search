import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { Candidate } from '../interfaces/Candidate.interface';

interface CurrentCandidateProps {
    currentCandidate: Candidate;
    getNextCandidate: () => void;
    saveCandidate: () => void;
}

export const CurrentCandidate = (props: CurrentCandidateProps) => {
    const { currentCandidate, getNextCandidate, saveCandidate } = props;
    
    return (
        <>
            <div className='card mx-auto bg-black text-white border-0 rounded-5 overflow-hidden text-start d-flex flex-column gap-1'>
                <a
                    href={currentCandidate.html_url}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='text-decoration-none'
                    style={{color: 'white'}}
                >
                        <img src={currentCandidate.avatar_url} alt={currentCandidate.name + 'avatar'} className='img-fluid' />
                        <h5 className='p-2'>
                            <span>{currentCandidate.name ? currentCandidate.name : currentCandidate.login}</span>
                            <span className='fst-italic'> ({currentCandidate.login})</span>
                        </h5>
                        <p className='px-2'>Location: {currentCandidate.location}</p>
                        
                        <p className='px-2'>Company: {currentCandidate.company}</p>
                        <p className='px-2 '>Bio: {currentCandidate.bio}</p>
                </a>
                <p className='px-2 pb-2'>Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a></p>
            </div>
            <div className='d-flex gap-5 justify-content-center'>
                <button
                    className='btn d-flex align-items-center justify-content-center text-danger'
                    onClick={getNextCandidate}
                >
                    <MdRemoveCircleOutline style={{ fontSize: "50px" }}/>
                </button>
                <button
                    className='btn d-flex align-items-center justify-content-center text-success'
                    onClick={saveCandidate}
                >
                    <MdAddCircleOutline style={{ fontSize: "50px" }}/>
                </button>
            </div>
        </>
    );
}