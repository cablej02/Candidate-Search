import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null | undefined>(null);
    const candidates: Candidate[] = [];

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
            candidates.push(...tempData);
            getNextCandidate();

    }, []);

    // useEffect(() => {
    //     //iife to allow async function
    //     (async () => {
    //         await fetchCandidates();
    //         getNextCandidate();
    //     })();
    // }, []);

    const fetchCandidates = async () => {
        const data = await searchGithub();

        //loop over each candidate and get their user info to build the new candidate array
        for (const c of data) {
            const userInfo = await searchGithubUser(c.login);
            candidates.push({
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
        console.log(candidates);
    };

    const getNextCandidate = () => {
        if(candidates.length > 0) {
            const nextCandidate: Candidate | undefined = candidates.shift();
            console.log('Next candidate:', nextCandidate);
            setCurrentCandidate(nextCandidate);
        } else {
            console.log('No more candidates');
            return (
                <div>
                    <h1>No more candidates</h1>
                </div>
            );
        }
    };

    return (
        <div className='container content-container'>
            {currentCandidate &&
                <div className='card w-25 mx-auto bg-black text-white border-0 rounded-5 overflow-hidden text-start d-flex flex-column gap-1'>
                    <img src={currentCandidate?.avatar_url} alt={currentCandidate?.name + 'avatar'} />
                    <h5 className='p-2'>
                        <span>{currentCandidate?.name ? currentCandidate.name : currentCandidate.login}</span>
                        <span className='fst-italic'> ({currentCandidate?.login})</span>
                    </h5>
                    <p className='px-2'>Location: {currentCandidate.location}</p>
                    <p className='px-2'>Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a></p>
                    <p className='px-2'>Company: {currentCandidate.company}</p>
                    <p className='px-2 pb-2'>Bio: {currentCandidate.bio}</p>
                    
                </div>
            }
        </div>
    );
};

export default CandidateSearch;
