import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await searchGithub();
            const newCandidates: Candidate[] = [];

            //loop over each candidate and get their user info to build the new candidate array
            for (const c of data) {
                const userInfo = await searchGithubUser(c.login);
                newCandidates.push({
                    id: c.id,
                    name: userInfo.name,
                    login: c.login,
                    location: userInfo.location,
                    avatar_url: c.avatar_url,
                    email: userInfo.email,
                    html_url: c.html_url,
                });
            }

            console.log('New Candidates:', newCandidates);
            setCandidates(newCandidates);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Candidate Search</h1>
        </div>
    );
};

export default CandidateSearch;
