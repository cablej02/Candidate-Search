import { useState, useEffect, useRef } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { CurrentCandidate } from '../components/CurrentCandidate';
import { useSavedCandidates } from '../components/SavedCandidatesContext';

const CandidateSearch = () => {
    const isLoaded = useRef(false);
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null | undefined>(null);
    const candidates = useRef<Candidate[]>([]);
    const { savedCandidates, setSavedCandidates } = useSavedCandidates();

    useEffect(() => {
         console.log('Saved Candidates:', savedCandidates);
        //iife to allow async function on load
        (async () => {
            await fetchCandidates();
            getNextCandidate();

            //set loaded to true after candidates are fetched
            isLoaded.current = true
        })();
    }, []);

    const fetchCandidates = async () => {
        const data = await searchGithub();

        //loop over each candidate and get their user info to build the new candidate array
        for (const c of data) {
            const userInfo = await searchGithubUser(c.login);
            if(userInfo){
                candidates.current.push({
                    id: c.id,
                    name: userInfo.name,
                    login: c.login,
                    location: userInfo.location,
                    company: userInfo.company,
                    avatar_url: c.avatar_url,
                    email: userInfo.email,
                    bio: userInfo.bio,
                    html_url: c.html_url,
                });
            }
        }
        console.log(candidates.current);
    };

    const getNextCandidate = () => {
        // if there are still candidates in the array, set the next candidate as the current candidate
        if(candidates.current.length > 0) {
            const nextCandidate: Candidate | undefined = candidates.current.shift();
            console.log('Next candidate:', nextCandidate);
            console.log('Remaining candidates:', candidates);

            // if the candidate is already saved, skip them
            if(nextCandidate && savedCandidates[nextCandidate.id]){
                console.log('Skipping candidate.  Candidate already saved to local storage:', nextCandidate);
                getNextCandidate();
                return;
            }
            setCurrentCandidate(nextCandidate);
        } else {
            console.log('No more candidates');
            setCurrentCandidate(undefined);
        }
    };

    const saveCandidate = () => {
        // if there is a current candidate, add them to the savedCandidates object
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
            {/* if there is a currentCandidate, render them */}
            {currentCandidate ?
                <CurrentCandidate
                    currentCandidate={currentCandidate}
                    getNextCandidate={getNextCandidate}
                    saveCandidate={saveCandidate}
                />
                : isLoaded.current ? <h2>No more candidates are available</h2> : <h2>Fetching candidates...</h2>
            }
        </div>
    );
};

export default CandidateSearch;
