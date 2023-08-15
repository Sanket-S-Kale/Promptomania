'use client';

import { useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/profile';

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
        }
        if (params?.id) fetchUserProfile();
    }, [params.id]);

    return (
        <Profile
            name={userName}
            description={`Welcome to ${userName}'s profile. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
            data={userPosts}
        />
    )
}

export default UserProfile
