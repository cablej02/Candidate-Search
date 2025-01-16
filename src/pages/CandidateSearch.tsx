import { useState, useEffect, useRef } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

const getLocalCandidates = () => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    return savedCandidates ? JSON.parse(savedCandidates) : {};
}

const CandidateSearch = () => {
    const isLoading = useRef(true);
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null | undefined>(null);
    const [savedCandidates, setSavedCandidates] = useState<{[id:number]: Candidate}>(getLocalCandidates());
    const candidates = useRef<Candidate[]>([]);

    const tempData: Candidate[] = [
        {
            id: 49294088,
            name: "Alexander Blatzheim",
            login: "Blatzheim",
            location: "Berlin, Germany",
            company: "Ironhack",
            avatar_url: "https://avatars.githubusercontent.com/u/49294088?v=4",
            email: 'ablatzheim@gmail.com',
            bio: 'beep boop',
            html_url: "https://github.com/Blatzheim",
        },
        {
            id: 49294089,
            name: "Joe Schmoe",
            login: "jschmoe",
            location: "Chicago, USA",
            company: "github",
            avatar_url: "https://avatars.githubusercontent.com/u/49294088?v=4",
            email: 'jschmoe@gmail.com',
            bio: 'I am a developer',
            html_url: "https://github/com/jschmoe",
        }
    ]

    //TODO: delete this and go back to API calls
    useEffect(() => {
        //iife to allow async function
            candidates.current.push(...tempData);
            getNextCandidate();

    }, []);

    useEffect(() => {
        // skip the first render
        if(isLoading.current){
            isLoading.current = false;
            return;
        }
        
        //save candidates to local storage
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    },[savedCandidates]);

    // useEffect(() => {
    //     //iife to allow async function
    //     (async () => {
    //         await fetchCandidates();
    //         getNextCandidate();
    //     })();
    // }, []);

    // const fetchCandidates = async () => {
    //     const data = await searchGithub();

    //     //loop over each candidate and get their user info to build the new candidate array
    //     for (const c of data) {
    //         const userInfo = await searchGithubUser(c.login);
    //         candidates.current.push({
    //             id: c.id,
    //             name: userInfo.name,
    //             login: c.login,
    //             location: userInfo.location,
    //             company: userInfo.company,
    //             avatar_url: c.avatar_url,
    //             email: userInfo.email,
    //             bio: userInfo.bio,
    //             html_url: c.html_url,
    //         });
    //     }
    //     console.log(candidates.current);
    // };

    const getNextCandidate = () => {
        if(candidates.current.length > 0) {
            const nextCandidate: Candidate | undefined = candidates.current.shift();
            console.log('Next candidate:', nextCandidate);
            console.log('Remaining candidates:', candidates);
            setCurrentCandidate(nextCandidate);
        } else {
            console.log('No more candidates');
            setCurrentCandidate(undefined);
        }
    };

    const saveCandidate = () => {
        if(currentCandidate){
            const newSavedCandidates:{[id:number]: Candidate} = {...savedCandidates};
            newSavedCandidates[currentCandidate.id] = currentCandidate;
            console.log(newSavedCandidates);
            setSavedCandidates(newSavedCandidates);
        }else{
            console.log('No candidate to save');
        }
        getNextCandidate();
    }

    return (
        <div className='container content-container' style={{maxWidth: '400px'}}>
            {currentCandidate ?
            <>
                <div className='card mx-auto bg-black text-white border-0 rounded-5 overflow-hidden text-start d-flex flex-column gap-1'>
                    <a
                        href={currentCandidate.html_url}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='text-decoration-none'
                        style={{color: 'white'}}
                    >
                        
                            <img src={currentCandidate?.avatar_url} alt={currentCandidate?.name + 'avatar'} className='img-fluid' />
                            <h5 className='p-2'>
                                <span>{currentCandidate?.name ? currentCandidate.name : currentCandidate.login}</span>
                                <span className='fst-italic'> ({currentCandidate?.login})</span>
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
            : <h2>No more candidates are available</h2>
            }
        </div>
    );
};

export default CandidateSearch;
