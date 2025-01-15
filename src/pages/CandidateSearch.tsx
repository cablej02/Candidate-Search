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
            avatar_url: "https://avatars.githubusercontent.com/u/49294088?v=4",
            email: 'ablatzheim@gmail.com',
            html_url: "https://github.com/Blatzheim",
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
                avatar_url: c.avatar_url,
                email: userInfo.email,
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
        <div className='container mt-5'>
            <h1>Candidate Search</h1>
            {currentCandidate && <div className='card w-50 mx-auto'>
                <img src={currentCandidate?.avatar_url} alt={currentCandidate?.name + 'avatar'} className='' />
                <h3>{currentCandidate?.name ? currentCandidate.name : currentCandidate?.login} {currentCandidate?.login}</h3>
            </div>
            }
        </div>
    );
};

export default CandidateSearch;
