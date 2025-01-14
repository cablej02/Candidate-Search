import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null | undefined>(null);
    const candidates: Candidate[] = [];

    useEffect(() => {
        //iife to allow async function
        (async () => {
            await fetchCandidates();
            getNextCandidate();
        })();
    }, []);

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
        <div>
            <h1>Candidate Search</h1>
            <p>{currentCandidate?.name ? currentCandidate.name : currentCandidate?.login} {currentCandidate?.login}</p>
        </div>
    );
};

export default CandidateSearch;
