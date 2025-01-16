import { useState, useEffect, useRef } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { CurrentCandidate } from '../components/CurrentCandidate';
import { useSavedCandidates } from '../components/SavedCandidatesContext';

const CandidateSearch = () => {
    const isLoading = useRef(true);
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null | undefined>(null);
    const candidates = useRef<Candidate[]>([]);
    const { savedCandidates, setSavedCandidates } = useSavedCandidates();

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
        },
        {
            id: 49294090,
            name: "Jane Doe",
            login: "jdoe",
            location: "Los Angeles, USA",
            company: "facebook",
            avatar_url: "https://avatars.githubusercontent.com/u/49294088?v=4",
            email: 'jane@gmail.com',
            bio: 'I am a developer',
            html_url: "https://github/com/jdoe",
        }
    ]

    //TODO: delete this and go back to API calls
    useEffect(() => {
        console.log('Saved Candidates:', savedCandidates);
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
    //      console.log('Saved Candidates:', savedCandidates);
    //     //iife to allow async function on load
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
                : <h2>No more candidates are available</h2>
            }
        </div>
    );
};

export default CandidateSearch;
